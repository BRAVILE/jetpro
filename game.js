let walletAmount = 0;
let betAmount = 0;
let gameRunning = false;
let jetMultiplier = 1.00;
let interval;

const walletDisplay = document.getElementById('walletAmount');
const jetMultiplierDisplay = document.getElementById('jetMultiplier');
const message = document.getElementById('message');
const betButton = document.getElementById('betButton');
const cashOutButton = document.getElementById('cashOutButton');
const addMoneyButton = document.getElementById('addMoney');

addMoneyButton.addEventListener('click', addMoney);
betButton.addEventListener('click', placeBet);
cashOutButton.addEventListener('click', cashOut);

function addMoney() {
    const amount = prompt('Enter amount to add:');
    walletAmount += parseFloat(amount);
    updateWallet();
}

function placeBet() {
    if (!gameRunning) {
        betAmount = prompt('Enter bet amount:');
        if (betAmount > walletAmount) {
            message.textContent = 'Insufficient funds!';
            return;
        }
        walletAmount -= betAmount;
        updateWallet();
        startGame();
    }
}

function cashOut() {
    if (gameRunning) {
        clearInterval(interval);
        gameRunning = false;
        const winnings = betAmount * jetMultiplier;
        walletAmount += winnings;
        updateWallet();
        message.textContent = `You cashed out at x${jetMultiplier.toFixed(2)} and won ${winnings.toFixed(2)} KES!`;
    }
}

function startGame() {
    gameRunning = true;
    jetMultiplier = 1.00;
    betButton.disabled = true;
    cashOutButton.disabled = false;
    message.textContent = 'Game started!';

    interval = setInterval(() => {
        jetMultiplier += 0.1;
        jetMultiplierDisplay.textContent = `x${jetMultiplier.toFixed(2)}`;
        if (Math.random() < 0.1) { // 10% chance to end the game
            clearInterval(interval);
            gameRunning = false;
            betButton.disabled = false;
            cashOutButton.disabled = true;
            message.textContent = 'Game ended automatically. You lost!';
        }
    }, 1000);

    setTimeout(() => {
        if (gameRunning) {
            clearInterval(interval);
            gameRunning = false;
            betButton.disabled = false;
            cashOutButton.disabled = true;
            message.textContent = 'Game ended after 30 seconds. You lost!';
        }
    }, 30000); // Auto end after 30 seconds
}

function updateWallet() {
    walletDisplay.textContent = walletAmount.toFixed(2);
}
