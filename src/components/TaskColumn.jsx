import { useDroppable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';
import { selectTasksByStatus } from '../store/tasksSlice';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { useState } from 'react';

const COLUMN_CONFIG = {
  todo: {
    label: 'To Do',
    dotColor: 'bg-[#5030E5]',
    lineColor: 'bg-[#5030E5]',
    showAdd: true,
  },
  inProgress: {
    label: 'On Progress',
    dotColor: 'bg-[#FFA500]',
    lineColor: 'bg-[#FFA500]',
    showAdd: false,
  },
  done: {
    label: 'Done',
    dotColor: 'bg-[#76A5EA]',
    lineColor: 'bg-[#8BC48A]',
    showAdd: false,
  },
};

export default function TaskColumn({ status }) {
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
        className={`flex-shrink-0 w-[354px] h-full min-h-[400px] max-h-full bg-[#F5F5F5] rounded-[16px] p-5 flex flex-col overflow-hidden ${
          isOver ? 'ring-2 ring-[rgba(80,48,229,0.3)] ring-dashed bg-[#F0F0F0]' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
            <span className="font-medium text-[16px] text-[#0D062D] ml-1">{config.label}</span>
            <span className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#E0E0E0] text-[#625F6D] text-[12px] font-medium ml-2">{tasks.length}</span>
          </div>
          {config.showAdd && (
            <button
              onClick={() => setShowAddModal(true)}
              className="w-6 h-6 flex items-center justify-center bg-[rgba(80,48,229,0.08)] text-[#5030E5] rounded-[5px] hover:bg-[rgba(80,48,229,0.15)] text-[16px] font-medium transition-colors"
            >
              +
            </button>
          )}
        </div>
        <div className={`h-[3px] w-full ${config.lineColor} mb-5 rounded-full`} />
        <div className="flex-1 min-h-0 space-y-4 overflow-y-auto overflow-x-hidden scroll-smooth pt-1 pb-2">
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
