import React, {useEffect} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useTranscriptPlayer from '../hooks/usePlayer.ts';
import messagesData from '../dataSets/MessagesData.json';
import WebProgressBar from './WebProgressBar.jsx';
import ProgressBar from './ProgressBar.tsx';

// @ts-ignore
const PlayerControls = ({setCurrentIndex, sortedMessages}) => {
  const isWeb = Platform.OS === 'web';

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

  const timeFormat = (seconds: number | string) => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
    return `${hrs}${mins}${scnds}`;
  };

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
      {isWeb ? (
        <WebProgressBar currentTime={audioPosition} duration={audioDuration} />
      ) : (
        <ProgressBar position={audioPosition} duration={audioDuration} />
      )}
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>{timeFormat(audioPosition)}</Text>
        <Text style={styles.label}>{timeFormat(audioDuration)}</Text>
      </View>
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
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: 'grey',
  },
});

export default PlayerControls;
