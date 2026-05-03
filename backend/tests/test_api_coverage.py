import pytest
from fastapi.testclient import TestClient
from main import app
import json
import concurrent.futures

client = TestClient(app)

# --- 1. Happy Path & Core Logic Validation ---
@pytest.mark.parametrize("algo, args", [
    ("binary_search", [[1, 2, 3, 4, 5], 3]),
    ("bubble_sort", [[5, 3, 8, 1, 2]]),
    ("stack_demo", []),
    ("queue_demo", []),
])
def test_algorithm_happy_path(algo, args):
    """Test standard inputs for logic accuracy."""
    payload = {"algorithm_name": algo, "args": args, "kwargs": {}}
    response = client.post("/trace", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert "frames" in data["data"]
    assert len(data["data"]["frames"]) > 0

# --- 2. Empty, Single, and Massive Inputs ---
@pytest.mark.parametrize("args", [
    ([[], 3],), # Empty array
    ([[1], 1],), # Single item
    ([list(range(10000)), 9999],) # Massive input (limit test)
])
def test_binary_search_edge_cases(args):
    payload = {"algorithm_name": "binary_search", "args": args[0]}
    response = client.post("/trace", json=payload)
    assert response.status_code == 200
    assert response.json()["success"] is True

# --- 3. Malformed JSON and Invalid Payloads ---
def test_invalid_algorithm():
    payload = {"algorithm_name": "hack_the_mainframe", "args": []}
    response = client.post("/trace", json=payload)
    assert response.status_code == 403
    assert "Algorithm not permitted" in response.json()["detail"]

def test_missing_fields():
    payload = {"args": []}
    response = client.post("/trace", json=payload)
    assert response.status_code == 422 # FastAPI validation error

def test_malformed_json():
    response = client.post("/trace", data="{'algorithm_name': 'binary_search', 'args': [1,2,3]", headers={"Content-Type": "application/json"})
    assert response.status_code == 422

# --- 4. Concurrency & Rapid-Fire Simulation ---
def trigger_request():
    return client.post("/trace", json={"algorithm_name": "binary_search", "args": [[1,2,3], 2]})

def test_rapid_fire_requests():
    """Simulates rapid clicking by sending 20 concurrent requests."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(trigger_request) for _ in range(20)]
        results = [f.result() for f in concurrent.futures.as_completed(futures)]
        
    for res in results:
        assert res.status_code == 200
        assert res.json()["success"] is True
