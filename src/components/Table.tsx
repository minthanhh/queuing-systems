import {
   useReactTable,
   ColumnDef,
   getCoreRowModel,
   flexRender,
} from '@tanstack/react-table';
import { DeviceType } from '../types';

interface TableProps {
   data: DeviceType[];
   columns: ColumnDef<DeviceType>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });
   return (
      <div className="pl-6 relative h-[400px] flex-1">
         <table className="w-full text-sm text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden shadow-lg border-collapse border border-[#ffe3cd] text-center">
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
               {table.getRowModel().rows.map((row) => (
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
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Table;
