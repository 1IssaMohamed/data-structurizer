import unittest
import requests
import sys
import os

# Add backend to path for direct imports if needed
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class DataStructurizerTestSuite(unittest.TestCase):
    PORT = os.environ.get("PORT", 8080)
    BASE_URL = f"http://localhost:{PORT}"

    def test_binary_search_found(self):
        payload = {
            "algorithm_name": "binary_search",
            "args": [[1, 2, 3, 4, 5], 4]
        }
        r = requests.post(f"{self.BASE_URL}/trace", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["data"]["result"], 3)

    def test_binary_search_not_found(self):
        payload = {
            "algorithm_name": "binary_search",
            "args": [[1, 2, 3, 4, 5], 10]
        }
        r = requests.post(f"{self.BASE_URL}/trace", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["data"]["result"], -1)

    def test_bubble_sort(self):
        payload = {
            "algorithm_name": "bubble_sort",
            "args": [[5, 4, 3, 2, 1]]
        }
        r = requests.post(f"{self.BASE_URL}/trace", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["data"]["result"], [1, 2, 3, 4, 5])
        # Check frame count - 5 elements should be well under 500
        self.assertLess(len(data["data"]["frames"]), 500)

    def test_bfs_graph(self):
        # Testing the fix for type normalization (int inputs -> string processing)
        payload = {
            "algorithm_name": "bfs_graph",
            "args": [{"0": [1, 2], "1": [0], "2": [0]}, 0]
        }
        r = requests.post(f"{self.BASE_URL}/trace", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        # API returns strings because bfs_graph converts keys to strings
        self.assertEqual(data["data"]["result"], ['0', '1', '2'])

    def test_stack_operations(self):
        payload = {
            "algorithm_name": "stack_demo",
            "args": [[10, 20, -1, 30]]
        }
        r = requests.post(f"{self.BASE_URL}/trace", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertEqual(data["data"]["result"], [10, 30])

    def test_invalid_algorithm(self):
        payload = {
            "algorithm_name": "hack_the_planet",
            "args": []
        }
        r = requests.post(f"{self.BASE_URL}/trace", json=payload)
        self.assertEqual(r.status_code, 403)

    def test_large_input_safety(self):
        # Should trigger the 500 step limit
        payload = {
            "algorithm_name": "bubble_sort",
            "args": [list(range(30, 0, -1))]
        }
        r = requests.post(f"{self.BASE_URL}/trace", json=payload)
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertFalse(data["success"])
        self.assertIn("Exceeded 500 steps", data["error"])

if __name__ == "__main__":
    unittest.main()
