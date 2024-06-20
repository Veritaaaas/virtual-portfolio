import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Trade from "./components/Trade";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
          <Route path="/trade" element={
          <PrivateRoute>
            <Trade />
          </PrivateRoute>
        } />
        </Routes>
      </Router>

    </>
  );
}

export default App;