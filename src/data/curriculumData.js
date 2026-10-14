// =========================================================================
// AdaptLearn Comprehensive Multi-Disciplinary Curriculum Data Store
// Expanded with diverse, authentic topics across Computer Science & Engineering,
// IT, and AI & Data Science
// =========================================================================

export const DEPARTMENTS = [
  { id: 'cse', name: 'Computer Science & Engineering', code: 'CSE', icon: 'Code' },
  { id: 'it', name: 'Information Technology', code: 'IT', icon: 'Cpu' },
  { id: 'aids', name: 'Artificial Intelligence & Data Science', code: 'AI & DS', icon: 'Brain' },
  { id: 'ece', name: 'Electronics & Communication Engg.', code: 'ECE', icon: 'Radio' },
  { id: 'eee', name: 'Electrical & Electronics Engg.', code: 'EEE', icon: 'Zap' },
  { id: 'mech', name: 'Mechanical Engineering', code: 'MECH', icon: 'Wrench' }
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const SUBJECTS_MAP = {
  // CSE Semester 3: Data Structures & Algorithms + Digital Principles
  'cse-3': [
    {
      id: 'dsa',
      code: 'CS3301',
      title: 'Data Structures & Algorithms',
      description: 'Asymptotic complexity, linked structures, non-linear trees, graph algorithms, and dynamic programming.',
      color: '#6366f1',
      units: [
        {
          id: 'dsa-u1',
          number: 1,
          title: 'Linear Structures & Asymptotic Analysis',
          description: 'Big-O, Omega, Theta bounds, Master Theorem, Linked Lists, Stacks and Queues.',
          topics: [
            {
              id: 'dsa-u1-t1',
              title: 'Time & Space Complexity (Asymptotic Notation)',
              summary: 'Formal definitions of O, Omega, and Theta bounds; Master theorem recurrence analysis.',
              estimatedMinutes: 20,
              materials: {
                theory: `### Algorithmic Complexity: Asymptotic Bounds
Asymptotic analysis models algorithm runtime as input size $n \\to \\infty$, independent of processor architecture.

#### Dominance Order:
$$O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n) < O(n!)$$

#### The Master Theorem Formulation:
For recurrences of the form $T(n) = aT(n/b) + f(n)$ where $a \\ge 1, b > 1$:
1. If $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
2. If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.
3. If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds, $T(n) = \\Theta(f(n))$.`,
                codeSnippet: `// Master Theorem Case 2: Merge Sort
// T(n) = 2T(n/2) + O(n) -> a=2, b=2, f(n)=n
// n^(log_2 2) = n^1 -> Matches f(n) -> Theta(n log n)`,
                keyTakeaways: [
                  'Drop constant factors and non-dominant terms.',
                  'Space complexity counts auxiliary heap and stack frames, excluding input storage.'
                ],
                misconceptions: [
                  'Assuming O(log n) is proportional to n/2: dividing by 2 iteratively reaches 1 in log2(n) steps.'
                ]
              },
              questions: [
                {
                  id: 'q-dsa-1',
                  text: 'What is the tightest upper bound runtime of binary search on a sorted array of size n?',
                  code: 'int binarySearch(int arr[], int l, int r, int x) {\n  while (l <= r) {\n    int m = l + (r - l) / 2;\n    if (arr[m] == x) return m;\n    if (arr[m] < x) l = m + 1;\n    else r = m - 1;\n  }\n  return -1;\n}',
                  options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                  correctIndex: 1,
                  difficulty: 'easy',
                  bloomLevel: 'Understand',
                  hint: 'In each iteration, the remaining search interval is cut in half.',
                  explanation: 'Binary search splits the search interval in half every iteration: n -> n/2 -> n/4 ... reaching 1 in log₂(n) steps, yielding O(log n).',
                  distractorExplanations: {
                    0: 'O(1) is only the best case (element at middle on first step).',
                    2: 'O(n) describes linear search.',
                    3: 'O(n log n) is for divide-and-conquer sorting, not searching.'
                  }
                },
                {
                  id: 'q-dsa-2',
                  text: 'Solve recurrence: T(n) = 2T(n/2) + n log n using extended Master Theorem.',
                  options: ['Θ(n log n)', 'Θ(n log² n)', 'Θ(n²)', 'Θ(n)'],
                  correctIndex: 1,
                  difficulty: 'expert',
                  bloomLevel: 'Analyze',
                  hint: 'Compare n^(log_b a) = n^1 with f(n) = n log n (k=1).',
                  explanation: 'Since a=2, b=2, n^(log_2 2) = n. With f(n) = n log¹ n, extended Master Theorem Case 2 dictates Theta(n^{log_b a} * log^{k+1} n) = Theta(n log² n).',
                  distractorExplanations: {
                    0: 'Theta(n log n) applies when f(n) = n (Merge Sort).',
                    2: 'Theta(n^2) represents polynomial dominance which does not apply here.',
                    3: 'Theta(n) is smaller than work at the root.'
                  }
                }
              ]
            },
            {
              id: 'dsa-u1-t2',
              title: 'Linked Lists & Floyd’s Cycle Detection',
              summary: 'Pointer manipulation, doubly linked nodes, and the Tortoise-and-Hare algorithm.',
              estimatedMinutes: 25,
              materials: {
                theory: `### Linked Lists & Pointer Traversal
Nodes are stored arbitrarily in heap memory and connected via pointers.

#### Floyd's Cycle-Finding Algorithm:
- Two pointers: **Slow** moves 1 step per tick, **Fast** moves 2 steps per tick.
- If a loop exists of length $C$, the relative distance between Fast and Slow decreases by $(2 - 1) = 1$ step each iteration modulo $C$.
- Collision is guaranteed within $O(n)$ time using strictly $O(1)$ auxiliary memory.`,
                codeSnippet: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true; // Loop detected
    }
    return false;
}`,
                keyTakeaways: [
                  'Singly linked list deletion requires predecessor pointer, while doubly linked list node can be removed in O(1) given its own reference.'
                ],
                misconceptions: [
                  'Checking only fast != null: accessing fast->next->next without checking fast->next leads to null pointer dereference.'
                ]
              },
              questions: [
                {
                  id: 'q-dsa-ll-1',
                  text: 'Why does Floyd’s algorithm guarantee collision inside a loop of length C without skipping over the slow pointer?',
                  options: [
                    'Because fast moves 3 steps each turn',
                    'Because the relative distance between fast and slow decreases by exactly 1 node per iteration',
                    'Because slow stops when it enters the cycle',
                    'Because fast resets to the head on cycle entry'
                  ],
                  correctIndex: 1,
                  difficulty: 'medium',
                  bloomLevel: 'Understand',
                  hint: 'Calculate relative velocity: V_rel = 2 - 1 = 1.',
                  explanation: 'Since fast moves at 2 nodes/tick and slow at 1 node/tick, fast closes the gap by exactly 1 node per tick, ensuring no overshoot.',
                  distractorExplanations: {
                    0: 'Floyd uses slow=1, fast=2.',
                    2: 'Both pointers advance continuously.',
                    3: 'Neither pointer resets.'
                  }
                }
              ]
            },
            {
              id: 'dsa-u1-t3',
              title: 'Stacks, Queues & Monotonic Stack Patterns',
              summary: 'LIFO & FIFO mechanisms, circular queues, next greater element problem.',
              estimatedMinutes: 25,
              materials: {
                theory: `### Stacks (LIFO) and Queues (FIFO)
- **Monotonic Stack**: Maintains elements in strictly increasing or decreasing order to solve range-minimum or next greater element queries in $O(n)$ total time.
- **Circular Queue**: Utilizes modular arithmetic $(rear + 1) \\% \\text{capacity}$ to avoid memory wastage in fixed arrays.`,
                codeSnippet: `// Next Greater Element using Monotonic Decreasing Stack
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> res(n, -1);
    stack<int> st; // stores indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[i] > arr[st.top()]) {
            res[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}`,
                keyTakeaways: [
                  'Each array element is pushed and popped at most once in a monotonic stack, guaranteeing O(n) amortized time.'
                ],
                misconceptions: [
                  'Assuming nested while loop inside monotonic stack makes it O(n^2): total pops across the whole array cannot exceed n.'
                ]
              },
              questions: [
                {
                  id: 'q-dsa-st-1',
                  text: 'What is the total amortized time complexity of finding the next greater element for all n items using a monotonic stack?',
                  options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(1)'],
                  correctIndex: 1,
                  difficulty: 'medium',
                  bloomLevel: 'Apply',
                  hint: 'Count the total number of push and pop operations across the entire array.',
                  explanation: 'Each element enters the stack once and leaves the stack at most once. Hence, 2n operations total = O(n) amortized runtime.',
                  distractorExplanations: {
                    0: 'No sorting is performed, so no log factor is incurred.',
                    2: 'O(n^2) is the naive nested loop approach.',
                    3: 'O(1) is per-push, but processing all n elements requires O(n).'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'dsa-u2',
          number: 2,
          title: 'Trees & Balanced Search Trees',
          description: 'Binary Search Trees (BST), AVL Rotations, Red-Black Trees, and Heaps.',
          topics: [
            {
              id: 'dsa-u2-t1',
              title: 'Binary Search Trees & AVL Rotations',
              summary: 'BST properties, balance factor BF = Height(L) - Height(R), LL, RR, LR, RL rotations.',
              estimatedMinutes: 30,
              materials: {
                theory: `### AVL Balanced Binary Search Trees
In AVL trees, the Balance Factor BF of every node is strictly constrained to $\\{-1, 0, +1\\}$:
$$\\text{BF}(u) = \\text{Height}(\\text{LeftChild}) - \\text{Height}(\\text{RightChild})$$

#### Rotations:
1. **LL Case (BF = +2, Child BF >= 0):** Single Right Rotation.
2. **RR Case (BF = -2, Child BF <= 0):** Single Left Rotation.
3. **LR Case (BF = +2, Child BF < 0):** Double Rotation (Left rotate left child, then Right rotate node).
4. **RL Case (BF = -2, Child BF > 0):** Double Rotation (Right rotate right child, then Left rotate node).`,
                codeSnippet: `Node* rotateRight(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = 1 + max(height(y->left), height(y->right));
    x->height = 1 + max(height(x->left), height(x->right));
    return x;
}`,
                keyTakeaways: [
                  'AVL trees guarantee strict O(log n) worst-case lookup, insert, and delete.',
                  'Single insertion requires at most 1 rotation (single or double).'
                ],
                misconceptions: [
                  'Thinking deletion also requires at most 1 rotation: deletion height reduction can propagate up to O(log n) rotations.'
                ]
              },
              questions: [
                {
                  id: 'q-dsa-avl-1',
                  text: 'Inserting keys [10, 20, 30] sequentially into an initially empty AVL tree produces which rotation?',
                  options: ['Single Left Rotation (RR)', 'Single Right Rotation (LL)', 'LR Double Rotation', 'RL Double Rotation'],
                  correctIndex: 0,
                  difficulty: 'easy',
                  bloomLevel: 'Apply',
                  hint: 'All keys are strictly ascending, creating right-heavy skew.',
                  explanation: 'Inserting 10, then right child 20, then right child 30 causes node 10 to have Balance Factor -2. This is an RR imbalance corrected by a single Left Rotation.',
                  distractorExplanations: {
                    1: 'LL occurs with strictly descending insertions.',
                    2: 'LR requires inserting into the inner right child of the left child.',
                    3: 'RL requires an inner left child of the right child.'
                  }
                }
              ]
            },
            {
              id: 'dsa-u2-t2',
              title: 'Binary Heaps & Priority Queues',
              summary: 'Min/Max-heap property, array representation, Heapify in O(n), and Heap Sort.',
              estimatedMinutes: 25,
              materials: {
                theory: `### Binary Heaps
A binary heap is a complete binary tree where every node satisfies the heap property:
- **Max-Heap:** $A[\\text{parent}(i)] \\ge A[i]$.
- In array representation:
  - $\\text{LeftChild}(i) = 2i + 1$
  - $\\text{RightChild}(i) = 2i + 2$
  - $\\text{Parent}(i) = \\lfloor (i - 1) / 2 \\rfloor$

#### Linear Time Build-Heap:
Building a heap from an arbitrary array takes $O(n)$ time using bottom-up sift-down, because nodes near the leaves have very small heights:
$$\\sum_{h=0}^{\\lfloor \\log n \\rfloor} \\frac{n}{2^{h+1}} O(h) = O(n)$$`,
                codeSnippet: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}`,
                keyTakeaways: [
                  'Building a heap takes O(n), while extracting the minimum/maximum takes O(log n).'
                ],
                misconceptions: [
                  'Assuming building a heap takes O(n log n): repeated insertions take O(n log n), but bottom-up buildHeap is O(n).'
                ]
              },
              questions: [
                {
                  id: 'q-dsa-hp-1',
                  text: 'What is the tightest asymptotic time complexity of building a binary heap from an unordered array of n elements using bottom-up heapify?',
                  options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n^2)'],
                  correctIndex: 0,
                  difficulty: 'hard',
                  bloomLevel: 'Analyze',
                  hint: 'Most nodes reside close to the bottom leaves with height 0 or 1.',
                  explanation: 'The height-weighted sum over all nodes converges to O(n) because half the nodes have height 0, a quarter have height 1, and so on.',
                  distractorExplanations: {
                    1: 'O(n log n) is for n successive heap inserts, not bottom-up buildHeap.',
                    2: 'O(log n) is for a single extraction or insertion.',
                    3: 'O(n^2) is vastly suboptimal.'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'dsa-u3',
          number: 3,
          title: 'Graph Algorithms & Shortest Paths',
          description: 'Graph representations, BFS, DFS, Dijkstra, Bellman-Ford, and Minimum Spanning Trees.',
          topics: [
            {
              id: 'dsa-u3-t1',
              title: 'Graph Traversals (BFS & DFS) & Bipartite Checking',
              summary: 'Queue vs Call stack, cycle detection in directed/undirected graphs, 2-coloring.',
              estimatedMinutes: 25,
              materials: {
                theory: `### Graph Representations & Traversals
- **Adjacency List:** $O(V + E)$ space, optimal for sparse graphs.
- **BFS (Breadth-First Search):** Uses a queue; explores concentric layers. Finds unweighted shortest paths.
- **DFS (Depth-First Search):** Uses a stack/recursion; backtracks upon reaching dead ends.
- **Bipartite Graph Check:** A graph is bipartite if and only if it contains no odd-length cycles (verifiable via 2-coloring during BFS/DFS).`,
                codeSnippet: `bool isBipartite(vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> color(n, -1);
    for (int start = 0; start < n; start++) {
        if (color[start] != -1) continue;
        queue<int> q;
        q.push(start);
        color[start] = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : graph[u]) {
                if (color[v] == -1) {
                    color[v] = 1 - color[u];
                    q.push(v);
                } else if (color[v] == color[u]) return false; // Odd cycle
            }
        }
    }
    return true;
}`,
                keyTakeaways: [
                  'BFS guarantees minimum hops in unweighted graphs.',
                  'Cycle in directed graph is detected via back-edges on active recursion stack.'
                ],
                misconceptions: [
                  'Using BFS for weighted shortest paths: BFS fails when edge weights are non-uniform; Dijkstra is required.'
                ]
              },
              questions: [
                {
                  id: 'q-dsa-gr-1',
                  text: 'A connected graph G is bipartite if and only if:',
                  options: [
                    'It contains no odd-length cycles',
                    'It has an equal number of vertices and edges',
                    'It is a complete tree',
                    'All vertices have even degrees'
                  ],
                  correctIndex: 0,
                  difficulty: 'medium',
                  bloomLevel: 'Understand',
                  hint: 'Think of 2-coloring vertices alternating along any cycle.',
                  explanation: 'A graph is 2-colorable (bipartite) if and only if every cycle has an even number of edges, preventing a vertex from conflicting with its neighbor.',
                  distractorExplanations: {
                    1: 'Vertex and edge counts do not dictate bipartiteness.',
                    2: 'All trees are bipartite, but non-tree graphs can also be bipartite.',
                    3: 'Even degrees define an Eulerian graph, not bipartite.'
                  }
                }
              ]
            },
            {
              id: 'dsa-u3-t2',
              title: 'Shortest Path: Dijkstra vs Bellman-Ford',
              summary: 'Greedy min-priority queue vs dynamic relaxation; negative weight cycles.',
              estimatedMinutes: 30,
              materials: {
                theory: `### Shortest Path Algorithms
- **Dijkstra's Algorithm:**
  - Greedy approach using Min-Heap priority queue.
  - Time Complexity: $O((V + E) \\log V)$.
  - **Limitation:** Fails if any edge weight is negative because once a node is settled, it is never re-evaluated.
- **Bellman-Ford Algorithm:**
  - Relaxes all $|E|$ edges $|V| - 1$ times.
  - Time Complexity: $O(V \\cdot E)$.
  - Detects negative weight cycles on the $|V|$-th relaxation pass.`,
                codeSnippet: `// Bellman-Ford Negative Cycle Detection
for (int i = 1; i <= V - 1; i++) {
    for (auto edge : edges) {
        if (dist[edge.u] != INF && dist[edge.u] + edge.wt < dist[edge.v]) {
            dist[edge.v] = dist[edge.u] + edge.wt;
        }
    }
}
// Check for negative cycle
for (auto edge : edges) {
    if (dist[edge.u] != INF && dist[edge.u] + edge.wt < dist[edge.v]) {
        cout << "Negative cycle detected!";
    }
}`,
                keyTakeaways: [
                  'Use Dijkstra for positive weights for performance; use Bellman-Ford when negative weights or cycle detection is required.'
                ],
                misconceptions: [
                  'Assuming adding a large constant C to all edge weights fixes Dijkstra for negative weights: this alters shortest paths because paths with more edges are penalized more.'
                ]
              },
              questions: [
                {
                  id: 'q-dsa-sp-1',
                  text: 'Why does adding a positive constant C to all edge weights fail to fix Dijkstra’s algorithm on graphs with negative weights?',
                  options: [
                    'Because paths with more edges receive more total penalty (k * C), changing the true shortest path',
                    'Because Dijkstra cannot process positive weights',
                    'Because C turns the graph into a directed acyclic graph',
                    'Because queue priority becomes negative'
                  ],
                  correctIndex: 0,
                  difficulty: 'hard',
                  bloomLevel: 'Analyze',
                  hint: 'Compare a 1-edge path of weight 5 vs a 3-edge path of weights -2, -2, -2.',
                  explanation: 'If path P1 has 1 edge and path P2 has 3 edges, adding C adds 1C to P1 and 3C to P2. The relative ranking changes, corrupting the shortest path.',
                  distractorExplanations: {
                    1: 'Dijkstra is designed specifically for non-negative weights.',
                    2: 'Adding constants does not alter cycle structure.',
                    3: 'Queue priorities remain positive.'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],

  // CSE Semester 4: Operating Systems & Database Systems
  'cse-4': [
    {
      id: 'os',
      code: 'CS3401',
      title: 'Operating Systems',
      description: 'Processes, concurrency, CPU scheduling, synchronization, deadlocks, and virtual memory.',
      color: '#f59e0b',
      units: [
        {
          id: 'os-u1',
          number: 1,
          title: 'Processes, Threads & CPU Scheduling',
          description: 'Process life-cycle, PCB, Context switches, FCFS, SJF, SRTF, and Round Robin.',
          topics: [
            {
              id: 'os-u1-t1',
              title: 'CPU Scheduling Algorithms & Convoy Effect',
              summary: 'FCFS, SJF, Round Robin time quantum dynamics, and waiting time formulas.',
              estimatedMinutes: 25,
              materials: {
                theory: `### CPU Scheduling Dynamics
- **Turnaround Time:** Completion Time - Arrival Time.
- **Waiting Time:** Turnaround Time - Burst Time.
- **FCFS:** Non-preemptive; causes Convoy Effect where short CPU processes wait behind a long burst.
- **SJF:** Provably optimal for minimizing average waiting time.
- **Round Robin:** Preemptive time slices. If quantum $q$ is too small, context switch overhead dominates; if $q$ is too large, it degenerates to FCFS.`,
                codeSnippet: `// Round Robin Ready Queue Simulation
while (!readyQueue.empty()) {
    Process p = readyQueue.front(); readyQueue.pop();
    int run = min(p.remaining, quantum);
    p.remaining -= run;
    currentTime += run;
    if (p.remaining > 0) readyQueue.push(p);
    else p.turnaround = currentTime - p.arrival;
}`,
                keyTakeaways: ['SJF can lead to starvation of long processes if short processes continuously arrive.'],
                misconceptions: ['Thinking zero burst time waiting implies zero turnaround: arrival delay must be factored in.']
              },
              questions: [
                {
                  id: 'q-os-1',
                  text: 'What happens in Round Robin scheduling if the time quantum is larger than the longest process burst time?',
                  options: [
                    'It behaves identically to First-Come First-Served (FCFS)',
                    'It causes extreme CPU thrashing',
                    'It becomes Shortest Job First',
                    'Processes deadlock'
                  ],
                  correctIndex: 0,
                  difficulty: 'easy',
                  bloomLevel: 'Understand',
                  hint: 'If every job completes in its first slice, no preemption occurs.',
                  explanation: 'Without preemption, processes run to completion in arrival order, matching non-preemptive FCFS.',
                  distractorExplanations: {
                    1: 'Thrashing occurs with tiny time quanta or memory swapping.',
                    2: 'SJF reorders by burst length; RR keeps FIFO order.',
                    3: 'Time quantum does not trigger deadlocks.'
                  }
                }
              ]
            },
            {
              id: 'os-u1-t2',
              title: 'Process Synchronization, Semaphores & Mutexes',
              summary: 'Critical section problem, Peterson\'s algorithm, Counting vs Binary semaphores.',
              estimatedMinutes: 30,
              materials: {
                theory: `### Concurrency & Critical Section
Three requirements for a valid critical section solution:
1. **Mutual Exclusion:** At most one process in critical section at any moment.
2. **Progress:** If no process is in critical section, entry selection cannot be postponed indefinitely.
3. **Bounded Waiting:** A bound must exist on the number of times others enter after a process requests entry.

#### Semaphores:
- **wait(S) / P(S):** Decrements S; blocks if $S \\le 0$.
- **signal(S) / V(S):** Increments S; wakes up a blocked process.`,
                codeSnippet: `// Classical Producer-Consumer with Semaphores
semaphore mutex = 1;
semaphore empty = BUFFER_SIZE;
semaphore full = 0;

void producer() {
    wait(empty);
    wait(mutex);
    // insert item into buffer
    signal(mutex);
    signal(full);
}`,
                keyTakeaways: [
                  'Mutex is an ownership-based locking mechanism; Semaphore is a signaling mechanism.'
                ],
                misconceptions: [
                  'Reversing wait(mutex) and wait(empty): causes deadlock if buffer is full because producer holds mutex while blocked.'
                ]
              },
              questions: [
                {
                  id: 'q-os-sync-1',
                  text: 'In the Producer-Consumer problem, what occurs if the producer executes wait(mutex) BEFORE wait(empty) when the buffer is full?',
                  options: [
                    'Deadlock occurs: Producer holds mutex while waiting for empty slot, blocking consumer from freeing space',
                    'Buffer overflows immediately',
                    'Consumer runs twice as fast',
                    'Mutual exclusion is violated'
                  ],
                  correctIndex: 0,
                  difficulty: 'hard',
                  bloomLevel: 'Analyze',
                  hint: 'Notice who can signal empty when producer holds mutex.',
                  explanation: 'Producer holds mutex and blocks on empty. Consumer cannot enter to consume items because it is blocked on mutex, resulting in deadlock.',
                  distractorExplanations: {
                    1: 'Buffer cannot overflow because entry is blocked.',
                    2: 'Consumer is blocked, not accelerated.',
                    3: 'Mutual exclusion is maintained, but neither thread can proceed.'
                  }
                }
              ]
            },
            {
              id: 'os-u1-t3',
              title: 'Deadlock Detection & Banker’s Safety Algorithm',
              summary: 'Coffman conditions, Resource Allocation Graphs (RAG), and Banker\'s safe state.',
              estimatedMinutes: 30,
              materials: {
                theory: `### Deadlocks in Multiprogramming
#### Four Coffman Conditions (Must hold simultaneously):
1. **Mutual Exclusion:** Resources cannot be shared.
2. **Hold and Wait:** Holding at least 1 resource while waiting for another.
3. **No Preemption:** Resources can only be released voluntarily.
4. **Circular Wait:** Closed chain $P_0 \\to P_1 \\to ... \\to P_0$.

#### Banker's Algorithm:
Avoids deadlock by ensuring system always stays in a **Safe State** where there exists an execution sequence allowing all processes to finish:
$$\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j] \\le \\text{Available}[j]$$`,
                codeSnippet: `// Banker's Safety Condition Check
bool isSafe(int Available[], int Max[][M], int Alloc[][M], int Need[][M]) {
    int Work[M];
    bool Finish[N] = {false};
    // If Need <= Work, simulate completion Work += Alloc
}`,
                keyTakeaways: [
                  'Safe state guarantees no deadlock; unsafe state does not mean deadlock is guaranteed, only that it is possible.'
                ],
                misconceptions: [
                  'Confusing unsafe state with deadlock: an unsafe state is a state from which deadlock cannot be mathematically prevented.'
                ]
              },
              questions: [
                {
                  id: 'q-os-dl-1',
                  text: 'Which of the following statements regarding Safe and Unsafe states in Banker\'s Algorithm is correct?',
                  options: [
                    'An unsafe state is not necessarily a deadlocked state, but deadlock can occur from it',
                    'An unsafe state is always already in deadlock',
                    'A safe state guarantees 100% CPU utilization',
                    'Deadlock prevention and avoidance are identical'
                  ],
                  correctIndex: 0,
                  difficulty: 'medium',
                  bloomLevel: 'Understand',
                  hint: 'Unsafe means the OS cannot guarantee avoiding deadlock if all processes request their maximums.',
                  explanation: 'A system in an unsafe state may still avoid deadlock if processes do not request their maximum resources simultaneously.',
                  distractorExplanations: {
                    1: 'Deadlock is a subset of unsafe states.',
                    2: 'Safety refers to deadlock freedom, not CPU utilization.',
                    3: 'Prevention eliminates Coffman conditions statically; avoidance checks safe states dynamically.'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'dbms',
      code: 'CS3302',
      title: 'Database Management Systems',
      description: 'Relational schema, SQL, Normalization (1NF to BCNF), ACID transactions, and B+ Tree Indexing.',
      color: '#10b981',
      units: [
        {
          id: 'dbms-u1',
          number: 1,
          title: 'Relational Schema & Normalization',
          description: 'Functional dependencies, 1NF, 2NF, 3NF, BCNF, and lossless join decomposition.',
          topics: [
            {
              id: 'dbms-u1-t1',
              title: 'Functional Dependencies & Normalization (1NF to BCNF)',
              summary: 'Eliminating insertion, deletion, and update anomalies through functional dependencies.',
              estimatedMinutes: 25,
              materials: {
                theory: `### Normal Forms Hierarchy
1. **1NF:** Atomic values only.
2. **2NF:** In 1NF + No partial functional dependencies (non-prime attributes must depend on the full candidate key).
3. **3NF:** In 2NF + No transitive dependencies (for $X \\to Y$, $X$ is superkey OR $Y$ is prime).
4. **BCNF:** For every non-trivial $X \\to Y$, $X$ **must** be a superkey.`,
                codeSnippet: `// 3NF vs BCNF
// In 3NF, if Y is part of candidate key, X doesn't need to be superkey.
// In BCNF, X must strictly be a superkey without exception.`,
                keyTakeaways: ['BCNF guarantees lossless join, but does not always preserve functional dependencies.'],
                misconceptions: ['Assuming 3NF tables are always in BCNF: overlapping candidate keys allow 3NF relations to violate BCNF.']
              },
              questions: [
                {
                  id: 'q-dbms-1',
                  text: 'Relation R(A, B, C, D) has candidate key {A, B} and FDs {AB -> C, B -> D}. Which normal form is violated first?',
                  options: ['1NF', '2NF', '3NF', 'BCNF only'],
                  correctIndex: 1,
                  difficulty: 'easy',
                  bloomLevel: 'Apply',
                  hint: 'B is a proper subset of candidate key {A, B}.',
                  explanation: 'Since B is part of the candidate key, B -> D is a partial dependency, violating 2NF.',
                  distractorExplanations: {
                    0: 'Attributes are assumed atomic.',
                    2: '2NF is violated before reaching 3NF analysis.',
                    3: 'BCNF is higher than 2NF.'
                  }
                }
              ]
            },
            {
              id: 'dbms-u1-t2',
              title: 'ACID Properties & Two-Phase Locking (2PL)',
              summary: 'Atomicity, Consistency, Isolation, Durability; Serializability and 2PL protocol.',
              estimatedMinutes: 30,
              materials: {
                theory: `### ACID Transactions & Concurrency Control
- **Atomicity:** All-or-nothing execution (managed by Write-Ahead Logging).
- **Consistency:** Preserves database invariants.
- **Isolation:** Concurrent transactions execute as if sequential (serializable).
- **Durability:** Committed changes persist across power failure.

#### Two-Phase Locking (2PL):
1. **Growing Phase:** Locks acquired, none released.
2. **Shrinking Phase:** Locks released, none acquired.
- **Strict 2PL:** Holds exclusive locks until commit/abort to prevent cascading rollbacks.`,
                codeSnippet: `-- Transaction with Isolation
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
UPDATE Accounts SET balance = balance - 500 WHERE id = 101;
UPDATE Accounts SET balance = balance + 500 WHERE id = 202;
COMMIT;`,
                keyTakeaways: ['2PL guarantees Conflict Serializability but does not prevent deadlocks.'],
                misconceptions: ['Assuming 2PL avoids deadlocks: two transactions can lock resources in opposite order and deadlock.']
              },
              questions: [
                {
                  id: 'q-dbms-tx-1',
                  text: 'What property is guaranteed by the Two-Phase Locking (2PL) protocol, and what problem does it NOT prevent?',
                  options: [
                    'Guarantees Conflict Serializability, but does NOT prevent Deadlocks',
                    'Guarantees Deadlock freedom, but does NOT guarantee Serializability',
                    'Guarantees Durability, but does NOT guarantee Atomicity',
                    'Eliminates need for indexes'
                  ],
                  correctIndex: 0,
                  difficulty: 'medium',
                  bloomLevel: 'Understand',
                  hint: 'Think about cyclic wait when locking multiple tables.',
                  explanation: '2PL mathematically guarantees conflict serializable schedules, but cyclic lock waiting can still cause deadlocks.',
                  distractorExplanations: {
                    1: '2PL does not guarantee deadlock freedom.',
                    2: 'Serializability is concurrency isolation, while durability is handled by recovery logs.',
                    3: 'Indexes are unrelated to locking protocols.'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],

  // AI & Data Science Semester 5: Machine Learning Foundations
  'aids-5': [
    {
      id: 'ml',
      code: 'AD3501',
      title: 'Machine Learning Foundations',
      description: 'Supervised & unsupervised learning, gradient descent, bias-variance tradeoff, and regularized models.',
      color: '#ec4899',
      units: [
        {
          id: 'ml-u1',
          number: 1,
          title: 'Model Evaluation & Optimization',
          description: 'Cost functions, Gradient descent convergence, Bias-Variance tradeoff, Precision/Recall, and ROC-AUC.',
          topics: [
            {
              id: 'ml-u1-t1',
              title: 'Bias-Variance Tradeoff & Regularization',
              summary: 'Underfitting vs Overfitting, L1 Lasso sparsity, and L2 Ridge weight shrinkage.',
              estimatedMinutes: 25,
              materials: {
                theory: `### Generalization Error
$$\\text{Total Error} = \\text{Bias}^2 + \\text{Variance} + \\sigma^2$$
- **High Bias (Underfitting):** High training and validation error.
- **High Variance (Overfitting):** Very low training error, high validation error.
- **L1 Lasso:** $\\lambda \\sum |w_i|$ produces sparse weights (feature selection).
- **L2 Ridge:** $\\lambda \\sum w_i^2$ shrinks weights smoothly toward zero.`,
                codeSnippet: `import numpy as np
# Ridge Loss
def ridge_loss(y_true, y_pred, weights, lmbda):
    mse = np.mean((y_true - y_pred)**2)
    return mse + lmbda * np.sum(weights**2)`,
                keyTakeaways: ['Increasing model capacity lowers bias but increases variance.'],
                misconceptions: ['Assuming Ridge sets weights to zero: only L1 Lasso drives weights strictly to 0.']
              },
              questions: [
                {
                  id: 'q-ml-1',
                  text: 'Model gives 99% training accuracy but 61% validation accuracy. What is the diagnosis?',
                  options: ['High Variance (Overfitting)', 'High Bias (Underfitting)', 'High Noise', 'Data Leakage'],
                  correctIndex: 0,
                  difficulty: 'easy',
                  bloomLevel: 'Analyze',
                  hint: 'Look at the huge gap between training and validation scores.',
                  explanation: 'A severe discrepancy between high training accuracy and low validation accuracy is the definition of overfitting (high variance).',
                  distractorExplanations: {
                    1: 'High bias results in poor performance on both sets.',
                    2: 'Noise limits both sets equally.',
                    3: 'Data leakage inflates validation accuracy.'
                  }
                }
              ]
            },
            {
              id: 'ml-u1-t2',
              title: 'Gradient Descent & Learning Rate Dynamics',
              summary: 'Batch, Stochastic, Mini-batch SGD, momentum, and learning rate scheduling.',
              estimatedMinutes: 25,
              materials: {
                theory: `### Gradient Descent Optimization
Parameter update rule:
$$\\theta := \\theta - \\alpha \\nabla J(\\theta)$$
- If learning rate $\\alpha$ is too small: convergence is extremely slow.
- If learning rate $\\alpha$ is too large: oscillates and diverges.
- **Mini-Batch SGD:** Balances vectorization efficiency with stochastic gradient regularization.`,
                codeSnippet: `for epoch in range(epochs):
    for X_batch, y_batch in get_batches(X, y, batch_size=32):
        grad = compute_gradient(X_batch, y_batch, theta)
        theta = theta - alpha * grad`,
                keyTakeaways: ['Feature scaling (standardization) transforms elliptical loss contours into spherical ones, speeding up convergence.'],
                misconceptions: ['Thinking SGD always finds the global optimum in non-convex surfaces: it can escape shallow saddle points, but global optimum is not guaranteed.']
              },
              questions: [
                {
                  id: 'q-ml-gd-1',
                  text: 'What happens during gradient descent if the learning rate alpha is set excessively large?',
                  options: [
                    'The loss function will oscillate and diverge away from the minimum',
                    'It converges instantly in one step',
                    'Weights become exactly zero',
                    'Variance decreases to zero'
                  ],
                  correctIndex: 0,
                  difficulty: 'easy',
                  bloomLevel: 'Understand',
                  hint: 'Overshooting the valley bottom.',
                  explanation: 'Overshooting the gradient slope causes steps to grow progressively larger, leading to divergence and NaN weights.',
                  distractorExplanations: {
                    1: 'Only Newton-Raphson on quadratic functions does this under specific conditions.',
                    2: 'Zero weights happen from L1 regularization, not large alpha.',
                    3: 'Divergence increases error.'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export function getSubjectsFor(deptId, semester) {
  const key = `${deptId}-${semester}`;
  if (SUBJECTS_MAP[key]) return SUBJECTS_MAP[key];

  // Return standard subjects for other engineering combinations
  return [
    {
      id: `${deptId}-s${semester}-core1`,
      code: `${deptId.toUpperCase()}${semester}01`,
      title: `${getDepartmentName(deptId)} Core Architecture ${semester}`,
      description: `Comprehensive foundational syllabus for Semester ${semester}.`,
      color: '#6366f1',
      units: [
        {
          id: `u1-${semester}`,
          number: 1,
          title: 'Unit 1: Fundamentals & Structural Principles',
          description: 'Domain principles, boundary conditions, and design specifications.',
          topics: [
            {
              id: `t1-${deptId}-${semester}`,
              title: 'System Invariants & Mathematical Formulations',
              summary: 'Core governing laws and foundational equations.',
              estimatedMinutes: 20,
              materials: {
                theory: `### Fundamentals of Semester ${semester}
Covers the mathematical formulations and state requirements for this engineering tier.`,
                codeSnippet: `// Diagnostic invariant verification
function verifySystem(params) {
    return params.every(p => p.valid === true);
}`,
                keyTakeaways: ['Always verify boundary conditions.'],
                misconceptions: ['Assuming systems scale linearly without overhead.']
              },
              questions: [
                {
                  id: `q-${deptId}-${semester}-1`,
                  text: `Which principle is critical for foundational analysis in ${getDepartmentName(deptId)}?`,
                  options: [
                    'Rigorous boundary invariance and modular decomposition',
                    'Unbounded iterations without termination criteria',
                    'Ignoring memory constraints',
                    'Unverified external assumptions'
                  ],
                  correctIndex: 0,
                  difficulty: 'easy',
                  bloomLevel: 'Understand',
                  hint: 'Good engineering requires modular design.',
                  explanation: 'Modular decomposition and boundary testing ensure predictable and scalable architectures.',
                  distractorExplanations: {
                    1: 'Lacks termination guarantee.',
                    2: 'Memory cannot be ignored.',
                    3: 'Assumptions must be verified.'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}

export function getDepartmentName(deptId) {
  const d = DEPARTMENTS.find(dep => dep.id === deptId);
  return d ? d.name : 'Engineering';
}
