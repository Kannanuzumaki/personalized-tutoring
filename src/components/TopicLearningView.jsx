// =========================================================================
// AdaptLearn Topic Learning Materials Reader Component
// Step 7: Add Learning Materials for Each Topic
// Step 16: Bookmarking Topics & Notes
// =========================================================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Sparkles,
  Copy,
  Check,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Clock,
  Layers,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TopicLearningView() {
  const {
    selectedSubject,
    selectedTopic,
    setCurrentView,
    startTopicQuiz,
    handleToggleBookmark,
    isBookmarked
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!selectedTopic || !selectedSubject) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p>No topic selected for study.</p>
        <button onClick={() => setCurrentView('subjects')} className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
          Back to Subjects
        </button>
      </div>
    );
  }

  const materials = selectedTopic.materials || {};
  const isSaved = isBookmarked(selectedTopic.id);

  const handleCopyCode = () => {
    if (materials.codeSnippet) {
      navigator.clipboard.writeText(materials.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmarkTopic = () => {
    handleToggleBookmark({
      id: selectedTopic.id,
      item_type: 'topic',
      title: selectedTopic.title,
      meta: {
        subjectTitle: selectedSubject.title,
        subjectId: selectedSubject.id,
        summary: selectedTopic.summary
      }
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={() => setCurrentView('subjects')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Syllabus</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleBookmarkTopic}
            className={`btn btn-sm ${isSaved ? 'btn-primary' : 'btn-secondary'}`}
            title="Bookmark this topic (Step 16)"
          >
            <Bookmark size={15} fill={isSaved ? '#fff' : 'none'} />
            <span>{isSaved ? 'Bookmarked' : 'Save Bookmark'}</span>
          </button>

          <button
            onClick={() => startTopicQuiz(selectedSubject, selectedTopic)}
            className="btn btn-primary btn-sm"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#ffffff'
            }}
          >
            <Sparkles size={15} />
            <span>Practice Adaptive Quiz</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Banner */}
      <div
        className="card"
        style={{
          marginBottom: '24px',
          borderLeft: '4px solid var(--accent-primary)',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
            {selectedSubject.code} • {selectedSubject.title}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Estimated Study Time: {selectedTopic.estimatedMinutes} Mins
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '8px 0', color: 'var(--text-primary)' }}>
          {selectedTopic.title}
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
          {selectedTopic.summary}
        </p>
      </div>

      {/* Main Concept Materials (Step 7) */}
      <div className="card" style={{ marginBottom: '24px', lineHeight: 1.75 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <BookOpen size={20} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Core Theory & Foundations
          </h2>
        </div>

        <div style={{ color: 'var(--text-primary)', fontSize: '15px', whiteSpace: 'pre-line' }}>
          {materials.theory || 'Detailed learning notes are available for this module.'}
        </div>
      </div>

      {/* Code Snippet / Technical Implementation (Step 7) */}
      {materials.codeSnippet && (
        <div className="card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              Implementation & Blueprint
            </span>
            <button
              onClick={handleCopyCode}
              className="btn btn-secondary btn-sm"
              style={{ padding: '4px 10px', fontSize: '12px' }}
            >
              {copied ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre>{materials.codeSnippet}</pre>
        </div>
      )}

      {/* Key Takeaways Section */}
      {materials.keyTakeaways && materials.keyTakeaways.length > 0 && (
        <div
          className="card"
          style={{
            marginBottom: '24px',
            backgroundColor: 'var(--color-success-bg)',
            borderColor: 'var(--color-success)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Lightbulb size={20} color="var(--color-success)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              High-Yield Key Takeaways
            </h3>
          </div>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.8 }}>
            {materials.keyTakeaways.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Misconceptions & Exam Traps (Steps 7 & 10) */}
      {materials.misconceptions && materials.misconceptions.length > 0 && (
        <div
          className="card"
          style={{
            marginBottom: '28px',
            backgroundColor: 'var(--color-warning-bg)',
            borderColor: 'var(--color-warning)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <AlertTriangle size={20} color="var(--color-warning)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Common Misconceptions & Exam Pitfalls
            </h3>
          </div>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.8 }}>
            {materials.misconceptions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom CTA to test knowledge adaptively */}
      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: '30px',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-secondary) 100%)',
          border: '1.5px dashed var(--accent-primary)'
        }}
      >
        <Sparkles size={28} color="var(--accent-primary)" style={{ margin: '0 auto 10px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
          Ready to verify your understanding?
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 16px' }}>
          Our Adaptive AI adjusts question difficulty in real-time to match your performance, diagnosing exact conceptual misconceptions.
        </p>
        <button
          onClick={() => startTopicQuiz(selectedSubject, selectedTopic)}
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '15px' }}
        >
          <Sparkles size={16} />
          <span>Launch Adaptive Practice Quiz (Step 8 & 12)</span>
        </button>
      </div>
    </div>
  );
}
