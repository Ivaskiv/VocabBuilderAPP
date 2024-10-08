import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const RestrictedRoute = ({ component, redirectTo }) => {
  const { isLogin } = useAuth();

  return !isLogin ? component : <Navigate to={redirectTo} />;
};

export default RestrictedRoute;
