import { useTypedSelector } from '../redux/store';

export const useAuth = () => {
  const isRefreshing = useTypedSelector(state => state.auth.isRefreshing);
  const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn);
  const user = useTypedSelector(state => state.auth.user);

  return {
    isRefreshing,
    isLoggedIn,
    user,
  };
};
