import { useState } from "react";

export default function AnswerOptions({ onHandleAnswer, onDelay, currentIndex, shuffledQuestions, questions }) {
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: null, state: '' })

    function onSelectAnswer(it) {
        let delay = 1000;
        onDelay(delay)
        setTimeout(() => {
             let selectedAnswer = {
            answer: it,
            state: 'selected'
        }
        setSelectedAnswer(() => {
            return selectedAnswer;
        });
        if (questions[currentIndex].answers[0] == it) {
            selectedAnswer = {answer: it, state: "correct"}
            setSelectedAnswer(prev => (selectedAnswer))
        } else {
            selectedAnswer = {answer: it, state: "wrong"}
            setSelectedAnswer(prev => (selectedAnswer))
        }
        onHandleAnswer(selectedAnswer); // Put the the timer
        }, delay - 200)
    }

    return <>
        {
            shuffledQuestions.map((it) => {
                return <section key={it} className="answer">
                    <button className={it == selectedAnswer.answer ? selectedAnswer.state : ''} onClick={() => selectedAnswer.state ? null : onSelectAnswer(it)} key={it}>{it}</button>
                </section>
            })
        }
    </>
}