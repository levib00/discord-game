import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8082';

// @ts-ignore
export default io(URL, {
  autoConnect: false,
});
