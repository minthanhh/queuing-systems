interface BreadcrumbProps {
   breadcrumb: string;
   path: string;
   labels?: {
      label: string;
      path: string;
   }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb }) => {
   return (
      <>
         {}
         <span className="text-xl font-bold leading-[30px] text-primaryColor">
            {breadcrumb}
         </span>
      </>
   );
};

export default Breadcrumb;

// const Breadcrumb: React.FC<> = () => {
//    const location = useLocation();

//    const currentLocation = '';
//    const crumbs = location;
//    console.log(breadcrumbs);

//    return (
//     {breadcrumbs.path === location.pathname && (
//         <span className="text-xl font-bold leading-[30px] text-primaryColor">
//         {}
//      </span>
//     )}

//    );
// };
