import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ProgressBar = ({duration = 0, position = 0}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    if (duration > 0) {
      animatedProgress.value = withTiming(position / duration, {duration: 0});
    }
  }, [position, duration, animatedProgress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

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

  return (
    <View>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBar, animatedStyle]}>
          <LinearGradient
            colors={['#FFA500', '#FFFFFF']}
            style={[
              StyleSheet.absoluteFill,
              styles.linearGradient(duration, position),
            ]}
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0}}
          />
        </Animated.View>
      </View>

      <View style={styles.labelsContainer}>
        <Text style={styles.label}>{timeFormat(position)}</Text>
        <Text style={styles.label}>{timeFormat(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 15,
    backgroundColor: '#eaeaea',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  linearGradient: (duration: number, position: number) => ({
    borderTopRightRadius: duration === position ? 0 : 10,
    borderBottomRightRadius: duration === position ? 0 : 10,
  }),
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProgressBar;
