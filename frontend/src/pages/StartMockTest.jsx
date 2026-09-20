import React, { useEffect, useState } from "react";
import axios from "axios";

function StartMockTest() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/mocktest/start")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Loading
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black text-xl font-bold">
          Loading...
        </p>
      </div>
    );
  }

  // Result screen
  if (testCompleted) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-black text-white p-8 rounded-2xl w-full max-w-md text-center">

          <h1 className="text-3xl font-bold mb-6">
            Test Completed 🎉
          </h1>

          <p className="text-lg mb-2">
            Your Score
          </p>

          <h2 className="text-4xl font-bold mb-4">
            {score}/{questions.length}
          </h2>

          <p className="text-xl mb-6">
            Percentage: {percentage}%
          </p>

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setSelectedAnswer("");
              setScore(0);
              setTestCompleted(false);
            }}
            className="bg-white text-black px-5 py-2 rounded-lg font-bold"
          >
            Retake Test
          </button>

        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const handleNext = () => {
  const isCorrect = selectedAnswer === question.answer;

  const newScore = isCorrect ? score + 1 : score;

  setScore(newScore);
  setSelectedAnswer("");

  if (currentQuestion === questions.length - 1) {

    const result = {
      score: newScore,
      total: questions.length,
      percentage: Math.round(
        (newScore / questions.length) * 100
      ),
    };

    localStorage.setItem(
      "latestMockTest",
      JSON.stringify(result)
    );

    setTestCompleted(true);
  } else {
    setCurrentQuestion(currentQuestion + 1);
  }
};

  return (
    <div className="min-h-screen bg-white p-6">

      <h1 className="text-3xl font-bold text-black mb-6">
        DSA Mock Test
      </h1>

      <div className="bg-black text-white p-6 rounded-xl max-w-3xl">

        <p className="text-gray-300 mb-3">
          Question {currentQuestion + 1} of{" "}
          {questions.length}
        </p>

        <h2 className="text-xl font-bold mb-5">
          {question.question}
        </h2>

        <div className="space-y-3">

          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedAnswer(option)
              }
              className={`w-full text-left p-3 border rounded-lg ${
                selectedAnswer === option
                  ? "bg-white text-black"
                  : "bg-black text-white border-white"
              }`}
            >
              {option}
            </button>
          ))}

        </div>

        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="mt-5 bg-white text-black px-5 py-2 rounded-lg font-bold disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1
            ? "Submit Test"
            : "Next"}
        </button>

      </div>

    </div>
  );
}

export default StartMockTest;