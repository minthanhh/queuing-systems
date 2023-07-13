import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { auth } from '@/configs/firebase.config';
import { Button, Hero, Input, Logo } from '@/components';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
   const [sendEmail, setSendEmail] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         email: '',
      },
      shouldUnregister: true,
   });

   const sendResetToUserEmail = async (email: string) => {
      return await sendPasswordResetEmail(auth, email);
   };

   const onSumit: SubmitHandler<FieldValues> = (data) => {
      setSendEmail(true);

      sendResetToUserEmail(data.email)
         .then(() => {
            setSendEmail(false);
            toast.success('Thành công! vui lòng kiểm tra Email của bạn.');
            reset();
         })
         .catch((err) => {
            toast.error('Người dùng không tồn tại');
            setSendEmail(false);
            reset();
         });
   };

   return (
      <div className="w-full h-full flex flex-row bg-primaryBg">
         <div className="w-4/12">
            <div className="w-[400px] flex flex-col align-center flex-1 mx-auto mt-[82px]">
               <Logo />

               <h3 className="text-[#282739] leading-[33px] text-[22px] font-bold mb-4 text-center">
                  Đặt lại mật khẩu
               </h3>
               <Input
                  errors={errors}
                  type="email"
                  id="email"
                  register={register}
                  placeholder="email"
                  label="Vui lòng nhập email để đặt lại mật khẩu của bạn"
                  required
               />

               <div className="mt-10 flex items-center gap-[24px]">
                  <Link to={'/login'}>
                     <Button label="Hủy" outline />
                  </Link>
                  <Button
                     label="Tiếp tục"
                     onClick={handleSubmit(onSumit)}
                     disabled={sendEmail}
                  />
               </div>
            </div>
         </div>
         <Hero />
      </div>
   );
};

export default ForgotPassword;
