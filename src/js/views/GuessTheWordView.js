import { elements } from './base';

export const renderGuess = guess => {
  const wordMarkup = `<div class="word-char"></div>`;
  for (let i = 0; i < guess.word.length; i++){
    elements.wordContainer.insertAdjacentHTML('beforeend',wordMarkup);
  }  
  for (let j = 0; j < guess.hints.length; j++){
    const hintMarkup = `<li class="hint">${guess.hints[j]}</li>`;
    elements.hintContainer.insertAdjacentHTML('beforeend',hintMarkup);
  }    
}

export const refreshGuess = guessStatus => {
  for (let i = 0; i < guessStatus.length; i++){
    elements.wordContainer.children[i].textContent = guessStatus[i];
    if (guessStatus[i] !== ''){
      elements.wordContainer.children[i].style.backgroundColor = 'lightgreen';
    }
  }
}

export const refreshCounter = (errs, wins, rounds) => {
  elements.errorPanel.textContent = errs;
  elements.winsPanel.textContent = wins;
  elements.roundsPanel.textContent = rounds;
}

export const clearGuess = () => {
  elements.wordContainer.innerHTML = '';
  elements.hintContainer.innerHTML = '';
}

export const showResult = (msg) => {
  elements.resultModal.style.display = 'block';
  elements.resultBanner.textContent = msg;
}

export const hideResult = () => {
  elements.resultModal.style.display = 'none';
};

export const prepareNewGame = (guess, errs, wins, rounds) => {
  toggleGameResult('none','');
  toggleControlButtons();
  prepareNewRound(guess, errs, wins, rounds);
};

export const prepareNewRound = (guess, errs, wins, rounds) => {
  clearGuess();
  renderGuess(guess);
  refreshCounter(errs, wins, rounds);
  toggleGameResult('none','');
};

export const finishGame = (msg) => {
  toggleGameResult('block', msg);
  toggleControlButtons();
  clearGuess();
  hideResult();
}

const toggleControlButtons = () => {
  elements.btnNewGame.classList.toggle('btn-disable');
  elements.btnStop.classList.toggle('btn-disable');
};

const toggleGameResult = (display, msg) => {
  elements.gameResult.style.display = display;
  elements.gameResult.textContent = msg;
}