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
exports.getTargets = exports.test = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.test = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield req.app.locals.sql('select version()');
    console.log(result);
    res.json('Hello world!');
}));
exports.getTargets = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const generateTargets = () => {
        const coordsArray = [];
        const generateX = () => Math.floor(Math.random() * 1000);
        const generateY = () => Math.floor(Math.random() * 850);
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
//# sourceMappingURL=game.js.map