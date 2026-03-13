# Creative Upaay - Task Dashboard

## Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **UI:** Tailwind CSS v4
- **State Management:** Redux Toolkit + Redux Persist
- **Storage:** Local Storage (state persistence)
- **Drag & Drop:** @dnd-kit

### Backend
- **Framework:** Node.js + Express
- **Authentication:** JWT (JSON Web Tokens) via `jose`
- **Real-time Collaboration:** Socket.IO

## Features Implemented

### 1. UI Implementation
- Dashboard layout accurately matching the Figma design:
  - **Left Sidebar:** Navigation links, Projects list, and stylized Thoughts Time card
  - **Top Header:** Search bar, calendar/help/notifications, user profile
  - **Main Content:** Project header, Kanban board with 3 distinct columns including design updates

### 2. Task Management
- **Add Task:** Use the `+` button to dynamically add new tasks
- **Move Tasks:** Full drag and drop functionality allowing users to move tasks between To Do ↔ On Progress ↔ Done seamlessly.

### 3. Filtering
- **Filter by Priority:** Low, High, Completed
- **Search:** Filter tasks by title or description using the interactive search bar

### 4. Authentication & Security
- **JWT Authentication:** Strict email/password user authentication managed securely by the backend logic.
- **Token Refresh Cycle:** Frontend maintains user sessions via encrypted Access and Refresh tokens stored in local memory. 

### 5. Real-time Collaboration (Socket.IO)
- Allows multiple clients to connect to the backend server simultaneously. 
- Actions and changes performed on the board are broadcast and synchronized live across all active user sessions instantly.

## Run the Project

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```
The backend server will run closely on `http://localhost:4000`.

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will spin up the React application. 

## Project Structure

```
.
├── backend/
│   ├── package.json     # Backend Dependencies
│   └── server.js        # Express + Socket.IO Backend Application
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # Core React UI Modules (KanbanBoard, Sidebar, TaskCard, etc.)
    │   ├── store/       # Redux Toolkit slices (authSlice, tasksSlice, etc.)
    │   ├── utils/       # JWT API calling logic
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json     # Frontend Dependencies
    └── vite.config.js
```
