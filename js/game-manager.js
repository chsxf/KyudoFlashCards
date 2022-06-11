class GameManager {
  constructor() {
    this.cardDatabase = undefined;
    this.previousCardIndex = undefined;
  }

  setCardDatabase(cardDatabase) {
    this.cardDatabase = cardDatabase;
  }

  get isInitialized() {
    return this.cardDatabase != undefined;
  }

  pickElements() {
    let tempDatabase = Array.from(this.cardDatabase);
    if (this.previousCardIndex >= 0) {
      tempDatabase.splice(this.previousCardIndex, 1);
    }

    let goodCardIndex = this.randomInt(tempDatabase.length);
    let goodCard = tempDatabase[goodCardIndex];
    if (
      this.previousCardIndex >= 0 &&
      goodCardIndex >= this.previousCardIndex
    ) {
      this.previousCardIndex = goodCardIndex + 1;
    } else {
      this.previousCardIndex = goodCardIndex;
    }
    tempDatabase.splice(goodCardIndex, 1);

    let solutions = [];
    for (let i = 0; i < 3; i++) {
      let otherIndex = this.randomInt(tempDatabase.length);
      solutions.push(
        this.filterOutPageNumbers(tempDatabase[otherIndex].short_solution)
      );
      tempDatabase.splice(otherIndex, 1);
    }
    solutions.push(this.filterOutPageNumbers(goodCard.short_solution));

    solutions.sort(() => Math.random() - 0.5);

    return {
      concept: goodCard.concept,
      solutions: solutions,
    };
  }

  randomInt(_excludedMax) {
    return Math.floor(Math.random() * _excludedMax);
  }

  isValidSolution(_solutionText) {
    let card = this.cardDatabase[this.previousCardIndex];
    return this.filterOutPageNumbers(card.short_solution) == _solutionText;
  }

  filterOutPageNumbers(_solutionText) {
    return _solutionText.replace(/P\d+.+$/, "").trim();
  }
}
