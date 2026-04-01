import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Send, Upload, ArrowRight, ChevronRight, Clock, Users, BarChart3 } from 'lucide-react'
import { templates, projects } from '../data/mockData'

const suggestions = [
    'Test usability of a mobile checkout flow',
    'Evaluate product discovery experience',
    'Validate live website sign-up funnel',
    'Run a satisfaction survey for new features',
]

export default function DashboardPage() {
    const [prompt, setPrompt] = useState('')
    const [selectedType, setSelectedType] = useState('Usability Testing')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const navigate = useNavigate()

    const studyTypes = ['Usability Testing', 'Satisfaction Survey', 'Feedback Survey']

    const recentStudies = projects.flatMap(p => p.studies.map(s => ({ ...s, projectName: p.name }))).slice(0, 4)

    return (
        <div className="dashboard">
            {/* Hero Section */}
            <section className="dash-hero">
                <h1>What would you like to research?</h1>
                <p>Describe your research goal and let AI build the study for you</p>

                {/* Study Type Row */}
                <div className="study-type-row">
                    {studyTypes.map(t => (
                        <button key={t} className={`study-type-chip ${selectedType === t ? 'active' : ''}`} onClick={() => setSelectedType(t)}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* AI Chat Input */}
                <div className="ai-input-wrapper">
                    <div className="ai-input-box">
                        <Sparkles size={20} className="ai-icon" />
                        <textarea
                            placeholder="e.g., I want to test the shopping experience of my fashion mobile app prototype, especially navigation, product discovery, and checkout."
                            value={prompt}
                            onChange={e => { setPrompt(e.target.value); setShowSuggestions(e.target.value.length > 0) }}
                            onFocus={() => setShowSuggestions(true)}
                            rows={2}
                        />
                        <div className="ai-input-actions">
                            <button className="btn btn-ghost btn-sm"><Upload size={16} /></button>
                            <button className="btn btn-primary" onClick={() => navigate('/projects/p1/studies/s1/canvas')}>
                                <Send size={16} /> Generate
                            </button>
                        </div>
                    </div>

                    {/* Prompt Suggestions */}
                    {showSuggestions && (
                        <div className="suggestions-dropdown">
                            {suggestions.filter(s => !prompt || s.toLowerCase().includes(prompt.toLowerCase())).map((s, i) => (
                                <button key={i} className="suggestion-item" onClick={() => { setPrompt(s); setShowSuggestions(false) }}>
                                    <Sparkles size={14} />
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Templates Section */}
            <section className="dash-section">
                <div className="section-header">
                    <h2>Study Templates</h2>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate('/templates')}>
                        View all <ChevronRight size={16} />
                    </button>
                </div>
                <div className="templates-grid">
                    {templates.slice(0, 6).map(t => (
                        <div key={t.id} className="card template-card" onClick={() => navigate('/projects/p1/studies/s1/canvas')}>
                            <div className="template-badge">{t.category === 'prototype' ? '🔮 Prototype' : '🌐 Live Web'}</div>
                            <h3>{t.name}</h3>
                            <p>{t.description}</p>
                            <div className="template-blocks">
                                {t.blocks.slice(0, 5).map((b, i) => (
                                    <span key={i} className="block-chip">{b}</span>
                                ))}
                                {t.blocks.length > 5 && <span className="block-chip more">+{t.blocks.length - 5}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Studies */}
            <section className="dash-section">
                <div className="section-header">
                    <h2>Recent Studies</h2>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate('/projects')}>
                        All projects <ChevronRight size={16} />
                    </button>
                </div>
                <div className="recent-grid">
                    {recentStudies.map(s => (
                        <div key={s.id} className="card recent-card" onClick={() => navigate('/projects/p1/studies/s1/canvas')}>
                            <div className="recent-header">
                                <span className={`badge ${s.status === 'completed' ? 'badge-success' : s.status === 'live' ? 'badge-info' : s.status === 'paused' ? 'badge-warning' : 'badge-primary'}`}>
                                    {s.status}
                                </span>
                                <span className="recent-integration">{s.integration}</span>
                            </div>
                            <h3>{s.name}</h3>
                            <p className="recent-project">{s.projectName}</p>
                            <div className="recent-meta">
                                <span><Users size={14} /> {s.participants}</span>
                                <span><Clock size={14} /> {s.updated}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <style>{`
        .dashboard {
          padding: var(--space-8) var(--space-10);
          max-width: 1200px;
          margin: 0 auto;
        }
        .dash-hero {
          text-align: center;
          padding: var(--space-12) 0 var(--space-10);
        }
        .dash-hero h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: var(--space-3);
          background: linear-gradient(135deg, var(--color-text) 0%, var(--color-primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dash-hero > p {
          color: var(--color-text-secondary);
          font-size: 1.0625rem;
          margin-bottom: var(--space-6);
        }
        .study-type-row {
          display: flex;
          justify-content: center;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }
        .study-type-chip {
          padding: var(--space-2) var(--space-5);
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          font-weight: 500;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          background: var(--color-surface);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .study-type-chip.active {
          background: var(--color-primary-50);
          border-color: var(--color-primary-200);
          color: var(--color-primary);
        }
        .study-type-chip:hover {
          border-color: var(--color-primary-200);
        }
        .ai-input-wrapper {
          max-width: 720px;
          margin: 0 auto;
          position: relative;
        }
        .ai-input-box {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-5);
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          transition: border-color var(--transition-fast);
        }
        .ai-input-box:focus-within {
          border-color: var(--color-primary-200);
        }
        .ai-icon { color: var(--color-primary); flex-shrink: 0; margin-top: 4px; }
        .ai-input-box textarea {
          flex: 1;
          border: none;
          resize: none;
          font-size: 0.9375rem;
          line-height: 1.6;
          padding: 0;
          background: transparent;
        }
        .ai-input-box textarea:focus { box-shadow: none; }
        .ai-input-actions {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          flex-shrink: 0;
        }
        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: var(--space-2);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          z-index: 50;
          padding: var(--space-2);
          animation: slideUp 0.2s ease;
        }
        .suggestion-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          width: 100%;
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
          border: none;
          background: none;
        }
        .suggestion-item:hover {
          background: var(--color-primary-50);
          color: var(--color-primary);
        }
        .dash-section {
          margin-top: var(--space-10);
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-5);
        }
        .section-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-5);
        }
        .template-card {
          cursor: pointer;
          padding: var(--space-5) var(--space-6);
        }
        .template-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          margin-bottom: var(--space-3);
        }
        .template-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--space-2);
          line-height: 1.4;
        }
        .template-card p {
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: var(--space-4);
        }
        .template-blocks {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-1);
        }
        .block-chip {
          padding: 2px var(--space-2);
          background: var(--color-surface-hover);
          border-radius: var(--radius-sm);
          font-size: 0.6875rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .block-chip.more {
          background: var(--color-primary-50);
          color: var(--color-primary);
        }
        .recent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-5);
        }
        .recent-card {
          cursor: pointer;
          padding: var(--space-5) var(--space-6);
        }
        .recent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-3);
        }
        .recent-integration {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .recent-card h3 {
          font-size: 0.9375rem;
          font-weight: 600;
          margin-bottom: var(--space-1);
        }
        .recent-project {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          margin-bottom: var(--space-4);
        }
        .recent-meta {
          display: flex;
          gap: var(--space-5);
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
        }
        .recent-meta span {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }
      `}</style>
        </div>
    )
}
