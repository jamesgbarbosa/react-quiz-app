import { useState } from "react";
import questions from "../../questions.js";
import QuestionTimer from "./QuestionTimer.js";
import AnswerOptions from "./AnswerOptions.js";

const TIMER = 5000;

export default function Question({ onHandleAnswer, currentIndex, shuffledQuestions }) {
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: null, state: '' })
    const [timer, setTimer] = useState(TIMER)

    function onSelectAnswer(it) {
        setTimer(()=> 3000)
        setSelectedAnswer(it)
    }

    function addDelay(delayInMs) {
        setTimer(() => delayInMs)
        setSelectedAnswer({answer: null, state: 'checking'})
    }
    
    function handleTimeout() {
        // setSelectedAnswer({answer: null, state: ''})
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
        <div className="flex-center">
            <QuestionTimer key={currentIndex} state={timerState} timeout={timer} onTimeout={handleTimeout} />
        </div>
        <div className="flex-center">
            <h2>{questions[currentIndex].text}</h2>
        </div>
        <AnswerOptions onDelay={addDelay} shuffledQuestions={shuffledQuestions} currentIndex={currentIndex} onHandleAnswer={onSelectAnswer}></AnswerOptions>
    </div>
}