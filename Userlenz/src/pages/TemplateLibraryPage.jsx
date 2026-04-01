import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, X } from 'lucide-react'
import { templates } from '../data/mockData'

export default function TemplateLibraryPage() {
    const [category, setCategory] = useState('all')
    const [search, setSearch] = useState('')
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate()

    const filtered = templates.filter(t =>
        (category === 'all' || t.category === category) &&
        t.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="templates-page">
            <div className="page-header">
                <div>
                    <h1>Study Templates</h1>
                    <p>Start from a proven research template and customize it</p>
                </div>
            </div>

            <div className="templates-controls">
                <div className="tabs">
                    {['all', 'prototype', 'live-web'].map(c => (
                        <button key={c} className={`tab ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                            {c === 'all' ? 'All' : c === 'prototype' ? '🔮 Prototype' : '🌐 Live Web'}
                        </button>
                    ))}
                </div>
                <div className="search-box">
                    <Search size={18} />
                    <input placeholder="Search templates..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="templates-list">
                {filtered.map(t => (
                    <div key={t.id} className="card template-list-card">
                        <div className="template-list-info">
                            <span className="template-category-tag">{t.category === 'prototype' ? '🔮 Prototype' : '🌐 Live Web'}</span>
                            <h3>{t.name}</h3>
                            <p>{t.description}</p>
                            <div className="template-gains">
                                {t.gain.map((g, i) => (
                                    <span key={i} className="gain-item">✅ {g}</span>
                                ))}
                            </div>
                        </div>
                        <div className="template-list-actions">
                            <div className="template-flow">
                                {t.blocks.map((b, i) => (
                                    <span key={i} className="tpl-flow-block">{b}{i < t.blocks.length - 1 && ' →'}</span>
                                ))}
                            </div>
                            <div className="template-btns">
                                <button className="btn btn-secondary btn-sm" onClick={() => setPreview(t)}>Preview</button>
                                <button className="btn btn-primary btn-sm" onClick={() => navigate('/projects/p1/studies/s1/goals')}>
                                    Use Template <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {preview && (
                <div className="modal-overlay" onClick={() => setPreview(null)}>
                    <div className="modal-content" style={{ maxWidth: 600, padding: 0 }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{preview.name}</h2>
                                <button className="btn btn-icon btn-ghost" onClick={() => setPreview(null)}><X size={18} /></button>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, fontSize: '0.875rem' }}>{preview.description}</p>
                        </div>
                        <div style={{ padding: 'var(--space-6)' }}>
                            <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Study Flow</h4>
                            <div className="preview-flow">
                                {preview.blocks.map((b, i) => (
                                    <div key={i} className="preview-flow-block">
                                        <span className="flow-num">{i + 1}</span>
                                        <span>{b}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button className="btn btn-secondary" onClick={() => setPreview(null)}>Close</button>
                            <button className="btn btn-primary" onClick={() => navigate('/projects/p1/studies/s1/goals')}>
                                Use Template <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .templates-page { padding: var(--space-8) var(--space-10); max-width: 1200px; margin: 0 auto; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: var(--space-1); }
        .page-header p { color: var(--color-text-secondary); }
        .templates-controls { display: flex; align-items: center; justify-content: space-between; margin: var(--space-6) 0; gap: var(--space-4); flex-wrap: wrap; }
        .search-box { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); min-width: 240px; }
        .search-box svg { color: var(--color-text-muted); flex-shrink: 0; }
        .search-box input { border: none; padding: var(--space-1); flex: 1; }
        .search-box input:focus { box-shadow: none; }
        .templates-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .template-list-card { display: flex; gap: var(--space-6); padding: var(--space-6); }
        .template-list-info { flex: 1; }
        .template-category-tag { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); }
        .template-list-info h3 { font-size: 1.0625rem; font-weight: 600; margin: var(--space-2) 0 var(--space-2); }
        .template-list-info p { font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: var(--space-3); }
        .template-gains { display: flex; flex-direction: column; gap: var(--space-1); }
        .gain-item { font-size: 0.8125rem; color: var(--color-text-secondary); }
        .template-list-actions { display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; min-width: 240px; }
        .template-flow { font-size: 0.75rem; color: var(--color-text-muted); line-height: 1.8; text-align: right; }
        .tpl-flow-block { white-space: nowrap; }
        .template-btns { display: flex; gap: var(--space-2); }
        .preview-flow { display: flex; flex-direction: column; gap: var(--space-2); }
        .preview-flow-block { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: var(--color-surface-hover); border-radius: var(--radius-md); font-size: 0.875rem; }
        .flow-num { width: 24px; height: 24px; border-radius: 50%; background: var(--color-primary-50); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; flex-shrink: 0; }
      `}</style>
        </div>
    )
}
