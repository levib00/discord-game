import { sendReady, updateScores } from '../../helpers/socket-callbacks';

describe('Socket.io callbacks', () => {
  test('send Ready runs emit', () => {
    const emitMock = () => 'test';

    const ioMock = () => ({ emit: emitMock });

    expect(sendReady(jest.fn(), ioMock())).toBe('test');
  });

  describe('Update player scores', () => {
    const dataMock = {
      scores: {
        player1Score: 1,
        player2Score: 2,
      },
      ids: {
        player1Id: 'player1',
        player2Id: 'player2',
      },
    };

    let setPlayer1ScoreMock: jest.Mock;
    let setPlayer2ScoreMock: jest.Mock;

    beforeEach(() => {
      setPlayer1ScoreMock = jest.fn();
      setPlayer2ScoreMock = jest.fn();
    });

    test('player2 score updates when score received is from player 2', () => {
      updateScores(dataMock, setPlayer1ScoreMock, setPlayer2ScoreMock);
      expect(setPlayer2ScoreMock).toHaveBeenCalledWith(2);
    });

    test('player1 score updates when score received is from player 1', () => {
      updateScores(dataMock, setPlayer1ScoreMock, setPlayer2ScoreMock);
      expect(setPlayer1ScoreMock).toHaveBeenCalledWith(1);
    });
  });
});
