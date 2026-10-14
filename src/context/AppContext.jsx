// =========================================================================
// AdaptLearn AppContext
// Central State Store for Authentication, Navigation, Curriculum,
// Bookmarks, Quiz Sessions, Adaptive Mastery, and User Isolation
// =========================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentlyLoggedInUser,
  logoutUserSession,
  fetchUserQuizAttempts,
  recordUserQuizAttempt,
  fetchUserTopicMastery,
  updateUserTopicMastery,
  fetchUserBookmarks,
  toggleUserBookmark,
  getSupabaseCredentials
} from '../services/supabase';
import { DEPARTMENTS, SEMESTERS, getSubjectsFor } from '../data/curriculumData';
import { generateRecommendations, analyzeStudentMastery } from '../services/adaptiveEngine';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('adaptlearn_theme') || 'dark');

  // User & Authentication State (Gated: null if not logged in)
  const [user, setUser] = useState(() => getCurrentlyLoggedInUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Department & Semester Selection
  const [selectedDept, setSelectedDept] = useState('cse');
  const [selectedSemester, setSelectedSemester] = useState(4);

  // Navigation
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Per-User Data collections
  const [quizHistory, setQuizHistory] = useState([]);
  const [topicMastery, setTopicMastery] = useState({});
  const [bookmarks, setBookmarks] = useState([]);

  // Active Quiz Modal state
  const [activeQuiz, setActiveQuiz] = useState(null);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('adaptlearn_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Reload user data when user changes
  useEffect(() => {
    async function loadUserData() {
      if (user && user.id) {
        if (user.department) setSelectedDept(user.department);
        if (user.semester) setSelectedSemester(user.semester);

        const attempts = await fetchUserQuizAttempts(user.id);
        setQuizHistory(attempts);

        const mastery = await fetchUserTopicMastery(user.id);
        setTopicMastery(mastery);

        const savedBookmarks = await fetchUserBookmarks(user.id);
        setBookmarks(savedBookmarks);
      } else {
        setQuizHistory([]);
        setTopicMastery({});
        setBookmarks([]);
      }
    }
    loadUserData();
  }, [user?.id]);

  // Login handler
  const handleUserLogin = async (userObj) => {
    setUser(userObj);
    if (userObj.department) setSelectedDept(userObj.department);
    if (userObj.semester) setSelectedSemester(userObj.semester);
    setCurrentView('dashboard');
  };

  // Logout handler
  const handleUserLogout = () => {
    logoutUserSession();
    setUser(null);
    setCurrentView('dashboard');
  };

  // Update profile
  const handleUpdateProfile = async (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    if (updates.department) setSelectedDept(updates.department);
    if (updates.semester) setSelectedSemester(updates.semester);
  };

  // Toggle bookmark
  const handleToggleBookmark = async (item) => {
    if (!user?.id) return;
    const updatedList = await toggleUserBookmark(user.id, item);
    setBookmarks(updatedList);
  };

  const isBookmarked = (itemId) => {
    return bookmarks.some(b => b.id === itemId);
  };

  // Complete a quiz attempt
  const handleCompleteQuiz = async (attemptData) => {
    if (!user?.id) return;
    await recordUserQuizAttempt(user.id, attemptData);
    setQuizHistory(prev => [attemptData, ...prev]);

    // Update mastery for the topic
    if (attemptData.topic_id) {
      const score = attemptData.score_percentage;
      let level = 'Novice';
      if (score >= 90) level = 'Master';
      else if (score >= 75) level = 'Proficient';
      else if (score >= 50) level = 'Developing';

      const prevMastery = topicMastery[attemptData.topic_id] || {};
      const newAttemptsCount = (prevMastery.attempts_count || 0) + 1;
      const newCorrectCount = (prevMastery.correct_count || 0) + attemptData.correct_answers;

      const masteryPayload = {
        subjectId: attemptData.subject_id,
        attempts_count: newAttemptsCount,
        correct_count: newCorrectCount,
        mastery_score: score,
        level: level,
        last_studied_at: new Date().toISOString()
      };

      await updateUserTopicMastery(user.id, attemptData.topic_id, masteryPayload);
      setTopicMastery(prev => ({
        ...prev,
        [attemptData.topic_id]: masteryPayload
      }));
    }
  };

  // Current Subjects
  const currentSubjects = getSubjectsFor(selectedDept, selectedSemester);

  // Recommendations and analytics
  const recommendations = generateRecommendations(currentSubjects, topicMastery, quizHistory);
  const analyticsSummary = analyzeStudentMastery(topicMastery, quizHistory);

  const openTopicStudy = (subject, topic) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic);
    setCurrentView('topic-view');
  };

  const startTopicQuiz = (subject, topic) => {
    setActiveQuiz({
      subject,
      topic,
      mode: 'adaptive'
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        handleUserLogin,
        handleUserLogout,
        handleUpdateProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        selectedDept,
        setSelectedDept,
        selectedSemester,
        setSelectedSemester,
        currentView,
        setCurrentView,
        selectedSubject,
        setSelectedSubject,
        selectedTopic,
        setSelectedTopic,
        searchQuery,
        setSearchQuery,
        currentSubjects,
        quizHistory,
        topicMastery,
        bookmarks,
        handleToggleBookmark,
        isBookmarked,
        activeQuiz,
        setActiveQuiz,
        handleCompleteQuiz,
        recommendations,
        analyticsSummary,
        openTopicStudy,
        startTopicQuiz
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
