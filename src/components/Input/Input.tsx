import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { DeviceType } from '../../types';

interface InputProps {
   label: string;
   id: string;
   type?: string;
   placeholder?: string;
   required?: boolean;
   errors: FieldErrors<FieldValues>;
   icon?: string;
   register?: UseFormRegister<FieldValues>;
   value?: string | string[];
}

const Input: React.FC<InputProps> = ({
   id,
   label,
   type,
   register,
   required,
   placeholder,
   errors,
   value,
}) => {
   return (
      <div className="w-full mb-4">
         <label htmlFor={id} className="mb-1">
            {label}
            <sup className="text-red-500 ml-[5px]">*</sup>
         </label>
         <div
            className={`rounded-lg border-2 shadow-md overflow-hidden transition-all ease-in-out duration-100 ${
               errors[id] ? 'border-red-400' : 'border-borderGray'
            }`}
         >
            <input
               className="w-full outline-none border-none py-[10px] pl-3"
               type={type}
               id={id}
               placeholder={placeholder}
               {...register?.(id, { required })}
               value={value}
            />
         </div>
      </div>
   );
};

export default Input;
