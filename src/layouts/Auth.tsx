import { Login } from '../pages';
import { Navigate } from 'react-router-dom';

const Auth = () => {
   const isAuthenticated = JSON.parse(
      localStorage.getItem('isAuthenticated') as string
   );

   return isAuthenticated ? <Navigate to={'/'} replace /> : <Login />;
};

export default Auth;
