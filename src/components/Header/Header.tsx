import { Avatar, Notify } from '../../assets';
import { BreadcrumbType } from '../../types';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
   breadcrumbs: BreadcrumbType[];
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
   const location = useLocation();
   return (
      <div className="h-[88px] w-full bg-transparent p-6">
         <div className="flex justify-between items-center">
            {breadcrumbs.map(
               (crumb, index) =>
                  location.pathname === crumb.path && (
                     <Breadcrumb
                        key={index}
                        breadcrumb={crumb.breadcrumb}
                        path={crumb.path}
                        labels={crumb.labels}
                     />
                  )
            )}
            <div className="flex items-center gap-6">
               <div className="bg-[#FFF2E7] rounded-full w-8 h-8 flex items-center justify-center">
                  <img src={Notify} alt="Icon Notification" />
               </div>

               <div className="flex items-center gap-2">
                  <img src={Avatar} alt="" />
                  <div className="flex flex-col">
                     <span className="font-normal text-xs leading-[18px] text-[#7E7D88]">
                        Xin chào
                     </span>
                     <h3 className="text-base leading-6 font-bold">
                        Lê Quỳnh Ái Vân
                     </h3>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
