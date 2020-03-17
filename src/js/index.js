import GuessTheWord from './models/GuessTheWord';
import * as GuessTheWordView from './views/GuessTheWordView';
import { elements } from './views/base';

const game = new GuessTheWord();

const controlNewGame = () => {
  if (!game.roundOn){
    game.startGame();
    GuessTheWordView.prepareNewGame(game.guess, game.errorCount, game.winsCount, game.roundCount);
  }
}

const controlStopGame = () => {
  GuessTheWordView.finishGame(game.processFinishRound());
  game.stopRound();  
  game.stopGame();
  game.resetCounters();
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
    GuessTheWordView.prepareNewRound(game.guess, game.errorCount, game.winsCount, game.roundCount);
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
