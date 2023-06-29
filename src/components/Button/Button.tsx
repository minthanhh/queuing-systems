import { useCallback } from 'react';

interface ButtonProps {
   disabled?: boolean;
   label: string;
   outline?: boolean;
   onSubmit?: () => void;
   onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
   label,
   outline,
   onSubmit,
   onClick,
}) => {
   const handleSubmit = useCallback(() => {
      onSubmit?.();
   }, [onSubmit]);

   return (
      <button
         className={`border w-[162px] border-primaryColor px-[24px] py-[10px] rounded-lg ${
            outline
               ? 'bg-transparent text-primaryColor'
               : 'bg-primaryColor text-white'
         }`}
         onClick={onClick ? onClick : handleSubmit}
      >
         {label}
      </button>
   );
};

export default Button;
