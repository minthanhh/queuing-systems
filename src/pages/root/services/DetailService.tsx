// import { useParams } from 'react-router-dom';
import { Heading, Manager } from '@/components';
import { EditIcon } from '@/assets';

const DetailService = () => {
   // const { id } = useParams();

   return (
      <div className="w-full">
         <div className="px-6">
            <Heading label="Quản lý dịch vụ" />
         </div>

         <div className="flex items-start">
            <div className="md:flex gap-6 mx-6 mb-8 w-full">
               <div className="bg-white rounded-lg shadow-lg p-3 w-full md:w-1/3 flex-col flex-1">
                  <h5 className="text-primaryColor text-xl leading-[30px] font-bold">
                     Thông tin dịch vụ
                  </h5>

                  <div className="flex flex-col gap-3">
                     <div className="flex items-center font-semibold leading-6 text-base">
                        <h6>Mã dịch vụ:</h6>
                        <span>201</span>
                     </div>
                     <div className="flex items-center font-semibold leading-6 text-base">
                        <h6>Tên dịch vụ:</h6>
                        <span>Khám tim mạch</span>
                     </div>
                     <div className="flex items-center font-semibold leading-6 text-base">
                        <h6>Mô tả:</h6>
                        <span>Chuyên các bệnh lý về tim</span>
                     </div>
                  </div>

                  <h5 className="text-primaryColor font-bold text-xl leading-[30px] mb-3">
                     Quy tắc cấp số
                  </h5>

                  <div className="flex flex-col gap-3 pb-[calc(258px_-_32px)]">
                     <div className="flex items-center gap-[15px]">
                        <div className="flex items-center gap-1">
                           <span className="font-semibold text-base leading-6">
                              Tăng tự động từ:
                           </span>
                        </div>
                        <div className="flex gap-4 items-center">
                           <input
                              type="number"
                              placeholder="0001"
                              className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                           />
                           <span className="font-semibold text-base leading-6">
                              đến
                           </span>
                           <input
                              type="number"
                              placeholder="9999"
                              className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                           />
                        </div>
                     </div>
                     <div className="flex items-center gap-[15px]">
                        <div className="flex items-center">
                           <span className="font-semibold text-base leading-6">
                              Prefix:
                           </span>
                        </div>
                        <div className="flex items-center">
                           <input
                              type="number"
                              placeholder="0001"
                              className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                           />
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="flex items-center">
                           <span className="font-semibold text-base leading-6">
                              Reset mỗi ngày
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-4/6 bg-white shadow-lg px-6 py-4 rounded-md">
                  Table
               </div>
            </div>

            <Manager
               label="Cập nhật dịch vụ"
               icon={EditIcon}
               path="/services/update-service"
            />
         </div>
      </div>
   );
};

export default DetailService;
