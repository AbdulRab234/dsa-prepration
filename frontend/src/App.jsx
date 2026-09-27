import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Questions from "./pages/questions";
import MockTest from "./pages/MockTest";
import StartMockTest from "./pages/StartMockTest";
import PreviousTests from "./pages/PreviousTests";
import CardTest from "./components/CardTest";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/questions/:subject" element={<Questions />} />
        <Route path="/mocktest" element={<MockTest />} />
        <Route path="/mocktest/start" element={<StartMockTest />} />
        <Route path="/previous-tests" element={<PreviousTests />} />
        <Route path="/subjects" element={<CardTest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/bookmarks"
          element={<Bookmarks />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

