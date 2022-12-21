class TicTacToe {
  constructor(tick, tac) {
    this.tick = tick;
    this.tac = tac;
    this.tictacArray = Array(9);
  }

  setPlayerChoice(choice) {
    this.playerChoice = '';
    if (choice === this.tick) this.playerChoice = this.tick;
    if (choice === this.tac) this.playerChoice = this.tac;
  }

  takeTurn() {
    if (!this.playerChoice) return;

    if (this.playerChoice === this.tac) {
      this.playerChoice = this.tick;
    } else {
      this.playerChoice = this.tac;
    }
  }

  isCellTaken(cell) {
    this.currentCell = cell.textContent;
    return this.currentCell !== '';
  }

  makeMove(cell) {
    this.tictacArray[Array.from(gameController.tickTacFields).indexOf(cell)] =
      this.playerChoice;
  }

  updateDisplay(cell) {
    cell.textContent = this.playerChoice;
    if (!this.isOver()) return;
    gameController.declareWinner();
  }

  reset() {
    this.playerChoice = '';
    gameController.tickTacFields.forEach((field) => (field.textContent = ''));
    this.tictacArray = Array(9);
  }

  isOver() {
    console.log(this.tictacArray);
    if (
      this.tictacArray[0] === this.tictacArray[1] &&
      this.tictacArray[0] === this.tictacArray[2]
    )
      return this.tictacArray[0];
    if (
      this.tictacArray[3] === this.tictacArray[4] &&
      this.tictacArray[3] === this.tictacArray[5]
    )
      return this.tictacArray[3];
    if (
      this.tictacArray[6] === this.tictacArray[7] &&
      this.tictacArray[6] === this.tictacArray[8]
    )
      return this.tictacArray[6];

    if (
      this.tictacArray[0] === this.tictacArray[3] &&
      this.tictacArray[0] === this.tictacArray[6]
    )
      return this.tictacArray[0];

    if (
      this.tictacArray[1] === this.tictacArray[4] &&
      this.tictacArray[1] === this.tictacArray[7]
    )
      return this.tictacArray[1];
    if (
      this.tictacArray[2] === this.tictacArray[5] &&
      this.tictacArray[2] === this.tictacArray[8]
    )
      return this.tictacArray[2];
    if (
      this.tictacArray[0] === this.tictacArray[4] &&
      this.tictacArray[0] === this.tictacArray[8]
    )
      return this.tictacArray[0];
    if (
      this.tictacArray[2] === this.tictacArray[4] &&
      this.tictacArray[2] === this.tictacArray[6]
    )
      return this.tictacArray[2];
    if (!this.tictacArray.includes(undefined)) return 'Draw';
  }
}

function GameController() {
  const tickTacFields = document.querySelectorAll('.field');
  const resetBtn = document.querySelector('.reset__btn');
  const signFields = document.querySelectorAll('#cross, #nought');
  const overlay = document.querySelector('.overlay');
  const winner = document.querySelector('.winner');

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
          tickTac.updateDisplay(tickTacField);
          tickTac.isOver();
          tickTac.takeTurn();
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
    } else if (tickTac.isOver() === 'O') {
      winner.textContent = 'O';
    } else {
      winner.textContent = "It's a draw!";
    }
  };

  addPlayerChoiceListener();
  addCellListener();
  addResetListener();

  return {
    tickTacFields,
    declareWinner,
  };
}

const gameController = GameController();

const tickField = document.querySelector('#cross');
const tacField = document.querySelector('#nought');

const tickTac = new TicTacToe(tickField.textContent, tacField.textContent);

// const tickTacFields = document.querySelectorAll('.field');
// const resetBtn = document.querySelector('.reset__btn');
// const signFields = document.querySelectorAll('#cross, #nought');

// signFields.forEach((signField) => {
//   signField.addEventListener('click', () => {
//     tickTac.reset();
//     tickTac.setPlayerChoice(signField.textContent);
//   });
// });

// tickTacFields.forEach((tickTacField) => {
//   tickTacField.addEventListener('click', () => {
//     if (!tickTac.isCellTaken(tickTacField)) {
//       tickTac.makeMove(tickTacField);
//       tickTac.updateDisplay(tickTacField);
//       tickTac.isOver();
//       tickTac.takeTurn();
//     }
//   });
// });

// resetBtn.addEventListener('click', () => {
//   tickTac.reset();
// });
