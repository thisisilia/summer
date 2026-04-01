import { creditsData } from '../data/mockData'
import { Sparkles, Mic, Check, Zap } from 'lucide-react'

export default function CreditsPage() {
    const d = creditsData

    return (
        <div className="credits-page">
            <div className="page-header">
                <div>
                    <h1>Credits & Plan</h1>
                    <p>Manage your subscription and AI credits</p>
                </div>
            </div>

            {/* Current Usage */}
            <div className="usage-cards">
                <div className="card usage-card">
                    <div className="usage-header">
                        <Sparkles size={20} style={{ color: 'var(--color-primary)' }} />
                        <span className="usage-title">AI Generation Credits</span>
                    </div>
                    <div className="usage-bar-section">
                        <div className="usage-numbers">
                            <span className="usage-used">{d.aiGenCredits.used}</span>
                            <span className="usage-total">/ {d.aiGenCredits.total}</span>
                        </div>
                        <div className="progress-bar" style={{ height: 8 }}>
                            <div className="progress-fill" style={{ width: `${(d.aiGenCredits.used / d.aiGenCredits.total) * 100}%` }}></div>
                        </div>
                        <span className="usage-remaining">{d.aiGenCredits.total - d.aiGenCredits.used} credits remaining</span>
                    </div>
                </div>
                <div className="card usage-card">
                    <div className="usage-header">
                        <Mic size={20} style={{ color: 'var(--color-secondary)' }} />
                        <span className="usage-title">AI Voice Credits</span>
                    </div>
                    <div className="usage-bar-section">
                        <div className="usage-numbers">
                            <span className="usage-used">{d.aiVoiceCredits.used}</span>
                            <span className="usage-total">/ {d.aiVoiceCredits.total}</span>
                        </div>
                        <div className="progress-bar" style={{ height: 8 }}>
                            <div className="progress-fill" style={{ width: `${(d.aiVoiceCredits.used / d.aiVoiceCredits.total) * 100}%`, background: 'linear-gradient(90deg, var(--color-secondary), #c084fc)' }}></div>
                        </div>
                        <span className="usage-remaining">{d.aiVoiceCredits.total - d.aiVoiceCredits.used} credits remaining</span>
                    </div>
                </div>
            </div>

            {/* Plans */}
            <section className="plans-section">
                <h2>Choose Your Plan</h2>
                <div className="plans-grid">
                    {d.plans.map(plan => (
                        <div key={plan.name} className={`card plan-card ${plan.current ? 'current-plan' : ''}`}>
                            {plan.current && <span className="current-badge">Current Plan</span>}
                            <h3>{plan.name}</h3>
                            <div className="plan-price">{plan.price}</div>
                            <div className="plan-credits">
                                <div className="plan-credit-row"><Sparkles size={14} /> <strong>{plan.aiGen}</strong> AI Gen Credits</div>
                                <div className="plan-credit-row"><Mic size={14} /> <strong>{plan.aiVoice}</strong> AI Voice Credits</div>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((f, i) => (
                                    <li key={i}><Check size={14} /> {f}</li>
                                ))}
                            </ul>
                            <button className={`btn ${plan.current ? 'btn-secondary' : 'btn-primary'} btn-lg`} style={{ width: '100%' }}>
                                {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ textAlign: 'center', padding: 'var(--space-6) 0', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                Next renewal: {d.renewalDate} • <a href="#" style={{ color: 'var(--color-primary)' }}>Cancel subscription</a>
            </div>

            <style>{`
        .credits-page { padding: var(--space-8) var(--space-10); max-width: 1100px; margin: 0 auto; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: var(--space-1); }
        .page-header p { color: var(--color-text-secondary); }
        .page-header { margin-bottom: var(--space-8); }
        .usage-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-5); margin-bottom: var(--space-10); }
        .usage-card { padding: var(--space-6); }
        .usage-header { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-5); }
        .usage-title { font-weight: 600; font-size: 1rem; }
        .usage-bar-section { display: flex; flex-direction: column; gap: var(--space-3); }
        .usage-numbers { display: flex; align-items: baseline; gap: var(--space-1); }
        .usage-used { font-size: 2rem; font-weight: 800; }
        .usage-total { font-size: 1rem; color: var(--color-text-muted); }
        .usage-remaining { font-size: 0.8125rem; color: var(--color-text-secondary); }
        .plans-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--space-6); text-align: center; }
        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); }
        .plan-card { padding: var(--space-6) var(--space-6) var(--space-8); position: relative; display: flex; flex-direction: column; }
        .current-plan { border-color: var(--color-primary); box-shadow: 0 0 0 1px var(--color-primary); }
        .current-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--color-primary); color: #fff; padding: 2px var(--space-4); border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; }
        .plan-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: var(--space-2); }
        .plan-price { font-size: 2rem; font-weight: 800; margin-bottom: var(--space-5); color: var(--color-primary); }
        .plan-credits { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-5); padding-bottom: var(--space-5); border-bottom: 1px solid var(--color-border-light); }
        .plan-credit-row { display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; color: var(--color-text-secondary); }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-6); flex: 1; }
        .plan-features li { display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; color: var(--color-text-secondary); }
        .plan-features li svg { color: var(--color-success); flex-shrink: 0; }
      `}</style>
        </div>
    )
}
