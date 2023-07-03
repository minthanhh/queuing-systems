import {
   useReactTable,
   ColumnDef,
   getCoreRowModel,
   flexRender,
   OnChangeFn,
   getFilteredRowModel,
   getPaginationRowModel,
} from '@tanstack/react-table';
import Pagination from './Pagination/Pagination';
import { useMemo } from 'react';

interface TableProps<T> {
   data: T[];
   globalFilter?: string;
   columns: ColumnDef<T>[];
   onGlobalFilterChange?: OnChangeFn<any>;
}

const Table = <T,>(props: TableProps<T>) => {
   const { columns, data, globalFilter, onGlobalFilterChange } = props;
   // const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
   //    pageIndex: 0,
   //    pageSize: 5,
   // });

   // const pagination = useMemo(
   //    () => ({
   //       pageIndex,
   //       pageSize,
   //    }),
   //    [pageIndex, pageSize]
   // );

   const defaultData = useMemo(() => [], []);

   const table = useReactTable<T>({
      data: data ?? defaultData,
      columns,
      state: {
         globalFilter,
         pagination: {
            pageSize: 5,
            pageIndex: 0,
         },
      },
      onGlobalFilterChange,
      enableGlobalFilter: true,
      manualPagination: true,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
   });
   return (
      <div className="pl-6 relative flex-1">
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
                     <tr className="even:bg-orange-50">
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
                  <div>No data</div>
               )}
            </tbody>
         </table>
         <Pagination />
      </div>
   );
};

export default Table;
