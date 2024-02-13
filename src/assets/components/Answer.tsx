import { useEffect, useState } from "react";
import questions from "../../questions.js"

const TIMER = 2000;

export default function Answer({ onHandleAnswer, question }) {
    const [timeLeft, setTimeleft] = useState(TIMER)


    useEffect(() => {
        let questionTimeout = setTimeout(() => {
            
        }, TIMER)

        return () => { clearTimeout(questionTimeout) }
    }, [onHandleAnswer])

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeleft(prev => prev - 10)

            if (timeLeft <= 0) {
                onHandleAnswer(null)
            }
        }, 10)

        return () => { clearInterval(interval) }
    })

    return <div id="answers">
        {timeLeft}
        <progress max={TIMER} value={timeLeft}></progress>
        {question.answers.map((it, index) => {
            return <section key={it} className="answer">
                <button onClick={() => onHandleAnswer(it)} key={it}>{it}</button>
            </section>
        })}
    </div>
}