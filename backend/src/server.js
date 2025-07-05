import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;

//middleware 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true, // Allow credentials if needed
}))

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port : http://localhost:${PORT}`);
    })
})

