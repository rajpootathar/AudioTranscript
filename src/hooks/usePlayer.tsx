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
    //sortedTransscript Message has startTIme and EndTime in milliseconds
    const nextPhrase = sortedTranscript.find(
      phrase => phrase.startTime > position * 1000,
    );
    if (nextPhrase) {
      await seekTo(nextPhrase.startTime / 1000);
    }
  }
  //backward to the previous phrase in transcript in sortedTranscript or seek to the beginning of the current phrase
  async function backward() {
    //sortedTranscript Message has startTIme and EndTime in milliseconds
    //“Rewind"	- go to the beginning of the current (or if already, then previous) phrase
    const pos = position * 1000;
    const startOfCurrentPhrase = sortedTranscript.find(
      phrase =>
        phrase.startTime + 300 < pos && //300ms buffer
        phrase.endTime > pos,
    );
    console.log('previousPhrase', pos, startOfCurrentPhrase);
    if (startOfCurrentPhrase) {
      await seekTo(startOfCurrentPhrase.startTime / 1000);
    } else {

      const previousPhrase = sortedTranscript.reduce((last, phrase) => {
        return (phrase.endTime < pos) ? phrase : last;
      }, null);
      if (previousPhrase) {
        // If a previous phrase is found, seek to its start time
        await seekTo(previousPhrase.startTime / 1000);
      } else {
        // If no previous phrase is not found, seek to the beginning
        await seekTo(0);
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
