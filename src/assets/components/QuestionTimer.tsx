import { useEffect, useState } from "react"

export default function QuestionTimer({ state, timeout, onTimeout }) {
    let [timeLeft, setTimeleft] = useState(timeout)

    useEffect(() => {
        setTimeleft(prev => timeout)
    }, [timeout])

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeleft((prev) => prev - 10)
        }, 10)
        return () => { clearInterval(interval) }
    }, [timeout])

    useEffect(() => {
        let questionTimeout = setTimeout((onTimeout), timeout)
        return () => { clearTimeout(questionTimeout) }
    }, [timeout, onTimeout])

    return <>
        <progress className={`${state}`} max={timeout} value={timeLeft}>
        </progress>
    </>
}