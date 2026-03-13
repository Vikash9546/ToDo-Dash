import { useSelector } from 'react-redux';
import { useState } from 'react';
import { SearchIcon } from './Icons';

const statusDot = { online: 'bg-green-500', away: 'bg-amber-500', offline: 'bg-gray-400' };
const statusLabel = { online: 'Online', away: 'Away', offline: 'Offline' };

export default function MembersPage() {
  const members = useSelector((state) => state.members?.members) || [];
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  const roles = [...new Set(members.map((m) => m.role))];
  let filtered = [...members];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q));
  }
  if (filterRole !== 'all') filtered = filtered.filter((m) => m.role === filterRole);

  const onlineCount = members.filter((m) => m.status === 'online').length;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-500">Total Members</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{members.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-500">Online Now</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-3xl font-bold text-green-600">{onlineCount}</p>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-500">Roles</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{roles.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon className="w-4 h-4" /></span>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300" />
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200">
            <option value="all">All Roles</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <button key={member.id} onClick={() => setSelectedMember(selectedMember?.id === member.id ? null : member)}
            className={`bg-white rounded-xl border p-5 text-left transition-all hover:shadow-md ${selectedMember?.id === member.id ? 'border-purple-300 ring-2 ring-purple-100 shadow-md' : 'border-gray-200'}`}>
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full ${member.avatarColor} text-white flex items-center justify-center text-lg font-bold`}>{member.avatar}</div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${statusDot[member.status]} rounded-full border-2 border-white`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
                <p className="text-xs text-purple-600 font-medium mt-0.5">{member.role}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{member.email}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${member.status === 'online' ? 'bg-green-100 text-green-700' : member.status === 'away' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                {statusLabel[member.status]}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Completed</span>
                  <span className="font-semibold text-gray-700">{member.tasksCompleted}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(member.tasksCompleted / (member.tasksCompleted + member.tasksInProgress || 1)) * 100}%` }} />
                </div>
              </div>
              <div className="text-center shrink-0">
                <p className="text-lg font-bold text-gray-900">{member.tasksInProgress}</p>
                <p className="text-xs text-gray-400">Active</p>
              </div>
            </div>
            {selectedMember?.id === member.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Joined</span>
                  <span className="text-gray-700 font-medium">{new Date(member.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="flex-1 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg text-center">Message</span>
                  <span className="flex-1 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg text-center">View Profile</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-sm font-medium text-gray-500">No members found</p>
        </div>
      )}
    </div>
  );
}
