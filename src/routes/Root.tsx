import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../components';
import {
   Dashboard,
   Device,
   More,
   NumLevel,
   Report,
   Service,
   Setting,
} from '../assets';

const Root = () => {
   const routes = [
      {
         icon: Dashboard,
         label: 'Dashboard',
         breadcrumb: 'Dashboard',
         path: '/',
      },
      {
         icon: Device,
         label: 'Thiết bị',
         breadcrumb: 'Danh sách thiết bị',
         path: '/devices',
      },
      {
         icon: Service,
         label: 'Dịch vụ',
         breadcrumb: 'Danh sách dịch vụ',
         path: '/services',
      },
      {
         icon: NumLevel,
         label: 'Cấp số',
         breadcrumb: 'Danh sách cấp số',
         path: '/number-levels',
      },
      {
         icon: Report,
         label: 'Báo cáo',
         breadcrumb: 'Lập báo cáo',
         path: '/reports',
      },
      {
         icon: Setting,
         label: 'Cài đặt hệ thống',
         breadcrumb: 'Cài đặt hệ thống',
         more: More,
         children: [
            {
               label: 'Quản lý vai trò',
               path: '/manager-roles',
            },
            {
               label: 'Quản lý Tài khoản',
               path: '/manager-accounts',
            },
            {
               label: 'Nhật ký người dùng',
               path: '/user-logs',
            },
         ],
      },
   ];

   const breadcrumbs = routes.map((route) => {
      return route.children
         ? {
              breadcrumb: route.breadcrumb,
              path: route.path,
              labels: route.children,
           }
         : { breadcrumb: route.breadcrumb, path: route.path };
   });

   return (
      <div className="w-full h-full flex">
         <Sidebar routes={routes} />

         <main className="w-[calc(100%_-_200px)] overflow-y-auto">
            <Header breadcrumbs={breadcrumbs} />
            <Outlet />
         </main>
      </div>
   );
};

export default Root;
