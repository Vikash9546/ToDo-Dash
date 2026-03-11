import { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, setFilter } from '../store/tasksSlice';
import { setViewMode } from '../store/uiSlice';
import TaskColumn from './TaskColumn';
import InviteModal from './InviteModal';

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);
  const viewMode = useSelector((state) => state.ui?.viewMode) || 'kanban';
  const activeProject = useSelector((state) => state.ui?.activeProject) || 'Mobile App';
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const taskId = active.id;
    const newStatus = over.id;
    if (['todo', 'inProgress', 'done'].includes(newStatus)) {
      dispatch(moveTask({ taskId, newStatus }));
    }
  };

  const priorities = [
    { value: null, label: 'All priorities' },
    { value: 'low', label: 'Low' },
    { value: 'high', label: 'High' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="min-h-full flex flex-col p-6">
      {/* Project header */}
      <div className="flex-shrink-0 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{activeProject}</h1>
          <button
            onClick={() => setShowAttachments(!showAttachments)}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            title="Attachments"
          >
            📎
          </button>
          <button
            onClick={copyLink}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            title="Copy link"
          >
            🔗
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Invite - purple + and text, no border */}
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-1.5 text-purple-600 font-medium text-sm hover:text-purple-700"
          >
            <span className="flex items-center justify-center w-5 h-5 text-lg leading-none">+</span>
            Invite
          </button>
          {/* Avatars - stacked with varied background colors */}
          <div className="flex -space-x-2 ml-1">
            <div className="w-8 h-8 rounded-full bg-[#facc15] border-2 border-white flex items-center justify-center text-xs font-medium text-amber-900">
              A
            </div>
            <div className="w-8 h-8 rounded-full bg-[#fde047] border-2 border-white flex items-center justify-center text-xs font-medium text-amber-900">
              B
            </div>
            <div className="w-8 h-8 rounded-full bg-[#93c5fd] border-2 border-white flex items-center justify-center text-xs font-medium text-sky-800">
              C
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f5e6d3] border-2 border-white flex items-center justify-center text-xs font-medium text-amber-800">
              D
            </div>
            <div className="w-8 h-8 rounded-full bg-[#fbcfe8] border-2 border-white flex items-center justify-center text-xs font-semibold text-pink-600">
              +2
            </div>
          </div>
          {/* Share - white button with grey border and share icon */}
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 ml-2"
          >
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {copied ? 'Copied!' : 'Share'}
          </button>
          {/* Vertical separator */}
          <div className="w-px h-6 bg-gray-200 mx-1" />
          {/* List view - solid purple square */}
          <button
            onClick={() => dispatch(setViewMode('kanban'))}
            className={`w-9 h-9 flex items-center justify-center rounded-lg ${viewMode === 'kanban' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
            title="List view"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="8" x2="19" y2="8" />
              <line x1="5" y1="16" x2="19" y2="16" />
            </svg>
          </button>
          {/* Grid view - 4 dots */}
          <button
            onClick={() => dispatch(setViewMode('grid'))}
            className={`w-9 h-9 flex items-center justify-center rounded-lg ${viewMode === 'grid' ? 'bg-purple-50 text-purple-600' : 'text-gray-400 hover:bg-gray-100'}`}
            title="Grid view"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="6" cy="6" r="2" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex-shrink-0 flex items-center gap-3 mb-6">
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span>▾</span> Filter
          </button>
          {showFilterMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowFilterMenu(false)}
              />
              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 min-w-[180px]">
                <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">
                  Priority
                </p>
                {priorities.map((p) => (
                  <button
                    key={p.value ?? 'all'}
                    onClick={() => {
                      dispatch(setFilter({ priority: p.value }));
                      setShowFilterMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                      filter?.priority === p.value ? 'text-purple-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => dispatch(setFilter({ dateFilter: filter?.dateFilter === 'today' ? null : 'today' }))}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg ${
            filter?.dateFilter === 'today'
              ? 'border-purple-500 bg-purple-50 text-purple-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>📅</span> Today
        </button>
      </div>

      {/* Kanban columns - horizontal scroll */}
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth items-stretch min-h-[calc(100vh-12rem)]">
          <TaskColumn status="todo" />
          <TaskColumn status="inProgress" />
          <TaskColumn status="done" />
        </div>
      </DndContext>

      {showAttachments && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowAttachments(false)} />
          <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl border p-4 z-20 min-w-[200px]">
            <p className="text-sm font-medium text-gray-800 mb-2">Attachments</p>
            <p className="text-sm text-gray-500">No attachments yet.</p>
          </div>
        </>
      )}

      <InviteModal isOpen={showInvite} onClose={() => setShowInvite(false)} />
    </div>
  );
}
