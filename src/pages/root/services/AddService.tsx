import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Heading, Input } from '../../../components';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
const AddService = () => {
   const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         id: '',
         name: '',
         description: '',
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log(data);
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
               <div className="flex items-center gap-[15px]">
                  <div className="flex items-center gap-1">
                     <input type="checkbox" />
                     <span className="font-semibold text-base leading-6">
                        Tăng tự động từ:
                     </span>
                  </div>
                  <div className="flex gap-4 items-center">
                     <input
                        type="number"
                        placeholder="0001"
                        className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                     />
                     <span className="font-semibold text-base leading-6">
                        đến
                     </span>
                     <input
                        type="number"
                        placeholder="9999"
                        className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                     />
                  </div>
               </div>
               <div className="flex items-center gap-[15px]">
                  <div className="flex items-center gap-1">
                     <input type="checkbox" />
                     <span className="font-semibold text-base leading-6">
                        Prefix:
                     </span>
                  </div>
                  <div className="flex gap-4 items-center">
                     <input
                        type="number"
                        placeholder="0001"
                        className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                     />
                  </div>
               </div>
               <div className="flex items-center gap-[15px]">
                  <div className="flex items-center gap-1">
                     <input type="checkbox" />
                     <span className="font-semibold text-base leading-6">
                        Surfix:
                     </span>
                  </div>
                  <div className="flex gap-4 items-center">
                     <input
                        type="number"
                        placeholder="0001"
                        className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
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
            <Button label="Thêm thiết bị" onSubmit={handleSubmit(onSubmit)} />
         </div>
      </div>
   );
};

export default AddService;
