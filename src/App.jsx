import React, { Fragment, useState } from "react";

import Navbar from "./components/Navbar";
import { QuizScreen, JoinScreen } from "./components/Quiz";

const App = () => {
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    return (
        <Fragment>
            <Navbar />
            <div className="quiz-container w-full md:w-[70%] flex mx-auto mt-10 min-h-90 h-102">
                {isQuizStarted ? (
                    <QuizScreen retry={setIsQuizStarted} />
                ) : (
                    <JoinScreen retry={setIsQuizStarted} />
                )}
            </div>
        </Fragment>
    );
};

export default App;
