import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {messagesData} from '../dataSets/MessagesData';
import PlayerControls from '../components/PlayerControls';

interface Messages {
  name: String;
  time: Number;
  words: String;
}

const MessageScreen = () => {
  const [sortedMessages, setSortedMessages] = useState([]);

  const getSortMessages = async () => {
    const totalMessages: Messages[] = [];
    messagesData.speakers.map(speaker => {
      speaker.phrases.map(message => {
        totalMessages.push({name: speaker.name, ...message});
      });
    });

    const result = totalMessages.sort((a, b) => a.time - b.time);
    setSortedMessages(result);
  };

  useEffect(() => {
    if (sortedMessages.length === 0) {
      getSortMessages();
    }
  }, [sortedMessages]);

  const renderItem = ({item}) => {
    return (
      <View style={item.name === 'John' ? styles.john : styles.jack}>
        <Text style={styles.speakerName}>{item.name}</Text>
        <Text style={styles.speakerMessage}>{item.words}</Text>
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
      <PlayerControls />
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
