import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SidebarProvider } from './layouts/SidebarContext'
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import TemplateLibraryPage from './pages/TemplateLibraryPage'
import GoalsModal from './pages/GoalsPage'
import CanvasPage from './pages/CanvasPage'
import PreviewPage from './pages/PreviewPage'
import ResultsPage from './pages/ResultsPage'
import ReportPage from './pages/ReportPage'
import CreditsPage from './pages/CreditsPage'
import SettingsPage from './pages/SettingsPage'
import HelpPage from './pages/HelpPage'

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectsPage />} />
            <Route path="/templates" element={<TemplateLibraryPage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>
          {/* Full-screen pages (no sidebar) */}
          <Route path="/projects/:projectId/studies/:studyId/goals" element={<CanvasPage />} />
          <Route path="/projects/:projectId/studies/:studyId/goals/:goalId/canvas" element={<CanvasPage />} />
          <Route path="/projects/:projectId/studies/:studyId/goals/:goalId/results" element={<ResultsPage />} />
          <Route path="/projects/:projectId/studies/:studyId/goals/:goalId/report" element={<ReportPage />} />
          {/* Legacy routes without goalId (redirect to first goal) */}
          <Route path="/projects/:projectId/studies/:studyId/canvas" element={<CanvasPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/projects/:projectId/studies/:studyId/results" element={<ResultsPage />} />
          <Route path="/projects/:projectId/studies/:studyId/report" element={<ReportPage />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  )
}
