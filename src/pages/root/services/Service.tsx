import Select, { DropdownIndicatorProps, components } from 'react-select';
import { AddSquare, DropDown, SearchIcon } from '../../../assets';
import { Manager, Table } from '../../../components';
import { Link } from 'react-router-dom';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
   return (
      <components.DropdownIndicator {...props} className="p-0">
         <img src={DropDown} alt="" />
      </components.DropdownIndicator>
   );
};

const Service = () => {
   return (
      <div className="flex w-full">
         <div className="mt-4 flex-1">
            <h2 className="text-primaryColor px-6 font-bold text-2xl leading-9 mb-4">
               Danh sách thiết bị
            </h2>
            <div className="flex items-center px-6 justify-between mb-4 mr-[108px]">
               <div className="flex items-center gap-6">
                  <div>
                     <h6 className="mb-1 text-[#282739]">
                        Trạng thái hoạt động
                     </h6>
                     <Select
                        defaultValue={{ label: 'Tất cả' }}
                        options={[
                           { label: 'Tất cả' },
                           { label: 'Hoạt động' },
                           { label: 'Ngưng hoạt động' },
                        ]}
                        components={{
                           IndicatorSeparator: null,
                        }}
                        classNames={{
                           control: () => 'border-[#d4d4d7] border-[1.5px]',
                           input: () => 'text-[#535261] w-[300px]',
                           option: () =>
                              'text-base font-normal leading-6 text-[#535261] hover:bg-[#fff2e7]',
                        }}
                     />
                  </div>
                  <div>
                     <h6 className="mb-1 text-[#282739]">Chọn thời gian</h6>
                  </div>
               </div>
               <div>
                  <h6>Từ khoá</h6>
                  <div className="flex items-center bg-white border-2 border-[#d4d4d7] rounded-lg p-3">
                     <input
                        className="outline-none"
                        type="text"
                        placeholder="Nhập từ khóa"
                     />
                     <img src={SearchIcon} alt="" />
                  </div>
               </div>
            </div>

            <div className="flex items-start">
               <Manager
                  icon={AddSquare}
                  label="Thêm dịch vụ"
                  path="/services/add-service"
               />
            </div>

            <nav aria-label="Page navigation example">
               <ul className="inline-flex items-center -space-x-px">
                  <li>
                     <a
                        href="#"
                        className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        <span className="sr-only">Previous</span>
                        <svg
                           aria-hidden="true"
                           className="w-5 h-5"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fill-rule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                           ></path>
                        </svg>
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        1
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        2
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        aria-current="page"
                        className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                     >
                        3
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        4
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        5
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     >
                        <span className="sr-only">Next</span>
                        <svg
                           aria-hidden="true"
                           className="w-5 h-5"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                           ></path>
                        </svg>
                     </a>
                  </li>
               </ul>
            </nav>
         </div>
      </div>
   );
};

export default Service;
