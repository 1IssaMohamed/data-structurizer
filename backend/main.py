import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
import importlib
import algorithms
import tracer

app = FastAPI()

# Allow CORS for the React frontend based on environment variable
# Defaults to localhost for development
allowed_origin = os.environ.get("ALLOWED_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin, "http://127.0.0.1:5173", "http://localhost:5174", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RunAlgorithmRequest(BaseModel):
    algorithm_name: str
    args: List[Any]
    kwargs: dict

ALLOWED_ALGORITHMS = [
    "binary_search",
    "binarysearch_lower_bound",
    "upper_bound",
    "stack_demo",
    "queue_demo",
    "linked_list_traverse",
    "bst_search",
    "heap_insert",
    "hashmap_demo",
    "bfs_graph",
    "bubble_sort"
]

@app.post("/trace")
async def run_trace(req: RunAlgorithmRequest):
    # Only reload modules dynamically if not in production
    if os.environ.get("ENVIRONMENT") != "production":
        importlib.reload(algorithms)
        importlib.reload(tracer)
    
    # Security: check if the algorithm is in our allowed list
    if req.algorithm_name not in ALLOWED_ALGORITHMS:
        return {"error": f"Algorithm '{req.algorithm_name}' is not permitted."}
    
    # Get the function
    if not hasattr(algorithms, req.algorithm_name):
        return {"error": f"Algorithm '{req.algorithm_name}' not found in algorithms.py"}
    
    func = getattr(algorithms, req.algorithm_name)
    
    # Run and trace
    try:
        trace_data = tracer.trace_function(func, *req.args, **req.kwargs)
        
        # Extract only this function's source (not the entire file)
        import inspect
        import textwrap
        source_lines, source_start_line = inspect.getsourcelines(func)
        source_code = textwrap.dedent("".join(source_lines))
            
        return {
            "success": True, 
            "data": trace_data,
            "source_code": source_code,
            "source_start_line": source_start_line
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
