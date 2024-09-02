import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import { auth } from '@/configs/firebase.config'
import { Button, Hero, Input } from '@/components'
import { toast } from 'react-toastify'
import { LogoAlta } from '@/assets'

const ForgotPassword = () => {
    const [sendEmail, setSendEmail] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
        },
        shouldUnregister: true,
    })

    const sendResetToUserEmail = async (email: string) => {
        return await sendPasswordResetEmail(auth, email)
    }

    const onSumit: SubmitHandler<FieldValues> = (data) => {
        setSendEmail(true)

        sendResetToUserEmail(data.email)
            .then(() => {
                setSendEmail(false)
                toast.success('Thành công! vui lòng kiểm tra Email của bạn.')
                reset()
            })
            .catch((err) => {
                toast.error('Người dùng không tồn tại')
                setSendEmail(false)
                reset()
            })
    }

    return (
        <div className="w-full h-full flex flex-row bg-primaryBg">
            <div className="lg:w-4/12 w-full">
                <div className="lg:w-[400px] w-full px-4 lg:px-0 flex flex-col align-center flex-1 lg:mx-auto mt-[82px]">
                    <div className="mx-auto mb-10">
                        <img className="aspect-square max-h-full mx-auto mb-4 flex-shrink-0 object-contain" src={LogoAlta} alt="Logo Alta Media Software" />
                        <p className="text-primaryColor lg:hidden uppercase font-black text-base text-center">Hệ thống quản lý xếp hàng</p>
                    </div>

                    <h3 className="text-[#282739] leading-[33px] text-[22px] font-bold mb-4 text-center">Đặt lại mật khẩu</h3>
                    <Input errors={errors} type="email" id="email" register={register} placeholder="Vui lòng nhập email của bạn" label="Nhập Email" required />

                    <div className="mt-10 flex items-center gap-4">
                        <Link to={'/login'} className="w-2/4">
                            <Button className="w-full" label="Hủy" outline />
                        </Link>
                        <Button className="w-2/4" label="Tiếp tục" onClick={handleSubmit(onSumit)} disabled={sendEmail} />
                    </div>
                </div>
            </div>
            <Hero />
        </div>
    )
}

export default ForgotPassword
