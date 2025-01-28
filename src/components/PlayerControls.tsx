import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';

const PlayerControls = () => {
  return (
    <>
      <Slider
        style={styles.slider}
        value={2}
        onValueChange={value => {
          console.log(value);
        }}
        minimumValue={0}
        maximumValue={20}
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
        <TouchableOpacity activeOpacity={0.8} style={styles.playAndPauseButton}>
          <Image
            source={require('../Assets/Images/play.png')}
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
    </>
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
