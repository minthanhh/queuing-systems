import { useAppSelector } from '../hooks/storeHooks';
import { Login } from '../pages';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const Auth = () => {
   const { profile } = useAppSelector((state: RootState) => state.user);
   return profile ? <Navigate to={'/'} replace /> : <Login />;
};

export default Auth;
