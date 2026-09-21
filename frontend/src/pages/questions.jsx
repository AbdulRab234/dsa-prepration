import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Questions() {
  const { subject } = useParams();

  const [questions, setQuestions] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);

  // Load solved questions and bookmarks
  useEffect(() => {
    const savedQuestions =
      JSON.parse(localStorage.getItem("solvedQuestions")) || [];

    setSolvedQuestions(savedQuestions);

    const savedBookmarks =
      JSON.parse(
        localStorage.getItem("bookmarkedQuestions")
      ) || [];

    setBookmarkedQuestions(savedBookmarks);

    setIsLoaded(true);
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

  // Create unique question key
  const getQuestionKey = (q) => {
    return `${subject}-${q.id}`;
  };

  // Mark question as solved
  const markSolved = (q) => {
    const questionKey = getQuestionKey(q);

    setSolvedQuestions((prev) => {
      if (prev.includes(questionKey)) {
        return prev;
      }

      const updatedQuestions = [
        ...prev,
        questionKey,
      ];

      // Tell CardTest that progress changed
      window.dispatchEvent(
        new Event("progressUpdated")
      );

      return updatedQuestions;
    });
  };

  // Bookmark / Remove Bookmark
  const toggleBookmark = (q) => {
    const questionKey = getQuestionKey(q);

    setBookmarkedQuestions((prev) => {
      let updatedBookmarks;

      if (prev.includes(questionKey)) {
        updatedBookmarks = prev.filter(
          (item) => item !== questionKey
        );
      } else {
        updatedBookmarks = [
          ...prev,
          questionKey,
        ];
      }

      localStorage.setItem(
        "bookmarkedQuestions",
        JSON.stringify(updatedBookmarks)
      );

      return updatedBookmarks;
    });
  };

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

      {/* EASY */}
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

            <div className="flex justify-end mt-1 gap-2">

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

              <button
                className="bg-yellow-400 text-black px-2 py-1 rounded text-sm"
                onClick={() => toggleBookmark(q)}
              >
                {bookmarkedQuestions.includes(questionKey)
                  ? "Bookmarked"
                  : "Bookmark"}
              </button>

            </div>
          </div>
        );
      })}

      {/* MEDIUM */}
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

            <div className="flex justify-end mt-1 gap-2">

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

              <button
                className="bg-yellow-400 text-black px-2 py-1 rounded text-sm"
                onClick={() => toggleBookmark(q)}
              >
                {bookmarkedQuestions.includes(questionKey)
                  ? "Bookmarked"
                  : "Bookmark"}
              </button>

            </div>
          </div>
        );
      })}

      {/* HARD */}
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

            <div className="flex justify-end mt-1 gap-2">

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

              <button
                className="bg-yellow-400 text-black px-2 py-1 rounded text-sm"
                onClick={() => toggleBookmark(q)}
              >
                {bookmarkedQuestions.includes(questionKey)
                  ? "Bookmarked"
                  : "Bookmark"}
              </button>

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default Questions;