const cells = document.querySelectorAll('.cell');
const player1 = 'X'
//const player2 = 'O'

function start(){
  for (let i =0 ; i<cells.length ; i++){

    cells[i].addEventListener('click', cellClick, false);
  }
}

function cellClick(cell){
  putSymbol(cell.target.id,player1)
}
function putSymbol(cellId,player){
  document.getElementById(cellId).innerText = player1;
}
start();
