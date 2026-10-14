// =========================================================================
// AdaptLearn Authentication & User Registration Modal
// Step 2: Implement User Registration and Login
// =========================================================================

import React, { useState } from 'react';
import { User, LogIn, UserPlus, Sparkles, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/curriculumData';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, handleLogin, handleUpdateProfile } = useApp();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [department, setDepartment] = useState(user?.department || 'cse');
  const [semester, setSemester] = useState(user?.semester || 3);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      id: user?.id?.startsWith('usr-') ? user.id : 'usr-' + Date.now(),
      fullName: fullName.trim() || 'Learner',
      email: email.trim() || 'learner@university.edu',
      department,
      semester: Number(semester)
    });
  };

  const handleQuickGuest = () => {
    handleLogin({
      id: 'usr-guest-' + Math.random().toString(36).substring(2, 7),
      fullName: 'Alex Rivera',
      email: 'alex.rivera@university.edu',
      department: 'cse',
      semester: 4
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={18} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {mode === 'login' ? 'Sign In to AdaptLearn' : 'Create Student Account'}
            </h3>
          </div>
          <button onClick={() => setIsAuthModalOpen(false)} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Rivera"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-secondary)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              University Email
            </label>
            <input
              type="email"
              required
              placeholder="e.g. alex@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-secondary)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.code}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Current Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              >
                {[1,2,3,4,5,6,7,8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            <span>{mode === 'login' ? 'Sign In / Save Profile' : 'Complete Registration'}</span>
          </button>

          <button
            type="button"
            onClick={handleQuickGuest}
            className="btn btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <Sparkles size={14} color="var(--accent-primary)" />
            <span>Use Demo Student Profile</span>
          </button>
        </form>
      </div>
    </div>
  );
}
