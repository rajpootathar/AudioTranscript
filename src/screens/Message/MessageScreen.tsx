import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlayerControls from '../../components/PlayerControls';
import useMessageScreen from './useMessageScreen';

const MessageScreen = () => {
  const {sortedMessages, setCurrentIndex, currentIndex} = useMessageScreen();

  // @ts-ignore
  const renderItem = ({item, index}) => {
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
