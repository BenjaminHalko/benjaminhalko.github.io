function cubic_bezier(x1, x2, t) {
    return 3 * x1 * t * (1 - t) * (1 - t) + 3 * x2 * t * t * (1 - t) + t * t * t;
}

var circles = [];
for (var i = 0; i < 10; i++) {
    circles.push({
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * window.innerHeight),
        r: i / 10,
        max: 300,
        color: 180 + Math.round(Math.random() * 90),
        spd: Math.random() * 0.001 + 0.002
    });
}

animatedBackground();
function animatedBackground() {
    for(var i = 0; i < circles.length; i++) {
        circles[i].r += circles[i].spd;

        if (circles[i].r > 1) {
            circles[i].r = 0;
            circles[i].x = Math.round(Math.random() * window.innerWidth);
            circles[i].y = Math.round(Math.random() * window.innerHeight);
            circles[i].color = 180 + Math.round(Math.random() * 90);
            circles[i].spd = Math.random() * 0.001 + 0.002;
        }

        circles[i].p = Math.sin(circles[i].r * Math.PI);
        console.log(circles[i].p, circles[i].r)
    }
    
    // Create a background using the circles
    var style = circles.map(function(c) {
        return 'radial-gradient(circle at ' + c.x + 'px ' + c.y + 'px, hsla(' + c.color + ', 100%, 5%, '+Math.round(Math.min(100, (1-Math.abs(1-c.r*2))*140))+'%) 0px, transparent ' + Math.round(200 + c.p * c.max) + 'px)';
    }).join(', ')+', black';
    document.body.style.background = style;
    console.log(style);

    setTimeout(animatedBackground, 30);
}