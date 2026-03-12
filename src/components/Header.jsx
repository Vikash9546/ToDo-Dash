import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon, CalendarIcon, BellIcon, ChevronDownIcon } from './Icons';
import { setFilter } from '../store/tasksSlice';
import { logout } from '../store/authSlice';
import { markNotificationRead } from '../store/uiSlice';

export default function Header() {
  const dispatch = useDispatch();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const search = useSelector((state) => state.tasks.filter?.search || '');
  const user = useSelector((state) => state.auth?.user);
  const notifications = useSelector((state) => state.ui?.notifications) || [];

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon className="w-4 h-4" /></span>
          <input
            type="text"
            placeholder="Search for anything..."
            value={search}
            onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => { setShowCalendar(!showCalendar); setShowHelp(false); setShowNotifications(false); }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            title="Calendar"
          >
            <CalendarIcon className="w-5 h-5" />
          </button>
          {showCalendar && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowCalendar(false)} />
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-20 max-h-80 overflow-y-auto">
                <p className="text-sm font-medium text-gray-800 mb-2">Calendar</p>
                <p className="text-sm text-gray-500">Quick date picker coming soon.</p>
                <input
                  type="date"
                  className="mt-2 w-full px-2 py-1 border rounded text-sm"
                  onChange={(e) => {
                    dispatch(setFilter({ dateFilter: e.target.value || null }));
                    setShowCalendar(false);
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => { setShowHelp(!showHelp); setShowCalendar(false); setShowNotifications(false); }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            title="Help"
          >
            ?
          </button>
          {showHelp && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowHelp(false)} />
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-20">
                <p className="text-sm font-medium text-gray-800 mb-2">Help</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Drag tasks between columns to change status</li>
                  <li>• Use Filter to filter by priority</li>
                  <li>• Search to find tasks by title/description</li>
                  <li>• Click + on a column to add a task</li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowCalendar(false); setShowHelp(false); }}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative"
title="Notifications"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 max-h-72 overflow-y-auto overflow-x-hidden">
                <p className="px-4 py-2 text-sm font-medium text-gray-800 border-b">Notifications</p>
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-gray-500">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => dispatch(markNotificationRead(n.id))}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 ${!n.read ? 'bg-purple-50/50' : ''}`}
                    >
                      <p className="text-gray-800">{n.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
        <div className="relative pl-4 border-l border-gray-200">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user?.name || 'Palak Jain'}</p>
              <p className="text-xs text-gray-500">Rajathan, India</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'PJ'}
            </div>
            <span className="text-gray-400"><ChevronDownIcon className="w-4 h-4" /></span>
          </button>
          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 min-w-[140px]">
                <button
                  onClick={() => {
                    dispatch(logout());
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
