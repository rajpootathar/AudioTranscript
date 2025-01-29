import {AppRegistry} from 'react-native';
import App from './App';
import app from './app.json';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './services/PlaybackService';

AppRegistry.registerComponent(app.name, () => App);
// TrackPlayer.registerPlaybackService(() => require('./service'));
AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root')
});


TrackPlayer.registerPlaybackService(() => PlaybackService);
