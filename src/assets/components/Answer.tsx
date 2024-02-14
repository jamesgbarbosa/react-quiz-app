import { useState } from "react";
import questions from "../../questions.js";
import QuestionTimer from "./QuestionTimer.js";

const TIMER = 5000;

export default function Answer({ onHandleAnswer, currentIndex, shuffledQuestions }) {
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: null, state: '' })
    const [timer, setTimer] = useState(TIMER)

    function onSelectAnswer(it) {
        setTimer(() => 3000)
            setSelectedAnswer(() => {
                return {
                    answer: it,
                    state: 'selected'
                }
            });
            if (questions[currentIndex].answers[0] == selectedAnswer.answer) {
                setSelectedAnswer(prev => ({ ...prev, state: "correct" }))
            } else {
                setSelectedAnswer(prev => ({ ...prev, state: "wrong" }))
            }
    }
    
    function handleTimeout() {
        console.log(selectedAnswer)
        onHandleAnswer(selectedAnswer.answer)
    }

    return <div id="answers">
        <div className="flex-center">
            <QuestionTimer key={currentIndex} state={selectedAnswer.state ? '' : 'default'} timeout={timer} onTimeout={handleTimeout} />
        </div>
        {shuffledQuestions.map((it) => {
            return <section key={it} className="answer">
                <button className={it == selectedAnswer.answer ? selectedAnswer.state : ''} onClick={() => selectedAnswer.state ? null : onSelectAnswer(it)} key={it}>{it}</button>
            </section>
        })}
    </div>
}