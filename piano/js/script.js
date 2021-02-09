let keyboard = document.querySelector('.piano__keyboard');
let controls = document.querySelectorAll('.piano__control__option');
let pianoLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
let keys = [];
let keyboardMap = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
];
let whiteButtons = [];
let blackButtons = [];

let init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createKey('white', pianoLetters[j], i);
      key.dataset.keyboard = keyboardMap[j + (i - 1) * 7];
      keyboard.appendChild(key);

      if (j !== 2 && j !== 6) {
        key = createKey('black', pianoLetters[j], i);
        key.dataset.keyboard = '⇧+' + keyboardMap[j + (i - 1) * 7];
        let emptySpace = document.createElement('div');
        emptySpace.className = 'empty-space';
        emptySpace.appendChild(key);
        keyboard.appendChild(emptySpace);
      }
    }
  }
};

let createKey = (type, note, octave) => {
  let key = document.createElement('button');
  key.className =
    type === 'white'
      ? 'piano__key piano__key--white'
      : 'piano__key piano__key--black';
  key.dataset.letterNote =
    type === 'white' ? note + octave : note + '#' + octave;
  key.dataset.letterNoteFileName =
    type === 'white' ? note + octave : note + 's' + octave;
  key.textContent = key.dataset.letterNote;
  keys.push(key);

  key.addEventListener('mousedown', () => {
    key.classList.add('piano__key--playing');
    playSound(key);
  });
  key.addEventListener('mouseup', () =>
    key.classList.remove('piano__key--playing')
  );
  key.addEventListener('mouseleave', () =>
    key.classList.remove('piano__key--playing')
  );
  return key;
};

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  pressKey('mousedown', e);
});

document.addEventListener('keyup', (e) => {
  pressKey('mouseup', e);
});

let pressKey = (mouseEvent, e) => {
  let lastletter = e.code.substring(e.code.length - 1);
  let isShiftPressed = e.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastletter}"]`;
  } else {
    selector = `[data-keyboard="${lastletter}"]`;
  }
  let key = document.querySelector(selector);
  if (key !== null) {
    let event = new Event(mouseEvent);
    key.dispatchEvent(event);
  }
};

let playSound = (keyBtn) => {
  let audio = document.createElement('audio');
  audio.src = 'sounds/' + keyBtn.dataset.letterNoteFileName + '.mp3';
  audio.play().then(() => {
    audio.remove();
  });
};

controls.forEach((input) => {
  input.addEventListener('input', () => {
    let value = input.value;
    let type;
    switch (value) {
      case 'letterNotes':
        type = 'letterNote';
        break;
      case 'keyboard':
        type = 'keyboard';
        break;
      case 'none':
        type = '';
        break;
      default:
        break;
    }
    keys.forEach((key) => {
      key.textContent = key.dataset[type];
    });
  });
});

init();
