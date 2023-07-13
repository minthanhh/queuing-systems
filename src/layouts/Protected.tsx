import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { login } from '@/redux/slices/userSlice';
import { auth, db } from '@/configs/firebase.config';
import { useAppDispatch } from '@/hooks/storeHooks';
import { ToastContainer } from 'react-toastify';
import { IUser } from '@/types';

const Main = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
         if (user) {
            const snap = await getDoc(doc(db, 'manager-accounts', user.uid));
            if (!snap.exists()) return { message: 'err' };
            const { role, username, password } = snap.data() as IUser;
            dispatch(
               login({
                  email: user.email || '',
                  displayName: user.displayName || '',
                  photoURL: user.photoURL || '',
                  uid: user.uid,
                  username,
                  role,
                  password,
               })
            );
         } else {
            dispatch(login(null));
         }
      });
   }, [dispatch]);

   return (
      <>
         <ToastContainer />
         <Outlet />
      </>
   );
};

export default Main;
