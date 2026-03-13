const API_URL = 'http://localhost:4000/api';

/**
 * Authenticate user with email/password and return tokens
 */
export async function authenticateUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
}

/**
 * Refresh the access token using a valid refresh token
 */
export async function refreshAccessToken(refreshToken) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'TOKEN_INVALID');
  }
  return data;
}

/**
 * Verify and decode a JWT token via the backend
 */
export async function verifyToken(token) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'TOKEN_INVALID');
  }
  
  // Create a payload-like structure to satisfy the current Redux slice format
  return {
    sub: data.user.id,
    email: data.user.email,
    name: data.user.name,
    role: data.user.role,
  };
}

/**
 * Decode a token without verification (for reading expiry client-side)
 */
export function decodeToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

/**
 * Check if a token is expiring within the given seconds
 */
export function isTokenExpiringSoon(token, withinSeconds = 300) {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp - now < withinSeconds;
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'pm_access_token';
const REFRESH_TOKEN_KEY = 'pm_refresh_token';

export function storeTokens(accessToken, refreshToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getStoredTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
}

export function clearStoredTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
