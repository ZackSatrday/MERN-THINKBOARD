import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NotesDetailPage from "./pages/NotesDetailPage.jsx";
const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:noteId" element={<NotesDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
