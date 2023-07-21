import { AngleRightIcon } from '@/assets';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
   breadcrumb: string;
   path: string;
   label: string;
   subLabel?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
   breadcrumb,
   label,
   path,
   subLabel,
}) => {
   return (
      <>
         <div className="flex items-center gap-2">
            <Link
               to={path}
               className="text-[#7e7d88] font-bold leading-[30px] text-xl"
            >
               {label}
            </Link>
            <img src={AngleRightIcon} alt="" />
            {subLabel ? (
               <>
                  <span className="text-xl font-bold leading-[30px]">
                     {breadcrumb}
                  </span>

                  <span className="text-xl font-bold leading-[30px] text-primaryColor">
                     {subLabel}
                  </span>
               </>
            ) : (
               <span className="text-xl font-bold leading-[30px] text-primaryColor">
                  {breadcrumb}
               </span>
            )}
         </div>
      </>
   );
};

export default Breadcrumb;
