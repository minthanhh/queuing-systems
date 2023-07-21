import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm, Resolver } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';
import { twMerge } from 'tailwind-merge';
import { yupResolver } from '@hookform/resolvers/yup';

import { DropDown } from '@/assets';
import { IAccount, IUserLogs } from '@/types';
import { Button, Heading, Input } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { addAccount } from '@/redux/slices/accountSlice';
import { accountSchema } from '@/helpers/schema';
import { RootState } from '@/redux/store';
import { createUserLog } from '@/redux/slices/userLogsSlice';

const AddAccount = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { profile } = useAppSelector((state: RootState) => state.user);
   const dispatch = useAppDispatch();

   const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         username: '',
         fullName: '',
         phone: '',
         password: '',
         email: '',
         comfirm: '',
         status: '',
         role: '',
      },
      resolver: yupResolver(accountSchema) as Resolver<any, any>,
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      dispatch(addAccount(data as IAccount))
         .unwrap()
         .then(({ username }) => {
            toast.success('Đã thêm thành công tài khoản!');
            setIsLoading(false);
            dispatch(
               createUserLog({
                  username: profile?.username,
                  operations: `Thêm người dùng mới ${username}`,
               } as IUserLogs)
            );
            reset();
         })
         .catch((err: SerializedError) => {
            toast.error(err.message);
            setIsLoading(false);
            reset();
         });
   };

   return (
      <div className="w-full mt-4 px-6">
         <Heading label="Quản lý tài khoản" className="mb-[10px]" />

         <div className="bg-white rounded-lg shadow-md w-full px-6 pt-4 pb-[76px]">
            <h5 className="text-primaryColor font-bold text-xl leading-[30px]">
               Thông tin tài khoản
            </h5>

            <div className="flex flex-col w-full">
               <div className="md:flex gap-6">
                  <Input
                     type="text"
                     label="Họ tên"
                     id="fullName"
                     placeholder="Nhập họ tên"
                     register={register}
                     errors={errors}
                     required
                  />
                  <Input
                     type="text"
                     label="Tên đăng nhập:"
                     id="username"
                     placeholder="Nhập họ tên"
                     register={register}
                     errors={errors}
                     required
                  />
               </div>

               <div className="md:flex gap-6">
                  <Input
                     type="phone"
                     label="Số điện thoại:"
                     id="phone"
                     placeholder="Nhập số điện thoại"
                     register={register}
                     errors={errors}
                     required
                  />
                  <Input
                     type="password"
                     label="Mật khẩu:"
                     id="password"
                     placeholder="Nhập Mật khẩu"
                     register={register}
                     errors={errors}
                     required
                     eyeToggle
                  />
               </div>

               <div className="md:flex gap-6">
                  <Input
                     type="email"
                     label="Email:"
                     id="email"
                     placeholder="Nhập email"
                     register={register}
                     errors={errors}
                     required
                  />
                  <Input
                     type="password"
                     label="Nhập lại mật khẩu:"
                     id="comfirm"
                     placeholder="Nhập lại mật khẩu"
                     register={register}
                     errors={errors}
                     required
                     eyeToggle
                  />
               </div>

               <div className="md:flex gap-6">
                  <div className="flex flex-col gap-2 w-full">
                     <label
                        htmlFor="role"
                        className="text-[#282739] leading-6 text-base font-semibold"
                     >
                        Vai trò
                        <sup className="text-red-500">*</sup>
                     </label>
                     <div
                        className={twMerge(
                           'w-full rounded-lg border-2 flex items-center relative transition-all ease-linear duration-75',
                           errors['role']
                              ? 'border-red-500'
                              : 'border-borderGray'
                        )}
                     >
                        <select
                           className="flex-1 bg-transparent outline-none appearance-none px-3 py-[10px]"
                           id="role"
                           {...register?.('role', { required: true })}
                           placeholder="Chọn vai trò"
                        >
                           <option value="accountant">Kế toán</option>
                           <option value="manager">Quản lý</option>
                           <option value="admin">Admin</option>
                        </select>
                        <img
                           src={DropDown}
                           alt=""
                           className="absolute top-2/4 right-[10px] -translate-y-2/4"
                        />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                     <label
                        htmlFor="status"
                        className="text-[#282739] leading-6 text-base font-semibold"
                     >
                        Tình trạng
                        <sup className="text-red-500">*</sup>
                     </label>
                     <div
                        className={twMerge(
                           'w-full rounded-lg border-2 flex items-center relative transition-all ease-linear duration-75',
                           errors['status']
                              ? 'border-red-500'
                              : 'border-borderGray'
                        )}
                     >
                        <select
                           className="flex-1 bg-transparent outline-none appearance-none px-3 py-[10px]"
                           id="status"
                           {...register?.('status', { required: true })}
                           defaultValue={'active'}
                        >
                           <option value="active">Hoạt động</option>
                           <option value="in-active">Ngưng Hoạt động</option>
                        </select>
                        <img
                           src={DropDown}
                           alt=""
                           className="absolute top-2/4 right-[10px] -translate-y-2/4"
                        />
                     </div>
                  </div>
               </div>
            </div>

            <p className="font-normal text-sm leading-5 md:mt-6 md:mb-0 mb-5 mt-[10px] ">
               <sup className="text-red-500">*</sup> Là trường thông tin bắt
               buộc
            </p>
         </div>

         {errors.password && <div>{errors.password.message as string}</div>}
         {errors.comfirm && <div>{errors.comfirm.message as string}</div>}

         <div className="flex items-center justify-center gap-6 my-6">
            <Link to={'/setting-systems/manager-accounts'}>
               <Button outline label="Hủy bỏ" />
            </Link>
            <Button
               label="Thêm"
               onSubmit={handleSubmit(onSubmit)}
               disabled={isLoading}
            />
         </div>
      </div>
   );
};

export default AddAccount;
