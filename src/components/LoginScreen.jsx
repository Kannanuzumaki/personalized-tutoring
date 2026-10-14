// =========================================================================
// AdaptLearn Mandatory Student Gate / Login Screen
// Requirement: "first a student must login to enter (user id, password)"
// =========================================================================

import React, { useState } from 'react';
import {
  Brain,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  GraduationCap,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { authenticateUser, registerNewUser } from '../services/supabase';
import { DEPARTMENTS } from '../data/curriculumData';

export default function LoginScreen({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('cse');
  const [semester, setSemester] = useState(4);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Please enter both User ID and Password.');
      return;
    }

    const res = authenticateUser(username, password);
    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password || !fullName.trim() || !email.trim()) {
      setErrorMsg('Please fill in all registration fields.');
      return;
    }

    const res = registerNewUser({
      username,
      password,
      fullName,
      email,
      department,
      semester
    });

    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleQuickDemoLogin = (demoUsername, demoPass) => {
    const res = authenticateUser(demoUsername, demoPass);
    if (res.success) {
      onLoginSuccess(res.user);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-color)',
          boxShadow: 'var(--shadow-xl)',
          padding: '36px 32px'
        }}
      >
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              margin: '0 auto 12px',
              boxShadow: '0 8px 20px rgba(79, 70, 229, 0.35)'
            }}
          >
            <Brain size={30} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            Adapt<span style={{ color: 'var(--accent-primary)' }}>Learn</span> Portal
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0 }}>
            Personalized Tutoring with Adaptive Learning & Bayesian Tracing
          </p>
        </div>

        {/* Tab Toggle: Sign In vs Create Account */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--bg-surface-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            marginBottom: '24px',
            border: '1px solid var(--border-color)'
          }}
        >
          <button
            onClick={() => { setIsRegisterMode(false); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '9px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: !isRegisterMode ? 'var(--bg-surface)' : 'transparent',
              color: !isRegisterMode ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              boxShadow: !isRegisterMode ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Student Sign In
          </button>
          <button
            onClick={() => { setIsRegisterMode(true); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '9px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: isRegisterMode ? 'var(--bg-surface)' : 'transparent',
              color: isRegisterMode ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              boxShadow: isRegisterMode ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Register New Student
          </button>
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              border: '1px solid var(--color-danger)',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '18px'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {!isRegisterMode ? (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Student User ID / Username / Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="e.g. alex or priya or rohan"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <User size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  placeholder="Enter your student password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 38px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '12px', fontSize: '14.5px', marginTop: '6px' }}
            >
              <span>Access Learning Platform</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Chen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  User ID / Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. maya24"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                University Email
              </label>
              <input
                type="email"
                required
                placeholder="e.g. maya@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
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
                    <option key={d.id} value={d.id}>{d.code} - {d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Semester
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
                    <option key={s} value={s}>Sem {s}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '12px', fontSize: '14.5px', marginTop: '6px' }}
            >
              <span>Create Account & Start Learning</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* QUICK ONE-CLICK DEMO ACCOUNTS (To test distinct performance profiles) */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Sparkles size={14} color="var(--accent-primary)" />
            <span>Or Quick Login as Sample Student (To Test Account Differences):</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Account 1 */}
            <button
              onClick={() => handleQuickDemoLogin('alex', 'password123')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Alex Rivera (User ID: <code>alex</code> • pass: <code>password123</code>)
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--color-success)', fontWeight: 600 }}>
                  High Performer Profile: 95% Mastery in DSA • 9-Day Streak
                </div>
              </div>
              <span className="badge" style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                Mastery High
              </span>
            </button>

            {/* Account 2 */}
            <button
              onClick={() => handleQuickDemoLogin('priya', 'password123')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Priya Sharma (User ID: <code>priya</code> • pass: <code>password123</code>)
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--color-warning)', fontWeight: 600 }}>
                  Needs Revision Profile: 45% in OS/DBMS • Weak Topics Flagged
                </div>
              </div>
              <span className="badge" style={{ backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                Needs Work
              </span>
            </button>

            {/* Account 3 */}
            <button
              onClick={() => handleQuickDemoLogin('rohan', 'password123')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Rohan Verma (User ID: <code>rohan</code> • pass: <code>password123</code>)
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  AI & DS Major: 75% in Machine Learning Foundations
                </div>
              </div>
              <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                Proficient
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
