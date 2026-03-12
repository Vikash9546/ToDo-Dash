import { createSlice, createSelector } from '@reduxjs/toolkit';

const generateId = () => Math.random().toString(36).slice(2, 11);

const initialState = {
  tasks: [
    {
      id: '1',
      title: 'Brainstorming',
      description: "Brainstorming brings team members' diverse experience into play.",
      status: 'todo',
      priority: 'low',
      assignees: 3,
      commentsCount: 12,
      filesCount: 0,
      dueDate: null,
    },
    {
      id: '2',
      title: 'Research',
      description: 'User research helps you to create an optimal product for users.',
      status: 'todo',
      priority: 'high',
      assignees: 2,
      commentsCount: 10,
      filesCount: 3,
    },
    {
      id: '3',
      title: 'Wireframes',
      description: 'Low fidelity wireframes include the most basic content and visuals.',
      status: 'todo',
      priority: 'high',
      assignees: 3,
      commentsCount: 12,
      filesCount: 0,
    },
    {
      id: '4',
      title: 'Brainstorming',
      description: "Brainstorming brings team members' diverse experience into play.",
      status: 'inProgress',
      priority: 'low',
      assignees: 3,
      commentsCount: 12,
      filesCount: 0,
    },
    {
      id: '5',
      title: 'Research',
      description: 'User research helps you to create an optimal product for users.',
      status: 'inProgress',
      priority: 'high',
      assignees: 2,
      commentsCount: 10,
      filesCount: 3,
    },
    {
      id: '6',
      title: 'Wireframes',
      description: 'Low fidelity wireframes include the most basic content and visuals.',
      status: 'inProgress',
      priority: 'low',
      assignees: 3,
      commentsCount: 12,
      filesCount: 0,
    },
    {
      id: '7',
      title: 'Brainstorming',
      description: "Brainstorming brings team members' diverse experience into play.",
      status: 'done',
      priority: 'low',
      assignees: 3,
      commentsCount: 12,
      filesCount: 0,
    },
    {
      id: '8',
      title: 'Design System',
      description: 'It just needs to adapt the UI from what you did before.',
      status: 'done',
      priority: 'completed',
      assignees: 3,
      commentsCount: 12,
      filesCount: 15,
    },
  ],
  filter: {
    priority: null,
    search: '',
    dateFilter: null,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, description, status, priority = 'low' } = action.payload;
      state.tasks.push({
        id: generateId(),
        title,
        description,
        status,
        priority,
        assignees: 2,
        commentsCount: 0,
        filesCount: 0,
        dueDate: null,
      });
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = newStatus;
        if (newStatus === 'done') task.priority = 'completed';
      }
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) Object.assign(task, updates);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addTask, moveTask, updateTask, deleteTask, setFilter } = tasksSlice.actions;

const selectTasksState = (state) => state.tasks;

export const selectFilteredTasks = createSelector([selectTasksState], ({ tasks, filter }) => {
  let filtered = [...tasks];
  if (filter.priority) {
    filtered = filtered.filter((t) => t.priority === filter.priority);
  }
  if (filter.search) {
    const q = filter.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }
  if (filter.dateFilter) {
    const targetDate = filter.dateFilter === 'today'
      ? new Date().toISOString().slice(0, 10)
      : filter.dateFilter;
    filtered = filtered.filter((t) => !t.dueDate || t.dueDate === targetDate);
  }
  return filtered;
});

export const selectTasksByStatus = createSelector(
  [selectFilteredTasks, (_, status) => status],
  (filteredTasks, status) => filteredTasks.filter((t) => t.status === status)
);

export default tasksSlice.reducer;
