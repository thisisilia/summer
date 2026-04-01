import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Search, MoreHorizontal, FolderOpen, ArrowLeft, Clock, FileText, Users, ChevronRight, Play, Pause, Eye } from 'lucide-react'
import { projects } from '../data/mockData'

export default function ProjectsPage() {
    const { projectId } = useParams()
    const [tab, setTab] = useState('active')
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const selectedProject = projectId ? projects.find(p => p.id === projectId) : null

    // --- Project Detail View ---
    if (selectedProject) {
        return (
            <div className="projects-page">
                <div className="page-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/projects')}>
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <h1>{selectedProject.name}</h1>
                            <p>{selectedProject.studyCount} studies · Last updated {selectedProject.updated}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate(`/projects/${projectId}/studies/s1/canvas`)}>
                        <Plus size={18} /> New Study
                    </button>
                </div>

                <div className="studies-grid">
                    {selectedProject.studies.map(s => (
                        <div key={s.id} className="card study-card" onClick={() => navigate(`/projects/${projectId}/studies/${s.id}/canvas`)}>
                            <div className="study-card-header">
                                <span className={`badge ${s.status === 'completed' ? 'badge-success' : s.status === 'live' ? 'badge-info' : s.status === 'paused' ? 'badge-warning' : 'badge-primary'}`}>
                                    {s.status === 'live' && <Play size={10} />}
                                    {s.status === 'paused' && <Pause size={10} />}
                                    {s.status}
                                </span>
                                <span className="study-integration">{s.integration}</span>
                            </div>
                            <h3>{s.name}</h3>
                            <div className="study-card-meta">
                                <span><Users size={14} /> {s.participants} participants</span>
                                <span><Clock size={14} /> {s.updated}</span>
                            </div>
                            <div className="study-card-actions">
                                {s.status === 'completed' && (
                                    <>
                                        <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); navigate(`/projects/${projectId}/studies/${s.id}/results`) }}>
                                            <Eye size={14} /> Results
                                        </button>
                                        <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); navigate(`/projects/${projectId}/studies/${s.id}/report`) }}>
                                            <FileText size={14} /> Report
                                        </button>
                                    </>
                                )}
                                <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); navigate(`/projects/${projectId}/studies/${s.id}/canvas`) }}>
                                    Open <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <style>{`
                    .projects-page { padding: var(--space-8) var(--space-10); max-width: 1200px; margin: 0 auto; }
                    .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-8); }
                    .page-header h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: var(--space-1); }
                    .page-header p { color: var(--color-text-secondary); font-size: 0.875rem; }
                    .studies-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5); }
                    .study-card { cursor: pointer; padding: var(--space-6); transition: all var(--transition-fast); }
                    .study-card:hover { border-color: var(--color-primary-200); box-shadow: var(--shadow-md); }
                    .study-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3); }
                    .study-card-header .badge { display: inline-flex; align-items: center; gap: 4px; }
                    .study-integration { font-size: 0.75rem; color: var(--color-text-muted); }
                    .study-card h3 { font-size: 1.0625rem; font-weight: 600; margin-bottom: var(--space-3); }
                    .study-card-meta { display: flex; gap: var(--space-5); margin-bottom: var(--space-5); font-size: 0.8125rem; color: var(--color-text-secondary); }
                    .study-card-meta span { display: flex; align-items: center; gap: var(--space-1); }
                    .study-card-actions { display: flex; gap: var(--space-2); padding-top: var(--space-4); border-top: 1px solid var(--color-border-light); }
                `}</style>
            </div>
        )
    }

    // --- Project List View ---
    const filtered = projects.filter(p => p.status === (tab === 'active' ? 'active' : 'archived') && p.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="projects-page">
            <div className="page-header">
                <div>
                    <h1>Projects</h1>
                    <p>Organize and manage your research studies</p>
                </div>
                <button className="btn btn-primary"><Plus size={18} /> New Project</button>
            </div>

            <div className="projects-controls">
                <div className="tabs">
                    <button className={`tab ${tab === 'active' ? 'active' : ''}`} onClick={() => setTab('active')}>Active</button>
                    <button className={`tab ${tab === 'archived' ? 'active' : ''}`} onClick={() => setTab('archived')}>Archived</button>
                </div>
                <div className="search-box">
                    <Search size={18} />
                    <input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="projects-grid">
                {filtered.map(p => (
                    <div key={p.id} className="card project-card" onClick={() => navigate(`/projects/${p.id}`)}>
                        <div className="project-card-header">
                            <div className="project-icon">
                                <FolderOpen size={20} />
                            </div>
                            <button className="btn btn-icon btn-ghost" onClick={e => e.stopPropagation()}>
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                        <h3>{p.name}</h3>
                        <div className="project-meta">
                            <span><FileText size={14} /> {p.studyCount} studies</span>
                            <span><Clock size={14} /> {p.updated}</span>
                        </div>
                        <div className="project-studies-preview">
                            {p.studies.slice(0, 2).map(s => (
                                <div key={s.id} className="study-preview-item">
                                    <span className={`status-dot ${s.status}`}></span>
                                    <span>{s.name}</span>
                                </div>
                            ))}
                            {p.studies.length > 2 && <span className="more-studies">+{p.studies.length - 2} more</span>}
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                        <FolderOpen size={48} />
                        <p>No {tab} projects found</p>
                    </div>
                )}
            </div>

            <style>{`
                .projects-page { padding: var(--space-8) var(--space-10); max-width: 1200px; margin: 0 auto; }
                .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-8); }
                .page-header h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: var(--space-1); }
                .page-header p { color: var(--color-text-secondary); }
                .projects-controls { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-6); gap: var(--space-4); flex-wrap: wrap; }
                .search-box { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); min-width: 240px; }
                .search-box svg { color: var(--color-text-muted); flex-shrink: 0; }
                .search-box input { border: none; padding: var(--space-1); flex: 1; font-size: 0.875rem; }
                .search-box input:focus { box-shadow: none; }
                .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5); }
                .project-card { cursor: pointer; padding: var(--space-6); transition: all var(--transition-fast); }
                .project-card:hover { border-color: var(--color-primary-200); box-shadow: var(--shadow-md); }
                .project-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); }
                .project-icon { width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-primary-50); display: flex; align-items: center; justify-content: center; color: var(--color-primary); }
                .project-card h3 { font-size: 1.0625rem; font-weight: 600; margin-bottom: var(--space-3); }
                .project-meta { display: flex; gap: var(--space-5); margin-bottom: var(--space-5); font-size: 0.8125rem; color: var(--color-text-secondary); }
                .project-meta span { display: flex; align-items: center; gap: var(--space-1); }
                .project-studies-preview { display: flex; flex-direction: column; gap: var(--space-2); border-top: 1px solid var(--color-border-light); padding-top: var(--space-4); }
                .study-preview-item { display: flex; align-items: center; gap: var(--space-2); font-size: 0.8125rem; color: var(--color-text-secondary); }
                .status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
                .status-dot.completed { background: var(--color-success); }
                .status-dot.live { background: var(--color-info); }
                .status-dot.draft { background: var(--color-text-muted); }
                .status-dot.paused { background: var(--color-warning); }
                .more-studies { font-size: 0.75rem; color: var(--color-text-muted); }
            `}</style>
        </div>
    )
}
