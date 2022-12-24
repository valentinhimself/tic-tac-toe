class TicTacToe {
  constructor(tick, tac) {
    this.tick = tick;
    this.tac = tac;
    this.Array = new Array(9);
  }

  setPlayerChoice(choice) {
    this.playerChoice = '';
    this.botChoice = '';
    if (choice === this.tick) {
      this.playerChoice = this.tick;
      this.botChoice = this.tac;
    }
    if (choice === this.tac) {
      this.playerChoice = this.tac;
      this.botChoice = this.tick;
      this.botMove();
      this.updateDisplay();
    }
  }

  // takeTurn() {
  //   if (!this.playerChoice) return;

  //   if (this.playerChoice === this.tac) {
  //     this.playerChoice = this.tick;
  //   } else {
  //     this.playerChoice = this.tac;
  //   }
  // }

  isCellTaken(cell) {
    this.currentCell = cell.textContent;
    return this.currentCell !== '';
  }

  makeMove(cell) {
    if (!this.Array[0]) this.Array[0] = null; // debug
    if (this.playerChoice === '') this.playerChoice = 'X';
    this.Array[Array.from(gameController.tickTacFields).indexOf(cell)] =
      this.playerChoice;
  }

  botMove() {
    if (!this.Array[4] && this.botChoice === this.tac) {
      this.Array[4] = this.botChoice;
      return;
    }

    const availableArrayIndices = this.getAvailableIndices();

    this.randomIndexFromRemaining =
      availableArrayIndices[
        Math.floor(Math.random() * availableArrayIndices.length)
      ];

    this.Array[this.randomIndexFromRemaining] = this.botChoice;
  }

  getAvailableIndices() {
    const availableArrayIndices = [];
    for (let i = 0; i < this.Array.length; i++) {
      if (!this.Array[i]) {
        availableArrayIndices.push(i);
      }
    }
    return availableArrayIndices;
  }

  updateDisplay() {
    let i = 0;
    while (i < this.Array.length) {
      gameController.tickTacFields[i].textContent = this.Array[i];
      i += 1;
    }
    if (!this.isOver()) return;
    gameController.declareWinner();
  }

  reset() {
    gameController.overlay.classList.remove('show');
    this.playerChoice = '';
    gameController.tickTacFields.forEach((field) => (field.textContent = ''));
    this.Array = new Array(9);
  }

  isOver() {
    // horizonal
    if (this.Array[0] === this.Array[1] && this.Array[0] === this.Array[2])
      return this.Array[0];
    if (this.Array[3] === this.Array[4] && this.Array[4] === this.Array[5])
      return this.Array[3];
    if (this.Array[6] === this.Array[7] && this.Array[6] === this.Array[8])
      return this.Array[6];

    // diagonal
    if (this.Array[0] === this.Array[4] && this.Array[0] === this.Array[8])
      return this.Array[0];
    if (this.Array[2] === this.Array[4] && this.Array[2] === this.Array[6])
      return this.Array[2];

    // // vertical
    if (this.Array[0] === this.Array[3] && this.Array[3] === this.Array[6])
      return this.Array[0];
    if (this.Array[1] === this.Array[4] && this.Array[4] === this.Array[7])
      return this.Array[1];
    if (this.Array[2] === this.Array[5] && this.Array[5] === this.Array[8])
      return this.Array[2];

    if (!this.Array.includes(undefined)) return 'Draw';
  }
}

function GameController() {
  const tickTacFields = document.querySelectorAll('.field');
  const resetBtn = document.querySelector('.reset__btn');
  const signFields = document.querySelectorAll('#cross, #nought');
  const overlay = document.querySelector('.overlay');
  const winner = document.querySelector('.winner');
  const winnerSpan = document.querySelector('.winner__span');

  const addPlayerChoiceListener = () => {
    signFields.forEach((signField) => {
      signField.addEventListener('click', () => {
        tickTac.reset();
        tickTac.setPlayerChoice(signField.textContent);
      });
    });
  };

  const addCellListener = () => {
    tickTacFields.forEach((tickTacField) => {
      tickTacField.addEventListener('click', () => {
        if (!tickTac.isCellTaken(tickTacField)) {
          tickTac.makeMove(tickTacField);
          tickTac.updateDisplay();
          setTimeout(() => {
            tickTac.botMove();
            tickTac.updateDisplay();
            tickTac.isOver();
          }, 500);
          // tickTac.takeTurn();
        }
      });
    });
  };

  const addResetListener = () => {
    resetBtn.addEventListener('click', () => {
      tickTac.reset();
    });
  };

  const declareWinner = () => {
    overlay.classList.add('show');
    if (tickTac.isOver() === 'X') {
      winner.textContent = 'X';
      winnerSpan.textContent = 'is the winner';
    } else if (tickTac.isOver() === 'O') {
      winner.textContent = 'O';
      winnerSpan.textContent = 'is the winner';
    } else {
      winner.textContent = "It's a draw!";
      winnerSpan.textContent = '';
    }
  };

  const addOverlayListener = () => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('show');
      tickTac.reset();
    });
  };

  addPlayerChoiceListener();
  addCellListener();
  addResetListener();
  addOverlayListener();

  return {
    overlay,
    tickTacFields,
    declareWinner,
  };
}

const gameController = GameController();

const tickField = document.querySelector('#cross');
const tacField = document.querySelector('#nought');

const tickTac = new TicTacToe(tickField.textContent, tacField.textContent);
