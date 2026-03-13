import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  authenticateUser,
  verifyToken,
  refreshAccessToken,
  storeTokens,
  getStoredTokens,
  clearStoredTokens,
} from '../utils/jwt';

// Async thunk: Login with email/password → returns JWT tokens
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authenticateUser(email, password);
      storeTokens(result.accessToken, result.refreshToken);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Validate existing token on app load
export const validateSession = createAsyncThunk(
  'auth/validateSession',
  async (_, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = getStoredTokens();

      if (!accessToken && !refreshToken) {
        return rejectWithValue('NO_TOKENS');
      }

      // Try to verify the access token
      if (accessToken) {
        try {
          const payload = await verifyToken(accessToken);
          return {
            user: {
              id: payload.sub,
              email: payload.email,
              name: payload.name,
              role: payload.role,
            },
            accessToken,
            refreshToken,
          };
        } catch (err) {
          // Access token invalid/expired — try refresh
          if (err.message === 'TOKEN_EXPIRED' && refreshToken) {
            const result = await refreshAccessToken(refreshToken);
            storeTokens(result.accessToken, refreshToken);
            return { ...result, refreshToken };
          }
          throw err;
        }
      }

      // No access token but have refresh token
      if (refreshToken) {
        const result = await refreshAccessToken(refreshToken);
        storeTokens(result.accessToken, refreshToken);
        return { ...result, refreshToken };
      }

      return rejectWithValue('NO_VALID_TOKEN');
    } catch (error) {
      clearStoredTokens();
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Refresh access token
export const refreshSession = createAsyncThunk(
  'auth/refreshSession',
  async (_, { rejectWithValue }) => {
    try {
      const { refreshToken } = getStoredTokens();
      if (!refreshToken) {
        return rejectWithValue('NO_REFRESH_TOKEN');
      }

      const result = await refreshAccessToken(refreshToken);
      storeTokens(result.accessToken, refreshToken);
      return { ...result, refreshToken };
    } catch (error) {
      clearStoredTokens();
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isValidating: true, // true until initial session check completes
  error: null,
  tokenExpiresAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearStoredTokens();
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.tokenExpiresAt = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Legacy login for backward compatibility with persisted state
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })
      // validateSession
      .addCase(validateSession.pending, (state) => {
        state.isValidating = true;
      })
      .addCase(validateSession.fulfilled, (state, action) => {
        state.isValidating = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(validateSession.rejected, (state) => {
        state.isValidating = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      // refreshSession
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(refreshSession.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { logout, clearError, login } = authSlice.actions;
export default authSlice.reducer;
