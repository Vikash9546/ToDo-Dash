import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, moveTask } from '../store/taskSlice';
import {
    HiOutlineChatBubbleLeftEllipsis,
    HiOutlinePaperClip,
    HiOutlineEllipsisHorizontal,
    HiOutlineArrowRight,
    HiOutlineTrash,
    HiOutlinePencil,
    HiOutlineExclamationTriangle,
    HiOutlineClock
} from 'react-icons/hi2';
import { isAfter, isBefore, addDays, parseISO, format } from 'date-fns';

const priorityStyles = {
    low: { bg: 'bg-orange-50', text: 'text-[#D58D49]', label: 'Low' },
    medium: { bg: 'bg-yellow-50', text: 'text-[#F4C542]', label: 'Medium' },
    high: { bg: 'bg-red-50', text: 'text-[#D8727D]', label: 'High' },
    completed: { bg: 'bg-green-50', text: 'text-[#68B266]', label: 'Completed' }
};

const columnNames = {
    todo: 'To Do',
    inProgress: 'On Progress',
    done: 'Done'
};

// Placeholder images for task cards
const taskImages = {
    wireframe: 'https://images.unsplash.com/photo-1581291518633-83b4eef1d2f0?w=400&h=200&fit=crop',
    onboarding: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
    moodboard: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop',
    mobiledesign: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
};

export default function TaskCard({ task, column, onEdit, provided }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [showMenu, setShowMenu] = useState(false);

    const priority = priorityStyles[task.priority] || priorityStyles.medium;

    // Check if due date is near or past
    const getDueDateStatus = () => {
        if (!task.dueDate) return null;
        try {
            const dueDate = parseISO(task.dueDate);
            const now = new Date();
            const warningDate = addDays(now, 2);

            if (isBefore(dueDate, now)) return 'overdue';
            if (isBefore(dueDate, warningDate)) return 'warning';
            return 'normal';
        } catch {
            return null;
        }
    };

    const dueDateStatus = getDueDateStatus();

    const getAvailableColumns = () => {
        return Object.keys(columnNames).filter(c => c !== column);
    };

    const handleMove = (toColumn) => {
        dispatch(moveTask({
            fromColumn: column,
            toColumn,
            taskId: task.id,
            userName: user?.name || 'User'
        }));
        setShowMenu(false);
    };

    const handleDelete = () => {
        dispatch(deleteTask({ column, taskId: task.id }));
        setShowMenu(false);
    };

    // Subtask progress
    const subtaskProgress = task.subtasks?.length
        ? Math.round((task.subtasks.filter(s => s.completed).length / task.subtasks.length) * 100)
        : null;

    return (
        <div
            ref={provided?.innerRef}
            {...(provided?.draggableProps || {})}
            {...(provided?.dragHandleProps || {})}
            className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing animate-fade-in group border border-gray-50 ${dueDateStatus === 'overdue' ? 'border-l-4 border-l-red-400' :
                    dueDateStatus === 'warning' ? 'border-l-4 border-l-yellow-400' : ''
                }`}
        >
            {/* Top Row: Priority & Menu */}
            <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-md text-xs font-medium ${priority.bg} ${priority.text}`}>
                    {priority.label}
                </span>
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                        className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <HiOutlineEllipsisHorizontal className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-scale-in">
                            <button
                                onClick={() => { onEdit(task); setShowMenu(false); }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                            >
                                <HiOutlinePencil className="w-4 h-4" /> Edit Task
                            </button>
                            {getAvailableColumns().map(col => (
                                <button
                                    key={col}
                                    onClick={() => handleMove(col)}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                >
                                    <HiOutlineArrowRight className="w-4 h-4" /> Move to {columnNames[col]}
                                </button>
                            ))}
                            <hr className="my-1 border-gray-100" />
                            <button
                                onClick={handleDelete}
                                className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                            >
                                <HiOutlineTrash className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Image */}
            {task.image && taskImages[task.image] && (
                <div className="mb-3 rounded-xl overflow-hidden -mx-1">
                    <img
                        src={taskImages[task.image]}
                        alt={task.title}
                        className="w-full h-[130px] object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>
            )}

            {/* Title & Description */}
            <h3 className="font-semibold text-base text-gray-900 mb-1 leading-snug">
                {task.title}
            </h3>
            <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                {task.description}
            </p>

            {/* Due Date Warning */}
            {dueDateStatus && dueDateStatus !== 'normal' && column !== 'done' && (
                <div className={`flex items-center gap-1.5 text-xs mb-3 px-2.5 py-1.5 rounded-lg ${dueDateStatus === 'overdue' ? 'bg-red-50 text-red-500 due-warning' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                    <HiOutlineExclamationTriangle className="w-3.5 h-3.5" />
                    {dueDateStatus === 'overdue' ? 'Past due date!' : 'Due soon!'}
                    <span className="ml-auto font-medium">
                        {task.dueDate && format(parseISO(task.dueDate), 'MMM d')}
                    </span>
                </div>
            )}

            {/* Due Date (normal) */}
            {task.dueDate && dueDateStatus === 'normal' && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                    <HiOutlineClock className="w-3.5 h-3.5" />
                    <span>Due {format(parseISO(task.dueDate), 'MMM d, yyyy')}</span>
                </div>
            )}

            {/* Subtask Progress */}
            {subtaskProgress !== null && (
                <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Subtasks</span>
                        <span>{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                            className="bg-[#5030E5] h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${subtaskProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Footer: Assignees & Stats */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                {/* Assignees */}
                <div className="flex -space-x-2">
                    {task.assignees?.slice(0, 4).map((assignee, idx) => (
                        <div
                            key={assignee.id || idx}
                            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-semibold text-white shadow-sm"
                            style={{ backgroundColor: assignee.color }}
                            title={assignee.name}
                        >
                            {assignee.name?.[0]?.toUpperCase()}
                        </div>
                    ))}
                    {task.assignees?.length > 4 && (
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-medium text-gray-500">
                            +{task.assignees.length - 4}
                        </div>
                    )}
                </div>

                {/* Comments & Files */}
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <HiOutlineChatBubbleLeftEllipsis className="w-4 h-4" />
                        {task.comments} comments
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <HiOutlinePaperClip className="w-4 h-4" />
                        {task.files} files
                    </span>
                </div>
            </div>
        </div>
    );
}
