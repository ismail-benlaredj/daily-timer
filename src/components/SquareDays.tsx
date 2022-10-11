
type Props = {}

const Day = () => {
    return (
        <div className="w-10 h-6 brd mr-4 mt-2"></div>
    )
}

function SquareDays({ }: Props) {
    return (
        <div className="flex flex-wrap p-5  brd w-2/3">

            <Day />
            <Day />
            <Day />
            <Day />
            <Day />
            <Day />
            <Day />
            <Day />
            <Day />
            <Day />
            <Day />



        </div>
    )
}

export default SquareDays