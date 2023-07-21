import { Navigate, Outlet } from 'react-router-dom';
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
         routes: [
            {
               label: 'Cập nhật thiết bị',
               path: '/devices/update-device',
            },
            {
               label: 'Chi tiết thiết bị',
               path: '/devices/detail-device',
            },
            {
               label: 'Thêm thiết bị',
               path: '/devices/add-device',
            },
         ],
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
         path: '/give-number',
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
               path: '/setting-systems/manager-roles',
            },
            {
               label: 'Quản lý Tài khoản',
               path: '/setting-systems/manager-accounts',
            },
            {
               label: 'Nhật ký người dùng',
               path: '/setting-systems/user-logs',
            },
         ],
      },
   ];

   const isAuthenticated = JSON.parse(
      localStorage.getItem('isAuthenticated') as string
   );

   const breadcrumbs = routes.map((route) => {
      if (route.children) {
         return {
            breadcrumb: route.breadcrumb,
            label: route.label,
            path: route.path,
            children: route.children,
         };
      }
      if (route.routes) {
         return {
            breadcrumb: route.breadcrumb,
            label: route.label,
            path: route.path,
            routes: route.routes,
         };
      }

      return {
         breadcrumb: route.breadcrumb,
         label: route.label,
         path: route.path,
      };
   });

   return isAuthenticated ? (
      <div className="w-full h-full flex">
         <Sidebar routes={routes} />

         <main className="w-[calc(100%_-_200px)] overflow-y-auto">
            <Header breadcrumbs={breadcrumbs} />
            <Outlet />
         </main>
      </div>
   ) : (
      <Navigate to={'/login'} replace />
   );
};

export default Root;
