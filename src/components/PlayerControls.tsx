import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import SoundPlayer from 'react-native-sound-player';

const PlayerControls = ({setCurrentTime, currentTime, sortedMessages}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  // useEffect(() => {
  //   try {
  //     SoundPlayer.playAsset(require('../Assets/Audios/MessagesAudio.mp3'));
  //     setIsPlaying(true);
  //   } catch (e) {
  //     console.log('Cannot play the audio file', e);
  //   }

  //   const interval = setInterval(() => {
  //     if (isPlaying) {
  //       SoundPlayer.getInfo().then(info => {
  //         setCurrentTime(info.currentTime * 700);
  //         setDuration(info.duration);
  //       });
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [isPlaying]);

  const playAudio = () => {
    try {
      SoundPlayer.playAsset(require('../Assets/Audios/MessagesAudio.mp3')); // Replace with the actual audio URL
      setIsPlaying(true);

      // Highlight phrases in sync with playback
      let elapsedTime = 0;
      sortedMessages.map((phrase, index) => {
        setTimeout(() => {
          setCurrentTime(index);
        }, elapsedTime + 1500);
        elapsedTime += phrase.time;
      });
    } catch (error) {
      console.error('Cannot play the sound file', error);
    }
  };

  const pauseAudio = () => {
    SoundPlayer.pause();
    setIsPlaying(false);
  };

  return (
    <View>
      <Slider
        style={styles.slider}
        value={currentTime}
        onValueChange={value => {
          console.log(value);
        }}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#99BD01"
        maximumTrackTintColor="#DAE4ED"
        onSlidingComplete={value => {
          console.log(value);
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={require('../Assets/Images/backward.png')}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={isPlaying ? pauseAudio : playAudio}
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
        <TouchableOpacity activeOpacity={0.8}>
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
  slider: {
    width: '100%',
    height: 20,
  },
  container: {
    flexDirection: 'row',
    height: '13%',
    justifyContent: 'center',
    alignItems: 'center',
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
