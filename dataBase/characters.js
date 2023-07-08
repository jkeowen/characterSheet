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
exports.putTogetherCharacter = exports.getCharacterById = exports.createNewCharacter = void 0;
const client_1 = require("./client");
const players_1 = require("./players");
const classes_1 = require("./classes");
const species_1 = require("./species");
const createNewCharacter = (playerId, level, firstName, lastName, classId, speciesId) => __awaiter(void 0, void 0, void 0, function* () {
    const _class = yield (0, classes_1.getClassById)(classId);
    const { rows: [character] } = yield client_1.client.query(`
    INSERT INTO characters(player_id, level, first_name, last_name, class_id, species_id, hit_points)
    VALUES($1, $2, $3, $4, $5, $6, '${_class.hit_die}' )
    RETURNING *;
  `, [playerId, level, firstName, lastName, classId, speciesId]);
    return character;
});
exports.createNewCharacter = createNewCharacter;
const getCharacterById = (characterId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [character] } = yield client_1.client.query(`
    SELECT * FROM characters 
    WHERE id = $1;
  `, [characterId]);
    return character;
});
exports.getCharacterById = getCharacterById;
const putTogetherCharacter = (characterId) => __awaiter(void 0, void 0, void 0, function* () {
    const character = yield (0, exports.getCharacterById)(characterId);
    const _playerName = yield (0, players_1.getPlayerNameById)(character.player_id);
    const _species = yield (0, species_1.getSpeciesById)(character.species_id);
    const _class = yield (0, classes_1.getClassById)(character.class_id);
    delete character.player_id;
    delete character.species_id;
    delete character.class_id;
    character.player = _playerName;
    character.species = _species.name;
    character.class = _class.name;
    character.size = _species.size;
    character.hit_die = _class.hit_die;
    console.log(character);
    return character;
});
exports.putTogetherCharacter = putTogetherCharacter;
