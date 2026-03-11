import { createSlice } from '@reduxjs/toolkit';
import { loadAuthState, saveAuthState, clearAuthState } from '../utils/localStorage';
import { loginUser, registerUser, isTokenValid } from '../utils/auth';

const savedAuth = loadAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: savedAuth.user,
        token: savedAuth.token,
        isAuthenticated: savedAuth.isAuthenticated && isTokenValid(savedAuth.token),
        error: null,
        loading: false
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            saveAuthState(action.payload.token, action.payload.user);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            saveAuthState(action.payload.token, action.payload.user);
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            clearAuthState();
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

// Thunk-like actions
export const login = (email, password) => (dispatch) => {
    dispatch(loginStart());

    // Simulate async
    setTimeout(() => {
        const result = loginUser(email, password);
        if (result.success) {
            dispatch(loginSuccess({ user: result.user, token: result.token }));
        } else {
            dispatch(loginFailure(result.message));
        }
    }, 500);
};

export const register = (name, email, password) => (dispatch) => {
    dispatch(registerStart());

    setTimeout(() => {
        const result = registerUser(name, email, password);
        if (result.success) {
            dispatch(registerSuccess({ user: result.user, token: result.token }));
        } else {
            dispatch(registerFailure(result.message));
        }
    }, 500);
};

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    clearError
} = authSlice.actions;

export default authSlice.reducer;
