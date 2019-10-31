const cells = document.querySelectorAll(".cell");
const player1 = "X";
const player2 = "O";
let player1_plays =[];
let player2_plays =[];
const win = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,5,9],
  [3,5,7],
  [1,4,7],
  [3,6,9],
  [2,5,8]
]
let lastplay='p2';
function start() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClick, false);
  }
}

// GAME BOARD MODULE

// PLAYERS MODULE
const Player = (name) => {
  let playerName = name;
  const getName = () => {
    playerName;
  };
  return { getName };
};

// TIC TAC TOE MAIN
let TicTac = function() {
  let public = {};
  public.startGame = function() {};
};

function cellClick(cell) {
  if (lastplay === 'p2') {
  putSymbol(cell.target.id, player1);
  lastplay = 'p1'
} else {
  putSymbol(cell.target.id, player2);
  lastplay = 'p2'
}
}
function putSymbol(cellId, player) {
  document.getElementById(cellId).innerText = player;
}
start();
