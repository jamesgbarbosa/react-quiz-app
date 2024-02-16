import { useCallback, useEffect, useState } from "react"
import Summary from "./Summary.js";
import Question from "./Question.js";

export default function Quiz() {
    const [answers, setAnswers] = useState([])
    let currentIndex = answers.length;
    let [isLoading, setIsLoading] = useState(true)
    let [questions, setQuestions] = useState([])
    let [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3000/questions').then((res) => {
            return res.json()
        }).then((it) => {
            setQuestions(() => it.questions)
        }).catch((err) => {
            setIsError(true);
        }).finally(() => {
            setIsLoading(() => false);
        })
    }, [])

    const handleAnswer = useCallback(function handleAnswer(it) {
        setAnswers(prev => [...prev, it])
    }, [questions])

    if (!isError && !isLoading && (currentIndex == questions.length)) {
        return <Summary questions={questions} answers={answers} />
    } else {

    }

    return <div id="question-overview question">
        {isLoading ? "Fetching quiz..." : isError ? "Error Occured" : <Question questions={questions} currentIndex={currentIndex} key={questions[currentIndex]?.text} onHandleAnswer={handleAnswer} />}
    </div>
}