/* eslint-disable no-undef */
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(),
}));

global.setImmediate = jest.useRealTimers;
