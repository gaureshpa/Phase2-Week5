"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../prisma/db");
const jwt_1 = require("../utils/jwt");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(db_1.db.orm.public.User)));
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
            res.status(400).json({
                message: "Email and password and required"
            });
            return;
        }
        const user = await db_1.db.orm.public.User
            .where({ email: email.trim() })
            .first();
        if (!user || !(await bcryptjs_1.default.compare(password, user.passwordHash))) {
            res.status(401).json({
                message: "Invalid email or password"
            });
            return;
        }
        const token = (0, jwt_1.createToken)({ userId: user.id });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({
            message: "An unexpected error occured"
        });
    }
});
router.get("/me", authenticate_1.authenticate, async (req, res) => {
    try {
        const userId = req.userId;
        if (userId === undefined) {
            res.status(401).json({ message: "Authentication required" });
            return;
        }
        const user = await db_1.db.orm.public.User
            .where({ id: userId })
            .first();
        if (!user) {
            res.status(401).json({ message: "User no longer exists" });
            return;
        }
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Failed to retrieve current user:", error);
        res.status(500).json({ message: "An unexpected error occured" });
    }
});
exports.default = router;
