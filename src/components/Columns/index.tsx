import { Link } from 'react-router-dom';

// Device
export const ActiveState = ({ row }: any) => {
   const { status } = row.original;
   return (
      <>
         <span
            className={`w-2 h-2 mr-1 inline-block  rounded-full ${
               status === 'active' ? 'bg-green-500' : 'bg-red-500'
            }`}
         ></span>
         {status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
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
