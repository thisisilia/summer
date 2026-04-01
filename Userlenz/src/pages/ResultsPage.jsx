import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Users, Clock, Target, MousePointerClick, TrendingUp, TrendingDown, AlertTriangle, Zap, Lightbulb, CheckCircle2, Eye, Play, Sparkles, Monitor, Smartphone, Tablet, Activity, BarChart3, ChevronRight, Filter, Search } from 'lucide-react'
import { studyGoals } from '../data/mockData'

export default function ResultsPage() {
    const { projectId, studyId, goalId } = useParams()
    const currentGoal = studyGoals.find(g => g.id === (goalId || 'g1')) || studyGoals[0]
    const [tab, setTab] = useState('overview')
    const [participantFilter, setParticipantFilter] = useState('all')
    const [selectedParticipant, setSelectedParticipant] = useState(null)
    const navigate = useNavigate()
    const d = currentGoal.resultsData
    const basePath = `/projects/${projectId || 'p1'}/studies/${studyId || 's1'}`

    const filteredParticipants = d.participants.filter(p =>
        participantFilter === 'all' ? true : p.status === participantFilter
    )

    const deviceIcon = (device) => {
        if (device === 'Mobile') return <Smartphone size={14} />
        if (device === 'Tablet') return <Tablet size={14} />
        return <Monitor size={14} />
    }

    return (
        <div className="results-page">
            {/* Top Bar */}
            <header className="results-topbar">
                <div className="results-topbar-left">
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate(`${basePath}/goals`)}>
                        <ArrowLeft size={18} />
                    </button>
                    <span className="project-breadcrumb">Fashion App Redesign /</span>
                    <span style={{ fontWeight: 600 }}>Checkout Flow Usability Test</span>
                    <span className="badge badge-success" style={{ marginLeft: 8 }}>Completed</span>
                </div>
                <div className="tabs" style={{ background: 'transparent' }}>
                    <button className="tab" onClick={() => navigate(`${basePath}/goals/${currentGoal.id}/canvas`)}>Canvas</button>
                    <button className="tab active">Results</button>
                    <button className="tab" onClick={() => navigate(`${basePath}/goals/${currentGoal.id}/report`)}>Report</button>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm"><Filter size={16} /> Filter</button>
                    <button className="btn btn-primary btn-sm"><Download size={16} /> Export</button>
                </div>
            </header>

            {/* Goal Selector Bar */}
            <div className="goal-selector-bar">
                <Target size={14} />
                <span className="goal-selector-label">Goals:</span>
                {studyGoals.map((g) => (
                    <button
                        key={g.id}
                        className={`goal-tab ${g.id === currentGoal.id ? 'active' : ''}`}
                        onClick={() => navigate(`${basePath}/goals/${g.id}/results`)}
                    >
                        <span className="goal-tab-icon">{g.icon}</span>
                        {g.title.length > 28 ? g.title.slice(0, 28) + '…' : g.title}
                    </button>
                ))}
            </div>

            <div className="results-content">
                {/* Study Status Bar */}
                <div className="study-status-bar">
                    <div className="status-item">
                        <Users size={16} />
                        <div>
                            <span className="status-value">{d.completed}/{d.totalParticipants}</span>
                            <span className="status-label">Completed</span>
                        </div>
                    </div>
                    <div className="status-divider"></div>
                    <div className="status-item">
                        <Activity size={16} />
                        <div>
                            <span className="status-value">{d.inProgress}</span>
                            <span className="status-label">In Progress</span>
                        </div>
                    </div>
                    <div className="status-divider"></div>
                    <div className="status-item">
                        <TrendingDown size={16} style={{ color: 'var(--color-danger)' }} />
                        <div>
                            <span className="status-value">{d.droppedOff}</span>
                            <span className="status-label">Dropped</span>
                        </div>
                    </div>
                    <div className="status-divider"></div>
                    <div className="status-item">
                        <Clock size={16} />
                        <div>
                            <span className="status-value">{d.avgTime}</span>
                            <span className="status-label">Avg. Duration</span>
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <span className="ai-tag"><Sparkles size={12} /> AI Analysis Ready</span>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="kpi-row">
                    <div className="kpi-card">
                        <div className="kpi-icon" style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}><TrendingUp size={20} /></div>
                        <div className="kpi-info">
                            <span className="kpi-value">{d.healthScore}</span>
                            <span className="kpi-label">Health Score</span>
                        </div>
                        <span className="kpi-trend trend-up">+5</span>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}><Target size={20} /></div>
                        <div className="kpi-info">
                            <span className="kpi-value">{d.successRate}%</span>
                            <span className="kpi-label">Success Rate</span>
                        </div>
                        <span className="kpi-trend trend-down">-8%</span>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}><Clock size={20} /></div>
                        <div className="kpi-info">
                            <span className="kpi-value">{d.avgTime}</span>
                            <span className="kpi-label">Avg. Duration</span>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}><MousePointerClick size={20} /></div>
                        <div className="kpi-info">
                            <span className="kpi-value">{d.misclickRate}%</span>
                            <span className="kpi-label">Misclick Rate</span>
                        </div>
                        <span className="kpi-trend trend-down">+3%</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="results-tabs">
                    <div className="tabs">
                        {['overview', 'participants', 'blocks', 'recordings'].map(t => (
                            <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {tab === 'overview' && (
                    <>
                        {/* AI Insight Cards */}
                        <section className="results-section">
                            <div className="section-header">
                                <h3><Sparkles size={18} /> AI Insights</h3>
                                <span className="section-badge">4 insights detected</span>
                            </div>
                            <div className="insights-grid">
                                {d.insightCards.map((insight, i) => (
                                    <div key={i} className={`card insight-card insight-${insight.severity}`}>
                                        <div className="insight-icon">
                                            {insight.severity === 'critical' && <AlertTriangle size={20} />}
                                            {insight.severity === 'warning' && <Zap size={20} />}
                                            {insight.severity === 'info' && <Lightbulb size={20} />}
                                            {insight.severity === 'success' && <CheckCircle2 size={20} />}
                                        </div>
                                        <div>
                                            <h4>{insight.title}</h4>
                                            <p>{insight.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Completion Funnel */}
                        <section className="results-section">
                            <div className="section-header">
                                <h3><BarChart3 size={18} /> Completion Funnel</h3>
                                <span className="section-desc">Drop-off visualization across study blocks</span>
                            </div>
                            <div className="card funnel-card">
                                <div className="funnel-chart">
                                    {d.completionFunnel.map((step, i) => {
                                        const pct = Math.round((step.count / d.totalParticipants) * 100)
                                        const prevCount = i > 0 ? d.completionFunnel[i - 1].count : step.count
                                        const dropoff = prevCount - step.count
                                        return (
                                            <div key={i} className="funnel-step">
                                                <span className="funnel-label">{step.block}</span>
                                                <div className="funnel-bar-wrapper">
                                                    <div className="funnel-bar" style={{ width: `${pct}%` }}>
                                                        <span className="funnel-count">{step.count}</span>
                                                    </div>
                                                </div>
                                                <span className="funnel-pct">{pct}%</span>
                                                {dropoff > 0 && <span className="funnel-dropoff">-{dropoff}</span>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>

                        {/* Block Results */}
                        <section className="results-section">
                            <div className="section-header">
                                <h3><Target size={18} /> Block Results</h3>
                                <span className="section-desc">Performance metrics per study block</span>
                            </div>
                            <div className="block-results-grid">
                                {d.blockResults.map((br, i) => (
                                    <div key={i} className="card block-result-card">
                                        <div className="br-header">
                                            <h4>{br.name}</h4>
                                            {br.frictionScore !== undefined && (
                                                <span className={`badge ${br.frictionScore > 50 ? 'badge-danger' : 'badge-success'}`}>
                                                    {br.frictionScore > 50 ? 'High Friction' : 'Low Friction'}
                                                </span>
                                            )}
                                        </div>
                                        {br.successRate !== undefined && (
                                            <>
                                                <div className="br-stats">
                                                    <div className="br-stat"><span className="br-val">{br.successRate}%</span><span>Success</span></div>
                                                    <div className="br-stat"><span className="br-val">{br.avgTime}</span><span>Avg Time</span></div>
                                                    <div className="br-stat"><span className="br-val" style={{ color: br.frictionScore > 50 ? 'var(--color-danger)' : 'var(--color-success)' }}>{br.frictionScore}</span><span>Friction</span></div>
                                                </div>
                                                <div className="br-bar-section">
                                                    <span className="br-bar-label">Success Rate</span>
                                                    <div className="progress-bar" style={{ height: 6, flex: 1 }}>
                                                        <div className="progress-fill" style={{ width: `${br.successRate}%`, background: br.successRate > 70 ? 'var(--color-success)' : 'var(--color-danger)' }}></div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {br.avgScore !== undefined && (
                                            <div className="br-stats">
                                                <div className="br-stat"><span className="br-val">{br.avgScore}</span><span>Avg Score</span></div>
                                                <div className="br-stat"><span className="br-val">{br.responses}</span><span>Responses</span></div>
                                            </div>
                                        )}
                                        {br.distribution && (
                                            <div className="distribution-bars">
                                                {Object.entries(br.distribution).map(([key, val]) => (
                                                    <div key={key} className="dist-row">
                                                        <span className="dist-label">{key}</span>
                                                        <div className="dist-bar-bg">
                                                            <div className="dist-bar-fill" style={{ width: `${val}%` }}></div>
                                                        </div>
                                                        <span className="dist-val">{val}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Device Breakdown */}
                        <section className="results-section">
                            <div className="section-header">
                                <h3><Monitor size={18} /> Device Breakdown</h3>
                            </div>
                            <div className="device-grid">
                                {[
                                    { device: 'Desktop', icon: <Monitor size={20} />, count: 7, pct: 58, avgTime: '8m 45s', success: 71 },
                                    { device: 'Mobile', icon: <Smartphone size={20} />, count: 4, pct: 33, avgTime: '7m 20s', success: 80 },
                                    { device: 'Tablet', icon: <Tablet size={20} />, count: 1, pct: 8, avgTime: '8m 30s', success: 100 },
                                ].map((dev, i) => (
                                    <div key={i} className="card device-card">
                                        <div className="device-icon">{dev.icon}</div>
                                        <div className="device-name">{dev.device}</div>
                                        <div className="device-count">{dev.count} users ({dev.pct}%)</div>
                                        <div className="device-stats">
                                            <div><span className="device-stat-val">{dev.avgTime}</span><span>Avg Time</span></div>
                                            <div><span className="device-stat-val">{dev.success}%</span><span>Success</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {tab === 'participants' && (
                    <section className="results-section">
                        <div className="participants-toolbar">
                            <div className="tabs">
                                {['all', 'completed', 'in-progress', 'dropped'].map(f => (
                                    <button key={f} className={`tab ${participantFilter === f ? 'active' : ''}`} onClick={() => setParticipantFilter(f)}>
                                        {f === 'all' ? `All (${d.participants.length})` : f === 'completed' ? `Completed (${d.completed})` : f === 'in-progress' ? `In Progress (${d.inProgress})` : `Dropped (${d.droppedOff})`}
                                    </button>
                                ))}
                            </div>
                            <div className="search-box">
                                <Search size={14} />
                                <input placeholder="Search participants..." />
                            </div>
                        </div>
                        <div className="participants-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Participant</th>
                                        <th>Status</th>
                                        <th>Health</th>
                                        <th>Device</th>
                                        <th>Duration</th>
                                        <th>Task Success</th>
                                        <th>Flag</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParticipants.map(p => (
                                        <tr key={p.id} className={selectedParticipant === p.id ? 'selected-row' : ''} onClick={() => setSelectedParticipant(selectedParticipant === p.id ? null : p.id)}>
                                            <td>
                                                <div className="participant-cell">
                                                    <div className="avatar avatar-sm">{p.name.split('#')[1] || p.name[0]}</div>
                                                    <strong>{p.name}</strong>
                                                </div>
                                            </td>
                                            <td><span className={`badge badge-${p.status === 'completed' ? 'success' : p.status === 'in-progress' ? 'info' : 'danger'}`}>{p.status}</span></td>
                                            <td>
                                                {p.healthScore !== null ? (
                                                    <div className="health-cell">
                                                        <div className="health-bar">
                                                            <div className="health-fill" style={{ width: `${p.healthScore}%`, background: p.healthScore > 70 ? 'var(--color-success)' : p.healthScore > 50 ? 'var(--color-warning)' : 'var(--color-danger)' }}></div>
                                                        </div>
                                                        <span style={{ fontWeight: 600, color: p.healthScore > 70 ? 'var(--color-success)' : p.healthScore > 50 ? 'var(--color-warning)' : 'var(--color-danger)' }}>{p.healthScore}</span>
                                                    </div>
                                                ) : '-'}
                                            </td>
                                            <td><span className="device-badge">{deviceIcon(p.device)} {p.device}</span></td>
                                            <td>{p.duration}</td>
                                            <td>{p.success === null ? '-' : p.success ? <span style={{ color: 'var(--color-success)' }}>✓ Pass</span> : <span style={{ color: 'var(--color-danger)' }}>✗ Fail</span>}</td>
                                            <td>{p.flagged ? <span className="badge badge-warning">{p.flagged}</span> : '-'}</td>
                                            <td>
                                                <button className="btn btn-ghost btn-sm"><Eye size={14} /> View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Participant Detail Panel */}
                        {selectedParticipant && (() => {
                            const p = d.participants.find(pp => pp.id === selectedParticipant)
                            if (!p) return null
                            return (
                                <div className="card participant-detail-card">
                                    <div className="pd-header">
                                        <div className="avatar">{p.name.split('#')[1] || p.name[0]}</div>
                                        <div>
                                            <strong>{p.name}</strong>
                                            <span className={`badge badge-${p.status === 'completed' ? 'success' : p.status === 'in-progress' ? 'info' : 'danger'}`}>{p.status}</span>
                                        </div>
                                    </div>
                                    <div className="pd-stats">
                                        <div className="pd-stat"><span className="pd-stat-label">Device</span><span>{p.device}</span></div>
                                        <div className="pd-stat"><span className="pd-stat-label">Duration</span><span>{p.duration}</span></div>
                                        <div className="pd-stat"><span className="pd-stat-label">Health</span><span style={{ fontWeight: 700, color: p.healthScore > 70 ? 'var(--color-success)' : 'var(--color-danger)' }}>{p.healthScore || '-'}</span></div>
                                        <div className="pd-stat"><span className="pd-stat-label">Success</span><span>{p.success === null ? '-' : p.success ? '✓ Yes' : '✗ No'}</span></div>
                                    </div>
                                    {p.status === 'completed' && (
                                        <div className="pd-journey">
                                            <span className="pd-journey-label"><Sparkles size={12} /> Session Timeline</span>
                                            <div className="pd-timeline">
                                                {['Welcome', 'Task 1', 'Rating', 'Task 2', 'Rating', 'Nav Q', 'Feedback', 'Yes/No', 'Improve', 'Thanks'].map((step, i) => (
                                                    <div key={i} className={`timeline-dot ${i < 10 ? 'done' : ''}`} title={step}>
                                                        <div className="dot"></div>
                                                        {i < 9 && <div className="timeline-line"></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}><Play size={14} /> Watch Recording</button>
                                </div>
                            )
                        })()}
                    </section>
                )}

                {tab === 'blocks' && (
                    <section className="results-section">
                        <div className="section-header">
                            <h3><BarChart3 size={18} /> Block-by-Block Analysis</h3>
                            <span className="section-desc">Detailed metrics for each study block</span>
                        </div>
                        <div className="block-deep-list">
                            {d.blockResults.map((br, i) => (
                                <div key={i} className="card block-deep-card">
                                    <div className="bd-header">
                                        <div className="bd-num">{i + 1}</div>
                                        <div className="bd-title">
                                            <h4>{br.name}</h4>
                                            <span className="bd-type">{br.successRate !== undefined ? 'Task Block' : br.distribution ? 'Multiple Choice' : 'Rating'}</span>
                                        </div>
                                        {br.frictionScore !== undefined && (
                                            <span className={`badge ${br.frictionScore > 50 ? 'badge-danger' : 'badge-success'}`}>
                                                Friction: {br.frictionScore}
                                            </span>
                                        )}
                                    </div>
                                    <div className="bd-body">
                                        {br.successRate !== undefined && (
                                            <div className="bd-metrics">
                                                <div className="bd-metric">
                                                    <div className="bd-metric-circle" style={{ '--pct': `${br.successRate}%`, '--color': br.successRate > 70 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                                        <span>{br.successRate}%</span>
                                                    </div>
                                                    <span>Success Rate</span>
                                                </div>
                                                <div className="bd-metric">
                                                    <span className="bd-metric-big">{br.avgTime}</span>
                                                    <span>Avg Time</span>
                                                </div>
                                                <div className="bd-metric">
                                                    <span className="bd-metric-big">{br.misclickRate}%</span>
                                                    <span>Misclicks</span>
                                                </div>
                                                <div className="bd-ai-note">
                                                    <Sparkles size={12} />
                                                    <span>{br.successRate < 70 ? 'Users struggled here — consider simplifying the interaction' : 'Good performance — users found this intuitive'}</span>
                                                </div>
                                            </div>
                                        )}
                                        {br.avgScore !== undefined && (
                                            <div className="bd-metrics">
                                                <div className="bd-metric">
                                                    <span className="bd-metric-big" style={{ color: br.avgScore >= 5 ? 'var(--color-success)' : 'var(--color-warning)' }}>{br.avgScore}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>/7</span></span>
                                                    <span>Avg Score</span>
                                                </div>
                                                <div className="bd-metric">
                                                    <span className="bd-metric-big">{br.responses}</span>
                                                    <span>Responses</span>
                                                </div>
                                                <div className="bd-score-visual">
                                                    {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                                        <div key={n} className={`score-dot ${n <= Math.round(br.avgScore) ? 'filled' : ''}`}>{n}</div>
                                                    ))}
                                                </div>
                                                <div className="bd-ai-note">
                                                    <Sparkles size={12} />
                                                    <span>{br.avgScore >= 5 ? 'Positive sentiment — users rated this experience favorably' : 'Below average — indicates room for improvement'}</span>
                                                </div>
                                            </div>
                                        )}
                                        {br.distribution && (
                                            <div className="bd-dist-section">
                                                {Object.entries(br.distribution).map(([key, val]) => (
                                                    <div key={key} className="dist-row">
                                                        <span className="dist-label">{key}</span>
                                                        <div className="dist-bar-bg">
                                                            <div className="dist-bar-fill" style={{ width: `${val}%` }}></div>
                                                        </div>
                                                        <span className="dist-val">{val}%</span>
                                                    </div>
                                                ))}
                                                <div className="bd-ai-note" style={{ marginTop: 12 }}>
                                                    <Sparkles size={12} />
                                                    <span>Search bar dominates — {br.distribution['Search bar']}% of users prefer search over browsing</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {tab === 'recordings' && (
                    <section className="results-section">
                        <div className="section-header">
                            <h3><Play size={18} /> Session Recordings</h3>
                            <span className="section-desc">{d.completed} recordings available</span>
                        </div>
                        <div className="recordings-grid">
                            {d.participants.filter(p => p.status === 'completed').map(p => (
                                <div key={p.id} className="card recording-card">
                                    <div className="recording-thumb">
                                        <div className="recording-overlay">
                                            <Play size={24} />
                                        </div>
                                        <span className="recording-duration">{p.duration}</span>
                                    </div>
                                    <div className="recording-info">
                                        <div className="recording-top">
                                            <div className="avatar avatar-sm">{p.name.split('#')[1] || p.name[0]}</div>
                                            <strong>{p.name}</strong>
                                        </div>
                                        <div className="recording-meta">
                                            <span>{deviceIcon(p.device)} {p.device}</span>
                                            <span className="recording-health" style={{ color: p.healthScore > 70 ? 'var(--color-success)' : 'var(--color-danger)' }}>Health: {p.healthScore}</span>
                                            <span>{p.success ? '✓ Success' : '✗ Failed'}</span>
                                        </div>
                                        {p.flagged && <span className="badge badge-warning" style={{ marginTop: 6 }}>{p.flagged}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <style>{`
        .results-page { min-height: 100vh; background: var(--color-bg); }
        .results-topbar { display: flex; align-items: center; justify-content: space-between; padding: 0 var(--space-6); height: var(--topbar-height); background: var(--color-surface); border-bottom: 1px solid var(--color-border); }
        .results-topbar-left { display: flex; align-items: center; gap: var(--space-2); }
        .project-breadcrumb { font-size: 0.8125rem; color: var(--color-text-muted); }

        /* Goal Selector */
        .goal-selector-bar { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-8); background: var(--color-surface-hover); border-bottom: 1px solid var(--color-border); overflow-x: auto; }
        .goal-selector-label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); white-space: nowrap; }
        .goal-tab { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-full); background: var(--color-surface); font-size: 0.75rem; font-weight: 500; color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast); white-space: nowrap; }
        .goal-tab:hover { border-color: var(--color-primary-200); color: var(--color-text); }
        .goal-tab.active { border-color: var(--color-primary); background: var(--color-primary-50); color: var(--color-primary-dark); font-weight: 600; }
        .goal-tab-icon { font-size: 0.875rem; }

        .results-content { padding: var(--space-6) var(--space-8); max-width: 1200px; margin: 0 auto; }

        /* Status Bar */
        .study-status-bar { display: flex; align-items: center; gap: var(--space-5); padding: var(--space-4) var(--space-5); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); margin-bottom: var(--space-5); }
        .status-item { display: flex; align-items: center; gap: var(--space-3); color: var(--color-text-secondary); }
        .status-value { display: block; font-weight: 700; font-size: 0.9375rem; color: var(--color-text); }
        .status-label { font-size: 0.6875rem; color: var(--color-text-muted); }
        .status-divider { width: 1px; height: 32px; background: var(--color-border); }
        .ai-tag { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: var(--color-primary-50); color: var(--color-primary-dark); font-size: 0.6875rem; font-weight: 700; border-radius: var(--radius-full); }

        /* KPI */
        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-bottom: var(--space-5); }
        .kpi-card { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4) var(--space-5); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); position: relative; }
        .kpi-icon { width: 40px; height: 40px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .kpi-value { font-size: 1.375rem; font-weight: 800; display: block; }
        .kpi-label { font-size: 0.75rem; color: var(--color-text-secondary); }
        .kpi-trend { position: absolute; top: 10px; right: 12px; font-size: 0.6875rem; font-weight: 700; padding: 2px 6px; border-radius: var(--radius-sm); }
        .trend-up { background: var(--color-success-bg); color: var(--color-success); }
        .trend-down { background: var(--color-danger-bg); color: var(--color-danger); }

        /* Tabs */
        .results-tabs { margin-bottom: var(--space-5); }

        /* Sections */
        .results-section { margin-bottom: var(--space-6); }
        .section-header { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }
        .section-header h3 { display: flex; align-items: center; gap: var(--space-2); font-size: 1rem; font-weight: 700; margin: 0; }
        .section-badge { font-size: 0.6875rem; background: var(--color-primary-50); color: var(--color-primary-dark); padding: 2px 8px; border-radius: var(--radius-full); font-weight: 600; }
        .section-desc { font-size: 0.8125rem; color: var(--color-text-muted); }

        /* Insights */
        .insights-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
        .insight-card { display: flex; gap: var(--space-4); padding: var(--space-4); }
        .insight-card h4 { font-size: 0.875rem; font-weight: 600; margin-bottom: 4px; }
        .insight-card p { font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5; }
        .insight-critical { border-left: 3px solid var(--color-danger); }
        .insight-critical .insight-icon { color: var(--color-danger); }
        .insight-warning { border-left: 3px solid var(--color-warning); }
        .insight-warning .insight-icon { color: var(--color-warning); }
        .insight-info { border-left: 3px solid var(--color-info); }
        .insight-info .insight-icon { color: var(--color-info); }
        .insight-success { border-left: 3px solid var(--color-success); }
        .insight-success .insight-icon { color: var(--color-success); }

        /* Funnel */
        .funnel-card { padding: var(--space-5); }
        .funnel-chart { display: flex; flex-direction: column; gap: var(--space-2); }
        .funnel-step { display: flex; align-items: center; gap: var(--space-3); }
        .funnel-label { font-size: 0.75rem; color: var(--color-text-secondary); min-width: 90px; font-weight: 500; }
        .funnel-bar-wrapper { flex: 1; background: var(--color-surface-hover); border-radius: var(--radius-full); height: 26px; overflow: hidden; }
        .funnel-bar { height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: flex-end; padding-right: var(--space-3); transition: width 0.6s ease; min-width: 36px; }
        .funnel-count { font-size: 0.6875rem; font-weight: 700; color: #fff; }
        .funnel-pct { font-size: 0.75rem; font-weight: 600; color: var(--color-text-secondary); min-width: 32px; }
        .funnel-dropoff { font-size: 0.6875rem; font-weight: 700; color: var(--color-danger); min-width: 20px; }

        /* Block Results */
        .block-results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-4); }
        .block-result-card { padding: var(--space-5); }
        .br-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
        .br-header h4 { font-size: 0.875rem; font-weight: 600; }
        .br-stats { display: flex; gap: var(--space-5); margin-bottom: var(--space-3); }
        .br-stat { display: flex; flex-direction: column; gap: 2px; }
        .br-val { font-size: 1.125rem; font-weight: 700; }
        .br-stat span:last-child { font-size: 0.6875rem; color: var(--color-text-muted); }
        .br-bar-section { display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2); }
        .br-bar-label { font-size: 0.6875rem; color: var(--color-text-muted); white-space: nowrap; }

        /* Distribution */
        .distribution-bars { display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3); }
        .dist-row { display: flex; align-items: center; gap: var(--space-3); }
        .dist-label { font-size: 0.75rem; color: var(--color-text-secondary); min-width: 90px; }
        .dist-bar-bg { flex: 1; height: 8px; background: var(--color-surface-hover); border-radius: var(--radius-full); }
        .dist-bar-fill { height: 100%; background: var(--color-primary); border-radius: var(--radius-full); transition: width 0.5s ease; }
        .dist-val { font-size: 0.75rem; font-weight: 600; min-width: 30px; }

        /* Device */
        .device-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
        .device-card { padding: var(--space-5); text-align: center; }
        .device-icon { color: var(--color-primary); margin-bottom: var(--space-2); }
        .device-name { font-weight: 700; font-size: 0.9375rem; margin-bottom: 2px; }
        .device-count { font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: var(--space-4); }
        .device-stats { display: flex; justify-content: center; gap: var(--space-6); }
        .device-stats > div { display: flex; flex-direction: column; gap: 2px; }
        .device-stat-val { font-weight: 700; font-size: 0.9375rem; }
        .device-stats span:last-child { font-size: 0.6875rem; color: var(--color-text-muted); }

        /* Participants */
        .participants-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); gap: var(--space-4); flex-wrap: wrap; }
        .search-box { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); }
        .search-box input { border: none; outline: none; background: none; font-size: 0.8125rem; width: 180px; }
        .participants-table { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; }
        .participants-table table { width: 100%; border-collapse: collapse; }
        .participants-table th { text-align: left; padding: var(--space-3) var(--space-4); font-size: 0.6875rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; background: var(--color-surface-hover); border-bottom: 1px solid var(--color-border); }
        .participants-table td { padding: var(--space-3) var(--space-4); font-size: 0.8125rem; border-bottom: 1px solid var(--color-border-light); }
        .participants-table tr { cursor: pointer; transition: background var(--transition-fast); }
        .participants-table tbody tr:hover td { background: var(--color-surface-hover); }
        .selected-row td { background: var(--color-primary-50) !important; }
        .participant-cell { display: flex; align-items: center; gap: var(--space-3); }
        .health-cell { display: flex; align-items: center; gap: var(--space-2); }
        .health-bar { width: 48px; height: 4px; background: var(--color-surface-active); border-radius: 2px; overflow: hidden; }
        .health-fill { height: 100%; border-radius: 2px; }
        .device-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; }

        /* Participant Detail */
        .participant-detail-card { padding: var(--space-5); margin-top: var(--space-4); animation: slideUp 0.2s ease; }
        .pd-header { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }
        .pd-header strong { margin-right: 8px; }
        .pd-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-bottom: var(--space-4); padding: var(--space-3); background: var(--color-surface-hover); border-radius: var(--radius-md); }
        .pd-stat { display: flex; flex-direction: column; gap: 2px; }
        .pd-stat-label { font-size: 0.6875rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600; }
        .pd-journey { margin-top: var(--space-3); }
        .pd-journey-label { display: flex; align-items: center; gap: 4px; font-size: 0.6875rem; font-weight: 600; color: var(--color-primary-dark); margin-bottom: var(--space-3); }
        .pd-timeline { display: flex; align-items: center; }
        .timeline-dot { display: flex; align-items: center; }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--color-border); flex-shrink: 0; }
        .timeline-dot.done .dot { background: var(--color-primary); }
        .timeline-line { width: 28px; height: 2px; background: var(--color-border); }
        .timeline-dot.done .timeline-line { background: var(--color-primary); }

        /* Block Deep */
        .block-deep-list { display: flex; flex-direction: column; gap: var(--space-4); }
        .block-deep-card { padding: var(--space-5); }
        .bd-header { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-4); }
        .bd-num { width: 28px; height: 28px; border-radius: 50%; background: var(--color-primary-50); color: var(--color-primary-dark); font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bd-title { flex: 1; }
        .bd-title h4 { font-size: 0.9375rem; font-weight: 600; }
        .bd-type { font-size: 0.6875rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600; }
        .bd-body { padding-top: var(--space-3); }
        .bd-metrics { display: flex; align-items: flex-start; gap: var(--space-6); flex-wrap: wrap; }
        .bd-metric { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 80px; }
        .bd-metric span:last-child { font-size: 0.6875rem; color: var(--color-text-muted); }
        .bd-metric-circle { width: 64px; height: 64px; border-radius: 50%; border: 4px solid var(--color-surface-active); display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; position: relative; }
        .bd-metric-big { font-size: 1.5rem; font-weight: 800; }
        .bd-ai-note { display: flex; align-items: flex-start; gap: 6px; padding: var(--space-3); background: var(--color-primary-50); border-radius: var(--radius-md); font-size: 0.75rem; color: var(--color-primary-dark); line-height: 1.5; width: 100%; margin-top: var(--space-2); }
        .bd-ai-note svg { flex-shrink: 0; margin-top: 1px; }
        .bd-score-visual { display: flex; gap: var(--space-2); margin-top: var(--space-1); }
        .score-dot { width: 28px; height: 28px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); }
        .score-dot.filled { background: var(--color-primary-50); border-color: var(--color-primary); color: var(--color-primary-dark); }
        .bd-dist-section { width: 100%; }

        /* Recordings */
        .recordings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); }
        .recording-card { overflow: hidden; cursor: pointer; transition: all var(--transition-fast); }
        .recording-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
        .recording-thumb { height: 140px; background: linear-gradient(135deg, var(--color-surface-hover) 0%, var(--color-surface-active) 100%); display: flex; align-items: center; justify-content: center; position: relative; }
        .recording-overlay { width: 48px; height: 48px; border-radius: 50%; background: rgba(34,197,94,0.15); color: var(--color-primary); display: flex; align-items: center; justify-content: center; transition: transform var(--transition-fast); }
        .recording-card:hover .recording-overlay { transform: scale(1.1); background: rgba(34,197,94,0.25); }
        .recording-duration { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 8px; border-radius: var(--radius-sm); font-size: 0.6875rem; font-weight: 600; }
        .recording-info { padding: var(--space-4); }
        .recording-top { display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2); }
        .recording-meta { display: flex; gap: var(--space-4); font-size: 0.6875rem; color: var(--color-text-muted); }
        .recording-meta span { display: flex; align-items: center; gap: 3px; }
        .recording-health { font-weight: 600; }
      `}</style>
        </div>
    )
}
