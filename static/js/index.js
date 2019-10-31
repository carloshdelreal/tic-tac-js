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
  player1_plays.push(parseInt(cell.target.id,10));
  checkWin(player1_plays,lastplay);
  console.log(player1_plays);
} else {
  putSymbol(cell.target.id, player2);
  lastplay = 'p2'
  player2_plays.push(parseInt(cell.target.id,10));
  checkWin(player2_plays,lastplay);
}
}
function putSymbol(cellId, player) {
  document.getElementById(cellId).innerText = player;
}

function checkWin(array,lastplay){
  if (lastplay === 'p1'){
    let player = "player 2"
  } else {
    let player = "player 1"
  }

  for (let i = 0; i<= win.length ; i++) {
    if (win[i].every(j => array.includes(j))) {
      alert("Winner ")
    }
  }
}

start();
