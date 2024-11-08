"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_controller_1 = require("../controllers/game-controller");
const router = express_1.default.Router();
router.get('/targets', game_controller_1.getTargets);
router.get('/link', game_controller_1.getChallengeLink);
router.head('/check-lobby/:lobbyId', game_controller_1.checkIfLobbyExists);
exports.default = router;
//# sourceMappingURL=game.js.map