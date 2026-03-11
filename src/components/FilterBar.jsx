import { useSelector, useDispatch } from 'react-redux';
import { setPriority, setCategory, setDateRange, clearFilters } from '../store/filterSlice';
import {
    HiOutlineFunnel,
    HiOutlineCalendar,
    HiOutlineShare,
    HiOutlineSquares2X2,
    HiOutlineXMark,
    HiOutlinePencil,
    HiOutlineLink,
    HiOutlinePlus,
    HiOutlineChevronDown
} from 'react-icons/hi2';
import { useState } from 'react';

export default function FilterBar() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);
    const [viewMode, setViewMode] = useState('board');
    const [showFilter, setShowFilter] = useState(false);

    const hasActiveFilters = filters.priority !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all';

    const teamMembers = [
        { id: '1', name: 'P', color: '#FCD64A', text: '#FFFFFF' }, // actually image shows real avatars mixed with initial. Let's make them initials with similar colors. P is yellow. Wait, image shows faces! Since I don't have face URLs easily, initials are ok, but let's change text color to match. Let's use image faces if I can find unsplash ones, or just initials.
        { id: '2', name: 'V', color: '#FFA500', text: '#FFFFFF' },
        { id: '3', name: 'R', color: '#76A5EA', text: '#FFFFFF' },
        { id: '4', name: 'S', color: '#E55030', text: '#FFFFFF' },
    ];

    return (
        <div className="mb-8 mt-2">
            {/* Project Title Row */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-[46px] font-semibold text-[#0D062D] leading-[56px] tracking-[-1px]">Mobile App</h1>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center w-[30px] h-[30px] bg-[#5030E5]/10 text-[#5030E5] rounded-md hover:bg-[#5030E5]/20 transition-colors">
                            <HiOutlinePencil className="w-[18px] h-[18px]" strokeWidth={2} />
                        </button>
                        <button className="flex items-center justify-center w-[30px] h-[30px] bg-[#5030E5]/10 text-[#5030E5] rounded-md hover:bg-[#5030E5]/20 transition-colors">
                            <HiOutlineLink className="w-[18px] h-[18px]" strokeWidth={2} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Invite */}
                    <button className="flex items-center gap-2 px-1 py-2 text-[#5030E5] bg-transparent rounded-lg hover:underline transition-all font-medium text-[16px]">
                        <div className="w-5 h-5 flex items-center justify-center bg-[#5030E5]/20 rounded-md">
                            <HiOutlinePlus className="w-3 h-3 text-[#5030E5]" strokeWidth={2.5} />
                        </div>
                        Invite
                    </button>

                    {/* Team Avatars */}
                    <div className="flex -space-x-2 mr-2">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="w-[38px] h-[38px] rounded-full border-[2px] border-white flex items-center justify-center text-sm font-semibold shadow-sm cursor-pointer hover:scale-110 transition-transform relative z-0"
                                style={{ backgroundColor: member.color, color: member.text, zIndex: 10 - member.id }}
                            >
                                {member.name}
                            </div>
                        ))}
                        <div className="w-[38px] h-[38px] rounded-full border-[2px] border-white bg-[#F4D7DA] flex items-center justify-center text-sm font-medium text-[#D8727D] shadow-sm relative z-0">
                            +2
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Row */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 border rounded border-[#787486] text-[16px] text-[#787486] hover:bg-gray-50 transition-all font-medium ${hasActiveFilters ? 'bg-[#5030E5]/5 border-[#5030E5] text-[#5030E5]' : ''}`}
                    >
                        <HiOutlineFunnel className="w-[18px] h-[18px]" strokeWidth={1.5} />
                        Filter
                        <HiOutlineChevronDown className="w-4 h-4 ml-1" strokeWidth={1.5} />
                    </button>

                    {/* Today Button */}
                    <button className="flex items-center gap-2 px-3.5 py-2.5 border border-[#787486] rounded text-[16px] text-[#787486] hover:bg-gray-50 transition-all font-medium">
                        <HiOutlineCalendar className="w-[18px] h-[18px]" strokeWidth={1.5} />
                        Today
                        <HiOutlineChevronDown className="w-4 h-4 ml-1" strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {/* Share */}
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-[#787486] rounded text-[16px] text-[#787486] hover:bg-gray-50 transition-all font-medium">
                        <HiOutlineShare className="w-5 h-5 mr-1" strokeWidth={1.5} />
                        Share
                    </button>

                    {/* Divider */}
                    <div className="w-px h-7 bg-[#787486] mx-1" />

                    {/* View Mode */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('board')}
                            className={`w-10 h-10 flex items-center justify-center rounded-md transition-all ${viewMode === 'board'
                                ? 'bg-[#5030E5] text-white'
                                : 'text-[#787486] hover:bg-gray-100'
                                }`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="7" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <rect x="14" y="4" width="7" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`w-10 h-10 flex items-center justify-center rounded-md transition-all ${viewMode === 'list'
                                ? 'bg-[#5030E5] text-white'
                                : 'text-[#787486] hover:bg-gray-100'
                                }`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilter && (
                <div className="mt-4 bg-white rounded-xl border border-gray-100 p-5 animate-scale-in shadow-sm relative z-20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-[#0D062D]">Filters</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={() => dispatch(clearFilters())}
                                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                            >
                                <HiOutlineXMark className="w-4 h-4" />
                                Clear all
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Priority Filter */}
                        <div>
                            <label className="block text-xs font-medium text-[#787486] mb-2 uppercase tracking-wider">Priority</label>
                            <select
                                value={filters.priority}
                                onChange={(e) => dispatch(setPriority(e.target.value))}
                                className="w-full px-4 py-2.5 border border-[#DBDBDB] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#5030E5] focus:border-[#5030E5] bg-white transition-all"
                            >
                                <option value="all">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-xs font-medium text-[#787486] mb-2 uppercase tracking-wider">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => dispatch(setCategory(e.target.value))}
                                className="w-full px-4 py-2.5 border border-[#DBDBDB] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#5030E5] focus:border-[#5030E5] bg-white transition-all"
                            >
                                <option value="all">All Categories</option>
                                <option value="Design">Design</option>
                                <option value="Development">Development</option>
                                <option value="Research">Research</option>
                                <option value="Marketing">Marketing</option>
                                <option value="General">General</option>
                            </select>
                        </div>

                        {/* Date Filter */}
                        <div>
                            <label className="block text-xs font-medium text-[#787486] mb-2 uppercase tracking-wider">Due Date</label>
                            <select
                                value={filters.dateRange}
                                onChange={(e) => dispatch(setDateRange(e.target.value))}
                                className="w-full px-4 py-2.5 border border-[#DBDBDB] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#5030E5] focus:border-[#5030E5] bg-white transition-all"
                            >
                                <option value="all">All Dates</option>
                                <option value="overdue">Overdue</option>
                                <option value="today">Due Today</option>
                                <option value="week">Due This Week</option>
                                <option value="month">Due This Month</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
