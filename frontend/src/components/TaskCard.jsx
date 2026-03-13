import { useDraggable } from '@dnd-kit/core';
import { MessageIcon, PaperclipIcon, DotsVerticalIcon } from './Icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteTask, moveTask } from '../store/tasksSlice';

const priorityStyles = {
  low: 'bg-[#DFA874]/20 text-[#D58D49]',
  high: 'bg-[#D8727D]/10 text-[#D8727D]',
  completed: 'bg-[#83C29D]/20 text-[#68B266]',
};

export default function TaskCard({ task, isOverlay }) {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.ui?.viewMode) || 'kanban';
  const [showMenu, setShowMenu] = useState(false);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { task },
    disabled: isOverlay,
  });

  return (
    <div
      ref={!isOverlay ? setNodeRef : undefined}
      {...(!isOverlay ? listeners : {})}
      {...(!isOverlay ? attributes : {})}
      className={`rounded-[16px] p-5 w-auto transition-all ${
        isOverlay
          ? 'bg-white shadow-[0px_20px_40px_rgba(80,48,229,0.15)] rotate-[3deg] scale-105 z-50 cursor-grabbing'
          : isDragging
          ? 'bg-[rgba(80,48,229,0.05)] border-[1.5px] border-dashed border-[#5030E5] shadow-none cursor-grabbing'
          : 'bg-white shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing'
      }`}
    >
      <div className={`transition-opacity duration-200 ${isDragging && !isOverlay ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-[12px] font-medium px-2 py-1 rounded-md shrink-0 ${priorityStyles[task.priority] || priorityStyles.low}`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          {viewMode === 'grid' && (
            <span className="text-[12px] font-medium px-2 py-1 rounded-md shrink-0 bg-gray-100 text-gray-600">
              {task.status === 'todo' ? 'To Do' : task.status === 'inProgress' ? 'On Progress' : 'Done'}
            </span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 text-[#0D062D] font-bold hover:text-gray-900"
          >
            <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor">
              <path d="M2.5 4C3.60457 4 4.5 3.10457 4.5 2C4.5 0.89543 3.60457 0 2.5 0C1.39543 0 0.5 0.89543 0.5 2C0.5 3.10457 1.39543 4 2.5 4Z" />
              <path d="M8 4C9.10457 4 10 3.10457 10 2C10 0.89543 9.10457 0 8 0C6.89543 0 6 0.89543 6 2C6 3.10457 6.89543 4 8 4Z" />
              <path d="M13.5 4C14.6046 4 15.5 3.10457 15.5 2C15.5 0.89543 14.6046 0 13.5 0C12.3954 0 11.5 0.89543 11.5 2C11.5 3.10457 12.3954 4 13.5 4Z" />
            </svg>
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[160px]">
                {task.status !== 'todo' && (
                  <button
                    onClick={() => {
                      const prevStatus = task.status === 'done' ? 'inProgress' : 'todo';
                      dispatch(moveTask({ taskId: task.id, newStatus: prevStatus }));
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Move to {task.status === 'done' ? 'On Progress' : 'To Do'}
                  </button>
                )}
                {task.status !== 'done' && (
                  <button
                    onClick={() => {
                      const nextStatus = task.status === 'todo' ? 'inProgress' : 'done';
                      dispatch(moveTask({ taskId: task.id, newStatus: nextStatus }));
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Move to {task.status === 'todo' ? 'On Progress' : 'Done'}
                  </button>
                )}
                <div className="h-px bg-gray-100 my-1" />
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
      <h3 className="font-semibold text-[#0D062D] text-[18px] mb-1">{task.title}</h3>
      <p className="text-[12px] text-[#787486] mb-4 leading-relaxed line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex -space-x-1.5 pl-1">
          {[...Array(Math.min(task.assignees, 4))].map((_, i) => (
             <img
              key={i}
              src={`/avatars/avatar${(i % 4) + 1}.png`}
              alt="Assignee"
              className="w-[24px] h-[24px] rounded-full border-[1.5px] border-white object-cover"
            />
          ))}
        </div>
        <div className="flex items-center gap-3 text-[12px] font-medium text-[#787486]">
          <span className="flex items-center gap-1.5"><MessageIcon className="w-4 h-4 text-[#787486]" /> {task.commentsCount} comments</span>
          <span className="flex items-center gap-1.5"><PaperclipIcon className="w-4 h-4 text-[#787486]" /> {task.filesCount} files</span>
        </div>
        </div>
      </div>
    </div>
  );
}
