// Constant Variables
const gridWidth = 20;
const gridHeight = 7;
const startTailLength = 6;

// Variable Variables
var lastDir = 0;
var dir = 0; // 0 = up, 1 = right, 2 = down, 3 = left
var head = [];
var apple = [];
var grid = [];
var tailLength = 0;
var grid;
var snakeState = 0;
var snakeTimer = null;
var color = 100;
var appleColor = (Math.round(color+Math.random()*300-150) + 180) % 360;

// Get IDs
const logoText = document.getElementById("logoContent");
const originalHtml = logoText.innerHTML;

// Functions
function toggleSnake() {
    if (snakeTimer != null) {
        clearInterval(snakeTimer);
        logoText.innerHTML = originalHtml;
        snakeTimer = null;
        snakeState = 0;
        tailLength = 0;
    } else {
        StartSnake();
    }
}

function StartSnake() {
    // Reset Variables
    var lastState = snakeState;
    head = [9, 3];
    apple = [Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight)];
    dir = -1;
    lastDir = -1;
    snakeState = 0;
    grid = Array.apply(null, Array(gridHeight)).map(function () {
        return Array.apply(null, Array(gridWidth)).map(function () {
            return [0, 0];
        });
    });
    color = 103;
    appleColor = (Math.round(color+Math.random()*300-150) + 180) % 360;

    if (lastState == 2) SnakeIntro(gridHeight+gridWidth);
    else SnakeIntro(0);
}

function SnakeIntro(num) {
    var html = "";
    if (num == gridWidth+gridHeight+3) {
        logoText.style.setProperty("--color", "hsl(" + color + ", 100%, 50%)");
        html = `
● ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ●<br>
|<span>  _______ __   _ ______ _     _ _______  </span>|<br>
|<span>  |______ | \\  | |____| |____/  |______  </span>|<br>
|<span>  ______| |  \\_| |    | |    \\_ |______  </span>|<br>
|                                         |<br>
|                                         |<br>
|<span>       Press any arrow key to start      </span>|<br>
|                                         |<br>
● ─ Score: ${tailLength.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})} ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ●
`
        displaySnake(html.replace(/ /g, "&nbsp;"));
    } else {
        html += "● "
        for(var i = 0; i < Math.min(num, gridWidth); i++) html += "─ ";
        if (num >= gridWidth) html += "●";
        html += "<br>";

        for(var i = 0; i < gridHeight; i++) {
            if (num >= gridHeight - i + gridWidth) html += "|";
            else html += " ";
            for(var j = 0; j < gridWidth; j++) html += "  ";
            if (num > i + gridWidth) html += " |";
            else html += " ";
            html += "<br>";
        }
        if (num >= gridWidth) html += "● ";
        else html += "  ";
        for(var i = 0; i < gridWidth; i++) {
            if (i > gridWidth - num) {
                if (i == 1) html += "Sc";
                else if (i == 2) html += "or";
                else if (i == 3) html += "e:";
                else if (i == 4) html += " 0";
                else if (i == 5) html += "0 ";
                else html += "─ ";

            }
            else html += "  ";
        }
        html += "●";
        displaySnake(html.replace(/ /g, "&nbsp;"));
        snakeTimer = setTimeout(SnakeIntro, 10, num + 1);
    }
}

function Snake() {
    // Snake Movement
    if (dir != lastDir) {
        if ((dir + lastDir) % 2 == 0 && lastDir != -1) dir = lastDir;
        else {
            if ((dir == 1 && lastDir == 2) || (lastDir == 3 && dir == 0)) grid[head[1]][head[0]][1] = 4;
            else if ((dir == 2 && lastDir == 1) || (lastDir == 0 && dir == 3)) grid[head[1]][head[0]][1] = 2;
            else if ((dir == 3 && lastDir == 2) || (lastDir == 1 && dir == 0)) grid[head[1]][head[0]][1] = 3;
            else grid[head[1]][head[0]][1] = 5;
            lastDir = dir;
        }
    }
    head[0] += dir == 1 ? 1 : dir == 3 ? -1 : 0;
    head[1] += dir == 2 ? 1 : dir == 0 ? -1 : 0;
    if (head[0] == gridWidth) head[0] = 0;
    else if (head[0] == -1) head[0] = gridWidth - 1;
    if (head[1] == gridHeight) head[1] = 0;
    else if (head[1] == -1) head[1] = gridHeight - 1;
    grid[head[1]][head[0]][1] = dir % 2;

    // Collision Detection
    if (grid[head[1]][head[0]][0] > 0 && head[0] != apple[0] && head[1] != apple[1]) {
        //Use apple[0] to hold death animation frame
        apple = [0, -1];
        snakeState = 2;
        DrawSnake();
        SnakeDeath();
        return;
    }

    // Apple Detection
    if (head[0] == apple[0] && head[1] == apple[1]) {
        apple = [Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight)];
        while (grid[apple[1]][apple[0]][0] > 0) {
            apple = [Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight)];
        }
        tailLength += 1;
        color = appleColor;
        appleColor = (Math.round(color+Math.random()*300-150) + 180) % 360;
        logoText.style.setProperty("--color","hsl(" + color + ", 100%, 70%)");

        for(var i = 0; i < gridHeight; i++) {
            for(var j = 0; j < gridWidth; j++) {
                if (grid[i][j][0] > 0) grid[i][j][0] += 1;
            }
        }
    }

    // Tail
    grid[head[1]][head[0]][0] = startTailLength+tailLength;
    
    // Draw Grid
    DrawSnake();

    snakeTimer = setTimeout(Snake, Math.max(150-tailLength*5, 70));
}

function DrawSnake(explode=-1) {
    const chars = "|─┐┘└┌";
    const explosionChars = " .:-=+*#%@";
    var html = "● ";
    for(var j = 0; j < gridWidth; j++) html += "─ ";
    html += "●<br>";
    for(var i = 0; i < gridHeight; i++) {
        html += "|<span> "
        for(var j = 0; j < gridWidth; j++) {
            if (explode == -1) {
                // Draw Characters
                if (i == head[1] && j == head[0]) {
                    if (dir == 0) html += "▲ ";
                    else if (dir == 1) html += "► ";
                    else if (dir == 2) html += "▼ ";
                    else if (dir == 3) html += "◄ ";
                } 
                else if (i == apple[1] && j == apple[0]) {
                    html = html.slice(0, -1);
                    html += "<○>";
                }
                else if (grid[i][j][0] > 0) {
                    grid[i][j][0] -= 1;
                    html += chars[grid[i][j][1]]+" ";
                }
                else html += "  ";
            } else {
                var dist = Math.abs(i - head[1]) + Math.abs(j - head[0]);
                if (dist <= explode) html += explosionChars[Math.floor(Math.random() * Math.max(0, Math.min(explosionChars.length * 3, 30 + dist - explode) % explosionChars.length))]+" ";
                else html += "  ";
            }
        }
        html += "</span>|<br>";
    }
    html += "● ─ Score: " + tailLength.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})+" ";
    for(var j = 0; j < gridWidth-6; j++) html += "─ ";
    html += "●";

    displaySnake(html.replace(/ /g, "&nbsp;").replace(/<○>/g, "<span style='color: hsl("+appleColor+", 100%, 80%)'><○></span>"));
}

function SnakeDeath() {
    logoText.style.setProperty("--color","hsl(" + Math.round(Math.random() * 40) + ", 100%, 50%)");
    
    if (++apple[0] > 45+startTailLength+tailLength) {
        DrawSnake(apple[0] - (45+startTailLength+tailLength));
        if (apple[0] > 100+startTailLength+tailLength) {
            StartSnake();
            return;
        }
    } else if (apple[0] > 25) {
        if (apple[0] > 25+startTailLength+tailLength) dir = (dir + 1) % 4;
        DrawSnake();
    }
    snakeTimer = setTimeout(SnakeDeath, 20);
}

// Other Functions
function displaySnake(text) {
    logoText.innerHTML = "<p style='font-family: monospace, monospace; line-height: 20px; font-size: 14px'>"+text+"</p>";
}

// Event Listeners
document.addEventListener('keydown', function(event) {
    if(snakeState == 2) return;
    if(event.key == "ArrowDown") dir = 2;
    else if(event.key == "ArrowUp") dir = 0;
    else if(event.key == "ArrowLeft") dir = 3;
    else if(event.key == "ArrowRight") dir = 1;

    if (event.key == "ArrowDown" || event.key == "ArrowUp" || event.key == "ArrowLeft" || event.key == "ArrowRight") {
        if (snakeTimer != null && snakeState == 0) {
            snakeState = 1;
            tailLength = 0;
            Snake();
        }
    }
});