import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { onAuthStateChanged } from './lib/firebase';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Journal from './pages/Journal';
import Wisdom from './pages/Wisdom';
import MoodTracker from './pages/MoodTracker';
import Login from './pages/Login';

const pageTitles = {
    '/': { title: 'Welcome Home', subtitle: 'Your daily sanctuary of wisdom and peace' },
    '/chat': { title: 'Talk to Your Companion', subtitle: 'Share freely — I am here to listen' },
    '/journal': { title: 'Journal & Reflect', subtitle: 'Your private space for inner growth' },
    '/wisdom': { title: 'Wisdom Library', subtitle: 'Eternal teachings for modern life' },
    '/mood': { title: 'Mood Tracker', subtitle: 'Awareness is the first step toward peace' },
    '/saved': { title: 'Saved Quotes', subtitle: 'Your curated collection of wisdom' },
    '/settings': { title: 'Settings', subtitle: 'Personalize your experience' },
};

function Header() {
    const location = useLocation();
    const page = pageTitles[location.pathname] || pageTitles['/'];
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <header className="header">
            <div>
                <h2 className="header-title">{page.title}</h2>
                <p className="header-subtitle">{page.subtitle}</p>
            </div>
            <div className="header-actions">
                <span className="header-date">{today}</span>
                <button className="header-btn" title="Search">
                    <Search size={18} />
                </button>
                <button className="header-btn" title="Notifications">
                    <Bell size={18} />
                </button>
            </div>
        </header>
    );
}

function SavedQuotes() {
    return (
        <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <h1 className="section-title"><span>❤️</span> Saved Quotes & Lessons</h1>
            <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <div className="empty-state-title">Your collection is waiting</div>
                <div className="empty-state-text">
                    Save your favorite Gita verses, motivational quotes, and lessons from the Wisdom Library. They'll appear here for easy access anytime.
                </div>
            </div>
        </div>
    );
}

function SettingsPage() {
    return (
        <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <h1 className="section-title"><span>⚙️</span> Settings</h1>
            <div className="cards-grid">
                <div className="card">
                    <div className="card-icon">👤</div>
                    <div className="card-title">Profile</div>
                    <div className="card-description">Manage your name, email, and personal preferences.</div>
                </div>
                <div className="card">
                    <div className="card-icon">🎨</div>
                    <div className="card-title">Appearance</div>
                    <div className="card-description">Choose your theme, colors, and display preferences.</div>
                </div>
                <div className="card">
                    <div className="card-icon">🔔</div>
                    <div className="card-title">Notifications</div>
                    <div className="card-description">Configure daily reminders, affirmations, and wisdom notifications.</div>
                </div>
                <div className="card">
                    <div className="card-icon">🔒</div>
                    <div className="card-title">Privacy & Security</div>
                    <div className="card-description">Manage data, export conversations, and control your privacy.</div>
                </div>
                <div className="card">
                    <div className="card-icon">📱</div>
                    <div className="card-title">Subscription</div>
                    <div className="card-description">View your plan, upgrade, or manage billing details.</div>
                </div>
                <div className="card">
                    <div className="card-icon">ℹ️</div>
                    <div className="card-title">About</div>
                    <div className="card-description">Yours Krishna v1.0 — An AI companion for emotional wisdom.</div>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            // Slight delay so the screen doesn't instantly flash
            setTimeout(() => setLoading(false), 500);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', color: 'var(--saffron)' }}>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
                    <div className="login-logo" style={{ marginBottom: '20px', animation: 'spin 4s linear infinite' }}>🪷</div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--saffron-dark)' }}>Awakening the soul...</h2>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Login onLogin={setUser} />;
    }

    return (
        <div className="app-layout">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            <main className="app-main">
                <Header />
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/journal" element={<Journal />} />
                        <Route path="/wisdom" element={<Wisdom />} />
                        <Route path="/mood" element={<MoodTracker />} />
                        <Route path="/saved" element={<SavedQuotes />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
