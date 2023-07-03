import { NavLink } from 'react-router-dom';
import { LogoAlta } from '../../assets';
import { Route } from '../../types';
import { noActive, onActive } from '../../utils/styles';

interface SidebarProps {
   routes: Route[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
   return (
      <div className="h-full flex flex-col w-[200px] shadow-md backdrop-blur-md bg-white relative z-50">
         <div className="mt-[32px] mb-[54px] mx-[60px]">
            <img src={LogoAlta} alt="" />
         </div>
         <nav className="">
            <ul className="flex flex-col">
               {routes.map(({ label, icon, path, more, children }, index) =>
                  path ? (
                     <NavLink
                        key={label + index}
                        className={({ isActive }) =>
                           isActive ? onActive : noActive
                        }
                        to={path}
                     >
                        <span className="flex items-start gap-2 py-3 font-semibold text-base leading-6">
                           <img src={icon} alt="" />
                           {label}
                           {path === '/setting-systems' && (
                              <img src={more} alt="" />
                           )}
                        </span>

                        {children && (
                           <div className="w-[290px]">
                              <nav>
                                 <ul>
                                    {children.map(({ label, path }, index) => (
                                       <NavLink
                                          key={path + index}
                                          className="transition-all ease-linear duration-200 px-4 hover:bg-[#FFF2E7] hover:text-primaryColor"
                                          to={path}
                                       >
                                          {label}
                                       </NavLink>
                                    ))}
                                 </ul>
                              </nav>
                           </div>
                        )}
                     </NavLink>
                  ) : (
                     <>
                        <div
                           key={label + index}
                           className="group px-3 relative text-textGray hover:bg-[#FFF2E7] hover:cursor-pointer select-none"
                        >
                           <span className="group-hover:text-primaryColor flex items-center gap-2 py-3 font-semibold text-base leading-6">
                              <img src={icon} alt="" />
                              {label}
                              <img src={more} alt="" />
                           </span>

                           {children && (
                              <div className="w-[290px] z-10 group-hover:visible group-hover:opacity-100 invisible opacity-0 absolute top-0 left-full overflow-hidden rounded-e-lg bg-white shadow-md transition-all ease-in duration-200">
                                 <nav>
                                    <ul className="flex flex-col">
                                       {children.map(
                                          ({ label, path }, index) => (
                                             <NavLink
                                                key={index + label + path}
                                                className={({ isActive }) =>
                                                   isActive
                                                      ? onActive
                                                      : noActive
                                                }
                                                to={path}
                                             >
                                                <span className="pl-1 py-3 block">
                                                   {label}
                                                </span>
                                             </NavLink>
                                          )
                                       )}
                                    </ul>
                                 </nav>
                              </div>
                           )}
                        </div>
                     </>
                  )
               )}
            </ul>
         </nav>
      </div>
   );
};

export default Sidebar;
