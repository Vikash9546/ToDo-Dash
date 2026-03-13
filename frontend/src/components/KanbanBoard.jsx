import { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, setFilter, selectFilteredTasks } from '../store/tasksSlice';
import { setViewMode } from '../store/uiSlice';
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';
import InviteModal from './InviteModal';
import { PaperclipIcon, LinkIcon, CalendarIcon, FilterIcon, ChevronDownIcon } from './Icons';

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);
  const viewMode = useSelector((state) => state.ui?.viewMode) || 'kanban';
  const activeProject = useSelector((state) => state.ui?.activeProject) || 'Mobile App';
  const allTasks = useSelector(selectFilteredTasks);
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
      <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <h1 className="text-[46px] font-semibold text-[#0D062D]">{activeProject}</h1>
          <div className="flex items-center gap-2 mt-2">
            <button
              className="flex items-center justify-center w-[25px] h-[25px] bg-[#5030E5]/10 rounded-[5px] text-[#5030E5] hover:bg-[#5030E5]/20 transition-colors"
              title="Edit"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </button>
            <button
              onClick={copyLink}
              className="flex items-center justify-center w-[25px] h-[25px] bg-[#5030E5]/10 rounded-[5px] text-[#5030E5] hover:bg-[#5030E5]/20 transition-colors"
              title="Copy link"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </button>
            {copied && <span className="text-[12px] text-[#5030E5] font-medium absolute translate-x-16">Copied!</span>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Invite */}
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 text-[#5030E5] font-medium text-[16px] hover:opacity-80 transition-opacity"
          >
            <span className="flex items-center justify-center w-[18px] h-[18px] bg-[#5030E5]/15 rounded-[5px] text-[12px] font-bold">+</span>
            Invite
          </button>
          {/* Avatars */}
          <div className="flex -space-x-2 pl-2">
            <img src="/avatars/avatar1.png" alt="Team member" className="w-[38px] h-[38px] rounded-full border-[2px] border-white object-cover" />
            <img src="/avatars/avatar2.png" alt="Team member" className="w-[38px] h-[38px] rounded-full border-[2px] border-white object-cover" />
            <img src="/avatars/avatar3.png" alt="Team member" className="w-[38px] h-[38px] rounded-full border-[2px] border-white object-cover" />
            <img src="/avatars/avatar4.png" alt="Team member" className="w-[38px] h-[38px] rounded-full border-[2px] border-white object-cover" />
            <div className="w-[38px] h-[38px] rounded-full bg-[#F4D7DA] border-[2px] border-white flex items-center justify-center text-[15px] font-medium text-[#D25B68] tracking-tight">
              +2
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Filters and Views */}
      <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 mt-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[16px] font-medium text-[#787486] border border-[#787486]/40 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FilterIcon className="w-4 h-4 text-[#787486]" /> Filter <ChevronDownIcon className="w-4 h-4 text-[#787486]" />
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
            className={`flex items-center gap-2 px-4 py-2 bg-white text-[16px] font-medium border rounded-lg transition-colors ${
              filter?.dateFilter === 'today'
                ? 'border-[#5030E5] text-[#5030E5]'
                : 'border-[#787486]/40 text-[#787486] hover:bg-gray-50'
            }`}
          >
            <CalendarIcon className="w-4 h-4" /> Today <ChevronDownIcon className="w-4 h-4 text-[#787486]" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[16px] font-medium text-[#787486] border border-[#787486]/40 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-[#787486]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Share
          </button>
          
          <div className="w-px h-7 bg-[#787486]/40 mx-1" />
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => dispatch(setViewMode('kanban'))}
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-lg transition-colors ${
                viewMode === 'kanban' ? 'bg-[#5030E5] text-white' : 'bg-transparent text-[#787486] hover:bg-[#5030E5]/5'
              }`}
              title="List view"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="8" x2="19" y2="8" />
                <line x1="5" y1="16" x2="19" y2="16" />
              </svg>
            </button>
            <button
              onClick={() => dispatch(setViewMode('grid'))}
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#5030E5] text-white' : 'bg-transparent text-[#787486] hover:bg-[#5030E5]/5'
              }`}
              title="Grid view"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="1" width="6" height="6" rx="1.5" />
                <rect x="11" y="1" width="6" height="6" rx="1.5" />
                <rect x="1" y="11" width="6" height="6" rx="1.5" />
                <rect x="11" y="11" width="6" height="6" rx="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban columns vs Grid View */}
      {viewMode === 'kanban' ? (
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-[30px] overflow-x-auto overflow-y-hidden pb-4 scroll-smooth items-stretch min-h-[calc(100vh-12rem)]">
            <TaskColumn status="todo" />
            <TaskColumn status="inProgress" />
            <TaskColumn status="done" />
          </div>
        </DndContext>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4 overflow-y-auto content-start min-h-[calc(100vh-12rem)]">
          {allTasks.map(task => (
            <div key={task.id} className="h-fit">
              <TaskCard task={task} />
            </div>
          ))}
          {allTasks.length === 0 && (
            <p className="text-gray-500 col-span-full mt-10 text-center text-sm">No tasks found in this project.</p>
          )}
        </div>
      )}

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
