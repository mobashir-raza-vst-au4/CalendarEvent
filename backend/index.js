const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8000;
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const { startTask } = require('./cronjob');
const task = "start";
require('dotenv').config()

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB nEskMVxkJwh5oDpr ..
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.sgljtue.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database connected successfully');
});


//Configure routes
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);

if (task === "start") {
    startTask(task)
}

if (task === "stop") {
    stopTask(task)
}

if (task === "destroy") {
    destroyTask(task)
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});