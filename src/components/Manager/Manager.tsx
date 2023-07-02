import { Link } from 'react-router-dom';

interface ManagerProps {
   label: string;
   icon: string;
   path: string;
}

const Manager: React.FC<ManagerProps> = ({ icon, label, path }) => {
   return (
      <>
         <Link to={path}>
            <div className="flex flex-col gap-1 px-1 py-3 bg-[#fff2e7] rounded-s-lg text-center shadow-md backdrop-blur-md">
               <img className="h-7 w-7 mx-auto" src={icon} alt="" />
               <span className="text-primaryColor leading-[19px] font-semibold text-sm max-w-[72px]">
                  {label}
               </span>
            </div>
         </Link>
      </>
   );
};

export default Manager;
