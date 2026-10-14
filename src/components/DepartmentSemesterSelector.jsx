// =========================================================================
// AdaptLearn Department & Semester Selector Component
// Step 3: Department Selection
// Step 4: Semester Selection (1 to 8)
// =========================================================================

import React from 'react';
import {
  Code,
  Cpu,
  Brain,
  Radio,
  Zap,
  Wrench,
  GraduationCap
} from 'lucide-react';
import { DEPARTMENTS, SEMESTERS } from '../data/curriculumData';
import { useApp } from '../context/AppContext';

const ICON_MAP = {
  Code: Code,
  Cpu: Cpu,
  Brain: Brain,
  Radio: Radio,
  Zap: Zap,
  Wrench: Wrench
};

export default function DepartmentSemesterSelector() {
  const {
    selectedDept,
    setSelectedDept,
    selectedSemester,
    setSelectedSemester,
    handleUpdateProfile
  } = useApp();

  const handleSelectDept = (deptId) => {
    setSelectedDept(deptId);
    handleUpdateProfile({ department: deptId });
  };

  const handleSelectSem = (semNum) => {
    setSelectedSemester(semNum);
    handleUpdateProfile({ semester: semNum });
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Department Selector Section (Step 3) */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GraduationCap size={18} color="var(--accent-primary)" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Engineering Department (Step 3)
            </span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Select your engineering branch
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px'
          }}
        >
          {DEPARTMENTS.map((dept) => {
            const Icon = ICON_MAP[dept.icon] || Code;
            const isSelected = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => handleSelectDept(dept.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-surface-secondary)',
                  color: isSelected ? '#ffffff' : 'var(--text-primary)',
                  border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface)',
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={16} color={isSelected ? '#ffffff' : 'var(--accent-primary)'} />
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>
                    {dept.code}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: isSelected ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '120px'
                    }}
                  >
                    {dept.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Semester Selector Section (Step 4) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Semester Selection (1–8) (Step 4)
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Current: Semester {selectedSemester}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SEMESTERS.map((sem) => {
            const isSelected = selectedSemester === sem;
            return (
              <button
                key={sem}
                onClick={() => handleSelectSem(sem)}
                style={{
                  flex: '1 0 60px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-surface-secondary)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                Sem {sem}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
