import { useForm, FieldValues, SubmitHandler, Resolver } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { confirmPasswordReset } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Hero, Input, Logo } from '@/components'
import { auth } from '@/configs/firebase.config'
import { yupResolver } from '@hookform/resolvers/yup'
import { comfirmSchema } from '@/helpers/schema'

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            password: '',
            comfirm: '',
        },
        resolver: yupResolver(comfirmSchema) as Resolver<any, any>,
    })

    const resetPassword = async (oobCode: string, newPassword: string) => {
        await confirmPasswordReset(auth, oobCode, newPassword)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        resetPassword(searchParams.get('oobCode') as string, data.password)
            .then(() => {
                setIsLoading(false)
                toast.success('Thay đổi mật khẩu thành công.')
                reset()
                navigate('/login', { replace: true })
            })
            .catch((err) => {
                setIsLoading(false)
                toast.error(err.message)
                reset()
            })
    }

    return (
        <div className="w-full h-full flex flex-row bg-primaryBg">
            <div className="w-4/12">
                <div className="w-[400px] flex flex-col align-center flex-1 mx-auto mt-[82px]">
                    <Logo />

                    <h3 className="text-[#282739] leading-[33px] text-[22px] font-bold mb-4 text-center">Đặt lại mật khẩu mới</h3>
                    <Input errors={errors} type="password" id="password" register={register} placeholder="Nhập mật khẩu mới" label="Mật khẩu" required eyeToggle />

                    <Input errors={errors} type="password" id="comfirm" register={register} placeholder="Nhập lại mật khẩu mới" label="Nhập lại mật khẩu" required eyeToggle />

                    <div className="mt-10 flex items-center justify-center">
                        <Button label="Xác nhận" onClick={handleSubmit(onSubmit)} disabled={isLoading} />
                    </div>
                </div>
            </div>
            <Hero />
        </div>
    )
}

export default ResetPassword
