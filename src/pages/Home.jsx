import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Heart } from 'lucide-react';
import { gitaVerses, dailyAffirmations, famousStories } from '../data/content';
import QuotesMarquee from '../components/QuotesMarquee';

function getDayIndex(arr) {
    const day = Math.floor(Date.now() / 86400000);
    return day % arr.length;
}

export default function Home() {
    const navigate = useNavigate();
    const todayVerse = gitaVerses[getDayIndex(gitaVerses)];
    const todayAffirmation = dailyAffirmations[getDayIndex(dailyAffirmations)];
    const todayStory = famousStories[getDayIndex(famousStories)];

    return (
        <div className="home-page">
            {/* Marquee */}
            <QuotesMarquee />

            {/* Hero Section */}
            <div style={{ padding: '0 0 0 0' }}>
                <section className="hero-section" style={{ marginTop: 'var(--space-xl)' }}>
                    <div className="hero-image-wrapper">
                        <img src="/images/krishna-hero.png" alt="Krishna at sunrise" className="hero-image" />
                    </div>
                    <div className="hero-overlay" />
                    <div className="hero-content">
                        <div className="hero-badge">
                            <Sparkles size={14} />
                            Your Daily Companion
                        </div>
                        <h1 className="hero-title">
                            Find Clarity in Chaos.<br />Strength in Stillness.
                        </h1>
                        <p className="hero-description">
                            A wise, warm, and compassionate AI companion inspired by the Bhagavad Gita.
                            Talk about your feelings, get grounded wisdom, and take your next step with confidence.
                        </p>
                        <button className="hero-cta" onClick={() => navigate('/chat')}>
                            Start a Conversation <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            </div>

            {/* Daily Affirmation */}
            <div className="cards-grid" style={{ marginTop: 'var(--space-xl)' }}>
                <div className="card affirmation-card animate-glow">
                    <div className="affirmation-text">"{todayAffirmation}"</div>
                    <div className="affirmation-label">✦ Today's Affirmation ✦</div>
                </div>

                {/* Today's Gita Verse */}
                <div className="card wisdom-card">
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 'var(--space-md)' }}>
                        🙏 Verse of the Day — Chapter {todayVerse.chapter}:{todayVerse.verse}
                    </div>
                    <div className="wisdom-card-sanskrit">{todayVerse.sanskrit}</div>
                    <div className="wisdom-card-verse">"{todayVerse.translation}"</div>
                    <div className="wisdom-card-lesson">💡 {todayVerse.lesson}</div>
                </div>
            </div>

            {/* Feature Cards */}
            <h2 className="section-title"><span>✨</span> Explore Your Inner World</h2>
            <div className="cards-grid">
                <div className="card feature-card" onClick={() => navigate('/chat')}>
                    <div className="card-icon">💬</div>
                    <div className="card-title">Talk to Your Companion</div>
                    <div className="card-description">
                        Share how you're feeling. Get empathetic, wise, and practical guidance powered by Gita wisdom and famous stories.
                    </div>
                    <div className="card-action">Start Talking <ArrowRight size={14} /></div>
                </div>

                <div className="card feature-card" onClick={() => navigate('/journal')}>
                    <div className="card-icon">📔</div>
                    <div className="card-title">Journal & Reflect</div>
                    <div className="card-description">
                        Write your thoughts, track your mood, and build self-awareness through daily reflection.
                    </div>
                    <div className="card-action">Open Journal <ArrowRight size={14} /></div>
                </div>

                <div className="card feature-card" onClick={() => navigate('/wisdom')}>
                    <div className="card-icon">📖</div>
                    <div className="card-title">Gita Wisdom Library</div>
                    <div className="card-description">
                        Explore verses, lessons, and stories organized by life themes — from courage to inner peace.
                    </div>
                    <div className="card-action">Explore Wisdom <ArrowRight size={14} /></div>
                </div>

                <div className="card feature-card" onClick={() => navigate('/mood')}>
                    <div className="card-icon">🌈</div>
                    <div className="card-title">Mood Tracker</div>
                    <div className="card-description">
                        Track your emotional journey over time. See patterns, celebrate growth, and stay self-aware.
                    </div>
                    <div className="card-action">Track Your Mood <ArrowRight size={14} /></div>
                </div>
            </div>

            {/* Today's Inspirational Story */}
            <h2 className="section-title"><span>📖</span> Story of the Day</h2>
            <div className="story-card">
                <div className="story-person">
                    <div className="story-person-avatar">{todayStory.person[0]}</div>
                    <div>
                        <div className="story-person-name">{todayStory.person}</div>
                        <div className="story-title">{todayStory.title}</div>
                    </div>
                </div>
                <div className="story-text">{todayStory.story}</div>
                <div className="story-lesson">✨ {todayStory.lesson}</div>
            </div>

            {/* Meditation Image */}
            <div className="cards-grid">
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <img src="/images/meditation-scene.png" alt="Meditation at sunrise" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    <div style={{ padding: 'var(--space-lg)' }}>
                        <div className="card-title">Begin Your Practice</div>
                        <div className="card-description">
                            Close your eyes. Take three slow breaths. Let this moment be your sanctuary.
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <img src="/images/gita-wisdom.png" alt="Bhagavad Gita" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    <div style={{ padding: 'var(--space-lg)' }}>
                        <div className="card-title">Sacred Knowledge</div>
                        <div className="card-description">
                            5,000 years of timeless wisdom. Explore the Gita's guidance for every life challenge.
                        </div>
                    </div>
                </div>
            </div>

            {/* Safety Notice */}
            <div style={{ textAlign: 'center', padding: 'var(--space-2xl) var(--space-xl)', color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: '1.7' }}>
                <p>
                    🛡️ <strong>Yours Krishna</strong> is an AI companion for emotional support and reflection.
                    It is <strong>not</strong> a substitute for professional mental health care.
                    If you are in crisis, please contact a licensed professional or emergency service immediately.
                </p>
            </div>
        </div>
    );
}
