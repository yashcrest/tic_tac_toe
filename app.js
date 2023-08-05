const gameBoard = document.querySelector('.game-board');
const welcomeMSG = document.querySelector('.welcome-msg');
const errorMsg = document.querySelector('.error-msg')
const beginBtn = document.querySelector('.begin');
const inputNameOne = document.querySelector('#input-name-one');
const inputNameTwo = document.querySelector('#input-name-two');
const player1Name = document.querySelector('#player1-name');
const player2Name = document.querySelector('#player2-name')
const player1Score = document.querySelector('#player1-score')
const player2Score = document.querySelector('#player2-score')
const regameBtn = document.querySelector('#regame-btn')
const newgameBtn = document.querySelector('#newGame-btn')
const displayResult  = document.querySelector('.display-result');
const playerScore = document.querySelector('#player-score');


//global variables
let cells = document.querySelectorAll('.td_game')
let currentPlayer = 'X'
let X_Score = 0;
let O_Score = 0;
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

//trigger this after someone wins the game or draw happens
function removeClickEvent(){
     cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick)
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
    inputNameOne.value = ''
    inputNameTwo.value = ''
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
    } else if (currentPlayer === 'X'){
        pElement.style.color = 'black';
    }

    //rendering event to HTML
    pElement.textContent = currentPlayer;
    updateGame(row, col)
    changePlayer();
}

//switch players
function changePlayer(){
   currentPlayer = currentPlayer === 'X' ? 'O' :'X';
}


function updateGame(row, col){
    //convert row and col to index in the game state array
    const index = row * 3 + col;
    gameState[index] = currentPlayer;
    console.log(`GameState: ${gameState}`);

    //check for win
    const winComboIndex = checkWin()
    if(winComboIndex !== -1){
        console.log(`Player ${currentPlayer} won`)
        displayResult.classList.remove('hidden');
        displayResult.querySelector('p').textContent = `${currentPlayer} has won`;
        if(currentPlayer === 'X'){
            X_Score ++;
            console.log(`X has won ${X_Score} game`)
            player1Score.textContent = `${X_Score}`;
        } else {
            O_Score ++;
            console.log(`O has won ${O_Score} game`)
            player2Score.textContent = `${O_Score}`;
        } 
        // applyWinningStyle(winComboIndex);
        removeClickEvent();
        return;
    }

    //check for draw
    if(gameState.every(cell => cell !== '')){
        console.log("It's a draw!");
        displayResult.classList.remove('hidden');
        displayResult.querySelector('p').textContent = `It's draw!`
        removeClickEvent();
    }
}

// function winComboIndex(winComboIndex){
//     const winningCombo = winCombos[winComboIndex];

//     //Apply appropriate CSS class based on winning combo
//     if(winningCombo[0]% 3 === 0){ //Horizontal win

//     }
// }

//check if currentplayer matches the winning combo
function checkWin(){
    for(const [index, combo] of winCombos){
        if(gameState[combo[0]] === currentPlayer &&
            gameState[combo[1]] === currentPlayer &&
            gameState[combo[2]] === currentPlayer) {
                return index //Return index of the winning combo
            }
    }
    return -1 //Return -1 if no win
}

function restartGame(){
    displayResult.classList.add('hidden');
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    document.querySelectorAll('.td_game p').forEach(p => p.textContent = '');
    clickEvent();
}

//newGame Function
function newGame(){
    X_Score = 0;
    Y_Score = 0;
    player1Score.textContent =''
    player2Score.textContent =''
    restartGame();
    welcomeMSG.classList.remove('hidden');
    gameBoard.classList.add('hidden');
}


newgameBtn.addEventListener('click', newGame);
regameBtn.addEventListener('click', restartGame);
beginBtn.addEventListener('click', initializeGame);