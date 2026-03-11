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
            <div className="flex items-center justify-between px-5 py-[28px] border-b border-[#DBDBDB]">
                <div className="flex items-center gap-[9px]">
                    <div className="flex items-center justify-center text-[#5030E5]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="7" r="5" fill="#5030E5" />
                            <circle cx="7.5" cy="14" r="5" fill="#7B61FF" fillOpacity="0.5" />
                            <circle cx="16.5" cy="14" r="5" fill="#7B61FF" />
                        </svg>
                    </div>
                    {!collapsed && (
                        <span className="font-semibold text-[20px] text-[#0D062D] animate-fade-in whitespace-nowrap">
                            Project M.
                        </span>
                    )}
                </div>
                <button
                    onClick={onToggle}
                    className="text-[#787486] hover:text-[#0D062D] transition-colors"
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? (
                        <HiOutlineChevronDoubleRight className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    ) : (
                        <HiOutlineChevronDoubleLeft className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 overflow-y-auto mt-6">
                <ul className="space-y-[4px]">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <button
                                onClick={() => setActiveMenu(item.label)}
                                className={`w-full flex items-center gap-[14px] px-3 py-[10px] rounded-lg text-base transition-all duration-200 group ${activeMenu === item.label
                                    ? 'text-[#0D062D] font-medium'
                                    : 'text-[#787486] font-medium hover:bg-gray-50'
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

                <div className="px-2 mt-[28px] border-t border-[#DBDBDB] pt-[28px] animate-fade-in"></div>

                {/* My Projects */}
                {!collapsed && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between px-3 mb-[18px]">
                            <h3 className="text-xs font-bold text-[#787486]">
                                MY PROJECTS
                            </h3>
                            <button className="text-[#787486] hover:text-[#0D062D] transition-colors font-bold border border-[#787486] rounded-sm flex items-center justify-center w-3 h-3">
                                <HiOutlinePlus className="w-2.5 h-2.5" strokeWidth={3} />
                            </button>
                        </div>
                        <ul className="space-y-1">
                            {projects.map((project) => (
                                <li key={project.name}>
                                    <button className={`w-full flex items-center gap-4 px-3 py-[10px] rounded-md text-base transition-all duration-200 ${project.active
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
                <div className="px-4 pb-[32px] animate-fade-in mt-6">
                    <div className="bg-[#F5F5F5] rounded-[16px] p-5 pb-5 text-center relative mt-8">
                        {/* Glow and Icon */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                            <div className="w-[66px] h-[66px] bg-[#FCD64A]/30 rounded-full blur-[12px] absolute"></div>
                            <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center relative z-10 text-[#FBC11A]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 15V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V15L4 17V18H20V17L18 15ZM16 16H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V16Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium text-sm text-[#000000] mb-3 leading-tight">Thoughts Time</h4>
                            <p className="text-[12px] text-[#787486] mb-[20px] leading-[18px] font-normal px-2">
                                We don't have any notice for you, till then you can share your thoughts with your peers.
                            </p>
                            <button className="w-full bg-white text-[14px] font-medium py-[12px] rounded-lg text-[#000000] transition-shadow shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-[#E0E0E0]/50">
                                Write a message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
