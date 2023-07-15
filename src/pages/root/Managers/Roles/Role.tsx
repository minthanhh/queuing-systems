import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { AddSquare, SearchIcon } from '@/assets';
import { IRole } from '@/types';
import { Heading, Manager, Table } from '@/components';
import { AcctionRole, ActionUpdate } from '@/components/Columns';
import { RootState } from '@/redux/store';
import { getRoles } from '@/redux/slices/roleSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Skeleton from 'react-loading-skeleton';

export type RoleType = {
   roleName: string;
   usersUsing: number;
   description: string;
   role?: string;
   id?: string;
};

const ManagerRole = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [globalFilter, setGlobalFilter] = useState('');
   const { roles } = useAppSelector((state: RootState) => state.role);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (roles.length === 0) {
         setIsLoading(true);
         dispatch(getRoles()).then((data) => {
            if (data) setIsLoading(false);
         });
      }
   }, [dispatch, roles]);

   const columns = useMemo<ColumnDef<IRole>[]>(
      () => [
         {
            accessorKey: 'roleName',
            header: 'Tên vai trò',
            cell: AcctionRole,
         },
         {
            accessorKey: 'usersUsing',
            header: 'Số người dùng',
         },
         {
            accessorKey: 'description',
            header: 'Mô tả',
         },
         {
            accessorKey: 'update',
            header: '',
            cell: (cell) =>
               ActionUpdate(cell, 'setting-systems/manager-roles/update-role'),
         },
      ],
      []
   );

   return (
      <div className="w-full mt-4">
         <Heading label="Danh sách vai trò" className="mb-4 px-6" />
         <div className="flex items-center justify-end pl-6 pr-[106px] mb-4">
            <div className="w-[240px]">
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
         <div className="w-full flex items-start gap-6">
            <Table
               data={roles}
               columns={columns}
               onGlobalFilterChange={setGlobalFilter}
               globalFilter={globalFilter}
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
                  label="Thêm vai trò"
                  path="/setting-systems/manager-roles/add-role"
               />
            )}
         </div>
      </div>
   );
};

export default ManagerRole;
