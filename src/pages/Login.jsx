import React, { useState } from 'react';
import { signInWithGoogle } from '../lib/firebase';

export default function Login({ onLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            const user = await signInWithGoogle();
            onLogin(user);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            const userObj = { name: name.trim(), email: email.trim() || 'guest@yourskrishna.com' };
            // For mock/fallback session
            if (!import.meta.env.VITE_FIREBASE_API_KEY) {
                localStorage.setItem('yours_krishna_user', JSON.stringify(userObj));
            }
            onLogin(userObj);
        }
    };

    return (
        <div className="login-page">
            <div className="login-bg-pattern" />

            <div className="login-card">
                <div className="login-logo">🙏</div>
                <h1 className="login-title">Yours Krishna</h1>
                <p className="login-subtitle">
                    Your compassionate AI companion for emotional support, reflection, and wisdom inspired by the Bhagavad Gita.
                </p>

                {/* Google Login */}
                <button className="login-google-btn" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
                    {isGoogleLoading ? (
                        <span style={{ color: 'var(--text-muted)' }}>Opening your path...</span>
                    ) : (
                        <>
                            <svg className="login-google-icon" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </>
                    )}
                </button>

                <div className="login-divider">or enter your name</div>

                <form onSubmit={handleSubmit}>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="login-submit-btn">
                        Begin Your Journey 🌅
                    </button>
                </form>

                <div className="login-footer">
                    <p>🛡️ Your conversations are private and secure.</p>
                    <p style={{ marginTop: '4px' }}>
                        This is an AI companion — not a replacement for professional care.
                    </p>
                </div>
            </div>
        </div>
    );
}
