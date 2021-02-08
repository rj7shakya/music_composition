let keyboard = document.querySelector('.piano__keyboard');

let pianoLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

let init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createKey('white', pianoLetters[j], i);
      keyboard.appendChild(key);
      //   whiteButtons.push(key);

      if (j !== 2 && j !== 6) {
        key = createKey('black', pianoLetters[j], i);
        let emptySpace = document.createElement('div');
        emptySpace.className = 'empty-space';
        emptySpace.appendChild(key);
        keyboard.appendChild(emptySpace);
        // blackButtons.push(key);
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

  // let keyIndex = pianoLetters.indexOf(note) + (octave - 1) * 7;

  // keyBtn.dataset.keyboard = type === 'white' ? keyMap[keyIndex] : '⇧+' +keyMap[keyIndex];

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

let playSound = (keyBtn) => {
  let audio = document.createElement('audio');
  audio.src = 'sounds/' + keyBtn.dataset.letterNoteFileName + '.mp3';
  audio.play().then(() => {
    audio.remove();
  });
};

init();
