export const ALGORITHM_INFO = {
  "binary_search": {
    "introduction": "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.",
    "howItWorks": "1. Set two pointers, left and right, to the start and end of the array.\n2. Find the middle element.\n3. If the middle element is the target, you're done.\n4. If the target is smaller, move the right pointer to mid - 1.\n5. If the target is larger, move the left pointer to mid + 1.",
    "genius": "Instead of checking every single element (O(n)), it eliminates half of the remaining search space at every step. This makes it O(log n), meaning you can search 1 billion items in just 30 steps!",
    "comparisons": "Compared to Linear Search, which takes O(n) time, Binary Search is exponentially faster. However, it requires the array to be strictly sorted beforehand.",
    "leetcode": [
      { "name": "Binary Search (Easy)", "link": "https://leetcode.com/problems/binary-search/" },
      { "name": "Search a 2D Matrix (Medium)", "link": "https://leetcode.com/problems/search-a-2d-matrix/" }
    ]
  },
  "binarysearch_lower_bound": {
    "introduction": "Lower bound binary search is a variation that finds the first index where an element is greater than or equal to a target.",
    "howItWorks": "We narrow our search space to [l, r). When we find a mid element >= target, we know the lower bound could be mid, or something to the left of it, so we set r = m.",
    "genius": "It handles duplicates flawlessly. Standard binary search stops at the first match it sees, but lower bound always finds the absolute leftmost occurrence.",
    "comparisons": "Useful in languages like C++ (std::lower_bound). In Python, it's equivalent to bisect_left.",
    "leetcode": [
      { "name": "Find First and Last Position of Element in Sorted Array (Medium)", "link": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" }
    ]
  },
  "upper_bound": {
    "introduction": "Upper bound binary search finds the first index where an element is strictly greater than a target.",
    "howItWorks": "Similar to lower bound, but we only compress the right boundary if the mid element is strictly greater than the target.",
    "genius": "When combined with lower_bound, you can find the exact range of duplicate elements in O(log n) time by taking upper_bound - lower_bound.",
    "comparisons": "Python equivalent is bisect_right. It's often used to find insertion points that preserve stability.",
    "leetcode": [
      { "name": "Search Insert Position (Easy)", "link": "https://leetcode.com/problems/search-insert-position/" }
    ]
  },
  "stack_demo": {
    "introduction": "A Stack is a Last-In-First-Out (LIFO) data structure. Think of it like a stack of plates in a cafeteria.",
    "howItWorks": "You can only push (add) plates to the top of the stack, and pop (remove) plates from the top of the stack.",
    "genius": "It inherently remembers the exact order of execution and forces you to backtrack in reverse order. This makes it the foundation of the 'Call Stack' in programming.",
    "comparisons": "Unlike Arrays where you can access any index, Stacks strictly restrict you to the top element, yielding O(1) operations.",
    "leetcode": [
      { "name": "Valid Parentheses (Easy)", "link": "https://leetcode.com/problems/valid-parentheses/" },
      { "name": "Min Stack (Medium)", "link": "https://leetcode.com/problems/min-stack/" }
    ]
  },
  "queue_demo": {
    "introduction": "A Queue is a First-In-First-Out (FIFO) data structure. Think of it like people waiting in line at a grocery store.",
    "howItWorks": "Elements are enqueued at the back (tail) and dequeued from the front (head).",
    "genius": "Queues guarantee fairness and order processing. They are the backbone of Breadth-First Search and task scheduling.",
    "comparisons": "Unlike Stacks (LIFO), Queues process the oldest data first.",
    "leetcode": [
      { "name": "Number of Recent Calls (Easy)", "link": "https://leetcode.com/problems/number-of-recent-calls/" }
    ]
  },
  "linked_list_traverse": {
    "introduction": "A Linked List is a linear data structure where elements are stored in nodes. Each node contains a value and a pointer to the next node.",
    "howItWorks": "Instead of a continuous block of memory like an Array, nodes are scattered in memory. You start at the 'Head' and follow the 'Next' pointers until you reach Null.",
    "genius": "Because it doesn't require contiguous memory, you can insert or delete elements in O(1) time if you already have the pointer to the node.",
    "comparisons": "Arrays have O(1) read time but O(n) insert time. Linked Lists have O(n) read time but O(1) insert time.",
    "leetcode": [
      { "name": "Reverse Linked List (Easy)", "link": "https://leetcode.com/problems/reverse-linked-list/" },
      { "name": "Merge Two Sorted Lists (Easy)", "link": "https://leetcode.com/problems/merge-two-sorted-lists/" }
    ]
  },
  "bst_search": {
    "introduction": "A Binary Search Tree (BST) is a hierarchical structure where each node has up to two children. The left child is smaller, and the right child is larger.",
    "howItWorks": "Start at the root. If the target is smaller, traverse left. If it's larger, traverse right. Repeat until found or you hit null.",
    "genius": "It combines the flexibility of Linked Lists with the O(log n) search speed of Binary Search.",
    "comparisons": "Standard Binary Search requires a fixed Array. BSTs allow you to dynamically insert and delete data while maintaining the O(log n) search speed.",
    "leetcode": [
      { "name": "Search in a Binary Search Tree (Easy)", "link": "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
      { "name": "Lowest Common Ancestor of a BST (Medium)", "link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" }
    ]
  },
  "heap_insert": {
    "introduction": "A Min-Heap is a specialized complete binary tree where the parent node is always smaller than its children.",
    "howItWorks": "When inserting a value, add it to the very bottom level of the tree. Then, repeatedly 'sift up' by swapping it with its parent until the heap property is restored.",
    "genius": "It guarantees that the absolute minimum element is ALWAYS at the root node, allowing O(1) retrieval and O(log n) deletion/insertion.",
    "comparisons": "Unlike a BST which keeps all data strictly sorted left-to-right, a Heap only guarantees vertical sorting (parent < child), making it much faster to maintain for Priority Queues.",
    "leetcode": [
      { "name": "Kth Largest Element in a Stream (Easy)", "link": "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
      { "name": "Last Stone Weight (Easy)", "link": "https://leetcode.com/problems/last-stone-weight/" }
    ]
  },
  "hashmap_demo": {
    "introduction": "A Hashmap (or Hash Table) maps keys to values for incredibly fast O(1) lookups.",
    "howItWorks": "It takes a key, runs it through a 'Hash Function' to get an integer index, and stores the value in an array bucket at that index.",
    "genius": "It bridges the gap between memory and meaning. You don't need to know where something is stored—the key mathematically calculates its own address.",
    "comparisons": "While searching an Array takes O(n), searching a Hashmap takes O(1). However, Hashmaps require extra memory and collision handling (like chaining).",
    "leetcode": [
      { "name": "Two Sum (Easy)", "link": "https://leetcode.com/problems/two-sum/" },
      { "name": "Contains Duplicate (Easy)", "link": "https://leetcode.com/problems/contains-duplicate/" }
    ]
  },
  "bfs_graph": {
    "introduction": "Breadth-First Search (BFS) is a graph traversal algorithm that explores all neighbors of a node before moving deeper.",
    "howItWorks": "It uses a Queue. You enqueue the start node, then repeatedly dequeue a node, process it, and enqueue all of its unvisited neighbors.",
    "genius": "Because it radiates outward level-by-level like a water ripple, BFS is guaranteed to find the Shortest Path in an unweighted graph.",
    "comparisons": "DFS explores deep into dead-ends, while BFS explores wide. BFS requires more memory (the queue can get large) but guarantees shortest paths.",
    "leetcode": [
      { "name": "Rotting Oranges (Medium)", "link": "https://leetcode.com/problems/rotting-oranges/" },
      { "name": "Clone Graph (Medium)", "link": "https://leetcode.com/problems/clone-graph/" }
    ]
  },
  "bubble_sort": {
    "introduction": "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    "howItWorks": "Multiple passes are made through the array. In each pass, the largest remaining element 'bubbles' up to its correct position at the end of the array.",
    "genius": "It is extremely easy to understand and implement. It also performs well (O(n)) on arrays that are already nearly sorted if optimized with a swap flag.",
    "comparisons": "It is generally considered the most inefficient sorting algorithm (O(n^2)) for random data, vastly outperformed by Quick Sort and Merge Sort.",
    "leetcode": [
      { "name": "Sort Colors (Medium)", "link": "https://leetcode.com/problems/sort-colors/" }
    ]
  },
  "two_pointers_sum": {
    "introduction": "The Two Pointers pattern involves using two variables to iterate through a data structure simultaneously, usually from opposite ends.",
    "howItWorks": "For a sorted array, place one pointer at the start (smallest) and one at the end (largest). If the sum is too big, move the right pointer left to decrease it. If too small, move the left pointer right.",
    "genius": "It collapses an O(n^2) nested loop problem into a beautifully elegant O(n) single pass by leveraging the sorted property of the data.",
    "comparisons": "Requires sorted data. If the data is unsorted, a Hashmap is usually the better approach.",
    "leetcode": [
      { "name": "Valid Palindrome (Easy)", "link": "https://leetcode.com/problems/valid-palindrome/" },
      { "name": "Two Sum II (Medium)", "link": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { "name": "3Sum (Medium)", "link": "https://leetcode.com/problems/3sum/" }
    ]
  },
  "sliding_window_max": {
    "introduction": "The Sliding Window pattern is used to process sequential data in a continuous subset (a 'window') of a specific size or condition.",
    "howItWorks": "Maintain a left and right pointer. Expand the right pointer to add elements to the window. If the window becomes invalid or exceeds the size, shrink it from the left.",
    "genius": "Instead of recalculating the sum of a subarray from scratch (which takes O(k) work per step), you just add the new element and subtract the oldest element in O(1) time.",
    "comparisons": "Turns O(n*k) naive subarray problems into O(n) masterpieces.",
    "leetcode": [
      { "name": "Best Time to Buy and Sell Stock (Easy)", "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { "name": "Longest Substring Without Repeating Characters (Medium)", "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/" }
    ]
  },
  "prefix_sum_array": {
    "introduction": "A Prefix Sum array is a precomputed array where the element at index `i` stores the sum of all elements from `0` to `i`.",
    "howItWorks": "Iterate through the array once, keeping a running total, and store it in a new array.",
    "genius": "If you need the sum of a subarray from index `L` to `R`, you can find it instantly in O(1) time using the formula: `Prefix[R] - Prefix[L-1]`.",
    "comparisons": "Perfect for problems requiring multiple range sum queries on static arrays.",
    "leetcode": [
      { "name": "Range Sum Query - Immutable (Easy)", "link": "https://leetcode.com/problems/range-sum-query-immutable/" },
      { "name": "Subarray Sum Equals K (Medium)", "link": "https://leetcode.com/problems/subarray-sum-equals-k/" }
    ]
  },
  "string_builder": {
    "introduction": "String Building is the pattern of appending characters to an array and joining them at the very end, rather than concatenating strings directly.",
    "howItWorks": "Instead of `s += char`, you do `arr.append(char)`, and finally `\"\".join(arr)`.",
    "genius": "Strings are IMMUTABLE in Python and Java. Doing `s += char` creates a brand new string in memory every time, taking O(n^2) time. The array approach takes O(n).",
    "comparisons": "Crucial optimization for any string manipulation algorithm.",
    "leetcode": [
      { "name": "Valid Anagram (Easy)", "link": "https://leetcode.com/problems/valid-anagram/" },
      { "name": "Group Anagrams (Medium)", "link": "https://leetcode.com/problems/group-anagrams/" }
    ]
  },
  "fast_slow_pointer": {
    "introduction": "Also known as Floyd's Tortoise and Hare, this pattern uses two pointers moving at different speeds.",
    "howItWorks": "The slow pointer moves 1 step at a time, while the fast pointer moves 2 steps at a time.",
    "genius": "If there is a cycle, the fast pointer will eventually 'lap' the slow pointer and they will meet. Additionally, when the fast pointer reaches the end of a list, the slow pointer will be perfectly in the middle!",
    "comparisons": "Solves cycle detection in O(1) space, whereas a Hashset would require O(n) space.",
    "leetcode": [
      { "name": "Linked List Cycle (Easy)", "link": "https://leetcode.com/problems/linked-list-cycle/" },
      { "name": "Find the Duplicate Number (Medium)", "link": "https://leetcode.com/problems/find-the-duplicate-number/" }
    ]
  },
  "monotonic_stack": {
    "introduction": "A Monotonic Stack is a stack whose elements are guaranteed to be strictly increasing or strictly decreasing.",
    "howItWorks": "Before pushing a new element, you pop all elements from the stack that would break the monotonic property. Those popped elements just found their 'Next Greater Element'.",
    "genius": "It solves 'Next Greater/Smaller Element' problems in O(n) time by remembering unresolved elements in the stack.",
    "comparisons": "Extremely powerful, but highly specific to a niche set of problems compared to a standard Stack.",
    "leetcode": [
      { "name": "Daily Temperatures (Medium)", "link": "https://leetcode.com/problems/daily-temperatures/" },
      { "name": "Largest Rectangle in Histogram (Hard)", "link": "https://leetcode.com/problems/largest-rectangle-in-histogram/" }
    ]
  },
  "dfs_graph": {
    "introduction": "Depth-First Search (DFS) is a graph traversal algorithm that explores as deep as possible along each branch before backtracking.",
    "howItWorks": "It uses a Stack (either explicit or via the Recursion Call Stack). You pop a node, visit it, and push all its unvisited neighbors.",
    "genius": "Because it relies on the call stack, it can be written incredibly elegantly using just a few lines of recursive code. It's perfect for searching through mazes or puzzles.",
    "comparisons": "BFS goes wide, DFS goes deep. DFS uses less memory on wide trees, but does not guarantee the shortest path.",
    "leetcode": [
      { "name": "Number of Islands (Medium)", "link": "https://leetcode.com/problems/number-of-islands/" },
      { "name": "Max Area of Island (Medium)", "link": "https://leetcode.com/problems/max-area-of-island/" }
    ]
  },
  "bfs_tree": {
    "introduction": "Tree BFS (Level-Order Traversal) visits all nodes on the current tree level before moving to the next level down.",
    "howItWorks": "Initialize a Queue with the root. Dequeue the front node, process it, and enqueue its left and right children.",
    "genius": "It's the only way to process hierarchical data horizontally. Essential for problems like 'Right Side View of a Tree' or 'Maximum Depth'.",
    "comparisons": "DFS uses a Stack, BFS uses a Queue. The code looks almost identical, but the data structure fundamentally changes the traversal shape.",
    "leetcode": [
      { "name": "Binary Tree Level Order Traversal (Medium)", "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { "name": "Binary Tree Right Side View (Medium)", "link": "https://leetcode.com/problems/binary-tree-right-side-view/" }
    ]
  },
  "binary_search_insert": {
    "introduction": "Search Insert Position is a standard application of Binary Search used to maintain sorted arrays.",
    "howItWorks": "Run standard binary search. If the target is not found, the `left` pointer will end up pointing to the exact index where the target should be inserted.",
    "genius": "It bridges the gap between searching and sorting. By knowing exactly where to insert an element, you can maintain a sorted array dynamically.",
    "comparisons": "Identical to Binary Search, but we return the `l` pointer instead of `-1` when the loop breaks.",
    "leetcode": [
      { "name": "Search Insert Position (Easy)", "link": "https://leetcode.com/problems/search-insert-position/" },
      { "name": "Koko Eating Bananas (Medium)", "link": "https://leetcode.com/problems/koko-eating-bananas/" }
    ]
  },
  "backtrack_subsets": {
    "introduction": "Backtracking is a DFS-based algorithmic technique for generating all possible configurations, like subsets or permutations.",
    "howItWorks": "Build a solution incrementally. Make a choice (e.g., 'include element A'), explore down that path, then 'backtrack' (undo the choice) and explore the alternative (e.g., 'exclude element A').",
    "genius": "It elegantly traverses the massive exponential decision tree of combinatorial problems without explicitly storing the entire tree in memory.",
    "comparisons": "It is essentially a Brute Force search, optimized to abandon invalid paths early.",
    "leetcode": [
      { "name": "Subsets (Medium)", "link": "https://leetcode.com/problems/subsets/" },
      { "name": "Permutations (Medium)", "link": "https://leetcode.com/problems/permutations/" }
    ]
  }
};
