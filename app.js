const gameBoard = document.querySelector('.game-board');
const welcomeMSG = document.querySelector('.welcome-msg');
const errorMsg = document.querySelector('.error-msg')
const beginBtn = document.querySelector('.begin');
const inputNameOne = document.querySelector('#input-name-one');
const inputNameTwo = document.querySelector('#input-name-two');
const player1Name = document.querySelector('#player1-name');
const player2Name = document.querySelector('#player2-name');
const player1Score = document.querySelector('#player1-score');
const player2Score = document.querySelector('#player2-score');
const regameBtn = document.querySelector('#regame-btn');
const newgameBtn = document.querySelector('#newGame-btn');
const displayResult  = document.querySelector('.display-result');
const playerScore = document.querySelector('#player-score');


//global variables
let cells = document.querySelectorAll('.td_game')
let gameState = Array(9).fill('');
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
    console.log(`${currentPlayer} is on ${index}`);
    gameState[index] = currentPlayer;
    console.log(`GameState: ${gameState}`);

    //check for win
    const winComboIndex = checkWin()
    if(winComboIndex !== -1){
        applyWinningStyle(winComboIndex);
        console.log(`Player ${currentPlayer} won`)
        displayResult.classList.remove('hidden');
        displayResult.querySelector('p').textContent = `${currentPlayer} won`;
        if(currentPlayer === 'X'){
            X_Score ++;
            console.log(`X has won ${X_Score} game`)
            player1Score.textContent = `${X_Score}`;
        } else {
            O_Score ++;
            console.log(`O has won ${O_Score} game`)
            player2Score.textContent = `${O_Score}`;
        } 
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

//check if currentplayer matches the winning combo
function checkWin(){
    for(let index =0; index < winCombos.length;index++){
        const combo = winCombos[index];
        if(gameState[combo[0]] === currentPlayer &&
            gameState[combo[1]] === currentPlayer &&
            gameState[combo[2]] === currentPlayer) {
                return index //Return index of the winning combo
            }
    }
    return -1 //Return -1 if no win
}

function applyWinningStyle(winComboIndex) {
    //getting winning combo from winCombos array
    const winningCombo = winCombos[winComboIndex];

    //map each index of the winning combo to its corresponding row and column
    const winningCellCoordinates = winningCombo.map(index => {
        return {
            row:Math.floor(index /3),
            col: index % 3
        };
    })

    //apply winning class to each winning cell
    winningCellCoordinates.forEach(coords => {
        const cellIndex = coords.row * 3 + coords.col;
        cells[cellIndex].classList.add('winning-cell');
    })
}

function restartGame(){
    console.log('restarting game ....')
    displayResult.classList.add('hidden');
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    document.querySelectorAll('.td_game').forEach(cell => {
        cell.querySelector('p').textContent = '';
        cell.classList.remove('winning-cell');
    });
    clickEvent();
}

//newGame Function
function newGame(){
    console.log('new game..')
    X_Score = 0;
    O_Score = 0;
    player1Score.textContent =''
    player2Score.textContent =''
    restartGame();
    welcomeMSG.classList.remove('hidden');
    gameBoard.classList.add('hidden');
}


newgameBtn.addEventListener('click', newGame);
regameBtn.addEventListener('click', restartGame);
beginBtn.addEventListener('click', initializeGame);