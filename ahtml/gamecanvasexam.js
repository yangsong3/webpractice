/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const characterW = 50;
const characterH = 50;
const gravity = 0.5;
const jumpPower = -12;

let velocityY = 0;
let isJumping = false;

let characterX = canvas.width / 2 - characterW / 2;
let characterY = canvas.height - characterH - 10;
const characterImage = new Image();
characterImage.src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn9h4K2AZRv5cTwhnfkZQfllDqDUUz3dE7uQ&s";

let moveLeft = false;
let moveRight = false;

window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    moveLeft = true;
  }
  if (e.key === "ArrowRight") {
    moveRight = true;
  }
  if (e.key === "ArrowUp" && !isJumping) {
    velocityY = jumpPower;
    isJumping = true;
  }
});

window.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft") {
    moveLeft = false;
  }
  if (e.key === "ArrowRight") {
    moveRight = false;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (moveLeft && characterX > 0) {
    characterX -= 5;
  }
  if (moveRight && characterX < canvas.width - characterW) {
    characterX += 5;
  }
  if (isJumping) {
    characterY += velocityY;
    velocityY += gravity;
    // console.log("charY : " + characterY,"|","velocY : "+velocityY);
    // console.log(" ");

    if (characterY >= canvas.height - characterH - 10) {
      isJumping = false;
      velocityY = 0;
    }
  }

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(characterImage, characterX, characterY, characterW, characterH);
  requestAnimationFrame(gameLoop);
}

characterImage.onload = function () {
  gameLoop();
};
