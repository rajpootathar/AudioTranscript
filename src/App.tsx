import React from 'react';
import {StyleSheet, View} from 'react-native';
import MessageScreen from './screens/MessageScreen';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <MessageScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
