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
exports.getSpeciesByName = exports.getSpeciesById = exports.getAllSpecies = exports.insertSpecies = void 0;
const client_1 = require("./client");
const fetchAPIData_1 = require("./fetchAPIData");
const insertSpecies = () => __awaiter(void 0, void 0, void 0, function* () {
    const speciesList = yield (0, fetchAPIData_1.createSpeciesList)();
    for (let i = 0; i < speciesList.length; i++) {
        const { rows: [species] } = yield client_1.client.query(`
    INSERT INTO species(name, size)
    VALUES('${speciesList[i].name}', '${speciesList[i].size}')
    RETURNING *;
  `);
    }
    ;
});
exports.insertSpecies = insertSpecies;
const getAllSpecies = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: species } = yield client_1.client.query(`
    SELECT * FROM species;
  `);
    console.log(species);
    return species;
});
exports.getAllSpecies = getAllSpecies;
const getSpeciesById = (speciesId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [species] } = yield client_1.client.query(`
    SELECT * FROM species
    WHERE id =  $1;
  `, [speciesId]);
    return species;
});
exports.getSpeciesById = getSpeciesById;
const getSpeciesByName = (speciesName) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [species] } = yield client_1.client.query(`
    SELECT * FROM species
    WHERE name =  $1;
  `, [speciesName]);
    console.log(species);
    return species;
});
exports.getSpeciesByName = getSpeciesByName;
