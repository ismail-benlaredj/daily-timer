import { useStoreState } from 'easy-peasy'
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import Button from './Button'

type Props = {}

function ManageTimer({ }: Props) {
    const { AllrestTimeValue } = useStoreState((state: any) => state.restTime)
    const { AllSessionsTimeValue } = useStoreState((state: any) => state.AllSessionsTime)
    const restTimeSet = (): string => {
        let minutes = Math.floor(AllrestTimeValue / 60)
        let hours = Math.floor(minutes / 60)

        minutes = minutes % 60
        return `${hours}:${minutes < 10 ? 0 : ''}${minutes}`
    }

    const calculatePercentage = (): number => {
        let goalTimeInMinutes = 60 * 8
        let percentage = AllSessionsTimeValue * 100 / goalTimeInMinutes
        return percentage
    }
    return (
        <div className="mt-24 flex flex-col text-white text-center justify-center content-center items-center space-y-8 ">
            <div className="flex flex-row space-x-5">
                <div className="w-48 h-48  flex flex-col justify-center text-secWhite">
                    <p className='font-light text-3xl'>Yesterday</p>
                    <p className='font-bold text-5xl text-white'>{0.00}</p>
                    <p>minutes</p>
                </div>
                <div className="w-48 h-48">
                    <div className="rounded-full  w-full h-full">
                        <CircularProgressbarWithChildren value={calculatePercentage()}
                            styles={buildStyles({
                                backgroundColor: "transparent",
                                pathColor: "#3BFF1C",
                                trailColor: "#fff",
                                textColor: "#fff",
                                textSize: '24px'
                            })}>
                            <p className='font-bold text-5xl'>8</p>
                            <p className='text-secWhite'>hours</p>
                        </CircularProgressbarWithChildren>

                    </div>
                </div>

                <div className=" w-48 h-48  flex flex-col justify-start text-secWhite">
                    <p className='font-light text-3xl'>Today rest time</p>
                    <p className='font-bold text-5xl text-white'>{restTimeSet()}</p>
                    <p>hours</p>
                </div>
            </div>
            <div className=" flex flex-row space-x-10 ">
                <Button type="normal" text="Set New Goal" className={'border-4 border-secWhite text-secWhite px-10 py-1'} />
            </div>

        </div>
    )
}

export default ManageTimer