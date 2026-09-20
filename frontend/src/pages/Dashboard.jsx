import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import QuestionCard from "../components/QuestionCard";
import TestCard from "../components/CardTest";
import MockTest from "./MockTest";
import YourProgress from "./YourProgress";


const Dashboard = () => {

  const [open, setOpen] = useState(true);

  return (
    <div className="flex">

     
      {open && <Sidebar />}

    
      <div className="flex-1">

        
        <Navbar open={open} setOpen={setOpen} />

        
        <QuestionCard
          question="What is DBMS?"
          answer="DBMS is software used to manage databases."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4  ">
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