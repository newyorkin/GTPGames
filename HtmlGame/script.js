const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");
const guess = document.getElementById("guess");

let randomNumber;

function generateRandomNumber() {
  randomNumber = Math.floor(Math.random() * 10) + 1;
}

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  if (guess.value === "") {
    result.innerHTML = "Please enter a number";
  } else if (guess.value == randomNumber) {
    result.innerHTML = "Congratulations! You guessed the right number.";
  } else {
    result.innerHTML = "Sorry, the correct number was " + randomNumber + ".";
  }
  generateRandomNumber();
});

generateRandomNumber();
