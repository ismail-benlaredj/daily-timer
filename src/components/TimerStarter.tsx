import { ReactElement, } from "react";
import Button from "./Button";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from "react-icons";
import { useStoreState, useStoreActions } from '../lib/store';
export default function TimerStarter(): ReactElement {
    const { startSessionAction } = useStoreActions((actions) => actions.startSession)
    const { sessionTimeValue } = useStoreState((state: any) => state.sessionTime)
    const { sessionTimeIncrement } = useStoreActions((actions) => actions.sessionTime)
    const { sessionTimeDecrement } = useStoreActions((actions) => actions.sessionTime)

    return (
        <div className="flex flex-col text-white text-center justify-center content-center items-center ">
            <h1 className="font-1000 text-4xl">You Can Do It</h1>
            <p className="w-1/2 font-thin">Be ready to just focuse on your work, remember You can do it ...
                I belive on my SELFE</p>
            <h2 className="font-bold text-greenLight text-2xl">Let’s Go.. Enjoy</h2>

            <div className="flex flex-row brd w-[350px] h-fit items-center mt-[3rem]">
                <div className="flex flex-col  w-1/2 p-10 space-y-3 border-r-2">
                    <div className="h-1/2 ">
                        <Button
                            type={"iconBtn"}
                            className={"border-2 text-secWhite border-secWhite"}
                            icon={
                                <IconContext.Provider value={{ size: "30px" }}>
                                    <AiOutlineMinus />
                                </IconContext.Provider>
                            }
                            handleClick={() => sessionTimeDecrement()}
                        />
                    </div>
                    <div className="h-1/2 ">
                        <Button type={"iconBtn"} className={"border-2 text-secWhite border-secWhite"}
                            icon={
                                <IconContext.Provider value={{ size: "30px" }}>
                                    <AiOutlinePlus />
                                </IconContext.Provider>
                            }
                            handleClick={() => sessionTimeIncrement()}
                        />
                    </div>
                </div>
                <div className="flex flex-col  w-1/2 p-10">
                    <h1 className="text-7xl font-bold">{sessionTimeValue}</h1>
                    <p className="font-thin text-xl "> Min</p>
                </div>
            </div>
            <div className="mt-10">
                <Button text={'Lets go'} className={"border-4 text-greenLight border-greenLight"} handleClick={() => startSessionAction()} />
            </div>


        </div>
    )
}
