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
exports.getClassByName = exports.getClassById = exports.getAllClasses = exports.insertClasses = void 0;
const client_1 = require("./client");
const fetchAPIData_1 = require("./fetchAPIData");
const insertClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    const classList = yield (0, fetchAPIData_1.createClassList)();
    for (let i = 0; i < classList.length; i++) {
        const { rows: [aClass] } = yield client_1.client.query(`
    INSERT INTO classes(name, hit_die)
    VALUES('${classList[i].name}', ${classList[i].hit_die})
    RETURNING *;
  `);
    }
    ;
});
exports.insertClasses = insertClasses;
const getAllClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: classes } = yield client_1.client.query(`
    SELECT * FROM classes;
  `);
    return classes;
});
exports.getAllClasses = getAllClasses;
const getClassById = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [thisClass] } = yield client_1.client.query(`
    SELECT * FROM classes 
    WHERE id = $1;
  `, [classId]);
    return thisClass;
});
exports.getClassById = getClassById;
const getClassByName = (className) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows: [thisClass] } = yield client_1.client.query(`
    SELECT * FROM classes 
    WHERE name = $1;
  `, [className]);
    console.log(thisClass);
    return thisClass;
});
exports.getClassByName = getClassByName;
