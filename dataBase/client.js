"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const { Client } = require('pg');
exports.client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/character_sheet');
