import { client } from "./client";
import { getPlayerNameById } from "./players";
import { getClassById } from "./classes";
import { getSpeciesById } from "./species";

export const createNewCharacter = async(playerId: number, level: number, 
                                 firstName: string, lastName: string, 
                                 classId: number, speciesId: number) =>{
  const _class = await getClassById(classId);
  const { rows: [ character ] } = await client.query(`
    INSERT INTO characters(player_id, level, first_name, last_name, class_id, species_id, hit_points)
    VALUES($1, $2, $3, $4, $5, $6, '${_class.hit_die}' )
    RETURNING *;
  `,[playerId, level, firstName, lastName, classId, speciesId]);
  return character;
                                };

export const getCharacterById = async(characterId: number) =>{

  const { rows: [ character ] } = await client.query(`
    SELECT * FROM characters 
    WHERE id = $1;
  `, [characterId]);
  return character;
};

export const putTogetherCharacter = async(characterId: number) =>{

  const character = await getCharacterById(characterId);
  const _playerName = await getPlayerNameById(character.player_id)
  const _species = await getSpeciesById(character.species_id);
  const _class = await getClassById(character.class_id);
  delete character.player_id
  delete character.species_id;
  delete character.class_id
  character.player = _playerName
  character.species = _species.name;
  character.class = _class.name;
  character.size = _species.size
  character.hit_die = _class.hit_die;
  console.log(character);
  return character;

}