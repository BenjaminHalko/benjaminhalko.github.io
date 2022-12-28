// Variables

const back_numCircles = 5;

const back_minHue = 190;
const back_maxHue = 285;

const back_spd = 0.05 / 30;

const back_startRadius = 200;
const back_endRadius = 500;

// ** DO NOT EDIT BELOW THIS LINE **

// Setup the canvas
document.body.style.background = "black";
document.body.innerHTML = `<canvas id='canvas' style='position:fixed;left:0;top:0;z-index:-1'></canvas>
` + document.body.innerHTML;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create the circles
var circles = [];
for (var i = 0; i < back_numCircles; i++) {
    circles.push({
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * window.innerHeight),
        r: i / back_numCircles,
        color: back_minHue + Math.round(Math.random() * (back_maxHue - back_minHue)),
    });
}

setInterval(function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    for(var i = 0; i < circles.length; i++) {
        circles[i].r += back_spd;

        if (circles[i].r >= 1) {
            circles[i].r = 0;
            circles[i].x = Math.round(Math.random() * window.innerWidth);
            circles[i].y = Math.round(Math.random() * window.innerHeight);
            circles[i].color = back_minHue + Math.round(Math.random() * (back_maxHue - back_minHue));
        }

        ctx.fillStyle = ctx.createRadialGradient(circles[i].x, circles[i].y, 0, circles[i].x, circles[i].y, Math.round(back_startRadius + Math.sin(circles[i].r * Math.PI) * (back_endRadius - back_startRadius)));
        ctx.fillStyle.addColorStop(0, 'hsla(' + circles[i].color + ', 100%, 15%, '+Math.round(Math.min(100, (1-Math.abs(1-circles[i].r*2))*140))+'%)');
        ctx.fillStyle.addColorStop(1, 'hsla(' + circles[i].color + ', 100%, 15%, 0)');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}, 1000 / 30);