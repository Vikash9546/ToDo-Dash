import { useSelector, useDispatch } from 'react-redux';
import { setPriority, setCategory, setDateRange, clearFilters } from '../store/filterSlice';
import {
    HiOutlineFunnel,
    HiOutlineCalendarDays,
    HiOutlineShare,
    HiOutlineSquares2X2,
    HiOutlineListBullet,
    HiOutlineXMark,
    HiOutlinePencilSquare,
    HiOutlineLink,
    HiOutlinePlusSmall,
    HiOutlineUserPlus
} from 'react-icons/hi2';
import { useState } from 'react';

export default function FilterBar() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);
    const [viewMode, setViewMode] = useState('board');
    const [showFilter, setShowFilter] = useState(false);

    const hasActiveFilters = filters.priority !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all';

    const teamMembers = [
        { id: '1', name: 'P', color: '#5030E5' },
        { id: '2', name: 'V', color: '#FFA500' },
        { id: '3', name: 'R', color: '#76A5EA' },
        { id: '4', name: 'S', color: '#E55030' },
    ];

    return (
        <div className="mb-6">
            {/* Project Title Row */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-[28px] font-semibold text-gray-900">Mobile App</h1>
                    <button className="p-1.5 text-gray-400 hover:text-[#5030E5] transition-colors rounded-lg hover:bg-[#5030E5]/5">
                        <HiOutlinePencilSquare className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-[#5030E5] transition-colors rounded-lg hover:bg-[#5030E5]/5">
                        <HiOutlineLink className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Invite */}
                    <button className="flex items-center gap-2 px-4 py-2 text-[#5030E5] bg-[#5030E5]/5 rounded-lg hover:bg-[#5030E5]/10 transition-all text-sm font-medium">
                        <HiOutlineUserPlus className="w-4 h-4" />
                        Invite
                    </button>

                    {/* Team Avatars */}
                    <div className="flex -space-x-2">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                                style={{ backgroundColor: member.color }}
                            >
                                {member.name}
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F4D7DA] flex items-center justify-center text-xs font-medium text-[#D8727D] shadow-sm">
                            +2
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Row */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all ${hasActiveFilters
                                ? 'border-[#5030E5] text-[#5030E5] bg-[#5030E5]/5'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <HiOutlineFunnel className="w-4 h-4" />
                        Filter
                        {hasActiveFilters && (
                            <span className="w-2 h-2 rounded-full bg-[#5030E5]" />
                        )}
                    </button>

                    {/* Today Button */}
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
                        <HiOutlineCalendarDays className="w-4 h-4" />
                        Today
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Share */}
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
                        <HiOutlineShare className="w-4 h-4" />
                        Share
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-200" />

                    {/* View Mode */}
                    <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('board')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'board'
                                    ? 'bg-[#5030E5] text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <HiOutlineSquares2X2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                    ? 'bg-[#5030E5] text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <HiOutlineListBullet className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilter && (
                <div className="mt-3 bg-white rounded-xl border border-gray-100 p-4 animate-scale-in shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Priority Filter */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Priority</label>
                            <select
                                value={filters.priority}
                                onChange={(e) => dispatch(setPriority(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/20 bg-white transition-all appearance-none"
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
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => dispatch(setCategory(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/20 bg-white transition-all appearance-none"
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
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Due Date</label>
                            <select
                                value={filters.dateRange}
                                onChange={(e) => dispatch(setDateRange(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5030E5]/30 focus:border-[#5030E5]/20 bg-white transition-all appearance-none"
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
