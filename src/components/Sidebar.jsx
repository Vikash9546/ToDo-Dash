import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { GridIcon, MessageCircleIcon, ClipboardListIcon, UsersIcon, SettingsIcon, ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon } from './Icons';
import { setActiveNav, setActiveProject } from '../store/uiSlice';
import AddProjectModal from './AddProjectModal';
import WriteMessageModal from './WriteMessageModal';

const navItems = [
  { icon: GridIcon, label: 'Home' },
  { icon: MessageCircleIcon, label: 'Messages' },
  { icon: ClipboardListIcon, label: 'Tasks' },
  { icon: UsersIcon, label: 'Members' },
  { icon: SettingsIcon, label: 'Settings' },
];

const projectColors = {
  'Mobile App': 'bg-green-500',
  'Website Redesign': 'bg-orange-400',
  'Design System': 'bg-purple-500',
  Wireframes: 'bg-blue-500',
};

export default function Sidebar() {
  const dispatch = useDispatch();
  const activeNav = useSelector((state) => state.ui?.activeNav) || 'Home';
  const activeProject = useSelector((state) => state.ui?.activeProject) || 'Mobile App';
  const projects = useSelector((state) => state.ui?.projects) || ['Mobile App', 'Website Redesign', 'Design System', 'Wireframes'];
  const [collapsed, setCollapsed] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showWriteMessage, setShowWriteMessage] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-white border-r border-gray-200 transition-all ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 shrink-0" />
          {!collapsed && (
            <span className="font-semibold text-gray-800">Project M.</span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-100 rounded text-gray-500"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 scroll-smooth">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => dispatch(setActiveNav(item.label))}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-left ${
                activeNav === item.label
                  ? 'bg-purple-50 text-purple-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="w-5 flex items-center justify-center shrink-0"><Icon className="w-5 h-5" /></span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        <div className="mt-6">
          <div className="flex items-center justify-between px-3 mb-2">
            {!collapsed && (
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                MY PROJECTS
              </span>
            )}
            {!collapsed && (
              <button
                onClick={() => setShowAddProject(true)}
                className="text-gray-400 hover:text-purple-600"
                aria-label="Add project"
              >
                +
              </button>
            )}
          </div>
          {projects.map((name) => (
            <button
              key={name}
              onClick={() => dispatch(setActiveProject(name))}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-left ${
                activeProject === name ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${projectColors[name] ?? 'bg-gray-400'}`} />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{name}</span>
                  <DotsVerticalIcon className="w-4 h-4 text-gray-400 shrink-0" />
                </>
              )}
            </button>
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="mt-8 mb-4 mx-4">
          <div className="relative bg-[#F5F5F5] rounded-[16px] p-4 pt-5 pb-5 flex flex-col items-center text-center">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-8 h-8 bg-[#FBCB22] blur-[12px] opacity-80 rounded-full"></div>
                <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                    <path d="M12 2C8.134 2 5 5.134 5 9C5 11.385 6.195 13.488 8 14.732V17C8 17.552 8.448 18 9 18H15C15.552 18 16 17.552 16 17V14.732C17.805 13.488 19 11.385 19 9C19 5.134 15.866 2 12 2Z" fill="#FBCB22"/>
                    <path d="M9 19H15V20C15 20.552 14.552 21 14 21H10C9.448 21 9 20.552 9 20V19Z" fill="#EAAA08"/>
                    <path d="M10 22H14V22.5C14 23.328 13.328 24 12.5 24H11.5C10.672 24 10 23.328 10 22.5V22Z" fill="#D97706"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <h3 className="text-[15px] font-medium text-black mt-2 mb-2">Thoughts Time</h3>
            <p className="text-[13px] text-gray-500 mb-4 leading-relaxed px-1">
              We don't have any notice for you, till then you can share your thoughts with your peers.
            </p>
            <button
              onClick={() => setShowWriteMessage(true)}
              className="w-full py-2.5 bg-white text-[14px] font-medium text-black rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
            >
              Write a message
            </button>
          </div>
        </div>
      )}
      <AddProjectModal isOpen={showAddProject} onClose={() => setShowAddProject(false)} />
      <WriteMessageModal isOpen={showWriteMessage} onClose={() => setShowWriteMessage(false)} />
    </aside>
  );
}
