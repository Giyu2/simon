





  const main = document.getElementById("mainContain");
 
const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
 
const colors = ["red", "blue", "green", "yellow"];
 
const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};
 
colors.forEach((color) => {
  const button = document.createElement("button");
  button.id = color;
  button.className = "colorButton";
  mainDiv.appendChild(button);
});
 
const startButton = document.createElement("button");
startButton.id = "startButton";
startButton.textContent = "Start Game";
 
main.appendChild(mainDiv);
main.appendChild(startButton);
 
let sequence = [];
let playerSequence = [];
let level = 0;
function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    nextLevel();
  }


function flashColor(color) {
const button = document.getElementById(color);
playSound(color);
button.style.animation = `ajillah${colors.indexOf(color) + 1} 0.5s linear`;
setTimeout(() => {
  button.style.animation = "none";
    }, 500);
}
  function playSound(color) {
    if (sounds[color]) {
      sounds[color].currentTime = 0; 
      sounds[color].play();
    }
  }

  function playSequence() {
    sequence.forEach((color, index) => {
      setTimeout(() => {
        flashColor(color);
      }, (index + 1) * 1000);
    });
}
  function nextLevel() {
    playerSequence = [];
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    playSequence();
  }

function handlePlayerInput(color) {
    playerSequence.push(color);
    flashColor(color);
    checkPlayerInput();
}

  function checkPlayerInput() {
    const currentIndex = playerSequence.length - 1;
   
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
      gameOver.style.display = "block";
      gameOverCancel.style.display = "block";
      startGame();
      return;
    }
   
    if (playerSequence.length === sequence.length) {
      setTimeout(nextLevel, 500);
    }
  }

  document.querySelectorAll(".colorButton").forEach((button) => {
    button.addEventListener("click", () => {
      handlePlayerInput(button.id);
    });
  });