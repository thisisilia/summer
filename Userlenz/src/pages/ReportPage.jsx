import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Share2, AlertTriangle, AlertCircle, Info, Sparkles, Brain, Eye, MousePointerClick, Timer, TrendingDown, TrendingUp, Users, Quote, BarChart3, Zap, Target, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react'
import { studyGoals } from '../data/mockData'

export default function ReportPage() {
    const { projectId, studyId, goalId } = useParams()
    const currentGoal = studyGoals.find(g => g.id === (goalId || 'g1')) || studyGoals[0]
    const [generating, setGenerating] = useState(false)
    const [expandedIssue, setExpandedIssue] = useState(null)
    const navigate = useNavigate()
    const d = currentGoal.reportData
    const basePath = `/projects/${projectId || 'p1'}/studies/${studyId || 's1'}`

    const severityColor = { critical: 'var(--color-danger)', major: 'var(--color-warning)', minor: 'var(--color-info)' }
    const severityBg = { critical: 'var(--color-danger-bg)', major: 'var(--color-warning-bg)', minor: 'var(--color-info-bg)' }

    // AI behavioral insights data
    const behaviorPatterns = [
        { icon: <MousePointerClick size={18} />, label: 'Navigation Pattern', value: 'Search-First', desc: '80% of users went to search bar before trying menu navigation. Users prefer direct search over hierarchical browsing.', trend: 'up' },
        { icon: <Timer size={18} />, label: 'Hesitation Hotspot', value: 'Checkout CTA', desc: 'Average 6.2s pause before clicking checkout — 3x longer than industry benchmark. Users showed uncertainty about proceeding.', trend: 'down' },
        { icon: <Eye size={18} />, label: 'Attention Blindness', value: 'Cart Icon', desc: 'Only 25% of users noticed the cart icon on first scan. Eye-tracking proxy (cursor movement) shows users scanned right-to-left, missing the top-right cart.', trend: 'down' },
        { icon: <Target size={18} />, label: 'Discovery Method', value: 'Trial & Error', desc: '67% of users found features through exploration rather than following intended flow. The navigation hierarchy doesn\'t match user mental models.', trend: 'down' },
    ]

    const userJourney = [
        { step: 'Landing', avgTime: '12s', dropoff: '0%', emotion: '😊', note: 'Users understood the welcome screen quickly' },
        { step: 'Browse Products', avgTime: '2m 15s', dropoff: '8%', emotion: '😐', note: 'Slight confusion with category filters' },
        { step: 'Product Detail', avgTime: '1m 40s', dropoff: '0%', emotion: '😊', note: 'Users engaged with product images' },
        { step: 'Add to Cart', avgTime: '45s', dropoff: '17%', emotion: '😟', note: 'Cart icon hard to find — major friction point' },
        { step: 'Checkout', avgTime: '3m 10s', dropoff: '25%', emotion: '😰', note: 'Form too long, users abandoned' },
        { step: 'Complete', avgTime: '30s', dropoff: '0%', emotion: '😊', note: 'Clear confirmation screen' },
    ]

    const aiNarrative = `Based on analyzing 12 participant sessions totaling 104 minutes of interaction data, our AI has identified a consistent pattern: **users can successfully browse and discover products, but encounter significant friction when transitioning to purchase actions.**

The primary bottleneck occurs at the "Add to Cart" step, where users spend an average of 45 seconds — nearly 3x the expected duration — searching for the cart interaction. Heatmap analysis reveals that 75% of click attempts occurred in the header area where users expected a traditional cart icon, but the current design places the action within the product detail card.

Additionally, the checkout flow creates a secondary friction point. The 5-step checkout process resulted in a 25% abandonment rate, with most drop-offs occurring at the shipping information form. Users who completed the flow reported feeling "overwhelmed" by the number of required fields.`

    const participantQuotes = [
        { name: 'P3 — Sarah', quote: "I kept looking for the cart at the top right corner... it took me a while to figure out I had to scroll down to add items.", sentiment: 'negative' },
        { name: 'P7 — Mike', quote: "The product page is beautiful, but I wasn't sure if I actually added the item. There was no clear feedback.", sentiment: 'negative' },
        { name: 'P1 — Emma', quote: "Once I found everything, the checkout was smooth. But honestly, I almost gave up looking for the cart button.", sentiment: 'mixed' },
        { name: 'P11 — James', quote: "The search works great! I found what I wanted in seconds. Just make the buying part as easy as the browsing.", sentiment: 'positive' },
    ]

    const confidenceMetrics = [
        { label: 'Data Confidence', value: 95, desc: 'High sample saturation' },
        { label: 'Pattern Reliability', value: 88, desc: 'Consistent across sessions' },
        { label: 'Recommendation Confidence', value: 82, desc: 'Evidence-backed suggestions' },
    ]

    return (
        <div className="report-page">
            <header className="report-topbar">
                <div className="results-topbar-left">
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate(`${basePath}/goals`)}><ArrowLeft size={18} /></button>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Fashion App Redesign /</span>
                    <span style={{ fontWeight: 600 }}>Checkout Flow Usability Test</span>
                </div>
                <div className="tabs" style={{ background: 'transparent' }}>
                    <button className="tab" onClick={() => navigate(`${basePath}/goals/${currentGoal.id}/canvas`)}>Canvas</button>
                    <button className="tab" onClick={() => navigate(`${basePath}/goals/${currentGoal.id}/results`)}>Results</button>
                    <button className="tab active">Report</button>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm"><Share2 size={16} /> Share</button>
                    <button className="btn btn-primary btn-sm"><Download size={16} /> Export PDF</button>
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
                        onClick={() => navigate(`${basePath}/goals/${g.id}/report`)}
                    >
                        <span className="goal-tab-icon">{g.icon}</span>
                        {g.title.length > 28 ? g.title.slice(0, 28) + '…' : g.title}
                    </button>
                ))}
            </div>

            <div className="report-content">
                {/* AI Generated Banner */}
                <div className="ai-generated-banner">
                    <div className="ai-banner-icon"><Brain size={20} /></div>
                    <div>
                        <strong>AI-Generated Research Report</strong>
                        <span>Analyzed 12 sessions · 104 min of data · Generated Mar 5, 2026 at 2:34 PM</span>
                    </div>
                    <div className="ai-banner-badge"><Sparkles size={12} /> AI Report v2.1</div>
                </div>

                {/* Verdict Card */}
                <div className="card verdict-card">
                    <div className="verdict-header">
                        <div>
                            <span className="verdict-label"><Sparkles size={13} /> AI Verdict</span>
                            <h2 className="verdict-value" style={{ color: d.verdict === 'Ready' ? 'var(--color-success)' : 'var(--color-warning)' }}>{d.verdict}</h2>
                        </div>
                        <div className="verdict-scores">
                            <div className="verdict-score">
                                <span className="vs-value">{d.pSusScore}</span>
                                <span className="vs-label">pSUS Score</span>
                            </div>
                            <div className="verdict-score">
                                <span className="vs-value" style={{ color: d.cognitiveLoad === 'High' ? 'var(--color-danger)' : 'var(--color-success)' }}>{d.cognitiveLoad}</span>
                                <span className="vs-label">Cognitive Load</span>
                            </div>
                            <div className="verdict-score">
                                <span className="vs-value">73%</span>
                                <span className="vs-label">Task Success</span>
                            </div>
                        </div>
                    </div>
                    <p className="verdict-impact">{d.kpiImpact}</p>
                </div>

                {/* AI Confidence Meters */}
                <div className="confidence-row">
                    {confidenceMetrics.map((m, i) => (
                        <div key={i} className="confidence-item">
                            <div className="confidence-header">
                                <span className="confidence-label">{m.label}</span>
                                <span className="confidence-value">{m.value}%</span>
                            </div>
                            <div className="progress-bar" style={{ height: 4 }}>
                                <div className="progress-fill" style={{ width: `${m.value}%` }}></div>
                            </div>
                            <span className="confidence-desc">{m.desc}</span>
                        </div>
                    ))}
                </div>

                {/* Goal Recap */}
                <div className="card" style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>🎯 Goal Recap</h3>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{d.goalRecap}</p>
                </div>

                {/* AI Narrative Summary */}
                <div className="report-section">
                    <h3><Brain size={18} /> AI Analysis Summary</h3>
                    <div className="card ai-narrative-card">
                        <div className="ai-narrative-tag"><Sparkles size={12} /> AI-Generated Narrative</div>
                        <div className="ai-narrative-text" dangerouslySetInnerHTML={{ __html: aiNarrative.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                </div>

                {/* Behavioral Patterns */}
                <div className="report-section">
                    <h3><Zap size={18} /> User Behavior Patterns</h3>
                    <div className="behavior-grid">
                        {behaviorPatterns.map((bp, i) => (
                            <div key={i} className="card behavior-card">
                                <div className="behavior-top">
                                    <div className="behavior-icon">{bp.icon}</div>
                                    <div className="behavior-trend" data-trend={bp.trend}>
                                        {bp.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    </div>
                                </div>
                                <span className="behavior-label">{bp.label}</span>
                                <span className="behavior-value">{bp.value}</span>
                                <p className="behavior-desc">{bp.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Journey Analysis */}
                <div className="report-section">
                    <h3><BarChart3 size={18} /> User Journey Analysis</h3>
                    <div className="card journey-card">
                        <div className="ai-narrative-tag" style={{ marginBottom: 16 }}><Sparkles size={12} /> AI analyzed step-by-step user progression</div>
                        <div className="journey-table">
                            <div className="journey-header">
                                <span>Step</span>
                                <span>Avg. Time</span>
                                <span>Drop-off</span>
                                <span>Sentiment</span>
                                <span>AI Observation</span>
                            </div>
                            {userJourney.map((step, i) => (
                                <div key={i} className={`journey-row ${parseFloat(step.dropoff) > 10 ? 'friction' : ''}`}>
                                    <span className="journey-step">
                                        <span className="journey-num">{i + 1}</span>
                                        {step.step}
                                    </span>
                                    <span>{step.avgTime}</span>
                                    <span className={parseFloat(step.dropoff) > 10 ? 'dropoff-high' : 'dropoff-ok'}>{step.dropoff}</span>
                                    <span style={{ fontSize: '1.25rem' }}>{step.emotion}</span>
                                    <span className="journey-note">{step.note}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Participant Voice — AI-Curated Quotes */}
                <div className="report-section">
                    <h3><Quote size={18} /> Participant Voice</h3>
                    <p className="section-subtitle"><Sparkles size={13} /> AI-curated quotes highlighting key themes from participant sessions</p>
                    <div className="quotes-grid">
                        {participantQuotes.map((q, i) => (
                            <div key={i} className={`card quote-card quote-${q.sentiment}`}>
                                <div className="quote-text">"{q.quote}"</div>
                                <div className="quote-author">
                                    <div className="avatar avatar-sm">{q.name[0]}</div>
                                    <span>{q.name}</span>
                                    <span className={`badge badge-${q.sentiment === 'positive' ? 'success' : q.sentiment === 'negative' ? 'danger' : 'warning'}`}>
                                        {q.sentiment}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Issues List */}
                <div className="report-section">
                    <h3><Sparkles size={18} /> AI-Identified Issues</h3>
                    <p className="section-subtitle">Prioritized by impact severity · Click to expand details</p>
                    <div className="issues-list">
                        {d.issues.map((issue, idx) => (
                            <div key={issue.id} className={`card issue-card ${expandedIssue === idx ? 'expanded' : ''}`} style={{ borderLeft: `3px solid ${severityColor[issue.severity]}` }}>
                                <div className="issue-header" onClick={() => setExpandedIssue(expandedIssue === idx ? null : idx)} style={{ cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                                        <span className="issue-severity" style={{ background: severityBg[issue.severity], color: severityColor[issue.severity] }}>
                                            {issue.severity === 'critical' && <AlertTriangle size={14} />}
                                            {issue.severity === 'major' && <AlertCircle size={14} />}
                                            {issue.severity === 'minor' && <Info size={14} />}
                                            {issue.severity}
                                        </span>
                                        <h4>{issue.title}</h4>
                                    </div>
                                    {expandedIssue === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                                {expandedIssue === idx && (
                                    <div className="issue-body">
                                        <div className="issue-detail">
                                            <span className="detail-label">Impact</span>
                                            <p>{issue.impact}</p>
                                        </div>
                                        <div className="issue-detail">
                                            <span className="detail-label">Evidence</span>
                                            <p>{issue.evidence}</p>
                                        </div>
                                        <div className="issue-detail recommendation">
                                            <span className="detail-label">💡 AI Recommendation</span>
                                            <p>{issue.recommendation}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Action Items */}
                <div className="report-section">
                    <h3><Target size={18} /> AI-Suggested Action Items</h3>
                    <div className="card action-items-card">
                        <div className="ai-narrative-tag" style={{ marginBottom: 16 }}><Sparkles size={12} /> Prioritized next steps based on impact analysis</div>
                        {[
                            { priority: 'P0', label: 'Move cart icon to top-right header with item count badge', impact: 'Est. +18% conversion', tag: 'critical' },
                            { priority: 'P0', label: 'Add visual feedback (animation + toast) when item is added to cart', impact: 'Est. -40% re-clicks', tag: 'critical' },
                            { priority: 'P1', label: 'Reduce checkout to 3 steps max with address auto-complete', impact: 'Est. -25% abandonment', tag: 'major' },
                            { priority: 'P1', label: 'Add persistent mini-cart summary sidebar during checkout', impact: 'Est. +12% confidence', tag: 'major' },
                            { priority: 'P2', label: 'Implement search-first navigation with auto-suggestions', impact: 'Est. -15s avg. browse time', tag: 'minor' },
                        ].map((item, i) => (
                            <div key={i} className="action-item">
                                <span className={`action-priority priority-${item.tag}`}>{item.priority}</span>
                                <div className="action-content">
                                    <span className="action-label">{item.label}</span>
                                    <span className="action-impact"><TrendingUp size={12} /> {item.impact}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Regenerate */}
                <div className="regen-section">
                    <button className={`btn btn-secondary btn-lg ${generating ? 'generating' : ''}`} onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 2000) }}>
                        {generating ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
                        {generating ? 'AI is regenerating...' : 'Regenerate Report'}
                    </button>
                    <p>Uses 1 AI Gen Credit · Last generated 2h ago</p>
                </div>
            </div>

            <style>{`
        .report-page { min-height: 100vh; background: var(--color-bg); }
        .report-topbar { display: flex; align-items: center; justify-content: space-between; padding: 0 var(--space-6); height: var(--topbar-height); background: var(--color-surface); border-bottom: 1px solid var(--color-border); }
        .results-topbar-left { display: flex; align-items: center; gap: var(--space-2); }

        /* Goal Selector */
        .goal-selector-bar { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-10); background: var(--color-surface-hover); border-bottom: 1px solid var(--color-border); overflow-x: auto; }
        .goal-selector-label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); white-space: nowrap; }
        .goal-tab { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-full); background: var(--color-surface); font-size: 0.75rem; font-weight: 500; color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast); white-space: nowrap; }
        .goal-tab:hover { border-color: var(--color-primary-200); color: var(--color-text); }
        .goal-tab.active { border-color: var(--color-primary); background: var(--color-primary-50); color: var(--color-primary-dark); font-weight: 600; }
        .goal-tab-icon { font-size: 0.875rem; }

        .report-content { padding: var(--space-6) var(--space-10); max-width: 920px; margin: 0 auto; }

        /* AI Banner */
        .ai-generated-banner { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4) var(--space-5); background: linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(20,184,166,0.06) 100%); border: 1px solid var(--color-primary-100); border-radius: var(--radius-lg); margin-bottom: var(--space-6); }
        .ai-banner-icon { width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--color-primary-50); display: flex; align-items: center; justify-content: center; color: var(--color-primary); flex-shrink: 0; }
        .ai-generated-banner strong { display: block; font-size: 0.9375rem; color: var(--color-text); margin-bottom: 2px; }
        .ai-generated-banner span { font-size: 0.75rem; color: var(--color-text-muted); }
        .ai-banner-badge { margin-left: auto; display: flex; align-items: center; gap: 4px; padding: 4px 10px; background: var(--color-primary-50); color: var(--color-primary-dark); font-size: 0.6875rem; font-weight: 700; border-radius: var(--radius-full); white-space: nowrap; }

        /* Verdict */
        .verdict-card { padding: var(--space-6) var(--space-8); background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-primary-50) 100%); margin-bottom: var(--space-5); }
        .verdict-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4); }
        .verdict-label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px; }
        .verdict-value { font-size: 2rem; font-weight: 800; margin-top: var(--space-1); }
        .verdict-scores { display: flex; gap: var(--space-8); }
        .verdict-score { text-align: center; }
        .vs-value { display: block; font-size: 1.5rem; font-weight: 800; }
        .vs-label { font-size: 0.75rem; color: var(--color-text-muted); }
        .verdict-impact { color: var(--color-text-secondary); line-height: 1.7; padding-top: var(--space-4); border-top: 1px solid var(--color-border-light); font-size: 0.875rem; }

        /* Confidence */
        .confidence-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-6); }
        .confidence-item { padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
        .confidence-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .confidence-label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-secondary); }
        .confidence-value { font-size: 0.875rem; font-weight: 800; color: var(--color-primary-dark); }
        .confidence-desc { font-size: 0.6875rem; color: var(--color-text-muted); margin-top: 4px; display: block; }

        /* Sections */
        .report-section { margin-bottom: var(--space-8); }
        .report-section h3 { display: flex; align-items: center; gap: var(--space-2); font-size: 1.125rem; font-weight: 700; margin-bottom: var(--space-4); }
        .section-subtitle { font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: var(--space-4); display: flex; align-items: center; gap: 6px; margin-top: -8px; }

        /* AI Narrative */
        .ai-narrative-card { padding: var(--space-6); }
        .ai-narrative-tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; background: var(--color-primary-50); color: var(--color-primary-dark); font-size: 0.6875rem; font-weight: 700; border-radius: var(--radius-full); margin-bottom: 12px; }
        .ai-narrative-text { font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.8; white-space: pre-wrap; }
        .ai-narrative-text strong { color: var(--color-text); font-weight: 600; }

        /* Behavior Grid */
        .behavior-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
        .behavior-card { padding: var(--space-5); }
        .behavior-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3); }
        .behavior-icon { width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--color-primary-50); color: var(--color-primary); display: flex; align-items: center; justify-content: center; }
        .behavior-trend { width: 28px; height: 28px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
        .behavior-trend[data-trend="up"] { background: var(--color-success-bg); color: var(--color-success); }
        .behavior-trend[data-trend="down"] { background: var(--color-danger-bg); color: var(--color-danger); }
        .behavior-label { font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
        .behavior-value { display: block; font-size: 1.125rem; font-weight: 700; margin: 4px 0 8px; color: var(--color-text); }
        .behavior-desc { font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.6; margin: 0; }

        /* Journey */
        .journey-card { padding: var(--space-5); overflow-x: auto; }
        .journey-table { display: flex; flex-direction: column; gap: 0; }
        .journey-header { display: grid; grid-template-columns: 160px 90px 80px 80px 1fr; gap: var(--space-3); padding: var(--space-3) var(--space-4); font-size: 0.6875rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid var(--color-border); }
        .journey-row { display: grid; grid-template-columns: 160px 90px 80px 80px 1fr; gap: var(--space-3); padding: var(--space-3) var(--space-4); font-size: 0.8125rem; align-items: center; border-bottom: 1px solid var(--color-border-light); transition: background var(--transition-fast); }
        .journey-row:last-child { border-bottom: none; }
        .journey-row:hover { background: var(--color-surface-hover); }
        .journey-row.friction { background: rgba(220,38,38,0.03); }
        .journey-step { display: flex; align-items: center; gap: var(--space-3); font-weight: 600; }
        .journey-num { width: 22px; height: 22px; border-radius: 50%; background: var(--color-primary-50); color: var(--color-primary-dark); font-size: 0.6875rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .journey-note { font-size: 0.75rem; color: var(--color-text-muted); font-style: italic; }
        .dropoff-high { color: var(--color-danger); font-weight: 700; }
        .dropoff-ok { color: var(--color-success); font-weight: 600; }

        /* Quotes */
        .quotes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
        .quote-card { padding: var(--space-5); }
        .quote-negative { border-left: 3px solid var(--color-danger); }
        .quote-positive { border-left: 3px solid var(--color-success); }
        .quote-mixed { border-left: 3px solid var(--color-warning); }
        .quote-text { font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.7; font-style: italic; margin-bottom: var(--space-4); }
        .quote-author { display: flex; align-items: center; gap: var(--space-2); font-size: 0.8125rem; font-weight: 600; }

        /* Issues */
        .issues-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .issue-card { padding: var(--space-4) var(--space-5); transition: all var(--transition-fast); }
        .issue-card:hover { box-shadow: var(--shadow-md); }
        .issue-header { display: flex; align-items: center; justify-content: space-between; color: var(--color-text-muted); }
        .issue-severity { display: inline-flex; align-items: center; gap: var(--space-1); padding: 2px var(--space-3); border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; text-transform: capitalize; }
        .issue-header h4 { font-size: 0.9375rem; font-weight: 600; }
        .issue-body { display: flex; flex-direction: column; gap: var(--space-4); padding-top: var(--space-4); margin-top: var(--space-3); border-top: 1px solid var(--color-border-light); animation: fadeIn 0.2s ease; }
        .issue-detail { display: flex; flex-direction: column; gap: var(--space-1); }
        .detail-label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
        .issue-detail p { font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6; }
        .recommendation { background: var(--color-primary-50); padding: var(--space-4); border-radius: var(--radius-md); margin-top: var(--space-2); }

        /* Action Items */
        .action-items-card { padding: var(--space-5); }
        .action-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3) 0; border-bottom: 1px solid var(--color-border-light); }
        .action-item:last-child { border-bottom: none; }
        .action-priority { width: 32px; height: 24px; border-radius: var(--radius-sm); font-size: 0.6875rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .priority-critical { background: var(--color-danger-bg); color: var(--color-danger); }
        .priority-major { background: var(--color-warning-bg); color: var(--color-warning); }
        .priority-minor { background: var(--color-info-bg); color: var(--color-info); }
        .action-content { flex: 1; display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); }
        .action-label { font-size: 0.875rem; font-weight: 500; }
        .action-impact { display: flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 600; color: var(--color-success); white-space: nowrap; }

        /* Regenerate */
        .regen-section { text-align: center; padding: var(--space-8) 0; border-top: 1px solid var(--color-border); margin-top: var(--space-4); }
        .regen-section p { font-size: 0.8125rem; color: var(--color-text-muted); margin-top: var(--space-2); }
        .generating { opacity: 0.7; pointer-events: none; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
        </div>
    )
}
