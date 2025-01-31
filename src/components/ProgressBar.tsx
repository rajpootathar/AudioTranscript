import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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

  return (
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
});

export default ProgressBar;
