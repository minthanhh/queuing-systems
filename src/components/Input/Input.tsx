import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { LuEyeOff, LuEye } from 'react-icons/lu'
import { useCallback, useState } from 'react'

interface InputProps {
    label: string
    id: string
    type?: string
    placeholder?: string
    required?: boolean
    errors: FieldErrors<FieldValues>
    icon?: string
    register?: UseFormRegister<FieldValues>
    defaultValue?: string
    className?: string
    eyeToggle?: boolean
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({ id, label, type, register, required, placeholder, errors, className, defaultValue, eyeToggle, disabled }) => {
    const [showHidePassword, setShowHidePassword] = useState(false)

    const handleShowHidePassword = useCallback(() => {
        setShowHidePassword((value) => !value)
    }, [])

    return (
        <div className={twMerge(`w-full mb-4`, className)}>
            <label htmlFor={id} className="mb-1 font-semibold text-base leading-6">
                {label}
                <sup className="text-red-500 ml-[5px]">*</sup>
            </label>
            <div
                className={twMerge(
                    'rounded-lg border-2 shadow-md overflow-hidden bg-white transition-all ease-in-out duration-100 relative autofill:bg-white autofill:hover:bg-white fill-white',
                    errors[id] ? 'border-red-400' : 'border-borderGray bg-white',
                    disabled ? 'bg-[#eaeaec] border-[#0b0b0b] text-[#9f9ea7]' : '',
                )}>
                <input
                    className="w-full outline-none border-none py-[10px] pl-3 bg-transparent"
                    type={showHidePassword ? 'text' : type}
                    id={id}
                    placeholder={placeholder}
                    {...register?.(id, { required })}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    autoComplete="false"
                />
                {eyeToggle ? (
                    showHidePassword ? (
                        <LuEye onClick={handleShowHidePassword} width={20} height={20} className="absolute top-2/4 -translate-y-2/4 right-4 cursor-pointer" />
                    ) : (
                        <LuEyeOff onClick={handleShowHidePassword} width={20} height={20} className="absolute top-2/4 -translate-y-2/4 right-4 cursor-pointer" />
                    )
                ) : null}
            </div>
        </div>
    )
}

export default Input
