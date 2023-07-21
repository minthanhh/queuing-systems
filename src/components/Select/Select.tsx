import { useState } from 'react';
import { DropDown } from '@/assets';
import { twMerge } from 'tailwind-merge';
import { Options } from '@/types';

interface SelectCustomeProps {
   options: Options[];
   value?: string;
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
   className?: string;
   name?: string;
   defaultValue?: string;
}

const SelectCustome: React.FC<SelectCustomeProps> = ({
   options,
   onChange,
   value,
   className,
   name,
   defaultValue,
}) => {
   const [rotateUp, setRotateUp] = useState(false);
   const hanldeIconRotate = () => {
      setRotateUp((v) => !v);
   };
   return (
      <div
         className={twMerge(
            'border-2 rounded-lg border-[#d4d4d7] flex items-center relative w-[300px]',
            className
         )}
      >
         <select
            name={name}
            className="appearance-none w-full bg-transparent py-[10px] px-3 outline-none"
            onClick={hanldeIconRotate}
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
         >
            {options.map((opt, i) => (
               <option key={i} value={opt.type}>
                  {opt.label}
               </option>
            ))}
         </select>
         <img
            className={`absolute top-3 right-3 transition-all ease-linear duration-200 ${
               rotateUp ? 'rotate-180' : 'rotate-0'
            }`}
            src={DropDown}
            alt=""
         />
      </div>
   );
};

export default SelectCustome;
