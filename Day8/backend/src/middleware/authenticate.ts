import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
    userId?: number
}

export function authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies?.token

    if(!token || typeof token !== "string") {
        res.status(401).json({ message: "Authentication required" })
        return
    }

    try {
        const payload = verifyToken(token)
        req.userId = payload.userId
        next()
    } catch {
        res.status(401).json({ message: "Invalid or expired session" })
    }
}