import { DropDown } from '../../assets';
import { components } from 'react-select';

const Dropdown = (props: any) => {
   return (
      <components.DropdownIndicator {...props}>
         <div>
            <img src={DropDown} alt="" />
         </div>
      </components.DropdownIndicator>
   );
};

export default Dropdown;
