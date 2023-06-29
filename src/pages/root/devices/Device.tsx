import Select, { components, DropdownIndicatorProps } from 'react-select';
import { AddSquare, DropDown, SearchIcon } from '../../../assets';
import { Manager, Table } from '../../../components';
import { useEffect } from 'react';
import { getDevices } from '../../../redux/features/deviceSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { RootState } from '../../../redux/store';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DeviceType } from '../../../types';
import {
   ActionDetail,
   ActionUpdate,
   ActiveConnect,
   ActiveState,
   MoreDescription,
} from '../../../components/Columns';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
   return (
      <components.DropdownIndicator {...props} className="p-0">
         <img src={DropDown} alt="" />
      </components.DropdownIndicator>
   );
};

const Device = () => {
   const dispatch = useAppDispatch();
   const data = useAppSelector((state: RootState) => state.device.devices);
   useEffect(() => {
      dispatch(getDevices());
   }, [dispatch]);

   const columns = useMemo<ColumnDef<DeviceType>[]>(
      () => [
         {
            accessorKey: 'id',
            header: 'Mã thiết bị',
         },
         {
            accessorKey: 'name',
            header: 'Tên thiết bị',
         },
         {
            accessorKey: 'addressIP',
            header: 'Địa chỉ IP',
         },
         {
            accessorKey: 'status',
            header: 'Trạng thái hoạt động',
            cell: ActiveState,
         },
         {
            accessorKey: 'connect',
            header: 'Trạng thái kết nối',
            cell: ActiveConnect,
         },
         {
            accessorKey: 'services',
            header: 'Dịch vụ sử dụng',
            cell: MoreDescription,
         },
         {
            header: '',
            accessorKey: 'detail',
            cell: ActionDetail,
         },
         {
            header: '',
            accessorKey: 'update',
            cell: ActionUpdate,
         },
      ],
      []
   );

   return (
      <div className="flex w-full">
         <div className="mt-4 flex-1">
            <h2 className="text-primaryColor px-6 font-bold text-2xl leading-9 mb-4">
               Danh sách thiết bị
            </h2>
            <div className="flex items-center px-6 justify-between mb-4 mr-[108px]">
               <div className="flex items-center gap-6">
                  <div>
                     <h6 className="mb-1 text-[#282739]">
                        Trạng thái hoạt động
                     </h6>
                     <Select
                        defaultValue={{ label: 'Tất cả' }}
                        options={[
                           { label: 'Tất cả' },
                           { label: 'Hoạt động' },
                           { label: 'Ngưng hoạt động' },
                        ]}
                        components={{
                           IndicatorSeparator: null,
                        }}
                        classNames={{
                           control: () => 'border-[#d4d4d7] border-[1.5px]',
                           input: () => 'text-[#535261] w-[300px]',
                           option: () =>
                              'text-base font-normal leading-6 text-[#535261] hover:bg-[#fff2e7]',
                        }}
                     />
                  </div>
                  <div>
                     <h6 className="mb-1 text-[#282739]">Trạng thái kết nối</h6>
                     <Select
                        placeholder={'Tất cả'}
                        components={{
                           DropdownIndicator,
                           IndicatorSeparator: null,
                        }}
                        classNames={{
                           control: () => 'border-[#d4d4d7] border-[1.5px]',
                           input: () => 'text-[#535261] w-[300px]',
                           option: () =>
                              'text-base font-normal leading-6 text-[#535261] hover:bg-[#fff2e7]',
                        }}
                     />
                  </div>
               </div>
               <div>
                  <h6>Từ khoá</h6>
                  <div className="flex items-center bg-white border-2 border-[#d4d4d7] rounded-lg p-3">
                     <input
                        className="outline-none"
                        type="text"
                        placeholder="Nhập từ khóa"
                     />
                     <img src={SearchIcon} alt="" />
                  </div>
               </div>
            </div>

            <div className="flex items-start gap-6">
               <Table columns={columns} data={data} />

               <Manager
                  icon={AddSquare}
                  label="Thêm thiết bị"
                  path="/add-device"
               />
            </div>
         </div>
      </div>
   );
};

export default Device;
