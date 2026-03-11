// Load state from localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todoDashState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state from localStorage:', err);
        return undefined;
    }
};

// Save state to localStorage
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todoDashState', serializedState);
    } catch (err) {
        console.error('Error saving state to localStorage:', err);
    }
};

// Load auth state
export const loadAuthState = () => {
    try {
        const token = localStorage.getItem('todoDashToken');
        const user = localStorage.getItem('todoDashUser');
        if (token && user) {
            return { token, user: JSON.parse(user), isAuthenticated: true };
        }
        return { token: null, user: null, isAuthenticated: false };
    } catch (err) {
        console.error('Error loading auth state:', err);
        return { token: null, user: null, isAuthenticated: false };
    }
};

// Save auth state
export const saveAuthState = (token, user) => {
    try {
        localStorage.setItem('todoDashToken', token);
        localStorage.setItem('todoDashUser', JSON.stringify(user));
    } catch (err) {
        console.error('Error saving auth state:', err);
    }
};

// Clear auth state
export const clearAuthState = () => {
    try {
        localStorage.removeItem('todoDashToken');
        localStorage.removeItem('todoDashUser');
    } catch (err) {
        console.error('Error clearing auth state:', err);
    }
};
