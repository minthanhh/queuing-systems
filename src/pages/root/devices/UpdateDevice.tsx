import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { GetTheIDeviceKeys, IDevice, Options } from '@/types'
import { Button, Heading, Input } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { RootState } from '@/redux/store'
import { getDevices } from '@/redux/slices/deviceSlice'
import { Autocomplete, Stack, TextField } from '@mui/material'

const UpdateDevice = () => {
    const { deviceId } = useParams()
    const dispatch = useAppDispatch()
    const [device, setDevice] = useState<IDevice>()
    const { devices } = useAppSelector((state: RootState) => state.device)
    const [select, setSelect] = useState<Options[]>([])
    const [inputValue, setInputValue] = useState('')

    const keysToRetrieve = useMemo<GetTheIDeviceKeys>(() => ['addressIP', 'connect', 'device', 'id', 'name', 'password', 'services', 'status', 'addressIP', 'username'], [])

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>()

    useEffect(() => {
        if (deviceId && devices.length > 0) {
            const device = devices.filter((device) => device.uid === deviceId)
            keysToRetrieve.forEach((field) => {
                setValue(field, device[0][field])
            })

            setDevice(device[0])
        } else {
            dispatch(getDevices())
        }
    }, [deviceId, dispatch, devices, keysToRetrieve, setValue])

    const getOptions = useMemo(() => {
        if (Array.isArray(device?.services)) {
            return device?.services.map(
                (service) =>
                    ({
                        label: service,
                        type: service,
                    } as Options),
            )
        }
        return []
    }, [device?.services])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }
    const handleSelect = (e: any, value: Options[]) => {
        setSelect([...value])
        setValue('services', [...value], {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    console.log(inputValue)
    return (
        <div className="flex flex-col w-full px-6">
            <Heading label="Quản lý thiết bị" />

            <div className="py-4 px-6 rounded-lg shadow-lg w-full bg-white">
                <h5 className="text-primaryColor text-xl font-bold leading-[30px]">Thông tin thiết bị</h5>
                <div className="flex flex-col w-full">
                    <div className="md:flex gap-6">
                        <Input type="text" label="Mã thiết bị:" id="id" placeholder="Nhập mã thiết bị" register={register} errors={errors} required />
                    </div>

                    <div className="md:flex gap-6">
                        <Input type="phone" label="Tên thiết bị:" id="phone" placeholder="Nhập tên thiết bị" register={register} errors={errors} required />
                        <Input type="text" label="Tên đăng nhập:" id="username" placeholder="Nhập tài khoản" register={register} errors={errors} required />
                    </div>

                    <div className="md:flex gap-6">
                        <Input type="text" label="Địa chỉ IP:" id="addressIP" placeholder="Nhập địa chỉ IP" register={register} errors={errors} required />
                        <Input type="password" label="Mật khẩu:" id="password" placeholder="Nhập mật khẩu" register={register} errors={errors} required />
                    </div>

                    <div className="w-full">
                        <label htmlFor="services">Dịch vụ sử dụng:</label>
                        <div className="w-full rounded-lg">
                            <div className="flex items-center gap-[15px]">
                                <Stack sx={{ width: '100%', height: '80px' }}>
                                    <Autocomplete
                                        sx={{ width: '100%', height: '80px' }}
                                        multiple
                                        id="services"
                                        size="small"
                                        options={getOptions || []}
                                        getOptionLabel={(option) => option.label}
                                        {...register?.('services', { required: true })}
                                        value={select}
                                        onChange={handleSelect}
                                        inputValue={inputValue}
                                        onInputChange={(e, value) => {
                                            setInputValue(value)
                                        }}
                                        renderInput={(params) => <TextField sx={{ width: '100%', height: 'auto' }} {...params} placeholder="Chọn dịch vụ sử dụng" />}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="font-normal text-sm leading-5 md:mt-6 md:mb-0 mb-5 mt-[10px] ">
                    <sup className="text-red-500">*</sup> Là trường thông tin bắt buộc
                </p>
            </div>

            <div className="flex items-center">
                <Button label="click" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    )
}

export default UpdateDevice
