import GuessTheWord from './models/GuessTheWord';
import * as GuessTheWordView from './views/GuessTheWordView';
import { elements } from './views/base';

const game = new GuessTheWord();

const controlNewGame = () => {
  if (!game.gameOn){
    game.startGame();
    elements.btnNewGame.classList.toggle('btn-disable');
    elements.btnStop.classList.toggle('btn-disable');
    GuessTheWordView.clearGuess();
    GuessTheWordView.renderGuess(game.guess);
    GuessTheWordView.refreshCounter(game.errorCount, game.winsCount, game.roundCount);
  }
}

const controlStopGame = () => {
  if (game.gameOn){
    game.stopGame();
    game.resetCounters();
    elements.btnNewGame.classList.toggle('btn-disable');
    elements.btnStop.classList.toggle('btn-disable');
    GuessTheWordView.refreshCounter(game.errorCount, game.winsCount, game.roundCount);
    GuessTheWordView.clearGuess();
  }
}

const controlCharInput = (char) => {
  if (game.gameOn){
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
  controlNewGame();
}

const controlFinishRound = () => {
  GuessTheWordView.hideResult();
  GuessTheWordView.finishGame(game.processFinishRound());
  game.stopGame();
  game.resetCounters();
  GuessTheWordView.refreshCounter(game.errorCount, game.winsCount, game.roundCount);
  GuessTheWordView.clearGuess();
}

elements.btnNewGame.addEventListener("click", controlNewGame);
elements.btnStop.addEventListener("click", controlStopGame);
elements.btnResultYes.addEventListener('click',controlNewRound);
elements.btnResultNo.addEventListener('click',controlFinishRound);
elements.charPanel.addEventListener("click", e => controlCharInput(e.target.textContent));
window.addEventListener("keyup", e => {
  if ((e.which > 65 &&  e.which == 32 && e.which == 8) || e.which < 90 ) {
    controlCharInput(e.key.toUpperCase());
  }
});

