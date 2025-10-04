import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import colors from 'colors';
import connectDB from './config/db'

dotenv.config({path: "./.env.development"})

// initialize database connection
connectDB(process.env.MONGO_URI || "")

const app = express();

console.log(process.env.MONGO_URI)

app.get("/", (req: Request, res: Response) => {
    res.send("server is running")
})

export default app;