// Only Chrome and Firefox support speech synthesis
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

import config from '../config';

const audioElement = document.createElement('audio');
const delayBetweenSoundsSeconds = 3 * 1000;
const synth = window.speechSynthesis;
const queueType = {
  SOUND: 'SOUND',
  SPEECH: 'SPEECH',
};

let voice;
let audioQueue = [];
let processing = false;

const sounds = {
  EAS: '/assets/audio/eas.mp3',
  CHIME: '/assets/audio/chime.mp3',
};

function processQueue() {
  processing = true;

  const queueItem = audioQueue[0];
  const queueCleanup = () => {
    if (audioQueue.length <= 1) {
      audioQueue = [];
      processing = false;
    } else {
      audioQueue = audioQueue.slice(1);
      setTimeout(processQueue, delayBetweenSoundsSeconds);
    }
  };

  if (queueItem.type === queueType.SOUND) {
    audioElement.src = queueItem.soundPath;
    audioElement.onended = queueCleanup;
    audioElement.play();
  } else if (queueItem.type === queueType.SPEECH) {
    queueItem.utterance.onend = queueCleanup;
    synth.speak(queueItem.utterance);
  }
}

function playSound(soundPath) {
  audioQueue.push({
    type: queueType.SOUND,
    soundPath,
  });

  if (!processing) {
    processQueue();
  }
}

function speak(text) {
  if (!synth || !text) { return; }

  if (!voice) {
    voice = window.speechSynthesis.getVoices().filter(x => x.voiceURI === config.SPEECH_VOICE)[0];
  }

  const utterance = new SpeechSynthesisUtterance(text);

  if (voice) {
    utterance.voice = voice;
  }

  audioQueue.push({
    type: queueType.SPEECH,
    utterance,
  });

  if (!processing) {
    // MEOW TODO processQueue();
  }
}

export default {
  playSound,
  speak,
  sounds,
};
