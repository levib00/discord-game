import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Countdown from '../components/countdown';

describe('countdown', () => {
  test('countdown renders', async () => {
    render(
      <MemoryRouter>
        <Countdown setIsTimerDone={jest.fn()} />
      </MemoryRouter>,
    );

    const timerText = screen.getByText('5');
    expect(timerText).toBeInTheDocument();
    const countdownContainer = screen.getByTestId('countdown');
    expect(countdownContainer).toBeInTheDocument();
  });
});
