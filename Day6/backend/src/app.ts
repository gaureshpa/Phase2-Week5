import express from "express"
import cors from "cors"
import projectsRouter from './routes/project'
import issuesRouter from './routes/issues'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is running'
    })
})

app.use('/api/projects', projectsRouter)
app.use('/api/issues', issuesRouter)

export default app
