import { io } from 'socket.io-client';

const URL = 'http://localhost:8082';

export default io(URL);
