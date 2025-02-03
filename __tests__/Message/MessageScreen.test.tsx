import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import MessageScreen from '../../src/screens/Message/MessageScreen';

// Mock the `useMessageScreen` hook
jest.mock('../../src/screens/Message/useMessageScreen.ts', () => () => ({
  getSortMessages: jest.fn().mockImplementation(setSortedMessages => {
    setSortedMessages([
      {words: 'this is one phrase.', startTime: 0, endTime: 1474, name: 'John'},
      {
        words: 'another speaker here.',
        startTime: 1724,
        endTime: 3294,
        name: 'Jack',
      },
      {
        words: 'now the second phrase.',
        startTime: 3544,
        endTime: 5211,
        name: 'John',
      },
      {
        words: 'saying her second phrase.',
        startTime: 5461,
        endTime: 7450,
        name: 'Jack',
      },
      {
        words: 'end with last phrase.',
        startTime: 7700,
        endTime: 8914,
        name: 'John',
      },
      {
        words: 'and eventually finishing up.',
        startTime: 9164,
        endTime: 10650,
        name: 'Jack',
      },
    ]);
  }),
}));

jest.mock('../../src/components/PlayerControls.tsx', () => jest.fn(() => null));

describe('MessageScreen', () => {
  it('should render the messages correctly', () => {
    render(<MessageScreen />);

    // Check if the messages are rendered
    expect(screen.getByText('this is one phrase.')).toBeTruthy();
    expect(screen.getByText('another speaker here.')).toBeTruthy();
    expect(screen.getByText('now the second phrase.')).toBeTruthy();
    expect(screen.getByText('saying her second phrase.')).toBeTruthy();
    expect(screen.getByText('end with last phrase.')).toBeTruthy();
    expect(screen.getByText('and eventually finishing up.')).toBeTruthy();
  });

  it('should highlight the current speaker based on index', () => {
    render(<MessageScreen />);

    // Simulate setting the current index to 1
    fireEvent.press(screen.getByText('another speaker here.'));

    // Check if the highlighted speaker is correct
    const highlightedText = screen.getByText('another speaker here.');
    expect(highlightedText.props.style).toContainEqual({
      borderRadius: 10,
      borderWidth: 2,
      color: 'black',
      fontSize: 18,
      fontWeight: '700',
      marginTop: '2%',
      padding: '3%',
      paddingLeft: '2%',
    });
  });
});
