import { Link } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Button, Heading } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { Service, newNumber } from '@/redux/slices/numberSlice';
import { getServices } from '@/redux/slices/serviceSlice';

const NewNumber = () => {
   const [selected, setSelected] = useState('');
   const dispatch = useAppDispatch();
   const { services } = useAppSelector((state: RootState) => state.service);
   const { profile } = useAppSelector((state: RootState) => state.user);

   useEffect(() => {
      if (services.length === 0) {
         dispatch(getServices());
      }
   }, [dispatch, services]);

   const handleChange = (e: SelectChangeEvent) => {
      setSelected(e.target.value as string);
   };

   const { register, handleSubmit } = useForm<FieldValues>({
      defaultValues: {
         serviceId: '',
      },
   });

   const options = services.map((service) => ({
      label: service.name,
      value: service.uid,
   }));

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      if (data) {
         dispatch(
            newNumber({
               ...data,
               email: profile?.email,
               fullName: profile?.displayName,
               phone: profile?.phone,
            } as Service)
         );
      }
   };

   return (
      <div className="mt-4 mb-[42px] px-6 w-full">
         <Heading label="Quản lý cấp số" />
         <div className="bg-white rounded-lg shadow-sm flex-1 flex items-center flex-col w-full h-[500px]">
            <h2 className="uppercase text-primaryColor text-[32px] leading-[48px] font-bold mb-5 mt-6">
               CẤP SỐ MỚI
            </h2>
            <p className="text-xl font-bold leading-[30px] mb-3">
               Dịch vụ khách hàng lựa chọn
            </p>
            <FormControl sx={{ width: '400px', height: '44px' }}>
               <InputLabel id="demo-multiple-name-label">
                  Chọn dịch vụ
               </InputLabel>
               <Select
                  labelId="demo-multiple-name-label"
                  label={'Chọn dịch vụ'}
                  id="serviceId"
                  value={selected}
                  {...register?.('serviceId', { required: true })}
                  onChange={handleChange}
               >
                  {options.map((option) => (
                     <MenuItem key={option.label} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <div className="flex items-center justify-center gap-6 mt-[80px]">
               <Link to={'/give-number/give-list-numbers'}>
                  <Button outline label="Hủy bỏ" />
               </Link>
               <Button label="In số" onSubmit={handleSubmit(onSubmit)} />
            </div>
         </div>
      </div>
   );
};

export default NewNumber;
