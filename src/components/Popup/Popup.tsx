import { IGiveNumber } from '@/types';
import { IoClose } from 'react-icons/io5';

interface PopupProps
   extends Omit<
      IGiveNumber,
      'email' | 'phone' | 'serviceId' | 'source' | 'status' | 'customerName'
   > {
   onClick: () => void;
}

const Popup: React.FC<PopupProps> = ({
   expiryTime,
   grantTime,
   orderNumber,
   serviceName,
   onClick,
}) => {
   const randomFromOneToEight = (): number => {
      return Math.floor(Math.random() * 8) + 1;
   };

   return (
      <div className="fixed text-center bg-black/50 w-full h-full inset-0 z-[200] flex items-center justify-center">
         <div className="w-auto bg-white rounded-3xl overflow-hidden relative">
            <IoClose
               onClick={onClick}
               size={30}
               className="absolute top-4 right-4 cursor-pointer hover:text-primaryColor/70 text-primaryColor transition-all duration-200 ease-in"
            />
            <div className="px-[74px] pt-[48px] py-[44px] text-primaryColor">
               <h4 className="font-bold text-[32px] leading-[48px] text-[#535261] mb-6">
                  Số thứ tự được cấp
               </h4>
               <span className="leading-[60px] font-extrabold text-[56px] text-primaryColor block mb-6">
                  {orderNumber}
               </span>
               <p className="text-[#282739] leading-[27px] font-normal text-lg">
                  DV: {serviceName} (tại quầy số {randomFromOneToEight()})
               </p>
            </div>
            <div className="py-4 px-[67px] bg-primaryColor">
               <p className="flex text-white items-center justify-center gap-2 font-bold text-[22px] leading-[33px]">
                  Thời gian cấp:<span>{grantTime}</span>
               </p>
               <p className="flex text-white items-center justify-center gap-2 font-bold text-[22px] leading-[33px]">
                  Hạn sử dụng:<span>{expiryTime}</span>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Popup;
