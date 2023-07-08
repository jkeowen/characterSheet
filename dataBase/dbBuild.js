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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const players_1 = require("./players");
const classes_1 = require("./classes");
const species_1 = require("./species");
const dropTables = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('DROPPING TABLES');
    yield client_1.client.query(`
    DROP TABLE IF EXISTS character_equip_prof;
    DROP TABLE IF EXISTS equipment_proficiencies;
    DROP TABLE IF EXISTS ability_scores;
    DROP TABLE IF EXISTS character_skill_prof; 
    DROP TABLE IF EXISTS characters;
    DROP TABLE IF EXISTS species;
    DROP TABLE IF EXISTS classes;
    DROP TABLE IF EXISTS players;
    DROP TABLE IF EXISTS skills;
  `);
    console.log('FINISHED DROPPING TABKES');
});
const buildTables = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('BUILDING TABLES');
    yield client_1.client.query(`
    CREATE TABLE players(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                       first_name VARCHAR(15) NOT NULL,
                       last_name VARCHAR(15) NOT NULL,
                       email_address VARCHAR(30) NOT NULL UNIQUE,
                       password VARCHAR(110) NOT NULL);
    
    CREATE TABLE classes(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                         name VARCHAR(15) NOT NULL UNIQUE,
                         hit_die INTEGER NOT NULL);      
    
    CREATE TABLE species(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                         name VARCHAR(15) NOT NULL UNIQUE,
                         size VARCHAR(15) NOT NULL); 
                
    CREATE TABLE characters(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                            player_id INTEGER REFERENCES players(id) NOT NULL,
                            level INTEGER NOT NULL,
                            hit_points INTEGER NOT NULL,
                            first_name VARCHAR(25) NOT NULL,
                            last_name VARCHAR(25),
                            class_id INTEGER REFERENCES classes(id),
                            species_id INTEGER REFERENCES species(id));

    CREATE TABLE ability_scores(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                           character_id INTEGER NOT NULL REFERENCES characters(id),
                           strength INTEGER NOT NULL,
                           dexterity INTEGER NOT NULL,
                           constituation INTEGER NOT NULL,
                           intelligence INTEGER NOT NULL,
                           wisdom INTEGER NOT NULL,
                           charisma INTEGER NOT NULL);

    CREATE TABLE skills(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                        name VARCHAR(15) NOT NULL UNIQUE,
                        ability VARCHAR(10));

    CREATE TABLE equipment_proficiencies(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                                         name VARCHAR(20) NOT NULL UNIQUE,
                                         description VARCHAR(50) NOT NULL);

    CREATE TABLE character_skill_prof(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                               character_id INTEGER REFERENCES characters(id) NOT NULL,
                               skill_id INTEGER REFERENCES skills(id) NOT NULL);

    CREATE TABLE character_equip_prof(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                                character_id INTEGER REFERENCES characters(id) NOT NULL,
                                equip_id INTEGER REFERENCES equipment_proficiencies(id) NOT NULL);
    
    
    
                               
  `);
    console.log('FINISHED BUILDING TABLES');
});
const createNewPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("CREATING NEW PLAYERS");
    yield (0, players_1.createNewPlayer)("Justin", "Keowen", "justin@email.com", "password1234");
    console.log("FINISHED CREATING PLAYERS");
});
const createClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("CREATING CLASS");
    yield (0, classes_1.insertClasses)();
    console.log("FINISHED CREATING CLASS");
});
const createSpecies = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('CREATING SPECIES');
    yield (0, species_1.insertSpecies)();
    console.log("FINISHED CREATING SPECIES");
});
const syncAndSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('CONNECTING TO DATABASE');
    client_1.client.connect();
    console.log('CONNECTED TO DATABASE');
    yield dropTables();
    yield buildTables();
    yield createNewPlayers();
    yield createClasses();
    yield createSpecies();
    console.log('DISCONNECTING FROM DATABASE');
    client_1.client.end();
    console.log('DISCONNECTED FROM DATABASE');
});
syncAndSeed();
