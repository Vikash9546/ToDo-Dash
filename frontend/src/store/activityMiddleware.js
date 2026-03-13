import { addNotification } from './uiSlice';

export const activityMiddleware = (store) => (next) => (action) => {
  const prevState = store.getState();
  const tasks = prevState.tasks.tasks;
  
  let notificationText = null;
  const nowId = Date.now().toString() + Math.random().toString(36).substr(2, 5);

  if (action.type === 'tasks/addTask') {
    const { title } = action.payload;
    notificationText = `Added new task: "${title || 'Untitled'}"`;
  } else if (action.type === 'tasks/moveTask') {
    const { taskId, newStatus } = action.payload;
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      const statusLabels = { todo: 'To Do', inProgress: 'On Progress', done: 'Done' };
      notificationText = `Moved task "${task.title}" to ${statusLabels[newStatus] || newStatus}`;
    }
  } else if (action.type === 'tasks/deleteTask') {
    const taskId = action.payload;
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      notificationText = `Deleted task "${task.title}"`;
    }
  } else if (action.type === 'tasks/updateTask') {
    const { id, title } = action.payload;
    const task = tasks.find(t => t.id === id);
    if (task) {
      notificationText = `Updated task "${title || task.title}"`;
    }
  }

  const result = next(action);

  if (notificationText) {
    store.dispatch(addNotification({
      id: nowId,
      text: notificationText,
      time: 'Just now'
    }));
  }

  return result;
};
