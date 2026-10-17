"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("./db");
async function main() {
    try {
        const email = "admin@example.com";
        const password = "Admin@1234#";
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        await db_1.db.orm.public.User.create({
            name: "Admin",
            email,
            passwordHash,
            role: "ADMIN",
        });
        console.log("Admin user created successfully.");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    }
    catch (error) {
        console.error("Failed to seed admin user:", error);
        process.exitCode = 1;
    }
    finally {
        await db_1.db.close();
    }
}
main();
