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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = __importDefault(require("mariadb"));
const config_1 = require("./config");
const dbConfig = (0, config_1.DBconnection)();
const pool = mariadb_1.default.createPool(dbConfig);
function getUserInfo(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connectionDB = yield pool.getConnection();
            const query = `select * from userinfo where username = '${data.username}'`;
            const rows = yield connectionDB.execute(query);
            connectionDB.release();
            console.log(rows);
            return rows;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = getUserInfo;
