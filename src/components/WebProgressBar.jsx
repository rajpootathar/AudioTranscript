import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from 'react-native-web';

const WebProgressBar = ({currentTime, duration}) => {
  const progress = duration > 0 ? currentTime / duration : 0;
  return (
    <View style={styles.container}>
      <ProgressBar color="#FFA500" progress={progress} trackColor="#eaeaea" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
});

export default WebProgressBar;
