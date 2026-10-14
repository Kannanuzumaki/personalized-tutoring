// =========================================================================
// AdaptLearn Multimodal Knowledge Ingestion Hub Component
// Requirement 1: Ingest Videos, Textbooks, Slides Without Manual Preprocessing
// 1.b: Link to Origin (Page, Slide, Timestamp)
// 1.c: Tag to Topics, Concepts & Prerequisites
// 1.d: Extract Images, Diagrams & Figures
// =========================================================================

import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Presentation,
  Video,
  CheckCircle2,
  Sparkles,
  Link,
  Layers,
  Image as ImageIcon,
  Clock,
  Eye,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { MULTIMODAL_SOURCES } from '../data/multimodalSources';

export default function MultimodalIngestionHub() {
  const [sources, setSources] = useState(MULTIMODAL_SOURCES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'textbook', 'slides', 'video'
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  // Ingestion upload simulator (Requirement 1.a)
  const handleUploadSimulate = (type) => {
    setIsProcessing(true);
    setSimulatedProgress(15);

    const interval = setInterval(() => {
      setSimulatedProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);
      setSimulatedProgress(0);

      const newSource = {
        id: 'src-usr-' + Date.now(),
        subjectId: 'dsa',
        title: type === 'textbook'
          ? 'Algorithms Unlocked (Thomas Cormen PDF)'
          : type === 'slides'
          ? 'Unit 3: Graph Algorithms & Minimum Spanning Trees (Slide Deck)'
          : 'Lecture 12: Dijkstra and Bellman-Ford Shortest Paths (Video MP4)',
        type: type,
        badge: type === 'textbook' ? 'Textbook • 240 Pages' : type === 'slides' ? 'Lecture Slides • 36 Slides' : 'Lecture Video • 52:10 mins',
        author: 'Auto-Ingested Document',
        pagesCount: type === 'textbook' ? 240 : undefined,
        slidesCount: type === 'slides' ? 36 : undefined,
        duration: type === 'video' ? '52:10' : undefined,
        excerpts: [
          {
            id: 'ex-' + Date.now(),
            topicId: 'dsa-u1-t1',
            topicTitle: 'Algorithmic Optimization & Greedy Choice',
            location: type === 'textbook' ? 'Page 44' : type === 'slides' ? 'Slide 18' : 'Timestamp 22:40',
            citationText: type === 'textbook' ? 'Algorithms Unlocked, p. 44' : type === 'slides' ? 'Unit 3 Slides, Slide 18' : 'Lecture 12 Video at 22:40',
            text: 'Greedy choice property: A globally optimal solution can be arrived at by making locally optimal choices at each stage.',
            figure: type !== 'video' ? {
              caption: 'Auto-extracted Figure: Greedy state transition space.',
              url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80'
            } : null
          }
        ]
      };

      setSources(prev => [newSource, ...prev]);
    }, 1500);
  };

  const filteredSources = activeTab === 'all'
    ? sources
    : sources.filter(s => s.type === activeTab);

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
          Multimodal Knowledge Base Ingestion (Requirement 1)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          Ingest textbooks, slide decks, and lecture videos without manual preprocessing. Auto-extracts topics, origins, and diagrams.
        </p>
      </div>

      {/* Upload Dropzone Cards (Requirement 1.a) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {/* Textbook Upload */}
        <div
          onClick={() => !isProcessing && handleUploadSimulate('textbook')}
          className="card card-clickable"
          style={{ border: '2px dashed var(--border-color)', textAlign: 'center', padding: '24px' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}
          >
            <FileText size={24} />
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)' }}>
            Ingest Textbook (PDF / ePub)
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Auto-extracts chapters, page citations, theorems, and mathematical equations.
          </p>
        </div>

        {/* Slide Deck Upload */}
        <div
          onClick={() => !isProcessing && handleUploadSimulate('slides')}
          className="card card-clickable"
          style={{ border: '2px dashed var(--border-color)', textAlign: 'center', padding: '24px' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#fffbeb',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}
          >
            <Presentation size={24} />
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)' }}>
            Ingest Slide Decks (PPTX / PDF)
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Maps slide numbers, bullet points, architecture diagrams, and charts.
          </p>
        </div>

        {/* Lecture Video Ingest */}
        <div
          onClick={() => !isProcessing && handleUploadSimulate('video')}
          className="card card-clickable"
          style={{ border: '2px dashed var(--border-color)', textAlign: 'center', padding: '24px' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}
          >
            <Video size={24} />
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)' }}>
            Ingest Lecture Video (MP4 / YouTube)
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Transcribes speech, aligns video timestamps, and detects on-screen whiteboard slides.
          </p>
        </div>
      </div>

      {/* Processing Animation */}
      {isProcessing && (
        <div
          className="card"
          style={{
            marginBottom: '24px',
            backgroundColor: 'var(--bg-surface-secondary)',
            borderLeft: '4px solid var(--accent-primary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Multimodal Ingestion Pipeline Running...
            </span>
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Extracting text, OCRing figures, tagging prerequisites, and generating vector embeddings...
          </div>
          <div
            style={{
              height: '6px',
              backgroundColor: 'var(--border-color)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${simulatedProgress}%`,
                backgroundColor: 'var(--accent-primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      )}

      {/* Ingested Sources Catalog */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '14px',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Ingested Knowledge Assets ({filteredSources.length})
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Linked to page numbers, slide IDs, and video timestamps
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'textbook', 'slides', 'video'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Source List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredSources.map(s => {
            const Icon = s.type === 'video' ? Video : s.type === 'slides' ? Presentation : FileText;
            return (
              <div
                key={s.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', gap: '14px', flex: '1 1 340px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--border-color)',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {s.title}
                      </span>
                      <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                        {s.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Author / Origin: {s.author} • {s.excerpts.length} Verified Origin Anchors
                    </div>

                    {/* Excerpt Samples (Requirement 1.b & 1.d) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {s.excerpts.map(ex => (
                        <div
                          key={ex.id}
                          style={{
                            fontSize: '12px',
                            color: 'var(--text-secondary)',
                            backgroundColor: 'var(--bg-surface)',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>
                            <b>[{ex.location}]:</b> {ex.text.slice(0, 90)}...
                          </span>
                          {ex.figure && (
                            <span style={{ fontSize: '11px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <ImageIcon size={12} /> Figure Extracted
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: 'var(--color-success)',
                      fontWeight: 600
                    }}
                  >
                    <CheckCircle2 size={14} /> Ready for Grounding
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
