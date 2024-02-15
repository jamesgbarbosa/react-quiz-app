import { useState } from "react";
import questions from "../../questions.js"

export default function Summary({ answers }) {
    const [computedScore, setComputedScore] = useState(0);
    let correctAnswers = answers.filter(it => it.state == 'correct').length;
    let wrongAnswers = answers.filter(it => it.state == 'wrong').length;
    let skipped = answers.filter(it => it.state == '').length;
    // let score = 


    return <div id="summary">
        <h2>Summary</h2>
        <div id="summary-stats">
            <div className="stat">
                <span className="orange number">{((skipped / 7) * 100).toFixed(0)}%</span>
                <span className="text">Skipped</span>
            </div>
            <div className="stat">
                <span className="green number">{((correctAnswers / 7) * 100).toFixed(0)}%</span>
                <span className="text">Correct</span>
            </div>
            <div className="stat">
                <span className="red number">{((wrongAnswers / 7) * 100).toFixed(0)}%</span>
                <span className="text">Wrong</span>
            </div>
        </div>
        <ol>
            {questions.map((it, index) => <li key={index}>
                <h3>{index + 1}</h3>
                <p className="question">{it.text}</p>
                <p className={`user-answer ${answers[index].state ?? 'skipped'}`}>{answers[index].answer ?? "-"}</p>
            </li>)}
        </ol>
    </div>
}