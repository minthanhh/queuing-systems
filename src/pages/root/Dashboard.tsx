import { Article1, Article2, Article3, Article4 } from '../../assets';
import { Article, Aside } from '../../components';

const Dashboard = () => {
   const data = [
      {
         label: 'Số thứ tự đã cấp',
         icon: Article1,
         quantity: 4221,
         color: 'bg-[#e8effe]',
      },
      {
         label: 'Số thứ tự đã cấp',
         icon: Article2,
         quantity: 3721,
         color: 'bg-[#e1f7e6]',
      },
      {
         label: 'Số thứ tự đang chờ',
         icon: Article3,
         quantity: 468,
         color: 'bg-[#fff3e9]',
      },
      {
         label: 'Số thứ tự đã bỏ qua',
         icon: Article4,
         quantity: 32,
         color: 'bg-[#fee9e9]',
      },
   ];

   return (
      <div className="flex w-[890px] h-full">
         <div className="px-6 mt-4 flex-1">
            <h2 className="text-primaryColor font-bold text-2xl leading-9 mb-4">
               Biều đồ cấp số
            </h2>
            <div className="flex items-center gap-[13px] p-1">
               {data.map((item, index) => (
                  <Article
                     key={index}
                     icon={item.icon}
                     color={item.color}
                     label={item.label}
                     quantity={item.quantity}
                  />
               ))}
            </div>
         </div>
         <Aside />
      </div>
   );
};

export default Dashboard;
