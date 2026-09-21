import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedBookmarks =
      JSON.parse(
        localStorage.getItem("bookmarkedQuestions")
      ) || [];

    setBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    const subjects = [
      "arrays",
      "linked-list",
      "String",
      "Stack",
      "Tree",
      "Graph",
    ];

    const loadQuestions = async () => {
      let allQuestions = [];

      for (const subject of subjects) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/question/${subject}`
          );

          const subjectQuestions = res.data.map((q) => ({
            ...q,
            subject: subject,
            questionKey: `${subject}-${q.id}`,
          }));

          allQuestions = [
            ...allQuestions,
            ...subjectQuestions,
          ];
        } catch (error) {
          console.log(error);
        }
      }

      setQuestions(allQuestions);
    };

    loadQuestions();
  }, []);

  const bookmarked = questions.filter((q) =>
    bookmarks.includes(q.questionKey)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">
        Bookmarked Questions
      </h1>

      {bookmarked.length === 0 ? (
        <p className="text-gray-500">
          No bookmarked questions found.
        </p>
      ) : (
        <div className="space-y-3">

          {bookmarked.map((q) => (
            <div
              key={q.questionKey}
              className="bg-black text-white p-4 rounded-xl"
            >

              <h2 className="font-bold">
                {q.id} - {q.title}
              </h2>

              <p className="text-gray-300 text-sm mt-1">
                Subject: {q.subject}
              </p>

              <p className="text-gray-300 text-sm">
                Difficulty: {q.difficulty}
              </p>

              <a
                href={q.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 text-sm"
              >
                Solve Problem
              </a>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Bookmarks;