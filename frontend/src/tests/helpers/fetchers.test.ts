import { getTargets } from '../../helpers/fetchers';
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.reject(),
}));

test('About renders with correct text', () => {
  expect(() => getTargets('localhost:3000')).rejects.toThrow(Error);
});
