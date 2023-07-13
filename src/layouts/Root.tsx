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
import { useAppSelector } from '@/hooks/storeHooks';
import { RootState } from '@/redux/store';

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

   const { profile } = useAppSelector((state: RootState) => state.user);

   const breadcrumbs = routes.map((route) => {
      if (route.children) {
         return {
            breadcrumb: route.breadcrumb,
            label: route.label,
            path: route.path,
            children: route.children,
         };
      }
      return {
         breadcrumb: route.breadcrumb,
         label: route.label,
         path: route.path,
      };
   });

   if (!profile) {
      return <Navigate to={'/login'} replace />;
   }

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
