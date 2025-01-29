//I am setting up trackplayer as a hook to play audio files and keep track of its progress

import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useEffect, useState} from 'react';
import {Messages} from '../screens/MessageScreen';

const useTranscriptPlayer = (sortedTranscript: Messages[]) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const {position, duration} = useProgress(100);
  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;
  //initialize the player
  useEffect(() => {
    setupPlayer().then(isSetup => {
      if (isSetup) {
        setIsPlayerReady(true);
      }
    });
  }, []);
  async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        progressUpdateEventInterval: 1,
      });
      isSetup = true;
    } finally {
      return isSetup;
    }
  }

  async function addTrack(pathToFile, title) {
    await TrackPlayer.add([
      {
        id: '1',
        url: pathToFile,
        title: title,
      },
    ]);
  }
  async function play() {
    await TrackPlayer.play();
  }
  async function pause() {
    await TrackPlayer.pause();
  }

  async function seekTo(time) {
    await TrackPlayer.seekTo(time);
  }
  //forward to the next phrase in transcript in sortedTranscript
  async function forward() {
    const nextPhrase = sortedTranscript.find(phrase => phrase.time > position);
    if (nextPhrase) {
      await seekTo(nextPhrase.time);
    }
  }
  //backward to the previous phrase in transcript in sortedTranscript or seek to the beginning of the current phrase
  async function backward() {
    const previousPhrase = sortedTranscript
      .slice()
      .reverse()
      .find(phrase => phrase.time < position);
    if (previousPhrase) {
      await seekTo(previousPhrase.time);
    } else {
      const currentPhrase = sortedTranscript.find(
        phrase => phrase.time > position,
      );
      if (currentPhrase) {
        await seekTo(currentPhrase.time);
      }
    }
  }

  return {
    addTrack,
    play,
    pause,
    seekTo,
    forward,
    backward,
    isPlaying,
    isPlayerReady,
    audioDuration: duration,
    audioPosition: position,
  };
};

export default useTranscriptPlayer;
