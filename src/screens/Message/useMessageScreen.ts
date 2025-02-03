import {useCallback, useEffect, useState} from 'react';
import messagesData from '../../dataSets/MessagesData.json';
import {Message} from '../../types';

const useMessageScreen = () => {
  const [sortedMessages, setSortedMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getSortMessages = useCallback(() => {
    const numberOfSpeakers = messagesData.speakers.length;
    const speakerPhrasesLength = messagesData.speakers[0].phrases.length;
    let time = 0;
    let result: Message[] = [];
    // Collect all phrases with their speaker and time

    for (let i = 0; i < speakerPhrasesLength; i++) {
      for (let j = 0; j < numberOfSpeakers; j++) {
        const endTime = time + messagesData.speakers[j].phrases[i].time;
        const obj = {
          words: messagesData.speakers[j].phrases[i].words,
          startTime: time,
          endTime: endTime,
          name: messagesData.speakers[j].name,
        };

        time = endTime + messagesData.pause;

        result.push(obj);
      }
    }
    setSortedMessages(result);
  }, []);

  useEffect(() => {
    if (sortedMessages.length === 0) {
      getSortMessages();
    }
  }, [getSortMessages, sortedMessages]);

  return {sortedMessages, currentIndex, setCurrentIndex, getSortMessages};
};

export default useMessageScreen;
