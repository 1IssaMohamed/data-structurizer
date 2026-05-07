"""
==========================================================================
ALGORITHM LIBRARY
==========================================================================
This is where all the "Recipes" live. Each function here is an 
algorithm that the user can choose to visualize. 

If you want to add a new algorithm, just define a new function here!
"""

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
    # We force start_node to string to match JSON keys
    start_node = str(start_node)
    visited = []
    queue = [start_node]
    visited.append(start_node)
    
    while queue:
        current = queue.pop(0)
        
        # neighbors are expected to be strings or converted to strings
        neighbors = graph.get(str(current), [])
        
        for neighbor in neighbors:
            neighbor_str = str(neighbor)
            if neighbor_str not in visited:
                visited.append(neighbor_str)
                queue.append(neighbor_str)
                
    return visited

def bubble_sort(nums):
    n = len(nums)
    for i in range(n):
        for j in range(0, n - i - 1):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
    return nums

def two_pointers_sum(nums, target):
    l, r = 0, len(nums) - 1
    while l < r:
        s = nums[l] + nums[r]
        if s == target:
            return [l, r]
        elif s < target:
            l += 1
        else:
            r -= 1
    return [-1, -1]

def sliding_window_max(nums, k):
    res = []
    l = 0
    window_sum = sum(nums[:k])
    res.append(window_sum)
    for r in range(k, len(nums)):
        window_sum += nums[r] - nums[l]
        res.append(window_sum)
        l += 1
    return res

def prefix_sum_array(nums):
    prefix = [0] * len(nums)
    prefix[0] = nums[0]
    for i in range(1, len(nums)):
        prefix[i] = prefix[i - 1] + nums[i]
    return prefix

def string_builder(strings):
    res = []
    for s in strings:
        res.append(s)
    return "".join(res)

def fast_slow_pointer(values):
    # Simulating a linked list using an array
    slow = 0
    fast = 0
    while fast < len(values) and fast + 1 < len(values):
        slow += 1
        fast += 2
    return slow

def monotonic_stack(nums):
    res = [-1] * len(nums)
    stack = []
    for i in range(len(nums)):
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            res[idx] = nums[i]
        stack.append(i)
    return res

def dfs_graph(graph, start_node):
    start_node = str(start_node)
    visited = []
    stack = [start_node]
    
    while stack:
        current = stack.pop()
        if current not in visited:
            visited.append(current)
            neighbors = graph.get(str(current), [])
            # Push in reverse so we visit in standard left-to-right order
            for neighbor in reversed(neighbors):
                neighbor_str = str(neighbor)
                if neighbor_str not in visited:
                    stack.append(neighbor_str)
                    
    return visited

def bfs_tree(tree):
    # Tree is an array representation
    if not tree:
        return []
        
    visited = []
    queue = [0] # stores indices
    
    while queue:
        curr_idx = queue.pop(0)
        if curr_idx < len(tree) and tree[curr_idx] is not None:
            visited.append(tree[curr_idx])
            left_child = 2 * curr_idx + 1
            right_child = 2 * curr_idx + 2
            
            if left_child < len(tree) and tree[left_child] is not None:
                queue.append(left_child)
            if right_child < len(tree) and tree[right_child] is not None:
                queue.append(right_child)
                
    return visited

def binary_search_insert(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            return m
        elif nums[m] < target:
            l = m + 1
        else:
            r = m - 1
    return l

def backtrack_subsets(nums):
    subset = []
    result = []
    
    def dfs(i):
        if i >= len(nums):
            result.append(subset.copy())
            return
            
        # Decision to include nums[i]
        subset.append(nums[i])
        dfs(i + 1)
        
        # Decision to NOT include nums[i]
        subset.pop()
        dfs(i + 1)
        
    dfs(0)
    return result
