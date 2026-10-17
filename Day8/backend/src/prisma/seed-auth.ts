import bcrypt from "bcryptjs"
import { db } from "./db"

async function main() {
    try {
        const email = "admin@example.com"
        const password = "Admin@1234#"
        const passwordHash = await bcrypt.hash(password, 12)

        await db.orm.public.User.create({
            name: "Admin",
            email,
            passwordHash,
            role: "ADMIN",
        })

        console.log("Admin user created successfully.")
        console.log(`Email: ${email}`)
        console.log(`Password: ${password}`)
        
    } catch (error) {
        console.error("Failed to seed admin user:", error)
        process.exitCode = 1
    } finally {
        await db.close()
    }
}

main()