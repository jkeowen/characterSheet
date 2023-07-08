
const client = require('./client.js');

const dropTables = async() => {
  console.log('DROPPING TABLES');
  await client.query(`
    DROP TABLE IF EXISTS characters;
    DROP TABLE IF EXISTS players;
  `)
  console.log('FINISHED DROPPING TABKES');
}

const buildTables = async() => {
  console.log('BUILDING TABLES');
  await client.query(`
    CREATE TABLE players(id SERIAL PRIMARY KEY NOT NULL UNIQUE,
                       first_name VARCHAR(15) NOT NULL,
                       last_name VARCHAR(15) NOT NULL,
                       email_address VARCHAR(15) NOT NULL,
                       password VARCHAR(100) NOT NULL);
            
    CREATE TABLE characters(id SERIAL PRIMARY KEY NOT NULL UNIQUE)

  `);
  console.log('FINISHED BUILDING TABLES');
}


const syncAndSeed = async() => {

  console.log('CONNECTING TO DATABASE');
  client.connect();
  console.log('CONNECTED TO DATABASE');
  await dropTables();
  await buildTables();
  console.log('DISCONNECTING FROM DATABASE');
  client.end();
  console.log('DISCONNECTED FROM DATABASE');

}

syncAndSeed();