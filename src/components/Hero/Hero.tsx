import { Heroes } from '../../assets'

const Hero = () => {
    return (
        <div className="w-4/6 relative bg-white hidden lg:block">
            <img className="bottom-[83px] left-[79px] mb-[83px] ml-[79px]" src={Heroes} alt="" />
            <div className="absolute right-[33px] bottom-[302px]">
                <p className="text-primaryColor leading-[51px] font-normal text-[34px]">Hệ thống</p>
                <p className="text-primaryColor uppercase font-black text-[36px] leading-[54px] text-center">Quản lý xếp hàng</p>
            </div>
        </div>
    )
}

export default Hero
