import { client } from './client';

export const createNewPlayer = async(firstName: string, lastName: string, emailAddress: string, password: string) =>{
  const { rows: [ player ] } = await client.query(`
    INSERT INTO players(first_name, last_name, email_address, password)
    VALUES($1, $2, $3, $4)
    RETURNING *;
  `, [firstName, lastName, emailAddress, password]);
  delete player.password;
  console.log(player);
  return player;
}

