// =========================================================================
// AdaptLearn Bookmarks View Component
// Step 16: Implement Search, Bookmarks, and Dark Mode
// =========================================================================

import React from 'react';
import { Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookmarksView() {
  const { bookmarks, handleToggleBookmark, openTopicStudy, currentSubjects } = useApp();

  const handleOpenBookmark = (b) => {
    // Find matching topic and subject if available
    let foundTopic = null;
    let foundSubject = null;

    currentSubjects.forEach(s => {
      s.units.forEach(u => {
        const match = u.topics.find(t => t.id === b.id);
        if (match) {
          foundTopic = match;
          foundSubject = s;
        }
      });
    });

    if (foundTopic && foundSubject) {
      openTopicStudy(foundSubject, foundTopic);
    }
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
          Saved Bookmarks & Notes (Step 16)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          Quick access to bookmarked concept notes, formulas, and critical topics.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <Bookmark size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            No Bookmarks Saved
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Click the "Save Bookmark" icon on any topic page to keep it handy for quick revision.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '4px solid var(--accent-primary)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                    {b.item_type || 'Topic'}
                  </span>
                  <button
                    onClick={() => handleToggleBookmark(b)}
                    className="btn-icon"
                    title="Remove Bookmark"
                    style={{ padding: '4px', border: 'none' }}
                  >
                    <Trash2 size={15} color="var(--color-danger)" />
                  </button>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                  {b.meta?.summary || 'Saved for upcoming exam revision and targeted practice.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Saved: {new Date(b.savedAt || Date.now()).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleOpenBookmark(b)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '12px', padding: '4px 10px' }}
                >
                  <span>Open Topic</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
