// PLAYER FACTORY
const Player = (name) => {
  let playerName = name;
  let playerSym;
  const plays = [];
  const getName = () => {
    playerName;
  };
  const addPlay = (play) => {
    plays.push(play);
  };
  const getPlays = () => {
    return plays;
  };
  const setSym = (symbol) => {
    playerSym = symbol;
  };
  const getSym = () => {
    return playerSym;
  };
  return { getName, addPlay, getPlays, setSym, getSym };
};

// GAME BOARD MODULE
const Board = () => {
  const cells = document.querySelectorAll(".cell"); //Board
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
    for (let i = 0; i <= win.length; i++) {
      if (win[i].every((j) => player.getPlays.includes(j))) {
        alert("Winner ");
      }
    }
  }

  function putSymbol(cellId, player) {
    document.getElementById(cellId).innerText = player.getSym();
  }

  function start() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", TicTac.cellClick, false);
    }
  }

  return { checkWin, putSymbol, start };
};

// TIC TAC TOE MAIN

let TicTac = (function() {
  let Player1 = null;
  let Player2 = null;
  let turn = null;
  let board = Board();

  let publicTicTac = {};
  const pickTurn = () => {
    let turnFor = prompt("Who wants to play First, Player 1 | Player 2 | Random ");
    turnFor = turnFor.toLowerCase();
    switch (turnFor) {
      case "player 1":
        turn = Player1;
        break;
      case "player 2":
        turn = Player2;
        break;
      case "random":
        // Random 1 or 2
        turn = [Player1, Player2][[0, 1][Math.floor(Math.random() * 2)]];
        break;
      default:
        alert("You put an invalid entry");
        pickTurn();
    }
  };

  const flipTurn = () => {
    if (turn === Player1) {
      turn = Player2;
    } else {
      turn = Player1;
    }
  };

  publicTicTac.startGame = function() {
    // Ask the user if want to play tic tac toe
    let confPlay = confirm("Let's play Tic Tac Toe!");
    if (!confPlay) {
      return null;
    }

    // Set The players names and Symbol
    Player1 = Player(prompt("Please enter player's 1 name", "Player 1"));
    Player2 = Player(prompt("Please enter player's 2 name", "Player 2"));

    // Set The Turn
    pickTurn();

    // start playing
    board.start();
  };

  publicTicTac.cellClick = (cell) => {
    // if (lastplay === "p2") {
    //   // Turn Flip
    //   putSymbol(cell.target.id, player1); // board update
    //   lastplay = "p1";
    //   player1_plays.push(parseInt(cell.target.id, 10)); // update player's plays
    //   checkWin(player1_plays, lastplay); // check win
    // } else {
    //   putSymbol(cell.target.id, player2);
    //   lastplay = "p2";
    //   player2_plays.push(parseInt(cell.target.id, 10));
    //   checkWin(player2_plays, lastplay);
    // }
    board.putSymbol(cell, turn);
  };
})();

start();
TicTac.startGame();
