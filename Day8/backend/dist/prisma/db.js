"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const polyfill_1 = require("@js-temporal/polyfill");
const runtime_1 = __importDefault(require("@prisma/orm-postgres/runtime"));
const contract_json_1 = __importDefault(require("./contract.json"));
const globalWithTemporal = globalThis;
if (typeof globalWithTemporal.Temporal === 'undefined') {
    Object.assign(globalThis, { Temporal: polyfill_1.Temporal });
}
exports.db = (0, runtime_1.default)({
    contractJson: contract_json_1.default,
    url: process.env.DATABASE_URL,
});
