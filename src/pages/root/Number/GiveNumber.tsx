import { ColumnDef } from '@tanstack/react-table';
import {
   collection,
   getDocs,
   onSnapshot,
   orderBy,
   query,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { IGiveNumber, Options } from '@/types';
import { ActionCondition, ActionDetail } from '@/components/Columns';
import { db } from '@/configs/firebase.config';
import { Manager, Table, CustomSelect, Heading } from '@/components';
import { AddSquare } from '@/assets';
import { optionCondition } from '@/helpers/options';
import Skeleton from 'react-loading-skeleton';

const GiveNumber = () => {
   const [isLoading, setIsLoading] = useState(false);
   let [giveNumbers, setGiveLogs] = useState<IGiveNumber[]>([]);
   const [globalFilter, setGlobalFilter] = useState('');
   const [serviceNameList, setServiceNameList] = useState<Options[]>([]);
   const [selected, setSelected] = useState({
      serviceName: 'all',
      status: 'all',
   });

   useEffect(() => {
      if (giveNumbers.length === 0) {
         setIsLoading(true);
         getUserLogs().then(() => {
            setIsLoading(false);
         });
      }
   }, [giveNumbers]);

   useEffect(() => {
      const coll = collection(db, 'services');
      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
         const servicesName: Options[] = [];
         querySnapshot.forEach((doc) => {
            servicesName.push({
               type: doc.data().name,
               label: doc.data().name,
            });
         });
         setServiceNameList(servicesName);
      });

      return () => unsubscribe();
   }, []);

   const getUserLogs = async () => {
      const q = query(
         collection(db, 'give-numbers'),
         orderBy('orderNumber', 'asc')
      );
      const snap = await getDocs(q);
      const giveNumbers = snap.docs.map(
         (doc) => ({ ...doc.data(), uid: doc.id } as IGiveNumber)
      );
      if (!snap.empty) {
         setGiveLogs([]);
      }
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
            cell: (cell) => ActionDetail(cell, 'devices/detail-give-number'),
         },
      ],
      []
   );

   const handleOnChangeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setSelected((prev) => ({ ...prev, [name]: value }));
   };

   if (selected.status === 'pending') {
      giveNumbers = giveNumbers.filter(
         (item) => item.status === selected.status
      );
   }

   if (selected.status === 'fulfilled') {
      giveNumbers = giveNumbers.filter(
         (item) => item.status === selected.status
      );
   }

   if (selected.status === 'rejected') {
      giveNumbers = giveNumbers.filter(
         (item) => item.status === selected.status
      );
   }
   return (
      <div className="w-full">
         <Heading label="Quản lý cấp số" className="pl-6" />
         <div className="flex items-center pl-6 mb-4 gap-6">
            <CustomSelect
               onChange={handleOnChangeSelected}
               options={[{ type: 'all', label: 'Tất cả' }, ...serviceNameList]}
               className="w-[150px]"
               name="serviceName"
            />
            <CustomSelect
               onChange={handleOnChangeSelected}
               options={optionCondition}
               className="w-[150px]"
               name="status"
            />
         </div>
         <div className="flex gap-6">
            <Table
               columns={columns}
               data={giveNumbers}
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
                  label="Cấp số mới"
                  path="/give-number/give-list-numbers/new-number"
               />
            )}
         </div>
      </div>
   );
};

export default GiveNumber;
