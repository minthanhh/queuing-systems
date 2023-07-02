import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { DeviceType } from '../../../types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../configs/firebase.config';
import { Heading, Input } from '../../../components';

const UpdateDevice = () => {
   const { id } = useParams();
   const [device, setDevice] = useState<DeviceType>();

   useEffect(() => {
      if (id) {
         const getDataById = async () => {
            const dSnap = await getDoc(doc(db, 'devices', id));
            setDevice(dSnap.data() as DeviceType);
         };

         getDataById();
      }
   }, [id]);

   const {
      register,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         id: device?.id,
         device: device?.device,
      },
   });

   if (device === undefined) {
      <div> Loading ... </div>;
   }

   return (
      <div className="flex flex-col w-full px-6">
         <Heading label="Quản lý thiết bị" />

         <div className="py-4 px-6 rounded-lg shadow-lg w-full">
            <h5 className="text-primaryColor text-xl font-bold leading-[30px]">
               Thông tin thiết bị
            </h5>
            <div>
               <Input
                  type="text"
                  id="id"
                  label="Mã thiết bị"
                  register={register}
                  errors={errors}
                  defaultValue={device?.id}
                  required
               />
               {/* <input
                  type="text"
                  id="id"
                  defaultValue={device?.id}
                  {...register?.('id', { required: true })}
               /> */}
               <div>
                  <label htmlFor="device">Loại thiết bị:</label>
                  <select
                     id="device"
                     {...register?.('device', { required: true })}
                  >
                     <option value="Kiosk">Kiosk</option>
                     <option value="Display counter">Display counter</option>
                  </select>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateDevice;

{
   /* <select
id="device"
{...register?.('device', { required: true })}
>
<option value="Kiosk">Kiosk</option>
<option value="Display counter">Display counter</option>
</select> */
}
