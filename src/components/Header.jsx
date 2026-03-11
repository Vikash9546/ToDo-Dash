import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../store/filterSlice';
import {
    HiOutlineMagnifyingGlass,
    HiOutlineCalendarDays,
    HiOutlineQuestionMarkCircle,
    HiOutlineBellAlert,
    HiOutlineChevronDown
} from 'react-icons/hi2';

export default function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { search } = useSelector((state) => state.filters);
    const [showNotifications, setShowNotifications] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for anything..."
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F5] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:bg-white transition-all border border-transparent focus:border-[#5030E5]/20"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Icons */}
                <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                    <HiOutlineCalendarDays className="w-5 h-5" />
                </button>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                    <HiOutlineQuestionMarkCircle className="w-5 h-5" />
                </button>
                <button
                    className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <HiOutlineBellAlert className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-200" />

                {/* User Profile */}
                <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-all">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800 leading-tight">
                            {user?.name || 'Guest User'}
                        </p>
                        <p className="text-xs text-gray-400 leading-tight">
                            {user?.location || 'India'}
                        </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5030E5] to-[#7B61FF] flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                        {getInitials(user?.name)}
                    </div>
                    <HiOutlineChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Notification Dropdown */}
            {showNotifications && (
                <div className="absolute right-6 top-16 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-scale-in z-50">
                    <h3 className="font-semibold text-sm mb-3">Notifications</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#5030E5]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-[#5030E5] text-xs font-semibold">PJ</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Palak</span> assigned you a new task
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 text-xs font-semibold">RS</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Rahul</span> commented on Wireframes
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">15 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
