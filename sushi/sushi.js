const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// loading images
const bgImage = new Image();
bgImage.src = "background.png";

const playerImage = new Image();
playerImage.src = "sushi.png";

//background settings
let bgX1 = 0;
let bgX2 = canvas.width;
const bgSpeed = 2;

//sushi settings 
const player = {
  x: 100,
  y: canvas.height - 120,
  width: 80,
  height: 80,
  velocityY: 0,
  isJumping: false
};

const gravity = 0.6;
const jumpForce = -12;
const groundY =canvas.height - 120;

//main animation loop
function animate() {
  //move background
  bgX1 -= bgSpeed;
  bgX2 -= bgSpeed;

  if (bgX1 <= -canvas.width) bgX1 = canvas.width;
  if (bgX2 <= -canvas.width) bgX2 = canvas.width;

  //draw background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, bgX1, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, bgX2, 0, canvas.width, canvas.height);

  //draw sushi
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

  //apply gravity
  player.velocityY += gravity;
  player.y += player.velocityY;

  //stop falling below ground
  if (player.y > groundY) {
    player.y = groundY;
    player.velocityY = 0;
    player.isJumping = false;
  }

  requestAnimationFrame(animate);
}

let imagesLoaded = 0;

function checkAllLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 2) {
    animate();
  }
}

bgImage.onload = checkAllLoaded;
playerImage.onload = checkAllLoaded; 

// keyboard for jumping
window.addEventListener("keydown", (e) => {
  if ((e.code === "Space" || e.key === " ") && !player.isJumping) {
    player.velocityY = jumpForce;
    player.isJumping = true;
  }
});
