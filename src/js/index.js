import GuessTheWord from './models/GuessTheWord';
import * as GuessTheWordView from './views/GuessTheWordView';
import { elements } from './views/base';

const game = new GuessTheWord();

const controlNewGame = () => {
  if (!game.roundOn){
    game.startGame();
    elements.btnNewGame.classList.toggle('btn-disable');
    elements.btnStop.classList.toggle('btn-disable');
    GuessTheWordView.clearGuess();
    GuessTheWordView.renderGuess(game.guess);
    GuessTheWordView.refreshCounter(game.errorCount, game.winsCount, game.roundCount);
    elements.gameResult.style.display = 'none';
    elements.gameResult.textContent = '';
  }
}

const controlStopGame = () => {
  const msg = game.processFinishRound();
  console.log(msg);
  GuessTheWordView.finishGame(msg);
  game.stopRound();  
  game.stopGame();
  game.resetCounters();
  elements.btnNewGame.classList.toggle('btn-disable');
  elements.btnStop.classList.toggle('btn-disable');
  elements.gameResult.style.display = 'block';
  GuessTheWordView.clearGuess();
  GuessTheWordView.hideResult();
}

const controlCharInput = (char) => {
  if (game.roundOn){
    const res = game.processCharacter(char);
    if (res > 0){
      GuessTheWordView.refreshGuess(game.guessStatus);
      if (game.checkRound()){
        game.processWin();
        GuessTheWordView.showResult("You Win! Another round?");
      }
    }else{
     if (game.errorCount > 2){
       game.processLoss();
       GuessTheWordView.showResult("You Lost! Try again?");
     }
    }
    GuessTheWordView.refreshCounter(game.errorCount, game.winsCount, game.roundCount);
  }
}

const controlNewRound = () => {
  GuessTheWordView.hideResult();
  if (!game.roundOn){
    game.startRound();
    GuessTheWordView.clearGuess();
    GuessTheWordView.renderGuess(game.guess);
    GuessTheWordView.refreshCounter(game.errorCount, game.winsCount, game.roundCount);
    elements.gameResult.classList.toggle('show');
    elements.gameResult.textContent = '';
  }
}

elements.btnNewGame.addEventListener("click", controlNewGame);
elements.btnStop.addEventListener("click", controlStopGame);
elements.btnResultYes.addEventListener('click',controlNewRound);
elements.btnResultNo.addEventListener('click',controlStopGame);
elements.charPanel.addEventListener("click", e => controlCharInput(e.target.textContent));
window.addEventListener("keyup", e => {
  if (e.which >= 65 && e.which <= 90) {
    controlCharInput(e.key.toUpperCase());
  }
});
