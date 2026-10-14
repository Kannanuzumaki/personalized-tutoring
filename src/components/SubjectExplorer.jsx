// =========================================================================
// AdaptLearn Subject, Unit & Topic Explorer Component
// Step 5: Subject Selection
// Step 6: Unit-wise & Topic-wise Syllabus Display
// =========================================================================

import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  ChevronDown,
  ChevronRight,
  Clock,
  Award,
  Sparkles,
  Play,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MASTERY_TIERS } from '../services/adaptiveEngine';

export default function SubjectExplorer() {
  const {
    currentSubjects,
    selectedSubject,
    setSelectedSubject,
    openTopicStudy,
    startTopicQuiz,
    topicMastery,
    selectedDept,
    selectedSemester
  } = useApp();

  const [activeSubjectId, setActiveSubjectId] = useState(
    selectedSubject ? selectedSubject.id : currentSubjects[0]?.id
  );

  const [expandedUnits, setExpandedUnits] = useState({ 0: true });

  const activeSubject = currentSubjects.find(s => s.id === activeSubjectId) || currentSubjects[0];

  const toggleUnit = (index) => {
    setExpandedUnits(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!activeSubject) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text-muted)' }}>No curriculum found for this selection.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Subject Tabs (Step 5: Subject Selection) */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Available Subjects for {selectedDept.toUpperCase()} Semester {selectedSemester} (Step 5)
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
          {currentSubjects.map((subject) => {
            const isSelected = activeSubject.id === subject.id;
            return (
              <button
                key={subject.id}
                onClick={() => {
                  setActiveSubjectId(subject.id);
                  setSelectedSubject(subject);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-primary)',
                  border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                }}
              >
                <BookOpen size={16} />
                <span>{subject.title}</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface-secondary)',
                    color: isSelected ? '#ffffff' : 'var(--text-muted)'
                  }}
                >
                  {subject.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Header Banner */}
      <div
        className="card"
        style={{
          marginBottom: '24px',
          background: `linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-secondary) 100%)`,
          borderLeft: `4px solid ${activeSubject.color || 'var(--accent-primary)'}`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                {activeSubject.code}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {activeSubject.units?.length || 0} Units • Anna University / Standard UGC Curriculum
              </span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 8px', color: 'var(--text-primary)' }}>
              {activeSubject.title}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '750px', margin: 0 }}>
              {activeSubject.description}
            </p>
          </div>
        </div>
      </div>

      {/* Unit-wise and Topic-wise Breakdown (Step 6) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Course Units & Topics (Step 6)
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Click any unit to expand topics
          </span>
        </div>

        {activeSubject.units.map((unit, unitIndex) => {
          const isExpanded = expandedUnits[unitIndex] ?? false;
          return (
            <div
              key={unit.id}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                borderColor: isExpanded ? 'var(--border-focus)' : 'var(--border-color)'
              }}
            >
              {/* Unit Accordion Header */}
              <div
                onClick={() => toggleUnit(unitIndex)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  backgroundColor: isExpanded ? 'var(--bg-surface-secondary)' : 'var(--bg-surface)',
                  cursor: 'pointer',
                  borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px'
                    }}
                  >
                    U{unit.number}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {unit.title}
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                      {unit.description}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {unit.topics.length} Topics
                  </span>
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              </div>

              {/* Topics Grid */}
              {isExpanded && (
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {unit.topics.map((topic) => {
                    const mastery = topicMastery[topic.id];
                    const score = mastery ? Number(mastery.mastery_score || 0) : null;
                    const attempts = mastery ? (mastery.attempts_count || 0) : 0;

                    let tierBadge = null;
                    if (score !== null) {
                      if (score >= 90) tierBadge = { text: 'Master', color: '#10b981', bg: '#ecfdf5' };
                      else if (score >= 75) tierBadge = { text: 'Proficient', color: '#3b82f6', bg: '#eff6ff' };
                      else if (score >= 50) tierBadge = { text: 'Developing', color: '#f59e0b', bg: '#fffbeb' };
                      else tierBadge = { text: 'Needs Work', color: '#ef4444', bg: '#fef2f2' };
                    }

                    return (
                      <div
                        key={topic.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 18px',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}
                      >
                        <div style={{ flex: '1 1 300px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                              {topic.title}
                            </span>
                            {tierBadge && (
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  padding: '2px 8px',
                                  borderRadius: 'var(--radius-full)',
                                  backgroundColor: tierBadge.bg,
                                  color: tierBadge.color
                                }}
                              >
                                {tierBadge.text} ({score}%)
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 6px' }}>
                            {topic.summary}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={13} /> ~{topic.estimatedMinutes} mins
                            </span>
                            <span>•</span>
                            <span>{topic.questions?.length || 0} Calibrated Questions</span>
                            {attempts > 0 && (
                              <>
                                <span>•</span>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                                  {attempts} Quiz Session{attempts > 1 ? 's' : ''} Taken
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Actions for Step 7 (Study) & Step 8 (Quiz) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => openTopicStudy(activeSubject, topic)}
                            className="btn btn-secondary btn-sm"
                            title="Read Topic Concept Notes and Materials (Step 7)"
                          >
                            <FileText size={14} />
                            <span>Read Notes</span>
                          </button>
                          <button
                            onClick={() => startTopicQuiz(activeSubject, topic)}
                            className="btn btn-primary btn-sm"
                            title="Start Adaptive MCQ Quiz (Step 8 & 12)"
                          >
                            <Sparkles size={14} />
                            <span>Adaptive Quiz</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
