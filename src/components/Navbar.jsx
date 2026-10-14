// =========================================================================
// AdaptLearn Navbar Component
// Global Search with Interactive Dropdown, Dark Mode, Profile & Logout
// =========================================================================

import React, { useState } from 'react';
import {
  Brain,
  Sun,
  Moon,
  Bookmark,
  Search,
  Database,
  User,
  LogOut,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getSupabaseCredentials } from '../services/supabase';

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    user,
    handleUserLogout,
    setIsSettingsModalOpen,
    searchQuery,
    setSearchQuery,
    bookmarks,
    setCurrentView,
    currentSubjects,
    openTopicStudy
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { url } = getSupabaseCredentials();
  const isCloudSynced = Boolean(url);

  // Search matches across current subjects & topics
  const searchResults = [];
  if (searchQuery.trim().length >= 2) {
    const q = searchQuery.toLowerCase();
    currentSubjects.forEach(s => {
      s.units.forEach(u => {
        u.topics.forEach(t => {
          if (
            t.title.toLowerCase().includes(q) ||
            t.summary.toLowerCase().includes(q) ||
            s.title.toLowerCase().includes(q)
          ) {
            searchResults.push({ topic: t, subject: s });
          }
        });
      });
    });
  }

  const handleSelectSearchResult = (subject, topic) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    openTopicStudy(subject, topic);
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Brand Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        onClick={() => setCurrentView('dashboard')}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)'
          }}
        >
          <Brain size={24} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Adapt<span style={{ color: 'var(--accent-primary)' }}>Learn</span>
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '1px 6px',
                borderRadius: '4px',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                letterSpacing: '0.05em'
              }}
            >
              Adaptive AI
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Personalized Engineering Tutoring
          </div>
        </div>
      </div>

      {/* Global Universal Search with Dropdown Results */}
      <div
        style={{
          flex: '0 1 420px',
          margin: '0 16px',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            padding: '8px 14px',
            gap: '8px'
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search subjects, units, notes, algorithms, questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '13.5px',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchFocused && searchResults.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '44px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-xl)',
              maxHeight: '260px',
              overflowY: 'auto',
              zIndex: 200,
              padding: '6px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', padding: '6px 10px', textTransform: 'uppercase' }}>
              Matching Topics ({searchResults.length}):
            </div>
            {searchResults.map(({ subject, topic }, i) => (
              <div
                key={i}
                onClick={() => handleSelectSearchResult(subject, topic)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{topic.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{subject.title}</div>
                </div>
                <ArrowRight size={13} color="var(--accent-primary)" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Supabase Status */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          title={isCloudSynced ? 'Connected to Supabase Cloud' : 'Running in Offline Mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: isCloudSynced ? 'var(--color-success-bg)' : 'var(--bg-surface-secondary)',
            border: `1px solid ${isCloudSynced ? 'var(--color-success)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-full)',
            padding: '5px 10px',
            fontSize: '12px',
            color: isCloudSynced ? 'var(--color-success)' : 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <Database size={13} />
          <span>{isCloudSynced ? 'Cloud Synced' : 'Local DB'}</span>
        </button>

        {/* Bookmarks */}
        <button
          onClick={() => setCurrentView('bookmarks')}
          className="btn-icon"
          title="Saved Bookmarks"
          style={{ position: 'relative' }}
        >
          <Bookmark size={18} />
          {bookmarks.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {bookmarks.length}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-icon"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Profile Badge */}
        {user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px',
              backgroundColor: 'var(--bg-surface-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <img
              src={user.avatar}
              alt={user.full_name}
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {user.full_name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {user.department?.toUpperCase()} • Sem {user.semester}
              </div>
            </div>

            {/* Explicit Log Out Button to Switch Accounts */}
            <button
              onClick={handleUserLogout}
              title="Log Out / Switch Student Account"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-danger)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
