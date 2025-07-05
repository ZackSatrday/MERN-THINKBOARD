import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../libs/axios";
import { ArrowLeft, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

const NotesDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { noteId } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${noteId}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching Node");
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Delete the note!")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted!");
      navigate("/");
    } catch (err) {
      console.log("Erorr Deleting the Note.");
      toast.error("Failed to delete note");
    }
  };

  const handleB2N = () => {
    navigate("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true)

    try {
      await api.put(`/notes/${noteId}`, note)
      toast.success("Note Updated Succesfully")
      navigate('/')
    } catch (error) {
      onsole.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
        setSaving(false)
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto bg-neutral p-6 rounded min-h-[90vh]">
          <div className="flex items-center justify-between mb-6">
            <button className="btn btn-ghost" onClick={handleB2N}>
              <ArrowLeft />
              <span>Back to Notes</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => handleDelete(e, noteId)}>
              Delete Note
            </button>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {loading ? (
              <LoaderIcon className="animate-spin size-10" />
            ) : (
              <div className="card bg-base-100 w-full px-4 py-8">
                <form className="w-full">
                  <div className="flex flex-col mb-4 ">
                    <label className="label mb-1">
                      <span className="label-text text-md">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Note Title"
                      className="input input-sm"
                      value={note.title}
                      onChange={(e) =>
                        setNote({ ...note, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="label mb-1">
                      <span className="label-text text-md">Content</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Write your note here..."
                      className="textarea textarea-md"
                      value={note.content}
                      onChange={(e) =>
                        setNote({ ...note, content: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-full card-action">
                    <button
                      className="btn btn-primary"
                      disabled={saving}
                      onClick={handleSave}>
                      {saving ? "Saving..." : "Save Note"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesDetailPage;
