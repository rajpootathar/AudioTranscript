import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const PlayerControls = () => {
  return (
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
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '13%',
    justifyContent: 'center',
    borderTopColor: 'orange',
    borderTopWidth: 2,
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
