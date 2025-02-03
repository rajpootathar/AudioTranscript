/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './src/services/PlaybackService';


AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});

TrackPlayer.registerPlaybackService(() => PlaybackService);
