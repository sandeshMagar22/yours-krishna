import React, { useState } from 'react';
import { moodOptions } from '../data/content';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Generate sample mood history for the past 14 days
function generateSampleHistory() {
    const history = [];
    for (let i = 13; i >= 0; i--) {
        const date = new Date(Date.now() - i * 86400000);
        const rand = Math.floor(Math.random() * moodOptions.length);
        history.push({
            date,
            mood: moodOptions[rand],
            note: '',
        });
    }
    return history;
}

export default function MoodTracker() {
    const [history, setHistory] = useState(generateSampleHistory);
    const [todayMood, setTodayMood] = useState(null);
    const [note, setNote] = useState('');
    const [logged, setLogged] = useState(false);

    const handleLogMood = () => {
        if (!todayMood) return;
        const entry = {
            date: new Date(),
            mood: todayMood,
            note: note,
        };
        setHistory(prev => [...prev, entry]);
        setLogged(true);
    };

    const getMoodMessage = (mood) => {
        const messages = {
            'Happy': "Wonderful! Cherish this joy and spread it around you. 🌟",
            'Peaceful': "Beautiful. A calm mind is the strongest weapon. 🕊️",
            'Thoughtful': "Reflection is the beginning of wisdom. Keep exploring. 🤔",
            'Neutral': "Even a neutral day is a day of balance. Honor it. ⚖️",
            'Sad': "It's okay to feel this way. This sadness is a visitor, not a resident. 💙",
            'Anxious': "Take a deep breath. You are safe in this moment. 🌊",
            'Frustrated': "Frustration means you care deeply. Channel this energy wisely. 🔥",
            'Overwhelmed': "One step at a time. You don't need to carry everything today. 🤲",
            'Grateful': "Gratitude transforms what we have into enough. 🙏",
            'Motivated': "This fire is powerful! Use it wisely today. 💪",
        };
        return messages[mood?.label] || "Thank you for checking in. 🙏";
    };

    return (
        <div className="mood-page">
            <h1 className="section-title" style={{ marginBottom: 'var(--space-xs)' }}>
                <span>🌈</span> Mood Tracker
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 'var(--space-2xl)' }}>
                Track your emotional journey. Awareness is the first step toward inner peace.
            </p>

            {/* Today's Mood */}
            {!logged ? (
                <div className="card" style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 'var(--space-md)' }}>
                        How are you feeling right now?
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
                        Select the emotion that best describes your current state.
                    </p>

                    <div className="mood-selector">
                        {moodOptions.map(m => (
                            <button
                                key={m.label}
                                className={`mood-option ${todayMood?.label === m.label ? 'selected' : ''}`}
                                onClick={() => setTodayMood(m)}
                            >
                                <span className="mood-emoji">{m.emoji}</span>
                                <span className="mood-label">{m.label}</span>
                            </button>
                        ))}
                    </div>

                    {todayMood && (
                        <div style={{ animation: 'fadeInUp 0.3s ease', marginTop: 'var(--space-xl)' }}>
                            <p style={{ fontSize: '0.92rem', color: 'var(--saffron-dark)', fontWeight: '500', marginBottom: 'var(--space-lg)' }}>
                                {getMoodMessage(todayMood)}
                            </p>
                            <textarea
                                className="journal-editor-textarea"
                                style={{ minHeight: '80px', marginBottom: 'var(--space-lg)' }}
                                placeholder="Optional: Add a note about why you feel this way..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleLogMood}>
                                Log My Mood 🙏
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="card affirmation-card" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{todayMood?.emoji}</div>
                    <div className="affirmation-text" style={{ fontSize: '1.1rem' }}>
                        {getMoodMessage(todayMood)}
                    </div>
                    <div className="affirmation-label">✦ Mood Logged for Today ✦</div>
                </div>
            )}

            {/* Mood History Chart */}
            <h2 className="section-title" style={{ fontSize: '1.2rem' }}>
                <span>📊</span> Your Mood Journey
            </h2>
            <div className="mood-history">
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
                    Last {history.length} days
                </p>
                <div className="mood-chart">
                    {history.map((entry, i) => {
                        const height = (entry.mood.value / 5) * 100;
                        return (
                            <div
                                key={i}
                                className="mood-bar"
                                style={{
                                    height: `${height}%`,
                                    background: `linear-gradient(to top, ${entry.mood.color}88, ${entry.mood.color})`,
                                }}
                                title={`${entry.mood.label} — ${entry.date.toLocaleDateString()}`}
                            >
                                <span className="mood-bar-emoji">{entry.mood.emoji}</span>
                                <span className="mood-bar-label">
                                    {entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mood Insights */}
            <div className="cards-grid">
                <div className="card">
                    <div className="card-icon">🧠</div>
                    <div className="card-title">Pattern Awareness</div>
                    <div className="card-description">
                        Tracking your mood over time helps you spot triggers, patterns, and cycles. Knowledge of yourself is the most powerful knowledge.
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon">🌱</div>
                    <div className="card-title">Growth Over Time</div>
                    <div className="card-description">
                        Some days are heavy, others light. The goal isn't constant happiness — it's steady awareness. Every mood is a teacher.
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon">🙏</div>
                    <div className="card-title">Gita Wisdom</div>
                    <div className="card-description">
                        "The mind is restless, but it can be trained through practice and detachment." — Chapter 6, Verse 35. Your consistency here is that practice.
                    </div>
                </div>
            </div>
        </div>
    );
}
