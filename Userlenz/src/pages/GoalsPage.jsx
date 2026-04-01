import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, RefreshCw, ArrowRight, Target, Clock, Layers, CheckCircle2, Zap, X, Undo2, Info } from 'lucide-react'
import { studyGoals } from '../data/mockData'

export default function GoalsModal({ onClose, onSelectGoal, basePath, isMerged }) {
    const [goals] = useState(studyGoals)
    const [generating, setGenerating] = useState(true)
    const [regeneratingId, setRegeneratingId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => setGenerating(false), 2200)
        return () => clearTimeout(timer)
    }, [])

    const handleRegenerate = (goalId) => {
        setRegeneratingId(goalId)
        setTimeout(() => setRegeneratingId(null), 1500)
    }

    const handleRegenerateAll = () => {
        setGenerating(true)
        setTimeout(() => setGenerating(false), 2200)
    }

    const handleSelectGoal = (goalId) => {
        if (onSelectGoal) onSelectGoal(goalId)
        navigate(`${basePath}/goals/${goalId}/canvas`)
        onClose()
    }

    const handleConfirmAll = () => {
        if (onSelectGoal) onSelectGoal('g1')
        navigate(`${basePath}/goals/g1/canvas`)
        onClose()
    }

    const handleUndoMerge = () => {
        if (onSelectGoal) onSelectGoal('g1')
        navigate(`${basePath}/goals/g1/canvas`)
        onClose()
    }

    return (
        <div className="goals-modal-overlay">
            <div className="goals-modal">
                <button className="goals-modal-close" onClick={onClose}><X size={20} /></button>

                {/* Header */}
                <div className="goals-modal-header">
                    <div className="goals-hero-icon">
                        <Sparkles size={24} className={generating ? 'spin-sparkle' : ''} />
                    </div>
                    <h2>AI-Generated Research Studies</h2>
                    <p>Based on your study "<strong>Checkout Flow Usability Test</strong>", we've identified <strong>3 research studies</strong>. Each study generates its own canvas, results, and report.</p>
                    <div className="goals-meta">
                        <span className="goals-meta-item"><Target size={13} /> 3 Studies</span>
                        <span className="goals-meta-item"><Layers size={13} /> 25 Blocks</span>
                        <span className="goals-meta-item"><Clock size={13} /> ~20 min</span>
                        <span className="goals-meta-item"><Zap size={13} /> 15 Credits</span>
                    </div>
                </div>

                {isMerged && !generating && (
                    <div className="gm-merged-banner">
                        <div className="gm-merged-icon"><Info size={16} /></div>
                        <div className="gm-merged-content">
                            <strong>Merged Study Active</strong>
                            <p>You are currently viewing the combined canvas of all 3 research studies.</p>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {generating && (
                    <div className="goals-loading">
                        <div className="gm-spinner"></div>
                        <h3>Generating research studies...</h3>
                        <p>AI is analyzing your context to suggest the most impactful secondary studies</p>
                        <div className="loading-steps">
                            <div className="loading-step done"><CheckCircle2 size={14} /> Analyzing study context</div>
                            <div className="loading-step done"><CheckCircle2 size={14} /> Identifying research areas</div>
                            <div className="loading-step active"><RefreshCw size={14} className="spin" /> Generating study flows</div>
                        </div>
                    </div>
                )}

                {/* Goals List */}
                {!generating && (
                    <>
                        <div className="goals-modal-grid">
                            {goals.map((goal, index) => (
                                <div key={goal.id} className={`gm-goal-card ${regeneratingId === goal.id ? 'regenerating' : ''}`}>
                                    <div className="gm-goal-left">
                                        <div className="gm-goal-number">{index + 1}</div>
                                        <span className="gm-goal-icon">{goal.icon}</span>
                                    </div>
                                    <div className="gm-goal-body">
                                        <h4>{goal.title}</h4>
                                        <p>{goal.description}</p>
                                        <div className="gm-goal-meta">
                                            <span><Layers size={12} /> {goal.blockCount} blocks</span>
                                            <span><Clock size={12} /> {goal.estimatedTime}</span>
                                        </div>
                                        {/* Flow Preview */}
                                        <div className="gm-flow-chips">
                                            {goal.blocks.slice(0, 4).map((b, bi) => (
                                                <span key={bi} className="gm-flow-chip">{b.title}</span>
                                            ))}
                                            {goal.blocks.length > 4 && (
                                                <div className="gm-tooltip-container">
                                                    <span className="gm-flow-chip more">+{goal.blocks.length - 4}</span>
                                                    <div className="gm-tooltip-content">
                                                        <div className="gm-tooltip-header">Remaining Blocks</div>
                                                        {goal.blocks.slice(4).map((b, bi) => (
                                                            <div key={b.id} className="gm-tooltip-item">
                                                                <span className="gm-tooltip-dot"></span>
                                                                {b.title}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="gm-goal-actions">
                                        <button className="btn btn-ghost btn-sm" onClick={() => handleRegenerate(goal.id)} title="Regenerate">
                                            <RefreshCw size={14} className={regeneratingId === goal.id ? 'spin' : ''} />
                                        </button>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleSelectGoal(goal.id)}>
                                            Open <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="goals-modal-footer">
                            <button className="btn btn-secondary" onClick={handleRegenerateAll}>
                                <RefreshCw size={15} /> Regenerate All
                                <span className="gm-credit-cost">5 credits</span>
                            </button>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {isMerged ? (
                                    <button className="btn btn-secondary btn-lg btn-undo-merge" onClick={handleUndoMerge}>
                                        <Undo2 size={16} /> Undo Merge
                                    </button>
                                ) : (
                                    <button className="btn btn-secondary btn-lg" onClick={() => handleSelectGoal('merged')}>
                                        <Layers size={16} /> Merge 3 Studies into 1
                                    </button>
                                )}
                                <button className="btn btn-primary btn-lg" onClick={handleConfirmAll} disabled={isMerged}>
                                    {isMerged ? 'Looking Good!' : 'Confirm & Start'} <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style>{`
        .goals-modal-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .goals-modal { position: relative; background: var(--color-surface); border-radius: var(--radius-2xl, 20px); width: 720px; max-width: 94vw; max-height: 88vh; overflow-y: auto; box-shadow: var(--shadow-2xl, 0 25px 50px rgba(0,0,0,0.15)); animation: modalSlideUp 0.3s ease; padding: var(--space-6) var(--space-7, var(--space-6)); }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .goals-modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--color-text-muted); cursor: pointer; padding: 6px; border-radius: var(--radius-md); transition: all var(--transition-fast); }
        .goals-modal-close:hover { background: var(--color-surface-hover); color: var(--color-text); }

        /* Modal Header */
        .goals-modal-header { text-align: center; margin-bottom: var(--space-6); }
        .goals-hero-icon { width: 48px; height: 48px; margin: 0 auto var(--space-3); background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100)); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--color-primary); }
        .goals-modal-header h2 { font-size: 1.25rem; font-weight: 800; margin-bottom: var(--space-2); }
        .goals-modal-header p { font-size: 0.875rem; color: var(--color-text-secondary); max-width: 500px; margin: 0 auto; line-height: 1.55; }
        .goals-meta { display: flex; justify-content: center; gap: var(--space-4); margin-top: var(--space-3); }
        .goals-meta-item { display: flex; align-items: center; gap: 3px; font-size: 0.6875rem; font-weight: 600; color: var(--color-text-muted); }

        /* Loading */
        .goals-loading { text-align: center; padding: var(--space-8) 0 var(--space-6); }
        .gm-spinner { width: 36px; height: 36px; border: 3px solid var(--color-border); border-top-color: var(--color-primary); border-radius: 50%; margin: 0 auto var(--space-3); animation: spinLoader 0.8s linear infinite; }
        @keyframes spinLoader { to { transform: rotate(360deg); } }
        .goals-loading h3 { font-size: 1rem; font-weight: 700; margin-bottom: var(--space-1); }
        .goals-loading p { color: var(--color-text-muted); font-size: 0.8125rem; margin-bottom: var(--space-5); }
        .loading-steps { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); }
        .loading-step { display: flex; align-items: center; gap: var(--space-2); font-size: 0.8125rem; color: var(--color-text-muted); }
        .loading-step.done { color: var(--color-success); }
        .loading-step.active { color: var(--color-primary); font-weight: 600; }
        .spin { animation: spinLoader 1s linear infinite; }
        .spin-sparkle { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.15); } }

        /* Goal Cards */
        .goals-modal-grid { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-5); }
        .gm-goal-card { display: flex; align-items: flex-start; gap: var(--space-4); padding: var(--space-4) var(--space-5); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); transition: all var(--transition-fast); }
        .gm-goal-card:hover { border-color: var(--color-primary-200); box-shadow: var(--shadow-md); }
        .gm-goal-card.regenerating { opacity: 0.5; pointer-events: none; }
        .gm-goal-left { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); min-width: 36px; }
        .gm-goal-number { width: 28px; height: 28px; border-radius: 50%; background: var(--color-primary-50); color: var(--color-primary-dark); font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
        .gm-goal-icon { font-size: 1.25rem; }
        .gm-goal-body { flex: 1; min-width: 0; }
        .gm-goal-body h4 { font-size: 0.9375rem; font-weight: 700; margin-bottom: 4px; }
        .gm-goal-body p { font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: var(--space-2); }
        .gm-goal-meta { display: flex; gap: var(--space-3); margin-bottom: var(--space-2); }
        .gm-goal-meta span { display: flex; align-items: center; gap: 3px; font-size: 0.6875rem; color: var(--color-text-muted); font-weight: 500; }
        .gm-flow-chips { display: flex; flex-wrap: wrap; gap: 4px; }
        .gm-flow-chip { font-size: 0.625rem; padding: 2px 7px; background: var(--color-surface-hover); border: 1px solid var(--color-border-light); border-radius: var(--radius-full); color: var(--color-text-muted); white-space: nowrap; }
        .gm-flow-chip.more { background: var(--color-primary-50); color: var(--color-primary-dark); font-weight: 600; border-color: var(--color-primary-100); cursor: default; }
        .gm-goal-actions { display: flex; flex-direction: column; gap: var(--space-2); align-items: flex-end; flex-shrink: 0; padding-top: 2px; }

        /* Tooltip */
        .gm-tooltip-container { position: relative; display: inline-flex; }
        .gm-tooltip-content { position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(4px); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-3); box-shadow: var(--shadow-lg); width: max-content; max-width: 240px; z-index: 10; opacity: 0; visibility: hidden; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; display: flex; flex-direction: column; gap: 6px; }
        .gm-tooltip-container:hover .gm-tooltip-content { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
        .gm-tooltip-header { font-size: 0.6875rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--color-border-light); padding-bottom: 4px; margin-bottom: 2px; }
        .gm-tooltip-item { font-size: 0.75rem; color: var(--color-text); display: flex; align-items: flex-start; gap: 6px; line-height: 1.4; }
        .gm-tooltip-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; margin-top: 6px; }

        /* Footer & Merged State */
        .goals-modal-footer { display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-4); border-top: 1px solid var(--color-border-light); }
        .gm-credit-cost { font-size: 0.625rem; background: var(--color-surface-hover); padding: 1px 6px; border-radius: var(--radius-sm); margin-left: 4px; color: var(--color-text-muted); }
        .gm-merged-banner { display: flex; gap: var(--space-3); background: var(--color-primary-50); border: 1px dashed var(--color-primary-200); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: var(--space-5); align-items: center; }
        .gm-merged-icon { color: var(--color-primary); flex-shrink: 0; }
        .gm-merged-content strong { display: block; font-size: 0.875rem; color: var(--color-primary-dark); margin-bottom: 2px; }
        .gm-merged-content p { font-size: 0.75rem; color: var(--color-primary); line-height: 1.4; margin: 0; }
        .btn-undo-merge:hover { border-color: var(--color-danger); color: var(--color-danger); background: var(--color-danger-50); }
      `}</style>
        </div>
    )
}
