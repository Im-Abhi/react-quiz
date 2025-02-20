import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const Question = ({ question, totalQuestions, setAnswer }) => {
    const [selectedAnswer, setSeletedAnswer] = useState(null);
    const [natvalue, setnatValue] = useState("");
    const timer = useRef(null);
    const progressBar = useRef(null);

    function gotoNextQuestion() {
        setnatValue("");
        if (timer.current) {
            clearTimeout(timer.current);
        }
        flushSync(() => {
            if (!question.options) {
                setAnswer(natvalue);
            } else {
                setAnswer(selectedAnswer);
            }
        });
        setSeletedAnswer(null);
    }

    useEffect(() => {
        progressBar.current.classList.remove("active1");
        setTimeout(() => {
            progressBar.current.classList.add("active1");
        }, 1);
        timer.current = setTimeout(gotoNextQuestion, 30 * 1000); // 30 seconds
        setnatValue("");
        return () => {
            // gotoNextQuestion;
            if (timer.current) clearInterval(timer.current);
        };
    }, [question]);

    return (
        <div className="question flex flex-col bg-white rounded-b-2xl p-5 h-full relative rounded-t-[10px]">
            <div className="progress-bar" ref={progressBar}></div>
            <div className="questionCount">
                <b>
                    <span className="text-2xl">{question.id}</span>
                </b>
                <b>
                    <span className="text-gray-300 text-sm">
                        /{totalQuestions}
                    </span>
                </b>
            </div>
            <hr className="text-gray-300" />
            <div className="main-question my-2">
                <div className="title"></div>
                <p>
                    <b>Q.&nbsp;</b>
                    {question.title}
                </p>
                {question.options ? (
                    <div className="options">
                        {question.options.map((option, index) => {
                            return (
                                <div
                                    className={`
                                        ${
                                            index === selectedAnswer
                                                ? "option active"
                                                : "option"
                                        }
                                    `}
                                    key={index}
                                    onClick={() => setSeletedAnswer(index)}
                                >
                                    {option}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="input-box my-3">
                        <input
                            value={natvalue}
                            className="w-full bg-gray-100 rounded-xl p-2"
                            placeholder="Enter your answer here"
                            type="number"
                            onChange={(e) => {
                                setnatValue(e.target.value);
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="control mt-auto mx-auto">
                <button onClick={gotoNextQuestion}>Next</button>
            </div>
        </div>
    );
};

export default Question;
