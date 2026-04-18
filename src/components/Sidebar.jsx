import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Home, MessageCircle, BookOpen, Sun, Smile,
    Heart, Settings, LogOut, Menu, X
} from 'lucide-react';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/chat', label: 'Talk to Krishna', icon: MessageCircle },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/wisdom', label: 'Gita Wisdom', icon: Sun },
    { path: '/mood', label: 'Mood Tracker', icon: Smile },
];

const secondaryItems = [
    { path: '/saved', label: 'Saved Quotes', icon: Heart },
    { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onToggle }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNav = (path) => {
        navigate(path);
        if (window.innerWidth < 768) onToggle();
    };

    return (
        <>
            <button className="sidebar-toggle" onClick={onToggle}>
                {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {isOpen && <div className="sidebar-overlay visible" onClick={onToggle} />}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Brand */}
                <div className="sidebar-brand">
                    <div className="sidebar-brand-icon">🙏</div>
                    <div>
                        <h1>Yours Krishna</h1>
                        <p>Your Inner Guide</p>
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="sidebar-nav">
                    <div className="nav-section-title">Main</div>
                    {navItems.map((item) => (
                        <div
                            key={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => handleNav(item.path)}
                        >
                            <item.icon size={20} className="nav-item-icon" />
                            {item.label}
                        </div>
                    ))}

                    <div className="nav-section-title">Personal</div>
                    {secondaryItems.map((item) => (
                        <div
                            key={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => handleNav(item.path)}
                        >
                            <item.icon size={20} className="nav-item-icon" />
                            {item.label}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">🙏</div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">Seeker</div>
                            <div className="sidebar-user-email">Welcome, friend</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
