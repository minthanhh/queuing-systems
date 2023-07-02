import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState, useMemo } from 'react';

// Features
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getDevices } from '../../../redux/slices/deviceSlice';
import { RootState } from '../../../redux/store';
import { DeviceType } from '../../../types';

// Assets - Components
import { AddSquare, SearchIcon } from '../../../assets';
import { Manager, Table } from '../../../components';
import {
   ActionDetail,
   ActionUpdate,
   ActiveConnect,
   ActiveState,
   MoreDescription,
} from '../../../components/Columns';
import SelectCustome from '../../../components/Select/Select';

// const DropdownIndicator = (props: DropdownIndicatorProps) => {
//    return (
//       <components.DropdownIndicator {...props} className="p-0">
//          <img src={DropDown} alt="" />
//       </components.DropdownIndicator>
//    );
// };

const Device = () => {
   const optionSelect = [
      { type: 'all', label: 'Tất cả' },
      { type: 'active', label: 'Hoạt động' },
      { type: 'in-active', label: 'Ngưng hoạt động' },
   ];

   const optionConnect = [
      { type: 'all', label: 'Tất cả' },
      { type: 'connect', label: 'Kết nối' },
      { type: 'in-connect', label: 'Mất kết nối' },
   ];
   const [selected, setSelected] = useState('all');
   const [connected, setConnected] = useState('all');
   const [globalFilter, setGlobalFilter] = useState('');
   const dispatch = useAppDispatch();
   let data = useAppSelector((state: RootState) => state.device.devices);
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
            cell: (cell) => ActionDetail(cell, 'devices/detail-device'),
         },
         {
            header: '',
            accessorKey: 'update',
            cell: (cell) => ActionUpdate(cell, 'devices/update-device'),
         },
      ],
      []
   );

   if (selected === 'active') {
      data = data.filter((item) => item.status === selected);
   }

   if (selected === 'in-active') {
      data = data.filter((item) => item.status === selected);
   }

   if (connected === 'connect') {
      data = data.filter((item) => item.connect === connected);
   }

   if (connected === 'in-connect') {
      data = data.filter((item) => item.connect === connected);
   }

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
                     <SelectCustome
                        options={optionSelect}
                        onChange={(e) => setSelected(e.target.value)}
                        value={selected}
                     />
                  </div>
                  <div>
                     <h6 className="mb-1 text-[#282739]">Trạng thái kết nối</h6>
                     <SelectCustome
                        options={optionConnect}
                        onChange={(e) => setConnected(e.target.value)}
                        value={connected}
                     />
                     {/* <Select
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
                     /> */}
                  </div>
               </div>
               <div>
                  <h6>Từ khoá</h6>
                  <div className="flex items-center bg-white border-2 border-[#d4d4d7] rounded-lg p-3">
                     <input
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="outline-none"
                        type="text"
                        placeholder="Nhập từ khóa"
                     />
                     <img src={SearchIcon} alt="" />
                  </div>
               </div>
            </div>

            <div className="flex items-start gap-6">
               <Table
                  globalFilter={globalFilter}
                  columns={columns}
                  data={data}
                  onGlobalFilterChange={setGlobalFilter}
               />

               <Manager
                  icon={AddSquare}
                  label="Thêm thiết bị"
                  path="/devices/add-device"
               />
            </div>
         </div>
      </div>
   );
};

// type SearchInputProps = {
//    value: string | number;
//    onChange: (value: string | number) => void;
//    debounce?: number;
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

// const SearchInput = ({
//    onChange,
//    value: initialValue,
//    debounce = 500,
//    ...props
// }: SearchInputProps) => {
//    const [value, setValue] = useState(initialValue);

//    useEffect(() => {
//       setValue(initialValue);
//    }, [initialValue]);

//    useEffect(() => {
//       const timeout = setTimeout(() => {
//          onChange(value);
//       }, debounce);

//       return () => clearTimeout(timeout);
//    }, [value]);

//    return (
//       <>
//          <div className="flex items-center bg-white border-2 border-[#d4d4d7] rounded-lg p-3">
//             <input
//                {...props}
//                value={value}
//                onChange={(e) => setValue(e.target.value)}
//                className="outline-none"
//                type="text"
//                placeholder="Nhập từ khóa"
//             />
//             <img src={SearchIcon} alt="" />
//          </div>
//       </>
//    );
// };

export default Device;
