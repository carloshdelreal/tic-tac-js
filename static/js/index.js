// PLAYER FACTORY
const Player = (name) => {
  const playerName = name;
  let playerSym = null;
  let plays = [];
  const getName = () => playerName;
  const addPlay = (play) => {
    plays.push(play);
  };
  const getPlays = () => plays;
  const setSym = (symbol) => {
    playerSym = symbol;
  };
  const getSym = () => playerSym;
  const resetPlays = () => {
    plays = [];
  };

  return {
    getName,
    addPlay,
    getPlays,
    setSym,
    getSym,
    resetPlays,
  };
};

// GAME BOARD MODULE
const Board = () => {
  const cells = document.querySelectorAll('.cell'); // Board
  let played = [];
  const win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [3, 6, 9],
    [2, 5, 8],
  ];

  function checkWin(player) {
    for (let i = 0; i < win.length; i += 1) {
      if (win[i].every((j) => player.getPlays().includes(j))) {
        /* eslint-disable no-use-before-define */
        stop(win[i]);
        return true;
      }
    }
    return false;
  }

  function checkDraw() {
    if (checkEmptyCells() > 0) {
      return false;
    }
    stop([]);
    return true;
  }

  function validMove(cellid) {
    if (played.includes(cellid)) {
      return false;
    }
    played.push(cellid);
    return true;
  }

  function checkEmptyCells() {
    let empty = 0;
    for (let i = 0; i < cells.length; i += 1) {
      if (cells[i].innerText === '') {
        empty += 1;
      }
    }
    return empty;
  }

  function putSymbol(cellId, player) {
    document.getElementById(cellId).innerText = player.getSym();
  }

  function start() {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener('click', TicTac.cellClick, false);
      cells[i].innerText = '';
      cells[i].style.backgroundColor = 'white';
    }
    played = [];
  }

  function stop(winarr) {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].removeEventListener('click', TicTac.cellClick, false);
    }
    winarr.forEach((element) => {
      cells[element - 1].style.backgroundColor = 'green';
    });
    document.getElementById('playAgainBtn').style.display = 'flex';
  }

  return {
    checkWin,
    putSymbol,
    start,
    checkDraw,
    validMove,
  };
};
/* eslint-disable func-names, consistent-return */
// TIC TAC TOE MAIN

let TicTac = (function () {
  let Player1 = null;
  let Player2 = null;
  let turn = null;
  const board = Board();

  const publicTicTac = {};
  /* eslint-disable no-alert */
  const pickTurn = () => {
    let turnFor = prompt(
      `Who wants to play First, ${Player1.getName()} | ${Player2.getName()} |   Random `,
      'Random'
    );
    turnFor = turnFor.toLowerCase();
    switch (turnFor) {
      case `${Player1.getName()}`.toLowerCase():
        turn = Player1;
        break;
      case `${Player2.getName()}`.toLowerCase():
        turn = Player2;
        break;
      case 'random':
        // Random 1 or 2
        turn = [Player1, Player2][[0, 1][Math.floor(Math.random() * 2)]];
        break;
      default:
        alert('You put an invalid entry');
        pickTurn();
    }
  };

  const setPlayerSymbol = () => {
    let selectedSym = prompt(
      `Select ${turn.getName()} symbol X | O | Random `,
      'Random',
    );
    selectedSym = selectedSym.toLowerCase();
    switch (selectedSym) {
      case 'x':
        turn.setSym('X');
        flipTurn();
        turn.setSym('O');
        flipTurn();
        break;
      case 'o':
        turn.setSym('O');
        flipTurn();
        turn.setSym('X');
        flipTurn();
        break;
      case 'random':
        // Random 1 or 2
        turn.setSym(['X', 'O'][[0, 1][Math.floor(Math.random() * 2)]]);
        if (turn.getSym() === 'X') {
          flipTurn();
          turn.setSym('O');
          flipTurn();
        } else {
          turn.setSym('O');
          flipTurn();
          turn.setSym('X');
          flipTurn();
        }
        break;
      default:
        alert('You put an invalid entry');
        setPlayerSymbol();
    }
  };

  const flipTurn = () => {
    if (turn === Player1) {
      turn = Player2;
    } else {
      turn = Player1;
    }
  };

  const screenUpdate = () => {
    document.querySelector('.turnFor').innerHTML = turn.getName();
  };

  const beginGame = () => {
    board.start();
    screenUpdate();
  };

  const winner = () => {
    const end = document.querySelector('.endgame');
    end.style.display = 'block';
    end.innerHTML = `Congratulations ${turn.getName()}, you Win!`;
    document.querySelector('.turnFor').innerHTML = `${turn.getName()}, Won!`;
  };

  const tie = () => {
    const end = document.querySelector('.endgame');
    end.style.display = 'block';
    end.innerHTML = 'Its a tie, Play Again!';
    document.querySelector('.turnFor').innerHTML = 'Its a tie, Play Again!';
  };

  publicTicTac.playAgain = () => {
    Player1.resetPlays();
    Player2.resetPlays();
    document.querySelector('.endgame').style.display = 'none';
    document.getElementById('playAgainBtn').style.display = 'none';
    beginGame();
  };
  /* eslint-disable func-names, consistent-return */
  publicTicTac.startGame = function () {
    /* eslint-disable no-restricted-globals */
    // Ask the user if want to play tic tac toe
    const confPlay = confirm("Let's play Tic Tac Toe!");
    if (!confPlay) {
      return null;
    }

    // Set The players names and Symbol
    Player1 = Player(prompt("Please enter player's 1 name", 'Player 1'));
    Player2 = Player(prompt("Please enter player's 2 name", 'Player 2'));

    // Set The Turn
    pickTurn();

    // Set symbol
    setPlayerSymbol();

    // start playing
    beginGame();
  };

  publicTicTac.cellClick = (cell) => {
    if (board.validMove(cell.target.id)) {
      turn.addPlay(parseInt(cell.target.id, 10));
      board.putSymbol(cell.target.id, turn);

      if (board.checkWin(turn)) {
        winner();

        return null;
      } if (board.checkDraw()) {
        tie();

        return null;
      }

      flipTurn();
      screenUpdate();
    }
  };

  return publicTicTac;
}());

document.getElementById('startBtn').addEventListener('click', TicTac.startGame);

document
  .getElementById('playAgainBtn')
  .addEventListener('click', TicTac.playAgain);
