import Note from "../models/Note.js";

const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({createdAt : -1})
        res.status(200).json(notes)
    }
    catch (error) {
        console.error("Error fetching notes - Controller:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id)
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note)
    }
    catch (error) {
        console.error("Error fetching note - Controller:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newNote = new Note({
            title,
            content
        });
        const savedNote = await newNote.save();
        res.status(201).json({
            message: "Note created successfully",
            note: savedNote
        });

    } catch (error) {
        console.error("Error creating note - Controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const updateNotes = async (req, res) => {
    try {
        const { title, content } = req.body
        const { id } = req.params;

        const updateNotes = await Note.findByIdAndUpdate(id, {title, content}, { new: true });

        if (!updateNotes) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({
            message: "Note updated successfully",
            note: updateNotes
        });
    }
    catch (error) {
        console.error("Error updating note - Controller:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}
const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });
    }
    catch (error) {
        console.error("Error deleting notes - Controller:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    getAllNotes,
    getNoteById,
    createNote,
    updateNotes,
    deleteNotes
}