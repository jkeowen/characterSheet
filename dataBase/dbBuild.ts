
import { client } from "./client";
import { createNewPlayer } from "./players"


const dropTables = async() => {
  console.log('DROPPING TABLES');
  await client.query(`
    DROP TABLE IF EXISTS ability_scores;
    DROP TABLE IF EXISTS proficiencies; 
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
                         name VARCHAR(15) NOT NULL UNIQUE);      
    
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

    CREATE TABLE proficiencies(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                               character_id INTEGER NOT NULL,
                               skill_id INTEGER NOT NULL);
                    
  `);
  console.log('FINISHED BUILDING TABLES');
}

const createNewPlayers = async() => {
  console.log("CREATING NEW PLAYERS");
  await createNewPlayer("Justin", "Keowen", "justin@email.com", "password1234");
  // await createNewPlayer("Emily", "DuBoulay", "em@email.com", "password1234");
  
  console.log("FINISHED CREATING PLAYERS");
}


const syncAndSeed = async() => {

  console.log('CONNECTING TO DATABASE');
  client.connect();
  console.log('CONNECTED TO DATABASE');
  await dropTables();
  await buildTables();
  await createNewPlayers();
  console.log('DISCONNECTING FROM DATABASE');
  client.end();
  console.log('DISCONNECTED FROM DATABASE');

}

syncAndSeed();