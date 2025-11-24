// Base URL for API requests
export const API_BASE = 'http://localhost:9090';

// User storage key
const USER_STORAGE_KEY = 'sb_user';
const TOKEN_STORAGE_KEY = 'sb_token';

/**
 * Create a basic auth token from email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {string} Base64 encoded auth token
 */
export const makeBasicToken = (email, password) => {
    return btoa(unescape(encodeURIComponent(`${email}:${password}`)));
};

/**
 * Check if the user is authenticated
 * @returns {Promise<boolean>} True if authenticated, false otherwise
 */
export const isAuthenticated = async () => {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) return false;
    
    try {
        const response = await fetch(`${API_BASE}/auth/check`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            clearAuthSession();
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Authentication check failed:', error);
        clearAuthSession();
        return false;
    }
};

/**
 * Get the current user from localStorage
 * @returns {Object|null} User object or null if not authenticated
 */
export const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem(USER_STORAGE_KEY);
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch (e) {
        console.error('Failed to parse user data:', e);
        return null;
    }
};

/**
 * Check if current user has admin role
 * @returns {boolean} True if user is admin
 */
export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'ADMIN';
};

/**
 * Set authentication session
 * @param {string} token - Authentication token
 * @param {Object} user - User data to store
 */
export const setAuthSession = (token, user) => {
    if (typeof window === 'undefined') return;
    
    if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
    
    if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    
    // Notify other components about auth state change
    window.dispatchEvent(new Event('authChange'));
};

/**
 * Clear authentication session
 */
export const clearAuthSession = () => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    
    // Notify other components about auth state change
    window.dispatchEvent(new Event('authChange'));
};

/**
 * Get current auth token
 * @returns {string|null} Auth token or null if not authenticated
 */
export const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_STORAGE_KEY);
};

/**
 * Get auth header for API requests
 * @returns {Object} Headers object with Authorization if authenticated
 */
export const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Log out the current user
 */
export const logout = async () => {
    try {
        // Call logout endpoint if needed
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                ...getAuthHeader()
            }
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        clearAuthSession();
    }
};
