require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const auth = require('./src/routes/auth');
const article = require('./src/routes/article');
const seedAdmin = require('./src/scripts/seed');

connectDB();
seedAdmin();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/', (req, res) => {
    res.send("App is running.");
});

app.use('/api/v1/auth', auth);
app.use('/api/v1/article', article);

app.listen(PORT, () => {
    console.log(`Connected to MongoDB at: ${process.env.MONGO_URI}`);
    console.log(`Server running on http://localhost:${PORT}`);
});