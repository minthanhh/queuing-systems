import { DefaultAvatar, Notify, NotifyWhite } from '@/assets';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { getNotifies } from '@/redux/slices/notifySlice';

type BreadcrumbType = {
   breadcrumb: string;
   label: string;
   path?: string;
   children?: {
      label: string;
      path: string;
   }[];
   routes?: {
      label: string;
      path: string;
   }[];
};
interface HeaderProps {
   breadcrumbs: BreadcrumbType[];
}

type TestType = {
   breadcrumb?: string;
   label: string;
   path?: string | undefined;
   subLabel?: string;
};

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
   const location = useLocation();
   const dispatch = useAppDispatch();
   const { profile } = useAppSelector((state: RootState) => state.user);
   const { notifies } = useAppSelector((state: RootState) => state.notify);

   useEffect(() => {
      if (notifies && notifies.length === 0) {
         dispatch(getNotifies())
            .then(() => {})
            .catch((err) => {
               console.log(err);
            });
      }
   }, [dispatch, notifies]);

   const lists: TestType[] = [];

   breadcrumbs.forEach((crumb) => {
      if (!crumb.children) {
         lists.push(crumb);
      }

      if (crumb.children) {
         crumb.children.forEach((child) => {
            lists.push({
               ...child,
               breadcrumb: child.label,
               label: crumb.breadcrumb,
            });
         });
      }

      if (crumb.routes && crumb.routes.length > 0) {
         crumb.routes.forEach((child) => {
            lists.push({
               path: child.path,
               label: crumb.label,
               subLabel: child.label,
               breadcrumb: crumb.breadcrumb as string,
            });
         });
      }
   });

   return (
      <header className="w-full bg-transparent px-6 py-2 relative z-[100]">
         <div className="flex justify-between items-center">
            {lists.map(
               (crumb, index) =>
                  location.pathname === crumb.path && (
                     <Breadcrumb
                        key={index}
                        label={crumb.label}
                        breadcrumb={crumb.breadcrumb as string}
                        path={crumb.path}
                     />
                  )
            )}

            <div className="flex items-center gap-6">
               <div className="bg-[#FFF2E7] rounded-full w-8 h-8 relative cursor-pointer transition-all ease-in-out shadow-lg duration-200 hover:bg-primaryColor group">
                  <img
                     className="group-hover:opacity-0 opacity-1 group-hover:invisible visible absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition-all ease-linear duration-300"
                     src={Notify}
                     alt="Icon Notification"
                  />
                  <img
                     className="group-hover:opacity-1 opacity-1 group-hover:visible invisible absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition-all ease-linear duration-300"
                     src={NotifyWhite}
                     alt=""
                  />

                  <div className="absolute top-[60px] group-hover:visible invisible shadow-md -right-[82px] rounded-[10px] bg-white w-[360px] overflow-hidden transition-all ease-linear duration-300">
                     <div className="bg-primaryColor py-[10px] pl-6">
                        <h4 className="font-bold text-white leading-[30px] text-xl">
                           Thông báo
                        </h4>
                     </div>
                     <div className="px-6 flex flex-col gap-1 overflow-y-scroll scrollbar h-[472px]">
                        {notifies.map((notify, idx) => (
                           <Link
                              key={`${notify}-${idx}`}
                              to={'/devices/detail-give-number/' + notify.uid}
                           >
                              <div className="border-b-2 py-4 border-borderBottom">
                                 <p className="text-notify text-base leading-6 font-bold">
                                    Người dùng: {notify.username}
                                 </p>
                                 <p className="text-secondary font-normal text-base leading-6">
                                    Thời gian nhận số: {notify.timeToReceive}
                                 </p>
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>

               <Link to={'/profile'}>
                  <div className="flex items-center gap-2">
                     <div className="w-10 h-10 relative rounded-full overflow-hidden shadow-lg">
                        <img
                           src={profile?.photoURL || DefaultAvatar}
                           className="w-full h-full object-cover"
                           alt=""
                        />
                     </div>
                     <div className="flex flex-col">
                        <span className="font-normal text-xs leading-[18px] text-[#7E7D88]">
                           Xin chào
                        </span>
                        <h3 className="text-base leading-6 font-bold">
                           {profile?.displayName}
                        </h3>
                     </div>
                  </div>
               </Link>
            </div>
         </div>
      </header>
   );
};

export default Header;
