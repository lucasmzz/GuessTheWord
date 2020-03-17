export default class GuessTheWord {

    constructor(){
        this.words = [
            { word:'crocodile', hints:['It can walk and swim','It is a reptile','It is a dundee'] },
            { word:'kangaroo', hints:['An animal that jumps all the time','It carries its babies on a belly bag','Lives in Australia'] },
            { word:'argentina', hints:['The country were Tango was invented','Football is a very popular sport','It has the southest city in the world'] },
            { word:'lion', hints:['It is the king of the jungle','It is a feline','Main character of a very famous Disney movie'] },
            { word:'pizza', hints:['It is the favourite food of Ninja Turtles','Originally from Italy','Comes in a lot of flavours!'] },
            { word:'guitar', hints:['It is a very popular musical instrument','It has 6 strings','It is generally made of wood.'] },
            { word:'computer', hints:['Used to connect to internet','It has a keyboard and a mouse','There is one in every house'] },
            { word:'piano', hints:['It is an ancient musical instrument','It´s difficult to have one at home due to its size.','It has 88 keys, some black, some white.'] },
            { word:'tomato', hints:['It is a very well known vegetable','It is used to prepare pasta sauce','It can either be tiny or as big as an apple.'] },
        ];
        this.errorCount = 0;
        this.roundCount = 0;
        this.winsCount = 0;
        this.roundOn = false;
        this.gameOn = false;
        this.guess = {};
        this.guessStatus = null;
    }

    randomWord() {
        return this.words[Math.round(Math.random()*(this.words.length-1))];
    }

    startGame() {
        this.gameon = true;
        this.resetCounters();
        this.startRound();
    }

    startRound(){
        this.roundOn = true;
        this.roundCount += 1;
        this.errorCount = 0;
        this.guess = this.randomWord();
        this.guessStatus = Array(this.guess.word.length).fill('');
    }

    stopRound() {
        this.roundOn = false;
    }

    stopGame() {
        this.gameOn = false;
    }
    
    resetCounters(){
        this.roundCount = 0;
        this.errorCount = 0;
        this.winsCount = 0;
    }

    checkCharacter(char){
        const res = [];
        for (let i = 0; i < this.guess.word.length ; i++){
            if (this.guess.word[i] === char.toLowerCase()){
                res.push(i);
            }
        }
        return res;
    }

    checkRound(){
        let res = true;
        for (let i = 0; i < this.guessStatus.length; i++){
            if (this.guessStatus[i] === ''){
                res = false;
                break;
            }
        }
        return res;
    }

    processCharacter(char){
        const pos = this.checkCharacter(char);
        
        if (pos.length > 0){
            for (let i = 0; i < pos.length ; i++){
                this.guessStatus[pos[i]] = char;
            }
        }else {
            this.errorCount += 1;
        }

        return pos.length;
    }

    processWin(){
        this.stopRound();
        this.winsCount += 1;
    }

    processLoss(){
        this.stopRound();
    }

    processFinishRound(){
        return `You guessed ${this.winsCount} out of ${this.roundCount} words.`;
    }

}