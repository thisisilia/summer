import { NavLink, useLocation } from 'react-router-dom'
import { Home, FolderOpen, LayoutGrid, CreditCard, Settings, HelpCircle, Sparkles, Mic, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from './SidebarContext'

const navItems = [
  { path: '/', icon: Home, label: 'Overview' },
  { path: '/projects', icon: FolderOpen, label: 'Projects' },
  { path: '/templates', icon: LayoutGrid, label: 'Templates' },
  { path: '/credits', icon: CreditCard, label: 'Credits & Plan' },
]

const bottomItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/help', icon: HelpCircle, label: 'Help & Support' },
]

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar()
  const location = useLocation()

  const hiddenPaths = ['/login', '/preview']
  if (hiddenPaths.some(p => location.pathname.startsWith(p)) || location.pathname.includes('/canvas') || location.pathname.includes('/results') || location.pathname.includes('/report')) return null

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#22C55E" />
            <path d="M8 14C8 10.6863 10.6863 8 14 8C17.3137 8 20 10.6863 20 14V20H14C10.6863 20 8 17.3137 8 14Z" fill="white" fillOpacity="0.95" />
            <circle cx="14" cy="14" r="3" fill="#22C55E" />
          </svg>
        </div>
        {!collapsed && <span className="logo-text">Userlenz</span>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Main Nav */}
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <item.icon size={17} strokeWidth={1.8} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Credits Widget */}
      {!collapsed && (
        <NavLink to="/credits" className="credits-widget">
          <div className="credits-widget-header">
            <span className="credits-label">AI Credits</span>
          </div>
          <div className="credit-row">
            <Sparkles size={13} />
            <span>AI Gen</span>
            <span className="credit-val">160</span>
          </div>
          <div className="progress-bar" style={{ height: 3 }}>
            <div className="progress-fill" style={{ width: '32%' }}></div>
          </div>
          <div className="credit-row">
            <Mic size={13} />
            <span>Voice</span>
            <span className="credit-val">80</span>
          </div>
          <div className="progress-bar" style={{ height: 3 }}>
            <div className="progress-fill" style={{ width: '40%' }}></div>
          </div>
        </NavLink>
      )}

      {/* Bottom Nav */}
      <nav className="sidebar-nav sidebar-bottom">
        {bottomItems.map(item => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <item.icon size={17} strokeWidth={1.8} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
        <div className="nav-item profile-item">
          <div className="avatar avatar-sm">J</div>
          {!collapsed && <span>John D.</span>}
        </div>
      </nav>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--color-sidebar);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          transition: width var(--transition-base);
          overflow: hidden;
        }
        .sidebar.collapsed {
          width: var(--sidebar-collapsed);
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-4);
          min-height: 56px;
          position: relative;
        }
        .logo-icon { flex-shrink: 0; }
        .logo-text {
          font-weight: 800;
          font-size: 1rem;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .collapse-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 22px;
          border-radius: var(--radius-sm);
          background: var(--color-surface-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          cursor: pointer;
          opacity: 0;
          transition: opacity var(--transition-fast), background var(--transition-fast);
        }
        .sidebar:hover .collapse-btn { opacity: 1; }
        .collapse-btn:hover { background: var(--color-surface-active); }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1px;
          padding: var(--space-2) var(--space-2);
          flex: 1;
        }
        .sidebar-bottom {
          flex: 0;
          border-top: 1px solid var(--color-border);
          padding-top: var(--space-2);
          margin-top: auto;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: 7px var(--space-3);
          border-radius: var(--radius-sm);
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 0.8125rem;
          transition: all var(--transition-fast);
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-item:hover {
          background: var(--color-surface-hover);
          color: var(--color-text);
        }
        .nav-item.active {
          background: var(--color-primary-50);
          color: var(--color-primary-dark);
        }
        .nav-item.active svg {
          color: var(--color-primary);
        }
        .profile-item {
          margin-top: var(--space-1);
        }
        .credits-widget {
          margin: var(--space-1) var(--space-2);
          padding: var(--space-3);
          background: var(--color-surface-hover);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-decoration: none;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }
        .credits-widget:hover {
          background: var(--color-surface-active);
        }
        .credits-widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .credits-label {
          font-weight: 700;
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
        }
        .credit-row {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.6875rem;
        }
        .credit-val {
          margin-left: auto;
          font-weight: 700;
          color: var(--color-primary-dark);
        }
      `}</style>
    </aside>
  )
}
