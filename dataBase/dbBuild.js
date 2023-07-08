"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const client = require('./client.js');
const dropTables = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('DROPPING TABLES');
    yield client.query(`
    DROP TABLE IF EXISTS characters;
    DROP TABLE IF EXISTS players;
  `);
    console.log('FINISHED DROPPING TABKES');
});
const buildTables = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('BUILDING TABLES');
    yield client.query(`
    CREATE TABLE players(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                       first_name VARCHAR(15) NOT NULL,
                       last_name VARCHAR(15) NOT NULL,
                       email_address VARCHAR(15) NOT NULL,
                       password VARCHAR(100) NOT NULL);
            
    CREATE TABLE characters(id SERIAL PRIMARY KEY NOT NULL UNIQUE)

  `);
    console.log('FINISHED BUILDING TABLES');
});
const syncAndSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('CONNECTING TO DATABASE');
    client.connect();
    console.log('CONNECTED TO DATABASE');
    yield dropTables();
    yield buildTables();
    console.log('DISCONNECTING FROM DATABASE');
    client.end();
    console.log('DISCONNECTED FROM DATABASE');
});
syncAndSeed();
