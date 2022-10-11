import SquareDays from "./SquareDays"

type Props = {}

export default function Analyse({ }: Props) {
    return (
        <div className=" brd flex flex-col mt-20 text-center p-4 justify-center items-center space-y-10">
            <h1 className="text-5xl text-white">Analyse</h1>
            <div className="flex flex-row border-b-2 text-secWhite space-x-6">
                <div className="px-4 pt-2 cursor-pointer hover:bg-black/[0.1]">
                    <p className="text-2xl">7 days</p>
                </div>
                <div className="px-4 pt-2 cursor-pointer hover:bg-black/[0.1]">
                    <p className="text-2xl">15 days</p>
                </div>

                <div className="px-4 pt-2 cursor-pointer hover:bg-black/[0.1]">
                    <p className="text-2xl">30 days</p>
                </div>

                <div className="px-4 pt-2 cursor-pointer hover:bg-black/[0.1]">
                    <p className="text-2xl">All days</p>
                </div>
            </div>

            <SquareDays />
        </div>
    )
}