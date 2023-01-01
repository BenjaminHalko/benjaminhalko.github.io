// Background
(function() {
// Variables

const numCircles = 5;

const minHue = 190;
const maxHue = 285;

const spd = 0.05 / 30;

const startRadius = 200;
const endRadius = 500;

// ** DO NOT EDIT BELOW THIS LINE **

// Setup the canvas
document.body.style.background = "black";
document.body.innerHTML = `<canvas id='canvas' style='position:fixed;left:0;top:0;z-index:-1'></canvas>
` + document.body.innerHTML;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create the circles
var circles = [];
var dir = 0;
for (var i = 0; i < numCircles; i++) {
    circles.push({
        x: Math.round(Math.random()*Math.cos(dir * Math.PI / 180) * window.innerWidth / 2 + window.innerWidth / 2),
        y: Math.round(Math.random()*Math.sin(dir * Math.PI / 180) * window.innerHeight / 2 + window.innerHeight / 2),
        r: i / numCircles,
        color: minHue + Math.round(Math.random() * (maxHue - minHue)),
    });
    dir = (dir + 360 / numCircles + 50 * Math.random()) % 360;
}

setInterval(function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    for(var i = 0; i < circles.length; i++) {
        circles[i].r += spd;

        if (circles[i].r >= 1) {
            console.log(i);
            circles[i].r = 0;
            circles[i].x = Math.round(Math.random()*Math.cos(dir * Math.PI / 180) * window.innerWidth / 2 + window.innerWidth / 2);
            circles[i].y = Math.round(Math.random()*Math.sin(dir * Math.PI / 180) * window.innerHeight / 2 + window.innerHeight / 2);
            circles[i].color = minHue + Math.round(Math.random() * (maxHue - minHue));
            dir = (dir + 360 / numCircles + 50 * Math.random()) % 360;
        }

        ctx.fillStyle = ctx.createRadialGradient(circles[i].x, circles[i].y, 0, circles[i].x, circles[i].y, Math.round(startRadius + Math.sin(circles[i].r * Math.PI) * (endRadius - startRadius)));
        ctx.fillStyle.addColorStop(0, 'hsla(' + circles[i].color + ', 100%, 15%, '+Math.round(Math.min(100, (1-Math.abs(1-circles[i].r*2))*140))+'%)');
        ctx.fillStyle.addColorStop(1, 'hsla(' + circles[i].color + ', 100%, 15%, 0)');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}, 1000 / 30);
})();

const handleMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
};

function updateButtons() {
    for(const button of document.getElementsByClassName("button")) button.onmousemove = e => handleMouseMove(e);
}

updateButtons();