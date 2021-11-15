require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRouter = require('./routes/auth.routes');
const noteRouter = require('./routes/note.routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
        origin: ['http://localhost:3000'],
        credentials: true
	})
);

connectDB();

app.get('/', (req, res) => {
    return res.status(200).json('This API is working now!!!')
})

app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})