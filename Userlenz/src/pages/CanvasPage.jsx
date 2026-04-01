import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Play, Rocket, Eye, MoreHorizontal, Plus, ZoomIn, ZoomOut, MousePointer2, Hand, MessageSquare, Sparkles, Wand2, Copy, Trash2, RefreshCw, ChevronDown, X, Monitor, Tablet, Smartphone, Target, Layers, Undo2, Info } from 'lucide-react'
import { studyGoals, blockTypes } from '../data/mockData'
import GoalsModal from './GoalsPage'

export default function CanvasPage() {
    const { projectId, studyId, goalId } = useParams()
    const location = useLocation()
    const isGoalsRoute = location.pathname.endsWith('/goals') || location.pathname.endsWith('/goals/')

    // Determine current blocks based on whether we are viewing a specific goal or a merged view
    const isMerged = goalId === 'merged'
    const currentGoal = isMerged
        ? { id: 'merged', title: 'Merged Study (All Blocks)', icon: 'Layers' }
        : studyGoals.find(g => g.id === (goalId || 'g1')) || studyGoals[0]

    const [blocks, setBlocks] = useState(() => {
        if (isMerged) return studyGoals.reduce((acc, g) => acc.concat(g.blocks), [])
        return currentGoal.blocks
    })
    const [selectedBlock, setSelectedBlock] = useState(null)
    const [editorTab, setEditorTab] = useState('editor')
    const [zoom, setZoom] = useState(100)
    const [showLaunchModal, setShowLaunchModal] = useState(false)
    const [isLive, setIsLive] = useState(false)
    const [showAddBlock, setShowAddBlock] = useState(false)
    const [showGoalsModal, setShowGoalsModal] = useState(isGoalsRoute)
    const [showCoachMark, setShowCoachMark] = useState(false)
    const navigate = useNavigate()

    // Update blocks when goalId changes
    useEffect(() => {
        if (goalId === 'merged') {
            setBlocks(studyGoals.reduce((acc, g) => acc.concat(g.blocks), []))
        } else {
            const goal = studyGoals.find(g => g.id === (goalId || 'g1')) || studyGoals[0]
            setBlocks(goal.blocks)
        }
        setSelectedBlock(null)
    }, [goalId])

    const selectedBlockData = blocks.find(b => b.id === selectedBlock)
    const getBlockType = (type) => blockTypes.find(bt => bt.id === type) || {}
    const basePath = `/projects/${projectId || 'p1'}/studies/${studyId || 's1'}`

    const handleGoalsModalClose = () => {
        setShowGoalsModal(false)
        // Show coach mark after closing modal
        setShowCoachMark(true)
        setTimeout(() => setShowCoachMark(false), 6000)
    }

    return (
        <div className="canvas-page">
            {/* Top Bar */}
            <header className="canvas-topbar">
                <div className="canvas-topbar-left">
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate('/projects/p1')}>
                        <ArrowLeft size={18} />
                    </button>
                    <span className="project-breadcrumb">Fashion App Redesign /</span>
                    <span className="study-name-editable">Checkout Flow Usability Test</span>
                    <button className="btn btn-ghost btn-icon btn-sm"><MoreHorizontal size={16} /></button>
                </div>
                <div className="canvas-topbar-center">
                    <div className="tabs" style={{ background: 'transparent' }}>
                        <button className="tab active">Canvas</button>
                        <button className="tab" onClick={() => navigate(`${basePath}/goals/${currentGoal.id}/results`)}>Results</button>
                        <button className="tab" onClick={() => navigate(`${basePath}/goals/${currentGoal.id}/report`)}>Report</button>
                    </div>
                </div>
                <div className="canvas-topbar-right">
                    <div className="credits-mini"><Sparkles size={14} /> <span>160</span></div>
                    <div className="avatar avatar-sm">J</div>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate('/preview')}>
                        <Eye size={16} /> Preview
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowLaunchModal(true)}>
                        <Rocket size={16} /> Launch
                    </button>
                </div>
            </header>

            {/* Goal Selector Bar */}
            <div className="goal-selector-bar" id="goal-selector-bar">
                <Target size={14} />
                <span className="goal-selector-label">Studies:</span>

                {isMerged ? (
                    <button className="goal-tab active">
                        <span className="goal-tab-icon"><Layers size={14} /></span>
                        Merged Study (Combines All)
                    </button>
                ) : (
                    studyGoals.map((g) => (
                        <button
                            key={g.id}
                            className={`goal-tab ${g.id === currentGoal.id ? 'active' : ''}`}
                            onClick={() => navigate(`${basePath}/goals/${g.id}/canvas`)}
                        >
                            <span className="goal-tab-icon">{g.icon}</span>
                            {g.title.length > 28 ? g.title.slice(0, 28) + '…' : g.title}
                        </button>
                    ))
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setShowGoalsModal(true)} style={{ fontSize: '0.75rem' }}>
                        <Sparkles size={13} /> Review Studies
                    </button>
                </div>

                {/* Coach Mark */}
                {showCoachMark && (
                    <div className="coach-mark">
                        <div className="coach-mark-arrow"></div>
                        <div className="coach-mark-bubble">
                            <button className="coach-mark-close" onClick={() => setShowCoachMark(false)}>
                                <X size={12} />
                            </button>
                            <div className="coach-mark-icon"><Target size={16} /></div>
                            <strong>Your research studies are here!</strong>
                            <p>Switch between studies or view your merged flow. Each study has its own analysis and report.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Canvas Area */}
            <div className="canvas-workspace">
                <div className="canvas-area" style={{ transform: `scale(${zoom / 100})` }}>
                    {/* Show blank canvas when goals modal is open */}
                    {showGoalsModal ? (
                        <div className="blank-canvas-hint">
                            <Sparkles size={32} style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
                        </div>
                    ) : (
                        <div className="flow-container">
                            {blocks.map((block, index) => {
                                const bt = getBlockType(block.type)
                                return (
                                    <div key={block.id}>
                                        <div
                                            className={`flow-block ${selectedBlock === block.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedBlock(block.id)}
                                        >
                                            <div className="flow-block-header" style={{ borderLeftColor: bt.color || '#22C55E' }}>
                                                <span className="flow-block-icon">{bt.icon || '📦'}</span>
                                                <span className="flow-block-type">{bt.name || block.type}</span>
                                            </div>
                                            <div className="flow-block-title">{block.title}</div>
                                            <div className="flow-block-preview">
                                                {block.content?.question || block.content?.taskTitle || block.content?.title || block.content?.description?.slice(0, 60) + '...'}
                                            </div>
                                        </div>
                                        {index < blocks.length - 1 && (
                                            <div className="flow-connector">
                                                <div className="connector-line"></div>
                                                <button className="add-block-btn" onClick={(e) => { e.stopPropagation(); setShowAddBlock(index + 1) }}>
                                                    <Plus size={14} />
                                                </button>
                                                <div className="connector-line"></div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Right Panel - Block Editor */}
                {selectedBlockData && !showGoalsModal && (
                    <div className="editor-panel">
                        <div className="editor-panel-header">
                            <div className="tabs" style={{ flex: 1 }}>
                                <button className={`tab ${editorTab === 'editor' ? 'active' : ''}`} onClick={() => setEditorTab('editor')}>Form Editor</button>
                                <button className={`tab ${editorTab === 'preview' ? 'active' : ''}`} onClick={() => setEditorTab('preview')}>Preview</button>
                            </div>
                            <button className="btn btn-icon btn-ghost btn-sm" onClick={() => setSelectedBlock(null)}><X size={16} /></button>
                        </div>

                        {editorTab === 'editor' ? (
                            <div className="editor-form">
                                <div className="editor-block-type">
                                    <span className="flow-block-icon" style={{ fontSize: '1.25rem' }}>{getBlockType(selectedBlockData.type).icon}</span>
                                    <span style={{ fontWeight: 600 }}>{getBlockType(selectedBlockData.type).name}</span>
                                </div>

                                {/* AI Prompt */}
                                <div className="editor-field">
                                    <label>AI Prompt</label>
                                    <div className="ai-prompt-input">
                                        <textarea placeholder="Describe what you want AI to generate..." rows={2}></textarea>
                                        <button className="btn btn-primary btn-sm"><Sparkles size={14} /> Generate</button>
                                    </div>
                                </div>

                                {/* Dynamic fields based on block type */}
                                {selectedBlockData.content?.taskTitle && (
                                    <>
                                        <div className="editor-field"><label>Task Title</label><input defaultValue={selectedBlockData.content.taskTitle} /></div>
                                        <div className="editor-field"><label>Description</label><textarea defaultValue={selectedBlockData.content.description} rows={3}></textarea></div>
                                        <div className="editor-field">
                                            <label>Connect Your Product</label>
                                            <select defaultValue="figma"><option value="figma">Figma Prototype</option><option value="website">Live Website</option></select>
                                        </div>
                                    </>
                                )}
                                {selectedBlockData.content?.question && (
                                    <>
                                        <div className="editor-field"><label>Question</label><textarea defaultValue={selectedBlockData.content.question} rows={2}></textarea></div>
                                        {selectedBlockData.content?.notes !== undefined && (
                                            <div className="editor-field"><label>Notes / Description</label><textarea defaultValue={selectedBlockData.content.notes} rows={2} placeholder="Optional description..."></textarea></div>
                                        )}
                                    </>
                                )}
                                {selectedBlockData.content?.title && selectedBlockData.type === 'welcome' && (
                                    <>
                                        <div className="editor-field"><label>Title</label><input defaultValue={selectedBlockData.content.title} /></div>
                                        <div className="editor-field"><label>Description</label><textarea defaultValue={selectedBlockData.content.description} rows={3}></textarea></div>
                                        <div className="editor-field"><label>Language</label><select defaultValue="en"><option value="en">English</option><option value="id">Indonesian</option><option value="es">Spanish</option></select></div>
                                    </>
                                )}
                                {selectedBlockData.content?.scaleType && (
                                    <div className="editor-field">
                                        <label>Scale Type</label>
                                        <select defaultValue={selectedBlockData.content.scaleType}>
                                            <option value="numerical">Numerical</option><option value="stars">Stars</option><option value="emotion">Emotion</option>
                                        </select>
                                    </div>
                                )}
                                {selectedBlockData.content?.choices && (
                                    <div className="editor-field">
                                        <label>Choices</label>
                                        {selectedBlockData.content.choices.map((c, i) => (
                                            <input key={i} defaultValue={c} style={{ marginBottom: 8 }} />
                                        ))}
                                        <button className="btn btn-ghost btn-sm"><Plus size={14} /> Add Choice</button>
                                    </div>
                                )}

                                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 8 }}>
                                    <Wand2 size={16} /> Enhance with AI
                                </button>
                            </div>
                        ) : (
                            <div className="editor-preview">
                                <div className="preview-device">
                                    <div className="preview-content">

                                        {/* Block type badge */}
                                        <div className="preview-block-badge">
                                            <span style={{ fontSize: '1rem' }}>{getBlockType(selectedBlockData.type).icon}</span>
                                            <span>{getBlockType(selectedBlockData.type).name}</span>
                                        </div>

                                        {/* Title / question */}
                                        {(selectedBlockData.content?.title || selectedBlockData.content?.question || selectedBlockData.content?.taskTitle) && (
                                            <h3 className="preview-question">
                                                {selectedBlockData.content?.title || selectedBlockData.content?.question || selectedBlockData.content?.taskTitle}
                                            </h3>
                                        )}

                                        {/* Description / notes */}
                                        {(selectedBlockData.content?.description || selectedBlockData.content?.notes) && (
                                            <p className="preview-desc">
                                                {selectedBlockData.content?.description || selectedBlockData.content?.notes}
                                            </p>
                                        )}

                                        {/* Numerical scale */}
                                        {selectedBlockData.content?.scaleType === 'numerical' && (
                                            <div className="preview-scale">
                                                {Array.from({ length: (selectedBlockData.content.range?.[1] || 7) - (selectedBlockData.content.range?.[0] || 1) + 1 }, (_, i) => (
                                                    <div key={i} className="scale-num">{(selectedBlockData.content.range?.[0] || 1) + i}</div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Star scale */}
                                        {selectedBlockData.content?.scaleType === 'stars' && (
                                            <div className="preview-stars">
                                                {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: '1.75rem', cursor: 'pointer', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>⭐</span>)}
                                            </div>
                                        )}

                                        {/* Multiple choice */}
                                        {selectedBlockData.content?.choices && (
                                            <div className="preview-choices">
                                                {selectedBlockData.content.choices.map((c, i) => (
                                                    <label key={i} className="preview-choice">
                                                        <span className="preview-choice-radio" />
                                                        {c}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Yes / No */}
                                        {selectedBlockData.content?.visualType === 'icons' && (
                                            <div className="preview-yesno">
                                                <button className="preview-yesno-btn yes">✅ Yes</button>
                                                <button className="preview-yesno-btn no">❌ No</button>
                                            </div>
                                        )}

                                        {/* AI voice bar */}
                                        <div className="preview-voice-bar">
                                            <div className="preview-voice-avatar">
                                                <img src="/ai-moderator.png" alt="Alex" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} onError={e => { e.target.style.display = 'none'; e.target.parentElement.textContent = 'A'; }} />
                                            </div>
                                            <div className="preview-voice-info">
                                                <span className="preview-voice-name">Alex · AI Moderator</span>
                                                <div className="preview-voice-waves">
                                                    {Array.from({ length: 20 }, (_, i) => (
                                                        <div key={i} className="preview-wave-bar" style={{ animationDelay: `${(i * 0.08) % 0.8}s`, height: `${Math.sin(i * 0.6) * 8 + 12}px` }} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="preview-voice-mic">
                                                <div className="preview-mic-dot" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="editor-actions">
                            <button className="btn btn-ghost btn-sm"><Copy size={14} /> Duplicate</button>
                            <button className="btn btn-ghost btn-sm"><RefreshCw size={14} /> Change Type</button>
                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)' }}><Trash2 size={14} /> Delete</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Toolbar */}
            <div className="canvas-toolbar">
                <div className="toolbar-group">
                    <button className="btn btn-ghost btn-icon btn-sm"><MousePointer2 size={18} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm"><Hand size={18} /></button>
                </div>
                <div className="toolbar-divider"></div>
                <button className="btn btn-ghost btn-icon btn-sm"><MessageSquare size={18} /></button>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowAddBlock(-1)}><Plus size={18} /> Add Block</button>
                <div className="toolbar-divider"></div>
                <div className="toolbar-group">
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setZoom(Math.max(50, zoom - 10))}><ZoomOut size={18} /></button>
                    <span className="zoom-label">{zoom}%</span>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setZoom(Math.min(150, zoom + 10))}><ZoomIn size={18} /></button>
                </div>
            </div>

            {/* Add Block Modal */}
            {showAddBlock !== false && (
                <div className="modal-overlay" onClick={() => setShowAddBlock(false)}>
                    <div className="modal-content" style={{ maxWidth: 480, padding: 'var(--space-6)' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginBottom: 16 }}>Add Block</h3>
                        <div className="add-block-grid">
                            {blockTypes.filter(bt => bt.id !== 'welcome' && bt.id !== 'thank-you').map(bt => (
                                <button key={bt.id} className="add-block-option" onClick={() => setShowAddBlock(false)}>
                                    <span style={{ fontSize: '1.5rem' }}>{bt.icon}</span>
                                    <strong>{bt.name}</strong>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{bt.description}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Launch Modal */}
            {showLaunchModal && (
                <div className="modal-overlay" onClick={() => setShowLaunchModal(false)}>
                    <div className="modal-content" style={{ maxWidth: 500, padding: 'var(--space-6)' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h3>Study Control</h3>
                            <button className="btn btn-icon btn-ghost" onClick={() => setShowLaunchModal(false)}><X size={18} /></button>
                        </div>
                        <div className="launch-section">
                            <label style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: 8, display: 'block' }}>Participant Link</label>
                            <div className="link-copy-box">
                                <input value="https://study.userlenz.io/s/abc123xyz" readOnly />
                                <button className="btn btn-secondary btn-sm">Copy</button>
                            </div>
                        </div>
                        <div className="launch-section">
                            <label style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: 8, display: 'block' }}>Participant Limit</label>
                            <input type="number" defaultValue={20} style={{ width: 100 }} />
                        </div>
                        {isLive && (
                            <div className="launch-stats">
                                <div className="launch-stat"><span className="stat-num">8</span><span className="stat-label">Total</span></div>
                                <div className="launch-stat"><span className="stat-num">5</span><span className="stat-label">Completed</span></div>
                                <div className="launch-stat"><span className="stat-num">2</span><span className="stat-label">In Progress</span></div>
                                <div className="launch-stat"><span className="stat-num">1</span><span className="stat-label">Dropped</span></div>
                            </div>
                        )}
                        <button className={`btn ${isLive ? 'btn-danger' : 'btn-primary'} btn-lg`} style={{ width: '100%', marginTop: 16 }} onClick={() => setIsLive(!isLive)}>
                            {isLive ? '⏹ Stop Testing' : '▶ Start Testing'}
                        </button>
                    </div>
                </div>
            )}

            {/* Goals Modal */}
            {showGoalsModal && (
                <GoalsModal
                    onClose={handleGoalsModalClose}
                    onSelectGoal={() => { }}
                    basePath={basePath}
                    isMerged={isMerged}
                />
            )}

            <style>{`
        .canvas-page { display: flex; flex-direction: column; height: 100vh; background: var(--color-bg); }
        .canvas-topbar { display: flex; align-items: center; justify-content: space-between; padding: 0 var(--space-4); height: var(--topbar-height); background: var(--color-surface); border-bottom: 1px solid var(--color-border); flex-shrink: 0; gap: var(--space-4); }
        .canvas-topbar-left { display: flex; align-items: center; gap: var(--space-2); }
        .project-breadcrumb { font-size: 0.8125rem; color: var(--color-text-muted); }
        .study-name-editable { font-weight: 600; font-size: 0.9375rem; }
        .canvas-topbar-center { flex: 1; display: flex; justify-content: center; }
        .canvas-topbar-right { display: flex; align-items: center; gap: var(--space-3); }
        .credits-mini { display: flex; align-items: center; gap: 4px; font-size: 0.8125rem; color: var(--color-primary); font-weight: 600; padding: var(--space-1) var(--space-3); background: var(--color-primary-50); border-radius: var(--radius-full); }

        /* Goal Selector */
        .goal-selector-bar { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-4); background: var(--color-surface-hover); border-bottom: 1px solid var(--color-border); flex-shrink: 0; overflow-x: auto; position: relative; }
        .goal-selector-label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); white-space: nowrap; }
        .goal-tab { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-full); background: var(--color-surface); font-size: 0.75rem; font-weight: 500; color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast); white-space: nowrap; }
        .goal-tab:hover { border-color: var(--color-primary-200); color: var(--color-text); }
        .goal-tab.active { border-color: var(--color-primary); background: var(--color-primary-50); color: var(--color-primary-dark); font-weight: 600; }
        .goal-tab-icon { font-size: 0.875rem; }
        .btn-undo-merge { color: var(--color-text-secondary); }
        .btn-undo-merge:hover { background: var(--color-surface); color: var(--color-text); }

        /* Coach Mark */
        .coach-mark { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); z-index: 999; animation: coachFadeIn 0.4s ease; }
        .coach-mark-arrow { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid var(--color-primary); margin: 0 auto; }
        .coach-mark-bubble { background: var(--color-primary); color: white; padding: 14px 18px; border-radius: var(--radius-lg); width: 320px; box-shadow: 0 8px 32px rgba(34,197,94,0.3); position: relative; }
        .coach-mark-bubble strong { display: block; margin-bottom: 4px; font-size: 0.875rem; }
        .coach-mark-bubble p { font-size: 0.75rem; opacity: 0.9; line-height: 1.5; margin: 0; }
        .coach-mark-icon { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 8px; }
        .coach-mark-close { position: absolute; top: 8px; right: 8px; background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; padding: 2px; }
        .coach-mark-close:hover { color: white; }
        @keyframes coachFadeIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

        /* Blank canvas hint */
        .blank-canvas-hint { display: flex; align-items: center; justify-content: center; height: 100%; min-height: 400px; }

        .canvas-workspace { flex: 1; display: flex; overflow: hidden; position: relative; }
        .canvas-area { flex: 1; padding: var(--space-10); overflow: auto; display: flex; justify-content: center; transform-origin: center top; transition: transform var(--transition-base); }
        .flow-container { display: flex; flex-direction: column; align-items: center; gap: 0; padding: var(--space-8) 0; }
        
        .merged-banner { display: flex; gap: var(--space-3); width: 320px; background: var(--color-primary-50); border: 1px dashed var(--color-primary-200); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: var(--space-6); }
        .merged-banner-icon { color: var(--color-primary); flex-shrink: 0; }
        .merged-banner-content strong { display: block; font-size: 0.875rem; color: var(--color-primary-dark); margin-bottom: 2px; }
        .merged-banner-content p { font-size: 0.75rem; color: var(--color-primary); line-height: 1.4; margin: 0; }
        
        .flow-block { width: 320px; background: var(--color-surface); border: 2px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-5); cursor: pointer; transition: all var(--transition-fast); }
        .flow-block:hover { border-color: var(--color-primary-200); box-shadow: var(--shadow-md); }
        .flow-block.selected { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-100); }
        .flow-block-header { display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2); padding-left: var(--space-3); border-left: 3px solid; }
        .flow-block-icon { font-size: 1rem; }
        .flow-block-type { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
        .flow-block-title { font-weight: 600; font-size: 0.9375rem; margin-bottom: var(--space-1); }
        .flow-block-preview { font-size: 0.8125rem; color: var(--color-text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .flow-connector { display: flex; flex-direction: column; align-items: center; gap: 0; height: 48px; position: relative; }
        .connector-line { width: 2px; height: 14px; background: var(--color-border); }
        .add-block-btn { width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--color-border); background: var(--color-surface); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); cursor: pointer; transition: all var(--transition-fast); }
        .add-block-btn:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-50); }

        .editor-panel { width: 380px; background: var(--color-surface); border-left: 1px solid var(--color-border); display: flex; flex-direction: column; overflow-y: auto; animation: slideInRight 0.2s ease; }
        .editor-panel-header { display: flex; align-items: center; padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); gap: var(--space-2); }
        .editor-form { padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); flex: 1; overflow-y: auto; }
        .editor-block-type { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: var(--color-surface-hover); border-radius: var(--radius-md); }
        .editor-field label { display: block; font-size: 0.8125rem; font-weight: 600; color: var(--color-text-secondary); margin-bottom: var(--space-2); }
        .editor-field input, .editor-field textarea, .editor-field select { width: 100%; font-size: 0.875rem; }
        .ai-prompt-input { display: flex; flex-direction: column; gap: var(--space-2); background: var(--color-primary-50); border: 1px solid var(--color-primary-100); border-radius: var(--radius-md); padding: var(--space-3); }
        .ai-prompt-input textarea { border: none; background: transparent; font-size: 0.8125rem; resize: none; }
        .ai-prompt-input textarea:focus { box-shadow: none; }
        .ai-prompt-input .btn { align-self: flex-end; }
        .editor-actions { padding: var(--space-4); border-top: 1px solid var(--color-border); display: flex; gap: var(--space-2); flex-wrap: wrap; }

        .editor-preview { padding: var(--space-5); flex: 1; }
        .preview-device { background: #f8fafc; border-radius: 18px; padding: 24px 20px; min-height: 300px; border: 1px solid #e8ecf0; }
        .preview-content { display: flex; flex-direction: column; gap: 14px; }
        .preview-block-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #7c3aed; background: #f5f3ff; padding: 4px 10px; border-radius: 100px; border: 1px solid #ddd6fe; width: fit-content; }
        .preview-question { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.35; text-align: left; }
        .preview-desc { font-size: 0.875rem; color: #64748b; margin: 0; line-height: 1.6; text-align: left; }
        .preview-scale { display: flex; justify-content: center; gap: 6px; }
        .scale-num { width: 34px; height: 34px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.15s; }
        .scale-num:hover { background: #eff6ff; border-color: #93c5fd; color: #1d4ed8; }
        .preview-stars { display: flex; justify-content: center; gap: 4px; }
        .preview-choices { display: flex; flex-direction: column; gap: 8px; }
        .preview-choice { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; cursor: pointer; font-size: 0.875rem; color: #334155; background: white; transition: all 0.15s; }
        .preview-choice:hover { border-color: #a5b4fc; background: #eef2ff; }
        .preview-choice-radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #cbd5e1; background: white; flex-shrink: 0; }
        .preview-yesno { display: flex; gap: 12px; justify-content: center; }
        .preview-yesno-btn { flex: 1; padding: 12px 16px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .preview-yesno-btn.yes:hover { background: #f0fdf4; border-color: #86efac; }
        .preview-yesno-btn.no:hover { background: #fff1f2; border-color: #fca5a5; }

        /* AI Voice bar */
        .preview-voice-bar { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 10px 14px; margin-top: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .preview-voice-avatar { width: 36px; height: 36px; border-radius: 50%; overflow: hidden; background: #e2e8f0; flex-shrink: 0; border: 2px solid #22c55e; font-weight: 700; font-size: 0.875rem; color: #16a34a; display: flex; align-items: center; justify-content: center; }
        .preview-voice-info { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .preview-voice-name { font-size: 0.75rem; font-weight: 600; color: #475569; }
        .preview-voice-waves { display: flex; align-items: center; gap: 2px; height: 20px; }
        .preview-wave-bar { width: 3px; border-radius: 2px; background: #22c55e; animation: prevWave 1s ease-in-out infinite; }
        @keyframes prevWave { 0%,100%{transform:scaleY(0.35); opacity:0.6;} 50%{transform:scaleY(1); opacity:1;} }
        .preview-voice-mic { width: 28px; height: 28px; border-radius: 50%; background: #f0fdf4; display: flex; align-items: center; justify-content: center; border: 1px solid #bbf7d0; flex-shrink: 0; }
        .preview-mic-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: micBlink 1.5s ease-in-out infinite; }
        @keyframes micBlink { 0%,100%{transform:scale(1); opacity:1;} 50%{transform:scale(0.7); opacity:0.5;} }

        .canvas-toolbar { display: flex; align-items: center; justify-content: center; gap: var(--space-3); padding: var(--space-3); background: var(--color-surface); border-top: 1px solid var(--color-border); flex-shrink: 0; }
        .toolbar-group { display: flex; align-items: center; gap: var(--space-1); }
        .toolbar-divider { width: 1px; height: 24px; background: var(--color-border); }
        .zoom-label { font-size: 0.8125rem; font-weight: 500; color: var(--color-text-secondary); min-width: 40px; text-align: center; }

        .add-block-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
        .add-block-option { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); padding: var(--space-5) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); cursor: pointer; transition: all var(--transition-fast); background: var(--color-surface); text-align: center; }
        .add-block-option:hover { border-color: var(--color-primary-200); background: var(--color-primary-50); }
        .add-block-option strong { font-size: 0.875rem; }

        .launch-section { margin-bottom: var(--space-5); }
        .link-copy-box { display: flex; gap: var(--space-2); }
        .link-copy-box input { flex: 1; font-size: 0.8125rem; background: var(--color-surface-hover); }
        .launch-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); margin-top: var(--space-5); }
        .launch-stat { text-align: center; padding: var(--space-4); background: var(--color-surface-hover); border-radius: var(--radius-md); }
        .stat-num { display: block; font-size: 1.5rem; font-weight: 700; color: var(--color-text); }
        .stat-label { font-size: 0.75rem; color: var(--color-text-muted); }
      `}</style>
        </div>
    )
}
