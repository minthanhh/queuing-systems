import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

import { Heroes, LogoAlta, Warning } from '../assets';
import { Button, Hero, Input } from '../components';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebase.config';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { login } from '../redux/features/userSlice';
import Logo from '../components/Logo/Logo';

const Auth = () => {
   // const currentUser = useAppSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const {
      reset,
      watch,
      register,
      setValue,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         email: '',
         password: '',
      },
      shouldUnregister: true,
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const { email, password } = data;

      await signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const { user } = userCredential;
            if (user && user?.email) {
               setIsLoading(true);
               dispatch(
                  login({
                     id: user.uid,
                     displayName: user.displayName,
                     email: user.email,
                     photoUrl: user.photoURL,
                  })
               );
               navigate('/', { replace: true });
            }
         })
         .catch((err) => {
            console.log(err);
         })
         .finally(() => setIsLoading(false));
   };

   if (isLoading) {
      return <div>Loading ....</div>;
   }

   // if (currentUser) return <Navigate to={'/'} />;
   return (
      <div className="w-full h-full flex flex-row bg-primaryBg">
         <div className="w-4/12">
            <div className="w-[400px] flex flex-col align-center flex-1 mx-auto mt-[82px]">
               <Logo />
               <Input
                  id="email"
                  type="email"
                  label="Tên đăng nhập"
                  placeholder="Vui lòng nhập tên đăng nhập của bạn"
                  register={register}
                  errors={errors}
                  required
               />
               <Input
                  id="password"
                  type="password"
                  label="Mật khẩu"
                  placeholder="Vui lòng nhập mật khẩu"
                  register={register}
                  errors={errors}
                  required
               />
               {errors.email || errors.password ? (
                  <div className="flex items-center gap-1 mb-[19px]">
                     <img className="w-5 h-5" src={Warning} alt="" />
                     <p className="text-red-500 font-normal text-sm leading-5">
                        Sai mật khẩu hoặc tên đăng nhập
                     </p>
                  </div>
               ) : (
                  <Link
                     to={'/forgot-password'}
                     className="text-red-500 text-sm font-normal leading-5 mb-[19px]"
                  >
                     Quên mật khẩu?
                  </Link>
               )}

               <Button onSubmit={handleSubmit(onSubmit)} label="Đăng nhập" />
               {(errors.email || errors.password) && (
                  <Link
                     to={'/forgot-password'}
                     className="text-red-500 mt-[8px] mx-auto text-sm font-normal leading-5 mb-[19px]"
                  >
                     Quên mật khẩu?
                  </Link>
               )}
            </div>
         </div>
         <Hero />
      </div>
   );
};

export default Auth;
