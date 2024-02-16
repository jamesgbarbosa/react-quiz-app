import { useCallback, useEffect, useState } from "react"
import Summary from "./Summary.js";
import Question from "./Question.js";
import useFetch from "../hooks/useFetch.js";

export default function Quiz() {
    const [answers, setAnswers] = useState([])
    let {isLoading, dataFetched:questions, isError } = useFetch('http://localhost:3000/questions', [])
    let currentIndex = answers.length;

    const handleAnswer = useCallback(function handleAnswer(it) {
        setAnswers(prev => [...prev, it])
    }, [questions])

    if (!isError && !isLoading && (currentIndex == questions.length)) {
        return <Summary questions={questions} answers={answers} />
    } 

    return <div id="question-overview question">
        {isLoading ? "Fetching quiz..." : isError ? "Error Occured" : <Question questions={questions} currentIndex={currentIndex} key={questions[currentIndex]?.text} onHandleAnswer={handleAnswer} />}
    </div>
}