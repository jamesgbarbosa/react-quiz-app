import { useCallback, useEffect, useState } from "react"
import questions from "../../questions.js"
import Answer from "./Answer.js";

export default function Quiz() {
    const [answers, setAnswers] = useState([])
    let currentIndex = answers.length ;
    console.log(questions)

    const handleAnswer = useCallback(function handleAnswer(it) {
            setAnswers(prev => [...prev, it])
    })
    
    if (currentIndex == questions.length) {
        return <h1>
            {answers.map(it => <p key={it}>{it}</p>)}
        </h1>
    }
    return <div id="question-overview question">
        {currentIndex}
        <h2>{questions[currentIndex].text}</h2>
        <Answer key={questions[currentIndex].text} question={questions[currentIndex]} onHandleAnswer={handleAnswer} />
    </div>
}