import { useState } from 'react'
import { Search, BookOpen, ChevronRight, MessageCircle, ExternalLink } from 'lucide-react'
import { helpCategories, helpArticles } from '../data/mockData'

export default function HelpPage() {
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)

    const filtered = search ? helpArticles.filter(a => a.title.toLowerCase().includes(search.toLowerCase())) : []

    return (
        <div className="help-page">
            <div className="help-hero">
                <h1>How can we help?</h1>
                <p>Search the knowledge base or browse categories below</p>
                <div className="help-search">
                    <Search size={20} />
                    <input placeholder="Search for articles, guides, and more..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {search && filtered.length > 0 && (
                    <div className="help-results">
                        {filtered.map(a => (
                            <button key={a.id} className="help-result-item" onClick={() => setSelected(a)}>
                                <BookOpen size={16} /> {a.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="help-content">
                <div className="help-grid">
                    {helpCategories.map(cat => (
                        <div key={cat.id} className="card help-card" onClick={() => setSelected(cat)}>
                            <span className="help-cat-icon">{cat.icon}</span>
                            <h3>{cat.name}</h3>
                            <span className="help-count">{cat.articleCount} articles</span>
                            <ChevronRight size={16} className="help-arrow" />
                        </div>
                    ))}
                </div>

                <div className="help-contact">
                    <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
                        <MessageCircle size={40} style={{ color: 'var(--color-primary)', margin: '0 auto var(--space-4)' }} strokeWidth={1.5} />
                        <h3>Still need help?</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 16 }}>Our support team is ready to assist you</p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button className="btn btn-primary"><MessageCircle size={16} /> Chat with us</button>
                            <button className="btn btn-secondary"><ExternalLink size={16} /> Visit FAQ</button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .help-page { padding: var(--space-8) var(--space-10); max-width: 1000px; margin: 0 auto; }
        .help-hero { text-align: center; padding: var(--space-10) 0 var(--space-8); }
        .help-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: var(--space-2); }
        .help-hero > p { color: var(--color-text-secondary); margin-bottom: var(--space-6); }
        .help-search { display: flex; align-items: center; gap: var(--space-3); max-width: 560px; margin: 0 auto; padding: var(--space-4) var(--space-5); background: var(--color-surface); border: 2px solid var(--color-border); border-radius: var(--radius-xl); box-shadow: var(--shadow-md); transition: border-color var(--transition-fast); }
        .help-search:focus-within { border-color: var(--color-primary-200); }
        .help-search svg { color: var(--color-text-muted); flex-shrink: 0; }
        .help-search input { border: none; flex: 1; font-size: 1rem; padding: 0; background: transparent; }
        .help-search input:focus { box-shadow: none; }
        .help-results { max-width: 560px; margin: var(--space-2) auto 0; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: var(--space-2); }
        .help-result-item { display: flex; align-items: center; gap: var(--space-3); width: 100%; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: 0.875rem; color: var(--color-text-secondary); cursor: pointer; border: none; background: none; text-align: left; transition: all var(--transition-fast); }
        .help-result-item:hover { background: var(--color-primary-50); color: var(--color-primary); }
        .help-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-10); }
        .help-card { display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--space-8) var(--space-5); cursor: pointer; position: relative; }
        .help-cat-icon { font-size: 2rem; margin-bottom: var(--space-3); }
        .help-card h3 { font-size: 0.9375rem; font-weight: 600; margin-bottom: var(--space-1); }
        .help-count { font-size: 0.8125rem; color: var(--color-text-muted); }
        .help-arrow { position: absolute; bottom: var(--space-4); right: var(--space-4); color: var(--color-text-muted); opacity: 0; transition: opacity var(--transition-fast); }
        .help-card:hover .help-arrow { opacity: 1; }
        .help-contact { margin-top: var(--space-4); }
      `}</style>
        </div>
    )
}
