import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8082/?auth=test';

// @ts-ignore
export default io(URL);
