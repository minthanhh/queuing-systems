import { DeviceColor, GiveNumberColor, ServiceColor } from '@/assets';
import ProgressBar from 'react-customizable-progressbar';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { RootState } from '@/redux/store';
import { getTotalCounts } from '@/redux/slices/countSlice';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useAppDispatch();
   const { device, service } = useAppSelector(
      (state: RootState) => state.count
   );
   const { all, fulfilled, pending, rejected } = useAppSelector(
      (state: RootState) => state.count.giveNumber
   );

   useEffect(() => {
      setIsLoading(true);
      dispatch(getTotalCounts()).then(() => {
         setIsLoading(false);
      });
   }, [dispatch]);

   const data = useMemo(
      () => [
         {
            id: 'device',
            name: 'Thiết bị',
            total: device.total,
            active: device.active,
            inActive: device.unactive,
            percentActive: (device.active / device.total) * 100,
            percentInActive: (device.unactive / device.total) * 100,
            percent: ((device.active / device.total) * 100)?.toFixed(),
            color: '#ff7506',
            icon: DeviceColor,
            path: '/devices',
         },
         {
            id: 'service',
            name: 'Dịch vụ',
            total: service.total,
            active: service.active,
            inActive: service.unactive,
            percentActive: (service.active / service.total) * 100,
            percentInActive: (service.unactive / service.total) * 100,
            percent: ((service.active / service.total) * 100)?.toFixed(),
            color: '#4277ff',
            icon: ServiceColor,
            path: '/services',
         },
         {
            id: 'give-number',
            name: 'Cấp số',
            total: all,
            active: fulfilled,
            inActive: rejected,
            pending,
            percentActive: (fulfilled / all) * 100,
            percentInActive: (rejected / all) * 100,
            percentPending: (pending / all) * 100,
            percent: ((fulfilled / all) * 100)?.toFixed(),
            color: '#35c75a',
            icon: GiveNumberColor,
            path: '/give-number',
         },
      ],
      [device, service, all, fulfilled, rejected, pending]
   );

   if (isLoading) {
      return (
         <div className="px-6 w-[450px] animate-pulse bg-white shadow-md top-0 right-0 absolute z-50 h-full pt-[104px] pl-6">
            <h2 className="text-primaryColor font-bold text-2xl leading-9 mb-4">
               Tổng quan
            </h2>

            <div className="flex flex-col gap-3">
               {Array(data.length)
                  .fill({})
                  .map((_, idx) => (
                     <div
                        key={idx}
                        className="flex shadow-lg rounded-md w-full px-4 py-3 flex-col"
                     >
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[300px] mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                     </div>
                  ))}
            </div>
         </div>
      );
   }

   return (
      <div className="px-6 w-[450px] bg-white shadow-md top-0 right-0 absolute z-50 h-full pt-[104px] pl-6">
         <h2 className="text-primaryColor font-bold text-2xl leading-9 mb-4">
            Tổng quan
         </h2>
         <div className="flex flex-col gap-3">
            {data.map((item, idx) => (
               <Link to={item.path} key={item.id + idx}>
                  <div className="flex items-center shadow-lg rounded-md w-full px-4 py-3">
                     {
                        <div className="mr-3">
                           <ProgressBar
                              radius={35}
                              progress={item.percentActive}
                              strokeColor={item.color}
                              pointerRadius={3}
                              pointerStrokeWidth={0}
                              strokeWidth={3}
                              trackStrokeWidth={3}
                              pointerStrokeColor="black"
                              initialAnimationDelay={100}
                              initialAnimation={true}
                              trackTransition=".1s ease"
                              transition="1s ease"
                           >
                              <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                                 <ProgressBar
                                    radius={28}
                                    className="third-circle"
                                    progress={item.percentPending as number}
                                    strokeColor="#7e7d88"
                                    strokeWidth={3}
                                    trackStrokeWidth={3}
                                    pointerRadius={3}
                                    pointerStrokeWidth={0}
                                    pointerStrokeColor="#7bcd5c"
                                    initialAnimationDelay={1000}
                                    initialAnimation={true}
                                    trackTransition=".1s ease"
                                    transition="1s ease"
                                 >
                                    {item.id === 'give-number' ? (
                                       <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                                          <ProgressBar
                                             radius={21}
                                             className="third-circle"
                                             progress={item.percentInActive}
                                             strokeColor="#f178b6"
                                             strokeWidth={3}
                                             trackStrokeWidth={3}
                                             pointerRadius={3}
                                             pointerStrokeWidth={0}
                                             pointerStrokeColor="#7bcd5c"
                                             initialAnimationDelay={1000}
                                             initialAnimation={true}
                                             trackTransition=".1s ease"
                                             transition="1s ease"
                                          >
                                             <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                                                <span className="text-bold text-secondary text-sm flex items-center justify-center">
                                                   {item.percent}%
                                                </span>
                                             </div>
                                          </ProgressBar>
                                       </div>
                                    ) : (
                                       <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                                          <span className="text-bold text-secondary text-sm flex items-center justify-center">
                                             {item.percent}%
                                          </span>
                                       </div>
                                    )}
                                 </ProgressBar>
                              </div>
                           </ProgressBar>
                        </div>
                     }

                     <div className="flex flex-col mr-[37px]">
                        <span className="font-extrabold text-2xl leading-9 text-[#535261]">
                           {item.total}
                        </span>
                        <span
                           className={`flex items-center gap-1 text-[${item.color}] text-sm font-semibold leading-5`}
                        >
                           <img src={item.icon} alt="" />
                           {item.name}
                        </span>
                     </div>
                     {item.id !== 'give-number' ? (
                        <div className="flex flex-col">
                           <span className="flex items-center">
                              <span className="w-1 h-1 rounded-full bg-yellow-500 mr-1"></span>
                              Đang hoạt động
                              <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                                 {item.active}
                              </span>
                           </span>
                           <span className="flex items-center">
                              <span className="w-1 h-1 rounded-full bg-gray-300 mr-1"></span>
                              Ngưng hoạt động
                              <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                                 {item.inActive}
                              </span>
                           </span>
                        </div>
                     ) : (
                        <div className="flex flex-col">
                           <span className="flex items-center">
                              <span className="w-1 h-1 rounded-full bg-[#35c75a] mr-1"></span>
                              Đã sử dụng
                              <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                                 {item.active}
                              </span>
                           </span>
                           <span className="flex items-center">
                              <span className="w-1 h-1 rounded-full bg-[#7e7d88] mr-1"></span>
                              Đang chờ
                              <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                                 {item.pending}
                              </span>
                           </span>
                           <span className="flex items-center">
                              <span className="w-1 h-1 rounded-full bg-[#f178b6] mr-1"></span>
                              Bỏ qua
                              <span className="text-primaryColor text-sm leading-[18px] font-bold ml-3">
                                 {item.inActive}
                              </span>
                           </span>
                        </div>
                     )}
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Aside;
