// eslint-disable-next-line import/prefer-default-export
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
