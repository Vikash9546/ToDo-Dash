import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasksSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import messagesReducer from './messagesSlice';
import membersReducer from './membersSlice';
import { socketMiddleware } from './socketMiddleware';
import { activityMiddleware } from './activityMiddleware';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks', 'auth', 'ui', 'messages', 'members'],
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
  ui: uiReducer,
  messages: messagesReducer,
  members: membersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(socketMiddleware, activityMiddleware),
});

export const persistor = persistStore(store);
