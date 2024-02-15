import { useCallback, useState } from "react"
import questions from "../../questions.js"
import Answer from "./AnswerOptions.js";
import Summary from "./Summary.js";
import Question from "./Question.js";

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
        
        <Question shuffledQuestions={shuffledQuestions} currentIndex={currentIndex} key={questions[currentIndex].text} onHandleAnswer={handleAnswer} />
    </div>
}