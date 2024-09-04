import { useForm, FieldValues } from 'react-hook-form'
import { CameraIcon, DefaultAvatar } from '@/assets'
import { Input } from '@/components'
import { useAppSelector } from '@/hooks/storeHooks'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, storage } from '@/configs/firebase.config'
import { toast } from 'react-toastify'
import { updateProfile } from 'firebase/auth'

const Profile = () => {
    const { profile } = useAppSelector((state: RootState) => state.user)
    const [avatar, setAvatar] = useState('')

    const {
        register,
        formState: { errors },
    } = useForm<FieldValues>()

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar)
        }
    }, [avatar])

    const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList
        if (files.length === 0) return

        const imageFile = files[0]
        const preview = URL.createObjectURL(imageFile)
        setAvatar(preview)

        const storageRef = ref(storage, `/images/${Date.now()}_${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                toast.error(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (avatarURL) => {
                    setAvatar(avatarURL)
                    toast.success('Successfully')
                    if (auth.currentUser) {
                        await updateProfile(auth.currentUser, {
                            photoURL: avatarURL,
                        }).then(() => {
                            toast.success('Updated Successfully Avatar!')
                        })
                    }
                })
            },
        )
    }

    return (
        <div className="w-full h-[calc(100%_-_88px)] overflow-y-hidden">
            <div className="pl-6 pr-[104px] mt-[80px]">
                <div className="bg-white h-full rounded-lg my-auto w-full px-6 pt-10 py-[54px] flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center gap-4 select-none">
                        <label htmlFor="imageUpload">
                            <div className="relative w-full cursor-pointer shadow-lg rounded-full group">
                                <img
                                    className="group-hover:opacity-80 w-[248px] h-[248px] transition-all ease-linear duration-150 object-cover rounded-full content-visibility-auto"
                                    src={avatar ? avatar : profile?.photoURL || DefaultAvatar}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="group-hover:opacity-80 absolute outline-none bottom-0 right-[32px] border-white rounded-full bg-primaryColor border-2 w-[45px] h-[45px] flex items-center justify-center transition-all ease-linear duration-150 hover:bg-orange-400">
                                    <img className="w-[30px] h-[30px] object-cover group-hover:opacity-80" src={CameraIcon} alt="" />
                                </div>
                            </div>
                        </label>
                        <input type="file" id="imageUpload" onChange={handlePreviewAvatar} accept="image/*" hidden />
                        <h3 className="font-bold text-2xl leading-9">{profile?.displayName}</h3>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                        <div className="flex gap-6 w-full">
                            <Input label="Tên người dùng" type="text" id="fullName" register={register} errors={errors} disabled required defaultValue={profile?.displayName} />
                            <Input label="Tên đăng nhập " type="text" id="username" register={register} errors={errors} required disabled defaultValue={profile?.username} />
                        </div>
                        <div className="flex gap-6 w-full">
                            <Input label="Số điện thoại " type="text" id="phone" register={register} errors={errors} required defaultValue={profile?.phone} disabled />
                            <Input label="Mật khẩu" id="password" type="text" register={register} errors={errors} disabled required defaultValue={profile?.password} />
                        </div>
                        <div className="flex gap-6 w-full">
                            <Input label="Email:" id="email" type="text" register={register} errors={errors} required defaultValue={profile?.email} disabled />
                            <Input label="Vai trò:" id="role" type="text" register={register} errors={errors} required defaultValue={profile?.role} disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
