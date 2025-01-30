import React, {useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import useTranscriptPlayer from '../hooks/usePlayer.tsx';
import messagesData from '../dataSets/MessagesData.json';
import ProgressBar from './ProgressBar.tsx';

// @ts-ignore
const PlayerControls = ({setCurrentIndex, sortedMessages}) => {
  const {
    addTrack,
    play,
    pause,
    isPlaying,
    audioDuration,
    audioPosition,
    backward,
    forward,
  } = useTranscriptPlayer(sortedMessages);

  useEffect(() => {
    addTrack(require('../Assets/Audios/MessagesAudio.mp3'), 'transcript');
  }, [addTrack]);
  useEffect(() => {
    //now I want to calculate the index from sortedMessages array depending on the audioPosition
    const index = sortedMessages.findIndex(
      (message: {endTime: number}) =>
        audioPosition * 1000 <= message.endTime - messagesData.pause,
    );
    setCurrentIndex(index);
  }, [audioPosition, audioDuration, sortedMessages, setCurrentIndex]);

  return (
    <View>
      <ProgressBar position={audioPosition} duration={audioDuration} />
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} onPress={backward}>
          <Image
            source={require('../Assets/Images/backward.png')}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={isPlaying ? pause : play}
          style={styles.playAndPauseButton}>
          <Image
            source={
              isPlaying
                ? require('../Assets/Images/pause.png')
                : require('../Assets/Images/play.png')
            }
            style={styles.playAndPauseIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={forward}>
          <Image
            source={require('../Assets/Images/fast-forward.png')}
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '10%',
  },
  icons: {
    width: 30,
    height: 30,
  },
  playAndPauseIcon: {
    width: 40,
    height: 40,
  },
  playAndPauseButton: {
    marginHorizontal: '10%',
  },
});

export default PlayerControls;
