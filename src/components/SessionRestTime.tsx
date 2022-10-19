import { useStoreActions } from '../lib/store';
import { useEffect, useState } from "react"

type Props = {
    start: boolean
}
export default function SessionRestTime({ start }: Props) {
    const { AllrestTimeIncrement } = useStoreActions((actions) => actions.restTime)
    const [minutes, setMinutes] = useState(0)
    const [secondes, setSecondes] = useState(0)
    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                if (secondes <= 59) {
                    setSecondes(secondes + 1)
                } else {
                    setMinutes(minutes + 1)
                    setSecondes(0)
                }

            }, 1000)
            return () => {
                clearInterval(interval)
                AllrestTimeIncrement(minutes * 60 + secondes)
            }
        }
    }, [secondes, start])
    return (
        <div className="w-48 h-48 flex flex-col justify-start text-secWhite">
            <p className='font-light text-3xl'>Rest time</p>
            <p className='font-light text-xl'>(In this session)</p>
            <p className='font-bold text-5xl text-white mt-2'>{`${minutes}:${secondes < 10 ? 0 : ''}${secondes}`}</p>
            <p>minutes</p>
        </div>
    )
}
