"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET ?? "";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
}
function createToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: "1h"
    });
}
function verifyToken(token) {
    const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (typeof payload === "string" || typeof payload.userId !== "number") {
        throw new Error("Invalid token payload");
    }
    return {
        userId: payload.userId
    };
}
