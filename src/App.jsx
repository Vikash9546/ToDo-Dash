import { useRef } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import ScrollButtons from './components/ScrollButtons';

function Dashboard() {
  const mainScrollRef = useRef(null);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        <Header />
        <main
          ref={mainScrollRef}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
        >
          <KanbanBoard />
        </main>
        <ScrollButtons scrollContainerRef={mainScrollRef} />
      </div>
    </div>
  );
}

function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

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
