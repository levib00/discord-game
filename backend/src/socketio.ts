const io = require('socket.io')();

const socketio = {
  io,
};

// TODO: fix any
io.on('connection', (socket: any) => {
  // TODO: on ready, connect play 5 second cooldown for players
  // TODO: on score received check player, keep score in array, add at end
  // TODO: before comparing scores/showing to player/adding to leaderboard depending on game mode
  // TODO: maybe make clients an object that i can index instead of foreaching

  socket.on('message', (data: number) => {
    console.log(socket.handshake);
    console.log(data);
  });
  console.log('connected', socket.id);
});

module.exports = socketio;
