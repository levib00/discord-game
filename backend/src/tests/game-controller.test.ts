/* *
*@jest-environment node
*/
import request from 'supertest';
import express from 'express';
import 'dotenv/config';
import messages from '../../routes/game';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/api/game', messages);

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
});
