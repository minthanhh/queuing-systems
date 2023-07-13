import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { AddSquare } from '@/assets';
import { IRole } from '@/types';
import { Heading, Manager, Table } from '@/components';
import { AcctionRole, ActionUpdate } from '@/components/Columns';
import { RootState } from '@/redux/store';
import { getRoles } from '@/redux/slices/roleSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import {
   DocumentData,
   QueryDocumentSnapshot,
   QuerySnapshot,
   collection,
   collectionGroup,
   endAt,
   getDocs,
   limit,
   limitToLast,
   onSnapshot,
   orderBy,
   query,
   startAfter,
} from 'firebase/firestore';
import { db } from '@/configs/firebase.config';

export type RoleType = {
   roleName: string;
   usersUsing: number;
   description: string;
   role?: string;
   id?: string;
};

const ManagerRole = () => {
   const [isLoading, setIsLoading] = useState(false);
   const { roles } = useAppSelector((state: RootState) => state.role);
   const [testRoles, setTestRoles] = useState<RoleType[]>([]);
   const [lastVisible, setLastVisible] =
      useState<QueryDocumentSnapshot<DocumentData>>();
   const [firstVisible, setFirstVisible] =
      useState<QueryDocumentSnapshot<DocumentData>>();
   const dispatch = useAppDispatch();
   const PAGE_SIZE = 1;

   useEffect(() => {
      if (roles.length === 0) {
         setIsLoading(true);
         dispatch(getRoles()).then((data) => {
            if (data) setIsLoading(false);
         });
      }
   }, [dispatch, roles]);

   useEffect(() => {
      const q = query(
         collectionGroup(db, 'reports'),
         orderBy('createAt', 'desc'),
         limit(PAGE_SIZE)
      );
      const unsubscribe = onSnapshot(q, (documents) => {
         const tempPosts: RoleType[] = [];
         documents.forEach((document) => {
            tempPosts.push({
               id: document.id,
               ...document.data(),
            } as RoleType);
         });
         setTestRoles(tempPosts);
         setLastVisible(documents.docs[documents.docs.length - 1]);
         setFirstVisible(documents.docs[0]);
      });
      return () => unsubscribe();
   }, []);

   console.log(lastVisible?.data());
   const nextPage = async () => {
      const postsRef = collectionGroup(db, 'reports');
      const q = query(
         postsRef,
         orderBy('createdAt', 'desc'),
         startAfter(lastVisible?.data().createdAt), // Pass the reference
         limit(PAGE_SIZE)
      );
      const documents = await getDocs(q);
      updateState(documents);
   };

   const previousPage = async () => {
      const postsRef = collection(db, 'reports');
      const q = query(
         postsRef,
         orderBy('createdAt', 'desc'),
         endAt(firstVisible?.data().createdAt), // Use `endAt()` method and pass the reference
         limitToLast(PAGE_SIZE)
      );
      const documents = await getDocs(q);
      updateState(documents);
   };

   const updateState = (documents: QuerySnapshot<DocumentData>) => {
      if (!documents.empty) {
         const tempPosts: RoleType[] = [];
         documents.forEach((document) => {
            tempPosts.push({
               id: document.id,
               ...document.data(),
            } as RoleType);
         });
         setTestRoles(tempPosts);
      }
      if (documents?.docs[0]) {
         setFirstVisible(documents.docs[0]);
      }
      if (documents?.docs[documents.docs.length - 1]) {
         setLastVisible(documents.docs[documents.docs.length - 1]);
      }
   };

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

   if (isLoading) {
      return (
         <div className="w-full mt-4 animate-pulse">
            <div className="h-9 bg-gray-300 dark:bg-gray-600 w-[193px] mx-6 mb-8 "></div>

            <div className="w-full flex items-start gap-6">
               <div className="w-full h-[320px] bg-gray-300 dark:bg-gray-600 rounded-lg ml-6"></div>

               <div className="flex flex-col gap-1 px-1 py-3 bg-gray-300 dark:bg-gray-600 rounded-s-lg text-center shadow-md backdrop-blur-md">
                  <div className="w-7 h-7 bg-gray-300 rounded-lg dark:bg-gray-700 mx-auto">
                     <svg
                        className="w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                     >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                     </svg>
                  </div>
                  <div className="w-[72px] h-[38px] bg-gray-300 dark:bg-gray-600"></div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="w-full mt-4">
         <Heading label="Danh sách vai trò" className="mb-[52px] px-6" />

         <div className="w-full flex items-start gap-6">
            <Table data={testRoles} columns={columns} />

            <Manager
               icon={AddSquare}
               label="Thêm vai trò"
               path="/setting-systems/manager-roles/add-role"
            />
         </div>

         <button onClick={previousPage}>prev</button>
         <button onClick={nextPage}>next</button>
      </div>
   );
};

export default ManagerRole;
