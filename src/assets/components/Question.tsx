import { useRef, useState } from "react";
import QuestionTimer from "./QuestionTimer.js";
import AnswerOptions from "./AnswerOptions.js";

const TIMER = 20000;

export default function Question({ onHandleAnswer, currentIndex, questions }) {
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: null, state: '' })
    const [timer, setTimer] = useState(TIMER)
    const shuffledQuestions = useRef();

    if (!shuffledQuestions.current) {
        shuffledQuestions.current = [...questions[currentIndex].answers].sort(() => .5 - Math.random());
    }

    function onSelectAnswer(it) {
        setTimer(()=> 3000)
        setSelectedAnswer(it)
    }

    function addDelay(delayInMs) {
        setTimer(() => delayInMs)
        setSelectedAnswer({answer: null, state: 'checking'})
    }
    
    function handleTimeout() {
        onHandleAnswer(selectedAnswer)
    }

    let timerState = 'default';
    if (selectedAnswer.state == 'checking') {
        timerState = 'answered-loading'
    } else if (selectedAnswer.state == 'correct' || selectedAnswer.state == 'wrong'){
        timerState = 'answered-progress'
    } else {
        timerState = 'default';
    }

    return <div id="answers">
        
        <h4>Question {currentIndex+1} out of {questions.length} </h4>
        <div className="flex-center">
            <QuestionTimer key={currentIndex} state={timerState} timeout={timer} onTimeout={handleTimeout} />
        </div>
        <div className="flex-center">
            <h2>{questions[currentIndex].text}</h2>
        </div>
        <AnswerOptions onDelay={addDelay} shuffledQuestions={shuffledQuestions.current} currentIndex={currentIndex} onHandleAnswer={onSelectAnswer} questions={questions}></AnswerOptions>
    </div>
}