import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return isAuthenticated ? <Dashboard /> : <Login />;
}

export default App;
