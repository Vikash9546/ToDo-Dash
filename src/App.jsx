import { useRef, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { validateSession } from './store/authSlice';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import ScrollButtons from './components/ScrollButtons';
import MessagesPage from './components/MessagesPage';
import TasksPage from './components/TasksPage';
import MembersPage from './components/MembersPage';
import SettingsPage from './components/SettingsPage';

function Dashboard() {
  const mainScrollRef = useRef(null);
  const activeNav = useSelector((state) => state.ui?.activeNav) || 'Home';

  const renderPage = () => {
    switch (activeNav) {
      case 'Messages':
        return <MessagesPage />;
      case 'Tasks':
        return <TasksPage />;
      case 'Members':
        return <MembersPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <KanbanBoard />;
    }
  };

  // Messages page uses its own full-height layout
  const isFullHeight = activeNav === 'Messages';

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        <Header />
        <main
          ref={mainScrollRef}
          className={`flex-1 min-h-0 ${isFullHeight ? '' : 'overflow-y-auto overflow-x-hidden'}`}
        >
          {renderPage()}
        </main>
        {!isFullHeight && <ScrollButtons scrollContainerRef={mainScrollRef} />}
      </div>
    </div>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated, isValidating } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(validateSession());
  }, [dispatch]);

  if (isValidating) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8f7ff] text-slate-500">
        Validating session...
      </div>
    );
  }

  if (!isAuthenticated) return <Login />;
  return <Dashboard />;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="h-screen flex items-center justify-center bg-[#f8f7ff] text-slate-500">
            Loading...
          </div>
        }
        persistor={persistor}
      >
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
