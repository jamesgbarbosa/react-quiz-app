import { useEffect, useState } from "react";
import questions from "../../questions.js"

const TIMER = 15000;

export default function Answer({ onHandleAnswer, question }) {
    const [timeLeft, setTimeleft] = useState(TIMER)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [timer, setTimer] = useState(TIMER)

    useEffect(() => {
        let questionTimeout = setTimeout(() => {
            
        }, timer)

        return () => { clearTimeout(questionTimeout) }
    }, [onHandleAnswer])

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeleft(prev => prev - 10)

            if (timeLeft <= 0) {
                if (selectedAnswer) {
                    onHandleAnswer(selectedAnswer)
                } else {
                    onHandleAnswer(null)
                }
            }
        }, 10)

        return () => { clearInterval(interval) }
    })

    function onSelectAnswer(it) {
        setTimer(3000)
        setSelectedAnswer(it);
        setTimeleft(prev => 3000)
    }
    // console.log("TIMER", TIMER)

    return <div id="answers">
        {timeLeft}
        <div className="flex-center">
            <progress className={`${selectedAnswer ? 'answered-progress' : 'default'}`} max={timer} value={timeLeft}>
                {timeLeft}
            </progress>
        </div>
        {question.answers.map((it, index) => {
            return <section key={it} className="answer">
                <button className={it == selectedAnswer ? 'selected' : ''} onClick={() => selectedAnswer ? null : onSelectAnswer(it)} key={it}>{it}</button>
            </section>
        })}
    </div>
}