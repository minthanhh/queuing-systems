import { Link, useNavigate } from 'react-router-dom'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { SerializedError } from '@reduxjs/toolkit'

import { Button, Hero, Input } from '@/components'
import { LogoAlta, Warning } from '@/assets'
import { useAppDispatch } from '@/hooks/storeHooks'
import { login } from '@/redux/slices/userSlice'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/configs/firebase.config'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { IUser } from '@/types'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const signIn = async (email: string, password: string) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { email, password } = data
        if (data) {
            setIsLoading(true)

            signIn(email, password)
                .then(async ({ user }) => {
                    const snap = await getDoc(doc(db, 'manager-accounts', user.uid))
                    if (!snap.exists()) {
                        setIsLoading(false)
                        toast.error('Tài khoản không tồn tại!')
                        return
                    }

                    const { role, username, password, phone } = snap.data() as IUser

                    dispatch(
                        login({
                            email: user.email || '',
                            displayName: user.displayName || '',
                            photoURL: user.photoURL || '',
                            uid: user.uid,
                            phone,
                            username,
                            role,
                            password,
                        }),
                    )
                    const isAuthenticated = true
                    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))

                    setIsLoading(false)
                    toast.success('Đăng nhập thành công')
                    navigate('/', { replace: true, relative: 'route' })
                })
                .catch((err: SerializedError) => {
                    toast.error(err.message)
                    setIsLoading(false)
                })
        }
    }

    return (
        <div className="w-full h-full flex flex-row bg-primaryBg">
            <div className="w-full lg:w-4/12">
                <div className="lg:w-[400px] w-full px-4 lg:px-0 flex flex-col align-center flex-1 lg:mx-auto mt-[82px]">
                    <div className="mx-auto mb-10">
                        <img className="aspect-square max-h-full mx-auto mb-4 flex-shrink-0 object-contain" src={LogoAlta} alt="Logo Alta Media Software" />
                        <p className="text-primaryColor lg:hidden uppercase font-black text-base text-center">Hệ thống Quản lý xếp hàng</p>
                    </div>
                    <Input id="email" type="email" label="Tên đăng nhập" placeholder="Vui lòng nhập tên đăng nhập của bạn" register={register} errors={errors} required />
                    <Input id="password" type="password" label="Mật khẩu" placeholder="Vui lòng nhập mật khẩu" register={register} errors={errors} required eyeToggle />
                    {(errors.email || errors.password) && (
                        <div className="flex items-center gap-1 mb-[19px]">
                            <img className="w-5 h-5" src={Warning} alt="" />
                            <p className="text-red-500 font-normal text-sm leading-5">Sai mật khẩu hoặc tên đăng nhập</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-5 flex-wrap">
                        <Button onSubmit={handleSubmit(onSubmit)} label="Đăng nhập" disabled={isLoading} />
                        <Link to={'/forgot-password'} className="text-red-500 text-nowrap text-sm font-normal leading-5">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>
            </div>
            <Hero />
        </div>
    )
}

export default Login
