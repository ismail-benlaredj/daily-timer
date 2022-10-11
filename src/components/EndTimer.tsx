import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import Button from './Button'

type Props = {}

function EndTimer({ }: Props) {
    return (
        <div className="flex flex-col text-white text-center justify-center content-center items-center space-y-8 ">
            <div className="flex flex-row space-x-5">
                <div className="w-48 h-48  flex flex-col justify-center text-secWhite">
                    <p className='font-light text-3xl'>Yesterday</p>
                    <p className='font-bold text-5xl text-white'>2:45</p>
                    <p>hours</p>
                </div>
                <div className="w-48 h-48">
                    <div className="rounded-full  w-full h-full">
                        <CircularProgressbar value={10} text={`20:00`}
                            styles={buildStyles({
                                backgroundColor: "transparent",
                                pathColor: "#3BFF1C",
                                trailColor: "#fff",
                                textColor: "#fff",
                                textSize: '28px'
                            })}
                        />
                    </div>
                </div>

                <div className="w-48 h-48  flex flex-col justify-center text-secWhite">
                    <p className='font-light text-3xl'>Yesterday rest time</p>
                    <p className='font-bold text-5xl text-white'>2:45</p>
                    <p>hours</p>
                </div>
            </div>
            <div className=" flex flex-row space-x-10 ">
                <Button type="normal" text="Set New Goal" className={'border-4 border-secWhite text-secWhite px-10 py-1'} />
            </div>

        </div>
    )
}

export default EndTimer