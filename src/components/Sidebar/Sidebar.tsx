import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { noActive, onActive } from '@/utils/styles';
import { useAppDispatch } from '@/hooks/storeHooks';
import { Route } from '@/types';
import { LogoAlta, LogoutIcon } from '@/assets';
import { logout } from '@/redux/slices/userSlice';

interface SidebarProps {
   routes: Route[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem('isAuthenticated');
      setIsLoading(true);
      dispatch(logout()).then(() => {
         setIsLoading(false);
         toast.success('Đăng xuất thành công 🥳');
         navigate('/login', { replace: true });
      });
   };

   return (
      <div className="h-full flex flex-col w-[200px] shadow-md backdrop-blur-md bg-white relative z-50">
         <div className="mt-[32px] mb-[54px] mx-[60px]">
            <img src={LogoAlta} alt="" />
         </div>
         <nav className="">
            <ul className="flex flex-col">
               {routes.map(({ label, icon, path, more, children }, idx) =>
                  path ? (
                     <NavLink
                        key={`${label}${idx}2`}
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
                                          key={`${label}` + index}
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
                     <div
                        key={`${label} + ${idx}`}
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
                                    {children.map(({ label, path }, index) => (
                                       <NavLink
                                          key={index + label + path}
                                          className={({ isActive }) =>
                                             isActive ? onActive : noActive
                                          }
                                          to={path}
                                       >
                                          <span className="pl-1 py-3 block">
                                             {label}
                                          </span>
                                       </NavLink>
                                    ))}
                                 </ul>
                              </nav>
                           </div>
                        )}
                     </div>
                  )
               )}
            </ul>
         </nav>

         <div className="mx-auto mt-auto mb-[30px]">
            <button
               className="bg-[#fff2e7] flex gap-3 items-center justify-start py-[14px] px-3 font-semibold text-base leading-6 rounded-lg w-[176px] text-primaryColor"
               onClick={handleLogout}
               disabled={isLoading}
            >
               <img src={LogoutIcon} alt="" />
               Đăng xuất
            </button>
         </div>
      </div>
   );
};

export default Sidebar;
