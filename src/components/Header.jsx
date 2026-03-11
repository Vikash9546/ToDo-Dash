import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../store/filterSlice';
import { logout } from '../store/authSlice';
import {
    HiOutlineMagnifyingGlass,
    HiOutlineCalendar,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlineBell,
    HiOutlineChevronDown,
    HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';

export default function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { search } = useSelector((state) => state.filters);
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="h-[90px] bg-white border-b border-[#DBDBDB] flex items-center justify-between px-12 sticky top-0 z-30">
            {/* Search */}
            <div className="relative flex-1 max-w-[420px]">
                <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#787486]" strokeWidth={2} />
                <input
                    type="text"
                    placeholder="Search for anything..."
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-md text-sm text-[#0D062D] placeholder-[#787486] focus:outline-none transition-all border-none font-normal"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-8">
                {/* Icons */}
                <div className="flex items-center gap-6">
                    <button className="relative text-[#787486] hover:text-[#0D062D] transition-colors">
                        <HiOutlineCalendar className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                    <button className="relative text-[#787486] hover:text-[#0D062D] transition-colors">
                        <HiOutlineChatBubbleOvalLeftEllipsis className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                    <button className="relative text-[#787486] hover:text-[#0D062D] transition-colors">
                        <HiOutlineBell className="w-6 h-6" strokeWidth={1.5} />
                        <span className="absolute top-0 right-1 w-[6px] h-[6px] bg-[#D8727D] rounded-full" />
                    </button>
                </div>

                {/* User Profile */}
                <div className="relative">
                    <button
                        className="flex items-center gap-4 transition-all"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-base font-normal text-[#0D062D] leading-tight">
                                {user?.name || 'Palak Jain'}
                            </p>
                            <p className="text-sm text-[#787486] leading-tight mt-1 font-normal">
                                {user?.location || 'Rajasthan, India'}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <HiOutlineChevronDown className="w-5 h-5 text-[#292D32]" strokeWidth={2} />
                        </div>
                    </button>

                    {/* User Dropdown for Logout */}
                    {showUserMenu && (
                        <div className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-scale-in z-50">
                            <button
                                onClick={() => dispatch(logout())}
                                className="w-full px-4 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                            >
                                <HiOutlineArrowRightOnRectangle className="w-5 h-5 flex-shrink-0" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
