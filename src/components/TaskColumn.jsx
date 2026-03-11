import { useDroppable } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasksByStatus } from '../store/tasksSlice';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { useState } from 'react';

const COLUMN_CONFIG = {
  todo: {
    label: 'To Do',
    dotColor: 'bg-purple-500',
    borderColor: 'border-purple-500',
  },
  inProgress: {
    label: 'On Progress',
    dotColor: 'bg-orange-400',
    borderColor: 'border-orange-400',
  },
  done: {
    label: 'Done',
    dotColor: 'bg-green-500',
    borderColor: 'border-green-500',
  },
};

export default function TaskColumn({ status }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksByStatus(state, status));
  const [showAddModal, setShowAddModal] = useState(false);
  const config = COLUMN_CONFIG[status];

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <>
      <div
        ref={setNodeRef}
        className={`flex-shrink-0 w-80 h-full min-h-[400px] max-h-full bg-gray-50/50 rounded-xl p-4 flex flex-col overflow-hidden ${
          isOver ? 'ring-2 ring-purple-300 ring-dashed bg-purple-50/50' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
            <span className="font-semibold text-gray-800">{config.label}</span>
            <span className="text-sm text-gray-400">{tasks.length}</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            +
          </button>
        </div>
        <div className={`h-0.5 ${config.borderColor} mb-4`} />
        <div className="flex-1 min-h-0 space-y-3 overflow-y-auto overflow-x-hidden scroll-smooth">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        defaultStatus={status}
      />
    </>
  );
}
