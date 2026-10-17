"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jwt_1 = require("../utils/jwt");
function authenticate(req, res, next) {
    const token = req.cookies?.token;
    if (!token || typeof token !== "string") {
        res.status(401).json({ message: "Authentication required" });
        return;
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        res.status(401).json({ message: "Invalid or expired session" });
    }
}
