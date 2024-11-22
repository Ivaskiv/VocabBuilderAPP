import { Navigate } from 'react-router-dom';
import { useAuth } from '../../infrastructure/hooks/useAuth.js';

const PrivateRoute = ({ element, redirectTo = '/' }) => {
  const { isLogin, isRefreshing } = useAuth();
  const shouldRedirect = !isLogin && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : element;
};

export default PrivateRoute;
