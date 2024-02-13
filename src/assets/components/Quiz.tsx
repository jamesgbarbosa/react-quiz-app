import { useState } from "react"
import questions from "../../questions.js"

export default function Quiz() {
    const [answers, setAnswers] = useState([])
    let currentIndex = answers.length ;
    console.log(questions)
    function onHandleAnswer(it) {
        setAnswers(prev => [...prev, it])
    }
    if (currentIndex == questions.length) {
        return <h1>End quiz</h1>
    }
    return <div id="question-overview question">
        <h2>{questions[currentIndex].text}</h2>
        <div id="answers">
            {questions[currentIndex].answers.map((it, index) => {
                return <section className="answer">
                    <button onClick={() => onHandleAnswer(it)} key={it}>{it}</button>
                </section>
            })}
        </div>
    </div>
}