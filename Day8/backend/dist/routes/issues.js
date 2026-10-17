"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../prisma/db");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const issues = await db_1.db.orm.public.Issue.all();
        res.status(200).json({
            success: true,
            data: issues
        });
    }
    catch (error) {
        console.error('Failed to fetch issues:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch issues'
        });
    }
});
exports.default = router;
