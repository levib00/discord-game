import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Target from '../components/target';

const targetCoords = {
  xCoords: 250,
  yCoords: 250,
};

describe('Target renders', () => {
  const targetClicked = jest.fn();

  test('Target renders', () => {
    render(
      <MemoryRouter>
        <Target
        target={targetCoords}
        setCurrentTargets={jest.fn()}
        index={0}
        currentTargets={[]}
        targetClicked={jest.fn()}/>
      </MemoryRouter>,
    );

    const targetId = screen.getByTestId('target');
    expect(targetId).toBeInTheDocument();
  });

  test('Clicking target fires function', async () => {
    render(
      <MemoryRouter>
        <Target
        target={targetCoords}
        setCurrentTargets={jest.fn()}
        index={0}
        currentTargets={[]}
        targetClicked={targetClicked}/>
      </MemoryRouter>,
    );

    const target = screen.getByTestId('target');
    await userEvent.click(target);
    expect(targetClicked).toHaveBeenCalledTimes(1);
  });
});
