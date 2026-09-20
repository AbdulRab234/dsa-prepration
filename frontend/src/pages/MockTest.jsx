import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MockTest() {
  const navigate = useNavigate();

  const [latestTest, setLatestTest] = useState(null);

  useEffect(() => {
    const savedTest = localStorage.getItem("latestMockTest");

    if (savedTest) {
      setLatestTest(JSON.parse(savedTest));
    }
  }, []);

  const mockTests = [
    {
      id: 1,
      title: "DSA Mock Test - 1",
      questions: latestTest ? latestTest.total : 3,
      difficulty: "Medium",
      score: latestTest
        ? `${latestTest.score}/${latestTest.total}`
        : "-",
      percentage: latestTest
        ? `${latestTest.percentage}%`
        : "-",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-3xl border-gray-200 shadow-lg border">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">
          Recent Mock Tests
        </h2>

        <button className="text-blue-600 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-1">

        {mockTests.map((test) => (
          <div
            key={test.id}
            onClick={() => navigate("/mocktest/start")}
            className="flex justify-between items-center border-b pb-2 cursor-pointer hover:bg-gray-50"
          >

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                📝
              </div>

              <div>
                <h3 className="font-semibold text-sm">
                  {test.title}
                </h3>

                <p className="text-gray-500 text-xs">
                  {test.questions} Questions • {test.difficulty}
                </p>
              </div>

            </div>

            <div className="text-right">

              <p className="text-gray-400 text-xs">
                Score
              </p>

              <h3 className="font-bold text-sm">
                {test.score}
              </h3>

              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-semibold">
                {test.percentage}
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default MockTest;