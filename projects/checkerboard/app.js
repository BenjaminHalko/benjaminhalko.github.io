const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const squareSize = 100;
let lastTime = 0;
let dir = Math.random() * 360;
let spd = 0;
let turnSpd = 0;
let xMove = 0;
let yMove = 0;
let hasAppeared = {};
let start = false;
let color = 'white';
let startTime = 0;

const dvd = [];

for(element of document.getElementsByClassName("dvd")) {
    dvd.push({
        element: element,
        xDir: Math.random() > 0.5 ? 1 : -1,
        yDir: Math.random() > 0.5 ? 1 : -1,
    });
}

dvd[0].spd = 0.2;
dvd[1].spd = 0.3;

function animate(timeStamp) {
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Request next frame
    requestAnimationFrame(animate);

    // Get delta time
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (deltaTime > 500) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw squares
    if (!start) {
        // Add squares
        const squareNumW = Math.ceil(canvas.width / squareSize);
        const squareNumH = Math.ceil(canvas.height / squareSize);
        const num = Object.keys(hasAppeared).length;

        if (num < squareNumW * squareNumH / 2 && (num > 3 || timeStamp % 500 < (timeStamp - deltaTime) % 500)) {
            let x, y;
            do {
            x = Math.floor(Math.random() * squareNumW);
            y = Math.floor(Math.random() * squareNumH);
            } while ((x + y) % 2 == 1 || `${x}-${y}` in hasAppeared);
            hasAppeared[`${x}-${y}`] = 0;
        }

        // Draw squares
        start = true;
        for (let x = 0; x < squareNumW; x++) {
            for (let y = x % 2; y < squareNumH; y += 2) {
                if (`${x}-${y}` in hasAppeared) {
                    hasAppeared[`${x}-${y}`] = Math.min(1, hasAppeared[`${x}-${y}`] + 0.01 * deltaTime);
                    ctx.fillStyle = "white";
                    ctx.fillRect(x * squareSize + (squareSize / 2 * (1 - hasAppeared[`${x}-${y}`])), y * squareSize + (squareSize / 2 * (1 - hasAppeared[`${x}-${y}`])), squareSize * hasAppeared[`${x}-${y}`], squareSize * hasAppeared[`${x}-${y}`]);
                    if (hasAppeared[`${x}-${y}`] < 1) start = false;
                } else start = false;
            }
        }
        startTime = timeStamp;
    } else {
        // Increase speed
        spd += 0.004 * deltaTime;
        spd = Math.min(spd, 30);

        // Increase turn speed
        turnSpd += 0.0001 * deltaTime;
        turnSpd = Math.min(turnSpd, 0.04);
        
        // Increase direction
        dir = (dir + deltaTime * turnSpd) % 360;

        // Increase xMove and yMove based on the direction (in degrees) and move
        xMove += (Math.cos(dir * Math.PI / 180) * spd) % (squareSize * 2);
        yMove += (Math.sin(dir * Math.PI / 180) * spd) % (squareSize * 2);
        if (xMove < 0) xMove += squareSize * 4;
        if (yMove < 0) yMove += squareSize * 4;

        // Change color every 100 milliseconds, after 5 seconds
        if ((timeStamp - startTime) > 8000 && timeStamp % 50 < (timeStamp - deltaTime) % 50) color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
        
        // Draw squares
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        for (let x = -squareSize * 8 - xMove; x < canvas.width + squareSize * 4; x += squareSize) {
            for (let y = (x + xMove) % (squareSize * 2) - squareSize * 4 - yMove; y < canvas.height + squareSize * 4; y += squareSize * 2) {
                ctx.fillRect(x , y, squareSize, squareSize);
            }
        }


        // DVD Logo
        dvd.forEach(e => {
            e.element.style.left = e.element.offsetLeft + e.spd * e.xDir * deltaTime + "px";
            e.element.style.top = e.element.offsetTop + e.spd * e.yDir * deltaTime + "px";

            if (e.element.offsetLeft >= window.innerWidth - e.element.offsetWidth / 2 - 1) e.xDir = -1;
            if (e.element.offsetLeft <= e.element.offsetWidth / 2 ) e.xDir = 1;
            if (e.element.offsetTop >= window.innerHeight - e.element.offsetHeight / 2 - 1) e.yDir = -1;
            if (e.element.offsetTop <= e.element.offsetHeight / 2) e.yDir = 1;
        });
    }
}

requestAnimationFrame(animate);