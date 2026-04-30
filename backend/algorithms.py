# Paste your algorithm here.
# Make sure to define it clearly. We will test with binarysearch_lower_bound.

def binary_search(nums, target):
    l, r = 0, len(nums) - 1

    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            return m            # found it
        if nums[m] < target:
            l = m + 1           # target is in the right half
        else:
            r = m - 1           # target is in the left half

    return -1  # not found
    
def binarysearch_lower_bound(nums, target):
    l, r = 0, len(nums)

    while l < r:
        m = (l + r) // 2
        if nums[m] < target:
            l = m + 1     # too small — look right
        else:
            r = m         # candidate — try to find something earlier

    return l  # l == r == insertion point

def upper_bound(nums, target):
    l, r = 0, len(nums)

    while l < r:
        m = (l + r) // 2
        if nums[m] <= target:
            l = m + 1     # equal or smaller — look right
        else:
            r = m         # candidate

    return l

# --- Phase 1 Reference Algorithms ---
# (You can delete the bodies of these later to practice writing them from scratch!)

def stack_demo(operations):
    # operations is a list of integers. Positive = push, -1 = pop
    stack = []
    for op in operations:
        if op == -1:
            if stack:
                stack.pop()
        else:
            stack.append(op)
    return stack

def queue_demo(operations):
    # operations is a list of integers. Positive = enqueue, -1 = dequeue
    queue = []
    head = 0
    tail = 0
    for op in operations:
        if op == -1:
            if head < tail:
                head += 1
        else:
            queue.append(op)
            tail += 1
    return queue

def linked_list_traverse(values):
    # Flat array representation of a linked list to keep it JSON serializable
    curr_idx = 0
    result = []
    while curr_idx < len(values):
        result.append(values[curr_idx])
        curr_idx += 1
    return result

# --- Phase 2 Reference Algorithms ---
def bst_search(tree, target):
    # tree is a level-order array: [10, 5, 15, 2, None, 12, 20]
    curr_idx = 0
    while curr_idx < len(tree) and tree[curr_idx] is not None:
        if tree[curr_idx] == target:
            return curr_idx
        elif target < tree[curr_idx]:
            curr_idx = 2 * curr_idx + 1 # Left child
        else:
            curr_idx = 2 * curr_idx + 2 # Right child
    return -1

def heap_insert(heap, val):
    heap.append(val)
    curr_idx = len(heap) - 1
    
    # Sift up (Min Heap)
    while curr_idx > 0:
        parent_idx = (curr_idx - 1) // 2
        if heap[curr_idx] < heap[parent_idx]:
            # Swap
            heap[curr_idx], heap[parent_idx] = heap[parent_idx], heap[curr_idx]
            curr_idx = parent_idx
        else:
            break
    return heap

# --- Phase 3 Reference Algorithms ---
def hashmap_demo(keys, num_buckets):
    buckets = [[] for _ in range(num_buckets)]
    
    for current_key in keys:
        # Simple hash function: length of string modulo num_buckets
        # For integers, just value modulo num_buckets
        if isinstance(current_key, str):
            hash_val = len(current_key) % num_buckets
        else:
            hash_val = current_key % num_buckets
            
        # Append to bucket (handling collisions via chaining)
        buckets[hash_val].append(current_key)
        
    return buckets

def bfs_graph(graph, start_node):
    # Graph is an adjacency list: {"0": [1, 2], "1": [0, 3]...}
    # Using string keys to ensure JSON serialization
    visited = []
    queue = [start_node]
    visited.append(start_node)
    
    while queue:
        current = queue.pop(0)
        
        # We ensure graph keys are strings because JSON converts dict keys to strings
        neighbors = graph.get(str(current), [])
        
        for neighbor in neighbors:
            if neighbor not in visited:
                visited.append(neighbor)
                queue.append(neighbor)
                
    return visited

# --- Phase 4 Reference Algorithms (Sorting) ---
def bubble_sort(nums):
    n = len(nums)
    for i in range(n):
        for j in range(0, n - i - 1):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
    return nums
