import { io } from 'socket.io-client';

let socket;

export const socketMiddleware = (store) => {
  // Connect to the Socket.IO server we just created
  const socketUrl = import.meta.env.VITE_SOCKET_URL || (import.meta.env.PROD ? 'https://todo-dash-1.onrender.com/' : 'http://localhost:4000');
  socket = io(socketUrl);

  // Handle receiving the initial/cached state from the server on connection
  socket.on('sync_state', (cachedTasks) => {
    // Only fetch tasks locally, and update only if remote has tasks
    // If you want robust syncing, you should compare timestamps,
    // but a blind replaceTasks works for a basic implementation.
    store.dispatch({
      type: 'tasks/replaceTasks',
      payload: cachedTasks.tasks,
      fromSocket: true,
    });
  });

  // Listen to remote actions broadcast by the server
  socket.on('redux_action', (action) => {
    // Dispatch the action with a flag so we don't re-emit it
    store.dispatch({
      ...action,
      fromSocket: true,
    });
  });

  return (next) => (action) => {
    // Let the action pass through the reducers first so state updates locally
    const result = next(action);

    // If this is a task-related action and NOT from the socket, emit it
    if (
      action.type &&
      action.type.startsWith('tasks/') &&
      action.type !== 'tasks/setFilter' && // Don't broadcast local filter changes
      !action.fromSocket
    ) {
      // Get the fresh state after the action applied
      const state = store.getState();
      
      socket.emit('redux_action', {
        action,
        tasksState: state.tasks, // Send cache of tasks to server
      });
    }

    return result;
  };
};
