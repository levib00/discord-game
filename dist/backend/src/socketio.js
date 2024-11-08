"use strict";
const uuid = require('uuid').v4;
const io = require('socket.io')();
const socketio = {
    io,
};
const roomVariables = {};
const deleteLobby = (lobbyId) => {
    if (!socketio.io.sockets.adapter.rooms.get(lobbyId) && roomVariables[lobbyId]) {
        delete roomVariables[lobbyId];
    }
};
io.on('connect', (socket) => {
    var _a;
    const { lobbyId } = socket.handshake.query;
    if (lobbyId === 'sp') {
        socket.join(uuid());
    }
    else {
        socket.join(lobbyId);
    }
    if (!((_a = roomVariables[lobbyId]) === null || _a === void 0 ? void 0 : _a.player1Id)) {
        roomVariables[lobbyId] = {};
        roomVariables[lobbyId].player1Score = 0;
        roomVariables[lobbyId].player2Score = 0;
    }
    socket.on('disconnect', () => {
        deleteLobby(lobbyId);
    });
    // TODO: deny connection if both playerIds are truthy
    console.log('someone connected to namespace', socket.id);
    socket.on('ready', (data) => {
        var _a, _b, _c, _d, _e;
        console.log(roomVariables[lobbyId]);
        if (!((_a = roomVariables[lobbyId]) === null || _a === void 0 ? void 0 : _a.player1Id)) {
            roomVariables[lobbyId].player1Id = data;
            roomVariables[lobbyId].player1IsReady = true;
        }
        else if (!((_b = roomVariables[lobbyId]) === null || _b === void 0 ? void 0 : _b.player2Id) && data !== roomVariables[lobbyId].player1Id) {
            roomVariables[lobbyId].player2Id = data;
            roomVariables[lobbyId].player2IsReady = true;
        }
        if ((((_c = roomVariables[lobbyId]) === null || _c === void 0 ? void 0 : _c.player1IsReady) && ((_d = roomVariables[lobbyId]) === null || _d === void 0 ? void 0 : _d.player2IsReady)) || (((_e = roomVariables[lobbyId]) === null || _e === void 0 ? void 0 : _e.player1IsReady) && lobbyId === 'sp')) {
            socketio.io.to(lobbyId).emit('bothReady');
        }
    });
    socket.on('score', (data) => {
        if (data.playerId === roomVariables[lobbyId].player1Id) {
            if (Number.isInteger(roomVariables[lobbyId].player1Score)) {
                roomVariables[lobbyId].player1Score += data.newScore;
            }
            else {
                roomVariables[lobbyId].player1Score = 0;
            }
        }
        else if (data.playerId === roomVariables[lobbyId].player2Id) {
            if (Number.isInteger(roomVariables[lobbyId].player2Score)) {
                roomVariables[lobbyId].player2Score += data.newScore;
            }
            else {
                roomVariables[lobbyId].player2Score = 0;
            }
        }
        socketio.io.to(lobbyId).emit('score', {
            scores: {
                player1Score: roomVariables[lobbyId].player1Score,
                player2Score: roomVariables[lobbyId].player2Score,
            },
            ids: {
                player1Id: roomVariables[lobbyId].player1Id,
                player2Score: roomVariables[lobbyId].player2Id,
            },
        });
    });
    socket.on('endGame', () => {
        socketio.io.to(lobbyId).emit('endScores', {
            scores: {
                player1Score: roomVariables[lobbyId].player1Score,
                player2Score: roomVariables[lobbyId].player2Score,
            },
        });
    });
    socket.on('playAgain', (data) => {
        if (data === roomVariables[lobbyId].player1Id) {
            roomVariables[lobbyId].player1PlayAgain = true;
        }
        else if (data === roomVariables[lobbyId].player2Id) {
            roomVariables[lobbyId].player2PlayAgain = true;
        }
        if ((roomVariables[lobbyId].player1PlayAgain && roomVariables[lobbyId].player2PlayAgain) || (roomVariables[lobbyId].player1PlayAgain && lobbyId === 'sp')) {
            roomVariables[lobbyId].player1Score = 0;
            roomVariables[lobbyId].player2Score = 0;
            roomVariables[lobbyId].player1PlayAgain = false;
            roomVariables[lobbyId].player2PlayAgain = false;
            socketio.io.to(lobbyId).emit('playAgain');
        }
    });
});
const addLobbyToList = (lobbyId) => {
    roomVariables[lobbyId] = {};
};
module.exports = { socketio, addLobbyToList, roomVariables };
//# sourceMappingURL=socketio.js.map