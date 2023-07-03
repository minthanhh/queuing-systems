import { Link, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Button, Heading, Input } from '../../../../components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks';
import { RootState } from '../../../../redux/store';
import { IRole } from '../../../../types';
import { getRoles } from '../../../../redux/slices/roleSlice';

const UpdateRole = () => {
   const [role, setRole] = useState<IRole>();
   const { roleId } = useParams();
   const { roles } = useAppSelector((state: RootState) => state.role);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (roleId && roles.length > 0) {
         const role = roles.filter((role) => role.uid === roleId);
         setRole(role[0]);
      } else {
         dispatch(getRoles());
      }
   }, [roleId, roles, dispatch]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         roleName: role?.roleName,
         description: role?.description,
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log(data);
   };

   return (
      <div className="px-6 mt-4 my-8 w-full">
         <Heading label="Danh sách vai trò" className="mb-8" />

         <div className="bg-white rounded-lg shadow-lg px-6 py-4">
            <h5 className="text-primaryColor text-bold leading-[30px] text-xl mb-3">
               Thông tin vai trò
            </h5>

            <div className="md:flex items-start flex-1 w-full gap-6">
               <div className="md:w-2/4 w-full">
                  <Input
                     id="roleName"
                     label="Tên vai trò"
                     placeholder="Nhập tên vai trò"
                     register={register}
                     errors={errors}
                     defaultValue={role?.roleName}
                     required
                  />
                  <div className="w-full">
                     <label
                        htmlFor="description"
                        className="font-semibold text-base leading-6"
                     >
                        Mô tả:
                     </label>
                     <div
                        className={twMerge(
                           `w-full outline-none border-2 shadow-md rounded-lg md:overflow-y-hidden resize-none md:flex-1 transition-all ease-out overflow-hidden duration-100 relative h-[160px] focus-within:border-primaryColor`,
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
                           defaultValue={role?.description}
                        ></textarea>

                        {errors['description'] && (
                           <span className="absolute bottom-[10px] right-[15px] text-red-500 select-none">
                              Vui lòng nhập trường này
                           </span>
                        )}
                     </div>
                  </div>

                  <p className="font-normal text-sm leading-5 md:mt-6 md:mb-0 mb-5 mt-[10px] ">
                     <sup className="text-red-500">*</sup> Là trường thông tin
                     bắt buộc
                  </p>
               </div>
               <div className="w-full md:w-2/4">
                  <label className="font-semibold text-base leading-6 mb-2">
                     Phân quyền chức năng <sup className="text-red-500">*</sup>
                  </label>
                  <div className="bg-[#fff2e7] rounded-lg px-6 pt-4 py-8 shadow-sm">
                     <div className="flex flex-col gap-3 mb-6">
                        <h5 className="text-xl text-primaryColor font-bold leading-[30px]">
                           Nhóm chức năng A
                        </h5>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="a-all"
                           />
                           <label
                              htmlFor="a-all"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Tất cả
                           </label>
                        </div>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="a-x"
                           />
                           <label
                              htmlFor="a-x"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Chức năng x
                           </label>
                        </div>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="a-y"
                           />
                           <label
                              htmlFor="a-y"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Chức năng y
                           </label>
                        </div>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="a-z"
                           />
                           <label
                              htmlFor="a-z"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Chức năng z
                           </label>
                        </div>
                     </div>
                     <div className="flex flex-col gap-3">
                        <h5 className="text-xl text-primaryColor font-bold leading-[30px]">
                           Nhóm chức năng B
                        </h5>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="b-all"
                           />
                           <label
                              htmlFor="b-all"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Tất cả
                           </label>
                        </div>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="b-x"
                           />
                           <label
                              htmlFor="b-x"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Chức năng x
                           </label>
                        </div>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="b-y"
                           />
                           <label
                              htmlFor="b-y"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Chức năng y
                           </label>
                        </div>

                        <div className="flex items-center gap-2">
                           <input
                              type="checkbox"
                              className="outline-none"
                              id="b-z"
                           />
                           <label
                              htmlFor="b-z"
                              className="leading-6 text-base font-semibold select-none cursor-pointer"
                           >
                              Chức năng z
                           </label>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex gap-6 items-center justify-center mt-6">
            <Link to={'/manager-roles'}>
               <Button outline label="Hủy bỏ" />
            </Link>
            <Button onSubmit={handleSubmit(onSubmit)} label="Thêm" />
         </div>
      </div>
   );
};

export default UpdateRole;
