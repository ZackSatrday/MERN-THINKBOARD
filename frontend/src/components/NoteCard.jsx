import { PenSquare, Trash } from "lucide-react";
import React from "react";
import api from '../libs/axios.js'
import { Link } from "react-router";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault()

    if(!window.confirm("Delete the note!")) return

    try {
    await api.delete(`/notes/${id}`);
    // refresh ui ,delete the note from notes array
    setNotes((prev) => prev.filter((note) => note._id !== id));
    toast.success("Note deleted!");
  } catch (err) {
    console.log("Erorr Deleting the Note.")
    toast.error("Failed to delete note");
  }
  };

  return (
    <div>
      <Link
        to={`/notes/${note._id}`}
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="card-body">
          <h3 className="card-title font-medium">{note.title}</h3>
          <p>{note.content}</p>
          <div className="card-actions justify-between items-center">
            <span className="text-sm text-gray-400">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center gap-1">
              <PenSquare size={16} />
              <button
                className="btn btn-ghost btn-sm text-error"
                onClick={(e) => handleDelete(e, note._id)}>
                <Trash size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
