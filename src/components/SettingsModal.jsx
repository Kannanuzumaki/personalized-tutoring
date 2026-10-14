// =========================================================================
// AdaptLearn Database & Supabase Integration Settings Modal
// Step 14: Integrate the Supabase Database
// =========================================================================

import React, { useState } from 'react';
import { Database, CheckCircle2, XCircle, X, Download, ShieldCheck, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getSupabaseCredentials, saveSupabaseCredentials } from '../services/supabase';

export default function SettingsModal() {
  const { isSettingsModalOpen, setIsSettingsModalOpen, quizHistory, topicMastery, bookmarks } = useApp();
  const existing = getSupabaseCredentials();

  const [url, setUrl] = useState(existing.url || '');
  const [key, setKey] = useState(existing.key || '');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isSettingsModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const res = saveSupabaseCredentials(url, key);
    setStatusMsg(res);
  };

  const handleClear = () => {
    setUrl('');
    setKey('');
    const res = saveSupabaseCredentials('', '');
    setStatusMsg(res);
  };

  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      quizHistory,
      topicMastery,
      bookmarks
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `adaptlearn-backup-${Date.now()}.json`;
    link.click();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '540px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Database & Cloud Sync Settings (Step 14)
            </h3>
          </div>
          <button onClick={() => setIsSettingsModalOpen(false)} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
          AdaptLearn defaults to an offline-first architecture with instant local persistence. To synchronize across devices, paste your Supabase Project credentials below (tables created via <code>supabase-schema.sql</code>).
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Supabase Project URL
            </label>
            <input
              type="url"
              placeholder="https://xyzcompany.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-secondary)',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                outline: 'none',
                fontFamily: 'var(--font-mono)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Supabase Anon Public API Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-secondary)',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                outline: 'none',
                fontFamily: 'var(--font-mono)'
              }}
            />
          </div>

          {statusMsg && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: statusMsg.success ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
                color: statusMsg.success ? 'var(--color-success)' : 'var(--color-danger)',
                border: `1px solid ${statusMsg.success ? 'var(--color-success)' : 'var(--color-danger)'}`,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {statusMsg.success ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>{statusMsg.message}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Save & Connect Supabase
            </button>
            <button type="button" onClick={handleClear} className="btn btn-secondary">
              Use Offline Mode
            </button>
          </div>
        </form>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Backup your learning trajectory
          </div>
          <button onClick={handleExportData} className="btn btn-secondary btn-sm">
            <Download size={14} />
            <span>Export Data JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
