import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [
    {
      id: 'm1',
      name: 'Palak Jain',
      role: 'Project Manager',
      email: 'palak.jain@company.com',
      avatar: 'PJ',
      avatarColor: 'bg-purple-500',
      status: 'online',
      tasksCompleted: 24,
      tasksInProgress: 5,
      joinedDate: '2025-06-15',
    },
    {
      id: 'm2',
      name: 'Ankit Sharma',
      role: 'UI/UX Designer',
      email: 'ankit.sharma@company.com',
      avatar: 'AS',
      avatarColor: 'bg-blue-500',
      status: 'online',
      tasksCompleted: 18,
      tasksInProgress: 3,
      joinedDate: '2025-07-20',
    },
    {
      id: 'm3',
      name: 'Priya Patel',
      role: 'Frontend Developer',
      email: 'priya.patel@company.com',
      avatar: 'PP',
      avatarColor: 'bg-pink-500',
      status: 'away',
      tasksCompleted: 31,
      tasksInProgress: 7,
      joinedDate: '2025-05-10',
    },
    {
      id: 'm4',
      name: 'Rahul Verma',
      role: 'Backend Developer',
      email: 'rahul.verma@company.com',
      avatar: 'RV',
      avatarColor: 'bg-green-500',
      status: 'online',
      tasksCompleted: 27,
      tasksInProgress: 4,
      joinedDate: '2025-08-01',
    },
    {
      id: 'm5',
      name: 'Sneha Gupta',
      role: 'QA Engineer',
      email: 'sneha.gupta@company.com',
      avatar: 'SG',
      avatarColor: 'bg-amber-500',
      status: 'offline',
      tasksCompleted: 15,
      tasksInProgress: 2,
      joinedDate: '2025-09-12',
    },
    {
      id: 'm6',
      name: 'Vikash Kumar',
      role: 'Full Stack Developer',
      email: 'vikash.kumar@company.com',
      avatar: 'VK',
      avatarColor: 'bg-indigo-500',
      status: 'online',
      tasksCompleted: 35,
      tasksInProgress: 6,
      joinedDate: '2025-04-01',
    },
  ],
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) member.status = status;
    },
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    removeMember: (state, action) => {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
  },
});

export const { updateMemberStatus, addMember, removeMember } = membersSlice.actions;
export default membersSlice.reducer;
