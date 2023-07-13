import { DefaultAvatar, Notify } from '../../assets';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useAppSelector } from '@/hooks/storeHooks';
import { RootState } from '@/redux/store';

type BreadcrumbType = {
   breadcrumb: string;
   label: string;
   path?: string;
   children?: {
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
};

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
   const location = useLocation();
   const { profile } = useAppSelector((state: RootState) => state.user);

   const lists: TestType[] = [];

   breadcrumbs.forEach((crumb) => {
      if (!crumb.children) {
         lists.push(crumb);
      } else {
         crumb.children.forEach((child) => {
            lists.push({
               ...child,
               breadcrumb: child.label,
               label: crumb.breadcrumb,
            });
         });
      }
   });

   return (
      <header className="h-[88px] w-full bg-transparent p-6 relative z-[100]">
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
               <div className="bg-[#FFF2E7] rounded-full w-8 h-8 flex items-center justify-center">
                  <img src={Notify} alt="Icon Notification" />
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
