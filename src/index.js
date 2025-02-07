/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import app from './app.json';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './services/PlaybackService';

AppRegistry.registerComponent(app.name, () => App);
AppRegistry.runApplication(app.name, {
  rootTag: document.getElementById('app-root'),
});

TrackPlayer.registerPlaybackService(() => PlaybackService);
if (typeof __DEV__ === 'undefined') {
  global.__DEV__ = process.env.NODE_ENV !== 'production';
}
