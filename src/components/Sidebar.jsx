import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import {
    HiOutlineSquares2X2,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlineClipboardDocumentList,
    HiOutlineUsers,
    HiOutlineCog8Tooth,
    HiOutlineChevronDoubleLeft,
    HiOutlineChevronDoubleRight,
    HiOutlinePlus,
    HiOutlineEllipsisHorizontal
} from 'react-icons/hi2';

const menuItems = [
    { icon: HiOutlineSquares2X2, label: 'Home', active: true },
    { icon: HiOutlineChatBubbleOvalLeftEllipsis, label: 'Messages', badge: false },
    { icon: HiOutlineClipboardDocumentList, label: 'Tasks', active: false },
    { icon: HiOutlineUsers, label: 'Members', active: false },
    { icon: HiOutlineCog8Tooth, label: 'Settings', active: false },
];

const projects = [
    { name: 'Mobile App', color: '#7AC555', active: true },
    { name: 'Website Redesign', color: '#FFA500', active: false },
    { name: 'Design System', color: '#E4CCFD', active: false },
    { name: 'Wireframes', color: '#76A5EA', active: false },
];

export default function Sidebar({ collapsed, onToggle }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [activeMenu, setActiveMenu] = useState('Home');

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white border-r border-[#DBDBDB] z-40 transition-all duration-300 flex flex-col ${collapsed ? 'w-[70px]' : 'w-[252px]'
                }`}
        >
            {/* Logo */}
            <div className="flex items-center justify-between px-5 pt-6 pb-8">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center text-[#5030E5]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {!collapsed && (
                        <span className="font-semibold text-[20px] text-[#0D062D] animate-fade-in pl-1">
                            Project M.
                        </span>
                    )}
                </div>
                <button
                    onClick={onToggle}
                    className="text-[#787486] hover:text-[#0D062D] transition-colors rounded-lg"
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? (
                        <HiOutlineChevronDoubleRight className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    ) : (
                        <HiOutlineChevronDoubleLeft className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    )}
                </button>
            </div>

            <div className="px-5 border-b border-[#DBDBDB] mb-4"></div>

            {/* Navigation */}
            <nav className="flex-1 px-3 overflow-y-auto">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <button
                                onClick={() => setActiveMenu(item.label)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200 group ${activeMenu === item.label
                                    ? 'text-[#0D062D]'
                                    : 'text-[#787486] hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="w-6 h-6 flex-shrink-0" strokeWidth={1.5} />
                                {!collapsed && (
                                    <span className="animate-fade-in whitespace-nowrap">{item.label}</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="px-2 mt-6 border-t border-[#DBDBDB] pt-6 animate-fade-in"></div>

                {/* My Projects */}
                {!collapsed && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between px-3 mb-4">
                            <h3 className="text-xs font-bold text-[#787486]">
                                MY PROJECTS
                            </h3>
                            <button className="text-[#787486] hover:text-[#0D062D] transition-colors border border-[#787486] rounded-sm p-0.5">
                                <HiOutlinePlus className="w-3 h-3" strokeWidth={2} />
                            </button>
                        </div>
                        <ul className="space-y-1">
                            {projects.map((project) => (
                                <li key={project.name}>
                                    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-base transition-all duration-200 ${project.active
                                        ? 'bg-[#5030E5]/10 text-[#0D062D] font-semibold'
                                        : 'text-[#787486] hover:bg-gray-50 font-medium'
                                        }`}>
                                        <span
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: project.color }}
                                        />
                                        <span className="truncate">{project.name}</span>
                                        {project.active && (
                                            <span className="ml-auto text-[#0D062D]">
                                                <HiOutlineEllipsisHorizontal className="w-5 h-5 font-bold" strokeWidth={2} />
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* Thoughts Time Card */}
            {!collapsed && (
                <div className="px-4 pb-4 animate-fade-in mt-6">
                    <div className="bg-[#F5F5F5] rounded-[14px] p-5 text-center relative mt-8">
                        {/* Glow and Icon */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                            <div className="w-[66px] h-[66px] bg-[#FCD64A]/30 rounded-full blur-[10px] absolute"></div>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm relative z-10 text-[#FBC11A]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 15V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V15L4 17V18H20V17L18 15ZM16 16H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V16Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="mt-5">
                            <h4 className="font-medium text-sm text-[#000000] mb-2 leading-tight">Thoughts Time</h4>
                            <p className="text-[12px] text-[#787486] mb-4 leading-relaxed font-normal px-1">
                                We don't have any notice for you, till then you can share your thoughts with your peers.
                            </p>
                            <button className="w-full bg-white text-sm font-medium py-3 rounded-lg text-[#000000] transition-shadow shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-0">
                                Write a message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
