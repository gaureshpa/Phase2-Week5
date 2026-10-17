import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? ""

if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured")
}

export interface AuthPayload {
    userId: number
}

export function createToken(payload: AuthPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h"
    })
}

export function verifyToken(token: string): AuthPayload {
    const payload = jwt.verify(token, JWT_SECRET)

    if(typeof payload === "string" || typeof payload.userId !== "number") {
        throw new Error("Invalid token payload")
    }

    return {
        userId: payload.userId
    }
}
