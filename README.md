# Project M. — Modern Kanban Task Dashboard

A high-performance, real-time task management dashboard built with React 19, Node.js, and Socket.IO. Project M. provides a seamless, collaborative experience for teams to manage projects using a Kanban board, messaging system, and member management.

![Project Preview](https://github.com/Vikash9546/ToDo-Dash/raw/main/preview.png)

## 🚀 Key Features

### 1. Advanced Board & Task Management
- **Dynamic Kanban Board:** Seamlessly manage tasks across `To Do`, `On Progress`, and `Done` columns.
- **Drag-and-Drop:** Intuitive task movement powered by `@dnd-kit`.
- **Task Lifecycle:** Create, edit, delete, and prioritize tasks with metadata (assignees, comments, files).

### 2. Real-time Collaboration
- **Live Sync:** Broadcast task updates and movements instantly using **Socket.IO**.
- **Collaborative Messaging:** Internal messaging system for team communication.
- **Active User Tracking:** Monitor team presence and activity in real-time.

### 3. Modern UI/UX
- **Design System:** Pixel-perfect dashboard layout matching Figma specifications.
- **Theming:** Full support for **Dark Mode**, **Light Mode**, and **System Preferences**.
- **Responsive Design:** Fluid layouts optimized for desktop and mobile browsers.

### 4. Security & Performance
- **JWT Authentication:** Secure login system with encrypted Access and Refresh tokens (jose).
- **Session Persistence:** Persistent state management using Redux Toolkit and Redux Persist.
- **Optimized Assets:** Lightning-fast builds and HMR (Hot Module Replacement) with Vite.

## 🛠️ Tech Stack

### Frontend
- **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State:** [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Interactions:** [@dnd-kit](https://dndkit.com/) (Drag & Drop)

### Backend
- **Server:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Real-time:** [Socket.IO](https://socket.io/)
- **Security:** [Jose](https://github.com/panva/jose) (JWT)

---

## 🏃 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Setup & Run

#### Backend
```bash
cd backend
npm install
npm start
```
*Server runs on `http://localhost:4000`*

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
*App runs on `http://localhost:5173`*

---

## 📂 Project Structure

```text
├── backend/
│   ├── server.js        # Express + Socket.IO server logic
│   └── package.json     # Backend dependencies
└── frontend/
    ├── src/
    │   ├── components/  # React components (Kanban, Sidebar, etc.)
    │   ├── store/       # Redux Slices & Persistent Middleware
    │   ├── utils/       # API calling & JWT logic
    │   └── App.jsx      # Main application router & theme provider
    ├── index.css        # Tailwind CSS imports & global styles
    └── vite.config.js   # Vite configuration
```

---

## 🧠 Approach & Design Decisions

Project M. was designed with a focus on real-time responsiveness and a premium desktop-class user experience.

- **State Sync Architecture:** Instead of traditional REST polling, we use a hybrid approach. Initial state is loaded via Redux Persist (local), while live updates (task moves, edits) are broadcasted via **Socket.IO** middleware. This ensures that even with multiple tabs open, the board remains perfectly synchronized.
- **Component Decomposition:** The UI is split into highly modular components (e.g., `KanbanBoard`, `TaskColumn`, `TaskCard`) to prevent unnecessary re-renders. We use **Tailwind CSS v4**'s advanced utility classes for a sleek, glassmorphic design system.
- **Authentication Lifecycle:** Security is handled via a **JWT Access/Refresh token pattern**. Tokens are managed in an ephemeral Redux state with persistence for non-sensitive UI preferences (theme, language).
- **Drag-and-Drop UX:** We implemented `@dnd-kit` for its superior accessibility support and performance compared to older libraries, allowing for snappy interactions even with hundreds of tasks.

## 📝 Assumptions

1. **Local Development Environment:** It is assumed that the user has **Node.js v18+** and a modern browser (Chrome/Edge/Safari/Firefox) that supports CSS Grid and Flexbox.
2. **Persistence:** The application relies on `localStorage` via Redux Persist for maintaining session data and UI preferences locally.
3. **Demo Credentials:** For initial testing, the backend uses a hardcoded user database (`palak@example.com` / `password123`) to demonstrate the JWT flow without requiring a dedicated database setup.
4. **Network:** It is assumed that port `4000` (Backend) and `5173` (Frontend) are available on the local machine for the services to bind correctly.
