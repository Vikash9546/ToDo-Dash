import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialTasks = {
    todo: [
        {
            id: uuidv4(),
            title: 'Brainstorming',
            description: 'Brainstorming brings team members diverse experience into play.',
            priority: 'low',
            dueDate: '2026-03-20',
            assignees: [
                { id: '1', name: 'Palak', color: '#5030E5' },
                { id: '2', name: 'Vikash', color: '#FFA500' },
                { id: '3', name: 'Rahul', color: '#76A5EA' }
            ],
            comments: 12,
            files: 0,
            image: null,
            category: 'Research',
            subtasks: [
                { id: uuidv4(), title: 'Gather team inputs', completed: true },
                { id: uuidv4(), title: 'Create mind map', completed: false }
            ],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Palak Jain', timestamp: '2026-03-10T10:00:00Z' }
            ],
            createdAt: '2026-03-10T10:00:00Z'
        },
        {
            id: uuidv4(),
            title: 'Research',
            description: 'User research helps you to create an optimal product for users.',
            priority: 'high',
            dueDate: '2026-03-15',
            assignees: [
                { id: '1', name: 'Palak', color: '#5030E5' },
                { id: '4', name: 'Shreya', color: '#E55030' }
            ],
            comments: 10,
            files: 3,
            image: null,
            category: 'Research',
            subtasks: [],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Palak Jain', timestamp: '2026-03-09T09:00:00Z' }
            ],
            createdAt: '2026-03-09T09:00:00Z'
        },
        {
            id: uuidv4(),
            title: 'Wireframes',
            description: 'Low fidelity wireframes include the most basic content and visuals.',
            priority: 'high',
            dueDate: '2026-03-18',
            assignees: [
                { id: '2', name: 'Vikash', color: '#FFA500' },
                { id: '3', name: 'Rahul', color: '#76A5EA' },
                { id: '5', name: 'Amit', color: '#8BC48A' }
            ],
            comments: 8,
            files: 2,
            image: 'wireframe',
            category: 'Design',
            subtasks: [
                { id: uuidv4(), title: 'Home page wireframe', completed: true },
                { id: uuidv4(), title: 'Dashboard wireframe', completed: false },
                { id: uuidv4(), title: 'Profile page wireframe', completed: false }
            ],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Vikash Kumar', timestamp: '2026-03-08T14:00:00Z' }
            ],
            createdAt: '2026-03-08T14:00:00Z'
        },
        {
            id: uuidv4(),
            title: 'UI Design',
            description: 'Create high-fidelity mockups for the mobile application screens.',
            priority: 'medium',
            dueDate: '2026-03-25',
            assignees: [
                { id: '1', name: 'Palak', color: '#5030E5' }
            ],
            comments: 5,
            files: 1,
            image: null,
            category: 'Design',
            subtasks: [],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Palak Jain', timestamp: '2026-03-07T11:00:00Z' }
            ],
            createdAt: '2026-03-07T11:00:00Z'
        }
    ],
    inProgress: [
        {
            id: uuidv4(),
            title: 'Onboarding Illustrations',
            description: 'Create illustrations for the onboarding flow of the mobile app.',
            priority: 'low',
            dueDate: '2026-03-22',
            assignees: [
                { id: '3', name: 'Rahul', color: '#76A5EA' },
                { id: '5', name: 'Amit', color: '#8BC48A' },
                { id: '1', name: 'Palak', color: '#5030E5' }
            ],
            comments: 14,
            files: 15,
            image: 'onboarding',
            category: 'Design',
            subtasks: [
                { id: uuidv4(), title: 'Welcome screen illustration', completed: true },
                { id: uuidv4(), title: 'Feature highlights', completed: false }
            ],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Rahul Sharma', timestamp: '2026-03-06T10:00:00Z' },
                { id: uuidv4(), action: 'Moved to In Progress', user: 'Rahul Sharma', timestamp: '2026-03-08T09:00:00Z' }
            ],
            createdAt: '2026-03-06T10:00:00Z'
        },
        {
            id: uuidv4(),
            title: 'Moodboard',
            description: 'Collect visual references and create a moodboard for the project.',
            priority: 'low',
            dueDate: '2026-03-16',
            assignees: [
                { id: '1', name: 'Palak', color: '#5030E5' }
            ],
            comments: 9,
            files: 10,
            image: 'moodboard',
            category: 'Design',
            subtasks: [],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Palak Jain', timestamp: '2026-03-05T15:00:00Z' }
            ],
            createdAt: '2026-03-05T15:00:00Z'
        },
        {
            id: uuidv4(),
            title: 'Prototype Development',
            description: 'Build interactive prototypes for user testing and feedback.',
            priority: 'medium',
            dueDate: '2026-03-28',
            assignees: [
                { id: '2', name: 'Vikash', color: '#FFA500' },
                { id: '4', name: 'Shreya', color: '#E55030' }
            ],
            comments: 6,
            files: 4,
            image: null,
            category: 'Development',
            subtasks: [],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Vikash Kumar', timestamp: '2026-03-04T12:00:00Z' }
            ],
            createdAt: '2026-03-04T12:00:00Z'
        }
    ],
    done: [
        {
            id: uuidv4(),
            title: 'Design System',
            description: 'It just needs to adapt the UI from the wireframe to the design system.',
            priority: 'completed',
            dueDate: '2026-03-10',
            assignees: [
                { id: '1', name: 'Palak', color: '#5030E5' },
                { id: '3', name: 'Rahul', color: '#76A5EA' }
            ],
            comments: 12,
            files: 2,
            image: null,
            category: 'Design',
            subtasks: [
                { id: uuidv4(), title: 'Color palette', completed: true },
                { id: uuidv4(), title: 'Typography system', completed: true },
                { id: uuidv4(), title: 'Component library', completed: true }
            ],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Palak Jain', timestamp: '2026-03-01T10:00:00Z' },
                { id: uuidv4(), action: 'Moved to Done', user: 'Palak Jain', timestamp: '2026-03-10T15:00:00Z' }
            ],
            createdAt: '2026-03-01T10:00:00Z'
        },
        {
            id: uuidv4(),
            title: 'Mobile App Design',
            description: 'Completed the mobile app design with all screens and interactions.',
            priority: 'completed',
            dueDate: '2026-03-08',
            assignees: [
                { id: '2', name: 'Vikash', color: '#FFA500' },
                { id: '5', name: 'Amit', color: '#8BC48A' }
            ],
            comments: 18,
            files: 8,
            image: 'mobiledesign',
            category: 'Design',
            subtasks: [],
            customFields: {},
            activityLog: [
                { id: uuidv4(), action: 'Task created', user: 'Vikash Kumar', timestamp: '2026-02-28T10:00:00Z' },
                { id: uuidv4(), action: 'Moved to Done', user: 'Vikash Kumar', timestamp: '2026-03-08T17:00:00Z' }
            ],
            createdAt: '2026-02-28T10:00:00Z'
        }
    ]
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        columns: initialTasks,
        customFieldDefinitions: [
            { id: 'priority_level', name: 'Priority Level', type: 'select', options: ['Critical', 'Urgent', 'Normal', 'Low'] },
            { id: 'tags', name: 'Tags', type: 'text' }
        ]
    },
    reducers: {
        // Add a new task to a column
        addTask: (state, action) => {
            const { column, task } = action.payload;
            const newTask = {
                ...task,
                id: uuidv4(),
                comments: 0,
                files: 0,
                image: null,
                subtasks: task.subtasks || [],
                customFields: task.customFields || {},
                activityLog: [
                    {
                        id: uuidv4(),
                        action: 'Task created',
                        user: action.payload.userName || 'User',
                        timestamp: new Date().toISOString()
                    }
                ],
                createdAt: new Date().toISOString()
            };
            state.columns[column].push(newTask);
        },

        // Update an existing task
        updateTask: (state, action) => {
            const { column, taskId, updates, userName } = action.payload;
            const taskIndex = state.columns[column].findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                const oldTask = state.columns[column][taskIndex];
                state.columns[column][taskIndex] = { ...oldTask, ...updates };

                // Add activity log entry
                if (userName) {
                    const changes = [];
                    if (updates.title && updates.title !== oldTask.title) changes.push(`Title changed to "${updates.title}"`);
                    if (updates.priority && updates.priority !== oldTask.priority) changes.push(`Priority changed to ${updates.priority}`);
                    if (updates.dueDate && updates.dueDate !== oldTask.dueDate) changes.push(`Due date changed to ${updates.dueDate}`);
                    if (updates.description && updates.description !== oldTask.description) changes.push('Description updated');

                    changes.forEach(change => {
                        state.columns[column][taskIndex].activityLog.push({
                            id: uuidv4(),
                            action: change,
                            user: userName,
                            timestamp: new Date().toISOString()
                        });
                    });
                }
            }
        },

        // Delete a task
        deleteTask: (state, action) => {
            const { column, taskId } = action.payload;
            state.columns[column] = state.columns[column].filter(t => t.id !== taskId);
        },

        // Move task between columns (for buttons)
        moveTask: (state, action) => {
            const { fromColumn, toColumn, taskId, userName } = action.payload;
            const taskIndex = state.columns[fromColumn].findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                const task = state.columns[fromColumn][taskIndex];
                state.columns[fromColumn].splice(taskIndex, 1);

                // Update priority based on column
                if (toColumn === 'done') task.priority = 'completed';
                else if (task.priority === 'completed') task.priority = 'medium';

                // Add activity log
                const columnNames = { todo: 'To Do', inProgress: 'On Progress', done: 'Done' };
                task.activityLog.push({
                    id: uuidv4(),
                    action: `Moved from ${columnNames[fromColumn]} to ${columnNames[toColumn]}`,
                    user: userName || 'User',
                    timestamp: new Date().toISOString()
                });

                state.columns[toColumn].push(task);
            }
        },

        // Drag and drop reorder
        reorderTasks: (state, action) => {
            const { sourceColumn, destColumn, sourceIndex, destIndex, userName } = action.payload;

            if (sourceColumn === destColumn) {
                // Reorder within same column
                const column = state.columns[sourceColumn];
                const [removed] = column.splice(sourceIndex, 1);
                column.splice(destIndex, 0, removed);
            } else {
                // Move to different column
                const sourceCol = state.columns[sourceColumn];
                const destCol = state.columns[destColumn];
                const [removed] = sourceCol.splice(sourceIndex, 1);

                if (destColumn === 'done') removed.priority = 'completed';
                else if (removed.priority === 'completed') removed.priority = 'medium';

                const columnNames = { todo: 'To Do', inProgress: 'On Progress', done: 'Done' };
                removed.activityLog.push({
                    id: uuidv4(),
                    action: `Moved from ${columnNames[sourceColumn]} to ${columnNames[destColumn]}`,
                    user: userName || 'User',
                    timestamp: new Date().toISOString()
                });

                destCol.splice(destIndex, 0, removed);
            }
        },

        // Add subtask
        addSubtask: (state, action) => {
            const { column, taskId, subtask } = action.payload;
            const task = state.columns[column].find(t => t.id === taskId);
            if (task) {
                task.subtasks.push({
                    id: uuidv4(),
                    title: subtask.title,
                    completed: false
                });
                task.activityLog.push({
                    id: uuidv4(),
                    action: `Subtask "${subtask.title}" added`,
                    user: action.payload.userName || 'User',
                    timestamp: new Date().toISOString()
                });
            }
        },

        // Toggle subtask
        toggleSubtask: (state, action) => {
            const { column, taskId, subtaskId } = action.payload;
            const task = state.columns[column].find(t => t.id === taskId);
            if (task) {
                const subtask = task.subtasks.find(s => s.id === subtaskId);
                if (subtask) {
                    subtask.completed = !subtask.completed;
                }
            }
        },

        // Delete subtask
        deleteSubtask: (state, action) => {
            const { column, taskId, subtaskId } = action.payload;
            const task = state.columns[column].find(t => t.id === taskId);
            if (task) {
                task.subtasks = task.subtasks.filter(s => s.id !== subtaskId);
            }
        },

        // Update custom field
        updateCustomField: (state, action) => {
            const { column, taskId, fieldId, value } = action.payload;
            const task = state.columns[column].find(t => t.id === taskId);
            if (task) {
                task.customFields[fieldId] = value;
            }
        },

        // Add custom field definition
        addCustomFieldDefinition: (state, action) => {
            state.customFieldDefinitions.push({
                id: uuidv4(),
                ...action.payload
            });
        },

        // Add activity log entry
        addActivityLog: (state, action) => {
            const { column, taskId, logEntry } = action.payload;
            const task = state.columns[column].find(t => t.id === taskId);
            if (task) {
                task.activityLog.push({
                    id: uuidv4(),
                    ...logEntry,
                    timestamp: new Date().toISOString()
                });
            }
        },

        // Set entire state (for loading from localStorage)
        setTasksState: (state, action) => {
            return action.payload;
        }
    }
});

export const {
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    updateCustomField,
    addCustomFieldDefinition,
    addActivityLog,
    setTasksState
} = taskSlice.actions;

export default taskSlice.reducer;
