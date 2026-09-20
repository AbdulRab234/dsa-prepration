import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Questions from "./pages/questions";
import MockTest from "./pages/MockTest";
import StartMockTest from "./pages/StartMockTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/questions/:subject" element={<Questions />} />
        <Route path="/mocktest" element={<MockTest />} />
        <Route path="/mocktest/start" element={<StartMockTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

