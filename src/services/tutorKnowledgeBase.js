// =========================================================================
// AdaptLearn Comprehensive Academic Doubt Resolution Engine
// Resolves student questions across DSA, OS, DBMS, Networks, and Machine Learning
// =========================================================================

export const ACADEMIC_DOUBTS_DB = [
  {
    patterns: ['tcp', 'udp', 'tcp vs udp', 'difference between tcp and udp'],
    title: 'TCP (Transmission Control Protocol) vs UDP (User Datagram Protocol)',
    citation: {
      source: 'Computer Networking: A Top-Down Approach (Kurose & Ross, 8th Ed., p. 195)',
      badge: 'Textbook • Chapter 3',
      location: 'Section 3.4 Transport Layer'
    },
    answerEn: `### Core Difference: TCP vs UDP

1. **Connection-Oriented vs Connectionless:**
   - **TCP** requires a **3-Way Handshake** (SYN -> SYN-ACK -> ACK) before sending data packets, establishing virtual state.
   - **UDP** is connectionless; packets (datagrams) are transmitted immediately without handshakes.

2. **Reliability & Ordering:**
   - **TCP** guarantees **in-order, error-free delivery**. If a packet drops, TCP retransmits using cumulative ACKs and timeouts.
   - **UDP** provides **unreliable best-effort delivery**. Packets can arrive out-of-order, duplicate, or drop without notification.

3. **Flow & Congestion Control:**
   - **TCP** has dynamic congestion window (AIMD: Additive Increase / Multiplicative Decrease) and receiver sliding window.
   - **UDP** has no flow or congestion control; it transmits as fast as the network interface permits.

4. **Header Size & Overhead:**
   - **TCP Header:** 20 to 60 bytes.
   - **UDP Header:** Fixed 8 bytes (Source Port, Dest Port, Length, Checksum).

| Feature | TCP | UDP |
|---|---|---|
| Reliability | Guaranteed Delivery | Best-effort (No guarantee) |
| Speed | Slower (Overhead & ACKs) | Extremely fast (Low latency) |
| Typical Use | HTTP/HTTPS, SSH, FTP, Email | DNS queries, Video Streaming, Gaming, VoIP |`,
    answerHinglish: `### TCP vs UDP ka Simplest Samjho:
- **TCP (Reliable & Systematic):** Jaise registered post ya courier. Pehle handshake hota hai (SYN -> SYN-ACK -> ACK). Agar packet kho gaya, toh TCP dobara bhejta hai. Web browsing (HTTPS), banking aur file transfer me TCP use hota hai.
- **UDP (Fast & Direct):** Jaise live TV broadcast ya phone call. Packet direct bhejte hain bina handshake ke. Agar 1-2 frame drop bhi ho gaye toh koi problem nahi, latency zero honi chahiye. Live gaming aur video streaming me UDP use hota hai.`
  },
  {
    patterns: ['deadlock', 'what is deadlock', 'coffman', 'conditions for deadlock'],
    title: 'Operating System Deadlocks & The 4 Coffman Conditions',
    citation: {
      source: 'Operating System Concepts (Silberschatz, Galvin, Gagne, 10th Ed., p. 320)',
      badge: 'Textbook • Chapter 8',
      location: 'Section 8.2 Deadlock Characterization'
    },
    answerEn: `### Deadlock Characterization in Operating Systems
A deadlock occurs when a set of concurrent processes are permanently blocked because each process holds a resource and waits for another resource held by another process in the set.

#### The 4 Mandatory Coffman Conditions (Must hold simultaneously):
1. **Mutual Exclusion:** At least one resource must be held in a non-shareable mode (only one process at a time).
2. **Hold and Wait:** A process must currently hold at least one resource and be waiting to acquire additional resources held by others.
3. **No Preemption:** Resources cannot be forcibly confiscated from a process; they can only be released voluntarily upon completion.
4. **Circular Wait:** A closed chain of processes exists: $P_0$ waits for $R_1$ (held by $P_1$), $P_1$ waits for $R_2$ ... and $P_n$ waits for $R_0$ (held by $P_0$).

#### Prevention Strategy:
Eliminate at least **ONE** of the 4 conditions (e.g. enforce strict global resource ordering to eliminate circular wait).`,
    answerHinglish: `### Deadlock ka Concept:
Deadlock ek aisi state hai jahan 2 ya zyada processes hamesha ke liye atak jaate hain kyunki Process A ke paas Resource 1 hai aur wo Resource 2 ka wait kar raha hai, jabki Process B ke paas Resource 2 hai aur wo Resource 1 ka wait kar raha hai!
Isko hone ke liye 4 conditions zaroori hain:
1. Mutual Exclusion (Resource share nahi ho sakta)
2. Hold & Wait (Ek pakad ke doosre ka wait karna)
3. No Preemption (Zabardasti chheen nahi sakte)
4. Circular Wait (Circle me sab ek doosre ka wait kar rahe hain)`
  },
  {
    patterns: ['banker', 'bankers algorithm', 'banker algorithm', 'safe state'],
    title: 'Banker’s Safety Algorithm for Deadlock Avoidance',
    citation: {
      source: 'Operating System Concepts (Silberschatz, 10th Ed., p. 335)',
      badge: 'Textbook • Chapter 8',
      location: 'Section 8.5 Deadlock Avoidance'
    },
    answerEn: `### Banker’s Algorithm for Deadlock Avoidance
Devised by Edsger Dijkstra, Banker’s algorithm simulates resource allocation for each request to determine if the resulting system state is **Safe**.

#### Key Matrices:
- **Available[m]:** Vector of available instances of each resource type.
- **Max[n][m]:** Maximum demand of each process.
- **Allocation[n][m]:** Resources currently allocated.
- **Need[n][m] = Max[n][m] - Allocation[n][m]:** Remaining resources required.

#### Safety Algorithm Check:
1. Let $\\text{Work} = \\text{Available}$ and $\\text{Finish}[i] = \\text{false}$ for all $i$.
2. Find an index $i$ such that:
   $$\\text{Finish}[i] == \\text{false} \\quad \\text{and} \\quad \\text{Need}[i] \\le \\text{Work}$$
   If no such $i$ exists, go to Step 4.
3. $\\text{Work} = \\text{Work} + \\text{Allocation}[i]$; $\\text{Finish}[i] = \\text{true}$; repeat Step 2.
4. If $\\text{Finish}[i] == \\text{true}$ for all $i$, the system is in a **Safe State**, and a safe execution sequence exists.`,
    answerHinglish: `### Banker’s Algorithm ka Simple Logic:
Yeh algorithm bank ke manager ki tarah sochta hai: Agar 3 log loan lene aaye hain, toh kya bank ke paas itna cash hai ki har ek ko uske maximum limit tak loan dekar safe sequence me business complete karwaya ja sake?
- **Formula:** $\\text{Need} = \\text{Max} - \\text{Allocation}$.
- Agar koi aisi sequence mil jaati hai jisse sabhi processes bari-bari se resources lekar finish ho jayein, toh use **Safe State** kehte hain aur request accept hoti hai!`
  },
  {
    patterns: ['avl', 'avl rotation', 'avl tree', 'rotations in avl', 'balance factor'],
    title: 'AVL Tree Self-Balancing & Rotations (LL, RR, LR, RL)',
    citation: {
      source: 'Introduction to Algorithms (CLRS 4th Ed., p. 330)',
      badge: 'Textbook • Chapter 13',
      location: 'Section 13.1 Balanced Search Trees'
    },
    answerEn: `### AVL Balanced Binary Search Trees
An AVL tree maintains the invariant that for every node $u$:
$$\\text{Balance Factor (BF)} = \\text{Height}(\\text{Left Subtree}) - \\text{Height}(\\text{Right Subtree}) \\in \\{-1, 0, +1\\}$$

#### The 4 Rotation Types:
1. **Left-Left (LL) Imbalance (BF = +2, Child BF $\\ge 0$):**
   - Cause: Insertion into the left subtree of the left child.
   - Fix: **Single Right Rotation** around root.
2. **Right-Right (RR) Imbalance (BF = -2, Child BF $\\le 0$):**
   - Cause: Insertion into the right subtree of the right child.
   - Fix: **Single Left Rotation** around root.
3. **Left-Right (LR) Imbalance (BF = +2, Child BF < 0):**
   - Cause: Insertion into right subtree of left child.
   - Fix: **Double Rotation** -> Left-rotate left child, then Right-rotate parent.
4. **Right-Left (RL) Imbalance (BF = -2, Child BF > 0):**
   - Cause: Insertion into left subtree of right child.
   - Fix: **Double Rotation** -> Right-rotate right child, then Left-rotate parent.`,
    answerHinglish: `### AVL Rotations ka Formula:
Jab bhi kisi node par Balance Factor (Height of Left - Height of Right) $+2$ ya $-2$ ho jata hai, tab rotation lagti hai:
- **LL case:** Right rotate karo ek baar.
- **RR case:** Left rotate karo ek baar.
- **LR case:** Pehle child ko Left rotate karo, phir parent ko Right rotate karo.
- **RL case:** Pehle child ko Right rotate karo, phir parent ko Left rotate karo.`
  },
  {
    patterns: ['3nf', 'bcnf', 'difference between 3nf and bcnf', 'normalization', 'normal form'],
    title: '3NF (Third Normal Form) vs BCNF (Boyce-Codd Normal Form)',
    citation: {
      source: 'Database System Concepts (Silberschatz & Korth, 7th Ed., p. 312)',
      badge: 'Textbook • Chapter 7',
      location: 'Section 7.3 Relational Normalization'
    },
    answerEn: `### 3NF vs BCNF Comparison
Both forms eliminate transitive functional dependencies, but BCNF is strictly stronger.

#### Formal Definitions for every non-trivial $X \\to Y$:
- **3NF Condition:** At least ONE of the following must hold:
  1. $X$ is a Superkey, **OR**
  2. $Y$ is a **Prime Attribute** (part of some Candidate Key).
- **BCNF Condition:**
  - $X$ **must strictly be a Superkey**. (No exception for prime attributes!)

#### The Tradeoff:
- **3NF decomposition** guarantees **Lossless Join AND Dependency Preservation**.
- **BCNF decomposition** guarantees **Lossless Join**, but may NOT always preserve all functional dependencies.`,
    answerHinglish: `### 3NF vs BCNF ka difference:
- **3NF:** Agar $X \\to Y$ hai, toh ya toh $X$ superkey hona chahiye, ya phir $Y$ kisi candidate key ka hissa (prime attribute) hona chahiye. Yeh thoda lenient hai.
- **BCNF:** BCNF me koi chhoot nahi hai! $X$ ko har haal me superkey hona hi padega.
- **Yaad rakhne ka point:** Har BCNF relation 3NF me hota hai, par har 3NF relation BCNF me nahi hota!`
  },
  {
    patterns: ['paging', 'segmentation', 'paging vs segmentation', 'virtual memory'],
    title: 'Virtual Memory: Paging vs Segmentation',
    citation: {
      source: 'Operating System Concepts (Silberschatz, 10th Ed., p. 390)',
      badge: 'Textbook • Chapter 9',
      location: 'Section 9.3 Paging Architecture'
    },
    answerEn: `### Paging vs Segmentation in Memory Management

1. **Block Size & Division:**
   - **Paging:** Divides logical memory into **fixed-size blocks (Pages)** and physical memory into equal-sized **Frames** (e.g. 4KB). Managed transparently by OS and MMU hardware.
   - **Segmentation:** Divides memory into **variable-size logical modules** (Code, Stack, Heap, Functions) reflecting programmer structure.

2. **Fragmentation:**
   - **Paging:** Suffers from **Internal Fragmentation** (unused space in the last page frame), but has **Zero External Fragmentation**.
   - **Segmentation:** Suffers from **External Fragmentation** (variable holes between segments), but has **No Internal Fragmentation**.

3. **Address Mapping:**
   - **Paging:** Logical address = (Page Number $p$, Offset $d$).
   - **Segmentation:** Logical address = (Segment Number $s$, Offset $d$) checked against Segment Limit register.`,
    answerHinglish: `### Paging vs Segmentation:
- **Paging (Fixed Size):** Memory ko barabar tukdo (fixed 4KB pages) me baanta jata hai. Isme bahar koi khali hole nahi banta (Zero External Fragmentation), lekin aakhri page thoda khali reh sakta hai (Internal Fragmentation).
- **Segmentation (Variable Logical Size):** Memory ko program ke hisaab se (Code, Data, Stack) alag alag size ke tukdo me baanta jata hai. Isme internal fragmentation nahi hota, par memory me holes ban jaate hain (External Fragmentation).`
  },
  {
    patterns: ['binary search', 'how binary search works', 'time complexity binary search'],
    title: 'Binary Search Algorithm & Invariant',
    citation: {
      source: 'Introduction to Algorithms (CLRS 4th Ed., p. 28)',
      badge: 'Textbook • Chapter 2',
      location: 'Section 2.3 Divide and Conquer'
    },
    answerEn: `### Binary Search Foundations
Binary Search finds a target in a **sorted array** by halving the search space at each iteration.

#### Complexity:
- **Best Case:** $O(1)$ (target at middle index).
- **Worst & Average Case:** $O(\\log_2 n)$.
- **Space:** $O(1)$ iterative, $O(\\log n)$ recursive call stack.

#### Overflow-Safe Midpoint Calculation:
Always use:
$$\\text{mid} = \\text{low} + \\frac{\\text{high} - \\text{low}}{2}$$
instead of $(\\text{low} + \\text{high}) / 2$ to prevent integer overflow in 32-bit systems when $\\text{low} + \\text{high} > 2^{31} - 1$.`,
    answerHinglish: `### Binary Search kaise kaam karta hai:
1. Array ka sorted hona zaroori hai.
2. Har step par center element check karo. Agar target chhota hai toh left half me jao, bada hai toh right half me jao.
3. Har step par search space aadhi ho jaati hai ($n \\to n/2 \\to n/4 \\dots 1$), isliye time complexity $O(\\log n)$ hai!`
  }
];

export function resolveAcademicDoubt(query, language = 'en') {
  const q = query.toLowerCase().trim();

  // Find best match in knowledge base
  for (const item of ACADEMIC_DOUBTS_DB) {
    const isMatched = item.patterns.some(p => q.includes(p));
    if (isMatched) {
      return {
        found: true,
        title: item.title,
        text: language === 'hinglish' ? item.answerHinglish : item.answerEn,
        citation: item.citation
      };
    }
  }

  return { found: false };
}
