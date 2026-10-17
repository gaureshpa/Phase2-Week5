import { Router } from "express";
import bcrypt from "bcryptjs"
import { db } from "../prisma/db";
import { createToken } from "../utils/jwt";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";

const router = Router()


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
            res.status(400).json({
                message: "Email and password and required"
            })
            return
        }

        const user = await db.orm.public.User
            .where({ email: email.trim() })
            .first()


        if(!user || !(await bcrypt.compare(password, user.passwordHash))) {
            res.status(401).json({
                message: "Invalid email or password"
            })
            return
        }

        const token = createToken({userId: user.id})

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60*60*1000
        })

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch(error) {
        console.error("Login failed:", error)
        res.status(500).json({
            message: "An unexpected error occured"
        })
    }
    
})

router.get("/me", authenticate, async (req, res) => {
    try {
        const userId = (req as AuthenticatedRequest).userId

        if(userId === undefined) {
            res.status(401).json({message: "Authentication required"})
            return
        }

        const user = await db.orm.public.User
            .where({id: userId})
            .first()

        if(!user) {
            res.status(401).json({message: "User no longer exists"})
            return
        }

        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        console.error("Failed to retrieve current user:", error)
        res.status(500).json({message: "An unexpected error occured"})
    }
})

router.post("/logout", (req, res) => {
    console.log("Logout endpoint reached")

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax"
    })

    res.status(200).json({
        message: "Logout successful"
    })
})

export default router