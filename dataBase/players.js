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
exports.createNewPlayer = void 0;
const client_1 = require("./client");
const bcrypt = require('bcrypt');
const createNewPlayer = (firstName, lastName, emailAddress, password) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedPassword = yield bcrypt.hash(password, 2);
    const { rows: [player] } = yield client_1.client.query(`
    INSERT INTO players(first_name, last_name, email_address, password)
    VALUES($1, $2, $3, '${encryptedPassword}')
    RETURNING *;
  `, [firstName, lastName, emailAddress]);
    delete player.password;
    console.log(player);
    return player;
});
exports.createNewPlayer = createNewPlayer;
