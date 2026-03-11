import { createSlice } from '@reduxjs/toolkit';

const today = new Date().toISOString().slice(0, 10);

const initialState = {
  activeNav: 'Home',
  activeProject: 'Mobile App',
  projects: ['Mobile App', 'Website Redesign', 'Design System', 'Wireframes'],
  viewMode: 'kanban',
  dateFilter: null,
  notifications: [
    { id: '1', text: 'Task "Research" was moved to Done', time: '2m ago', read: false },
    { id: '2', text: 'New comment on "Brainstorming"', time: '1h ago', read: true },
  ],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveNav: (state, action) => {
      state.activeNav = action.payload;
    },
    setActiveProject: (state, action) => {
      state.activeProject = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({ ...action.payload, read: false });
    },
    markNotificationRead: (state, action) => {
      const n = state.notifications.find((x) => x.id === action.payload);
      if (n) n.read = true;
    },
    addProject: (state, action) => {
      if (!state.projects.includes(action.payload)) {
        state.projects.push(action.payload);
      }
    },
  },
});

export const {
  setActiveNav,
  setActiveProject,
  setViewMode,
  setDateFilter,
  addNotification,
  markNotificationRead,
  addProject,
} = uiSlice.actions;
export default uiSlice.reducer;
