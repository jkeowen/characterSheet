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
exports.createSpeciesList = exports.createClassList = void 0;
const axios = require('axios');
const API_URL = 'https://www.dnd5eapi.co';
const fetchAllCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`${API_URL}/api/${category}`);
    return response.data.results;
});
const createClassList = () => __awaiter(void 0, void 0, void 0, function* () {
    const classes = yield fetchAllCategory('classes');
    const classList = [];
    for (let i = 0; i < classes.length; i++) {
        const response = yield axios.get(`${API_URL}${classes[i].url}`);
        classList.push({ name: response.data.name,
            hit_die: response.data.hit_die });
    }
    return classList;
});
exports.createClassList = createClassList;
const createSpeciesList = () => __awaiter(void 0, void 0, void 0, function* () {
    const species = yield fetchAllCategory('races');
    const speciesList = [];
    for (let i = 0; i < species.length; i++) {
        const response = yield axios.get(`${API_URL}${species[i].url}`);
        speciesList.push({ name: response.data.name,
            size: response.data.size });
    }
    return speciesList;
});
exports.createSpeciesList = createSpeciesList;
