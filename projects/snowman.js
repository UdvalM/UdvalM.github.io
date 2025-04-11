const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//snowy background
ctx.fillStyle = "blue";
ctx.fillRect(0,0,400,400);

ctx.fillStyle = "white";
ctx.fillRect(0,300,400,100);

//snowman
function circle(x,y,r){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
}

function snowman(x,y){
    circle(x,y,25); //head
    circle(x,y+50,40); //upper body
    circle(x,y+110,55); //lower body
}

snowman(200,200);
snowman(100,200);
snowman(300,200);
