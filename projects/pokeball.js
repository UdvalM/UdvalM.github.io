const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//purple background
ctx.fillStyle = "purple";
ctx.fillRect(0,0,400,400);

//pokeball shape stuff

function halfCircle(x,y,radius, isBottom) {
    ctx.beginPath();
    if (isBottom) {
        ctx.arc(x,y,radius,Math.PI, 0, false);
    } else {
        ctx.arc(x,y,radius, 0, Math.PI, false);
    }
    ctx.closePath();
    ctx.fill();
}

function circle(x,y,radius) {
    ctx.beginPath();
    ctx.arc(x,y,radius,0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
}

//drawing the actual thing

function ball(x,y){
    ctx.fillStyle = "red";
    halfCircle(x,y,100, true); //upper
    ctx.fillStyle = "white";
    halfCircle(x,y,100, false); //lower
}

function button(x,y) {
    ctx.fillStyle = "white";
    circle(x,y,30);
}

function lilBorder(x,y,radius, borderColor = "black", borderWidth = 7) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.closePath();
    ctx.stroke();
}

function lilLine(x1,y1,x2,y2, color = "black", width = 7) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

ball(200,200);
lilLine(100,200,300,200);
button(200,200);
lilBorder(200,200,100);
lilBorder(200,200,30);
