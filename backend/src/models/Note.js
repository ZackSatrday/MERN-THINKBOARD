import mongoose from "mongoose";

const noteSchemema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Note = mongoose.model("Note", noteSchemema);

export default Note;