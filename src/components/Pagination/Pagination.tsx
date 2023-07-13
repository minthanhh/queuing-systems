import { ChevronLeft, ChevronRight } from '../../assets';
import { Link } from 'react-router-dom';

const Pagination = () => {
   return (
      <div className="flex items-center py-6 justify-between">
         <div className="flex flex-1 justify-between sm:hidden">
            <Link
               to="#"
               className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
               Previous
            </Link>
            <Link
               to="#"
               className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
               Next
            </Link>
         </div>
         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
            <div>
               <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
               >
                  <Link
                     to={'/'}
                     className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 focus:z-20 focus:outline-offset-0"
                  >
                     <span className="sr-only">Previous</span>
                     <img src={ChevronLeft} alt="" />
                  </Link>
                  <Link
                     to={'/'}
                     className="relative z-10 rounded-[4px] inline-flex items-center bg-primaryColor px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     1
                  </Link>
                  <Link
                     to={'/'}
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus:outline-offset-0"
                  >
                     2
                  </Link>
                  <Link
                     to={'/'}
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus:outline-offset-0"
                  >
                     3
                  </Link>
                  <Link
                     to={'/'}
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus:outline-offset-0"
                  >
                     4
                  </Link>
                  <Link
                     to={'/'}
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus:outline-offset-0"
                  >
                     5
                  </Link>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-offset-0">
                     ...
                  </span>
                  <Link
                     to={'/'}
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus:outline-offset-0"
                  >
                     10
                  </Link>
                  <Link
                     to={'/'}
                     className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 focus:z-20 focus:outline-offset-0"
                  >
                     <span className="sr-only">Next</span>
                     <img src={ChevronRight} alt="" />
                  </Link>
               </nav>
            </div>
         </div>
      </div>
   );
};

export default Pagination;
