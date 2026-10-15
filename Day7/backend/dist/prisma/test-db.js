"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = require("./db.js");
async function main() {
    try {
        const projects = await db_js_1.db.orm.public.Project.all();
        const issues = await db_js_1.db.orm.public.Issue.all();
        console.log('Database connection successful!');
        console.log('Projects:', projects);
        console.log('Issues:', issues);
    }
    catch (error) {
        console.error('Database test failed:', error);
    }
    finally {
        await db_js_1.db.close();
    }
}
main();
