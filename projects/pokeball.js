const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//purple background
ctx.fillStyle = "purple";
ctx.fillRect(0,0,400,400);

ctx.fillStyle = "white";
ctx.fillRect(0,300,400,100);

//pokeball
function circle(x,y,r){
    ctx.beginPath();
    ctx.arc(x,y,r,0,1*Math.PI);
    ctx.fill();
}

function ball(x,y){
    circle(x,y,100); //upper
    ctx.fillStyle="red"
    circle(-x,-y,100); //lower
    ctx.fillStyle="white"
}

ball(100,100);
