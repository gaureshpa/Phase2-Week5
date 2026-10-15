import { Router } from "express";
import { db } from "../prisma/db";

const router = Router()

router.get('/', async(req, res) => {
    try {
        const issues = await db.orm.public.Issue.all()

        res.status(200).json({
            success: true,
            data: issues
        })
    } catch(error) {
        console.error('Failed to fetch issues:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch issues'
        })
    }
})

export default router
