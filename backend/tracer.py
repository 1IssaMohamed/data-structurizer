import sys
import copy

def trace_function(func, *args, **kwargs):
    """
    Traces a function line by line.

    KEY DESIGN DECISION:
    sys.settrace fires the 'line' event BEFORE a line executes.
    So at line-event for line N, locals reflect the state BEFORE line N runs.
    
    To show "what line N produced", we pair each line number with the locals
    captured at the NEXT line event (i.e., after line N has finished).
    
    We do this with a "pending" approach:
    - When line event N fires → store (line_number=N-1's line, locals=current_state)
      because current_state is what the PREVIOUS line produced.
    - On 'return' event → flush the final pending frame with the final locals.

    This means each frame in our output has:
        frame.line  = the line that JUST FINISHED executing
        frame.locals = the state AFTER that line ran
    
    This is exactly what the user wants: highlight line 8 → show m's value.
    """
    MAX_FRAMES = 500
    frames = []
    pending = {"line": None}

    def tracer(frame, event, arg):
        if frame.f_code.co_name != func.__name__:
            return tracer

        if len(frames) >= MAX_FRAMES:
            # We've hit the limit. Stop tracing to prevent infinite loops.
            sys.settrace(None)
            raise RuntimeError("Visualization aborted: Exceeded maximum step limit (500 frames). Are you stuck in an infinite loop?")

        if event == "call":
            # Function just entered. Record the def line as pending.
            # We don't emit a frame yet — nothing has executed.
            pending["line"] = frame.f_lineno
            return tracer

        if event == "line":
            # A new line is about to execute.
            # This means the PREVIOUS line (pending["line"]) just finished.
            # Capture current locals as the result of that previous line.
            if pending["line"] is not None:
                frames.append({
                    "line": pending["line"],
                    "locals": copy.deepcopy(frame.f_locals)
                })
            # Now set the new pending line (the one about to run)
            pending["line"] = frame.f_lineno
            return tracer

        if event == "return":
            # Function is about to return.
            # The last executing line (pending["line"]) just finished.
            # Capture its result.
            if pending["line"] is not None:
                frames.append({
                    "line": pending["line"],
                    "locals": copy.deepcopy(frame.f_locals)
                })
            pending["line"] = None
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
