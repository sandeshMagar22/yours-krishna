import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';

const hasFirebaseConfig = !!import.meta.env.VITE_FIREBASE_API_KEY;

let auth = null;
let googleProvider = null;

if (hasFirebaseConfig) {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
}

// ───────────────────────────────────────────────────
// AUTHENTICATION EXPORTS (Handles Firebase AND Mock)
// ───────────────────────────────────────────────────

export const signInWithGoogle = async () => {
    if (hasFirebaseConfig) {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    } else {
        // MOCK AUTH: Simulate network delay and persist session
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    uid: 'mock-user-123',
                    displayName: 'Spiritual Seeker',
                    email: 'seeker@yourskrishna.com',
                };
                localStorage.setItem('yours_krishna_user', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 1200); // Realistic 1.2s delay
        });
    }
};

export const logout = async () => {
    if (hasFirebaseConfig) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    } else {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.removeItem('yours_krishna_user');
                resolve();
            }, 600);
        });
    }
};

export const onAuthStateChanged = (callback) => {
    if (hasFirebaseConfig) {
        return firebaseOnAuthStateChanged(auth, callback);
    } else {
        // MOCK AUTH: Automatically check local storage on mount
        const storedUser = localStorage.getItem('yours_krishna_user');
        if (storedUser) {
            callback(JSON.parse(storedUser));
        } else {
            callback(null);
        }

        // Return a dummy unsubscribe function
        return () => { };
    }
};
