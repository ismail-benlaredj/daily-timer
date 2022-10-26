import Button from "./Button"
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from "react-icons";
import { useState } from "react";
import { useStoreActions, useStoreState } from "../lib/store";
import { updateDefaultData } from "../lib/localDb";

type Props = {
    goalValue: number;
    handleSetGoalUi: () => void;
}
function SetNewGoal({ goalValue, handleSetGoalUi }: Props) {

    const [timeGoal, setTimeGoal] = useState(goalValue)
    const { sessionTimeValue } = useStoreState((state) => state.sessionTime)
    const setGoal = useStoreActions(action => action.goal.setGoal)
    const handleIncrement = () => {
        if (timeGoal < 12) {
            setTimeGoal(timeGoal + 1)
        }
    }
    const handleDecrement = () => {
        if (timeGoal > 2) {
            setTimeGoal(timeGoal - 1)
        }
    }

    const handleSetGoal = (newGoal: number) => {
        setGoal(newGoal)
        updateDefaultData(newGoal, sessionTimeValue)

    }

    return (
        <div className="flex items-center absolute w-full h-full">
            <div className="absolute w-full h-full bg-black z-10 opacity-90"></div>
            <div className="flex flex-col w-1/2 h-2/3 mx-auto opacity-100 z-20 justify-center items-center">
                <h1 className="text-3xl font-bold" >Set your daily goal</h1>
                <div className="flex flex-row justify-center items-center mt-5">

                    <div className=" h-36 flex justify-center items-start  p-5 text-8xl font-semibold ">
                        <p>{timeGoal}</p>
                    </div>

                    <div className=" h-36 flex flex-col justify-center items-center p-5 space-y-2">
                        <div className="h-fit">
                            <Button
                                type={"iconBtn"}
                                className={"border-2 text-secWhite border-secWhite "}
                                icon={
                                    <IconContext.Provider value={{ size: "15px" }}>
                                        <AiOutlineMinus />
                                    </IconContext.Provider>
                                }
                                handleClick={handleDecrement}
                            />
                        </div>
                        <div className="h-fit">
                            <Button type={"iconBtn"} className={"border-2 text-secWhite border-secWhite "}
                                icon={
                                    <IconContext.Provider value={{ size: "15px" }}>
                                        <AiOutlinePlus />
                                    </IconContext.Provider>
                                }
                                handleClick={handleIncrement}
                            />
                        </div>
                    </div>
                </div>
                <div className=" flex flex-row space-x-10 ">
                    <Button handleClick={() => {
                        handleSetGoal(timeGoal)
                        handleSetGoalUi()
                    }} type="normal" text="Setup" className={'border-4 border-orange text-orange px-10 py-1'} />
                </div>
            </div>
        </div>
    )
}

export default SetNewGoal