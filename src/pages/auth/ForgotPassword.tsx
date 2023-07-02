import { useForm, FieldValues } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Button, Hero, Input, Logo } from '../../components';
import { useCallback, useState } from 'react';
import { auth } from '../../configs/firebase.config';

const ForgotPassword = () => {
   const navigate = useNavigate();
   const [sendEmail, setSendEmail] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         email: '',
      },
      shouldUnregister: true,
   });

   const handleBackToLogin = useCallback(() => {
      navigate('/auth', { replace: true });
   }, [navigate]);

   const handleResetPassword = useCallback(() => {
      handleSubmit(async (data: FieldValues) => {
         const { email } = data;

         try {
            await sendPasswordResetEmail(auth, email);
            setSendEmail(true);
         } catch (err) {
            console.log(err);
         }
      })();
   }, [handleSubmit]);

   return (
      <div className="w-full h-full flex flex-row bg-primaryBg">
         <div className="w-4/12">
            <div className="w-[400px] flex flex-col align-center flex-1 mx-auto mt-[82px]">
               <Logo />
               {sendEmail ? (
                  <>
                     <Input
                        errors={errors}
                        type="password"
                        id="password"
                        register={register}
                        placeholder="password"
                        label="Mật khẩu"
                        required
                     />
                     <Input
                        errors={errors}
                        type="password"
                        id="cofirmPassword"
                        register={register}
                        placeholder="comfirm password"
                        label="Nhập lại mật khẩu"
                        required
                     />
                  </>
               ) : (
                  <>
                     <Input
                        errors={errors}
                        type="email"
                        id="email"
                        register={register}
                        placeholder="email"
                        label="Vui lòng nhập email để đặt lại mật khẩu của bạn"
                        required
                     />
                  </>
               )}

               <div className="mt-10 flex items-center gap-[24px]">
                  {sendEmail ? (
                     <Button label="Xác nhận" onClick={handleBackToLogin} />
                  ) : (
                     <>
                        <Button
                           label="Hủy"
                           outline
                           onClick={handleBackToLogin}
                        />
                        <Button
                           label="Tiếp tục"
                           onClick={handleResetPassword}
                        />
                     </>
                  )}
               </div>
            </div>
         </div>
         ;
         <Hero />
      </div>
   );
};

export default ForgotPassword;
