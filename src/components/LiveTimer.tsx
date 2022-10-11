import { useEffect, useMemo, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from './Button';
import { useStoreState, useStoreActions } from '../lib/store';
type Props = {}

const LiveTimer = (props: Props) => {
    const { sessionTimeValue } = useStoreState((state) => state.sessionTime)
    const [minutes, setMinutes] = useState(sessionTimeValue - 1)
    const [secondes, setSecondes] = useState(59)
    const [secondesPassed, setSecondesPassed] = useState(1)
    const [percentage, setPercentage] = useState(1)
    const sessionInSecondes = useMemo(() => {
        return sessionTimeValue * 60
    }, [])

    const calculatePercentage = () => {
        //Percentage =passed secondes  * 100 / sessionInSecondes

        return secondesPassed * 100 / sessionInSecondes

    }
    useEffect(() => {

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
        }, 1000)
        return () => clearInterval(interval)
    }, [minutes, secondes, percentage])
    return (
        <div className="flex flex-col text-white text-center justify-center content-center items-center space-y-8 ">
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

                <div className="w-48 h-48  flex flex-col justify-center text-secWhite">
                    <p className='font-light text-3xl'>Rest time</p>
                    <p className='font-bold text-5xl text-white'>2:45</p>
                    <p>hours</p>
                </div>
            </div>
            <div className=" flex flex-row space-x-10 ">
                <Button type="normal" text="Stop" className={"border-4 text-orange border-orange px-10 py-1"} />
                <Button type="normal" text="Rest" className={'border-4 border-secWhite text-secWhite px-10 py-1'} />
            </div>

        </div>
    )
}

export default LiveTimer