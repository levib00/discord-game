/* *
*@jest-environment node
*/
import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import game from '../../routes/game';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/api/game', game);

describe('Game controllers', () => {
  test('Get targets', (done) => {
    request(app)
      .get('/api/game/targets')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  test('Get link to namespace', (done) => {
    request(app)
      .get('/api/game/link')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  test('Check lobby exists', (done) => {
    request(app)
      .head('/api/game/check-lobby/test')
      .expect(404, done);
  });
});
