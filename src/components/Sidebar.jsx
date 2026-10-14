// =========================================================================
// AdaptLearn Sidebar Navigation Component (Updated with all Statement 2 Views)
// =========================================================================

import React from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  Brain,
  BookOpen,
  GitMerge,
  Calendar,
  BarChart3,
  ShieldCheck,
  History,
  Bookmark,
  Settings,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const {
    currentView,
    setCurrentView,
    quizHistory,
    bookmarks,
    user,
    setIsSettingsModalOpen
  } = useApp();

  const primaryNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ingest', label: 'Multimodal Ingest', icon: UploadCloud, badge: 'Req 1' },
    { id: 'tutor-chat', label: 'Source-Grounded Tutor', icon: Brain, badge: 'Req 2' },
    { id: 'subjects', label: 'Curriculum & Units', icon: BookOpen },
    { id: 'course-flow', label: 'Course Flow Map', icon: GitMerge, badge: 'Req 6.a' },
    { id: 'revision', label: 'Revision & Schedule', icon: Calendar, badge: 'Req 6.b' },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
    { id: 'evaluation', label: 'System Evaluation (RAGAS)', icon: ShieldCheck, badge: 'Req 5' },
    { id: 'history', label: 'Quiz History', icon: History, count: quizHistory.length },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, count: bookmarks.length }
  ];

  return (
    <aside className="sidebar">
      {/* Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 12px 6px' }}>
          Adaptive Platform
        </div>

        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '13.5px',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={17} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-surface-secondary)',
                    color: isActive ? '#ffffff' : 'var(--accent-primary)',
                    padding: '1px 5px',
                    borderRadius: '4px'
                  }}
                >
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span
                  style={{
                    fontSize: '11px',
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600
                  }}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        <div style={{ margin: '14px 0', borderTop: '1px solid var(--border-color)' }} />

        {/* Study Streak Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginBottom: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Flame size={16} color="#f59e0b" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Streak: {user?.streak || 5} Days
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Retention model active
          </div>
        </div>
      </nav>

      {/* Settings Action */}
      <button
        onClick={() => setIsSettingsModalOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          fontWeight: 500,
          border: '1px solid var(--border-color)',
          cursor: 'pointer',
          fontSize: '13px',
          width: '100%',
          marginTop: '10px'
        }}
      >
        <Settings size={16} />
        <span>Database & Supabase (Step 14)</span>
      </button>
    </aside>
  );
}
