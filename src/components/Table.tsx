import {
   useReactTable,
   ColumnDef,
   getCoreRowModel,
   flexRender,
   OnChangeFn,
   getFilteredRowModel,
   PaginationState,
   getPaginationRowModel,
} from '@tanstack/react-table';
import Pagination from './Pagination/Pagination';
import { useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { twMerge } from 'tailwind-merge';
import { ImageEmptyResult } from '@/assets';

interface TableProps<T> {
   data: T[];
   globalFilter?: string;
   columns: ColumnDef<T>[];
   onGlobalFilterChange?: OnChangeFn<any>;
   isLoading?: boolean;
   className?: string;
   pageSize?: number;
}

const Table = <T,>(props: TableProps<T>) => {
   const {
      columns,
      data,
      globalFilter,
      onGlobalFilterChange,
      isLoading,
      className,
      pageSize: Size,
   } = props;
   const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 6 || Size,
   });

   const pagination = useMemo(
      () => ({
         pageIndex,
         pageSize,
      }),
      [pageIndex, pageSize]
   );

   const defaultData = useMemo(() => [], []);

   const table = useReactTable<T>({
      data: data ?? defaultData,
      columns,
      state: {
         globalFilter,
         pagination,
      },
      onGlobalFilterChange,
      enableGlobalFilter: true,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
   });

   if (isLoading) {
      return (
         <div className="w-full">
            <div className="flex items-start gap-6">
               <div className="w-full flex-1 px-6">
                  <table className="w-full h-auto flex-1 bg-white rounded-xl overflow-hidden shadow-lg text-left">
                     <thead className="bg-neutral-500/30">
                        <tr>
                           {Array(columns.length)
                              .fill({})
                              .map((_, index) => (
                                 <th
                                    key={_ + index}
                                    scope="col"
                                    className="px-4 py-3"
                                 >
                                    <Skeleton
                                       height={24}
                                       width={110}
                                       className="px-2"
                                    />
                                 </th>
                              ))}
                        </tr>
                     </thead>
                     <tbody className="w-full h-[500px]">
                        {Array(4)
                           .fill({})
                           .map((_, index) => (
                              <tr
                                 key={_ + index}
                                 className="even:bg-neutral-200/30"
                              >
                                 {Array(columns.length)
                                    .fill({})
                                    .map((_, index) => (
                                       <td
                                          key={_ + index}
                                          className="px-4 py-3 text-left"
                                       >
                                          <Skeleton
                                             width={110}
                                             height={21}
                                             className="px-2"
                                          />
                                       </td>
                                    ))}
                              </tr>
                           ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className={twMerge('pl-6 relative flex-1', className)}>
         <table className="w-full text-sm text-gray-500 bg-white dark:text-gray-400 rounded-xl overflow-hidden shadow-lg border-collapse border border-[#ffe3cd] text-center">
            <thead className="text-white bg-orange-400 dark:bg-gray-700 dark:text-gray-400 leading-6 text-base font-normal">
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <th
                           key={header.id}
                           scope="col"
                           className="border border-[#ffe3cd] px-2 py-3"
                        >
                           {header.isPlaceholder
                              ? null
                              : flexRender(
                                   header.column.columnDef.header,
                                   header.getContext()
                                )}
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody>
               {data.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                     <tr key={row.id} className="even:bg-orange-50">
                        {row.getVisibleCells().map((cell) => (
                           <td
                              key={cell.id}
                              className="px-4 py-3 border border-[#ffe3cd] text-left"
                           >
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </td>
                        ))}
                     </tr>
                  ))
               ) : (
                  <tr className="even:bg-orange-50">
                     <td
                        className="px-4 py-3 border border-[#ffe3cd] text-left"
                        colSpan={columns.length}
                     >
                        <div className="w-full flex items-center justify-center flex-col my-10">
                           <img
                              className="object-cover w-auto h-[220px]"
                              src={ImageEmptyResult}
                              alt=""
                           />
                           <p className="text-2xl text-bold">
                              Kết quả không tìm thấy!
                           </p>
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>

         <Pagination
            pageCount={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            setPageIndex={table.setPageIndex}
         />
      </div>
   );
};

export default Table;
