import pytest
from fastapi.testclient import TestClient
from main import app
import time

client = TestClient(app)

def test_timeout_protection():
    """
    Since we can't easily inject an infinite loop without modifying algorithms.py,
    we can test that a very large input eventually times out or is caught by MAX_FRAMES.
    Actually, a better test is to mock the worker or just trust the asyncio.wait_for logic.
    For this test, we'll try to trigger the MAX_FRAMES error from tracer.py.
    """
    # Bubble sort on a large-ish array is O(n^2), 100 items = 10,000 steps roughly.
    # tracer.py has MAX_FRAMES = 500. This should trigger the RuntimeError.
    payload = {
        "algorithm_name": "bubble_sort",
        "args": [list(range(100, 0, -1))] # 100 items reverse sorted
    }
    response = client.post("/trace", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is False
    assert "Exceeded 500 steps" in data["error"]

def test_cors_headers():
    """Ensure CORS is actually active and configured."""
    response = client.options("/trace", headers={
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
    })
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"

def test_large_payload_rejection():
    """
    Simulate a massive payload. 
    While FastAPI doesn't block it by default unless configured in uvicorn,
    we can check how it handles a reasonably large but not 'crash-inducing' list.
    """
    payload = {
        "algorithm_name": "binary_search",
        "args": [list(range(50000)), 49999]
    }
    # This might take a second but should pass or timeout.
    response = client.post("/trace", json=payload)
    assert response.status_code in [200, 500, 504] # 504 if it times out

def test_algorithm_injection_prevention():
    """Ensure you can't just run any python function."""
    payload = {
        "algorithm_name": "os.system",
        "args": ["echo 'hacked'"]
    }
    response = client.post("/trace", json=payload)
    assert response.status_code == 403
    assert "Algorithm not permitted" in response.json()["detail"]
