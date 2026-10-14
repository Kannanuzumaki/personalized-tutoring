// =========================================================================
// AdaptLearn Master Application (Statement 2 Core Deliverable)
// Gated Access: Student must login first to enter
// =========================================================================

import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import SubjectExplorer from './components/SubjectExplorer';
import TopicLearningView from './components/TopicLearningView';
import MultimodalIngestionHub from './components/MultimodalIngestionHub';
import SourceGroundedTutorChat from './components/SourceGroundedTutorChat';
import CourseFlowPrerequisiteMap from './components/CourseFlowPrerequisiteMap';
import RevisionHub from './components/RevisionHub';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SystemEvaluationDashboard from './components/SystemEvaluationDashboard';
import QuizHistoryView from './components/QuizHistoryView';
import BookmarksView from './components/BookmarksView';
import AdaptiveQuizModal from './components/AdaptiveQuizModal';
import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import DiagnosticIntakeModal from './components/DiagnosticIntakeModal';

export default function App() {
  const { currentView, user, handleUserLogin } = useApp();
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  // Requirement: First a student must login to enter (User ID, password)
  if (!user) {
    return <LoginScreen onLoginSuccess={handleUserLogin} />;
  }

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'ingest':
        return <MultimodalIngestionHub />;
      case 'tutor-chat':
        return <SourceGroundedTutorChat />;
      case 'subjects':
        return <SubjectExplorer />;
      case 'topic-view':
        return <TopicLearningView />;
      case 'course-flow':
        return <CourseFlowPrerequisiteMap />;
      case 'revision':
        return <RevisionHub />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'evaluation':
        return <SystemEvaluationDashboard />;
      case 'history':
        return <QuizHistoryView />;
      case 'bookmarks':
        return <BookmarksView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Universal Navbar */}
      <Navbar />

      {/* Main Two-Column Layout */}
      <div className="main-layout">
        <Sidebar />
        <main className="content-area">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <AdaptiveQuizModal />
      <AuthModal />
      <SettingsModal />
      <DiagnosticIntakeModal
        isOpen={showDiagnostic}
        onClose={() => setShowDiagnostic(false)}
      />
    </div>
  );
}
