import express from "express"
import cors from "cors"
import projectsRouter from './routes/project'
import issuesRouter from './routes/issues'
import authRouter from "./routes/auth"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is running'
    })
})

app.use('/api/projects', projectsRouter)
app.use('/api/issues', issuesRouter)
app.use('/api/auth', authRouter)

export default app
