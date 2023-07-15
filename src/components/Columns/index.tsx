import { CellContext } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

// Device
export const ActiveState = ({ row }: any) => {
   const { status } = row.original;
   return (
      <>
         {status ? (
            <>
               <span
                  className={`w-2 h-2 mr-1 inline-block  rounded-full ${
                     status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
               ></span>
               {status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
            </>
         ) : null}
      </>
   );
};

export const ActiveConnect = ({ row }: any) => {
   const { connect } = row.original;
   return (
      <>
         <span
            className={`w-2 h-2 mr-1 inline-block  rounded-full ${
               connect === 'connect' ? 'bg-green-500' : 'bg-red-500'
            }`}
         ></span>
         {connect === 'connect' ? 'Kết nối' : 'Mất kết nối'}
      </>
   );
};

export const MoreDescription = ({ row }: any) => {
   const { services } = row.original;

   return (
      <div>
         <p className="line-clamp-1 w-[178px]">
            {services && services?.join(', ')}
         </p>
         <button>Xem thêm</button>
      </div>
   );
};

export const ActionDetail = ({ row }: any, path: string) => {
   const { uid } = row.original;

   return (
      <Link to={`/${path}/` + uid}>
         <span className="underline text-blue-500">Chi tiết</span>
      </Link>
   );
};

export const ActionUpdate = ({ row }: any, path: string) => {
   const { uid } = row.original;

   return (
      <Link to={`/${path}/` + uid}>
         <span className="underline text-blue-500">Cập nhật</span>
      </Link>
   );
};

export const ActionCondition = ({ row }: any) => {
   const { status } = row.original;

   return (
      <>
         <span
            className={`w-2 h-2 mr-1 inline-block  rounded-full ${
               status === 'pending'
                  ? 'bg-[#4277ff]'
                  : status === 'fulfilled'
                  ? 'bg-[#7e7d88]'
                  : status === 'rejected'
                  ? 'bg-[#e73f3f]'
                  : ''
            }`}
         ></span>
         {status === 'pending'
            ? 'Đang chờ'
            : status === 'fulfilled'
            ? 'Đã sử dụng'
            : status === 'rejected'
            ? 'Bỏ qua'
            : ''}
      </>
   );
};

export const ActionTime = ({ row }: CellContext<any, unknown>) => {
   const { grantTime } = row.original;

   if (grantTime) {
      const date = new Date(
         grantTime.seconds * 1000 + grantTime.nanoseconds / 1000000
      );

      const seconds = date.getSeconds();
      const hours = date.getHours();
      const datetime = date.toLocaleDateString('vi-VI', {
         timeZone: 'Asia/Ho_Chi_Minh',
      });

      return `${hours}:${seconds} - ${datetime}`;
   }
};

export const ActionTestTime = ({ row }: CellContext<any, unknown>) => {
   const { impactTime } = row.original;

   if (impactTime) {
      const date = new Date(
         impactTime.seconds * 1000 + impactTime.nanoseconds / 1000000
      );

      const seconds = date.getSeconds();
      const hours = date.getHours();
      const datetime = date.toLocaleDateString('vi-VI', {
         timeZone: 'Asia/Ho_Chi_Minh',
      });

      return `${hours}:${seconds} - ${datetime}`;
   }
};

export const AcctionRole = ({ row }: any) => {
   const { role } = row.original;

   return (
      <>
         {role === 'accountant'
            ? 'Kế toán'
            : role === 'manager'
            ? 'Quản lý'
            : role === 'admin'
            ? 'Admin'
            : ''}
      </>
   );
};
