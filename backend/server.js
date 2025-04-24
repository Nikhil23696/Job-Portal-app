import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/user-route.js'
import jobRoute from './routes/job-route.js'
import applicationRoute from './routes/application-route.js'
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
connectDB();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(cors({
    origin: 'https://kaamkarlo.onrender.com',
    credentials: true
}));

app.use('/api/v1/user', userRoute)
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
})


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`)
})   