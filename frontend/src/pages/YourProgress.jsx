import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function YourProgress() {
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions =
      JSON.parse(localStorage.getItem("solvedQuestions")) || [];

    setSolvedQuestions(savedQuestions);
  }, []);

  // Total questions in your backend
  const totalQuestions = 13;

  const solved = solvedQuestions.length;

  const progress =
    totalQuestions > 0
      ? Math.round((solved / totalQuestions) * 100)
      : 0;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">

      <h2 className="text-lg font-bold mb-3">
        Your Progress
      </h2>

      <div className="w-28 mx-auto">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: "#7c3aed",
            trailColor: "#ede9fe",
            textColor: "#111827",
            textSize: "18px",
          })}
        />
      </div>

      <p className="text-center mt-2 text-xs text-gray-500">
        Overall Progress
      </p>

      <div className="mt-4 space-y-2">

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>

          <span className="w-12 text-xs">
            Solved
          </span>

          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <span className="text-xs">
            {solved}/{totalQuestions}
          </span>
        </div>

      </div>

    </div>
  );
}

export default YourProgress;