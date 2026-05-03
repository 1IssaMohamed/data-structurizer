import unittest
import sys
import os
import json

# Add the backend directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import algorithms
import tracer
from main import sanitize_locals, is_json_serializable

class TestBackendLogic(unittest.TestCase):

    def test_json_serializable(self):
        self.assertTrue(is_json_serializable(1))
        self.assertTrue(is_json_serializable("test"))
        self.assertTrue(is_json_serializable([1, 2, 3]))
        self.assertTrue(is_json_serializable({"a": 1}))
        self.assertFalse(is_json_serializable(set([1, 2]))) # Sets are not JSON serializable by default
        self.assertFalse(is_json_serializable(unittest.TestCase)) # Classes are not

    def test_sanitize_locals(self):
        test_locals = {
            "a": 1,
            "b": "hello",
            "c": [1, 2, 3],
            "d": {"key": "val"},
            "e": set([1, 2]), # Should be converted to list
            "f": unittest.TestCase, # Should be converted to string
            "g": None
        }
        sanitized = sanitize_locals(test_locals)
        self.assertEqual(sanitized["a"], 1)
        self.assertEqual(sanitized["b"], "hello")
        self.assertEqual(sanitized["c"], [1, 2, 3])
        self.assertEqual(sanitized["e"], [1, 2])
        self.assertTrue(isinstance(sanitized["f"], str))
        self.assertIsNone(sanitized["g"])

    def test_tracer_basic(self):
        # Test binary search tracing
        nums = [1, 3, 5, 7, 9]
        target = 7
        result = tracer.trace_function(algorithms.binary_search, nums, target)
        
        self.assertEqual(result["result"], 3)
        self.assertTrue(len(result["frames"]) > 0)
        
        # Check if first frame has expected locals
        first_frame = result["frames"][0]
        self.assertIn("nums", first_frame["locals"])
        self.assertIn("target", first_frame["locals"])

    def test_tracer_complex_types(self):
        # Test hashmap_demo tracing (contains nested lists)
        keys = [10, 20]
        num_buckets = 5
        result = tracer.trace_function(algorithms.hashmap_demo, keys, num_buckets)
        
        self.assertTrue(len(result["frames"]) > 0)
        last_frame = result["frames"][-1]
        self.assertIn("buckets", last_frame["locals"])
        
        # Sanitize and check serialization
        sanitized_locals = sanitize_locals(last_frame["locals"])
        try:
            json.dumps(sanitized_locals)
        except Exception as e:
            self.fail(f"Sanitized locals failed JSON serialization: {e}")

if __name__ == "__main__":
    unittest.main()
