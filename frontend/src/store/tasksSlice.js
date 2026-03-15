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
      subtasks: [
        { id: '1-1', title: 'Gather requirements', completed: true },
        { id: '1-2', title: 'Initial concept draft', completed: false },
      ],
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
      dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10), // Yesterday (past due)
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
      dueDate: new Date().toISOString().slice(0, 10), // Today (due today)
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
      const { id, title, description, status, priority = 'low', dueDate = null } = action.payload;
      state.tasks.push({
        id: id || generateId(),
        title,
        description,
        status,
        priority,
        assignees: 2,
        commentsCount: 0,
        filesCount: 0,
        dueDate,
        subtasks: [],
        customFields: action.payload.customFields || [],
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
    replaceTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addSubtask: (state, action) => {
      const { taskId, title } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        if (!task.subtasks) task.subtasks = [];
        task.subtasks.push({
          id: generateId(),
          title,
          completed: false,
        });
      }
    },
    toggleSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task && task.subtasks) {
        const subtask = task.subtasks.find((st) => st.id === subtaskId);
        if (subtask) subtask.completed = !subtask.completed;
      }
    },
    deleteSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task && task.subtasks) {
        task.subtasks = task.subtasks.filter((st) => st.id !== subtaskId);
      }
    },
    addCustomField: (state, action) => {
      const { taskId, label, value } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        if (!task.customFields) task.customFields = [];
        task.customFields.push({ id: generateId(), label, value });
      }
    },
    removeCustomField: (state, action) => {
      const { taskId, fieldId } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task && task.customFields) {
        task.customFields = task.customFields.filter((f) => f.id !== fieldId);
      }
    },
  },
});

export const { 
  addTask, moveTask, updateTask, deleteTask, setFilter, replaceTasks,
  addSubtask, toggleSubtask, deleteSubtask,
  addCustomField, removeCustomField
} = tasksSlice.actions;

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
