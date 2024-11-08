"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* *
*@jest-environment node
*/
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const game_1 = __importDefault(require("../../routes/game"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/game', game_1.default);
describe('Game controllers', () => {
    test('Get targets', (done) => {
        (0, supertest_1.default)(app)
            .get('/api/game/targets')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    test('Get link to namespace', (done) => {
        (0, supertest_1.default)(app)
            .get('/api/game/link')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    test('Check lobby exists', (done) => {
        (0, supertest_1.default)(app)
            .head('/api/game/check-lobby/test')
            .expect(404, done);
    });
});
//# sourceMappingURL=game-controller.test.js.map