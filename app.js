const modeScreen = document.getElementById('mode-screen');
const sideScreen = document.getElementById('side-screen');
const gameScreen = document.getElementById('game-screen');

const playAIButton = document.getElementById('play-ai');
const playFriendButton = document.getElementById('play-friend');
const chooseOButton = document.getElementById('choose-o');
const chooseXButton = document.getElementById('choose-x');
const restartButton = document.getElementById('restart');
const endGameButton = document.getElementById('end-game');

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const scoreboard = document.querySelector('.scoreboard');

let currentPlayer = 'O';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

playAIButton.addEventListener('click', () => {
    modeScreen.classList.remove('active');
    sideScreen.classList.add('active');
});

playFriendButton.addEventListener('click', () => {
    modeScreen.classList.remove('active');
    sideScreen.classList.add('active');
});

chooseOButton.addEventListener('click', () => {
    startGame('O');
});

chooseXButton.addEventListener('click', () => {
    startGame('X');
});

restartButton.addEventListener('click', restartGame);
endGameButton.addEventListener('click', endGame);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function startGame(player) {
    currentPlayer = player;
    sideScreen.classList.remove('active');
    gameScreen.classList.add('active');
    updateScoreboard();
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== '' || !gameActive) return;

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        setTimeout(() => alert(${currentPlayer} wins!), 100);
    } else if (boardState.every(cell => cell !== '')) {
        gameActive = false;
        setTimeout(() => alert(It's a draw!), 100);
    } else {
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
        updateScoreboard();
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => boardState[index] === currentPlayer);
    });
}

function restartGame() {
    currentPlayer = 'O';
    gameActive = true;
    boardState.fill('');
    cells.forEach(cell => cell.textContent = '');
    updateScoreboard();
}

function endGame() {
    gameScreen.classList.remove('active');
    modeScreen.classList.add('active');
    restartGame();
}

function updateScoreboard() {
    scoreboard.children[0].textContent = currentPlayer === 'O' ? 'You (O)' : 'You (X)';
    scoreboard.children[1].textContent = currentPlayer === 'O' ? 'AI (X)' : 'AI (O)';
}

// Start the game in mode selection screen
modeScreen.classList.add('active');