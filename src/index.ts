import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import router from './services/authService';


dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', router);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running with PORT ${port}`);
});