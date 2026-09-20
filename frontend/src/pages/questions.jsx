import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Questions() {
  const { subject } = useParams();

  const [questions, setQuestions] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load solved questions
  useEffect(() => {
    try {
      const savedQuestions =
        localStorage.getItem("solvedQuestions");

      if (savedQuestions) {
        setSolvedQuestions(JSON.parse(savedQuestions));
      }

      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Save solved questions
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "solvedQuestions",
        JSON.stringify(solvedQuestions)
      );
    }
  }, [solvedQuestions, isLoaded]);

  // Get questions from backend
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/question/${subject}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subject]);

  // Unique question key
  const getQuestionKey = (q) => {
    return `${subject}-${q.id}`;
  };

  // Mark question solved
  const markSolved = (q) => {
    const questionKey = getQuestionKey(q);

    setSolvedQuestions((prev) => {
      if (prev.includes(questionKey)) {
        return prev;
      }

      return [...prev, questionKey];
    });
  };

  // Filter questions
  const easyQuestions = questions.filter(
    (q) => q.difficulty === "easy"
  );

  const mediumQuestions = questions.filter(
    (q) => q.difficulty === "medium"
  );

  const hardQuestions = questions.filter(
    (q) => q.difficulty === "hard"
  );

  return (
    <div className="p-4 min-h-screen bg-white">

      {/* ================= EASY ================= */}

      <h3 className="text-2xl text-black font-bold mb-2">
        Easy Questions
      </h3>

      {easyQuestions.map((q) => {
        const questionKey = getQuestionKey(q);

        return (
          <div
            key={questionKey}
            className="bg-black p-2 rounded mb-2"
          >
            <h3 className="font-bold text-white text-sm">
              {q.id} - {q.title}
            </h3>

            <a
              href={q.link}
              target="_blank"
              rel="noreferrer"
              className="text-white text-sm"
            >
              Solve Problem
            </a>

            <div className="flex justify-end mt-1">

              {solvedQuestions.includes(questionKey) ? (
                <span className="font-bold text-green-400 text-sm">
                  Solved
                </span>
              ) : (
                <button
                  className="bg-white text-black px-2 py-1 rounded text-sm"
                  onClick={() => markSolved(q)}
                >
                  Mark Solved
                </button>
              )}

            </div>
          </div>
        );
      })}


      {/* ================= MEDIUM ================= */}

      <h3 className="text-2xl text-black font-bold mb-2 mt-4">
        Medium Questions
      </h3>

      {mediumQuestions.map((q) => {
        const questionKey = getQuestionKey(q);

        return (
          <div
            key={questionKey}
            className="bg-black p-2 rounded mb-2"
          >
            <h3 className="font-bold text-white text-sm">
              {q.id} - {q.title}
            </h3>

            <a
              href={q.link}
              target="_blank"
              rel="noreferrer"
              className="text-white text-sm"
            >
              Solve Problem
            </a>

            <div className="flex justify-end mt-1">

              {solvedQuestions.includes(questionKey) ? (
                <span className="font-bold text-green-400 text-sm">
                  Solved
                </span>
              ) : (
                <button
                  className="bg-white text-black px-2 py-1 rounded text-sm"
                  onClick={() => markSolved(q)}
                >
                  Mark Solved
                </button>
              )}

            </div>
          </div>
        );
      })}


      {/* ================= HARD ================= */}

      <h3 className="text-2xl text-black font-bold mb-2 mt-4">
        Hard Questions
      </h3>

      {hardQuestions.map((q) => {
        const questionKey = getQuestionKey(q);

        return (
          <div
            key={questionKey}
            className="bg-black p-2 rounded mb-2"
          >
            <h3 className="font-bold text-white text-sm">
              {q.id} - {q.title}
            </h3>

            <a
              href={q.link}
              target="_blank"
              rel="noreferrer"
              className="text-white text-sm"
            >
              Solve Problem
            </a>

            <div className="flex justify-end mt-1">

              {solvedQuestions.includes(questionKey) ? (
                <span className="font-bold text-green-400 text-sm">
                  Solved
                </span>
              ) : (
                <button
                  className="bg-white text-black px-2 py-1 rounded text-sm"
                  onClick={() => markSolved(q)}
                >
                  Mark Solved
                </button>
              )}

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default Questions;