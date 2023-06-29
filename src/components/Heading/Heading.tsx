interface HeadingProps {
   label: string;
}

const Heading: React.FC<HeadingProps> = ({ label }) => {
   return (
      <>
         <h2 className="text-primaryColor font-bold text-2xl leading-9 mb-4">
            {label}
         </h2>
      </>
   );
};

export default Heading;
