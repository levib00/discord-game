import { sendReady } from '../../helpers/socket-callbacks';

test('send Ready runs emit', () => {
  const emitMock = () => 'test';

  const ioMock = () => ({ emit: emitMock });

  expect(sendReady(jest.fn(), ioMock())).toBe('test');
});
