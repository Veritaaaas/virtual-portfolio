import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;