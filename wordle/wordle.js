const { gameWon, gameStart, gameHistory, gameLose, Image } = require("./sender");
const games = require("../data/games");
class wordle {
  gid;
  solution;
  guesses;
  history;
  turn;
  currentGuess;
  language;
  constructor(gid, solution, language) {
    this.gid = gid;
    this.solution = solution;
    this.guesses = [...Array(6)];
    this.history = [];
    this.turn = 0;
    this.currentGuess = "";
    this.language = language;
  }

  formatGuesses() {
    let solutionArray = [...this.solution];
    let formattedGuess = [...this.currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });
    formattedGuess.forEach((l, i) => {
      if (this.solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });
    return this.language === "ar" ? formattedGuess.reverse() : formattedGuess;
  }
  async start() {
    return await gameStart(this.gid, this.language);
  }
  async submitGuess(guess, userID) {
    this.currentGuess = guess;
    this.setGuesses();
    if (this.currentGuess === this.solution) {
      await this.sendImage();
      await gameWon(this.gid, this.language, userID);
      games.delete(this.gid);
      return;
    }
    //this.setGuesses();
    if (this.history.includes(this.currentGuess)) {
      return await gameHistory(this.gid, this.language, this.currentGuess);
    }
    this.history = [...this.history, this.currentGuess];
    this.turn = this.turn + 1;
    if (this.turn === 6) {
      games.delete(this.gid);
      return await gameLose(this.gid, this.language, this.solution);
    }
    await this.sendImage();
    this.currentGuess = "";
  }
  rtl() {
    return this.language === "ar" ? true : false;
  }
  async sendImage() {
    return await Image(this.gid, this.language, this.guesses);
  }
  setGuesses() {
    let newGuesses = [...this.guesses];
    newGuesses[this.turn] = this.formatGuesses();
    this.guesses = newGuesses;
  }
}

module.exports = wordle;
