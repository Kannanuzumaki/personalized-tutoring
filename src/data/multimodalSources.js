// =========================================================================
// AdaptLearn Multimodal Knowledge Base & Source Grounding Data
// Requirement 1: Multimodal Knowledge Base (Videos, Textbooks, Slides, Figures)
// Requirement 2: Source Grounding (Citations with Page, Slide, Timestamp)
// =========================================================================

export const MULTIMODAL_SOURCES = [
  {
    id: 'src-cs3301-tb',
    subjectId: 'dsa',
    title: 'Introduction to Algorithms (CLRS 4th Edition)',
    type: 'textbook',
    badge: 'Textbook • Page 28-95',
    author: 'Cormen, Leiserson, Rivest, Stein',
    pagesCount: 1312,
    unitsLinked: ['dsa-u1', 'dsa-u2'],
    excerpts: [
      {
        id: 'clrs-p28',
        topicId: 'dsa-u1-t1',
        topicTitle: 'Time & Space Complexity (Asymptotic Notation)',
        location: 'Page 28, Section 3.1',
        citationText: 'CLRS 4th Ed., Chapter 3, p. 28',
        text: 'The notation O(g(n)) denotes the set of functions f(n) such that there exist positive constants c and n0 with 0 <= f(n) <= c*g(n) for all n >= n0. Big-O characterizes an asymptotic upper bound on the growth rate.',
        figure: {
          caption: 'Figure 3.1: Geometric representation of Big-O, Big-Omega, and Big-Theta bounds.',
          url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'
        }
      },
      {
        id: 'clrs-p33',
        topicId: 'dsa-u1-t1',
        topicTitle: 'Time & Space Complexity (Asymptotic Notation)',
        location: 'Page 33, Section 3.2',
        citationText: 'CLRS 4th Ed., Chapter 3, p. 33',
        text: 'Master Theorem simplifies recurrences of the form T(n) = aT(n/b) + f(n). Three main cases compare f(n) with n^{log_b a}. Case 2 addresses polynomial equality where T(n) = Theta(n^{log_b a} lg^{k+1} n).',
        figure: null
      },
      {
        id: 'clrs-p258',
        topicId: 'dsa-u1-t2',
        topicTitle: 'Singly & Doubly Linked Lists',
        location: 'Page 258, Section 10.2',
        citationText: 'CLRS 4th Ed., Chapter 10, p. 258',
        text: 'Floyd\'s Cycle Finding algorithm proves that a two-pointer gap reduces by exactly 1 unit each step within a loop of size C, guaranteeing collision in O(n) without auxiliary memory.',
        figure: {
          caption: 'Figure 10.4: Pointer movement in Floyd cycle detection.',
          url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80'
        }
      }
    ]
  },
  {
    id: 'src-cs3301-slides',
    subjectId: 'dsa',
    title: 'CS3301 Lecture Slides: Balanced Search Trees',
    type: 'slides',
    badge: 'Lecture Slides • 42 Slides',
    author: 'Prof. S. R. Ramanathan (Dept of CSE)',
    slidesCount: 42,
    unitsLinked: ['dsa-u2'],
    excerpts: [
      {
        id: 'slide-14',
        topicId: 'dsa-u2-t1',
        topicTitle: 'Binary Search Trees & AVL Rotations',
        location: 'Slide 14 / 42',
        citationText: 'CS3301 Unit 2 Slide Deck, Slide 14',
        text: 'AVL Invariant: Balance Factor BF(node) = Height(Left) - Height(Right) in {-1, 0, +1}. LL violation triggers a single right rotation; LR violation requires an inner child left rotation followed by right rotation.',
        figure: {
          caption: 'Slide 14 Diagram: LL and LR rotation transformation steps.',
          url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
        }
      }
    ]
  },
  {
    id: 'src-cs3301-video',
    subjectId: 'dsa',
    title: 'Lecture 08: Asymptotic Analysis & Master Theorem',
    type: 'video',
    badge: 'Lecture Video • 48:20 mins',
    author: 'NPTEL / University Course Archive',
    duration: '48:20',
    unitsLinked: ['dsa-u1'],
    excerpts: [
      {
        id: 'vid-08-1420',
        topicId: 'dsa-u1-t1',
        topicTitle: 'Time & Space Complexity (Asymptotic Notation)',
        location: 'Timestamp 14:20 - 18:35',
        timestampSeconds: 860,
        citationText: 'Lecture 08 Video at 14:20',
        text: 'Instructor explaining: "Notice why binary search is O(log n). At every step k, the remaining array size is n / 2^k. Setting n / 2^k = 1 gives k = log2(n). This is fundamentally different from subtracting a constant!"',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 'src-cs3302-tb',
    subjectId: 'dbms',
    title: 'Database System Concepts (Silberschatz, Korth)',
    type: 'textbook',
    badge: 'Textbook • Chapter 7',
    author: 'Silberschatz, Korth, Sudarshan',
    pagesCount: 1376,
    unitsLinked: ['dbms-u1'],
    excerpts: [
      {
        id: 'korth-p312',
        topicId: 'dbms-u1-t1',
        topicTitle: 'Functional Dependencies & Normalization (1NF to BCNF)',
        location: 'Page 312, Section 7.3',
        citationText: 'Database System Concepts, 7th Ed., p. 312',
        text: 'A relation schema R is in BCNF with respect to a set F of functional dependencies if, for all functional dependencies in F+ of the form alpha -> beta, where alpha subseteq R and beta subseteq R, at least one of the following holds: alpha -> beta is trivial, or alpha is a superkey for R.',
        figure: {
          caption: 'Figure 7.5: Venn diagram of Normal Form inclusions (1NF contains 2NF contains 3NF contains BCNF).',
          url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80'
        }
      }
    ]
  }
];

// Helper to search source citations by query or topic
export function findSourceCitations(topicId, queryText = '') {
  const matches = [];
  MULTIMODAL_SOURCES.forEach(source => {
    source.excerpts.forEach(excerpt => {
      let isMatch = false;
      if (topicId && excerpt.topicId === topicId) isMatch = true;
      if (queryText) {
        const q = queryText.toLowerCase();
        if (
          excerpt.text.toLowerCase().includes(q) ||
          excerpt.topicTitle.toLowerCase().includes(q) ||
          source.title.toLowerCase().includes(q)
        ) {
          isMatch = true;
        }
      }
      if (isMatch) {
        matches.push({
          ...excerpt,
          sourceTitle: source.title,
          sourceType: source.type,
          badge: source.badge,
          author: source.author
        });
      }
    });
  });
  return matches;
}
