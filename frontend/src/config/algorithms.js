import ArrayVisualizer from '../components/ArrayVisualizer';
import StackVisualizer from '../components/StackVisualizer';
import QueueVisualizer from '../components/QueueVisualizer';
import LinkedListVisualizer from '../components/LinkedListVisualizer';
import TreeVisualizer from '../components/TreeVisualizer';
import HashmapVisualizer from '../components/HashmapVisualizer';
import GraphVisualizer from '../components/GraphVisualizer';

export const ALGORITHMS = [
  {
    id: "binary_search",
    displayName: "Binary Search",
    category: "Search",
    description: "Find a target in a sorted array. Returns the index, or -1 if not found.",
    visualizer: {
      component: ArrayVisualizer,
      props: { arrayVar: "nums", pointers: ["l", "r", "m"] }
    },
    params: [
      { name: "nums",   label: "Sorted Array",  type: "array",   placeholder: "1, 3, 5, 12, 15, 21, 35, 42, 50, 61" },
      { name: "target", label: "Target Value",  type: "integer", placeholder: "15" }
    ],
    demos: [
      { name: "Normal Case",          description: "Target 21 found in a 10-element array in ~4 steps.",           args: [[1,3,5,12,15,21,35,42,50,61], 21] },
      { name: "Not Found",            description: "Target 7 doesn't exist. Watch l and r cross — returns -1.",   args: [[1,3,5,12,15,21,35,42,50,61], 7]  },
      { name: "Single Element — Hit", description: "Array of 1 element, target matches. One step.",               args: [[5], 5] },
      { name: "Single Element — Miss","description": "Array of 1 element, target missing. Immediate -1.",         args: [[5], 3] },
      { name: "Target at Start",      description: "Target is index 0. Watch r collapse leftward.",               args: [[1,3,5,12,15,21], 1]  },
      { name: "Target at End",        description: "Target is the last element. Watch l expand rightward.",       args: [[1,3,5,12,15,21], 21] }
    ]
  },
  {
    id: "binarysearch_lower_bound",
    displayName: "Lower Bound",
    category: "Binary Search",
    description: "First index where nums[i] ≥ target. Returns the insertion point for target.",
    visualizer: {
      component: ArrayVisualizer,
      props: { arrayVar: "nums", pointers: ["l", "r", "m"] }
    },
    params: [
      { name: "nums",   label: "Sorted Array",  type: "array",   placeholder: "1, 3, 5, 5, 12, 15" },
      { name: "target", label: "Target Value",  type: "integer", placeholder: "5" }
    ],
    demos: [
      { name: "Normal Case",        description: "Target 21 found — returns its first (only) occurrence.",     args: [[1,3,5,12,15,21,35,42,50,61], 21] },
      { name: "Duplicates",         description: "Three 5s in the array — returns index of the very first.",   args: [[1,3,5,5,5,12,15], 5] },
      { name: "Target Below Range", description: "Target smaller than all elements. Returns index 0.",         args: [[5,10,15,20], 3] },
      { name: "Target Above Range", description: "Target larger than all elements. Returns len(nums).",        args: [[5,10,15,20], 25] },
      { name: "Single Element",     description: "One-element array, target matches exactly.",                 args: [[7], 7] }
    ]
  },
  {
    id: "upper_bound",
    displayName: "Upper Bound",
    category: "Binary Search",
    description: "First index where nums[i] > target. All duplicate targets fall before this index.",
    visualizer: {
      component: ArrayVisualizer,
      props: { arrayVar: "nums", pointers: ["l", "r", "m"] }
    },
    params: [
      { name: "nums",   label: "Sorted Array",  type: "array",   placeholder: "1, 3, 5, 5, 12, 15" },
      { name: "target", label: "Target Value",  type: "integer", placeholder: "5" }
    ],
    demos: [
      { name: "Normal Case",        description: "Target 21 exists once — returns the index just after it.",       args: [[1,3,5,12,15,21,35,42,50,61], 21] },
      { name: "Duplicates",         description: "Three 5s in the array — returns index past all of them.",        args: [[1,3,5,5,5,12,15], 5] },
      { name: "Target Below Range", description: "Target smaller than all elements. Returns index 0.",             args: [[5,10,15,20], 3] },
      { name: "Target Above Range", description: "Target larger than all elements. Returns len(nums).",            args: [[5,10,15,20], 25] }
    ]
  },
  {
    id: "stack_demo",
    displayName: "Stack Operations",
    category: "Linear Structures",
    description: "LIFO (Last-In-First-Out) structure. Elements are pushed and popped from the top.",
    visualizer: {
      component: StackVisualizer,
      props: { stackVar: "stack" }
    },
    params: [
      { name: "operations", label: "Operations (pos=push, -1=pop)", type: "array", placeholder: "10, 20, 30, -1, 40" }
    ],
    demos: [
      { name: "Basic Push/Pop", description: "Push 10, 20, 30. Then pop once. Then push 40.", args: [[10, 20, 30, -1, 40]] },
      { name: "Pop Empty", description: "Trying to pop an empty stack does nothing.", args: [[-1, 5, 10, -1, -1, -1]] }
    ]
  },
  {
    id: "queue_demo",
    displayName: "Queue Operations",
    category: "Linear Structures",
    description: "FIFO (First-In-First-Out) structure. Enqueue at the tail, dequeue from the head.",
    visualizer: {
      component: QueueVisualizer,
      props: { queueVar: "queue", headVar: "head", tailVar: "tail" }
    },
    params: [
      { name: "operations", label: "Operations (pos=enqueue, -1=dequeue)", type: "array", placeholder: "10, 20, -1, 30" }
    ],
    demos: [
      { name: "Basic Enq/Deq", description: "Enqueue 10, 20. Dequeue one. Enqueue 30.", args: [[10, 20, -1, 30]] },
      { name: "Dequeue Empty", description: "Trying to dequeue an empty queue safely ignores it.", args: [[-1, 5, -1, -1]] }
    ]
  },
  {
    id: "linked_list_traverse",
    displayName: "Linked List Traversal",
    category: "Linear Structures",
    description: "Traversing a linked list node by node until reaching NULL.",
    visualizer: {
      component: LinkedListVisualizer,
      props: { listVar: "values", cursorVar: "curr_idx" }
    },
    params: [
      { name: "values", label: "List Values", type: "array", placeholder: "10, 20, 30, 40" }
    ],
    demos: [
      { name: "Normal Traversal", description: "Traverse a standard list to the end.", args: [[10, 20, 30, 40, 50]] },
      { name: "Single Node", description: "List with only one element.", args: [[99]] }
    ]
  },
  {
    id: "bst_search",
    displayName: "Binary Search Tree",
    category: "Hierarchical",
    description: "Searching for a target in a BST (level-order array representation).",
    visualizer: {
      component: TreeVisualizer,
      props: { treeVar: "tree", cursorVar: "curr_idx" }
    },
    params: [
      { name: "tree", label: "Level-Order Tree (nulls allowed)", type: "array", placeholder: "10, 5, 15, 2, null, 12, 20" },
      { name: "target", label: "Target Value", type: "integer", placeholder: "12" }
    ],
    demos: [
      { name: "Target Found", description: "Search path: 10 -> 15 -> 12.", args: [[10, 5, 15, 2, null, 12, 20], 12] },
      { name: "Target Missing", description: "Search hits an empty leaf.", args: [[10, 5, 15, 2, null, 12, 20], 99] }
    ]
  },
  {
    id: "heap_insert",
    displayName: "Min Heap Insert",
    category: "Hierarchical",
    description: "Inserting a value into a Min Heap and sifting up to maintain the heap property.",
    visualizer: {
      component: TreeVisualizer,
      props: { treeVar: "heap", cursorVar: "curr_idx" }
    },
    params: [
      { name: "heap", label: "Current Heap Array", type: "array", placeholder: "2, 5, 10, 15, 20" },
      { name: "val", label: "Value to Insert", type: "integer", placeholder: "1" }
    ],
    demos: [
      { name: "Sift Up Multiple Levels", description: "Inserting 1. It bubbles all the way to the root.", args: [[2, 5, 10, 15, 20], 1] },
      { name: "No Sift Needed", description: "Inserting 99. It stays at the bottom.", args: [[2, 5, 10, 15, 20], 99] }
    ]
  },
  {
    id: "hashmap_demo",
    displayName: "Hashmap (Chaining)",
    category: "Complex Structures",
    description: "Inserting keys into a Hashmap. Collisions are handled using lists (chaining).",
    visualizer: {
      component: HashmapVisualizer,
      props: { bucketsVar: "buckets", keyVar: "current_key", hashVar: "hash_val" }
    },
    params: [
      { name: "keys", label: "Keys to Hash", type: "array", placeholder: "10, 22, 31, 4, 15, 28" },
      { name: "num_buckets", label: "Number of Buckets", type: "integer", placeholder: "5" }
    ],
    demos: [
      { name: "Integer Hashing", description: "Modulo hashing causes intentional collisions.", args: [[10, 22, 31, 4, 15, 28, 17, 88, 59], 5] }
    ]
  },
  {
    id: "bfs_graph",
    displayName: "Graph BFS",
    category: "Complex Structures",
    description: "Breadth-First Search on a graph using an adjacency list.",
    visualizer: {
      component: GraphVisualizer,
      props: { 
        graphVar: "graph", 
        currentVar: "current", 
        visitedVar: "visited", 
        queueVar: "queue",
        // Predefined positions for this specific demo graph
        nodePositions: {
          "0": {x: 300, y: 50},
          "1": {x: 150, y: 150},
          "2": {x: 450, y: 150},
          "3": {x: 100, y: 300},
          "4": {x: 250, y: 300},
          "5": {x: 500, y: 300}
        }
      }
    },
    params: [
      // Advanced usage: skipping custom input for Graph for now because passing dicts via the simple form is hard
      // So users will rely on the demos to learn it.
    ],
    demos: [
      { name: "Standard BFS", description: "Traverse a 6-node graph starting from node 0.", 
        args: [{"0": [1, 2], "1": [0, 3, 4], "2": [0, 5], "3": [1], "4": [1], "5": [2]}, "0"] }
    ]
  },
  {
    id: "bubble_sort",
    displayName: "Bubble Sort",
    category: "Sorting",
    description: "Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    visualizer: {
      component: ArrayVisualizer,
      props: { arrayVar: "nums", pointers: ["i", "j"] }
    },
    params: [
      { name: "nums", label: "Array to Sort", type: "array", placeholder: "64, 34, 25, 12, 22, 11, 90" }
    ],
    demos: [
      { name: "Unsorted Array", description: "Standard O(N^2) sorting process.", args: [[64, 34, 25, 12, 22, 11, 90]] },
      { name: "Nearly Sorted", description: "Only a few elements out of place.", args: [[11, 12, 25, 22, 34, 64, 90]] }
    ]
  },
  {
    id: "two_pointers_sum",
    displayName: "Two Pointers Sum",
    category: "Two Pointers",
    description: "Find two numbers in a sorted array that add up to a target using left and right pointers.",
    visualizer: { component: ArrayVisualizer, props: { arrayVar: "nums", pointers: ["l", "r"] } },
    params: [
      { name: "nums", label: "Sorted Array", type: "array", placeholder: "1, 2, 3, 4, 6" },
      { name: "target", label: "Target Sum", type: "integer", placeholder: "6" }
    ],
    demos: [
      { name: "Target Exists", description: "Finds 2 + 4 = 6.", args: [[1, 2, 3, 4, 6], 6] },
      { name: "Target Missing", description: "Pointers cross without finding target.", args: [[1, 2, 3, 4, 6], 99] }
    ]
  },
  {
    id: "sliding_window_max",
    displayName: "Sliding Window Max",
    category: "Sliding Window",
    description: "Find the maximum sum of any contiguous subarray of size K.",
    visualizer: { component: ArrayVisualizer, props: { arrayVar: "nums", pointers: ["l", "r"] } },
    params: [
      { name: "nums", label: "Array", type: "array", placeholder: "2, 1, 5, 1, 3, 2" },
      { name: "k", label: "Window Size K", type: "integer", placeholder: "3" }
    ],
    demos: [
      { name: "Size 3 Window", description: "Sliding window across the array.", args: [[2, 1, 5, 1, 3, 2], 3] }
    ]
  },
  {
    id: "prefix_sum_array",
    displayName: "Prefix Sum",
    category: "Prefix Sum",
    description: "Generate an array where each element is the sum of all preceding elements.",
    visualizer: { component: ArrayVisualizer, props: { arrayVar: "prefix", pointers: ["i"] } },
    params: [
      { name: "nums", label: "Array", type: "array", placeholder: "1, 2, 3, 4" }
    ],
    demos: [
      { name: "Basic Prefix Sum", description: "Calculates prefix sums.", args: [[1, 2, 3, 4]] }
    ]
  },
  {
    id: "string_builder",
    displayName: "Efficient String Build",
    category: "Strings",
    description: "Building a string efficiently by appending to an array and joining at the end.",
    visualizer: { component: ArrayVisualizer, props: { arrayVar: "res", pointers: [] } },
    params: [
      { name: "strings", label: "String Parts", type: "array", placeholder: "H, e, l, l, o" }
    ],
    demos: [
      { name: "Build Hello", description: "Append characters and join.", args: [["H", "e", "l", "l", "o"]] }
    ]
  },
  {
    id: "fast_slow_pointer",
    displayName: "Fast and Slow Pointer",
    category: "Two Pointers",
    description: "Simulating cycle detection or middle finding using a fast (moves 2) and slow (moves 1) pointer.",
    visualizer: { component: LinkedListVisualizer, props: { listVar: "values", pointers: ["slow", "fast"] } },
    params: [
      { name: "values", label: "Array (Mock Linked List)", type: "array", placeholder: "1, 2, 3, 4, 5" }
    ],
    demos: [
      { name: "Find Middle", description: "When fast reaches end, slow is at the middle.", args: [[1, 2, 3, 4, 5]] }
    ]
  },
  {
    id: "monotonic_stack",
    displayName: "Monotonic Stack",
    category: "Stack",
    description: "Using a stack to keep track of the Next Greater Element.",
    visualizer: { component: ArrayVisualizer, props: { arrayVar: "res", pointers: ["i"] } },
    params: [
      { name: "nums", label: "Array", type: "array", placeholder: "2, 1, 2, 4, 3" }
    ],
    demos: [
      { name: "Next Greater Element", description: "Finds the next greater element for each item.", args: [[2, 1, 2, 4, 3]] }
    ]
  },
  {
    id: "dfs_graph",
    displayName: "Graph DFS",
    category: "Complex Structures",
    description: "Depth-First Search on a graph using an adjacency list.",
    visualizer: { component: GraphVisualizer, props: { 
        graphVar: "graph", currentVar: "current", visitedVar: "visited", queueVar: "stack",
        nodePositions: { "0": {x: 300, y: 50}, "1": {x: 150, y: 150}, "2": {x: 450, y: 150}, "3": {x: 100, y: 300}, "4": {x: 250, y: 300}, "5": {x: 500, y: 300} }
    } },
    params: [],
    demos: [
      { name: "Standard DFS", description: "Traverse deep before wide.", args: [{"0": [1, 2], "1": [0, 3, 4], "2": [0, 5], "3": [1], "4": [1], "5": [2]}, "0"] }
    ]
  },
  {
    id: "bfs_tree",
    displayName: "Tree BFS",
    category: "Hierarchical",
    description: "Breadth-First Search on a Binary Tree using a Queue.",
    visualizer: { component: TreeVisualizer, props: { treeVar: "tree", cursorVar: "curr_idx" } },
    params: [
      { name: "tree", label: "Tree Array", type: "array", placeholder: "1, 2, 3, 4, 5" }
    ],
    demos: [
      { name: "Level Order Traversal", description: "Visits nodes level by level.", args: [[1, 2, 3, 4, 5]] }
    ]
  },
  {
    id: "binary_search_insert",
    displayName: "Search Insert Position",
    category: "Binary Search",
    description: "Return the index where the target should be inserted to maintain sorted order.",
    visualizer: { component: ArrayVisualizer, props: { arrayVar: "nums", pointers: ["l", "r", "m"] } },
    params: [
      { name: "nums", label: "Sorted Array", type: "array", placeholder: "1, 3, 5, 6" },
      { name: "target", label: "Target", type: "integer", placeholder: "5" }
    ],
    demos: [
      { name: "Target Found", description: "Target 5 is found at index 2.", args: [[1, 3, 5, 6], 5] },
      { name: "Target Inserted", description: "Target 2 is missing, returns insertion index 1.", args: [[1, 3, 5, 6], 2] }
    ]
  },
  {
    id: "backtrack_subsets",
    displayName: "Backtracking (Subsets)",
    category: "Recursion",
    description: "Generates all possible subsets using a backtracking DFS approach.",
    visualizer: { component: ArrayVisualizer, props: { arrayVar: "subset", pointers: [] } },
    params: [
      { name: "nums", label: "Array", type: "array", placeholder: "1, 2, 3" }
    ],
    demos: [
      { name: "Generate Subsets", description: "Explores include/exclude decisions.", args: [[1, 2, 3]] }
    ]
  }
];
