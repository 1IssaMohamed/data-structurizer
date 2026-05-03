"""
==========================================================================
MAIN SERVER (FastAPI)
==========================================================================
This is the "Brain" of the application. Its job is to:
1. Receive requests from the website (frontend).
2. Start up a separate "Worker" to run the algorithm code safely.
3. Send the results (the code snapshots) back to the user.
"""

import os
import json
import concurrent.futures
from typing import List, Any, Dict
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# --------------------------------------------------------------------------
# 1. GLOBAL WORKER POOL
# --------------------------------------------------------------------------
# We keep the executor as a global variable. On Windows, we MUST NOT 
# initialize it at the top level, or it will cause a recursive crash.
executor = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    This is the "Lifecycle" of the app. We start the Worker Pool 
    when the app wakes up, and shut it down when the app goes to sleep.
    """
    global executor
    # We use a ProcessPool to handle multiple users at once.
    # On Windows, this initialization is now safely inside the lifespan.
    executor = concurrent.futures.ProcessPoolExecutor(max_workers=4)
    yield
    if executor:
        executor.shutdown()

app = FastAPI(lifespan=lifespan)

# --------------------------------------------------------------------------
# 2. SECURITY & DATA CLEANING
# --------------------------------------------------------------------------

def is_json_serializable(obj):
    """Checks if a piece of data can be turned into a JSON string."""
    try:
        json.dumps(obj)
        return True
    except (TypeError, OverflowError):
        return False

def sanitize_locals(locals_dict: Dict[str, Any]) -> Dict[str, Any]:
    """Scrubs Python objects to ensure they are safe for the browser."""
    sanitized = {}
    for k, v in locals_dict.items():
        if isinstance(v, (int, float, str, bool, type(None))):
            sanitized[k] = v
        elif isinstance(v, (list, tuple, set)):
            # Convert to list and ensure elements are strings if they aren't simple JSON types
            # Actually, to be safe for Graph/Tree visualizers, we convert to string if not basic serializable
            sanitized[k] = [item if isinstance(item, (int, float, str, bool, type(None))) else str(item) for item in v]
        elif isinstance(v, dict):
            # Dict keys must be strings for JSON
            sanitized[k] = {str(dk): (dv if is_json_serializable(dv) else str(dv)) for dk, dv in v.items()}
        else:
            sanitized[k] = str(v)
    return sanitized

# --------------------------------------------------------------------------
# 3. THE WORKER LOGIC
# --------------------------------------------------------------------------

def run_trace_in_worker(algo_name: str, args: list, kwargs: dict):
    """
    This function runs in a completely separate CPU process.
    """
    # CRITICAL: We must import these INSIDE the worker
    import algorithms
    import tracer
    import inspect
    import textwrap
    import sys

    try:
        if not hasattr(algorithms, algo_name):
            return {"success": False, "error": f"Algorithm '{algo_name}' not found."}
        
        func = getattr(algorithms, algo_name)
        
        # Run the tracing "Camera"
        trace_result = tracer.trace_function(func, *args, **kwargs)
        
        # Clean the snapshots
        for frame in trace_result["frames"]:
            frame["locals"] = sanitize_locals(frame["locals"])
            
        # Capture the source code text
        source_lines, source_start_line = inspect.getsourcelines(func)
        source_code = textwrap.dedent("".join(source_lines))

        # Final pass on result to ensure types (like lists of strings) are preserved
        result_data = trace_result["result"]
        if isinstance(result_data, list):
            trace_result["result"] = [item if is_json_serializable(item) else str(item) for item in result_data]
        elif isinstance(result_data, dict):
            trace_result["result"] = {str(k): (v if is_json_serializable(v) else str(v)) for k, v in result_data.items()}
        
        return {
            "success": True,
            "data": trace_result,
            "source_code": source_code,
            "source_start_line": source_start_line
        }
    except Exception as e:
        # If something fails in the worker, we want to know exactly what!
        import traceback
        return {"success": False, "error": f"{str(e)}\n{traceback.format_exc()}"}

# --------------------------------------------------------------------------
# 4. API ENDPOINTS
# --------------------------------------------------------------------------

class RunAlgorithmRequest(BaseModel):
    algorithm_name: str
    args: List[Any] = Field(default_factory=list)
    kwargs: Dict[str, Any] = Field(default_factory=dict)

# Allow CORS for the React frontend
allowed_origins_raw = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174")
allowed_origins = [origin.strip() for origin in allowed_origins_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_ALGORITHMS = [
    "binary_search", "binarysearch_lower_bound", "upper_bound",
    "stack_demo", "queue_demo", "linked_list_traverse",
    "bst_search", "heap_insert", "hashmap_demo", "bfs_graph", "bubble_sort"
]

@app.post("/trace")
async def run_trace(req: RunAlgorithmRequest):
    if req.algorithm_name not in ALLOWED_ALGORITHMS:
        raise HTTPException(status_code=403, detail="Algorithm not permitted.")

    if executor is None:
        return {"success": False, "error": "Server worker pool is not initialized."}

    import asyncio
    loop = asyncio.get_running_loop()
    try:
        # Offload the task to the pool.
        # This await keeps the server responsive while the worker is busy!
        # ADDED TIMEOUT: 5 seconds max to prevent infinite loops from costing $$
        result = await asyncio.wait_for(
            loop.run_in_executor(
                executor, 
                run_trace_in_worker, 
                req.algorithm_name, 
                req.args, 
                req.kwargs
            ),
            timeout=5.0
        )
        return result
    except asyncio.TimeoutError:
        return {"success": False, "error": "Algorithm execution timed out (max 5s). Possible infinite loop or too much data."}
    except Exception as e:
        return {"success": False, "error": f"Internal Server Error: {str(e)}"}

# --------------------------------------------------------------------------
# 5. SERVER STARTUP
# --------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    # On Windows, reload must be False when using multi-processing lifespan 
    # to avoid double-initialization confusion.
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
