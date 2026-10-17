import { Router } from "express";
import { db } from "../prisma/db";

const router = Router()

router.get('/', async(req, res) => {
    try {
        const projects = await db.orm.public.Project.all()

        res.status(200).json({
            success: true,
            data: projects,
        })
    } catch (error) {
        console.error('Failed to fetch projects:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects'
        })
    }
})

export default router