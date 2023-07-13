import { useEffect, useState } from 'react';
import { UseFormUnregister, FieldValues } from 'react-hook-form';

interface CheckboxProps {
   id: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   type?: string;
   label: string;
   unregister: UseFormUnregister<FieldValues>;
   checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
   id,
   onChange,
   label,
   type,
   checked,
   unregister,
}) => {
   const [isChecked, setIsChecked] = useState(checked);

   useEffect(() => {
      if (isChecked) {
         console.log(isChecked);
      } else {
         unregister(id);
      }
   }, [isChecked]);

   return (
      <>
         <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} onChange={onChange} />
         </div>
      </>
   );
};

export default Checkbox;
