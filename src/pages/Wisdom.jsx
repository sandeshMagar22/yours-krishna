import React, { useState } from 'react';
import { Heart, BookmarkPlus, BookmarkCheck, Search } from 'lucide-react';
import { gitaVerses, wisdomTopics, famousStories, motivationalQuotes } from '../data/content';

export default function Wisdom() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [savedVerses, setSavedVerses] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSave = (id) => {
        setSavedVerses(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const filteredVerses = gitaVerses.filter(v => {
        const matchesTopic = !selectedTopic || v.theme === selectedTopic;
        const matchesSearch = !searchQuery ||
            v.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.lesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.sanskrit.includes(searchQuery);
        return matchesTopic && matchesSearch;
    });

    const filteredStories = famousStories.filter(s => {
        const matchesTopic = !selectedTopic || s.themes.includes(selectedTopic);
        const matchesSearch = !searchQuery ||
            s.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.story.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTopic && matchesSearch;
    });

    return (
        <div className="wisdom-page">
            <h1 className="section-title" style={{ marginBottom: 'var(--space-xs)' }}>
                <span>📖</span> Wisdom Library
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 'var(--space-xl)' }}>
                Timeless teachings from the Bhagavad Gita and inspirational stories for every phase of life.
            </p>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 'var(--space-xl)' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    className="login-input"
                    style={{ paddingLeft: '44px', borderRadius: 'var(--radius-full)' }}
                    placeholder="Search verses, lessons, stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Topic Chips */}
            <div className="wisdom-topics-grid">
                <button
                    className={`wisdom-topic-chip ${!selectedTopic ? 'active' : ''}`}
                    onClick={() => setSelectedTopic(null)}
                >
                    ✨ All Topics
                </button>
                {wisdomTopics.map(t => (
                    <button
                        key={t.id}
                        className={`wisdom-topic-chip ${selectedTopic === t.id ? 'active' : ''}`}
                        onClick={() => setSelectedTopic(selectedTopic === t.id ? null : t.id)}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* Gita Verses */}
            <h2 className="section-title" style={{ fontSize: '1.2rem' }}>
                <span>🙏</span> Bhagavad Gita Verses
            </h2>
            {filteredVerses.length === 0 ? (
                <div className="empty-state" style={{ padding: 'var(--space-xl)' }}>
                    <p style={{ fontSize: '0.88rem' }}>No verses match your search.</p>
                </div>
            ) : (
                filteredVerses.map(v => (
                    <div key={v.id} className="verse-card">
                        <div className="verse-sanskrit">{v.sanskrit}</div>
                        <div className="verse-translation">"{v.translation}"</div>
                        <div className="verse-lesson">💡 {v.lesson}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-md)' }}>
                            <div className="verse-ref">📜 Chapter {v.chapter}, Verse {v.verse}</div>
                            <div className="verse-actions">
                                <button
                                    className={`verse-action-btn ${savedVerses.has(v.id) ? 'saved' : ''}`}
                                    onClick={() => toggleSave(v.id)}
                                >
                                    {savedVerses.has(v.id) ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                                    {savedVerses.has(v.id) ? 'Saved' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Famous Stories */}
            {filteredStories.length > 0 && (
                <>
                    <h2 className="section-title" style={{ fontSize: '1.2rem', marginTop: 'var(--space-xl)' }}>
                        <span>🌟</span> Inspirational Stories
                    </h2>
                    {filteredStories.map((s, i) => (
                        <div key={i} className="story-card">
                            <div className="story-person">
                                <div className="story-person-avatar">{s.person[0]}</div>
                                <div>
                                    <div className="story-person-name">{s.person}</div>
                                    <div className="story-title">{s.title}</div>
                                </div>
                            </div>
                            <div className="story-text">{s.story}</div>
                            <div className="story-lesson">✨ {s.lesson}</div>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)', flexWrap: 'wrap' }}>
                                {s.themes.map(t => (
                                    <span key={t} style={{
                                        fontSize: '0.7rem',
                                        padding: '2px 10px',
                                        borderRadius: 'var(--radius-full)',
                                        background: 'rgba(255,153,51,0.08)',
                                        color: 'var(--saffron-dark)',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
