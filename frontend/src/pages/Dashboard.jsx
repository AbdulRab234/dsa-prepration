import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QuestionCard from "../components/QuestionCard";
import TestCard from "../components/CardTest";
import MockTest from "./MockTest";
import YourProgress from "./YourProgress";

const Dashboard = () => {

  const [open, setOpen] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get("http://localhost:3000/api/test-auth", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response?.data);
    });

  }, []);

  return (
    <div className="flex">

      {open && <Sidebar />}

      <div className="flex-1">

        <Navbar open={open} setOpen={setOpen} />

        <QuestionCard
          question="What is DBMS?"
          answer="DBMS is software used to manage databases."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <MockTest />
          <YourProgress />
        </div>

        <TestCard
          title="DSA Mock Test"
          totalQuestions={20}
          difficulty="Medium"
        />

      </div>

    </div>
  );
};

export default Dashboard;