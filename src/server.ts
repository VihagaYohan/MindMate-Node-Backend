import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db'

dotenv.config({ path: "./.env.development" })

// initialize database connection
connectDB(process.env.MONGO_URI || "")

const app = express();
app.use(express.json())

// development logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// import routes
import categoris from './routes/categories'
import auth from './routes/auth'
import profiles from './routes/profile'

// import middleware
import errorHandler from './middleware/errorHandler'

// mount routes
app.use('/api/v1/categories', categoris)
app.use('/api/v1/auth', auth)
app.use('/api/v1/profiles', profiles)

// register middleware
app.use(errorHandler)

app.get("/", (req: Request, res: Response) => {
    res.send("server is running")
})

export default app;