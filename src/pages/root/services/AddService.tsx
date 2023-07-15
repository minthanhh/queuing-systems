import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { Button, Heading, Input } from '@/components';
import { ServiceType } from '@/types';
import { useAppDispatch } from '@/hooks/storeHooks';
import { addService } from '@/redux/slices/serviceSlice';

const AddService = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [{ prefix, surfix }, setPrefixOrSurfix] = useState({
      prefix: false,
      surfix: false,
   });
   const dispatch = useAppDispatch();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         id: '',
         name: '',
         description: '',
         from: '0001',
         to: '9999',
         prefix: '',
         surfix: '',
      },
      shouldUnregister: true,
   });

   const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setPrefixOrSurfix((prev) => ({ ...prev, [name]: checked }));
   };

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if (data) {
         console.log(data);
         setIsLoading(true);
         dispatch(addService(data as ServiceType))
            .then(() => {
               setIsLoading(false);
               toast.success('Dịch vụ đã được thêm thành công');
            })
            .catch((err) => {
               toast.error(err);
               setIsLoading(false);
            });
      }
   };

   return (
      <div className="px-6">
         <Heading label="Quản lý dịch vụ" />

         <div className="bg-white rounded-lg shadow-lg px-6 py-4">
            <h2 className="text-primaryColor font-bold text-xl leading-[30px] mb-3">
               Thông tin dịch vụ
            </h2>
            <div className="md:flex gap-6 w-full mb-4">
               <div className="flex flex-col w-full md:w-2/4">
                  <Input
                     label="Mã dịch vụ:"
                     id="id"
                     errors={errors}
                     placeholder="201"
                     register={register}
                     required
                     className="mb-3"
                  />
                  <Input
                     label="Tên dịch vụ:"
                     id="name"
                     errors={errors}
                     placeholder="Khám tim mạch"
                     register={register}
                     required
                     className="m-0"
                  />
               </div>
               <div className="w-full md:w-2/4 flex flex-1 flex-col">
                  <label
                     htmlFor="description"
                     className="font-semibold text-base leading-6"
                  >
                     Mô tả:
                  </label>
                  <div
                     className={twMerge(
                        `w-full outline-none border-2 shadow-md rounded-lg md:overflow-y-hidden resize-none md:flex-1 transition-all ease-out overflow-hidden duration-100 relative focus-within:border-primaryColor`,
                        errors['description']
                           ? 'border-red-500'
                           : 'border-borderGray'
                     )}
                  >
                     <textarea
                        className={
                           'w-full h-full outline-none border-none px-3 py-[10px] md:overflow-y-hidden resize-none md:flex-1'
                        }
                        id="description"
                        placeholder="Mô tả dịch vụ"
                        {...register?.('description', { required: true })}
                     ></textarea>

                     {errors['description'] && (
                        <span className="absolute bottom-[10px] right-[15px] text-red-500 select-none">
                           Vui lòng nhập trường này
                        </span>
                     )}
                  </div>
               </div>
            </div>
            <h2 className="text-primaryColor font-bold text-xl leading-[30px] mb-3">
               Quy tắc cấp số
            </h2>

            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-[15px] select-none">
                  <div className="flex items-center gap-1 group">
                     <input
                        id="autoIncrease"
                        type="checkbox"
                        className="group-hover:cursor-not-allowed"
                        disabled
                        checked
                     />
                     <label
                        htmlFor="autoIncrease"
                        className="group-hover:cursor-pointer font-semibold text-base leading-6"
                     >
                        Tăng tự động từ:
                     </label>
                  </div>
                  <div className="flex gap-4 items-center">
                     <input
                        type="number"
                        className={twMerge(
                           'border-2 w-20 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]'
                        )}
                        {...register?.('from', {
                           required: true,
                        })}
                     />
                     <span className="font-semibold text-base leading-6">
                        đến
                     </span>
                     <input
                        type="number"
                        className={twMerge(
                           'border-2 w-20 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]'
                        )}
                        {...register?.('to', { required: true })}
                     />
                  </div>
               </div>
               <div className="flex items-center gap-[15px]">
                  <div className="flex items-center gap-1 select-none group">
                     <input
                        id="prefixLabelId"
                        type="checkbox"
                        name="prefix"
                        onChange={handleCheckBox}
                        className={twMerge(
                           'group-hover:cursor-pointer',
                           surfix
                              ? 'checbox group-hover:cursor-not-allowed'
                              : ''
                        )}
                        disabled={surfix}
                     />
                     <label
                        htmlFor="prefixLabelId"
                        className={twMerge(
                           'group-hover:cursor-pointer font-semibold text-base leading-6',
                           surfix
                              ? 'checbox group-hover:cursor-not-allowed'
                              : ''
                        )}
                     >
                        Prefix:
                     </label>
                  </div>
                  <div className="flex gap-4 items-center">
                     <input
                        id="prefix"
                        type="number"
                        className={twMerge(
                           'border-2 w-20 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261] transition-all ease-out duration-75',
                           !prefix ? 'cursor-not-allowed' : '',
                           errors['prefix'] ? 'border-red-500' : ''
                        )}
                        {...register?.('prefix', {
                           required: prefix,
                        })}
                        disabled={!prefix}
                     />
                  </div>
               </div>
               <div className="flex items-center gap-[15px]">
                  <div className="group flex items-center gap-1 select-none">
                     <input
                        className={twMerge(
                           'group-hover:cursor-pointer transition-all ease-out duration-75',
                           prefix
                              ? 'checbox group-hover:cursor-not-allowed'
                              : ''
                        )}
                        id="surfixLabelId"
                        type="checkbox"
                        name="surfix"
                        onChange={handleCheckBox}
                        disabled={prefix}
                     />
                     <label
                        htmlFor="surfixLabelId"
                        className={twMerge(
                           'group-hover:cursor-pointer font-semibold text-base leading-6',
                           prefix
                              ? 'checbox group-hover:cursor-not-allowed'
                              : ''
                        )}
                     >
                        Surfix:
                     </label>
                  </div>
                  <div className="flex gap-4 items-center">
                     <input
                        type="number"
                        id="surfix"
                        className={twMerge(
                           'border-2 w-20 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261] transition-all ease-out duration-75',
                           !surfix ? 'disabled:cursor-not-allowed' : '',
                           errors['surfix'] ? 'border-red-500' : ''
                        )}
                        {...register?.('surfix', { required: surfix })}
                        disabled={!surfix}
                     />
                  </div>
               </div>
               <div className="flex items-center">
                  <div className="flex items-center gap-1">
                     <input type="checkbox" />
                     <span className="font-semibold text-base leading-6">
                        Reset mỗi ngày
                     </span>
                  </div>
               </div>
            </div>

            <p className="font-normal text-sm leading-5 mt-6">
               <sup className="text-red-500">*</sup> Là trường thông tin bắt
               buộc
            </p>
         </div>

         <div className="mt-6 flex items-center gap-8 justify-center">
            <Link to={'/services'}>
               <Button label="Hủy" outline />
            </Link>
            <Button
               label="Thêm thiết bị"
               onSubmit={handleSubmit(onSubmit)}
               disabled={isLoading}
            />
         </div>
      </div>
   );
};

export default AddService;
