import { ColumnDef } from '@tanstack/react-table';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { IGiveNumber } from '../../../types';
import { ActionCondition, ActionDetail } from '../../../components/Columns';
import { db } from '../../../configs/firebase.config';
import { Manager, Table } from '../../../components';
import { AddSquare } from '../../../assets';

const GiveNumber = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [giveNumbers, setGiveLogs] = useState<IGiveNumber[]>([]);
   const [globalFilter, setGlobalFilter] = useState('');

   useEffect(() => {
      if (giveNumbers.length === 0) {
         setIsLoading(true);
         getUserLogs().then(() => {
            setIsLoading(false);
         });
      }
   }, [giveNumbers]);

   const getUserLogs = async () => {
      const snap = await getDocs(collection(db, 'give-numbers'));
      const giveNumbers = snap.docs.map((doc) => doc.data() as IGiveNumber);
      setGiveLogs(giveNumbers);
   };

   const columns = useMemo<ColumnDef<IGiveNumber>[]>(
      () => [
         {
            header: 'STT',
            accessorKey: 'orderNumber',
         },
         {
            header: 'Tên khách hàng',
            accessorKey: 'customerName',
         },
         {
            header: 'Tên dịch vụ ',
            accessorKey: 'serviceName',
         },
         {
            header: 'Thời gian cấp',
            accessorKey: 'grantTime',
         },

         {
            header: 'Hạn sử dụng',
            accessorKey: 'expiryTime',
         },
         {
            header: 'Trạng thái',
            accessorKey: 'status',
            cell: ActionCondition,
         },

         {
            header: 'Nguồn cấp',
            accessorKey: 'source',
         },
         {
            header: '',
            accessorKey: 'detail',
            cell: (cell) =>
               ActionDetail(cell, 'device/list-give-numbers/detail'),
         },
      ],
      []
   );

   if (isLoading) {
      return <div>Loading ...</div>;
   }

   return (
      <div className="flex gap-6">
         <Table
            columns={columns}
            data={giveNumbers}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
         />

         <Manager
            icon={AddSquare}
            label="Cấp số mới"
            path="/give-number/list-give-numbers/new-number"
         />
      </div>
   );
};

export default GiveNumber;
