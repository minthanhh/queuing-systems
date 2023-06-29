import { useAppSelector } from '../hooks/storeHooks';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
   const currentUser = useAppSelector((state) => state.user);
   return currentUser ? <Outlet /> : <Navigate to={'/auth'} />;
};

export default Protected;
