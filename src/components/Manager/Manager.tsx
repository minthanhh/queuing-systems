import { Link } from 'react-router-dom';

interface ManagerProps {
   label: string;
   icon: string;
   path: string;
   type?: string;
   onClick?: () => void;
}

const Manager: React.FC<ManagerProps> = ({
   icon,
   label,
   path,
   type,
   onClick,
}) => {
   return (
      <>
         {type === 'download' ? (
            <button onClick={onClick}>
               <div className="flex flex-col gap-1 px-1 py-3 bg-[#fff2e7] rounded-s-lg text-center shadow-md backdrop-blur-md">
                  <img className="h-7 w-7 mx-auto" src={icon} alt="" />
                  <span className="text-primaryColor leading-[19px] font-semibold text-sm w-[72px] max-w-[72px]">
                     {label}
                  </span>
               </div>
            </button>
         ) : (
            <Link to={path}>
               <div className="flex flex-col gap-1 px-1 py-3 bg-[#fff2e7] rounded-s-lg text-center shadow-md backdrop-blur-md">
                  <img className="h-7 w-7 mx-auto" src={icon} alt="" />
                  <span className="text-primaryColor leading-[19px] font-semibold text-sm w-[72px] max-w-[72px]">
                     {label}
                  </span>
               </div>
            </Link>
         )}
      </>
   );
};

export default Manager;
