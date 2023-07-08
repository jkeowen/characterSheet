import { client } from './client';
import { createSpeciesList } from './fetchAPIData';

export const insertSpecies = async() => {
  const speciesList = await createSpeciesList();
  for(let i = 0; i < speciesList.length; i++){
    const { rows: [ species ] } = await client.query(`
    INSERT INTO species(name, size)
    VALUES('${speciesList[i].name}', '${speciesList[i].size}')
    RETURNING *;
  `);
  };
};

export const getAllSpecies = async() =>{
  const { rows: species } = await client.query(`
    SELECT * FROM species;
  `)
  console.log(species);
  return species;
};

export const getSpeciesById = async(speciesId: number) =>{
  const { rows: [ species ] } = await client.query(`
    SELECT * FROM species
    WHERE id =  $1;
  `, [speciesId]);
  return species
};

export const getSpeciesByName = async(speciesName: string) =>{
  const { rows: [ species ] } = await client.query(`
    SELECT * FROM species
    WHERE name =  $1;
  `, [speciesName]);
  console.log(species);
  return species
};

