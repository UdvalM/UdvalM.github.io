const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let y = 0;
let dx = 5;
let dy = 3; 
let score = 0;
let gameRunning = true;

//we'll represent the player as object 
const player = {
    //variables use key:value pair
    x:200,
    y:200,
    color: 'purple',
    speed:3
}

//here's an object that will keep track of 
//which keys are pressed
const keys = {};

function drawPlayer() {
    //to access a variable from the player object
    //we use this syntax:
    //player.x
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y,
        20,
        0,
        2*Math.PI
        )
    ctx.fill();
}

//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function movePlayer() {
    if(keys['ArrowDown']){
         player.y += player.speed;
         }
    if(keys['ArrowUp']){
         player.y -= player.speed;
         }
    if(keys['ArrowRight']){
         player.x += player.speed;
         }
    if(keys['ArrowLeft']){
         player.x -= player.speed;
         }
//moving out of the screen 
    if(player.x > 400){
         player.x = 0;
    }
    if(player.x < 0){
         player.x = 400;
    }
    if(player.y > 400){
         player.y = 0;
    }
    if(player.y < 0){
         player.y = 400;
    }
}

function drawScore() {
    ctx.font = "30px Courir";
    ctx.fillText(score, 30,40);
}

function checkCollision() {
    //The aabb method
    let player_min_x = player.x - 20;
    let player_max_x = player.x + 20;
    let player_min_y = player.y - 20;
    let player_max_y = player.y + 20;

    let box_min_x = x;
    let box_max_x = x + 50;
    let box_min_y = y;
    let box_max_y = y + 50;

    if(box_max_y > player_min_y 
      && box_min_y < player_max_y
      && box_max_x > player_min_x
      && box_min_x < player_max_x) {
      gameRunning = false;
    }
}

function animate() {
    if(gameRunning){
        drawRect(x,y);
        drawPlayer();
        movePlayer();
        score++;
        drawScore();
        checkCollision();

        // TODO: Add some code here 
        //  that will change the rectangle's position
        x = x + dx;
        y = y + dy;
 
        // if the box goes off the right side of the screen
        // reset it to the initial position
        if(x > 350){
            dx = dx * -1;
        }

        if(x < 0){
             dx = dx * -1;
        }

        if(y > 350){
             dy = dy * -1;
        }

        if(y < 0){
            dy = dy * -1;
        }
    }
    requestAnimationFrame(animate);
}

/*
*Handle Keyboard
  To handle an event, we need two things: 
    - event handler - does stuff caused by the event
    - event listener - notices when event happens  calls the handler
*/
function handleKeyPress(e) {
    keys[e.key] = true;
}
document.addEventListener('keydown', handleKeyPress);

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

//call our function
animate();
