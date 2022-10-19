import { useEffect, useMemo, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from './Button';
import SessionRestTime from './SessionRestTime'
import { useStoreState, useStoreActions } from '../lib/store';
type Props = {}

const LiveTimer = (props: Props) => {
    const { sessionTimeValue } = useStoreState((state) => state.sessionTime)
    const [minutes, setMinutes] = useState(sessionTimeValue - 1)
    const [secondes, setSecondes] = useState(59)
    const [secondesPassed, setSecondesPassed] = useState(1)
    const [percentage, setPercentage] = useState(1)
    const [startRestTime, setStartRestTime] = useState(false)
    const sessionInSecondes = useMemo(() => {
        return sessionTimeValue * 60
    }, [])


    const { AllSessionsTimeIncrement } = useStoreActions((actions) => actions.AllSessionsTime)
    const { startSessionAction } = useStoreActions((actions) => actions.startSession)


    const calculatePercentage = () => {
        return secondesPassed * 100 / sessionInSecondes
    }
    useEffect(() => {
        if (!startRestTime) {
            const interval = setInterval(() => {
                if (minutes === 0 && secondes === 0) {
                    setPercentage(() => calculatePercentage())
                    return () => clearInterval(interval)
                }
                if (secondes > 0) {
                    setSecondes(secondes - 1)
                    setSecondesPassed(secondesPassed + 1)


                } else {
                    setMinutes(minutes - 1)
                    setSecondes(59)
                }
                setPercentage(() => calculatePercentage())
            }, 10)
            return () => clearInterval(interval)
        }

    }, [minutes, secondes, percentage, startRestTime])
    return (
        <div className="my-24 flex flex-col text-white text-center justify-center content-center items-center space-y-8 ">
            <div className="flex flex-row space-x-5">
                <div className="w-48 h-48">
                    <div className="rounded-full  w-full h-full">
                        <CircularProgressbar value={percentage} text={`${minutes}:${secondes < 10 ? 0 : ''}${secondes}`}
                            styles={buildStyles({
                                backgroundColor: "transparent",
                                pathColor: "#fff",
                                trailColor: "#F68500",
                                textColor: "#fff",
                                textSize: '28px'
                            })}
                        />
                    </div>
                </div>
                <SessionRestTime start={startRestTime} />
            </div>

            <div className=" flex flex-row space-x-10 ">
                <Button handleClick={() => {
                    AllSessionsTimeIncrement(secondesPassed)
                    startSessionAction()
                }}
                    type="normal" text="Stop" className={"border-4 text-orange border-orange px-10 py-1"} />
                <Button handleClick={() => setStartRestTime(!startRestTime)}
                    type="normal" text={startRestTime ? "Go back" : "Rest"} className={'border-4 border-secWhite text-secWhite px-10 py-1'} />
            </div>

        </div>
    )
}

export default LiveTimer