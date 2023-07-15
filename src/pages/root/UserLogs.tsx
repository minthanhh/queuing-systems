import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { ColumnDef } from '@tanstack/react-table';

import { IUserLogs } from '../../types';
import { db } from '../../configs/firebase.config';
import { Table } from '../../components';
import { ActionTestTime } from '../../components/Columns';
import { SearchIcon } from '../../assets';

const UserLogs = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [userLogs, setUserLogs] = useState<IUserLogs[]>([]);
   const [globalFilter, setGlobalFilter] = useState('');

   useEffect(() => {
      if (userLogs.length === 0) {
         setIsLoading(true);
         getUserLogs().then(() => {
            setIsLoading(false);
         });
      }
   }, [userLogs]);

   const getUserLogs = async () => {
      const snap = await getDocs(collection(db, 'user-logs'));
      const userLogs = snap.docs.map((doc) => doc.data() as IUserLogs);
      setUserLogs(userLogs);
   };

   const columns = useMemo<ColumnDef<IUserLogs>[]>(
      () => [
         {
            header: 'Tên đăng nhập',
            accessorKey: 'username',
         },
         {
            header: 'Thời gian tác động',
            accessorKey: 'impactTime',
            cell: (cell) => ActionTestTime(cell),
         },
         {
            header: 'IP thực hiện',
            accessorKey: 'ipDone',
         },
         {
            header: 'Thao tác thực hiện',
            accessorKey: 'operations',
         },
      ],
      []
   );

   return (
      <div className="w-full">
         <div className="pl-6 pr-[105px] flex justify-end mb-4">
            <div className="w-[260px]">
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
         <Table
            columns={columns}
            data={userLogs}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            className="pr-[105px]"
            isLoading={isLoading}
         />
      </div>
   );
};

export default UserLogs;
