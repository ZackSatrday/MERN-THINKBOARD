import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { CircleCheckBig, Trash2 } from "lucide-react";
import NoteCard from "../components/NoteCard";
import api from "../libs/axios";
import NotesNotFound from "../components/NoteNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (err) {
        setError("Error in fetching notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="fixed z-10 w-full">
        <NavBar />
      </div>

      <div className="bg-neutral min-h-screen max-w-3xl mx-auto">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Notes</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </ul>
          )}
          {notes.length === 0 && <NotesNotFound />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
