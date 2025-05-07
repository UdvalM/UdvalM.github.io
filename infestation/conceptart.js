const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//grey background
ctx.fillStyle = "grey";
ctx.fillRect(0,0,400,400);

//general used shapes
function halfCircle(x,y,radius, isBottom, color) {
    ctx.beginPath();
    if (isBottom) {
        ctx.arc(x,y,radius,Math.PI, 0, false);
    } else {
        ctx.arc(x,y,radius, 0, Math.PI, false);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function circle(x,y,radius, options = {}) {
    ctx.beginPath();
    ctx.arc(x,y,radius,0, 2*Math.PI);
    ctx.closePath();
    if (options.fill) {
        ctx.fillStyle = options.fillColor;
        ctx.fill();
    }
    if (options.border) {
    ctx.lineWidth = options.border.width;
    ctx.strokeStyle = options.border.color;
    ctx.stroke();
    }
}

function rect(x,y,width,height, color) {
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.fillStyle = color;
    ctx.fill();
}

//udgan herself
function eyes(x,y) {
    circle(x, y, 8, {border: {width: 2, color: 'black'}});
    circle(x+30, y, 8, {border: {width: 2, color: 'black'}});
    circle(x, y, 2, {border: {width: 2, color: 'black'}});
    circle(x+30, y, 2, {border: {width: 2, color: 'black'}});
}

function gown(x,y) {
    halfCircle(x+70, y, 70, true, '#292929'); //shoulder
    rect(x, y, 140, 80,'#292929'); //gown
}

function head(x,y) {
    rect(x, y-50, 70, 40, 'black'); //top of headwear
    halfCircle(x+35, y, 35, true, '#FDD05B'); //gold
    eyes(x+20,y-15);
    rect(x, y, 70, 70, 'black'); //bottom of headwear
}

function shaman(x,y) {
    gown(65, 200);
    head(100,100);
}

shaman(200,200);
