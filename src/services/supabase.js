// =========================================================================
// AdaptLearn Supabase Integration & Multi-User Storage Engine
// Supports: Per-user scoped data, real login/password, and distinct user profiles
// =========================================================================

import { createClient } from '@supabase/supabase-js';

const STORAGE_KEYS = {
  SUPABASE_URL: 'adaptlearn_supabase_url',
  SUPABASE_KEY: 'adaptlearn_supabase_key',
  CURRENT_USER_ID: 'adaptlearn_current_user_id',
  REGISTERED_USERS: 'adaptlearn_registered_users_v2'
};

// Seed demo student accounts with distinctly different performance profiles
const INITIAL_DEMO_USERS = [
  {
    id: 'alex-cse',
    username: 'alex',
    password: 'password123',
    full_name: 'Alex Rivera',
    email: 'alex.rivera@university.edu',
    department: 'cse',
    semester: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    streak: 9,
    bio: 'CSE Honors Student • Focus on Algorithms & Distributed Systems'
  },
  {
    id: 'priya-it',
    username: 'priya',
    password: 'password123',
    full_name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    department: 'it',
    semester: 3,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    streak: 2,
    bio: 'IT Undergraduate • Strengthening OS & Database Foundations'
  },
  {
    id: 'rohan-aids',
    username: 'rohan',
    password: 'password123',
    full_name: 'Rohan Verma',
    email: 'rohan.verma@university.edu',
    department: 'aids',
    semester: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    streak: 6,
    bio: 'AI & Data Science Major • ML & Neural Network Research'
  }
];

// Initial mock data for distinct accounts so their Analytics look completely different
const INITIAL_USER_PERFORMANCE = {
  'alex-cse': {
    attempts: [
      {
        id: 'att-alex-1',
        subject_id: 'dsa',
        subject_title: 'Data Structures & Algorithms',
        topic_id: 'dsa-u1-t1',
        topic_title: 'Time & Space Complexity (Asymptotic Notation)',
        mode: 'adaptive',
        total_questions: 5,
        correct_answers: 5,
        score_percentage: 100,
        avg_time_seconds: 12,
        starting_difficulty: 'medium',
        ending_difficulty: 'expert',
        question_details: [
          { text: 'Tightest bound on binary search?', isCorrect: true, difficulty: 'easy', explanation: 'O(log n) halves the search space.' },
          { text: 'Auxiliary space of recursive DFS on tree height h?', isCorrect: true, difficulty: 'medium', explanation: 'Stack depth equals tree height h.' },
          { text: 'Amortized cost of dynamic array doubling?', isCorrect: true, difficulty: 'hard', explanation: 'Amortized O(1) over n operations.' },
          { text: 'Recurrence T(n) = 2T(n/2) + n log n?', isCorrect: true, difficulty: 'expert', explanation: 'Master theorem Extended Case 2: Theta(n log^2 n).' }
        ],
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'att-alex-2',
        subject_id: 'dsa',
        subject_title: 'Data Structures & Algorithms',
        topic_id: 'dsa-u2-t1',
        topic_title: 'Binary Search Trees & AVL Rotations',
        mode: 'adaptive',
        total_questions: 4,
        correct_answers: 4,
        score_percentage: 100,
        avg_time_seconds: 14,
        starting_difficulty: 'medium',
        ending_difficulty: 'expert',
        question_details: [
          { text: 'RR rotation in AVL?', isCorrect: true, difficulty: 'easy', explanation: 'Single left rotation.' },
          { text: 'Max rotations on AVL delete?', isCorrect: true, difficulty: 'hard', explanation: 'O(log n) cascading rotations.' }
        ],
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ],
    mastery: {
      'dsa-u1-t1': { mastery_score: 95, level: 'Master', attempts_count: 3, correct_count: 14, last_studied_at: new Date().toISOString() },
      'dsa-u1-t2': { mastery_score: 88, level: 'Proficient', attempts_count: 2, correct_count: 7, last_studied_at: new Date().toISOString() },
      'dsa-u2-t1': { mastery_score: 92, level: 'Master', attempts_count: 2, correct_count: 8, last_studied_at: new Date().toISOString() },
      'dsa-u3-t1': { mastery_score: 85, level: 'Proficient', attempts_count: 1, correct_count: 4, last_studied_at: new Date().toISOString() }
    }
  },
  'priya-it': {
    attempts: [
      {
        id: 'att-priya-1',
        subject_id: 'os',
        subject_title: 'Operating Systems',
        topic_id: 'os-u1-t1',
        topic_title: 'CPU Scheduling Algorithms & Convoy Effect',
        mode: 'adaptive',
        total_questions: 5,
        correct_answers: 2,
        score_percentage: 40,
        avg_time_seconds: 28,
        starting_difficulty: 'medium',
        ending_difficulty: 'easy',
        question_details: [
          { text: 'RR with large quantum behavior?', isCorrect: false, difficulty: 'medium', explanation: 'Degenerates to FCFS, not SJF.' },
          { text: 'Minimum average waiting time algorithm?', isCorrect: true, difficulty: 'easy', explanation: 'Shortest Job First.' },
          { text: 'Convoy effect root cause?', isCorrect: false, difficulty: 'medium', explanation: 'Long CPU burst blocking I/O bound jobs.' }
        ],
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'att-priya-2',
        subject_id: 'dbms',
        subject_title: 'Database Management Systems',
        topic_id: 'dbms-u1-t1',
        topic_title: 'Functional Dependencies & Normalization (1NF to BCNF)',
        mode: 'adaptive',
        total_questions: 4,
        correct_answers: 2,
        score_percentage: 50,
        avg_time_seconds: 22,
        starting_difficulty: 'medium',
        ending_difficulty: 'easy',
        question_details: [
          { text: 'Candidate key {A,B} and B->D violation?', isCorrect: true, difficulty: 'easy', explanation: 'Violates 2NF partial dependency.' },
          { text: 'Does BCNF preserve all dependencies?', isCorrect: false, difficulty: 'hard', explanation: 'BCNF guarantees lossless join, NOT dependency preservation.' }
        ],
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ],
    mastery: {
      'os-u1-t1': { mastery_score: 40, level: 'Novice', attempts_count: 2, correct_count: 3, last_studied_at: new Date().toISOString() },
      'dbms-u1-t1': { mastery_score: 50, level: 'Developing', attempts_count: 2, correct_count: 4, last_studied_at: new Date().toISOString() },
      'dsa-u1-t1': { mastery_score: 55, level: 'Developing', attempts_count: 1, correct_count: 2, last_studied_at: new Date().toISOString() }
    }
  },
  'rohan-aids': {
    attempts: [
      {
        id: 'att-rohan-1',
        subject_id: 'ml',
        subject_title: 'Machine Learning Foundations',
        topic_id: 'ml-u1-t1',
        topic_title: 'Bias-Variance Tradeoff & Regularization',
        mode: 'adaptive',
        total_questions: 4,
        correct_answers: 3,
        score_percentage: 75,
        avg_time_seconds: 18,
        starting_difficulty: 'medium',
        ending_difficulty: 'hard',
        question_details: [
          { text: '99% train and 61% val accuracy diagnosis?', isCorrect: true, difficulty: 'easy', explanation: 'High Variance (Overfitting).' },
          { text: 'Why Lasso creates sparse weights?', isCorrect: true, difficulty: 'hard', explanation: 'Diamond L1 contour corners hit coordinate axes.' }
        ],
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ],
    mastery: {
      'ml-u1-t1': { mastery_score: 75, level: 'Proficient', attempts_count: 2, correct_count: 6, last_studied_at: new Date().toISOString() },
      'dsa-u1-t1': { mastery_score: 70, level: 'Developing', attempts_count: 1, correct_count: 3, last_studied_at: new Date().toISOString() }
    }
  }
};

let supabaseInstance = null;

export function getSupabaseCredentials() {
  const url = localStorage.getItem(STORAGE_KEYS.SUPABASE_URL) || '';
  const key = localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY) || '';
  return { url, key };
}

export function saveSupabaseCredentials(url, key) {
  if (url && key) {
    localStorage.setItem(STORAGE_KEYS.SUPABASE_URL, url.trim());
    localStorage.setItem(STORAGE_KEYS.SUPABASE_KEY, key.trim());
    try {
      supabaseInstance = createClient(url.trim(), key.trim());
      return { success: true, message: 'Connected to Supabase Cloud!' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  } else {
    localStorage.removeItem(STORAGE_KEYS.SUPABASE_URL);
    localStorage.removeItem(STORAGE_KEYS.SUPABASE_KEY);
    supabaseInstance = null;
    return { success: true, message: 'Switched to offline local storage mode.' };
  }
}

export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;
  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch {
      supabaseInstance = null;
    }
  }
  return null;
}

// -------------------------------------------------------------------------
// User Authentication & Account Registry
// -------------------------------------------------------------------------

export function getAllRegisteredUsers() {
  const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(INITIAL_DEMO_USERS));
    // Also seed initial performance for demo accounts
    Object.entries(INITIAL_USER_PERFORMANCE).forEach(([uId, perf]) => {
      if (!localStorage.getItem(`adaptlearn_quiz_attempts_${uId}`)) {
        localStorage.setItem(`adaptlearn_quiz_attempts_${uId}`, JSON.stringify(perf.attempts));
      }
      if (!localStorage.getItem(`adaptlearn_topic_mastery_${uId}`)) {
        localStorage.setItem(`adaptlearn_topic_mastery_${uId}`, JSON.stringify(perf.mastery));
      }
    });
    return INITIAL_DEMO_USERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEMO_USERS;
  }
}

export function authenticateUser(usernameOrEmail, password) {
  const users = getAllRegisteredUsers();
  const found = users.find(
    u => (u.username.toLowerCase() === usernameOrEmail.toLowerCase().trim() ||
          u.email.toLowerCase() === usernameOrEmail.toLowerCase().trim()) &&
         u.password === password
  );

  if (found) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, found.id);
    return { success: true, user: found };
  }
  return { success: false, message: 'Invalid credentials. Please verify your User ID and password.' };
}

export function registerNewUser(userData) {
  const users = getAllRegisteredUsers();
  const existing = users.find(
    u => u.username.toLowerCase() === userData.username.toLowerCase().trim() ||
         u.email.toLowerCase() === userData.email.toLowerCase().trim()
  );

  if (existing) {
    return { success: false, message: 'An account with that User ID or Email already exists.' };
  }

  const newUser = {
    id: 'usr-' + Date.now(),
    username: userData.username.trim(),
    password: userData.password,
    full_name: userData.fullName.trim(),
    email: userData.email.trim(),
    department: userData.department || 'cse',
    semester: Number(userData.semester) || 4,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${userData.username}`,
    streak: 1,
    bio: `${userData.department?.toUpperCase()} Student`
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newUser.id);

  // Initialize empty performance data for new user
  localStorage.setItem(`adaptlearn_quiz_attempts_${newUser.id}`, JSON.stringify([]));
  localStorage.setItem(`adaptlearn_topic_mastery_${newUser.id}`, JSON.stringify({}));
  localStorage.setItem(`adaptlearn_bookmarks_${newUser.id}`, JSON.stringify([]));

  return { success: true, user: newUser };
}

export function getCurrentlyLoggedInUser() {
  const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
  if (!currentId) return null;
  const users = getAllRegisteredUsers();
  return users.find(u => u.id === currentId) || null;
}

export function logoutUserSession() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
}

// -------------------------------------------------------------------------
// User-Scoped Data Access Layer (Step 3: Distinct Analytics Per User)
// -------------------------------------------------------------------------

export async function fetchUserQuizAttempts(userId) {
  if (!userId) return [];
  const key = `adaptlearn_quiz_attempts_${userId}`;
  const local = JSON.parse(localStorage.getItem(key) || '[]');

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (!error && data && data.length) return data;
    } catch (e) {
      console.warn('Supabase attempts fetch error:', e);
    }
  }
  return local;
}

export async function recordUserQuizAttempt(userId, attempt) {
  if (!userId) return;
  const key = `adaptlearn_quiz_attempts_${userId}`;
  const attempts = JSON.parse(localStorage.getItem(key) || '[]');
  attempts.unshift(attempt);
  localStorage.setItem(key, JSON.stringify(attempts));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('quiz_attempts').insert([{ ...attempt, user_id: userId }]);
    } catch (e) {
      console.warn('Supabase save attempt error:', e);
    }
  }
}

export async function fetchUserTopicMastery(userId) {
  if (!userId) return {};
  const key = `adaptlearn_topic_mastery_${userId}`;
  const local = JSON.parse(localStorage.getItem(key) || '{}');

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('topic_mastery')
        .select('*')
        .eq('user_id', userId);
      if (!error && data) {
        const masteryMap = {};
        data.forEach(item => { masteryMap[item.topic_id] = item; });
        return { ...local, ...masteryMap };
      }
    } catch (e) {
      console.warn('Supabase fetch mastery error:', e);
    }
  }
  return local;
}

export async function updateUserTopicMastery(userId, topicId, masteryData) {
  if (!userId) return;
  const key = `adaptlearn_topic_mastery_${userId}`;
  const current = JSON.parse(localStorage.getItem(key) || '{}');
  current[topicId] = {
    ...current[topicId],
    ...masteryData,
    last_studied_at: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify(current));

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('topic_mastery').upsert([{
        user_id: userId,
        topic_id: topicId,
        subject_id: masteryData.subjectId || 'general',
        attempts_count: masteryData.attempts_count || 1,
        correct_count: masteryData.correct_count || 0,
        mastery_level: masteryData.level || 'Novice',
        mastery_score: masteryData.mastery_score || 0
      }]);
    } catch (e) {
      console.warn('Supabase upsert mastery error:', e);
    }
  }
}

export async function fetchUserBookmarks(userId) {
  if (!userId) return [];
  const key = `adaptlearn_bookmarks_${userId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export async function toggleUserBookmark(userId, bookmark) {
  if (!userId) return [];
  const key = `adaptlearn_bookmarks_${userId}`;
  let list = JSON.parse(localStorage.getItem(key) || '[]');
  const exists = list.some(b => b.id === bookmark.id);
  if (exists) {
    list = list.filter(b => b.id !== bookmark.id);
  } else {
    list.unshift({ ...bookmark, savedAt: new Date().toISOString() });
  }
  localStorage.setItem(key, JSON.stringify(list));
  return list;
}
