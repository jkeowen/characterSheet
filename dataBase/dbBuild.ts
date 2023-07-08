
import { client } from "./client";
import { createNewPlayer } from "./players"
import { insertClass } from "./classes";


const dropTables = async() => {
  console.log('DROPPING TABLES');
  await client.query(`
    DROP TABLE IF EXISTS character_equip_prof;
    DROP TABLE IF EXISTS equipment_proficiencies;
    DROP TABLE IF EXISTS ability_scores;
    DROP TABLE IF EXISTS character_skill_prof; 
    DROP TABLE IF EXISTS characters;
    DROP TABLE IF EXISTS species;
    DROP TABLE IF EXISTS classes;
    DROP TABLE IF EXISTS players;
    DROP TABLE IF EXISTS skills;
  `)
  console.log('FINISHED DROPPING TABKES');
}

const buildTables = async() => {
  console.log('BUILDING TABLES');
  await client.query(`
    CREATE TABLE players(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                       first_name VARCHAR(15) NOT NULL,
                       last_name VARCHAR(15) NOT NULL,
                       email_address VARCHAR(30) NOT NULL UNIQUE,
                       password VARCHAR(110) NOT NULL);
    
    CREATE TABLE classes(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                         name VARCHAR(15) NOT NULL UNIQUE,
                         hit_die INTEGER NOT NULL);      
    
    CREATE TABLE species(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                         name VARCHAR(15) NOT NULL UNIQUE); 
                
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
}

const createNewPlayers = async() => {
  console.log("CREATING NEW PLAYERS");
  await createNewPlayer("Justin", "Keowen", "justin@email.com", "password1234");
  // await createNewPlayer("Emily", "DuBoulay", "em@email.com", "password1234");
  
  console.log("FINISHED CREATING PLAYERS");
}

const createClass = async() => {
  console.log("CREATING CLASS");
  await insertClass();
  console.log("FINISHED CREATING CLASS")
}

const syncAndSeed = async() => {

  console.log('CONNECTING TO DATABASE');
  client.connect();
  console.log('CONNECTED TO DATABASE');
  await dropTables();
  await buildTables();
  await createNewPlayers();
  await createClass();
  console.log('DISCONNECTING FROM DATABASE');
  client.end();
  console.log('DISCONNECTED FROM DATABASE');

}

syncAndSeed();