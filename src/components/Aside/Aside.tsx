import { Device } from '../../assets';
import ProgressBar from 'react-customizable-progressbar';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { RootState } from '../../redux/store';
import { getTotalCounts } from '../../redux/slices/countSlice';
import { useEffect } from 'react';

const Aside = () => {
   const dispatch = useAppDispatch();
   const { device, service } = useAppSelector(
      (state: RootState) => state.count
   );

   useEffect(() => {
      dispatch(getTotalCounts());
   }, [dispatch]);
   return (
      <div className="px-6 w-[450px] bg-white shadow-md top-0 right-0 absolute z-50 h-full pt-[104px] pl-6">
         <h2 className="text-primaryColor font-bold text-2xl leading-9 mb-4">
            Tổng quan
         </h2>
         <div className="flex flex-col gap-3">
            <div className="flex items-center shadow-lg rounded-md w-full px-4 py-3">
               <div className="mr-3">
                  <ProgressBar
                     className="first-circle"
                     radius={30}
                     progress={(device.totalActive / device.total) * 100}
                     strokeColor="#f7921b"
                     pointerRadius={3}
                     pointerStrokeWidth={0}
                     strokeWidth={5}
                     trackStrokeWidth={5}
                     pointerStrokeColor="#7bcd5c"
                     initialAnimationDelay={1000}
                     initialAnimation={true}
                     trackTransition=".1s ease"
                     transition="1s ease"
                  >
                     <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                        <ProgressBar
                           radius={20}
                           className="third-circle"
                           progress={
                              (device.totalInActive / device.total) * 100
                           }
                           strokeColor="#f2291e"
                           strokeWidth={5}
                           trackStrokeWidth={5}
                           pointerRadius={3}
                           pointerStrokeWidth={0}
                           pointerStrokeColor="#7bcd5c"
                           initialAnimationDelay={1000}
                           initialAnimation={true}
                           trackTransition=".1s ease"
                           transition="1s ease"
                        >
                           <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                              {(
                                 (device.totalActive / device.total) *
                                 100
                              ).toFixed()}
                              %
                           </div>
                        </ProgressBar>
                     </div>
                  </ProgressBar>
               </div>
               <div className="flex flex-col mr-[37px]">
                  <span className="font-extrabold text-2xl leading-9 text-[#535261]">
                     {device.total}
                  </span>
                  <span className="flex items-center gap-1 text-primaryColor text-sm font-semibold leading-5">
                     <img src={Device} alt="" />
                     Thiết bị
                  </span>
               </div>
               <div className="flex flex-col">
                  <span className="flex items-center">
                     <span className="w-1 h-1 rounded-full bg-yellow-500 mr-1"></span>
                     Đang hoạt động
                     <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                        {device.totalActive}
                     </span>
                  </span>
                  <span className="flex items-center">
                     <span className="w-1 h-1 rounded-full bg-gray-300 mr-1"></span>
                     Ngưng hoạt động
                     <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                        {device.totalInActive}
                     </span>
                  </span>
               </div>
            </div>
            <div className="flex items-center shadow-lg rounded-md w-full px-4 py-3">
               <div className="mr-3">
                  <ProgressBar
                     className="first-circle"
                     radius={30}
                     progress={(service.totalActive / service.total) * 100}
                     strokeColor="#f7921b"
                     pointerRadius={3}
                     pointerStrokeWidth={0}
                     strokeWidth={5}
                     trackStrokeWidth={5}
                     pointerStrokeColor="#7bcd5c"
                     initialAnimationDelay={1000}
                     initialAnimation={true}
                     trackTransition=".1s ease"
                     transition="1s ease"
                  >
                     <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                        <ProgressBar
                           radius={20}
                           className="third-circle"
                           progress={
                              (service.totalInActive / service.total) * 100
                           }
                           strokeColor="#f2291e"
                           strokeWidth={5}
                           trackStrokeWidth={5}
                           pointerRadius={3}
                           pointerStrokeWidth={0}
                           pointerStrokeColor="#7bcd5c"
                           initialAnimationDelay={1000}
                           initialAnimation={true}
                           trackTransition=".1s ease"
                           transition="1s ease"
                        >
                           <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                              90%
                           </div>
                        </ProgressBar>
                     </div>
                  </ProgressBar>
               </div>
               <div className="flex flex-col mr-[37px]">
                  <span className="font-extrabold text-2xl leading-9 text-[#535261]">
                     {service.total}
                  </span>
                  <span className="flex items-center gap-1 text-primaryColor text-sm font-semibold leading-5">
                     <img src={Device} alt="" />
                     Thiết bị
                  </span>
               </div>
               <div className="flex flex-col">
                  <span className="flex items-center">
                     <span className="w-1 h-1 rounded-full bg-yellow-500 mr-1"></span>
                     Đang hoạt động
                     <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                        {service.totalActive}
                     </span>
                  </span>
                  <span className="flex items-center">
                     <span className="w-1 h-1 rounded-full bg-gray-300 mr-1"></span>
                     Ngưng hoạt động
                     <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                        {service.totalInActive}
                     </span>
                  </span>
               </div>
            </div>
            <div className="flex items-center shadow-lg rounded-md w-full px-4 py-3">
               <div className="mr-3">
                  <ProgressBar
                     className="first-circle"
                     radius={30}
                     progress={90}
                     strokeColor="#f7921b"
                     pointerRadius={3}
                     pointerStrokeWidth={0}
                     strokeWidth={5}
                     trackStrokeWidth={5}
                     pointerStrokeColor="#7bcd5c"
                     initialAnimationDelay={1000}
                     initialAnimation={true}
                     trackTransition=".1s ease"
                     transition="1s ease"
                  >
                     <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                        <ProgressBar
                           radius={20}
                           className="third-circle"
                           progress={30}
                           strokeColor="#f2291e"
                           strokeWidth={5}
                           trackStrokeWidth={5}
                           pointerRadius={3}
                           pointerStrokeWidth={0}
                           pointerStrokeColor="#7bcd5c"
                           initialAnimationDelay={1000}
                           initialAnimation={true}
                           trackTransition=".1s ease"
                           transition="1s ease"
                        >
                           <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                              90%
                           </div>
                        </ProgressBar>
                     </div>
                  </ProgressBar>
               </div>
               <div className="flex flex-col mr-[37px]">
                  <span className="font-extrabold text-2xl leading-9 text-[#535261]">
                     4.221
                  </span>
                  <span className="flex items-center gap-1 text-primaryColor text-sm font-semibold leading-5">
                     <img src={Device} alt="" />
                     Thiết bị
                  </span>
               </div>
               <div className="flex flex-col">
                  <span className="flex items-center">
                     <span className="w-1 h-1 rounded-full bg-yellow-500 mr-1"></span>
                     Đang hoạt động
                     <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                        3.799
                     </span>
                  </span>
                  <span className="flex items-center">
                     <span className="w-1 h-1 rounded-full bg-gray-300 mr-1"></span>
                     Ngưng hoạt động
                     <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                        422
                     </span>
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Aside;
