const gameBoard = document.querySelector('.game-board');
const welcomeMSG = document.querySelector('.welcome-msg');
const errorMsg = document.querySelector('.error-msg')
const beginBtn = document.querySelector('.begin');
const inputNameOne = document.querySelector('#input-name-one');
const inputNameTwo = document.querySelector('#input-name-two');
const player1Name = document.querySelector('#player-1');
const player2Name = document.querySelector('#player-2')


let currentPlayer = 'X'
const winCombos = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagnol
    [0, 4, 8],
    [6, 4, 2]
]

function initializeGame(){
    //check users name
    if(inputNameOne.value.trim() !== '' && inputNameTwo.value.trim() !== ''){
        gameBoard.classList.remove('hidden');
        welcomeMSG.classList.add('hidden');
        player1Name.textContent = inputNameOne.value;
        player2Name.textContent = inputNameTwo.value;
    } else { 
        errorMsg.classList.remove('hidden');
        setTimeout(() => {
            errorMsg.classList.add('hidden');
        }, 1000);
    }
}

//cell Click
function handleCellClick(event){

    //get the clicked cell element
    const cell = event.target;
    const pElement = cell.querySelector('p')
    //get row and column from clicked cell
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    //change color of "O" player
    if(currentPlayer ==='O'){
        pElement.style.color = 'white'
    }

    //rendering event to HTML
    pElement.textContent = currentPlayer;
    updateGame(row, col)
    changePlayer();


}

//handle turns
function changePlayer(){
   currentPlayer = currentPlayer === 'X' ? 'O' :'X';
}


function updateGame(row, col){
    let memory = [row, col]
    if(currentPlayer === 'X'){
        console.log(`X played in : ${memory}`);
    } else {
        console.log(`O played in ${memory}`);
    }
}

//getting all the data from html
document.querySelectorAll('.td_game').forEach(cell => {
    cell.addEventListener('click',handleCellClick, {once : true});
})


beginBtn.addEventListener('click', initializeGame);