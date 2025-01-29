import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import messagesData from '../dataSets/MessagesData.json';
import PlayerControls from '../components/PlayerControls';

export interface Message {
  name: string;
  startTime: number;
  endTime: number;
  words: string;
}

const MessageScreen = () => {
  const [sortedMessages, setSortedMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  //sort messages for list and player
  const getSortMessages = async () => {
    const numberOfSpeakers = messagesData.speakers.length;
    const speakerPhrasesLength = messagesData.speakers[0].phrases.length;
    let time = 0;
    let result: Message[] = [];
    // Collect all phrases with their speaker and time

    //count number of phrases for each speaker

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
    console.log(result);
    // @ts-ignore
    setSortedMessages(result);
  };

  useEffect(() => {
    if (sortedMessages.length === 0) {
      getSortMessages();
    }
  }, [sortedMessages]);

  // @ts-ignore
  const renderItem = ({item, index}) => {
    console.log('currentTime', currentIndex);
    const isHighlighted = currentIndex === index;
    return (
      <View style={item.name === 'John' ? styles.john : styles.jack}>
        <Text
          style={[
            styles.speakerName,
            isHighlighted && styles.highlightSpeakerName,
          ]}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.speakerMessage,
            isHighlighted && styles.highlightSpeakerMessage,
          ]}>
          {item.words}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentStyle}
        data={sortedMessages}
        renderItem={renderItem}
      />
      <PlayerControls
        setCurrentIndex={setCurrentIndex}
        sortedMessages={sortedMessages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: 'white',
  },
  contentStyle: {
    paddingHorizontal: '5%',
  },
  john: {
    alignItems: 'flex-start',
    marginTop: '5%',
  },
  jack: {
    alignItems: 'flex-end',
    marginTop: '5%',
  },
  highlightSpeakerName: {
    color: 'orange',
    fontWeight: '900',
    fontSize: 18,
  },
  highlightSpeakerMessage: {
    borderColor: 'orange',
    fontSize: 19,
    color: 'orange',
    fontWeight: '900',
  },
  speakerName: {
    fontSize: 16,
    fontWeight: '700',
  },
  speakerMessage: {
    fontSize: 18,
    fontWeight: '700',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: '2%',
    padding: '3%',
    marginTop: '2%',
  },
});
export default MessageScreen;
