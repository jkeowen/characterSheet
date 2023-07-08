import { client } from './client';
const bcrypt = require('bcrypt');
export const createNewPlayer = async(firstName: string, lastName: string, emailAddress: string, password: string) =>{

  const encryptedPassword: string = await bcrypt.hash(password, 2);
  const { rows: [ player ] } = await client.query(`
    INSERT INTO players(first_name, last_name, email_address, password)
    VALUES($1, $2, $3, '${encryptedPassword}')
    RETURNING *;
  `, [firstName, lastName, emailAddress]);
  delete player.password;
  console.log(player);
  return player;
}

