import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';

const ProgressBar = ({duration = 0, position = 0}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (duration > 0) {
      Animated.timing(animatedProgress, {
        toValue: position / duration,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [position, duration, animatedProgress]);

  const animatedStyle = {
    width: animatedProgress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
    <View style={styles.progressBarBackground}>
      <Animated.View style={[styles.progressBar, animatedStyle]}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#FFA500',
              borderTopRightRadius: duration === position ? 0 : 10,
              borderBottomRightRadius: duration === position ? 0 : 10,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 15,
    backgroundColor: '#eaeaea',
    marginHorizontal: Platform.OS === 'web' ? '15%' : 0,
    overflow: 'hidden',
    marginTop: Platform.OS === 'web' ? '3%' : 0,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});

export default ProgressBar;
