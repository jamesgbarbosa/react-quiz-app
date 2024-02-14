import { useCallback, useState } from "react"
import questions from "../../questions.js"
import Answer from "./Answer.js";
import Summary from "./Summary.js";

export default function Quiz() {
    const [answers, setAnswers] = useState([])
    let currentIndex = answers.length;
    let shuffledQuestions = [];

    const handleAnswer = useCallback(function handleAnswer(it) {
        setAnswers(prev => [...prev, it])
    }, [])

    if (currentIndex == questions.length) {
        return <Summary answers={answers} />
    } else {
        shuffledQuestions = [...questions[currentIndex].answers].sort(() => .5 - Math.random());
    }

    return <div id="question-overview question">
        <div className="flex-center">
            <h2>{questions[currentIndex].text}</h2>
        </div>
        <Answer shuffledQuestions={shuffledQuestions} currentIndex={currentIndex} key={questions[currentIndex].text} onHandleAnswer={handleAnswer} />
    </div>
}