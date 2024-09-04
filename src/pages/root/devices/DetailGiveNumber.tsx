import { BackIcon } from '@/assets'
import { Heading, Manager } from '@/components'
import { db } from '@/configs/firebase.config'
import { useAppSelector } from '@/hooks/storeHooks'
import { RootState } from '@/redux/store'
import { IGiveNumber } from '@/types'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailGiveNumber = () => {
    const [giveNumber, setGiveNumber] = useState<IGiveNumber>()
    const { giveNumberId } = useParams()
    const { listGiveNumbers } = useAppSelector((state: RootState) => state.number)

    console.log(giveNumberId)

    useEffect(() => {
        if (giveNumberId) {
            const getDataById = async () => {
                const dSnap = await getDoc(doc(db, 'give-numbers', giveNumberId))
                setGiveNumber(dSnap.data() as IGiveNumber)
            }

            getDataById()
        }
    }, [giveNumberId, listGiveNumbers])

    return (
        <div className="w-full pl-6 h-[calc(100%_-_88px)]">
            <Heading label="Quản lý cấp số" />

            <div className="flex gap-7 h-[calc(100%_-_90px)]">
                <div className="bg-white rounded-lg shadow-md w-full px-6 py-4">
                    <h5 className="text-primaryColor leading-[30px] font-bold text-xl mb-5">Thông tin cấp số</h5>
                    <div className="flex items-center max-w-[845px] justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Họ tên:</h6>
                                <span className="text-[#535261]   leading-6 font-normal text-base">{giveNumber?.customerName}</span>
                            </div>

                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Tên dịch vụ:</h6>
                                <span className="text-[#535261]   leading-6 font-normal text-base">{giveNumber?.serviceName}</span>
                            </div>

                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Số thứ tự:</h6>
                                <span className="text-[#535261]   leading-6 font-normal text-base">{giveNumber?.orderNumber}</span>
                            </div>

                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Thời gian cấp:</h6>
                                <span className="text-[#535261]   leading-6 font-normal text-base">{giveNumber?.grantTime}</span>
                            </div>

                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Hạn sử dụng:</h6>
                                <span className="text-[#535261]   leading-6 font-normal text-base">{giveNumber?.expiryTime}</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Nguồn cấp:</h6>
                                <span className="text-[#535261]   leading-6 font-normal text-base">{giveNumber?.source}</span>
                            </div>

                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Tên dịch vụ:</h6>
                                <span className="text-[#535261]   leading-6 font-normal text-base">{giveNumber?.serviceName}</span>
                            </div>

                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Số điện thoại:</h6>
                                <span className="text-[#535261] leading-6 font-normal text-base">{giveNumber?.phone}</span>
                            </div>

                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Địa chỉ Email:</h6>
                                <span className="text-[#535261] leading-6 font-normal text-base">{giveNumber?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Manager label="Quay lại" path="/give-number" icon={BackIcon} />
            </div>
        </div>
    )
}

export default DetailGiveNumber
