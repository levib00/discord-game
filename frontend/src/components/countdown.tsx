import { useEffect, useState } from 'react';

interface ICountdownProps {
  setIsTimerDone: React.Dispatch<React.SetStateAction<boolean>>
}

const Countdown = (props: ICountdownProps) => {
  const { setIsTimerDone } = props;
  const [countdownSeconds, setCountdownSeconds] = useState(5);

  useEffect(() => {
    let counter = 5;
    const countdown = setInterval(() => {
      counter -= 1;
      setCountdownSeconds(counter);
      if (!counter) {
        clearInterval(countdown);
        setIsTimerDone(true);
      }
    }, 1000);
  }, []);

  return (
    <div data-testid='countdown'>
      <div>
        {countdownSeconds}
      </div>
    </div>
  );
};

export default Countdown;
