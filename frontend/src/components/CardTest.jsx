import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CardTest() {
  const navigate = useNavigate();

  const [subjectData, setSubjectData] = useState({});

  const subjects = [
    {
      name: "Arrays",
      apiName: "arrays",
      icon: "📚",
      button: "Practice Now",
    },
    {
      name: "Linked List",
      apiName: "linked-list",
      icon: "🔗",
      button: "Practice Now",
    },
    {
      name: "String",
      apiName: "String",
      icon: "🔤",
      button: "Start Practice",
    },
    {
      name: "Stack",
      apiName: "Stack",
      icon: "📦",
      button: "Start Practice",
    },
    {
      name: "Tree",
      apiName: "Tree",
      icon: "📦",
      button: "Start Practice",
    },
    {
      name: "Graph",
      apiName: "Graph",
      icon: "🌳",
      button: "Start Practice",
    },
  ];

  useEffect(() => {
    const loadQuestions = async () => {
      const solvedQuestions =
        JSON.parse(
          localStorage.getItem("solvedQuestions")
        ) || [];

      const data = {};

      for (const subject of subjects) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/question/${subject.apiName}`
          );

          const questions = res.data;

          const solved = questions.filter((q) =>
            solvedQuestions.includes(q.id)
          ).length;

          data[subject.apiName] = {
            total: questions.length,
            solved: solved,
            progress:
              questions.length > 0
                ? Math.round(
                    (solved / questions.length) * 100
                  )
                : 0,
          };
        } catch (error) {
          console.log(error);
        }
      }

      setSubjectData(data);
    };

    loadQuestions();
  }, []);

  return (
    <div className="bg-gray-100 rounded-2xl p-4">

      <div className="bg-white rounded-2xl p-4">

        <h1 className="text-xl font-bold mb-4">
          DSA Subjects
        </h1>

        <div className="flex flex-wrap gap-2">

          {subjects.map((subject) => {
            const data =
              subjectData[subject.apiName] || {
                total: 0,
                solved: 0,
                progress: 0,
              };

            return (
              <div
                key={subject.apiName}
                className="bg-white text-black p-4 rounded-2xl w-44 border-2 shadow-sm flex flex-col gap-2 flex-shrink-0"
              >

                <h1 className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full text-3xl">
                  {subject.icon}
                </h1>

                <h2 className="text-lg font-bold">
                  {subject.name}
                </h2>

                <p>
                  {data.solved}/{data.total} Solved
                </p>

                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${data.progress}%`,
                    }}
                  ></div>
                </div>

                <p className="text-xs text-gray-500">
                  {data.progress}% Completed
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/questions/${subject.apiName}`
                    )
                  }
                  className="bg-white text-purple-500 px-2 py-2 rounded-lg border-2 mt-2"
                >
                  {subject.button}
                </button>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default CardTest;