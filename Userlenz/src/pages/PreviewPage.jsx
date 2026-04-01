import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
    ArrowLeft, Mic, MicOff, SkipForward,
    Loader2, CheckCircle2, Volume2, ScrollText, X
} from 'lucide-react'
import { sampleStudyBlocks } from '../data/mockData'

const BLOCK_ICON = {
    welcome: '👋', task: '🖱️', 'opinion-scale': '⭐',
    'multiple-choice': '☑️', 'open-question': '💬', 'yes-no': '✅', 'thank-you': '🎉',
}

const getAiScript = (block) => {
    if (!block) return ''
    const c = block.content
    switch (block.type) {
        case 'welcome': return `Hi there! ${c.description || "Welcome to this study. I'm Alex, your moderator. Just speak naturally — your mic is always on and I'll be listening."}`
        case 'task': return `Your next task: ${c.description || c.taskTitle}. Please think out loud as you go — I'm listening.`
        case 'opinion-scale': return `Based on what you just saw, ${c.question}`
        case 'multiple-choice': return `Next question: ${c.question}`
        case 'open-question': return `${c.question}`
        case 'yes-no': return `Quick yes or no: ${c.question}`
        case 'thank-you': return `${c.description || "That's everything — thank you so much. Your input is truly valuable!"}`
        default: return `Let's move on.`
    }
}

const CHECK_IN_PROBES = [
    "Take your time — there's no rush.",
    "Is the task clear, or would you like me to repeat it?",
    "Feel free to think out loud — whatever comes to mind.",
    "Is anything feeling unclear or tricky right now?",
    "Just share what you're thinking, even if you're uncertain.",
]

const getFakeUserResponse = (block) => {
    if (!block) return ''
    switch (block.type) {
        case 'welcome': return "Yeah, I'm ready! Let's go."
        case 'task': return "Okay, I can see the interface. The layout looks pretty clear. I'll start by tapping the main nav here."
        case 'opinion-scale': return "I'd say a 4 out of 5 — it was mostly smooth but the checkout felt a bit buried."
        case 'multiple-choice': return "I think the first option makes the most sense."
        case 'open-question': return "Honestly, the checkout button could stand out more — I almost missed it."
        case 'yes-no': return "Yes, definitely."
        case 'thank-you': return "You're welcome! Happy to help."
        default: return "Looks good to me."
    }
}

const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function PreviewPage() {
    const navigate = useNavigate()

    const [currentBlock, setCurrentBlock] = useState(0)
    const [phase, setPhase] = useState('ai-speaking')
    const [liveText, setLiveText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const [checkInText, setCheckInText] = useState('')
    const [isMuted, setIsMuted] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [showLiveChat, setShowLiveChat] = useState(true)
    const [showTranscriptLog, setShowTranscriptLog] = useState(false)
    const [elapsed, setElapsed] = useState(0)

    const timerRef = useRef(null)
    const pauseRef = useRef(false)
    const logEndRef = useRef(null)
    const genRef = useRef(0)

    const block = sampleStudyBlocks[currentBlock]
    const blockRef = useRef(block)
    useEffect(() => { blockRef.current = sampleStudyBlocks[currentBlock] }, [currentBlock])

    // Session timer
    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (!pauseRef.current) setElapsed(e => e + 1)
        }, 1000)
        return () => clearInterval(timerRef.current)
    }, [])
    useEffect(() => { pauseRef.current = isPaused }, [isPaused])

    // Scroll transcript log to bottom
    useEffect(() => {
        if (showTranscriptLog) logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory, showTranscriptLog])

    // ── Phase Engine (ref-based, single mount, no cancellation races) ──────
    const runEngine = useCallback((phaseName, blockIdx) => {
        const gen = ++genRef.current
        const blk = sampleStudyBlocks[blockIdx]

        const delay = (ms, fn) => {
            setTimeout(() => { if (genRef.current === gen && !pauseRef.current) fn() }, ms)
        }

        const typeText = (text, speed, setter, onDone) => {
            let i = 0
            const tick = () => {
                if (genRef.current !== gen) return
                if (pauseRef.current) { setTimeout(tick, 200); return }
                if (i < text.length) {
                    setter(prev => prev + text.charAt(i++)); setTimeout(tick, speed)
                } else { onDone() }
            }
            setter('')
            setIsTyping(true)
            setTimeout(tick, 10)
        }

        const goListening = () => {
            setPhase('listening')
            setCheckInText('')
            delay(800, () => {
                const probe = CHECK_IN_PROBES[Math.floor(Math.random() * CHECK_IN_PROBES.length)]
                setPhase('checking-in')
                setCheckInText('')
                typeText(probe, 18, setCheckInText, () => {
                    setIsTyping(false)
                    setChatHistory(prev => [...prev, {
                        id: Date.now() + Math.random(), role: 'ai', text: probe, isProbe: true,
                        blockIndex: blockIdx, blockTitle: blk?.title || '', blockType: blk?.type || ''
                    }])
                    setCheckInText('')
                    delay(800, goUserSpeaking)
                })
            })
        }

        const goUserSpeaking = () => {
            const userText = getFakeUserResponse(blk)
            setPhase('user-speaking')
            setLiveText('')
            typeText(userText, 12, setLiveText, () => {
                setIsTyping(false)
                setChatHistory(prev => [...prev, {
                    id: Date.now() + Math.random(), role: 'user', text: userText,
                    blockIndex: blockIdx, blockTitle: blk?.title || '', blockType: blk?.type || ''
                }])
                delay(200, () => {
                    setPhase('processing')
                    delay(350, () => {
                        setLiveText('')
                        const next = blockIdx + 1
                        if (next < sampleStudyBlocks.length) {
                            setCurrentBlock(next)
                            setPhase('ai-speaking')
                            runEngine('ai-speaking', next)
                        } else {
                            setPhase('done')
                            clearInterval(timerRef.current)
                        }
                    })
                })
            })
        }

        if (phaseName === 'ai-speaking') {
            const aiText = getAiScript(blk)
            setPhase('ai-speaking')
            setLiveText('')
            typeText(aiText, 18, setLiveText, () => {
                setIsTyping(false)
                setChatHistory(prev => [...prev, {
                    id: Date.now() + Math.random(), role: 'ai', text: aiText,
                    blockIndex: blockIdx, blockTitle: blk?.title || '', blockType: blk?.type || ''
                }])
                delay(200, () => {
                    if (blk?.type === 'thank-you') { setPhase('done'); clearInterval(timerRef.current) }
                    else goListening()
                })
            })
        }
    }, [])

    // Start engine on mount
    useEffect(() => { runEngine('ai-speaking', 0) }, [])

    // ── Skip ──────────────────────────────────────────────────────────────
    const handleSkip = () => {
        if (!['listening', 'checking-in'].includes(phase)) return
        const blockIdx = currentBlock
        setChatHistory(prev => [...prev, {
            id: Date.now() + Math.random(), role: 'user', text: 'Skipped this block.',
            isSkip: true, blockIndex: blockIdx, blockTitle: blockRef.current?.title || '',
            blockType: blockRef.current?.type || ''
        }])
        genRef.current++
        setPhase('processing')
        const next = blockIdx + 1
        setTimeout(() => {
            setLiveText('')
            if (next < sampleStudyBlocks.length) {
                setCurrentBlock(next)
                setPhase('ai-speaking')
                runEngine('ai-speaking', next)
            } else { setPhase('done') }
        }, 350)
    }

    // ── Block content renderer ────────────────────────────────────────────
    const renderBlockContent = () => {
        if (!block) return null
        const c = block.content
        if (block.type === 'welcome' || block.type === 'thank-you') {
            return (
                <div className="pvlt-welcome">
                    <div className="pvlt-welcome-emoji">{BLOCK_ICON[block.type]}</div>
                    <h1 className="pvlt-welcome-title">{c.title || (block.type === 'thank-you' ? 'Thank You!' : 'Welcome')}</h1>
                    <p className="pvlt-welcome-desc">{c.description || ''}</p>
                    {phase === 'done' && <button className="pvlt-finish-btn" onClick={() => navigate(-1)}>← Return to Canvas</button>}
                </div>
            )
        }
        if (block.type === 'task') {
            return (
                <div className="pvlt-task-card">
                    <div className="pvlt-task-badge">Task</div>
                    <h2 className="pvlt-task-title">{c.taskTitle || c.title}</h2>
                    {c.description && <p className="pvlt-task-desc">{c.description}</p>}
                    <div className="pvlt-task-prototype">
                        <div className="pvlt-proto-bar">
                            <div className="pvlt-dots"><span /><span /><span /></div>
                            <div className="pvlt-url">{c.product === 'Figma Prototype' ? 'figma.com/proto/' : 'yoursite.com'}</div>
                        </div>
                        <div className="pvlt-proto-body">
                            <span className="pvlt-proto-label">{c.product} — Prototype</span>
                            <p className="pvlt-proto-hint">Prototype renders here in a live session</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="pvlt-question-card">
                <div className="pvlt-q-type">{block.type.replace('-', ' ')}</div>
                <h2 className="pvlt-q-text">{c.question}</h2>
                {c.notes && <p className="pvlt-q-note">{c.notes}</p>}
                <div className="pvlt-q-hint"><Volume2 size={14} /> Answer verbally — Alex is listening</div>
            </div>
        )
    }

    // Group transcript by block
    const groupedByBlock = chatHistory.reduce((acc, msg) => {
        const key = msg.blockIndex ?? 0
        if (!acc[key]) acc[key] = { blockIndex: key, blockTitle: msg.blockTitle, messages: [] }
        acc[key].messages.push(msg)
        return acc
    }, {})

    return (
        <div className="pvlt-page">

            {/* ── Top Bar ── */}
            <header className="pvlt-topbar">
                <button className="pvlt-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back to Canvas
                </button>
                <div className="pvlt-top-center">
                    <div className="pvlt-live-badge"><span className="pvlt-live-dot" />Live Preview</div>
                    <div className="pvlt-timer">{formatTime(elapsed)}</div>
                    <div className="pvlt-block-label">Block {currentBlock + 1} / {sampleStudyBlocks.length}</div>
                </div>
                <div style={{ width: 160 }} />
            </header>

            {/* ── Body ── */}
            <div className="pvlt-body">

                {/* Block progress sidebar */}
                <aside className="pvlt-block-sidebar">
                    {sampleStudyBlocks.map((b, idx) => {
                        const isDone = idx < currentBlock || phase === 'done'
                        const isActive = idx === currentBlock && phase !== 'done'
                        return (
                            <div key={b.id} className={`pvlt-block-dot ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`} title={b.title}>
                                {isDone ? <CheckCircle2 size={16} /> : <span className="pvlt-dot-icon">{BLOCK_ICON[b.type] || '●'}</span>}
                                {isActive && <div className="pvlt-dot-active-bar" />}
                            </div>
                        )
                    })}
                </aside>

                {/* Center stage — task/question is the star */}
                <main className="pvlt-center">

                    {/* Phase status pill */}
                    <div className={`pvlt-ai-status ${phase}`}>
                        {phase === 'ai-speaking' && <><div className="pvlt-soundbars"><span /><span /><span /><span /></div>Alex is speaking…</>}
                        {phase === 'listening' && <><div className="pvlt-listen-dot" />Listening — speak your answer</>}
                        {phase === 'checking-in' && <><div className="pvlt-soundbars probe"><span /><span /><span /><span /></div>Alex is checking in…</>}
                        {phase === 'user-speaking' && <><div className="pvlt-rec-dot" />Recording your response</>}
                        {phase === 'processing' && <><Loader2 size={14} className="spin" />Analyzing…</>}
                        {phase === 'done' && <><CheckCircle2 size={14} />Session complete</>}
                    </div>

                    {/* Task / Question card — the immersive center */}
                    <div className="pvlt-content-card">{renderBlockContent()}</div>

                    {/* Alex PiP tile — bottom-right, Google Meet style */}
                    <div className={`pvlt-pip-tile ${phase === 'ai-speaking' || phase === 'checking-in' ? 'speaking' : ''} ${phase === 'listening' ? 'listening' : ''}`}>
                        {(phase === 'ai-speaking' || phase === 'checking-in') && <div className="pvlt-pip-ring" />}
                        <img src="/ai-moderator.png" alt="Alex" className="pvlt-pip-photo" />
                        {phase === 'listening' && <div className="pvlt-pip-mic-badge"><Mic size={10} /></div>}
                        <div className="pvlt-pip-nameplate">
                            Alex<span className="pvlt-pip-role"> · AI Moderator</span>
                        </div>
                    </div>

                    {/* Live captions bar — below PiP, Google Meet style */}
                    {showLiveChat && (
                        <div className="pvlt-captions-bar">
                            {phase === 'checking-in' && checkInText && (
                                <span className="pvlt-caption-text">{checkInText}<span className="pvlt-chat-cursor" /></span>
                            )}
                            {(phase === 'ai-speaking' || phase === 'user-speaking') && liveText && (
                                <span className="pvlt-caption-text">
                                    <span className="pvlt-caption-who">{phase === 'ai-speaking' ? 'Alex: ' : 'You: '}</span>
                                    {liveText}{isTyping && <span className="pvlt-chat-cursor" />}
                                </span>
                            )}
                            {phase === 'listening' && (
                                <span className="pvlt-caption-text pvlt-caption-idle">
                                    <div className="pvlt-listen-dot" />
                                    Listening for your response…
                                </span>
                            )}
                        </div>
                    )}

                </main>
            </div>

            {/* ── Transcript Log Drawer ── */}
            <div className={`pvlt-log-drawer ${showTranscriptLog ? 'open' : ''}`}>
                <div className="pvlt-log-header">
                    <div className="pvlt-log-title"><ScrollText size={16} /> Transcript Log</div>
                    <button className="pvlt-log-close" onClick={() => setShowTranscriptLog(false)}><X size={18} /></button>
                </div>
                <div className="pvlt-log-body">
                    {Object.values(groupedByBlock).length === 0 ? (
                        <div className="pvlt-log-empty">
                            <ScrollText size={28} opacity={0.3} />
                            <p>No transcript yet — session in progress.</p>
                        </div>
                    ) : (
                        Object.values(groupedByBlock).map((group) => (
                            <div key={group.blockIndex} className="pvlt-log-group">
                                <div className="pvlt-log-block-header">
                                    <span className="pvlt-log-block-icon">{BLOCK_ICON[sampleStudyBlocks[group.blockIndex]?.type] || '•'}</span>
                                    <div className="pvlt-log-block-meta">
                                        <div className="pvlt-log-block-num">Block {group.blockIndex + 1}</div>
                                        <div className="pvlt-log-block-name">{group.blockTitle || sampleStudyBlocks[group.blockIndex]?.title}</div>
                                    </div>
                                    {group.blockIndex < currentBlock && <div className="pvlt-log-block-done"><CheckCircle2 size={14} /></div>}
                                </div>
                                <div className="pvlt-log-messages">
                                    {group.messages.map(msg => (
                                        <div key={msg.id} className={`pvlt-log-msg ${msg.role} ${msg.isSkip ? 'skip' : ''} ${msg.isProbe ? 'probe' : ''}`}>
                                            <div className="pvlt-log-msg-who">{msg.role === 'ai' ? 'Alex' : 'You'}</div>
                                            <div className="pvlt-log-msg-text">{msg.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={logEndRef} />
                </div>
            </div>

            {/* ── Google Meet-style Bottom Controls ── */}
            <footer className="pvlt-controls">
                <div className="pvlt-controls-inner">

                    {/* Mic */}
                    <div className="pvlt-ctrl-wrap">
                        <button
                            className={`pvlt-ctrl-btn mic ${isMuted ? 'off' : 'on'} ${!isMuted && (phase === 'listening' || phase === 'user-speaking') ? 'active' : ''}`}
                            onClick={() => setIsMuted(m => !m)}
                            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                        >
                            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                        </button>
                        <span className="pvlt-ctrl-label">{isMuted ? 'Unmute' : 'Mute'}</span>
                    </div>

                    {/* CC — live captions toggle */}
                    <div className="pvlt-ctrl-wrap">
                        <button
                            className={`pvlt-ctrl-btn cc ${showLiveChat ? 'on' : 'off'}`}
                            onClick={() => setShowLiveChat(v => !v)}
                            title={showLiveChat ? 'Hide captions' : 'Show captions'}
                        >
                            <span className="pvlt-cc-label">CC</span>
                        </button>
                        <span className="pvlt-ctrl-label">{showLiveChat ? 'Captions' : 'CC Off'}</span>
                    </div>

                    {/* Skip / Finish — contextual */}
                    <div className="pvlt-ctrl-wrap" style={{ minWidth: 64 }}>
                        {(phase === 'listening' || phase === 'checking-in') && !['welcome', 'thank-you'].includes(block?.type) && (
                            <>
                                <button className="pvlt-ctrl-btn skip" onClick={handleSkip} title="Skip this block">
                                    <SkipForward size={22} />
                                </button>
                                <span className="pvlt-ctrl-label">Skip</span>
                            </>
                        )}
                        {phase === 'done' && (
                            <>
                                <button className="pvlt-ctrl-btn finish" onClick={() => navigate(-1)}>
                                    <CheckCircle2 size={22} />
                                </button>
                                <span className="pvlt-ctrl-label">Finish</span>
                            </>
                        )}
                    </div>

                    {/* Block progress dots */}
                    <div className="pvlt-progress-dots">
                        {sampleStudyBlocks.map((_, idx) => (
                            <div
                                key={idx}
                                className={`pvlt-pd ${idx < currentBlock || phase === 'done' ? 'done' : ''} ${idx === currentBlock && phase !== 'done' ? 'active' : ''}`}
                            />
                        ))}
                    </div>

                    {/* Transcript log */}
                    <div className="pvlt-ctrl-wrap">
                        <button
                            className={`pvlt-ctrl-btn log ${showTranscriptLog ? 'on' : ''}`}
                            onClick={() => setShowTranscriptLog(v => !v)}
                            title="View transcript log"
                        >
                            <ScrollText size={20} />
                        </button>
                        <span className="pvlt-ctrl-label">Log {chatHistory.length > 0 ? `(${chatHistory.length})` : ''}</span>
                    </div>

                    {/* End call — red */}
                    <div className="pvlt-ctrl-wrap">
                        <button className="pvlt-ctrl-btn end" onClick={() => navigate(-1)} title="End session">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                            </svg>
                        </button>
                        <span className="pvlt-ctrl-label">End</span>
                    </div>

                </div>
            </footer>

            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            .pvlt-page { height:100vh; display:flex; flex-direction:column; background:#f0f2f5; font-family:'Inter',sans-serif; overflow:hidden; color:#1e293b; }

            /* Top bar */
            .pvlt-topbar { display:flex; align-items:center; justify-content:space-between; padding:0 20px; height:52px; background:white; border-bottom:1px solid #e2e8f0; flex-shrink:0; box-shadow:0 1px 4px rgba(0,0,0,0.05); }
            .pvlt-back-btn { display:flex; align-items:center; gap:7px; padding:7px 14px; border-radius:8px; border:1px solid #e2e8f0; background:white; font-size:0.875rem; font-weight:600; color:#475569; cursor:pointer; transition:all 0.18s; }
            .pvlt-back-btn:hover { background:#f1f5f9; }
            .pvlt-top-center { display:flex; align-items:center; gap:12px; }
            .pvlt-live-badge { display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:#16a34a; background:#f0fdf4; padding:5px 12px; border-radius:100px; border:1px solid #86efac; }
            .pvlt-live-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:livePls 2s infinite; flex-shrink:0; }
            @keyframes livePls { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
            .pvlt-timer { font-size:0.875rem; font-weight:600; color:#64748b; font-variant-numeric:tabular-nums; }
            .pvlt-block-label { font-size:0.8125rem; color:#94a3b8; font-weight:500; }

            /* Body */
            .pvlt-body { flex:1; display:flex; overflow:hidden; }

            /* Block sidebar */
            .pvlt-block-sidebar { width:52px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; padding:14px 0; gap:4px; background:white; border-right:1px solid #e2e8f0; overflow-y:auto; }
            .pvlt-block-dot { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; position:relative; color:#cbd5e1; font-size:0.95rem; transition:all 0.22s; border:2px solid transparent; }
            .pvlt-block-dot.active { background:#f0fdf4; border-color:#22c55e; color:#16a34a; }
            .pvlt-block-dot.done { color:#22c55e; }
            .pvlt-dot-active-bar { position:absolute; right:-11px; width:3px; height:18px; background:#22c55e; border-radius:4px; }
            .pvlt-dot-icon { font-size:0.95rem; line-height:1; }

            /* Center */
            .pvlt-center { flex:1; display:flex; flex-direction:column; padding:24px 32px 20px; gap:16px; overflow:hidden; position:relative; min-width:0; }

            /* Phase status */
            .pvlt-ai-status { display:inline-flex; align-items:center; gap:8px; font-size:0.875rem; font-weight:500; color:#64748b; background:white; padding:8px 18px; border-radius:100px; border:1px solid #e2e8f0; width:fit-content; box-shadow:0 1px 3px rgba(0,0,0,0.06); flex-shrink:0; }
            .pvlt-ai-status.ai-speaking { color:#16a34a; border-color:#86efac; background:#f0fdf4; }
            .pvlt-ai-status.listening { color:#2563eb; border-color:#bfdbfe; background:#eff6ff; }
            .pvlt-ai-status.checking-in { color:#d97706; border-color:#fde68a; background:#fffbeb; }
            .pvlt-ai-status.user-speaking { color:#dc2626; border-color:#fca5a5; background:#fff1f2; }
            .pvlt-ai-status.processing { color:#7c3aed; border-color:#ddd6fe; background:#f5f3ff; }
            .pvlt-ai-status.done { color:#16a34a; border-color:#86efac; background:#f0fdf4; }
            .pvlt-soundbars { display:flex; align-items:flex-end; gap:2px; height:14px; }
            .pvlt-soundbars span { width:3px; background:#22c55e; border-radius:2px; animation:sBar 1s ease-in-out infinite; }
            .pvlt-soundbars.probe span { background:#d97706; }
            .pvlt-soundbars span:nth-child(1){height:5px;animation-delay:0s;}
            .pvlt-soundbars span:nth-child(2){height:12px;animation-delay:0.15s;}
            .pvlt-soundbars span:nth-child(3){height:8px;animation-delay:0.3s;}
            .pvlt-soundbars span:nth-child(4){height:4px;animation-delay:0.45s;}
            @keyframes sBar{0%,100%{transform:scaleY(0.4);}50%{transform:scaleY(1);}}
            .pvlt-listen-dot{width:8px;height:8px;border-radius:50%;background:#2563eb;animation:livePls 1.5s infinite;flex-shrink:0;}
            .pvlt-rec-dot{width:8px;height:8px;border-radius:50%;background:#dc2626;animation:livePls 1s infinite;}
            .spin{animation:spin 1.2s linear infinite;}
            @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

            /* Content card */
            .pvlt-content-card { background:white; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 4px 28px rgba(0,0,0,0.07); padding:40px 44px; flex-shrink:0; max-width:720px; width:100%; animation:cardIn 0.4s cubic-bezier(0.2,0.8,0.2,1); }
            @keyframes cardIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
            .pvlt-welcome{display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;}
            .pvlt-welcome-emoji{font-size:3.5rem;}
            .pvlt-welcome-title{font-size:1.875rem;font-weight:700;color:#0f172a;margin:0;}
            .pvlt-welcome-desc{font-size:1rem;color:#64748b;line-height:1.65;margin:0;max-width:480px;}
            .pvlt-finish-btn{margin-top:20px;padding:13px 28px;background:#16a34a;color:white;border:none;border-radius:10px;font-size:1rem;font-weight:600;cursor:pointer;transition:background 0.2s;}
            .pvlt-finish-btn:hover{background:#15803d;}
            .pvlt-task-card{display:flex;flex-direction:column;gap:16px;}
            .pvlt-task-badge{font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#0ea5e9;background:#f0f9ff;padding:4px 10px;border-radius:6px;border:1px solid #bae6fd;width:fit-content;}
            .pvlt-task-title{font-size:1.5rem;font-weight:700;color:#0f172a;margin:0;line-height:1.3;}
            .pvlt-task-desc{font-size:1rem;color:#64748b;margin:0;line-height:1.6;}
            .pvlt-task-prototype{border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;}
            .pvlt-proto-bar{display:flex;align-items:center;gap:10px;padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}
            .pvlt-dots{display:flex;gap:4px;}.pvlt-dots span{width:8px;height:8px;border-radius:50%;background:#cbd5e1;}
            .pvlt-url{font-size:0.75rem;color:#94a3b8;background:white;padding:4px 12px;border-radius:100px;border:1px solid #e2e8f0;}
            .pvlt-proto-body{padding:24px;display:flex;flex-direction:column;align-items:center;gap:6px;min-height:80px;justify-content:center;}
            .pvlt-proto-label{font-size:0.9rem;font-weight:600;color:#475569;}
            .pvlt-proto-hint{font-size:0.8125rem;color:#94a3b8;margin:0;}
            .pvlt-question-card{display:flex;flex-direction:column;gap:16px;}
            .pvlt-q-type{font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#7c3aed;background:#f5f3ff;padding:4px 10px;border-radius:6px;border:1px solid #ddd6fe;width:fit-content;}
            .pvlt-q-text{font-size:1.5rem;font-weight:700;color:#0f172a;margin:0;line-height:1.35;}
            .pvlt-q-note{font-size:0.9rem;color:#64748b;font-style:italic;margin:0;}
            .pvlt-q-hint{display:flex;align-items:center;gap:7px;font-size:0.875rem;color:#94a3b8;border-top:1px solid #f1f5f9;padding-top:16px;margin-top:4px;}

            /* Alex PiP tile */
            .pvlt-pip-tile { position:absolute; bottom:88px; right:24px; width:180px; border-radius:16px; overflow:hidden; background:#1e293b; box-shadow:0 8px 32px rgba(0,0,0,0.18); border:3px solid white; transition:border-color 0.3s, box-shadow 0.3s; }
            .pvlt-pip-tile.speaking { border-color:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,0.3), 0 8px 32px rgba(0,0,0,0.18); }
            .pvlt-pip-tile.listening { border-color:#bfdbfe; }
            .pvlt-pip-ring { position:absolute; inset:0; border-radius:13px; border:3px solid #22c55e; animation:pipRing 1.5s ease-in-out infinite; z-index:3; pointer-events:none; }
            @keyframes pipRing{0%,100%{opacity:0.2;}50%{opacity:0.85;}}
            .pvlt-pip-photo { width:100%; height:130px; object-fit:cover; object-position:top center; display:block; }
            .pvlt-pip-mic-badge { position:absolute; top:8px; right:8px; z-index:3; background:#2563eb; color:white; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; border:2px solid white; }
            .pvlt-pip-nameplate { padding:7px 10px; background:rgba(15,23,42,0.85); color:white; font-size:0.75rem; font-weight:600; display:flex; align-items:center; gap:4px; backdrop-filter:blur(8px); }
            .pvlt-pip-role { font-weight:400; color:rgba(255,255,255,0.6); }

            /* Live captions bar */
            .pvlt-captions-bar { position:absolute; bottom:16px; left:0; right:220px; background:rgba(255,255,255,0.96); border:1px solid #e2e8f0; border-radius:12px; padding:10px 16px; font-size:0.9rem; color:#334155; min-height:42px; display:flex; align-items:center; box-shadow:0 2px 12px rgba(0,0,0,0.07); backdrop-filter:blur(8px); }
            .pvlt-caption-text { display:flex; align-items:center; gap:8px; line-height:1.4; }
            .pvlt-caption-who { font-weight:700; color:#16a34a; flex-shrink:0; }
            .pvlt-caption-idle { color:#94a3b8; gap:10px; }
            .pvlt-chat-cursor { display:inline-block; width:2px; height:0.9em; background:#94a3b8; vertical-align:text-bottom; margin-left:1px; animation:blink 1s step-end infinite; }
            @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

            /* Transcript drawer */
            .pvlt-log-drawer { position:fixed; right:0; top:0; bottom:0; width:380px; background:white; border-left:1px solid #e2e8f0; box-shadow:-8px 0 32px rgba(0,0,0,0.08); z-index:100; transform:translateX(100%); transition:transform 0.35s cubic-bezier(0.2,0.8,0.2,1); display:flex; flex-direction:column; }
            .pvlt-log-drawer.open { transform:translateX(0); }
            .pvlt-log-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #e2e8f0; flex-shrink:0; }
            .pvlt-log-title { display:flex; align-items:center; gap:8px; font-size:1rem; font-weight:700; color:#0f172a; }
            .pvlt-log-close { background:none; border:none; cursor:pointer; color:#94a3b8; padding:4px; border-radius:6px; display:flex; transition:all 0.2s; }
            .pvlt-log-close:hover { background:#f1f5f9; color:#475569; }
            .pvlt-log-body { flex:1; overflow-y:auto; padding:16px; background:#f8fafc; display:flex; flex-direction:column; gap:16px; }
            .pvlt-log-body::-webkit-scrollbar{width:4px;}.pvlt-log-body::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px;}
            .pvlt-log-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:#94a3b8; gap:10px; text-align:center; }
            .pvlt-log-empty p { font-size:0.875rem; margin:0; }
            .pvlt-log-group { display:flex; flex-direction:column; gap:8px; }
            .pvlt-log-block-header { display:flex; align-items:center; gap:10px; padding:10px 14px; background:white; border-radius:10px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
            .pvlt-log-block-icon { font-size:1.25rem; flex-shrink:0; }
            .pvlt-log-block-meta { flex:1; min-width:0; }
            .pvlt-log-block-num { font-size:0.6875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#94a3b8; }
            .pvlt-log-block-name { font-size:0.875rem; font-weight:600; color:#1e293b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
            .pvlt-log-block-done { color:#22c55e; }
            .pvlt-log-messages { display:flex; flex-direction:column; gap:6px; padding-left:8px; border-left:2px solid #e2e8f0; margin-left:6px; }
            .pvlt-log-msg { display:flex; flex-direction:column; gap:3px; padding:8px 12px; background:white; border-radius:8px; border:1px solid #f1f5f9; }
            .pvlt-log-msg.ai { border-left:3px solid #22c55e; }
            .pvlt-log-msg.user { border-left:3px solid #2563eb; }
            .pvlt-log-msg.probe { border-left:3px solid #f59e0b; background:#fffbeb; }
            .pvlt-log-msg.skip { opacity:0.55; font-style:italic; }
            .pvlt-log-msg-who { font-size:0.6875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; }
            .pvlt-log-msg.ai .pvlt-log-msg-who { color:#16a34a; }
            .pvlt-log-msg.user .pvlt-log-msg-who { color:#2563eb; }
            .pvlt-log-msg.probe .pvlt-log-msg-who { color:#d97706; }
            .pvlt-log-msg-text { font-size:0.875rem; color:#334155; line-height:1.5; }

            /* Google Meet bottom controls */
            .pvlt-controls { flex-shrink:0; background:white; border-top:1px solid #e8ecf0; padding:10px 28px; box-shadow:0 -2px 12px rgba(0,0,0,0.05); z-index:10; }
            .pvlt-controls-inner { display:flex; align-items:center; justify-content:center; gap:8px; }
            .pvlt-ctrl-wrap { display:flex; flex-direction:column; align-items:center; gap:4px; min-width:56px; }
            .pvlt-ctrl-label { font-size:0.6875rem; font-weight:500; color:#94a3b8; white-space:nowrap; }
            .pvlt-ctrl-btn { width:52px; height:52px; border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.18s; }
            .pvlt-ctrl-btn.mic.on { background:#e8f5e9; color:#1a7d35; }
            .pvlt-ctrl-btn.mic.on:hover { background:#d4edda; }
            .pvlt-ctrl-btn.mic.on.active { background:#1a7d35; color:white; animation:micPulse 2s infinite; }
            @keyframes micPulse{0%,100%{box-shadow:0 0 0 0 rgba(26,125,53,0.25);}50%{box-shadow:0 0 0 8px rgba(26,125,53,0);}}
            .pvlt-ctrl-btn.mic.off { background:#fee2e2; color:#dc2626; }
            .pvlt-ctrl-btn.mic.off:hover { background:#fecaca; }
            .pvlt-ctrl-btn.cc.on { background:#e8f0fe; color:#1a73e8; }
            .pvlt-ctrl-btn.cc.on:hover { background:#d2e3fc; }
            .pvlt-ctrl-btn.cc.off { background:#f1f5f9; color:#94a3b8; }
            .pvlt-ctrl-btn.cc.off:hover { background:#e2e8f0; color:#475569; }
            .pvlt-cc-label { font-size:0.8125rem; font-weight:800; letter-spacing:0.04em; }
            .pvlt-ctrl-btn.skip { background:#f1f5f9; color:#64748b; }
            .pvlt-ctrl-btn.skip:hover { background:#e2e8f0; color:#1e293b; }
            .pvlt-ctrl-btn.finish { background:#16a34a; color:white; }
            .pvlt-ctrl-btn.finish:hover { background:#15803d; }
            .pvlt-ctrl-btn.log { background:#f1f5f9; color:#64748b; }
            .pvlt-ctrl-btn.log:hover { background:#e2e8f0; }
            .pvlt-ctrl-btn.log.on { background:#e8f0fe; color:#1a73e8; }
            .pvlt-ctrl-btn.end { background:#ea4335; color:white; width:56px; height:56px; box-shadow:0 2px 8px rgba(234,67,53,0.3); }
            .pvlt-ctrl-btn.end:hover { background:#d33828; box-shadow:0 4px 14px rgba(234,67,53,0.4); transform:scale(1.05); }
            .pvlt-progress-dots { display:flex; align-items:center; gap:5px; padding:0 16px; }
            .pvlt-pd { width:6px; height:6px; border-radius:50%; background:#e2e8f0; transition:all 0.25s; }
            .pvlt-pd.active { background:#1a73e8; width:18px; border-radius:4px; }
            .pvlt-pd.done { background:#34a853; }
            `}</style>
        </div>
    )
}
