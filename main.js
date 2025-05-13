import express from 'express';
import connectDB from "./config/db.js";
import { PORT } from './config/config.js';
import taskRoutes from './src/routes/task.router.js';
import userRoutes from './src/routes/user.router.js';

const app = express();


//middleware
app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api/auth', userRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoints Not found'
    })
})

// if a database is connected, start a server
const startServer = async () => {
    //database connected
    await connectDB();
    //server connected
    app.listen(PORT, () => {
        console.log(`Server on port ${PORT}`);
    });
};

startServer();