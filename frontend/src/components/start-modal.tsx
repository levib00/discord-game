const StartModal = () => {

  const sendReady = () => {

  }

  const readyButtonHandler = () => {
    sendReady()
    // TODO: show this user as ready on client side.
  }

  return (
    <div>
      <button onClick={readyButtonHandler}>Ready!</button>
    </div>
  );
}

export default StartModal;
