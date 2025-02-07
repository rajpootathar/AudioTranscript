import React from 'react';
import {StyleSheet, View} from 'react-native';
import MessageScreen from './screens/Message/MessageScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <MessageScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
