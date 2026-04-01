import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">
            <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#22C55E" />
              <path d="M8 14C8 10.6863 10.6863 8 14 8C17.3137 8 20 10.6863 20 14V20H14C10.6863 20 8 17.3137 8 14Z" fill="white" fillOpacity="0.95" />
              <circle cx="14" cy="14" r="3" fill="#22C55E" />
            </svg>
            <span>Userlenz</span>
          </div>
          <h1>AI-Powered User Research</h1>
          <p>Design better products with AI-assisted usability testing, moderated research, and automated insights.</p>
        </div>
        <div className="login-features">
          {[
            { icon: '🎯', title: 'AI Study Builder', desc: 'Create research studies in minutes with AI guidance' },
            { icon: '🤖', title: 'AI Moderation', desc: 'Voice-guided participant experience without live moderators' },
            { icon: '📊', title: 'Smart Analysis', desc: 'Automated insights and actionable recommendations' },
          ].map((f, i) => (
            <div className="login-feature" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="feature-icon">{f.icon}</span>
              <div>
                <strong>{f.title}</strong>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrapper">
          <h2>{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
          <p className="login-subtitle">{isSignUp ? 'Start your free trial today' : 'Sign in to continue to Userlenz'}</p>

          <button className="btn-google" onClick={handleSubmit}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            Continue with Google
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Designer" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="input-group">
              <label>Email</label>
              <div className="input-with-icon">
                <Mail size={16} />
                <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={16} />
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" className="pass-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {!isSignUp && (
              <div className="forgot-row">
                <a href="#">Forgot password?</a>
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }}>
              {isSignUp ? 'Create Account' : 'Sign In'}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="switch-mode">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Sign In' : 'Sign Up'}</button>
          </p>
        </div>
      </div>

      <style>{`
        .login-page {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg);
        }
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-16);
          background: linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 40%, #A7F3D0 100%);
          position: relative;
          overflow: hidden;
        }
        .login-left::before {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(34,197,94,0.08);
          top: -100px;
          right: -100px;
        }
        .login-left::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(20,184,166,0.06);
          bottom: -50px;
          left: -50px;
        }
        .login-brand {
          position: relative;
          z-index: 1;
          margin-bottom: var(--space-12);
        }
        .login-logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-8);
        }
        .login-logo span {
          font-size: 1.5rem;
          font-weight: 800;
          color: #065F46;
        }
        .login-brand h1 {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.2;
          color: #064E3B;
          margin-bottom: var(--space-4);
        }
        .login-brand p {
          font-size: 1.0625rem;
          color: #047857;
          max-width: 420px;
          line-height: 1.7;
        }
        .login-features {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          position: relative;
          z-index: 1;
        }
        .login-feature {
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
          padding: var(--space-4) var(--space-5);
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.8);
          animation: slideInRight 0.5s ease both;
        }
        .feature-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .login-feature strong {
          display: block;
          margin-bottom: 2px;
          font-size: 0.875rem;
          color: #064E3B;
        }
        .login-feature p {
          font-size: 0.8125rem;
          color: #047857;
          line-height: 1.5;
        }
        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-8);
          background: var(--color-surface);
        }
        .login-form-wrapper {
          width: 100%;
          max-width: 380px;
        }
        .login-form-wrapper h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--space-2);
          color: var(--color-text);
        }
        .login-subtitle {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-8);
          font-size: 0.875rem;
        }
        .btn-google {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          width: 100%;
          padding: var(--space-3) var(--space-5);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          font-weight: 600;
          transition: all var(--transition-fast);
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--color-text);
        }
        .btn-google:hover {
          background: var(--color-surface-hover);
          border-color: var(--color-primary-200);
        }
        .divider {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin: var(--space-5) 0;
          color: var(--color-text-muted);
          font-size: 0.75rem;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--color-border);
        }
        .input-group {
          margin-bottom: var(--space-4);
        }
        .input-group label {
          display: block;
          font-weight: 600;
          font-size: 0.8125rem;
          margin-bottom: var(--space-2);
          color: var(--color-text);
        }
        .input-group input {
          width: 100%;
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-with-icon svg:first-child {
          position: absolute;
          left: 12px;
          color: var(--color-text-muted);
          pointer-events: none;
        }
        .input-with-icon input {
          padding-left: 38px;
        }
        .pass-toggle {
          position: absolute;
          right: 12px;
          color: var(--color-text-muted);
          cursor: pointer;
          background: none;
          border: none;
          display: flex;
        }
        .forgot-row {
          text-align: right;
          margin-bottom: var(--space-3);
        }
        .forgot-row a {
          font-size: 0.8125rem;
          color: var(--color-primary-dark);
          font-weight: 500;
        }
        .switch-mode {
          text-align: center;
          margin-top: var(--space-6);
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
        }
        .switch-mode button {
          color: var(--color-primary-dark);
          font-weight: 700;
          margin-left: var(--space-2);
          cursor: pointer;
          background: none;
          border: none;
          font-size: inherit;
        }
        @media (max-width: 768px) {
          .login-left { display: none; }
        }
      `}</style>
    </div>
  )
}
