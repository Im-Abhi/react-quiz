import { Fragment, useEffect, useState } from "react";
import { addResult } from "../indexedDBHelher";
import PastResults from "./PastResults";

const QuizResult = ({ result, retry }) => {
    const [displayPastResult, setDisplayPastResults] = useState(false);

    const handleRetry = () => {
        retry(false);
    };

    useEffect(() => {
        if (!result) return;
        const storeResult = async () => {
            await addResult(result); // Save the current result
        };

        storeResult();
    }, [result]);

    return (
        <div className="bg-white p-10 rounded-xl text-center flex flex-col h-full items-center">
            {displayPastResult ? (
                <PastResults hidePastResults={setDisplayPastResults} />
            ) : (
                <Fragment>
                    <h2 className="text-center text-2xl mb-4">
                        Quiz Completed!
                    </h2>
                    <p className="my-2">
                        <b> Score: </b> {result?.correct}/{result?.total}
                    </p>
                    <p className="my-2">
                        <b>Correct:</b> {result?.correct}
                    </p>
                    <p className="mb-4">
                        <b>Incorrect:</b> {result?.incorrect}
                    </p>
                    <div className="w-max">
                        <button onClick={handleRetry} type="button">
                            Retry
                        </button>
                    </div>
                </Fragment>
            )}
            <button
                onClick={() => setDisplayPastResults(prev => !prev)}
                className="w-max mt-auto pl-4"
                type="button"
            >
                Show Past Results
            </button>
        </div>
    );
};

export default QuizResult;
