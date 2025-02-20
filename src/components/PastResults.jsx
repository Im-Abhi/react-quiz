import React, { useEffect, useState } from "react";
import { getResults } from "../indexedDBHelher";

const PastResults = ({ hidePastResults }) => {
    let [pastRecords, setPastRecords] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const results = await getResults(); // Fetch all results from IndexedDB
            setPastRecords(results);
        };
        fetchResults();
    }, []);

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Past Quiz Results</h2>
            <table>
                <thead className="">
                    <tr className="">
                        <th>Attempt</th>
                        <th>Total</th>
                        <th>Correct</th>
                        <th>Incorrect</th>
                    </tr>
                </thead>
                <tbody>
                    {pastRecords.length > 0 ? (
                        pastRecords.map((result, index) => (
                            <tr key={index}>
                                <td>{result.attempt}</td>
                                <td>{result.total}</td>
                                <td>{result.correct}</td>
                                <td>{result.incorrect}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No past results found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* <button
                onClick={() => setDisplayPastResults(true)}
                className="w-max mt-auto pl-4"
                type="button"
            >
                Hide Past Results
            </button> */}
        </div>
    );
};

export default PastResults;
