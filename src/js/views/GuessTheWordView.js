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
  elements.resultBanner.textContent = '';
};

export const finishGame = (msg) => {
  elements.gameResult.textContent = msg;
  elements.gameResult.classList.toggle('show');
}