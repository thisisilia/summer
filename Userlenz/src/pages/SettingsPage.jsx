import { useState } from 'react'
import { User, Bell, Shield, Palette, CreditCard, Trash2, CheckCircle, Download, ExternalLink } from 'lucide-react'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'preferences', label: 'Preferences', icon: Palette },
    ]

    return (
        <div className="settings-page">
            <div className="page-header">
                <h1>Settings</h1>
                <p>Manage your account and preferences</p>
            </div>

            <div className="settings-layout">
                <nav className="settings-nav">
                    {tabs.map(t => (
                        <button key={t.id} className={`settings-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                            <t.icon size={18} /> {t.label}
                        </button>
                    ))}
                </nav>

                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="card settings-card">
                            <h3>Profile Information</h3>
                            <div className="profile-avatar-section">
                                <div className="avatar avatar-lg">J</div>
                                <button className="btn btn-secondary btn-sm">Change Photo</button>
                            </div>
                            <div className="settings-form">
                                <div className="form-row">
                                    <div className="form-group"><label>First Name</label><input defaultValue="John" /></div>
                                    <div className="form-group"><label>Last Name</label><input defaultValue="Designer" /></div>
                                </div>
                                <div className="form-group"><label>Email</label><input type="email" defaultValue="john@company.com" /></div>
                                <div className="form-group"><label>Company</label><input defaultValue="Design Studio Inc." /></div>
                                <div className="form-group"><label>Role</label><select defaultValue="designer"><option value="designer">UX Designer</option><option value="researcher">UX Researcher</option><option value="pm">Product Manager</option></select></div>
                                <button className="btn btn-primary">Save Changes</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="card settings-card">
                            <h3>Notification Preferences</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginTop: -16, marginBottom: 24 }}>
                                Control how and when you receive system and collaboration updates. Changes take effect immediately.
                            </p>

                            {/* Email Notifications */}
                            <div className="notif-section">
                                <div className="notif-section-header">
                                    <span className="notif-section-icon">📧</span>
                                    <h4>Email Notifications</h4>
                                </div>
                                <div className="toggle-list">
                                    {[
                                        { label: 'Marketing emails', desc: 'Product news, feature announcements, and tips', default: false },
                                        { label: 'AI credits running low', desc: 'Get notified via email when your AI credits are below 10%', default: true },
                                        { label: 'Plan expiration reminders', desc: 'Receive email reminders before your plan expires', default: true },
                                    ].map((item, i) => (
                                        <div key={`email-${i}`} className="toggle-item">
                                            <div><strong>{item.label}</strong><p>{item.desc}</p></div>
                                            <div className={`toggle ${item.default ? 'active' : ''}`} onClick={e => e.currentTarget.classList.toggle('active')}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* In-App Notifications */}
                            <div className="notif-section">
                                <div className="notif-section-header">
                                    <span className="notif-section-icon">🔔</span>
                                    <h4>In-App Notifications</h4>
                                </div>
                                <div className="toggle-list">
                                    {[
                                        { label: 'AI credits running low', desc: 'Show in-app alert when AI credits drop below threshold', default: true },
                                        { label: 'Plan expiration reminders', desc: 'Display a banner when your plan is about to expire', default: true },
                                        { label: 'Study updates', desc: 'Get notified when participants reach the goal, study completes, or new results are available', default: true },
                                    ].map((item, i) => (
                                        <div key={`inapp-${i}`} className="toggle-item">
                                            <div><strong>{item.label}</strong><p>{item.desc}</p></div>
                                            <div className={`toggle ${item.default ? 'active' : ''}`} onClick={e => e.currentTarget.classList.toggle('active')}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mute All */}
                            <div className="notif-section" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 20, marginTop: 8 }}>
                                <div className="toggle-item" style={{ borderBottom: 'none' }}>
                                    <div>
                                        <strong style={{ color: 'var(--color-danger)' }}>Mute all notifications</strong>
                                        <p>Temporarily disable all email and in-app notifications</p>
                                    </div>
                                    <div className="toggle" onClick={e => e.currentTarget.classList.toggle('active')}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="card settings-card">
                            <h3>Security</h3>
                            <div className="settings-form">
                                <div className="form-group"><label>Current Password</label><input type="password" placeholder="••••••••" /></div>
                                <div className="form-group"><label>New Password</label><input type="password" placeholder="••••••••" /></div>
                                <div className="form-group"><label>Confirm Password</label><input type="password" placeholder="••••••••" /></div>
                                <button className="btn btn-primary">Update Password</button>
                            </div>
                            <div className="danger-zone">
                                <h4><Trash2 size={16} /> Danger Zone</h4>
                                <p>Permanently delete your account and all associated data.</p>
                                <button className="btn btn-danger btn-sm">Delete Account</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="card settings-card">
                            <h3>Preferences</h3>
                            <div className="toggle-list">
                                <div className="toggle-item">
                                    <div><strong>Language</strong><p>Display language</p></div>
                                    <select defaultValue="en" style={{ width: 160 }}><option value="en">English</option><option value="id">Indonesian</option><option value="es">Spanish</option></select>
                                </div>
                                <div className="toggle-item">
                                    <div><strong>Timezone</strong><p>Your local timezone</p></div>
                                    <select defaultValue="utc7" style={{ width: 200 }}><option value="utc7">Asia/Jakarta (UTC+7)</option><option value="utc0">UTC</option><option value="utc-8">US Pacific</option></select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="settings-card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {/* Current Plan */}
                            <div className="card" style={{ padding: 'var(--space-6)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                    <div>
                                        <h3 style={{ margin: 0 }}>Current Plan</h3>
                                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', marginTop: 4 }}>Manage your subscription and billing</p>
                                    </div>
                                    <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '4px 12px' }}>Pro</span>
                                </div>
                                <div className="billing-plan-grid">
                                    <div className="billing-stat">
                                        <span className="billing-stat-label">Plan</span>
                                        <span className="billing-stat-value">Pro — $49/mo</span>
                                    </div>
                                    <div className="billing-stat">
                                        <span className="billing-stat-label">Billing Cycle</span>
                                        <span className="billing-stat-value">Monthly</span>
                                    </div>
                                    <div className="billing-stat">
                                        <span className="billing-stat-label">Next Renewal</span>
                                        <span className="billing-stat-value">Apr 5, 2026</span>
                                    </div>
                                    <div className="billing-stat">
                                        <span className="billing-stat-label">AI Gen Credits</span>
                                        <span className="billing-stat-value">340 / 500 remaining</span>
                                    </div>
                                    <div className="billing-stat">
                                        <span className="billing-stat-label">Voice Credits</span>
                                        <span className="billing-stat-value">120 / 200 remaining</span>
                                    </div>
                                    <div className="billing-stat">
                                        <span className="billing-stat-label">Status</span>
                                        <span className="billing-stat-value" style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={14} /> Active</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                                    <button className="btn btn-primary">Upgrade Plan</button>
                                    <button className="btn btn-secondary">Change to Annual (Save 20%)</button>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="card" style={{ padding: 'var(--space-6)' }}>
                                <h3>Payment Method</h3>
                                <div className="payment-card-row">
                                    <div className="payment-card-info">
                                        <div className="payment-card-icon">
                                            <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="3" fill="var(--color-surface-active)" /><circle cx="12" cy="10" r="6" fill="#EB001B" opacity="0.8" /><circle cx="20" cy="10" r="6" fill="#F79E1B" opacity="0.8" /></svg>
                                        </div>
                                        <div>
                                            <strong>Mastercard ending in 4242</strong>
                                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>Expires 12/2027</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary btn-sm">Update</button>
                                </div>
                            </div>

                            {/* Billing History */}
                            <div className="card" style={{ padding: 'var(--space-6)' }}>
                                <h3>Billing History</h3>
                                <div className="billing-table">
                                    <div className="billing-table-header">
                                        <span>Date</span>
                                        <span>Description</span>
                                        <span>Amount</span>
                                        <span>Status</span>
                                        <span></span>
                                    </div>
                                    {[
                                        { date: 'Mar 5, 2026', desc: 'Pro Plan — Monthly', amount: '$49.00', status: 'Paid' },
                                        { date: 'Feb 5, 2026', desc: 'Pro Plan — Monthly', amount: '$49.00', status: 'Paid' },
                                        { date: 'Jan 5, 2026', desc: 'Pro Plan — Monthly', amount: '$49.00', status: 'Paid' },
                                        { date: 'Dec 5, 2025', desc: 'Pro Plan — Monthly', amount: '$49.00', status: 'Paid' },
                                    ].map((inv, i) => (
                                        <div key={i} className="billing-table-row">
                                            <span>{inv.date}</span>
                                            <span>{inv.desc}</span>
                                            <span style={{ fontWeight: 600 }}>{inv.amount}</span>
                                            <span><span className="badge badge-success">{inv.status}</span></span>
                                            <span><button className="btn btn-ghost btn-sm" style={{ gap: 4 }}><Download size={13} /> PDF</button></span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cancel */}
                            <div className="card" style={{ padding: 'var(--space-6)', borderColor: 'var(--color-danger)', borderStyle: 'dashed' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong style={{ color: 'var(--color-danger)' }}>Cancel Subscription</strong>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginTop: 2 }}>Your plan will remain active until the end of the current billing cycle.</p>
                                    </div>
                                    <button className="btn btn-danger btn-sm">Cancel Plan</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .settings-page { padding: var(--space-8) var(--space-10); max-width: 1100px; margin: 0 auto; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: var(--space-1); }
        .page-header p { color: var(--color-text-secondary); }
        .page-header { margin-bottom: var(--space-8); }
        .settings-layout { display: flex; gap: var(--space-8); }
        .settings-nav { display: flex; flex-direction: column; gap: var(--space-1); min-width: 200px; }
        .settings-tab { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 500; color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition-fast); border: none; background: none; text-align: left; }
        .settings-tab:hover { background: var(--color-surface-hover); color: var(--color-text); }
        .settings-tab.active { background: var(--color-primary-50); color: var(--color-primary); }
        .settings-content { flex: 1; }
        .settings-card { padding: var(--space-6) var(--space-8); }
        .settings-card h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: var(--space-6); }
        .profile-avatar-section { display: flex; align-items: center; gap: var(--space-5); margin-bottom: var(--space-6); }
        .settings-form { display: flex; flex-direction: column; gap: var(--space-5); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        .form-group { display: flex; flex-direction: column; gap: var(--space-2); }
        .form-group label { font-size: 0.8125rem; font-weight: 600; color: var(--color-text-secondary); }
        .toggle-list { display: flex; flex-direction: column; gap: var(--space-1); }
        .toggle-item { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) 0; border-bottom: 1px solid var(--color-border-light); }
        .toggle-item strong { display: block; font-size: 0.9375rem; margin-bottom: 2px; }
        .toggle-item p { font-size: 0.8125rem; color: var(--color-text-muted); }
        .danger-zone { margin-top: var(--space-8); padding-top: var(--space-6); border-top: 1px solid var(--color-border); }
        .danger-zone h4 { display: flex; align-items: center; gap: var(--space-2); font-size: 1rem; color: var(--color-danger); margin-bottom: var(--space-2); }
        .danger-zone p { font-size: 0.8125rem; color: var(--color-text-secondary); margin-bottom: var(--space-4); }
        .notif-section { margin-bottom: var(--space-6); }
        .notif-section-header { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3); }
        .notif-section-header h4 { font-size: 0.9375rem; font-weight: 700; color: var(--color-text); }
        .notif-section-icon { font-size: 1.125rem; }
        .billing-plan-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .billing-stat { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; background: var(--color-surface-hover); border-radius: var(--radius-md); }
        .billing-stat-label { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-muted); }
        .billing-stat-value { font-size: 0.875rem; font-weight: 600; color: var(--color-text); }
        .payment-card-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: var(--color-surface-hover); border-radius: var(--radius-md); }
        .payment-card-info { display: flex; align-items: center; gap: 12px; }
        .payment-card-icon { display: flex; align-items: center; }
        .billing-table { display: flex; flex-direction: column; }
        .billing-table-header, .billing-table-row { display: grid; grid-template-columns: 120px 1fr 90px 80px 70px; align-items: center; padding: 10px 0; gap: 8px; }
        .billing-table-header { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-muted); border-bottom: 1px solid var(--color-border); }
        .billing-table-row { font-size: 0.8125rem; border-bottom: 1px solid var(--color-border-light); color: var(--color-text-secondary); }
        .billing-table-row:last-child { border-bottom: none; }
      `}</style>
        </div>
    )
}
