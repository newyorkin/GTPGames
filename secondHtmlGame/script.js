let cards = document.querySelectorAll(".card");
let firstCard, secondCard;
let lockBoard = false;
let matchCounter = 0;
let winLabel = document.querySelector("#win-label");
let startTime = Date.now();
let timer = document.querySelector(".timer");
let wintimer = document.querySelector(".win-timer");
let turnCounter = 0;
let turnCounterDisplay = document.querySelector(".turn-counter");
let timerStarted = false;

function stopTimer(){
  clearInterval(timerId);
}

const restartButton = document.querySelector(".restart-button");
restartButton.addEventListener("click", function(){
    location.reload();
});


function flipCard() {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
  
  turnCounter++;
  turnCounterDisplay.textContent = turnCounter/2;

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  //this.querySelector(".letter").classList.remove("hidden");
  this.textContent = this.getAttribute("data-card");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();

}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add("match");
  secondCard.classList.add("match");
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  matchCounter++;
  if (matchCounter === 6) {
    winLabel.style.display = "block";
    //updateTimer();
    stopTimer();
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.textContent = '';
    secondCard.textContent  = '';
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function updateTimer() {
    let elapsedTime = Date.now() - startTime;
	elapsedTime = (elapsedTime / 1000).toFixed(2) + " seconds";
    timer.textContent = elapsedTime;
	wintimer.textContent = elapsedTime
}

function startTimer() {
  timerId = setInterval(updateTimer, 100);
}

cards.forEach(card => card.addEventListener("click", flipCard));