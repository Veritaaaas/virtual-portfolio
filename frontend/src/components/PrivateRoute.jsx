import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;