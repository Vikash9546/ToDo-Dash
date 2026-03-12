import { SignJWT, jwtVerify } from 'jose';

// Secret key for signing JWTs (in production, this would be on the server)
const SECRET = new TextEncoder().encode('project-m-jwt-secret-key-2026');
const ISSUER = 'project-m';
const AUDIENCE = 'project-m-app';

// Token durations
const ACCESS_TOKEN_EXPIRY = '1h';   // 1 hour
const REFRESH_TOKEN_EXPIRY = '7d';  // 7 days

// Simulated user database
const USERS_DB = [
  {
    id: 'usr_001',
    email: 'palak@example.com',
    password: 'password123',
    name: 'Palak Jain',
    role: 'Project Manager',
    avatar: 'PJ',
  },
  {
    id: 'usr_002',
    email: 'vikash@example.com',
    password: 'password123',
    name: 'Vikash Kumar',
    role: 'Full Stack Developer',
    avatar: 'VK',
  },
];

/**
 * Generate an access token for a user
 */
export async function generateAccessToken(user) {
  const token = await new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    type: 'access',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(SECRET);

  return token;
}

/**
 * Generate a refresh token for a user
 */
export async function generateRefreshToken(user) {
  const token = await new SignJWT({
    sub: user.id,
    type: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(SECRET);

  return token;
}

/**
 * Verify and decode a JWT token
 * Returns the payload if valid, throws if invalid/expired
 */
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return payload;
  } catch (error) {
    throw new Error(
      error.code === 'ERR_JWT_EXPIRED' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID'
    );
  }
}

/**
 * Authenticate user with email/password and return tokens
 */
export async function authenticateUser(email, password) {
  // Simulate server-side lookup
  const user = USERS_DB.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password. Use demo credentials.');
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  // Return user info (without password) + tokens
  const { password: _, ...safeUser } = user;
  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
}

/**
 * Refresh the access token using a valid refresh token
 */
export async function refreshAccessToken(refreshToken) {
  const payload = await verifyToken(refreshToken);

  if (payload.type !== 'refresh') {
    throw new Error('TOKEN_INVALID');
  }

  // Find user by ID from the refresh token
  const user = USERS_DB.find((u) => u.id === payload.sub);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const newAccessToken = await generateAccessToken(user);
  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken: newAccessToken,
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
