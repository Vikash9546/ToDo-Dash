# Project M. - ToDo Dashboard

A modern, feature-rich task management dashboard built with React.js, Redux, and Tailwind CSS. This project replicates a Figma design and includes comprehensive task management features.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-green)
![React](https://img.shields.io/badge/React-18-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-Latest-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-teal)

## 🚀 Features

### Level 1 (Core Features)
- **Dashboard UI**: Pixel-perfect recreation of the Figma design with sidebar, header, and three-column Kanban board
- **Task Management**: Add, edit, and delete tasks with dynamic names and descriptions
- **Move Tasks**: Move tasks between columns (To Do → In Progress → Done)
- **Drag & Drop**: Full drag-and-drop functionality using `@hello-pangea/dnd`
- **Task Filtering**: Filter tasks by priority, category, due date, and search text
- **Redux State Management**: Centralized state management with Redux Toolkit
- **LocalStorage Persistence**: Tasks and state persist across page refreshes

### Level 2 (Advanced Features)
- **JWT Authentication**: Login/Register with JWT-like token-based authentication
- **Due Date & Reminders**: Visual due date warnings with color-coded alerts for overdue and upcoming tasks
- **Subtasks**: Nested subtask management within each task with progress tracking
- **Customizable Task Fields**: Custom fields (priority levels, tags) for flexible workflows
- **Activity Log**: Detailed activity log for each task capturing all changes, status updates, and actions

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React.js** | UI Framework |
| **Redux Toolkit** | State Management |
| **Tailwind CSS v4** | Styling |
| **@hello-pangea/dnd** | Drag & Drop |
| **date-fns** | Date manipulation |
| **react-icons** | Icon library |
| **Vite** | Build tool |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Vikash9546/ToDo-Dash.git

# 2. Navigate to the project directory
cd ToDo-Dash

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open in browser
# Visit http://localhost:5173
```

### Demo Credentials
- **Email**: `palak@example.com`
- **Password**: `password123`

## 📁 Project Structure

```
ToDo-Dash/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Header.jsx         # Top header with search
│   │   ├── FilterBar.jsx      # Filter controls & project header
│   │   ├── TaskColumn.jsx     # Individual column (droppable)
│   │   ├── TaskCard.jsx       # Task card component (draggable)
│   │   └── AddTaskModal.jsx   # Add/Edit task modal
│   ├── pages/
│   │   ├── Dashboard.jsx      # Main dashboard page
│   │   └── Login.jsx          # Authentication page
│   ├── store/
│   │   ├── store.js           # Redux store configuration
│   │   ├── taskSlice.js       # Task state management
│   │   ├── authSlice.js       # Authentication state
│   │   └── filterSlice.js     # Filter state
│   ├── utils/
│   │   ├── auth.js            # JWT auth utilities
│   │   └── localStorage.js    # Persistence utilities
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎯 Approach & Design Decisions

### State Management
- Used **Redux Toolkit** for clean, predictable state management
- State is persisted to **localStorage** with debounced saving (300ms) to prevent excessive writes
- Separate slices for tasks, authentication, and filters for better organization

### Authentication
- Implemented a client-side JWT-like authentication system
- Tokens have a 24-hour expiry
- User data persists across sessions via localStorage

### Drag & Drop
- Used `@hello-pangea/dnd` (maintained fork of `react-beautiful-dnd`) for drag-and-drop
- Tasks can be reordered within columns and moved between columns
- Visual feedback with rotation and shadow effects during drag

### Filtering
- Multi-criteria filtering: search text, priority, category, and due date range
- Filters are applied using `useMemo` for performance optimization
- Search works across task titles, descriptions, and categories

### Due Date & Reminders
- Tasks with due dates within 2 days show a yellow "Due soon!" warning
- Overdue tasks display a red animated "Past due date!" alert
- Visual border indicators for urgency

### Subtasks
- Each task can have nested subtasks
- Progress bar shows completion percentage
- Toggle and delete subtasks from the edit modal

### Activity Log
- Every action (create, move, edit) is logged with timestamp and user info
- Activity log is viewable in the task edit modal under the "Activity" tab

## 🎨 Design Accuracy

The UI closely matches the provided Figma design:
- **Color Scheme**: Purple (#5030E5) primary, Orange for progress, Green for done
- **Typography**: Inter font family
- **Card Design**: Rounded corners, shadow effects, priority badges
- **Layout**: Responsive sidebar + header + 3-column Kanban board
- **Animations**: Smooth transitions and micro-interactions

## 📝 Assumptions

1. Authentication is client-side only (no backend server) using localStorage
2. Demo data is pre-populated on first load
3. Task images use placeholder URLs from Unsplash
4. The "Share" and "Invite" buttons in the toolbar are decorative (UI only)
5. Custom fields are stored per-task basis

## 🏗️ Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

## 👤 Author

**Vikash Kumar**
- GitHub: [@Vikash9546](https://github.com/Vikash9546)
