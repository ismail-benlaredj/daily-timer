import { ReactElement, MouseEventHandler } from 'react'

type ButtonProps = {
    type?: string,
    icon?: ReactElement,
    text?: string,
    className?: string,
    handleClick?: MouseEventHandler<HTMLDivElement>
}
export default function Button({ type, icon, text, className, handleClick }: ButtonProps) {

    return (
        <>
            <div onClick={handleClick} className={`flex justify-center items-center px-7 py-2 cursor-pointer hover:bg-greenLight/[0.05] select-none  ${className}`}>
                {type === "iconBtn" ? icon : text}
            </div>
        </>
    )
}
