import { Up } from '../../assets';

interface ArticleProps {
   icon: string;
   label: string;
   quantity: number;
   color: string;
}

const Article: React.FC<ArticleProps> = ({ icon, label, quantity, color }) => {
   return (
      <article className="w-full p-3 rounded-xl shadow-md bg-white">
         <div className="flex items-center mb-3 gap-3">
            <div
               className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}
            >
               <img src={icon} alt="" />
            </div>
            <h6 className="text-sm font-bold leading-[18px] max-w-[65px]">
               {label}
            </h6>
         </div>
         <div className="flex items-center justify-between">
            <span className="font-bold text-3xl leading-[45px] text-[#535261] w-[108px]">
               {quantity}
            </span>

            <span className="bg-[#FF950126] w-[48px] h-[15px] rounded-[7px] flex items-center justify-center">
               <img src={Up} alt="" />
               <span className="text-xs leading-3 font-normal">32,41%</span>
            </span>
         </div>
      </article>
   );
};

export default Article;
