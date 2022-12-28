// Constant Variables
const snakeSpd = 1;
const gridWidth = 20;
const gridHeight = 6;

// Variable Variables
var lastDir = 0;
var dir = 0; // 0 = up, 1 = right, 2 = down, 3 = left
var head = [];
var apple = [];
var grid = [];
var tailLength = 0;
for(var i = 0; i < gridHeight; i++) grid[i] = [];

// Get IDs
const logoText = document.getElementById("logoContent");
const originalHtml = logoText.innerHTML;

var snakeInterval = null;
function toggleSnake() {
    if (snakeInterval != null) {
        clearInterval(snakeInterval);
        logoText.innerHTML = originalHtml;
        snakeInterval = null;
    } else {
        StartSnake();
    }
}

const StartSnake = function() {
    // Reset Variables
    head = [Math.round(Math.random() * gridWidth), Math.round(Math.random() * gridHeight)];
    apple = [Math.round(Math.random() * gridWidth), Math.round(Math.random() * gridHeight)];
    tailLength = 0;
    for(var i = 0; i < gridHeight; i++) {
        for(var j = 0; j < gridWidth; j++) {
            grid[i][j] = [0, 0];
        }
    }

    Snake();
}

const Snake = function() {
    // Snake Movement
    if (dir != lastDir) {
        grid[head[1]][head[0]][1] = 2;
        lastDir = dir;
    }
    head[0] += dir == 1 ? 1 : dir == 3 ? -1 : 0;
    head[1] += dir == 2 ? 1 : dir == 0 ? -1 : 0;
    if (head[0] == gridWidth) head[0] = 0;
    else if (head[0] == -1) head[0] = gridWidth - 1;
    if (head[1] == gridHeight) head[1] = 0;
    else if (head[1] == -1) head[1] = gridHeight - 1;
    grid[head[1]][head[0]][1] = dir % 2;


    // Collision Detection
    if (grid[head[1]][head[0]][0] > 0) {
        clearInterval(snakeInterval);
        StartSnake();
        return;
    }

    // Apple Detection
    if (head[0] == apple[0] && head[1] == apple[1]) {
        apple[0] = Math.floor(Math.random() * gridWidth);
        apple[1] = Math.floor(Math.random() * gridHeight);
        while (grid[apple[1]][apple[0]][0] > 0) {
            apple[0] = Math.floor(Math.random() * gridWidth);
            apple[1] = Math.floor(Math.random() * gridHeight);
        }
        tailLength += 1;

        for(var i = 0; i < gridHeight; i++) {
            for(var j = 0; j < gridWidth; j++) {
                if (grid[i][j][0] > 0) grid[i][j][0] += 1;
            }
        }
    }

    grid[head[1]][head[0]][0] = 4+tailLength;
    

    // Draw Grid
    var html = "<p style='font-family: monospace, monospace; line-height: 20px; font-size: 14px'>. ";
    for(var j = 0; j < gridWidth; j++) html += "- ";
    html += ".<br>";
    for(var i = 0; i < gridHeight; i++) {
        html += "| "
        for(var j = 0; j < gridWidth; j++) {
            if (i == head[1] && j == head[0]) {
                html += "@&nbsp;";
            } 
            else if (i == apple[1] && j == apple[0]) {
                html += "O&nbsp;";
            }
            else if (grid[i][j][0] > 0) {
                grid[i][j][0] -= 1;
                if(grid[i][j][1] == 2) html += ".&nbsp;";
                else if(grid[i][j][1] == 0) html += "|&nbsp;";
                else html += "-&nbsp;";
            }
            else {
                html += "&nbsp;&nbsp;";
            }
            
        }
        html += "|<br>";
    }
    html += ". - - - Score: " + tailLength.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})+" ";
    for(var j = 0; j < gridWidth-8; j++) html += "- ";
    html += ".<br>";

    logoText.innerHTML = html;

    snakeInterval = setTimeout(Snake, Math.max(200-tailLength*5, 50));
}

document.addEventListener('keydown', function(event) {
    if(event.key == "ArrowDown") dir = 2;
    else if(event.key == "ArrowUp") dir = 0;
    else if(event.key == "ArrowLeft") dir = 3;
    else if(event.key == "ArrowRight") dir = 1;
});