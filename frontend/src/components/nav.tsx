import { useNavigate } from 'react-router-dom';

interface INavProps {
  lobbyNsp: any
}

const Nav = (props: INavProps) => {
  const { lobbyNsp } = props;
  const navigate = useNavigate();

  const createChallengeLink = async (url: string) => {
    try {
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      return await data.json();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const joinSocket = async () => {
    const uuid = await createChallengeLink('http://localhost:8082/api/game/link');
    if (lobbyNsp?.connected) {
      lobbyNsp.emit('leaveRoom');
    }
    navigate(`/challenge/${await uuid}`);
    navigate(0);
  };

  return (
    <>
      <a className='challenge-link' onClick={() => joinSocket()}>Challenge A Friend!</a>
      <h1 className='hero'>Aim Of The Game</h1>
      <div></div>
    </>
  );
};

export default Nav;
