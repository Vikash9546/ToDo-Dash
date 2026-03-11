import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, addSubtask, toggleSubtask, deleteSubtask, updateCustomField } from '../store/taskSlice';
import {
    HiOutlineXMark,
    HiOutlinePlusCircle,
    HiOutlineTrash,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineTag,
    HiOutlineChevronDown,
    HiOutlineChevronUp
} from 'react-icons/hi2';

const columnNames = {
    todo: 'To Do',
    inProgress: 'On Progress',
    done: 'Done'
};

export default function AddTaskModal({ isOpen, onClose, column, editTask = null }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { customFieldDefinitions } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState(editTask?.title || '');
    const [description, setDescription] = useState(editTask?.description || '');
    const [priority, setPriority] = useState(editTask?.priority || 'medium');
    const [category, setCategory] = useState(editTask?.category || 'General');
    const [dueDate, setDueDate] = useState(editTask?.dueDate || '');
    const [newSubtask, setNewSubtask] = useState('');
    const [subtasks, setSubtasks] = useState(editTask?.subtasks || []);
    const [customFields, setCustomFields] = useState(editTask?.customFields || {});
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (editTask) {
            dispatch(updateTask({
                column,
                taskId: editTask.id,
                updates: {
                    title,
                    description,
                    priority,
                    category,
                    dueDate,
                    subtasks,
                    customFields
                },
                userName: user?.name || 'User'
            }));
        } else {
            dispatch(addTask({
                column,
                task: {
                    title,
                    description,
                    priority,
                    category,
                    dueDate,
                    assignees: [
                        { id: user?.id || '1', name: user?.name || 'User', color: '#5030E5' }
                    ],
                    subtasks,
                    customFields
                },
                userName: user?.name || 'User'
            }));
        }
        onClose();
    };

    const handleAddSubtask = () => {
        if (!newSubtask.trim()) return;
        const st = { id: Date.now().toString(), title: newSubtask, completed: false };
        setSubtasks([...subtasks, st]);
        setNewSubtask('');
    };

    const handleToggleSubtask = (id) => {
        setSubtasks(subtasks.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
    };

    const handleDeleteSubtask = (id) => {
        setSubtasks(subtasks.filter(s => s.id !== id));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-scale-in max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {editTask ? 'Edit Task' : 'Create New Task'}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            in {columnNames[column]}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        <HiOutlineXMark className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-6">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details'
                                ? 'border-[#5030E5] text-[#5030E5]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Details
                    </button>
                    <button
                        onClick={() => setActiveTab('subtasks')}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'subtasks'
                                ? 'border-[#5030E5] text-[#5030E5]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Subtasks ({subtasks.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('custom')}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'custom'
                                ? 'border-[#5030E5] text-[#5030E5]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Custom Fields
                    </button>
                    {editTask && (
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'activity'
                                    ? 'border-[#5030E5] text-[#5030E5]'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Activity
                        </button>
                    )}
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    {activeTab === 'details' && (
                        <div className="px-6 py-4 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Task Title <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter task title..."
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all"
                                    required
                                    autoFocus
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add a description..."
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all resize-none"
                                />
                            </div>

                            {/* Priority & Category Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        <HiOutlineTag className="inline w-4 h-4 mr-1" />
                                        Priority
                                    </label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all bg-white appearance-none"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all bg-white appearance-none"
                                    >
                                        <option value="General">General</option>
                                        <option value="Design">Design</option>
                                        <option value="Development">Development</option>
                                        <option value="Research">Research</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <HiOutlineClock className="inline w-4 h-4 mr-1" />
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'subtasks' && (
                        <div className="px-6 py-4 space-y-3">
                            {/* Add Subtask */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSubtask}
                                    onChange={(e) => setNewSubtask(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                                    placeholder="Add a subtask..."
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSubtask}
                                    className="px-4 py-2.5 bg-[#5030E5] text-white rounded-xl text-sm font-medium hover:bg-[#4025C4] transition-colors"
                                >
                                    <HiOutlinePlusCircle className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Subtask List */}
                            {subtasks.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    No subtasks yet. Add one above!
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {subtasks.map((st) => (
                                        <div
                                            key={st.id}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-colors"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleToggleSubtask(st.id)}
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${st.completed
                                                        ? 'bg-[#5030E5] border-[#5030E5]'
                                                        : 'border-gray-300 hover:border-[#5030E5]'
                                                    }`}
                                            >
                                                {st.completed && (
                                                    <HiOutlineCheckCircle className="w-3 h-3 text-white" />
                                                )}
                                            </button>
                                            <span className={`text-sm flex-1 ${st.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                {st.title}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteSubtask(st.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <HiOutlineTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'custom' && (
                        <div className="px-6 py-4 space-y-4">
                            <p className="text-xs text-gray-400 mb-3">
                                Add custom fields to organize your tasks better.
                            </p>
                            {customFieldDefinitions.map((field) => (
                                <div key={field.id}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        {field.name}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            value={customFields[field.id] || ''}
                                            onChange={(e) => setCustomFields({ ...customFields, [field.id]: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all bg-white"
                                        >
                                            <option value="">Select...</option>
                                            {field.options?.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={customFields[field.id] || ''}
                                            onChange={(e) => setCustomFields({ ...customFields, [field.id]: e.target.value })}
                                            placeholder={`Enter ${field.name.toLowerCase()}...`}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/30 transition-all"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'activity' && editTask && (
                        <div className="px-6 py-4">
                            <div className="space-y-3">
                                {editTask.activityLog?.slice().reverse().map((log) => (
                                    <div key={log.id} className="flex items-start gap-3 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-[#5030E5] mt-1.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-700">
                                                <span className="font-medium">{log.user}</span>{' '}
                                                <span className="text-gray-500">{log.action}</span>
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#5030E5] text-white text-sm font-medium rounded-xl hover:bg-[#4025C4] transition-all shadow-sm hover:shadow-md"
                        >
                            {editTask ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
