import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { reorderTasks } from '../store/taskSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import TaskColumn from '../components/TaskColumn';
import AddTaskModal from '../components/AddTaskModal';
import { isAfter, isBefore, addDays, parseISO, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { columns } = useSelector((state) => state.tasks);
    const filters = useSelector((state) => state.filters);
    const { user } = useSelector((state) => state.auth);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalColumn, setModalColumn] = useState('todo');
    const [editingTask, setEditingTask] = useState(null);

    // Filter tasks
    const filterTasks = (tasks) => {
        return tasks.filter(task => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    task.title.toLowerCase().includes(searchLower) ||
                    task.description.toLowerCase().includes(searchLower) ||
                    task.category?.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // Priority filter
            if (filters.priority !== 'all' && task.priority !== filters.priority) {
                return false;
            }

            // Category filter
            if (filters.category !== 'all' && task.category !== filters.category) {
                return false;
            }

            // Date filter
            if (filters.dateRange !== 'all' && task.dueDate) {
                const now = new Date();
                const dueDate = parseISO(task.dueDate);

                switch (filters.dateRange) {
                    case 'overdue':
                        if (!isBefore(dueDate, startOfDay(now))) return false;
                        break;
                    case 'today':
                        if (isBefore(dueDate, startOfDay(now)) || isAfter(dueDate, endOfDay(now))) return false;
                        break;
                    case 'week':
                        if (isBefore(dueDate, startOfWeek(now)) || isAfter(dueDate, endOfWeek(now))) return false;
                        break;
                    case 'month':
                        if (isBefore(dueDate, startOfMonth(now)) || isAfter(dueDate, endOfMonth(now))) return false;
                        break;
                }
            } else if (filters.dateRange !== 'all' && !task.dueDate) {
                return false;
            }

            return true;
        });
    };

    const filteredColumns = useMemo(() => ({
        todo: filterTasks(columns.todo),
        inProgress: filterTasks(columns.inProgress),
        done: filterTasks(columns.done)
    }), [columns, filters]);

    // Handle drag and drop
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        dispatch(reorderTasks({
            sourceColumn: source.droppableId,
            destColumn: destination.droppableId,
            sourceIndex: source.index,
            destIndex: destination.index,
            userName: user?.name || 'User'
        }));
    };

    const handleAddTask = (column) => {
        setEditingTask(null);
        setModalColumn(column);
        setModalOpen(true);
    };

    const handleEditTask = (task, column) => {
        setEditingTask(task);
        setModalColumn(column);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setEditingTask(null);
    };

    return (
        <div className="flex min-h-screen bg-[#F5F5F5]">
            {/* Sidebar */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content */}
            <div
                className="flex-1 flex flex-col transition-all duration-300 min-w-0"
                style={{ marginLeft: sidebarCollapsed ? '70px' : '252px' }}
            >
                <Header />

                <main className="flex-1 p-6">
                    <FilterBar />

                    {/* Task Columns */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-3 gap-5 pb-4">
                            <TaskColumn
                                columnId="todo"
                                tasks={filteredColumns.todo}
                                onAddTask={() => handleAddTask('todo')}
                                onEditTask={handleEditTask}
                            />
                            <TaskColumn
                                columnId="inProgress"
                                tasks={filteredColumns.inProgress}
                                onAddTask={() => handleAddTask('inProgress')}
                                onEditTask={handleEditTask}
                            />
                            <TaskColumn
                                columnId="done"
                                tasks={filteredColumns.done}
                                onAddTask={() => handleAddTask('done')}
                                onEditTask={handleEditTask}
                            />
                        </div>
                    </DragDropContext>
                </main>
            </div>

            {/* Add/Edit Task Modal */}
            <AddTaskModal
                isOpen={modalOpen}
                onClose={handleModalClose}
                column={modalColumn}
                editTask={editingTask}
            />
        </div>
    );
}
