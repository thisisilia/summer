import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSidebar } from './SidebarContext'

export default function AppLayout() {
  const location = useLocation()
  const { collapsed } = useSidebar()
  const hideSidebar = ['/login', '/preview'].some(p => location.pathname.startsWith(p)) ||
    location.pathname.includes('/canvas') ||
    location.pathname.includes('/results') ||
    location.pathname.includes('/report')

  return (
    <div className="app-layout">
      <Sidebar />
      <main className={`main-content ${hideSidebar ? 'full-width' : collapsed ? 'sidebar-collapsed' : ''}`}>
        <Outlet />
      </main>
      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }
        .main-content {
          flex: 1;
          margin-left: var(--sidebar-width);
          min-height: 100vh;
          transition: margin-left var(--transition-base);
        }
        .main-content.sidebar-collapsed {
          margin-left: var(--sidebar-collapsed);
        }
        .main-content.full-width {
          margin-left: 0;
        }
      `}</style>
    </div>
  )
}
