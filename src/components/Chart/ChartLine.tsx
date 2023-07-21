import { Line } from 'react-chartjs-2';
import {
   Chart as ChartJS,
   CategoryScale,
   LineElement,
   ChartData,
   Point,
   LinearScale,
   PointElement,
} from 'chart.js/auto';
import { DropDown } from '@/assets';

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement);

interface ChartLineProps {
   chartData: ChartData<'line', (number | Point | null)[], unknown>;
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
   changeTime: string;
}

const ChartLine = ({ chartData, onChange, changeTime }: ChartLineProps) => {
   const currentDateUTC = new Date();
   const vietnamTimeOffset = 7 * 60 * 60 * 1000;
   const currentDateVietnam = new Date(
      currentDateUTC.getTime() + vietnamTimeOffset
   );
   const month = currentDateVietnam.getMonth() + 1;
   const year = currentDateVietnam.getFullYear();

   return (
      <div className="w-full h-auto bg-white rounded-lg shadow-md p-6">
         <div className="flex items-start justify-between">
            <div className="flex flex-col justify-start gap-1">
               <h5 className="font-bold text-xl leading-[30px] text-[#282739]">
                  {changeTime === 'months'
                     ? 'Bảng thống kê theo tháng'
                     : changeTime === 'days'
                     ? 'Bảng thống kê theo ngày'
                     : changeTime === 'weeks'
                     ? 'Bảng thống kê theo tuần'
                     : ''}
               </h5>
               <span className="text-[#a9a9b0]">
                  {changeTime === 'months' ? (
                     <>Năm {year}</>
                  ) : (
                     <>
                        Tháng {month}/{year}
                     </>
                  )}
               </span>
            </div>

            <div className="flex items-center gap-2">
               <span className="text-base font-semibold leading-6">
                  Xem theo
               </span>

               <div className="border-borderGray border-2 rounded-lg w-[106px] overflow-hidden relative group">
                  <label htmlFor="dateChangeId">
                     <select
                        id="dateChangeId"
                        className="border-none group-hover:cursor-pointer outline-none py-[10px] px-3 w-full appearance-none"
                        onChange={onChange}
                     >
                        <option value="days">Ngày</option>
                        <option value="weeks">Tuần</option>
                        <option value="months">Tháng</option>
                     </select>
                     <img
                        className="absolute group-hover:cursor-pointer top-2/4 -translate-y-2/4 right-3"
                        src={DropDown}
                        alt=""
                     />
                  </label>
               </div>
            </div>
         </div>
         <Line
            data={chartData}
            options={{
               animation: {
                  duration: 150,
                  delay: 50,
                  easing: 'easeInExpo',
               },
               plugins: {
                  legend: {
                     display: false,
                  },
                  tooltip: {
                     animation: {
                        duration: 150,
                        delay: 0,
                        easing: 'easeInCubic',
                     },
                     yAlign: 'bottom',
                     cornerRadius: 8,
                     backgroundColor: '#5185F7',
                     titleColor: 'white',
                     bodyAlign: 'center',
                     padding: {
                        y: 3,
                        x: 33,
                     },
                  },
               },
               backgroundColor: '#5185f7',
               borderColor: 'white',
               color: '#5185f7',
               scales: {
                  x: {
                     grid: {
                        display: false,
                     },
                  },
                  y: {
                     axis: 'y',
                     beginAtZero: true,
                  },
               },
            }}
         />
      </div>
   );
};

export default ChartLine;
