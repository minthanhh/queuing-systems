import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
    disabled?: boolean
    label: string
    outline?: boolean
    onSubmit?: () => void
    onClick?: () => void
    static?: boolean
    className?: string
}

const Button: React.FC<ButtonProps> = ({ label, outline, onSubmit, onClick, disabled, className }) => {
    const handleSubmit = useCallback(() => {
        onSubmit?.()
    }, [onSubmit])

    return (
        <button
            className={twMerge(
                'border w-[162px] px-[24px] py-[10px] rounded-lg',
                outline ? 'bg-transparent text-primaryColor' : 'bg-primaryColor text-white',
                disabled ? 'cursor-not-allowed bg-orange-200 border-orange-200' : 'cursor-pointer border-primaryColor',
                className,
            )}
            onClick={onClick ? onClick : handleSubmit}
            disabled={disabled}>
            {disabled ? <span className="loading loading-dots loading-md"></span> : label}
        </button>
    )
}

export default Button
