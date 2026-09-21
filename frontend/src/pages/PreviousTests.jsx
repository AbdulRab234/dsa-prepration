import React, { useEffect, useState } from "react";

function PreviousTests() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const savedTests =
      JSON.parse(localStorage.getItem("mockTests")) || [];

    setTests(savedTests);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        Previous Tests
      </h1>

      {tests.length === 0 ? (
        <p className="text-gray-500">
          No previous tests found.
        </p>
      ) : (
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h2 className="text-lg font-bold">
                DSA Mock Test - {index + 1}
              </h2>

              <p className="mt-2">
                Score: {test.score}/{test.total}
              </p>

              <p>
                Percentage: {test.percentage}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PreviousTests;