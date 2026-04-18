import React, { useState } from 'react';
import { Plus, X, BookOpen } from 'lucide-react';
import { moodOptions } from '../data/content';

const sampleEntries = [
    {
        id: 1,
        date: new Date(Date.now() - 86400000),
        title: 'Finding Peace After a Tough Day',
        content: 'Today was challenging at work. I felt overwhelmed by deadlines and expectations. But in the evening, I sat quietly for 10 minutes and reminded myself that I can only do my best. The Gita verse about focusing on action, not results, really helped me let go of the anxiety. I will try this again tomorrow.',
        mood: '😌',
        moodLabel: 'Peaceful',
    },
    {
        id: 2,
        date: new Date(Date.now() - 172800000),
        title: 'Grateful for Small Wins',
        content: 'I finally finished the project I had been procrastinating on. It wasn\'t perfect, but it was done. I realized that progress is more important than perfection. I felt proud of myself today.',
        mood: '🙏',
        moodLabel: 'Grateful',
    },
    {
        id: 3,
        date: new Date(Date.now() - 259200000),
        title: 'Dealing with Comparison',
        content: 'Scrolled through social media and felt inadequate seeing everyone else\'s achievements. Then I remembered: "It is far better to perform one\'s own duties imperfectly than to master the duties of another." My path is my own.',
        mood: '🤔',
        moodLabel: 'Thoughtful',
    },
];

function formatDate(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Journal() {
    const [entries, setEntries] = useState(sampleEntries);
    const [showEditor, setShowEditor] = useState(false);
    const [editorTitle, setEditorTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [editorMood, setEditorMood] = useState(null);

    const handleSave = () => {
        if (!editorTitle.trim() && !editorContent.trim()) return;
        const newEntry = {
            id: Date.now(),
            date: new Date(),
            title: editorTitle || 'Untitled Reflection',
            content: editorContent,
            mood: editorMood?.emoji || '😐',
            moodLabel: editorMood?.label || 'Neutral',
        };
        setEntries([newEntry, ...entries]);
        setEditorTitle('');
        setEditorContent('');
        setEditorMood(null);
        setShowEditor(false);
    };

    return (
        <div className="journal-page">
            {/* Header */}
            <div className="journal-header">
                <div>
                    <h1 className="section-title" style={{ marginBottom: 'var(--space-xs)' }}>
                        <span>📔</span> My Journal
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        Your private space for thoughts, reflections, and growth.
                    </p>
                </div>
                <button className="journal-compose-btn" onClick={() => setShowEditor(true)}>
                    <Plus size={18} /> New Reflection
                </button>
            </div>

            {/* Entries */}
            {entries.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📝</div>
                    <div className="empty-state-title">Your journey begins here</div>
                    <div className="empty-state-text">
                        Start writing your first reflection. Journaling helps you process emotions, build clarity, and track your inner growth.
                    </div>
                </div>
            ) : (
                entries.map(entry => (
                    <div key={entry.id} className="journal-entry-card">
                        <div className="journal-entry-date">{formatDate(entry.date)}</div>
                        <div className="journal-entry-mood">
                            {entry.mood} {entry.moodLabel}
                        </div>
                        <div className="journal-entry-title">{entry.title}</div>
                        <div className="journal-entry-preview">{entry.content}</div>
                    </div>
                ))
            )}

            {/* Editor Modal */}
            {showEditor && (
                <div className="journal-editor-overlay" onClick={(e) => e.target === e.currentTarget && setShowEditor(false)}>
                    <div className="journal-editor">
                        <div className="journal-editor-header">
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>✍️ New Reflection</h2>
                            <button className="header-btn" onClick={() => setShowEditor(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mood Selection */}
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
                            How are you feeling right now?
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
                            {moodOptions.map(m => (
                                <button
                                    key={m.label}
                                    className={`mood-option ${editorMood?.label === m.label ? 'selected' : ''}`}
                                    onClick={() => setEditorMood(m)}
                                    style={{ padding: 'var(--space-sm) var(--space-md)', minWidth: 'auto', flexDirection: 'row' }}
                                >
                                    <span style={{ fontSize: '1.2rem' }}>{m.emoji}</span>
                                    <span className="mood-label">{m.label}</span>
                                </button>
                            ))}
                        </div>

                        <input
                            className="journal-editor-title-input"
                            placeholder="Give your reflection a title..."
                            value={editorTitle}
                            onChange={(e) => setEditorTitle(e.target.value)}
                        />

                        <textarea
                            className="journal-editor-textarea"
                            placeholder="Write freely. This is your safe space. No judgments, no rules — just you and your thoughts..."
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                        />

                        <div className="journal-editor-actions">
                            <button className="btn btn-secondary" onClick={() => setShowEditor(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>Save Reflection</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
