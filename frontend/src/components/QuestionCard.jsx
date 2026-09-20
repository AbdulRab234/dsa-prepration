import React, { useEffect, useState } from "react";

function QuestionCard() {
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [mockTests, setMockTests] = useState([]);

  useEffect(() => {
    const solved =
      JSON.parse(localStorage.getItem("solvedQuestions")) || [];

    const tests =
      JSON.parse(localStorage.getItem("mockTests")) || [];

    setSolvedQuestions(solved);
    setMockTests(tests);
  }, []);

  // Questions Solved
  const questionsSolved = solvedQuestions.length;

  // Mock Tests
  const totalMockTests = mockTests.length;

  // Accuracy
  let totalCorrect = 0;
  let totalQuestions = 0;

  mockTests.forEach((test) => {
    totalCorrect += test.score;
    totalQuestions += test.total;
  });

  const accuracy =
    totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl p-6 flex justify-between gap-2">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold mb-2">
          Welcome Back, Student
        </h1>

        <p className="text-gray-500 text-lg mb-6">
          Ready to crack your next interview?
        </p>
      </div>

      {/* Questions Solved */}
      <div className="bg-gray-100 p-5 rounded-2xl w-52 text-center">
        <h2 className="text-3xl font-bold text-purple-600">
          {questionsSolved}
        </h2>

        <p className="mt-2 text-gray-600">
          Questions Solved
        </p>
      </div>

      {/* Day Streak */}
      <div className="bg-gray-100 p-5 rounded-2xl w-52 text-center">
        <h2 className="text-3xl font-bold text-orange-500">
          0
        </h2>

        <p className="mt-2 text-gray-600">
          Day Streak
        </p>
      </div>

      {/* Mock Tests */}
      <div className="bg-gray-100 p-5 rounded-2xl w-52 text-center">
        <h2 className="text-3xl font-bold text-blue-500">
          {totalMockTests}
        </h2>

        <p className="mt-2 text-gray-600">
          Mock Tests
        </p>
      </div>

      {/* Accuracy */}
      <div className="bg-gray-100 p-5 rounded-2xl w-52 text-center">
        <h2 className="text-3xl font-bold text-green-500">
          {accuracy}%
        </h2>

        <p className="mt-2 text-gray-600">
          Accuracy
        </p>
      </div>

    </div>
  );
}

export default QuestionCard;