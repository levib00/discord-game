import { checkLobbyExists, getTargets } from '../../helpers/fetchers';
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.reject(),
}));

test('Errors on getTargets are caught', () => {
  expect(() => getTargets('localhost:3000')).rejects.toThrow(Error);
});

test('Errors on checkLobbyExists are caught', () => {
  expect(() => checkLobbyExists('localhost:3000')).rejects.toThrow(Error);
});
