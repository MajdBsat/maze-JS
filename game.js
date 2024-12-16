//Initialized variables
let is_game_running = false; 
let score = 0;

//Declared variables
let end;
let start;
let boundaries;
let status_display;
let timer;          
let countdownTimer; 
let timeRemaining; 

document.addEventListener("DOMContentLoaded", loadPage);

function displayScore(message){
    if(message != "")
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
}

function gameOver(){
    if(is_game_running){
        clearTimeout(timer);
        clearInterval(countdownTimer);

        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0)
            score = score - 1;
        displayScore("Game Over!");
        let coin = document.getElementById("coin");
        if (coin) coin.remove();
        is_game_running = false;
    }
}

function startGame(){
    displayScore("");
    is_game_running = true;
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee";
    spawnCoin();
    startTimer();
}

function spawnCoin()
{
    let coin = document.createElement("div");
    coin.id = "coin";

    let gameContainer = document.getElementById("game");

    let coinX = 170;
    let coinY = 100;

    coin.style.left = coinX + "px";
    coin.style.top = coinY + "px";

    gameContainer.appendChild(coin);
    console.log("Coin dynamically added at:", coinX, coinY);

    coin.addEventListener("mouseover", function () {
        score += 2;
        displayScore("You collected the coin!");
        gameContainer.removeChild(coin);
    });
}

function startTimer() {
    timeRemaining = 10;
    updateTimerDisplay();

    countdownTimer = setInterval(() => {
        timeRemaining -= 1;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(countdownTimer);
        }
    }, 1000);

    timer = setTimeout(() => {
        gameOver();
        clearInterval(countdownTimer);
    }, 10000);
}

function updateTimerDisplay() {
    let timerDisplay = document.getElementById("status");
    timerDisplay.innerHTML = `Time Remaining: ${timeRemaining} seconds<br/>Your Score is: ${score}`;
}

function endGame(){
    if(is_game_running){
        clearTimeout(timer);
        clearInterval(countdownTimer);

        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        displayScore("You Won!");
        let coin = document.getElementById("coin");
        if (coin) coin.remove();
        is_game_running = false;
    }
}

function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display =  document.getElementById("status");
    resetButton = document.getElementById("reset-button");

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    clearTimeout(timer);
    clearInterval(countdownTimer);

    score = 0;

    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].style.backgroundColor = "#eeeeee";
    }

    let coin = document.getElementById("coin");
    if (coin) coin.remove();

    is_game_running = false;
    timeRemaining = 10;

    displayScore("Game Reset! Click 'S' to start again.");
}


