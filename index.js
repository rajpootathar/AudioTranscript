/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import app from './src/app.json';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './src/services/PlaybackService';

AppRegistry.registerComponent(app.name, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
if (typeof __DEV__ === 'undefined') {
  global.__DEV__ = process.env.NODE_ENV !== 'production';
}
