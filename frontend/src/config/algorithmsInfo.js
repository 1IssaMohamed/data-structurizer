export const ALGORITHM_INFO = {
  "binary_search": {
    "whatItIs": "Binary Search is a classic algorithmic technique to find the exact position of a target value within a sorted array.",
    "howItWorks": "1. Initialize two pointers: 'left' at index 0, and 'right' at the last index.\n2. Find the 'mid' index between left and right.\n3. If the element at 'mid' is the target, return it.\n4. If the element at 'mid' is smaller than the target, the target must be in the right half. Update 'left' = mid + 1.\n5. If the element at 'mid' is larger, the target must be in the left half. Update 'right' = mid - 1.",
    "genius": "In a naive linear search, you must check every element one by one, which takes O(n) time. Binary search leverages the fact that the array is already sorted. By checking the middle element, it can eliminate half of the remaining search space instantly. This logarithmic reduction (O(log n)) means you can search 1,000,000 items in just 20 checks.",
    "practiceProblems": [
      { "name": "Binary Search", "link": "https://leetcode.com/problems/binary-search/" },
      { "name": "Search a 2D Matrix", "link": "https://leetcode.com/problems/search-a-2d-matrix/" },
      { "name": "Find Minimum in Rotated Sorted Array", "link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" }
    ]
  },
  "binarysearch_lower_bound": {
    "whatItIs": "Lower Bound Binary Search is a variation of Binary Search that doesn't just look for a target—it looks for the first occurrence of an element that is greater than or equal to the target.",
    "howItWorks": "Instead of checking 'left <= right', we check 'left < right'. When we find an element at 'mid' that is >= target, we don't return immediately. Instead, we pull the 'right' pointer down to 'mid'. If the element is strictly < target, we push 'left' to 'mid + 1'. The search space constantly shrinks until 'left' and 'right' converge on the exact boundary.",
    "genius": "Standard binary search struggles when there are duplicate elements (it just returns whichever one it happens to hit first). The lower bound variation is mathematically robust—it consistently finds the absolute leftmost edge of where a target begins or where it should be inserted.",
    "comparisons": "In Python, this is implemented natively as 'bisect.bisect_left()'. In C++, it is 'std::lower_bound'.",
    "practiceProblems": [
      { "name": "Find First and Last Position of Element in Sorted Array", "link": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" }
    ]
  },
  "upper_bound": {
    "whatItIs": "Upper Bound Binary Search is a variation that finds the first index where an element is strictly greater than a target.",
    "howItWorks": "It is nearly identical to Lower Bound, but the conditional check changes. We only shrink the right boundary if the 'mid' element is strictly greater than the target. If 'mid' is equal to the target, we push the 'left' pointer to 'mid + 1', forcing the search space to slide completely past all duplicates.",
    "genius": "When you combine Lower Bound and Upper Bound, you can instantly find the exact frequency of any element in a sorted array by taking (Upper Bound Index - Lower Bound Index) in O(log n) time.",
    "comparisons": "In Python, this is implemented natively as 'bisect.bisect_right()'. In C++, it is 'std::upper_bound'.",
    "practiceProblems": [
      { "name": "Search Insert Position", "link": "https://leetcode.com/problems/search-insert-position/" }
    ]
  },
  "stack_demo": {
    "whatItIs": "A Stack is a fundamental Last-In-First-Out (LIFO) data structure. The last item you put in is the first item you take out.",
    "howItWorks": "Think of it like a stack of plates in a cafeteria. You can only put a new plate on the very top (push), and you can only remove a plate from the very top (pop).",
    "genius": "A Stack naturally tracks the 'history' of states in reverse order. This makes it the foundational data structure for the 'Call Stack' in all programming languages, allowing functions to pause, call other functions, and seamlessly resume where they left off.",
    "comparisons": "Unlike Arrays where you can read and write to any index, Stacks intentionally restrict your access to just the top element, which guarantees O(1) time complexity for additions and removals.",
    "practiceProblems": [
      { "name": "Valid Parentheses", "link": "https://leetcode.com/problems/valid-parentheses/" },
      { "name": "Evaluate Reverse Polish Notation", "link": "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
      { "name": "Min Stack", "link": "https://leetcode.com/problems/min-stack/" }
    ]
  },
  "queue_demo": {
    "whatItIs": "A Queue is a fundamental First-In-First-Out (FIFO) data structure. The first item you put in is the first item you take out.",
    "howItWorks": "Think of it like people waiting in a line. New people join at the back (enqueue), and the person at the front gets served and leaves the line (dequeue).",
    "genius": "Queues guarantee fairness and chronological ordering. Whenever you need to process events in the exact order they occurred (like web server requests, printer jobs, or Breadth-First Search), a Queue is the mathematically perfect structure to use.",
    "comparisons": "Unlike a Stack which processes the newest data first, a Queue strictly processes the oldest data first.",
    "practiceProblems": [
      { "name": "Number of Recent Calls", "link": "https://leetcode.com/problems/number-of-recent-calls/" }
    ]
  },
  "linked_list_traverse": {
    "whatItIs": "A Linked List is a linear collection of data where elements (nodes) are not stored in contiguous memory. Instead, each node points to the next one.",
    "howItWorks": "Each node contains two things: the actual data (value), and a pointer (memory address) to the next node in the chain. To read the list, you start at the 'Head' node and follow the pointers until you hit a 'Null' pointer, signaling the end.",
    "genius": "Because arrays are contiguous, inserting an element at the beginning requires shifting every single other element over by one slot (O(n) time). A Linked List allows you to insert or delete a node anywhere in O(1) time simply by changing two pointers.",
    "comparisons": "Arrays have O(1) read time but O(n) insert/delete time. Linked Lists have the inverse: O(n) read time (you must walk the chain) but O(1) insert/delete time.",
    "practiceProblems": [
      { "name": "Reverse Linked List", "link": "https://leetcode.com/problems/reverse-linked-list/" },
      { "name": "Merge Two Sorted Lists", "link": "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { "name": "Reorder List", "link": "https://leetcode.com/problems/reorder-list/" }
    ]
  },
  "bst_search": {
    "whatItIs": "A Binary Search Tree (BST) is a hierarchical tree structure where every node has at most two children. The left child is strictly smaller than the parent, and the right child is strictly larger.",
    "howItWorks": "To find a target, you start at the root node. If your target is smaller than the root, you traverse down the left branch. If it's larger, you traverse down the right branch. You repeat this recursively until you find the target or hit a dead end.",
    "genius": "A BST marries the flexibility of Linked Lists with the search speed of Binary Search. It allows you to dynamically insert and delete data at will, while maintaining an organized structure that can be searched in O(log n) time.",
    "practiceProblems": [
      { "name": "Search in a Binary Search Tree", "link": "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
      { "name": "Validate Binary Search Tree", "link": "https://leetcode.com/problems/validate-binary-search-tree/" },
      { "name": "Kth Smallest Element in a BST", "link": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" }
    ]
  },
  "heap_insert": {
    "whatItIs": "A Min-Heap is a specialized binary tree that strictly maintains the 'Heap Property': every parent node must be smaller than its children.",
    "howItWorks": "When inserting a new value, it is initially placed at the very bottom level of the tree. The algorithm then looks at its parent. If the new value is smaller than its parent, they are swapped (sifted up). This process repeats until the tree is valid.",
    "genius": "A heap is designed for one specific, highly-optimized purpose: keeping track of the minimum (or maximum) element in a dataset. It guarantees that the absolute minimum element is ALWAYS sitting at the root node, allowing O(1) instant retrieval.",
    "comparisons": "Unlike a BST which keeps all data strictly sorted horizontally (left to right), a Heap only sorts data vertically (parent to child). This looser restriction makes a Heap much faster to maintain when building Priority Queues.",
    "practiceProblems": [
      { "name": "Kth Largest Element in a Stream", "link": "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
      { "name": "Last Stone Weight", "link": "https://leetcode.com/problems/last-stone-weight/" },
      { "name": "Find Median from Data Stream", "link": "https://leetcode.com/problems/find-median-from-data-stream/" }
    ]
  },
  "hashmap_demo": {
    "whatItIs": "A Hashmap (or Hash Table) is a data structure that maps 'Keys' to 'Values' for incredibly fast O(1) lookups.",
    "howItWorks": "When you want to store a value under a key (e.g., 'Alice' -> 25), the key 'Alice' is fed into a mathematical Hash Function. This function scrambles the letters and outputs a pure integer index (e.g., 4). The value 25 is then stored in an array at index 4.",
    "genius": "It bridges the gap between human meaning and computer memory. You don't need to loop through an array to find 'Alice'. The key mathematically calculates its own exact memory address, allowing for instantaneous O(1) retrieval.",
    "practiceProblems": [
      { "name": "Two Sum", "link": "https://leetcode.com/problems/two-sum/" },
      { "name": "Contains Duplicate", "link": "https://leetcode.com/problems/contains-duplicate/" },
      { "name": "Longest Consecutive Sequence", "link": "https://leetcode.com/problems/longest-consecutive-sequence/" }
    ]
  },
  "bfs_graph": {
    "whatItIs": "Breadth-First Search (BFS) is a graph traversal algorithm that explores the graph horizontally, visiting all immediate neighbors of a node before moving deeper.",
    "howItWorks": "BFS requires a Queue. You enqueue the start node. Then, you repeatedly dequeue the front node, process it, and enqueue all of its unvisited neighbors. Because Queues are First-In-First-Out, nodes closer to the start are always processed before nodes further away.",
    "genius": "Because it radiates outward level-by-level like a water ripple, BFS mathematically guarantees that the first time it discovers a node, it has found the Absolute Shortest Path to that node in an unweighted graph.",
    "comparisons": "DFS uses a Stack and explores deep into dead-ends. BFS uses a Queue and explores wide. BFS guarantees shortest paths, but requires more memory to store the wide perimeter of nodes.",
    "practiceProblems": [
      { "name": "Rotting Oranges", "link": "https://leetcode.com/problems/rotting-oranges/" },
      { "name": "Pacific Atlantic Water Flow", "link": "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      { "name": "Word Ladder", "link": "https://leetcode.com/problems/word-ladder/" }
    ]
  },
  "bubble_sort": {
    "whatItIs": "Bubble Sort is a foundational sorting algorithm that repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order.",
    "howItWorks": "Multiple passes are made through the array. In each pass, the algorithm compares index 0 to index 1, then 1 to 2, then 2 to 3. If the left item is larger, they swap. By the end of the first pass, the largest element has 'bubbled' up to the very end of the array.",
    "genius": "While considered inefficient, Bubble Sort can be optimized with a boolean 'swapped' flag. If the algorithm completes a full pass without making a single swap, it knows the array is fully sorted and can terminate early.",
    "practiceProblems": [
      { "name": "Sort Colors", "link": "https://leetcode.com/problems/sort-colors/" }
    ]
  },
  "two_pointers_sum": {
    "whatItIs": "The Two Pointers technique involves using two integer variables as 'pointers' to iterate through a data structure simultaneously, usually starting from opposite ends.",
    "howItWorks": "In a sorted array, you place a 'left' pointer at index 0 (the smallest value) and a 'right' pointer at the end (the largest value). If the sum of both pointers is too big, you move the 'right' pointer left to decrease the sum. If the sum is too small, you move the 'left' pointer right to increase the sum.",
    "genius": "It turns a brute-force O(n^2) nested loop problem into an elegant O(n) single-pass algorithm. By leveraging the fact that the array is sorted, every movement of a pointer logically eliminates invalid combinations.",
    "practiceProblems": [
      { "name": "Two Sum II - Input Array Is Sorted", "link": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { "name": "Valid Palindrome", "link": "https://leetcode.com/problems/valid-palindrome/" },
      { "name": "3Sum", "link": "https://leetcode.com/problems/3sum/" },
      { "name": "Container With Most Water", "link": "https://leetcode.com/problems/container-with-most-water/" }
    ]
  },
  "sliding_window_max": {
    "whatItIs": "The Sliding Window technique is used to process sequential data by maintaining a subset (a 'window') of elements that satisfy a specific condition.",
    "howItWorks": "Maintain a left and right pointer. Expand the right pointer to add new elements into the window, accumulating their values. If the window violates the size constraint, shrink it by moving the left pointer and subtracting the oldest element's value.",
    "genius": "Instead of recalculating the sum of a subarray from scratch (which takes O(k) repetitive work per step), the algorithm reuses previous calculations. It simply adds the newest element and subtracts the oldest element in O(1) time.",
    "practiceProblems": [
      { "name": "Best Time to Buy and Sell Stock", "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { "name": "Longest Substring Without Repeating Characters", "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { "name": "Minimum Window Substring", "link": "https://leetcode.com/problems/minimum-window-substring/" }
    ]
  },
  "prefix_sum_array": {
    "whatItIs": "A Prefix Sum array is an algorithmic precomputation technique where the element at index `i` stores the sum of all elements from index `0` up to `i`.",
    "howItWorks": "You iterate through the original array exactly once, keeping a running tally of the total sum, and storing that running total into a new Prefix Array.",
    "genius": "If you need to find the sum of a subarray spanning from index `L` to `R`, you do not need a loop. You can find the exact sum instantly in O(1) time using the mathematical formula: `Prefix[R] - Prefix[L-1]`.",
    "practiceProblems": [
      { "name": "Range Sum Query - Immutable", "link": "https://leetcode.com/problems/range-sum-query-immutable/" },
      { "name": "Subarray Sum Equals K", "link": "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { "name": "Product of Array Except Self", "link": "https://leetcode.com/problems/product-of-array-except-self/" }
    ]
  },
  "string_builder": {
    "whatItIs": "String Building is an optimization pattern used to efficiently construct large strings out of smaller characters or substrings.",
    "howItWorks": "Instead of repeatedly doing `s = s + char`, you append characters into an array (`arr.append(char)`). Once all characters are collected, you join them together in a single operation (`\"\".join(arr)`).",
    "genius": "In languages like Python and Java, strings are IMMUTABLE. This means doing `s = s + char` forces the computer to allocate a brand new block of memory and copy the entire string over. Doing this in a loop results in a disastrous O(n^2) time complexity. Using an array bypasses this, dropping the time down to O(n).",
    "practiceProblems": [
      { "name": "Valid Anagram", "link": "https://leetcode.com/problems/valid-anagram/" },
      { "name": "Encode and Decode Strings", "link": "https://leetcode.com/problems/encode-and-decode-strings/" }
    ]
  },
  "fast_slow_pointer": {
    "whatItIs": "Also known as Floyd's Tortoise and Hare, this algorithmic pattern uses two pointers moving through a sequence at different speeds.",
    "howItWorks": "The 'slow' pointer moves forward 1 step at a time. The 'fast' pointer moves forward 2 steps at a time. They iterate simultaneously.",
    "genius": "This mathematical trick accomplishes two incredible things: 1) If the linked list has a loop, the fast pointer will eventually 'lap' the slow pointer and they will collide. 2) If there is no loop, the moment the fast pointer reaches the end of the list, the slow pointer will be sitting perfectly at the exact middle node.",
    "comparisons": "Detecting a cycle normally requires a Hashset to remember visited nodes, which takes O(n) extra memory. The Fast/Slow pointer technique solves it in O(1) constant memory.",
    "practiceProblems": [
      { "name": "Linked List Cycle", "link": "https://leetcode.com/problems/linked-list-cycle/" },
      { "name": "Find the Duplicate Number", "link": "https://leetcode.com/problems/find-the-duplicate-number/" },
      { "name": "Middle of the Linked List", "link": "https://leetcode.com/problems/middle-of-the-linked-list/" }
    ]
  },
  "monotonic_stack": {
    "whatItIs": "A Monotonic Stack is a stack whose elements are heavily restricted: they must be strictly increasing or strictly decreasing from bottom to top.",
    "howItWorks": "Before pushing a new element onto the stack, you must inspect the top of the stack. If the new element would break the monotonic property, you pop elements off the stack until the property is restored, and only then do you push the new element.",
    "genius": "Every time an element is forcibly popped off the stack, a relationship is discovered. The popped element has just found its 'Next Greater Element'. This allows you to solve complex O(n^2) range query problems in an elegant O(n) single pass.",
    "practiceProblems": [
      { "name": "Daily Temperatures", "link": "https://leetcode.com/problems/daily-temperatures/" },
      { "name": "Largest Rectangle in Histogram", "link": "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
      { "name": "Car Fleet", "link": "https://leetcode.com/problems/car-fleet/" }
    ]
  },
  "dfs_graph": {
    "whatItIs": "Depth-First Search (DFS) is a core graph traversal algorithm that explores as deep as possible along an isolated branch before hitting a dead end and backtracking.",
    "howItWorks": "It utilizes a Stack. You push the starting node onto the stack. Then, you repeatedly pop a node, mark it as visited, and push all of its unvisited neighbors onto the stack. The Last-In-First-Out nature of the stack forces the algorithm to dive deep into the newest neighbors.",
    "genius": "Because it relies on a Stack, it can be implemented without an explicit array by hijacking the computer's own 'Recursion Call Stack'. This allows you to traverse incredibly complex mazes and puzzles with just a few elegant lines of recursive code.",
    "comparisons": "DFS explores deep into dead-ends, while BFS explores wide. DFS uses less memory on wide trees, but does not mathematically guarantee the shortest path.",
    "practiceProblems": [
      { "name": "Number of Islands", "link": "https://leetcode.com/problems/number-of-islands/" },
      { "name": "Max Area of Island", "link": "https://leetcode.com/problems/max-area-of-island/" },
      { "name": "Clone Graph", "link": "https://leetcode.com/problems/clone-graph/" }
    ]
  },
  "bfs_tree": {
    "whatItIs": "Tree BFS (also known as Level-Order Traversal) is an algorithm that visits all nodes on the current horizontal level of a tree before moving to the next level down.",
    "howItWorks": "It requires a Queue. You enqueue the root node. In a loop, you dequeue the front node, process its value, and enqueue its left and right children. The First-In-First-Out nature of the queue ensures children are never processed until the current generation is finished.",
    "genius": "Standard recursive DFS goes deep, rendering it impossible to group nodes by their horizontal level. BFS is the only mathematical way to process hierarchical data horizontally.",
    "comparisons": "DFS uses a Stack, BFS uses a Queue. The code logic is almost identical, but swapping the underlying data structure fundamentally alters the shape of the traversal.",
    "practiceProblems": [
      { "name": "Binary Tree Level Order Traversal", "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { "name": "Binary Tree Right Side View", "link": "https://leetcode.com/problems/binary-tree-right-side-view/" }
    ]
  },
  "binary_search_insert": {
    "whatItIs": "Search Insert Position is a direct application of Binary Search, used specifically to determine where a new element belongs inside a sorted array.",
    "howItWorks": "You run a standard binary search loop. If the target is found, you return its index. If the target is missing, the loop eventually breaks. At the exact moment the loop breaks, the 'left' pointer will be resting precisely on the index where the element should be inserted.",
    "genius": "It seamlessly bridges the gap between searching and sorting. By knowing exactly where to insert a new element in O(log n) time, you can maintain a dynamically growing sorted array without ever having to call a sorting function.",
    "practiceProblems": [
      { "name": "Search Insert Position", "link": "https://leetcode.com/problems/search-insert-position/" },
      { "name": "Koko Eating Bananas", "link": "https://leetcode.com/problems/koko-eating-bananas/" }
    ]
  },
  "backtrack_subsets": {
    "whatItIs": "Backtracking is an algorithmic technique for generating all possible configurations, combinations, or permutations of a dataset.",
    "howItWorks": "It builds a solution incrementally using recursive DFS. It makes a choice (e.g., 'include element A'), explores all future possibilities down that path, and then 'backtracks' (undoes the choice) to explore the alternative path (e.g., 'exclude element A').",
    "genius": "It elegantly traverses a massive, exponential decision tree. By structuring choices recursively, the algorithm can instantly abandon (prune) invalid branches of the tree, saving massive amounts of computation time compared to naive brute force.",
    "practiceProblems": [
      { "name": "Subsets", "link": "https://leetcode.com/problems/subsets/" },
      { "name": "Permutations", "link": "https://leetcode.com/problems/permutations/" },
      { "name": "Combination Sum", "link": "https://leetcode.com/problems/combination-sum/" },
      { "name": "Word Search", "link": "https://leetcode.com/problems/word-search/" }
    ]
  }
};
