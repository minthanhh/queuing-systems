import { twMerge } from 'tailwind-merge';

interface HeadingProps {
   label: string;
   className?: string;
}

const Heading: React.FC<HeadingProps> = ({ label, className }) => {
   return (
      <>
         <h2
            className={twMerge(
               'text-primaryColor font-bold text-2xl leading-9 mb-4',
               className
            )}
         >
            {label}
         </h2>
      </>
   );
};

export default Heading;
