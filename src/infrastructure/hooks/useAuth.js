import { useSelector } from 'react-redux';
import {
  selectIsLogin,
  selectIsRefreshing,
  selectAuthUser,
} from '../../features/auth/authSlice.js';

export const useAuth = () => {
  const isLogin = useSelector(selectIsLogin);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectAuthUser);
  console.log('useAuth hook:', { isLogin, isRefreshing, user });

  return {
    isLogin,
    isRefreshing,
    user,
  };
};
export default useAuth;
