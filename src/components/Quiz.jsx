import { useEffect, useState } from "react";

import Question from "./Question";
import QuizResult from "./QuizResult";

import QA from "../data/QA.json";

export const QuizScreen = ({ retry }) => {
    const totalQuestions = QA.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [MarkedAnswers, setMarkedAnswers] = useState(
        new Array(totalQuestions)
    );
    const [result, setResult] = useState(null);

    const [isQuestionEnd, setIsQuestionEnd] = useState(false);

    useEffect(() => {
        setIsQuestionEnd(() => {
            return currentQuestionIndex === totalQuestions;
        });
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (isQuestionEnd) calculateResults();
    }, [isQuestionEnd]);

    function calculateResults() {
        let correct = 0;
        QA.forEach((question, index) => {
            if (question.answer == MarkedAnswers[index]) {
                correct++;
            }
        });
        setResult({
            total: totalQuestions,
            correct: correct,
            incorrect: totalQuestions - correct,
        });
    }

    return (
        <div className="quiz-screen w-full bg-white rounded-2xl min-h-90">
            {isQuestionEnd ? (
                <QuizResult result={result} retry={retry} />
            ) : (
                <Question
                    question={QA[currentQuestionIndex]}
                    totalQuestions={totalQuestions}
                    setAnswer={(ans) => {
                        setMarkedAnswers((arr) => {
                            let newArr = [...arr];
                            newArr[currentQuestionIndex] = ans;
                            return newArr;
                        });
                        if (currentQuestionIndex + 1 === totalQuestions) {
                            setIsQuestionEnd(true);
                        } else {
                            setCurrentQuestionIndex((prev) => prev + 1);
                        }
                    }}
                />
            )}
        </div>
    );
};

export const JoinScreen = ({ retry }) => {
    const handleStart = () => {
        retry(true);
    };

    return (
        <div className="join-screen border border-blue-700 p-10 text-center bg-white rounded-2xl h-max">
            <h2 className="text-4xl font-bold text-center mb-5">Join Quiz</h2>
            This quiz consists of 10 questions in total, divided into two types:
            <ul className="italic text-gray-700 my-4">
                <li className="">5 Multiple-Choice Questions (MCQs)</li>
                <li className="">5 Integer-Type</li>
            </ul>
            <p className="my-4">
                Questions You will have 30 seconds to answer each question, with
                a total time limit of 5 minutes for the entire quiz. At the end
                of the quiz, your score will be displayed based on the number of
                correct answers <b>with an option to view past results</b>.
            </p>
            <button className="" onClick={handleStart}>
                Start
            </button>
        </div>
    );
};
