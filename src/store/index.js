import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasksSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks', 'auth', 'ui'],
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
