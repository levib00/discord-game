export const getTargets = async (url: string) => {
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

export const checkLobbyExists = async (url: string) => {
  try {
    const data = await fetch(url, {
      method: 'HEAD',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (error: any) {
    throw new Error(error);
  }
};
