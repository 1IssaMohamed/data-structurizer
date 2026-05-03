"""
==========================================================================
THE TRACER (The Camera)
==========================================================================
This file contains the logic that "records" your code as it runs.
It uses a Python feature called 'sys.settrace' to pause the code at 
every line, take a snapshot of the variables, and save them into a 
list of "frames" for the visualizer to show.
"""

import sys
import copy

def trace_function(func, *args, **kwargs):
    """
    This is the "Camera" that watches your code run. It takes a 
    snapshot of every single line as it executes.
    
    HOW IT WORKS:
    We use 'sys.settrace'. It's like a hook that catches the computer 
    right before it runs a line of code. Because it catches it *before*, 
    we have to do a little bit of "pending" math to show you what that 
    line *produced* after it finished.
    """
    MAX_FRAMES = 500  # Safety limit so we don't record forever
    frames = []
    pending = {"line": None}

    def tracer(frame, event, arg):
        if frame.f_code.co_name != func.__name__:
            return tracer

        if len(frames) >= MAX_FRAMES:
            sys.settrace(None)
            raise RuntimeError(f"Visualization aborted: Exceeded {MAX_FRAMES} steps. Are you stuck in an infinite loop?")

        if event == "line":
            # Capture the state BEFORE the line runs
            frames.append({
                "line": frame.f_lineno,
                "locals": copy.deepcopy(frame.f_locals)
            })
            return tracer

        if event == "return":
            # Capture final state
            frames.append({
                "line": frame.f_lineno,
                "locals": copy.deepcopy(frame.f_locals)
            })
            return tracer

        return tracer

    sys.settrace(tracer)
    try:
        result = func(*args, **kwargs)
    finally:
        sys.settrace(None)

    return {
        "result": result,
        "frames": frames
    }
