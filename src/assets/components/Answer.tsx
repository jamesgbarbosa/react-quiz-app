import { useEffect, useState } from "react";
import questions from "../../questions.js"

const TIMER = 15000;

export default function Answer({ onHandleAnswer, currentIndex, randomizedQuestions }) {
    const [timeLeft, setTimeleft] = useState(TIMER)
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: null, state: '' })
    const [timer, setTimer] = useState(TIMER)
    useEffect(() => {
        let questionTimeout = setTimeout(() => {

        }, timer)

        return () => { clearTimeout(questionTimeout) }
    }, [onHandleAnswer])

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeleft(prev => prev - 80)
            if (timeLeft <= 0) {
                if (selectedAnswer && selectedAnswer.answer) {
                    onHandleAnswer(selectedAnswer.answer)
                } else {
                    onHandleAnswer(null)
                }
            }

            if (selectedAnswer?.answer && selectedAnswer?.state) {
                if (timeLeft == 2000) {
                    if (questions[currentIndex].answers[0] == selectedAnswer.answer) {
                        debugger;
                        setSelectedAnswer(prev => ({ ...prev, state: "correct" }))
                    } else {
                        setSelectedAnswer(prev => ({ ...prev, state: "wrong" }))
                    }
                }
            }

        }, 80)
        return () => { clearInterval(interval) }
    })

    function onSelectAnswer(it) {
        setTimer(3000)
        setSelectedAnswer({
            answer: it,
            state: 'selected'
        });
        setTimeleft(prev => 3000)
    }

    return <div id="answers">
        {/* {timeLeft} */}
        <div className="flex-center">
            <progress className={`${selectedAnswer.answer ? 'answered-progress' : 'default'}`} max={timer} value={timeLeft}>
                {timeLeft}
            </progress>
        </div>
        {randomizedQuestions.map((it) => {
            return <section key={it} className="answer">
                <button className={it == selectedAnswer.answer ? selectedAnswer.state : ''} onClick={() => selectedAnswer.state ? null : onSelectAnswer(it)} key={it}>{it}</button>
            </section>
        })}
    </div>
}