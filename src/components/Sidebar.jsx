import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import {
    HiOutlineHome,
    HiOutlineChatBubbleLeftRight,
    HiOutlineClipboardDocumentList,
    HiOutlineUserGroup,
    HiOutlineCog6Tooth,
    HiOutlineChevronDoubleLeft,
    HiOutlineChevronDoubleRight,
    HiOutlineLightBulb,
    HiOutlinePlusCircle,
    HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';

const menuItems = [
    { icon: HiOutlineHome, label: 'Home', active: true },
    { icon: HiOutlineChatBubbleLeftRight, label: 'Messages', badge: 3 },
    { icon: HiOutlineClipboardDocumentList, label: 'Tasks', active: false },
    { icon: HiOutlineUserGroup, label: 'Members', active: false },
    { icon: HiOutlineCog6Tooth, label: 'Settings', active: false },
];

const projects = [
    { name: 'Mobile App', color: '#7AC555', active: true },
    { name: 'Website Redesign', color: '#FFA500', active: false },
    { name: 'Design System', color: '#76A5EA', active: false },
    { name: 'Wireframes', color: '#7AC555', active: false },
];

export default function Sidebar({ collapsed, onToggle }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [activeMenu, setActiveMenu] = useState('Home');

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 transition-all duration-300 flex flex-col ${collapsed ? 'w-[70px]' : 'w-[252px]'
                }`}
        >
            {/* Logo */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#5030E5] to-[#7B61FF] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">P</span>
                    </div>
                    {!collapsed && (
                        <span className="font-semibold text-lg text-gray-900 animate-fade-in">
                            Project M.
                        </span>
                    )}
                </div>
                <button
                    onClick={onToggle}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? (
                        <HiOutlineChevronDoubleRight className="w-5 h-5" />
                    ) : (
                        <HiOutlineChevronDoubleLeft className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <button
                                onClick={() => setActiveMenu(item.label)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${activeMenu === item.label
                                        ? 'bg-[#5030E5]/10 text-[#5030E5]'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${activeMenu === item.label ? 'text-[#5030E5]' : 'text-gray-400 group-hover:text-gray-600'
                                    }`} />
                                {!collapsed && (
                                    <span className="animate-fade-in whitespace-nowrap">{item.label}</span>
                                )}
                                {!collapsed && item.badge && (
                                    <span className="ml-auto bg-[#5030E5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* My Projects */}
                {!collapsed && (
                    <div className="mt-8 animate-fade-in">
                        <div className="flex items-center justify-between px-3 mb-3">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                My Projects
                            </h3>
                            <button className="text-gray-400 hover:text-[#5030E5] transition-colors">
                                <HiOutlinePlusCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <ul className="space-y-1">
                            {projects.map((project) => (
                                <li key={project.name}>
                                    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${project.active
                                            ? 'bg-[#5030E5]/5 text-gray-800 font-medium'
                                            : 'text-gray-500 hover:bg-gray-50'
                                        }`}>
                                        <span
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: project.color }}
                                        />
                                        <span className="truncate">{project.name}</span>
                                        {project.active && (
                                            <span className="ml-auto text-[10px] text-gray-400">•••</span>
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
                <div className="px-4 pb-4 animate-fade-in">
                    <div className="bg-gradient-to-br from-[#F5F5F5] to-[#EBEBEB] rounded-xl p-4 text-center relative overflow-hidden">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#F9DC44] to-[#F9A825] rounded-full flex items-center justify-center shadow-lg">
                                <HiOutlineLightBulb className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold text-sm text-gray-800 mb-1">Thoughts Time</h4>
                            <p className="text-xs text-gray-500 mb-3">
                                We don't have any notes planned today.
                            </p>
                            <button className="w-full bg-white text-sm font-medium py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700">
                                Write a message
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Logout Button */}
            <div className="px-3 pb-4 border-t border-gray-100 pt-3">
                <button
                    onClick={() => dispatch(logout())}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 ${collapsed ? 'justify-center' : ''
                        }`}
                >
                    <HiOutlineArrowRightOnRectangle className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}
