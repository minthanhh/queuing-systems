import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from '../../../hooks/storeHooks';
import { Button, Heading, Input } from '../../../components';
import { DeviceType } from '../../../types';
import { createDevice } from '../../../redux/slices/deviceSlice';

const AddDevice = () => {
   const dispatch = useAppDispatch();

   const {
      register,
      setValue,
      reset,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         id: '',
         name: '',
         addressIP: '',
         device: '',
         services: '',
         password: '',
         username: '',
      },
   });

   const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
         shouldDirty: true,
         shouldValidate: true,
         shouldTouch: true,
      });
   };

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      dispatch(createDevice(data as DeviceType));
      reset();
   };

   return (
      <div className="flex w-full">
         <div className="px-6 mt-4 flex-1">
            <Heading label="Quản lý thiết bị" />

            <div className="px-6 pt-4 rounded-2xl shadow-lg bg-white">
               <h6 className="mb-5 text-primaryColor font-bold text-xl leading-[30px]">
                  Thông tin thiết bị
               </h6>
               <div className="flex gap-6">
                  <div className="w-2/4">
                     <Input
                        type="text"
                        id="id"
                        placeholder="Nhập mã thiết bị"
                        label="Mã thiết bị:"
                        register={register}
                        errors={errors}
                        required
                     />
                  </div>
                  <div className="w-2/4">
                     <label htmlFor="device" className="mb-1">
                        Loại thiết bị <sup className="text-red-500">*</sup>
                     </label>
                     <Select
                        placeholder={'Chọn lại thiết bị'}
                        id="device"
                        isSearchable={false}
                        isClearable
                        classNames={{
                           control: () => 'shadow-lg rounded-lg border-2',
                           valueContainer: () => 'pt-[10px] pl-3 py-3',
                           input: () => 'm-0',
                        }}
                        onChange={(value) =>
                           setCustomValue('device', value?.label)
                        }
                        options={[
                           { label: 'Kiosk' },
                           { label: 'Display counter' },
                        ]}
                     />
                  </div>
               </div>
               <div className="flex gap-6">
                  <Input
                     type="text"
                     id="name"
                     placeholder="Nhập tên thiết bị"
                     label="Tên thiết bị:"
                     register={register}
                     errors={errors}
                     required
                  />
                  <Input
                     type="text"
                     id="username"
                     placeholder="Nhập tài khoản"
                     label="Tên đăng nhập:"
                     register={register}
                     errors={errors}
                     required
                  />
               </div>
               <div className="flex gap-6">
                  <Input
                     type="text"
                     id="addressIP"
                     placeholder="Nhập địa chỉ IP"
                     label="Địa chỉ IP:"
                     register={register}
                     errors={errors}
                     required
                  />
                  <Input
                     type="password"
                     id="password"
                     placeholder="Nhập mật khẩu"
                     label="Mật khẩu:"
                     register={register}
                     errors={errors}
                     required
                  />
               </div>
               <Input
                  type="text"
                  id="services"
                  placeholder="Nhập dịch vụ sử dụng"
                  label="Dịch vụ sử dụng:"
                  register={register}
                  errors={errors}
                  required
               />
               <p className="font-normal text-sm leading-5 pb-[92px]">
                  <sup className="text-red-500">*</sup> Là trường thông tin bắt
                  buộc
               </p>
            </div>

            <div className="mt-6 flex items-center gap-8 justify-center">
               <Link to={'/devices'}>
                  <Button label="Hủy" outline />
               </Link>
               <Button
                  label="Thêm thiết bị"
                  onSubmit={handleSubmit(onSubmit)}
               />
            </div>
         </div>
      </div>
   );
};

export default AddDevice;
