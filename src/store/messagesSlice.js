import { createSlice } from '@reduxjs/toolkit';

const generateId = () => Math.random().toString(36).slice(2, 11);

const initialState = {
  conversations: [
    {
      id: 'c1',
      name: 'Design Team',
      avatar: 'DT',
      avatarColor: 'bg-purple-500',
      lastMessage: 'Let\'s finalize the wireframes today',
      time: '2m ago',
      unread: 3,
      online: true,
      messages: [
        { id: 'm1', sender: 'Ankit Sharma', text: 'Hey team, how\'s the wireframe progress?', time: '10:00 AM', isOwn: false },
        { id: 'm2', sender: 'You', text: 'Almost done with the mobile screens!', time: '10:05 AM', isOwn: true },
        { id: 'm3', sender: 'Priya Patel', text: 'I\'ve uploaded the revised color palette to Figma', time: '10:12 AM', isOwn: false },
        { id: 'm4', sender: 'Ankit Sharma', text: 'Let\'s finalize the wireframes today', time: '10:15 AM', isOwn: false },
      ],
    },
    {
      id: 'c2',
      name: 'Rahul Verma',
      avatar: 'RV',
      avatarColor: 'bg-blue-500',
      lastMessage: 'The API integration is complete',
      time: '1h ago',
      unread: 1,
      online: true,
      messages: [
        { id: 'm5', sender: 'Rahul Verma', text: 'Hey, I\'ve started working on the backend API', time: '9:00 AM', isOwn: false },
        { id: 'm6', sender: 'You', text: 'Awesome! Let me know if you need the endpoint specs', time: '9:15 AM', isOwn: true },
        { id: 'm7', sender: 'Rahul Verma', text: 'The API integration is complete', time: '11:30 AM', isOwn: false },
      ],
    },
    {
      id: 'c3',
      name: 'Priya Patel',
      avatar: 'PP',
      avatarColor: 'bg-pink-500',
      lastMessage: 'Can you review the design mockups?',
      time: '3h ago',
      unread: 0,
      online: false,
      messages: [
        { id: 'm8', sender: 'Priya Patel', text: 'Hi! I\'ve completed the UI design for the dashboard', time: '8:00 AM', isOwn: false },
        { id: 'm9', sender: 'You', text: 'Looks great! I love the color scheme', time: '8:30 AM', isOwn: true },
        { id: 'm10', sender: 'Priya Patel', text: 'Can you review the design mockups?', time: '9:45 AM', isOwn: false },
      ],
    },
    {
      id: 'c4',
      name: 'Development Team',
      avatar: 'DV',
      avatarColor: 'bg-green-500',
      lastMessage: 'Sprint planning at 3 PM',
      time: '5h ago',
      unread: 0,
      online: true,
      messages: [
        { id: 'm11', sender: 'Vikash Kumar', text: 'Team, let\'s discuss the sprint goals', time: '7:00 AM', isOwn: false },
        { id: 'm12', sender: 'You', text: 'I\'ll prepare the task breakdown', time: '7:30 AM', isOwn: true },
        { id: 'm13', sender: 'Vikash Kumar', text: 'Sprint planning at 3 PM', time: '8:00 AM', isOwn: false },
      ],
    },
    {
      id: 'c5',
      name: 'Sneha Gupta',
      avatar: 'SG',
      avatarColor: 'bg-amber-500',
      lastMessage: 'Thanks for the feedback!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 'm14', sender: 'Sneha Gupta', text: 'I need help with the testing setup', time: 'Yesterday', isOwn: false },
        { id: 'm15', sender: 'You', text: 'Sure, I\'ll walk you through it', time: 'Yesterday', isOwn: true },
        { id: 'm16', sender: 'Sneha Gupta', text: 'Thanks for the feedback!', time: 'Yesterday', isOwn: false },
      ],
    },
  ],
  activeConversation: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
      // Mark as read
      const conv = state.conversations.find((c) => c.id === action.payload);
      if (conv) conv.unread = 0;
    },
    sendMessage: (state, action) => {
      const { conversationId, text } = action.payload;
      const conv = state.conversations.find((c) => c.id === conversationId);
      if (conv) {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        conv.messages.push({
          id: generateId(),
          sender: 'You',
          text,
          time,
          isOwn: true,
        });
        conv.lastMessage = text;
        conv.time = 'Just now';
      }
    },
  },
});

export const { setActiveConversation, sendMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
