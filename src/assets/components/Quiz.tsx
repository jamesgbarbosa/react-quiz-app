import { useCallback, useState } from "react"
import questions from "../../questions.js"
import Answer from "./Answer.js";

export default function Quiz() {
    const [answers, setAnswers] = useState([])
    let currentIndex = answers.length;
    let shuffledQuestions = [];

    const handleAnswer = useCallback(function handleAnswer(it) {
        setAnswers(prev => [...prev, it])
    })

    if (currentIndex == questions.length) {
        return <h1>
            {answers.map((it, index) => <p key={index}>{it}</p>)}
        </h1>
    } else {
        shuffledQuestions = [...questions[currentIndex].answers].sort(() => .5 - Math.random());
    }

    return <div id="question-overview question">
        <div>
            <h2>{questions[currentIndex].text}</h2>
        </div>
        <Answer shuffledQuestions={shuffledQuestions} currentIndex={currentIndex} key={questions[currentIndex].text} onHandleAnswer={handleAnswer} />
    </div>
}