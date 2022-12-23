var circles = [];

for (var i = 0; i < 5; i++) {
    circles.push({
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * window.innerHeight),
        r: i / 5,
        max: 300,
        color: 190 + Math.round(Math.random() * 95),
        spd: 0.0025//Math.random() * 0.001 + 0.002
    });
}

animatedBackground();
function animatedBackground() {
    for(var i = 0; i < circles.length; i++) {
        circles[i].r += circles[i].spd;

        if (circles[i].r >= 1) {
            circles[i].r = 0;
            circles[i].x = Math.round(Math.random() * window.innerWidth);
            circles[i].y = Math.round(Math.random() * window.innerHeight);
            circles[i].color = 190 + Math.round(Math.random() * 95);
            circles[i].spd = 0.0025;//Math.random() * 0.001 + 0.002;
        }

        circles[i].p = Math.sin(circles[i].r * Math.PI);
    }
    
    // Create a background using the circles
    var style = circles.map(function(c) {
        return 'radial-gradient(circle at ' + c.x + 'px ' + c.y + 'px, hsla(' + c.color + ', 100%, 15%, '+Math.round(Math.min(100, (1-Math.abs(1-c.r*2))*140))+'%) 0px, transparent ' + Math.round(200 + c.p * c.max) + 'px) fixed';
    }).join(', ')+', black';


    document.body.style.background = style;

    setTimeout(animatedBackground, 30);
}