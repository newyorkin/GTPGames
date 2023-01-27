const cardsContainer = document.querySelector(".cards-container");
//const letters = "ABCDEFGHIJKL";
const letters = "ABCDEF";

for (let i = 0; i < 12; i++) {
  let card = document.createElement("div");
  
  card.classList.add("card");
  card.dataset.card = letters[i];
  card.innerHTML = letters[i];
  card.addEventListener("click", flipCard);
  cardsContainer.appendChild(card);
}
//card.classList.add("card", "hidden");
//let card = document.createElement("div");
//card.classList.add("card", "hidden");

const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matched = 0;
let winLabel = document.querySelector("#win-label");

function flipCard() {
  let card = event.currentTarget;
  card.classList.remove("hidden");
  // rest of the function
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
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
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matched++;
  if (matched === cards.length / 2) {
    winLabel.style.display = "block";
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));