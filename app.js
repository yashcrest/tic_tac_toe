const gameBoard = document.querySelector('.game-board');
const welcomeMSG = document.querySelector('.welcome-msg');
const errorMsg = document.querySelector('.error-msg')
const beginBtn = document.querySelector('.begin');
const inputNameOne = document.querySelector('#input-name-one');
const inputNameTwo = document.querySelector('#input-name-two');
const player1Name = document.querySelector('#player-1');
const player2Name = document.querySelector('#player-2')
const regameBtn = document.querySelector('#regame-btn')
const displayResult  = document.querySelector('.display-result');

//global variables
let cells = document.querySelectorAll('.td_game')
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
let gameState = Array(9).fill('');


function clickEvent(){
    //getting all the data from html
    cells.forEach(cell => {
        cell.addEventListener('click',handleCellClick, {once : true});
    })
}

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
    clickEvent();
}


//when each board cell is clicked
function handleCellClick(event){

    //get the clicked cell element
    const cell = event.target;
    const pElement = cell.querySelector('p')
    //get row and column from clicked cell
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    console.log(`row:${row}, col:${col}`)

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
    //convert row and col to index in the game state array
    const index = row * 3 + col;
    gameState[index] = currentPlayer;
    console.log(gameState);

    //check for win
    if(checkWin()){
        console.log(`Player ${currentPlayer} won`)
        displayResult.classList.remove('hidden');
        displayResult.querySelector('p').textContent = `${currentPlayer} has won`;
        return;
    }

    //check for draw
    if(gameState.every(cell => cell !== '')){
        console.log("It's a draw!");
        displayResult.querySelector('p').textContent = `It's draw!`
    }
}


//check if currentplayer matches the winning combo
function checkWin(){
    for(const combo of winCombos){
        if(gameState[combo[0]] === currentPlayer &&
            gameState[combo[1]] === currentPlayer &&
            gameState[combo[2]] === currentPlayer) {
                return true
            }
    }
}

function restartGame(){
    displayResult.classList.add('hidden');
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    document.querySelectorAll('.td_game p').forEach(p => p.textContent = '');
    clickEvent();
}


regameBtn.addEventListener('click', restartGame);
beginBtn.addEventListener('click', initializeGame);