import { Heading, Manager, Table } from '@/components';
import { EditIcon } from '@/assets';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/configs/firebase.config';
import { ServiceType, IOrderNumberAndState } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { RootState } from '@/redux/store';
import { getOrderNumberAndState } from '@/redux/slices/numberSlice';
import { ActionUse } from '@/components/Columns';

const DetailService = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [service, setService] = useState<ServiceType>();
   const { orderAndState } = useAppSelector((state: RootState) => state.number);
   const { serviceId } = useParams();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (serviceId) {
         const getDataById = async () => {
            const dSnap = await getDoc(doc(db, 'services', serviceId));
            setService(dSnap.data() as ServiceType);
         };
         getDataById();
      }
   }, [serviceId]);

   useEffect(() => {
      if (orderAndState.length === 0) {
         setIsLoading(true);
         dispatch(getOrderNumberAndState(serviceId as string)).then(() => {
            setIsLoading(false);
         });
      }
   }, [orderAndState.length, dispatch, serviceId]);

   const columns = useMemo<ColumnDef<IOrderNumberAndState>[]>(
      () => [
         {
            header: 'Số thứ tự',
            accessorKey: 'orderNumber',
         },
         {
            header: 'Trạng thái',
            accessorKey: 'status',
            cell: ActionUse,
         },
      ],
      []
   );

   return (
      <div className="w-full">
         <div className="px-6">
            <Heading label="Quản lý dịch vụ" />
         </div>

         <div className="flex items-start">
            <div className="md:flex gap-6 mx-6 mb-8 w-full">
               <div className="bg-white rounded-lg shadow-lg p-3 w-full md:w-1/3 flex-col flex-1">
                  <h5 className="text-primaryColor text-xl leading-[30px] font-bold mb-3">
                     Thông tin dịch vụ
                  </h5>

                  <div className="flex flex-col gap-3 mb-4">
                     <div className="flex items-center font-semibold leading-6 text-base gap-5">
                        <h6>Mã dịch vụ:</h6>
                        <span>{service?.id}</span>
                     </div>
                     <div className="flex items-center font-semibold leading-6 text-base gap-5">
                        <h6>Tên dịch vụ:</h6>
                        <span>{service?.name}</span>
                     </div>
                     <div className="flex items-center font-semibold leading-6 text-base gap-5">
                        <h6 className="w-min">Mô tả:</h6>
                        <span className="flex-1">{service?.description}</span>
                     </div>
                  </div>

                  <h5 className="text-primaryColor font-bold text-xl leading-[30px] mb-3">
                     Quy tắc cấp số
                  </h5>

                  <div className="flex flex-col gap-3 pb-[calc(258px_-_32px)]">
                     <div className="flex items-center gap-[15px]">
                        <div className="flex items-center gap-1">
                           <span className="font-semibold text-base leading-6">
                              Tăng tự động:
                           </span>
                        </div>
                        <div className="flex gap-4 items-center">
                           <input
                              type="number"
                              defaultValue={service?.from}
                              className="border-2 w-20 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                           />
                           <span className="font-semibold text-base leading-6">
                              đến
                           </span>
                           <input
                              defaultValue={service?.to}
                              type="number"
                              className="border-2 w-20 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                           />
                        </div>
                     </div>
                     {service?.prefix ? (
                        <div className="flex items-center gap-[15px]">
                           <div className="flex items-center">
                              <span className="font-semibold text-base leading-6">
                                 Prefix:
                              </span>
                           </div>
                           <div className="flex items-center">
                              <input
                                 type="number"
                                 defaultValue={service.prefix}
                                 className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                              />
                           </div>
                        </div>
                     ) : null}

                     {service?.surfix ? (
                        <div className="flex items-center gap-[15px]">
                           <div className="flex items-center">
                              <span className="font-semibold text-base leading-6">
                                 Prefix:
                              </span>
                           </div>
                           <div className="flex items-center">
                              <input
                                 type="number"
                                 defaultValue={service.surfix}
                                 className="border-2 w-16 px-3 py-[10px] border-borderGray outline-none rounded-lg appearance-none font-normal text-base leading-6 text-[#535261]"
                              />
                           </div>
                        </div>
                     ) : null}
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
                  <Table
                     data={orderAndState}
                     columns={columns}
                     className="pl-0"
                     isLoading={isLoading}
                     pageSize={8}
                  />
               </div>
            </div>

            <Manager
               label="Cập nhật dịch vụ"
               icon={EditIcon}
               path={'/services/update-service/' + serviceId}
            />
         </div>
      </div>
   );
};

export default DetailService;
