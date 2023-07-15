import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { IAccount } from '@/types';
import { AddSquare, SearchIcon } from '@/assets';
import { Heading, Manager, Table } from '@/components';
import { AcctionRole, ActionUpdate, ActiveState } from '@/components/Columns';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { RootState } from '@/redux/store';
import { getAccounts } from '@/redux/slices/accountSlice';
import Skeleton from 'react-loading-skeleton';

const Account = () => {
   const [globalFilter, setGlobalFilter] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useAppDispatch();
   const { accounts } = useAppSelector((state: RootState) => state.account);

   useEffect(() => {
      if (accounts.length === 0) {
         setIsLoading(true);
         dispatch(getAccounts()).then(() => {
            setIsLoading(false);
         });
      }
   }, [dispatch, accounts]);

   const columns = useMemo<ColumnDef<IAccount>[]>(
      () => [
         {
            accessorKey: 'username',
            header: 'Tên đăng nhập',
         },
         {
            accessorKey: 'fullName',
            header: 'Họ tên',
         },
         {
            accessorKey: 'phone',
            header: 'Số điện thoại',
         },
         {
            accessorKey: 'email',
            header: 'Email',
         },
         {
            accessorKey: 'role',
            header: 'Vai trò',
            cell: AcctionRole,
         },
         {
            accessorKey: 'status',
            header: 'Trạng thái hoạt động',
            cell: ActiveState,
         },
         {
            accessorKey: 'update',
            header: '',
            cell: (cell) =>
               ActionUpdate(
                  cell,
                  'setting-systems/manager-accounts/update-account'
               ),
         },
      ],
      []
   );

   return (
      <div className="w-full mt-4">
         <div className="pl-6 pr-[106px] mb-4">
            <Heading label="Danh sách tài khoản" />

            <div className="flex items-center justify-between">
               <div>
                  <select name="" id="">
                     <option value="">Tất cả</option>
                  </select>
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
         </div>

         <div className="w-full flex items-start gap-6">
            <Table
               data={accounts}
               columns={columns}
               globalFilter={globalFilter}
               onGlobalFilterChange={setGlobalFilter}
               isLoading={isLoading}
            />

            {isLoading ? (
               <div className="flex flex-col gap-1 px-1 bg-white shadow-lg text-center py-3 rounded-s-lg">
                  <Skeleton width={28} height={28} />
                  <Skeleton width={72} height={20} />
               </div>
            ) : (
               <Manager
                  icon={AddSquare}
                  label="Thêm tài khoản"
                  path="/setting-systems/manager-accounts/add-account"
               />
            )}
         </div>
      </div>
   );
};

export default Account;
