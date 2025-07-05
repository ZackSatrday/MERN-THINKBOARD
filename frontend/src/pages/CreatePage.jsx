import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../libs/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate input
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
    }

    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note created successfully");
      navigate("/");
    }
    catch (error){
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    }
    finally{
      setLoading(false);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto bg-neutral p-8 rounded">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon size={20} />
            <span>Back to notes</span>
          </Link>

          <div className="card bg-base-100 flex flex-row shadow-md pr-4">
            <div className="card-body">
              <h2 className="card-title text-xl text-gray-300">New Note</h2>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col mb-4">
                  <label className="label mb-1">
                    <span className="label-text text-md">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="label mb-1">
                    <span className="label-text text-md">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Write your note here..."
                    className="textarea textarea-sm"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="w-full card-action">
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
            <div className="card flex justify-center py-4">
              <img
                src={"https://images.unsplash.com/photo-1750797636255-8c939940bcad?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt="Random from web"
                className="rounded-lg shadow-md"
                style={{ width: "250px", height: "264px", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
