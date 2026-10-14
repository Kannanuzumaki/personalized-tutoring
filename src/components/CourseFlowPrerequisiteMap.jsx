// =========================================================================
// AdaptLearn Visual Skill Tree & Prerequisite Graph Component
// Transforms Course Flow Map into an interactive RPG-style Skill Tree
// =========================================================================

import React, { useState } from 'react';
import {
  GitBranch,
  Lock,
  Unlock,
  Sparkles,
  Award,
  CheckCircle2,
  ChevronRight,
  Zap,
  BookOpen,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CourseFlowPrerequisiteMap() {
  const { currentSubjects, topicMastery, openTopicStudy, startTopicQuiz } = useApp();
  const [selectedNode, setSelectedNode] = useState(null);

  // Define structured Skill Tree Nodes with explicit prerequisites and tiers
  const skillTreeNodes = [
    // TIER 1: Foundational Roots
    {
      id: 'dsa-u1-t1',
      title: 'Time & Space Complexity',
      code: 'FOUNDATION-01',
      tier: 1,
      tierName: 'Tier 1: Foundations',
      subjectId: 'dsa',
      prerequisites: [],
      icon: '⚡',
      xp: 150,
      description: 'Asymptotic analysis, Big-O, Omega, Theta, and recurrence trees. Mandatory prerequisite for all algorithmic branches.'
    },
    // TIER 2: Core Linear & Dynamic Structures
    {
      id: 'dsa-u1-t2',
      title: 'Linked Lists & Cycles',
      code: 'STRUCT-01',
      tier: 2,
      tierName: 'Tier 2: Core Data Structures',
      subjectId: 'dsa',
      prerequisites: ['dsa-u1-t1'],
      icon: '🔗',
      xp: 200,
      description: 'Pointer mechanics, memory dereferencing, and Floyd’s cycle detection algorithm.'
    },
    {
      id: 'dsa-u1-t3',
      title: 'Stacks & Monotonic Queues',
      code: 'STRUCT-02',
      tier: 2,
      tierName: 'Tier 2: Core Data Structures',
      subjectId: 'dsa',
      prerequisites: ['dsa-u1-t1'],
      icon: '📚',
      xp: 220,
      description: 'LIFO evaluation, monotonic stacks, and circular queue buffer management.'
    },
    // TIER 3: Non-Linear Hierarchies & Trees
    {
      id: 'dsa-u2-t1',
      title: 'BST & AVL Rotations',
      code: 'TREE-01',
      tier: 3,
      tierName: 'Tier 3: Balanced Trees',
      subjectId: 'dsa',
      prerequisites: ['dsa-u1-t2'],
      icon: '🌲',
      xp: 300,
      description: 'Binary search tree invariants, AVL balance factors, and single/double rebalancing rotations.'
    },
    {
      id: 'dsa-u2-t2',
      title: 'Binary Heaps & Queues',
      code: 'TREE-02',
      tier: 3,
      tierName: 'Tier 3: Balanced Trees',
      subjectId: 'dsa',
      prerequisites: ['dsa-u1-t3'],
      icon: '🔺',
      xp: 280,
      description: 'Complete binary trees, bottom-up O(n) heapify, and priority queue implementations.'
    },
    // TIER 4: Advanced Graph Algorithms & Shortest Paths
    {
      id: 'dsa-u3-t1',
      title: 'Graph Traversals (BFS/DFS)',
      code: 'GRAPH-01',
      tier: 4,
      tierName: 'Tier 4: Advanced Graph Systems',
      subjectId: 'dsa',
      prerequisites: ['dsa-u2-t1', 'dsa-u1-t3'],
      icon: '🕸️',
      xp: 350,
      description: 'Adjacency structures, breadth-first layers, depth-first recursion, and bipartite coloring.'
    },
    {
      id: 'dsa-u3-t2',
      title: 'Shortest Paths (Dijkstra)',
      code: 'GRAPH-02',
      tier: 4,
      tierName: 'Tier 4: Advanced Graph Systems',
      subjectId: 'dsa',
      prerequisites: ['dsa-u3-t1', 'dsa-u2-t2'],
      icon: '📍',
      xp: 400,
      description: 'Greedy min-priority queue edge relaxations vs Bellman-Ford negative weight cycle detection.'
    }
  ];

  // Group by tier
  const tiers = [1, 2, 3, 4];

  // Helper to check node lock status based on prerequisites
  const getNodeStatus = (node) => {
    const mastery = topicMastery[node.id];
    const score = mastery ? Number(mastery.mastery_score || 0) : 0;

    if (score >= 75) return { status: 'mastered', score, label: 'Mastered' };
    if (score > 0) return { status: 'in-progress', score, label: 'In Progress' };

    // Check prerequisites
    if (node.prerequisites.length === 0) {
      return { status: 'unlocked', score: 0, label: 'Ready to Start' };
    }

    const allPrereqsMet = node.prerequisites.every(pId => {
      const pm = topicMastery[pId];
      return pm && Number(pm.mastery_score || 0) >= 60;
    });

    if (allPrereqsMet) {
      return { status: 'unlocked', score: 0, label: 'Unlocked' };
    }

    return { status: 'locked', score: 0, label: 'Locked' };
  };

  const handleNodeClick = (node) => {
    const nodeState = getNodeStatus(node);
    setSelectedNode({ ...node, ...nodeState });
  };

  const handleLaunchStudy = (nodeId) => {
    let foundTopic = null;
    let foundSubject = null;
    currentSubjects.forEach(s => {
      s.units.forEach(u => {
        const t = u.topics.find(top => top.id === nodeId);
        if (t) {
          foundTopic = t;
          foundSubject = s;
        }
      });
    });

    if (foundTopic && foundSubject) {
      openTopicStudy(foundSubject, foundTopic);
    }
  };

  const handleLaunchQuiz = (nodeId) => {
    let foundTopic = null;
    let foundSubject = null;
    currentSubjects.forEach(s => {
      s.units.forEach(u => {
        const t = u.topics.find(top => top.id === nodeId);
        if (t) {
          foundTopic = t;
          foundSubject = s;
        }
      });
    });

    if (foundTopic && foundSubject) {
      startTopicQuiz(foundSubject, foundTopic);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
            Interactive Skill Tree & DAG
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Visual Concept Dependency Progression
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Engineering Concept Skill Tree (Requirement 6.a)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Unlike the linear unit syllabus, the Skill Tree illustrates concept dependencies. Unlock higher-tier masteries by demonstrating prerequisite proficiency ($\ge 60\%$).
        </p>
      </div>

      {/* Legend & Stats Banner */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 20px',
          marginBottom: '24px',
          backgroundColor: 'var(--bg-surface-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', fontSize: '12.5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 600 }}>Mastered ($\ge 75\%$)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-warning)', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 600 }}>In Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 600 }}>Unlocked (Ready)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--text-muted)', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 600 }}>Locked (Requires Prereqs)</span>
          </div>
        </div>
      </div>

      {/* THE VISUAL SKILL TREE GRAPH */}
      <div
        style={{
          position: 'relative',
          padding: '40px 20px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          overflowX: 'auto'
        }}
      >
        <div style={{ minWidth: '700px', display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {tiers.map((tierNum) => {
            const tierNodes = skillTreeNodes.filter(n => n.tier === tierNum);
            return (
              <div key={tierNum} style={{ position: 'relative' }}>
                {/* Tier Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Tier {tierNum}
                  </span>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border-color)' }}></div>
                </div>

                {/* Nodes Row */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap' }}>
                  {tierNodes.map((node) => {
                    const { status, score, label } = getNodeStatus(node);
                    const isMastered = status === 'mastered';
                    const isLocked = status === 'locked';
                    const isInProgress = status === 'in-progress';

                    let borderColor = 'var(--border-color)';
                    let glowColor = 'transparent';
                    if (isMastered) {
                      borderColor = 'var(--color-success)';
                      glowColor = '0 0 16px rgba(16, 185, 129, 0.3)';
                    } else if (isInProgress) {
                      borderColor = 'var(--color-warning)';
                      glowColor = '0 0 16px rgba(245, 158, 11, 0.25)';
                    } else if (!isLocked) {
                      borderColor = 'var(--accent-primary)';
                      glowColor = '0 0 14px rgba(79, 70, 229, 0.2)';
                    }

                    return (
                      <div
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        style={{
                          width: '240px',
                          padding: '18px 16px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isLocked ? 'var(--bg-surface-secondary)' : 'var(--bg-surface)',
                          border: `2px solid ${borderColor}`,
                          boxShadow: glowColor !== 'transparent' ? glowColor : 'var(--shadow-sm)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          opacity: isLocked ? 0.65 : 1,
                          position: 'relative'
                        }}
                      >
                        {/* Top Node Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '20px' }}>{node.icon}</span>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: isMastered ? 'var(--color-success-bg)' : isInProgress ? 'var(--color-warning-bg)' : isLocked ? 'var(--bg-surface-secondary)' : 'var(--accent-light)',
                              color: isMastered ? 'var(--color-success)' : isInProgress ? 'var(--color-warning)' : isLocked ? 'var(--text-muted)' : 'var(--accent-primary)'
                            }}
                          >
                            {isLocked ? <Lock size={11} style={{ display: 'inline', marginRight: '3px' }} /> : null}
                            {label}
                          </span>
                        </div>

                        {/* Node Title */}
                        <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          {node.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                          {node.code} • +{node.xp} XP
                        </div>

                        {/* Mastery Progress Bar */}
                        <div
                          style={{
                            height: '6px',
                            backgroundColor: 'var(--bg-surface-secondary)',
                            borderRadius: 'var(--radius-full)',
                            overflow: 'hidden',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${score}%`,
                              backgroundColor: isMastered ? 'var(--color-success)' : 'var(--color-warning)',
                              borderRadius: 'var(--radius-full)'
                            }}
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <span>Mastery: {score}%</span>
                          <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Inspect ➔</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NODE INSPECTOR DRAWER / MODAL */}
      {selectedNode && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '560px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{selectedNode.icon}</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {selectedNode.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {selectedNode.tierName} • {selectedNode.code}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedNode(null)} className="btn-icon">
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              {selectedNode.description}
            </p>

            {/* Prerequisite Breakdown */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                marginBottom: '18px'
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Required Prerequisites:
              </div>
              {selectedNode.prerequisites.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 600 }}>
                  ✓ None (Foundational Skill)
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedNode.prerequisites.map(prId => {
                    const prNode = skillTreeNodes.find(n => n.id === prId);
                    const prMastery = topicMastery[prId];
                    const prScore = prMastery ? Number(prMastery.mastery_score || 0) : 0;
                    const isMet = prScore >= 60;
                    return (
                      <div key={prId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>• {prNode?.title || prId}</span>
                        <span style={{ fontWeight: 700, color: isMet ? 'var(--color-success)' : 'var(--color-danger)' }}>
                          {prScore}% (Required $\ge 60\%$) {isMet ? '✓' : '✗'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => {
                  handleLaunchStudy(selectedNode.id);
                  setSelectedNode(null);
                }}
                className="btn btn-secondary btn-sm"
              >
                <BookOpen size={14} />
                <span>Read Topic Notes</span>
              </button>

              <button
                onClick={() => {
                  handleLaunchQuiz(selectedNode.id);
                  setSelectedNode(null);
                }}
                disabled={selectedNode.status === 'locked'}
                className="btn btn-primary btn-sm"
                style={{ opacity: selectedNode.status === 'locked' ? 0.6 : 1 }}
              >
                <Zap size={14} />
                <span>{selectedNode.status === 'locked' ? 'Prerequisites Needed' : 'Start Skill Challenge'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
