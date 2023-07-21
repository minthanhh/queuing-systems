import { twMerge } from 'tailwind-merge';
import { ChevronLeft, ChevronRight } from '../../assets';

interface PaginationProps {
   pageCount: number;
   pageIndex: number;
   setPageIndex: (idx: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
   pageCount,
   pageIndex,
   setPageIndex,
}) => {
   return (
      <div className="flex items-center py-6 justify-end">
         <nav className="flex items-center" aria-label="Pagination">
            <button className="w-[32px] h-[32px] p-1 rounded">
               <img src={ChevronLeft} alt="" />
            </button>
            {Array(pageCount)
               .fill({})
               .map((_, idx) => (
                  <button
                     key={idx}
                     onClick={() => setPageIndex(idx)}
                     className={twMerge(
                        'w-[32px] h-[32px] font-bold text-base leading-5 py-[5px] px-[11px] rounded flex items-center justify-center',
                        pageIndex === idx
                           ? 'bg-primaryColor text-white'
                           : 'bg-transparent text-[#7e7d88]'
                     )}
                  >
                     {idx + 1}
                  </button>
               ))}
            <button className="w-[32px] h-[32px] p-1 rounded">
               <img src={ChevronRight} alt="" />
            </button>
         </nav>
      </div>
   );
};

export default Pagination;
