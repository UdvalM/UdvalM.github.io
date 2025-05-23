const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

//LOADING IMAGES
const bgImage = new Image();
bgImage.src = "background.png";

const playerImage = new Image();
playerImage.src = "sushi.png";

const handImage = new Image();
handImage.src = "hand.png";

const teethImage = new Image();
teethImage.src = "teeth.png";

//game screen setting
let score = 0;
let bgSpeed = 5;
let gameRunning = true;
let animationId = null;
let lastSpawned = null;

//background settings
let bgX1 = 0;
let bgX2 = canvas.width;

//sushi settings 
const player = {
  x: 100,
  y: canvas.height - 120,
  width: 80,
  height: 80,
  velocityY: 0,
  isJumping: false
};

const gravity = 0.5;
const jumpForce = -15;
const groundY =canvas.height - 120;

//ANIMATION DEFINITIONS 
 //sushi
const sushiFrameCount = 4;
let sushiFrame = 0;
let sushiFrameTimer = 0;
const sushiFrameInterval = 12;
 
 //obstacle
const handFrameCount = 5;
let handFrame = 0;
let handFrameTimer = 0;
const handFrameInterval = 10;

//DEFINING OBSTACLES
  //hands
const obstacles = [];
const obstacleWidth = 160;
const obstacleHeight = 	160;
const obstacleSpeed = 4;

let obstacleSpawnTimer = 0;
let nextObstacleSpawn = Math.floor(100 + Math.random() * 150);
const obstacleSpawnInterval = 120;
const fixedY = 100; 
const baseInterval = 120;
const randomOffset = 60;
  //mouths 
const teeth = [];
const toothWidth = 132;
const toothHeight = 61;

let teethSpawnTimer = 0;
let nextTeethSpawn = Math.floor(150 + Math.random() * 200);

//CHECK COLLISIONS

function checkCollision() {
  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const playerRadius = Math.min(player.width, player.height) / 2.5;

  //check against teeth
  for (let t of teeth) {
    const tCenterX = t.x + t.width / 2 - 30;
    const tCenterY = t.y + t.height / 2;
    const tRadius = Math.min(t.width, t.height) / 2.5;

    if (getDistance(playerCenterX, playerCenterY, tCenterX, tCenterY) < playerRadius + tRadius) {
      endGame();
    }
  }
  
  //check against hands
  for (let obs of obstacles) {
    const oCenterX = obs.x + obs.width / 2;
    const oCenterY = obs.y + obs.height / 2;
    const oRadius = Math.min(obs.width, obs.height) / 2.5;

    if (getDistance(playerCenterX, playerCenterY, oCenterX, oCenterY) < playerRadius + oRadius) {
    endGame();
    }
  }
}

function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

//ENDING THE GAME
function endGame() {
  if (!gameRunning) return;
 
  gameRunning = false;
  document.getElementById("gameOverScreen").style.display = "flex";
}

//MAIN ANIMATION LOOP

function animate() {
  if(gameRunning) {
  checkCollision();
  //move background
  bgX1 -= bgSpeed;
  bgX2 -= bgSpeed;

  if (bgX1 <= -canvas.width) bgX1 = canvas.width;
  if (bgX2 <= -canvas.width) bgX2 = canvas.width;

//DRAWING ELEMENTS

  //draw background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, Math.floor(bgX1), 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, Math.floor(bgX2), 0, canvas.width, canvas.height);

  //draw sushi
  ctx.drawImage(
    playerImage,
    sushiFrame * player.width, 0,
    player.width, player.height,
    player.x, player.y,
    player.width, player.height
  );

  sushiFrameTimer++;
  if (sushiFrameTimer >= sushiFrameInterval) {
    sushiFrame = (sushiFrame + 1) % sushiFrameCount;
    sushiFrameTimer = 0;
  }

  //move and draw hands
  for (let i = 0; i < obstacles.length; i++) {
    const obs = obstacles[i];
    obs.x -= obstacleSpeed;

    ctx.drawImage(
      handImage,
      handFrame * obstacleWidth, 0,
      obstacleWidth, obstacleHeight,
      obs.x, obs.y,
      obs.width, obs.height
    );
  }

  //move and draw teeth
  for (let i = 0; i < teeth.length; i++) {
    const t = teeth[i];
    const toothWidth = 132;
    const toothHeight = 61;
    t.x -= obstacleSpeed;

    ctx.drawImage(teethImage, t.x, t.y, toothWidth, toothHeight);
  }

  //draw score
  score++;
  ctx.fillStyle = "white";
  ctx.font = "16px 'Press Start 2P'";
  ctx.fillText("Score: " + score, 30,40);

//SPAWNING ENEMIES

  //spawn hands
  obstacleSpawnTimer++;
  if (obstacleSpawnTimer >= nextObstacleSpawn && lastSpawned !== "hand") {
    obstacles.push({
      x: canvas.width,
      y: fixedY, 
      width: obstacleWidth,
      height: obstacleHeight
    });
  obstacleSpawnTimer = 0;
  nextObstacleSpawn = Math.floor(150 + Math.random() * 200);
  lastSpawned = "hand";

  teethSpawnTimer = -40;
  }

  //animate hand flapping
  handFrameTimer++;
  if (handFrameTimer >= handFrameInterval) {
    handFrame = (handFrame + 1) % handFrameCount;
    handFrameTimer = 0;
  }

  //remove off-screen 
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
    }
  }
  
  //apply gravity
  player.velocityY += gravity;
  player.y += player.velocityY;

  //stop falling below ground
  if (player.y > groundY) {
    player.y = groundY;
    player.velocityY = 0;
    player.isJumping = false;
  }

  //spawning mouths 
  teethSpawnTimer++;
  if (teethSpawnTimer >= nextTeethSpawn && lastSpawned !== "teeth") {
    teeth.push({
      x: canvas.width,
      y: groundY + 20,
      width: obstacleWidth,
      height: obstacleHeight
    });
  teethSpawnTimer = 0;
  nextTeethSpawn = Math.floor(150 + Math.random() * 200);
  lastSpawned = "teeth";

  obstacleSpawned = "teeth";
  }

  //remove off-screen
  for (let i = teeth.length - 1; i >= 0; i--) {
    if (teeth[i].x + teeth[i].width < 0) {
      teeth.splice(i, 1);
    }
  }
  }
  animationId = requestAnimationFrame(animate);
}

//RESETING THE GAME
function resetGame() {
  if(animationId) {
    cancelAnimationFrame(animationId);
  }
  //player reset
  player.y = groundY;
  player.velocityY = 0;
  player.isJumping = false;

  //clear obstacles
  obstacles.length = 0;
  teeth.length = 0;

  //reset timers
  obstacleSpawnTimer = 0;
  teethSpawnTimer = 0;
  nextObstacleSpawn = Math.floor(150 + Math.random() * 200);
  nextTeethSpawn = Math.floor(150 + Math.random() * 200);

  //reset animation frames;
  sushiFrame = 0;
  sushiFrameTimer = 0;
  handFrame = 0;
  handFrameTimer = 0;

  //reset score
  score = 0;

  //background positions
  bgX1 = 0;
  bgX2 = canvas.width;

  //restarting the actual game
  gameRunning = true;
  animationId = requestAnimationFrame(animate);

  //hide the game overscreen
  document.getElementById("gameOverScreen").style.display = "none";
}

//CHECKING IMAGES
let imagesLoaded = 0;

function checkAllLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 4) {
    animate();
  }
}

bgImage.onload = checkAllLoaded;
playerImage.onload = checkAllLoaded; 
handImage.onload = checkAllLoaded;
teethImage.onload = checkAllLoaded;


//USER CONTROL

// keyboard for jumping
window.addEventListener("keydown", (e) => {
  if ((e.code === "Space" || e.key === " ") && !player.isJumping) {
    player.velocityY = jumpForce;
    player.isJumping = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("replayButton").addEventListener("click", resetGame);
});

