import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { DeviceType } from '../../../types';
import { Heading, Input } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { RootState } from '../../../redux/store';
import { getDevices } from '../../../redux/slices/deviceSlice';
import { CloseIcon } from '../../../assets';

const UpdateDevice = () => {
   const { deviceId } = useParams();
   const [device, setDevice] = useState<DeviceType>();
   const { devices } = useAppSelector((state: RootState) => state.device);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (deviceId && devices.length > 0) {
         const device = devices.filter((device) => device.uid === deviceId);
         setDevice(device[0]);
      } else {
         dispatch(getDevices());
      }
   }, [deviceId, dispatch, devices]);

   const {
      register,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: devices,
   });

   if (device === undefined) {
      <div> Loading ... </div>;
   }

   return (
      <div className="flex flex-col w-full px-6">
         <Heading label="Quản lý thiết bị" />

         <div className="py-4 px-6 rounded-lg shadow-lg w-full bg-white">
            <h5 className="text-primaryColor text-xl font-bold leading-[30px]">
               Thông tin thiết bị
            </h5>
            <div className="flex flex-col w-full">
               <div className="md:flex gap-6">
                  <Input
                     type="text"
                     label="Mã thiết bị:"
                     id="id"
                     placeholder="Nhập mã thiết bị"
                     register={register}
                     defaultValue={device?.id}
                     errors={errors}
                     required
                  />
               </div>

               <div className="md:flex gap-6">
                  <Input
                     type="phone"
                     label="Tên thiết bị:"
                     id="phone"
                     placeholder="Nhập tên thiết bị"
                     register={register}
                     defaultValue={device?.name}
                     errors={errors}
                     required
                  />
                  <Input
                     type="text"
                     label="Tên đăng nhập:"
                     id="username"
                     placeholder="Nhập tài khoản"
                     register={register}
                     defaultValue={device?.username}
                     errors={errors}
                     required
                  />
               </div>

               <div className="md:flex gap-6">
                  <Input
                     type="text"
                     label="Địa chỉ IP:"
                     id="addressIP"
                     placeholder="Nhập địa chỉ IP"
                     register={register}
                     defaultValue={device?.addressIP}
                     errors={errors}
                     required
                  />
                  <Input
                     type="password"
                     label="Mật khẩu:"
                     id="password"
                     placeholder="Nhập mật khẩu"
                     register={register}
                     defaultValue={device?.password}
                     errors={errors}
                     required
                  />
               </div>

               <div className="w-full">
                  <label htmlFor="services">Dịch vụ sử dụng:</label>
                  <div className="w-full rounded-lg">
                     <div className="flex items-center gap-[15px]">
                        {Array.isArray(device?.services) &&
                           device?.services.map((service) => (
                              <div
                                 key={service}
                                 className="w-max px-3 py-[4.5px] flex items-center gap-[10px] bg-[#ffac6a] rounded-lg"
                              >
                                 <span className="text-white font-bold text-sm leading-[19px]">
                                    {service}
                                 </span>
                                 <img src={CloseIcon} alt="" />
                              </div>
                           ))}
                     </div>
                  </div>
               </div>
            </div>

            <p className="font-normal text-sm leading-5 md:mt-6 md:mb-0 mb-5 mt-[10px] ">
               <sup className="text-red-500">*</sup> Là trường thông tin bắt
               buộc
            </p>
         </div>
      </div>
   );
};

export default UpdateDevice;
