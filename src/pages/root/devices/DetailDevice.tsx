import { useParams } from 'react-router-dom'
import { EditIcon } from '@/assets'
import { Heading, Manager } from '@/components'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/configs/firebase.config'
import { DeviceType } from '@/types'

const DetailDevice = () => {
    const { id } = useParams()
    const [detail, setDetail] = useState<DeviceType | null>(null)

    useEffect(() => {
        if (id) {
            const getDataById = async () => {
                const dSnap = await getDoc(doc(db, 'devices', id))
                setDetail(dSnap.data() as DeviceType)
            }

            getDataById()
        }
    }, [id])

    return (
        <div className="pl-6 mb-[50px]">
            <Heading label="Quản lý thiết bị" />

            <div className="flex gap-7">
                <div className="bg-white rounded-lg shadow-md w-full px-6 py-4">
                    <h5 className="text-primaryColor leading-[30px] font-bold text-xl mb-5">Thông tin thiết bị</h5>

                    <div className="flex items-center justify-between max-w-[800px]">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Mã thiết bị:</h6>
                                <span className="text-[#535261] uppercase leading-6 font-normal text-base">{detail?.id}</span>
                            </div>
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Tên thiết bị:</h6>
                                <span className="text-[#535261] uppercase leading-6 font-normal text-base">{detail?.name}</span>
                            </div>
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Địa chỉ IP:</h6>
                                <span className="text-[#535261] leading-6 font-normal text-base">{detail?.addressIP}</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Loại thiết bị:</h6>
                                <span className="text-[#535261] leading-6 font-normal text-base">{detail?.device}</span>
                            </div>
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Tên đăng nhập:</h6>
                                <span className="text-[#535261] leading-6 font-normal text-base">{detail?.username}</span>
                            </div>
                            <div className="flex items-center justify-between gap-[43px] mb-4">
                                <h6 className="leading-6 font-semibold text-base text-[#282739]">Mật khẩu:</h6>
                                <span className="text-[#535261] leading-6 font-normal text-base">{detail?.password}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-base leading-6 font-semibold text-[#282739]">Dịch vụ sử dụng:</h6>
                        <p className="text-[#535261]">{Array.isArray(detail?.services) && detail?.services.join(', ')}</p>
                    </div>
                </div>

                <Manager label="Cập nhật thiết bị" icon={EditIcon} path={'/devices/update-device/' + id} />
            </div>
        </div>
    )
}

export default DetailDevice
