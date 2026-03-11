# Creative Upaay - Task Dashboard

A full-stack task management dashboard implementing all **Level 1** requirements of the Creative Upaay assignment, including the bonus Drag & Drop feature.

## Tech Stack

- **Framework:** React 19 (Vite)
- **UI:** Tailwind CSS v4
- **State Management:** Redux Toolkit + Redux Persist
- **Storage:** Local Storage (state persistence)
- **Drag & Drop:** @dnd-kit

## Level 1 Features Implemented

### 1. UI Implementation
- Dashboard layout matching the Figma design:
  - **Left Sidebar:** Navigation (Home, Messages, Tasks, Members, Settings), MY PROJECTS list, Thoughts Time card
  - **Top Header:** Search bar, calendar/help/notifications, user profile (Palak Jain)
  - **Main Content:** Mobile App project header, Kanban board with 3 columns

### 2. Task Management
- **Add Task:** Use the `+` button on any column to add tasks with dynamic title and description
- **Move Tasks:** Drag and drop tasks between columns (To Do ↔ On Progress ↔ Done)

### 3. Filtering
- **Filter by Priority:** Low, High, Completed (via Filter dropdown)
- **Search:** Filter tasks by title or description using the search bar

### 4. State Management
- **Redux:** All tasks and filter state managed via Redux Toolkit
- **Local Storage:** State persists across page refreshes via redux-persist

### 5. Drag and Drop (Bonus)
- Full drag-and-drop support using @dnd-kit
- Drag tasks between columns to change status
- Visual feedback during drag (dotted outline, column highlight)

## Run the Project

```bash
npm install
npm run dev
```


## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx      # Left navigation & projects
│   ├── Header.jsx       # Top search & user area
│   ├── KanbanBoard.jsx  # Main board with filter & columns
│   ├── TaskColumn.jsx   # Droppable column (To Do, On Progress, Done)
│   ├── TaskCard.jsx     # Draggable task card
│   └── AddTaskModal.jsx # Modal to add new tasks
├── store/
│   ├── index.js         # Redux store + persist config
│   └── tasksSlice.js    # Tasks state, actions, selectors
├── App.jsx
├── main.jsx
└── index.css
```
