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
exports.checkIfLobbyExists = exports.getChallengeLink = exports.getTargets = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const uuid_1 = require("uuid");
const socket = require('../src/socketio');
const { addLobbyToList, roomVariables } = socket;
exports.getTargets = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const generateTargets = () => {
        const coordsArray = [];
        const generateX = () => Math.floor(Math.random() * 1000);
        const generateY = () => Math.floor(Math.random() * 700);
        for (let i = 0; i < 600; i += 1) {
            const coords = {
                xCoords: generateX(),
                yCoords: generateY(),
            };
            coordsArray.push(coords);
        }
        return coordsArray;
    };
    res.json(generateTargets());
}));
exports.getChallengeLink = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomLink = (0, uuid_1.v4)();
    addLobbyToList(roomLink);
    res.json(`${roomLink}`);
}));
exports.checkIfLobbyExists = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (roomVariables[req.params.lobbyId]) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
}));
//# sourceMappingURL=game-controller.js.map