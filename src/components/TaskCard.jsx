import { useDraggable } from '@dnd-kit/core';
import { MessageIcon, PaperclipIcon, DotsVerticalIcon } from './Icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteTask } from '../store/tasksSlice';

const priorityStyles = {
  low: 'bg-amber-100 text-amber-800',
  high: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
};

export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg p-4 border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-90 shadow-lg ring-2 ring-purple-400 ring-dashed' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${priorityStyles[task.priority] || priorityStyles.low}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <DotsVerticalIcon className="w-5 h-5" />
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[120px]">
                <button
                  onClick={() => {
                    dispatch(deleteTask(task.id));
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 text-sm mb-1">{task.title}</h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex -space-x-2">
          {[...Array(Math.min(task.assignees, 3))].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-purple-700"
            >
              {String.fromCharCode(65 + (i % 26))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MessageIcon className="w-4 h-4" /> {task.commentsCount} comments</span>
          <span className="flex items-center gap-1"><PaperclipIcon className="w-4 h-4" /> {task.filesCount} files</span>
        </div>
      </div>
    </div>
  );
}
