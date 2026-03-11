import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import authReducer from './authSlice';
import filterReducer from './filterSlice';
import { loadState, saveState } from '../utils/localStorage';

// Load persisted task state
const persistedState = loadState();

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        auth: authReducer,
        filters: filterReducer
    },
    preloadedState: persistedState ? { tasks: persistedState } : undefined
});

// Subscribe to store changes and save to localStorage
let saveTimeout;
store.subscribe(() => {
    // Debounce saves to avoid excessive writes
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveState(store.getState().tasks);
    }, 300);
});

export default store;
