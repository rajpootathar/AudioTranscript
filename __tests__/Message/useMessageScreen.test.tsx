import {renderHook, act} from '@testing-library/react-hooks';
import useMessageScreen from '../../src/screens/Message/useMessageScreen';

// Mock the messagesData for testing purposes
jest.mock('../../src/dataSets/MessagesData.json', () => ({
  pause: 250,
  speakers: [
    {
      name: 'John',
      phrases: [
        {words: 'this is one phrase.', time: 1474},
        {words: 'now the second phrase.', time: 1667},
        {words: 'end with last phrase.', time: 1214},
      ],
    },
    {
      name: 'Jack',
      phrases: [
        {words: 'another speaker here.', time: 1570},
        {words: 'saying her second phrase.', time: 1989},
        {words: 'and eventually finishing up.', time: 1486},
      ],
    },
  ],
}));

describe('useMessageScreen', () => {
  it('should correctly sort and set messages', async () => {
    const setSortedMessages = jest.fn();

    const {result} = renderHook(() => useMessageScreen());

    // Execute the function
    await act(async () => {
      await result.current.getSortMessages(setSortedMessages);
    });

    // Check if setSortedMessages was called
    expect(setSortedMessages).toHaveBeenCalled();

    // Check the messages format
    const sortedMessages = setSortedMessages.mock.calls[0][0];
    expect(sortedMessages).toHaveLength(6);
    expect(sortedMessages[0]).toEqual({
      words: 'this is one phrase.',
      startTime: 0,
      endTime: 1474,
      name: 'John',
    });
    expect(sortedMessages[1]).toEqual({
      words: 'another speaker here.',
      startTime: 1724,
      endTime: 3294,
      name: 'Jack',
    });
    // You can add more checks here based on the order of messages.
  });
});
