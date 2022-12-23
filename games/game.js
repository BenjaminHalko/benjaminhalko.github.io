const gameInfo = {
    "bomb": {
        "name": "You Are A Bomb",
        "github": "You-Are-A-Bomb",
        "itch": "you-are-a-bomb",
        "embed": "6092851",
        "width": 960,
        "height": 532,
        "desc": `
        <p style="font-size: 20px">Be a happy little bomb. Jump around and eat other bombs. Just don't explode, or you will be sad!</p>
        `
    },
    "shapeion": {
        "name": "Shapeion",
        "github": "Shapeion",
        "itch": "shapeion",
        "embed": "6111550",
        "width": 960,
        "height": 560,
        "desc": `
        <p>Practice shape recognition in the casual NORMAL mode or test your shape reflexes in the quick paced HARD mode!<br></p>
        <h2>Controls</h2>
        <p>Move with the mouse and hover over the desired shape to fly through it!</p>
        <p>Click on the back button in the bottom left corner to head back to the menu.<br></p>
        <h2>Mode Differences</h2>
        <p><strong>NORMAL MODE:&nbsp;</strong>This is the mode to learn about shapes! It goes at a slow pace and slowly speeds up. Great for kids 6 - 10!<br></p>
        <p><strong>HARD MODE:&nbsp;</strong>This mode is less "educational" and more quick thinking! Great for everyone!</p>
        <h2>Why I made this</h2>
        <p>I recently have seen a lot of education games that seem to be really boring, so I decided to try making an education game that was actually fun to play, even if you already know about shapes!</p>
        `
    },
};

/* DO NOT EDIT BELOW THIS LINE */
var loadedGame = "";
const active = document.getElementById('active');

function loadGameInfo(i) {
    const info = gameInfo[i];
    active.style.removeProperty('display');
    active.innerHTML = `
    
    <div class="active-content">
        <div class="active-description">
            <img class="logo" src="data/${i}/logo.png" align="center">
            ${info.desc}
            <div class="active-links">
                <button class="link" onclick="removeGame()"><h1>Back to Games</h1></button>
            </div>
        </div>
        <div>
            <div id="game" class="nonactive" style="width: ${info.width}px; height: ${info.height}px; background-image: url('data/${i}/background.png')">
                <button onclick="loadGame()">Play ${info.name}</button>
            </div>
            <div class="active-links">
                <a class="link" href="https://benjamin-halko.itch.io/${info.itch}" target="_blank" style="--col: #fa5c5c">
                    <svg><use href="/svg/itchio.svg#Capa_1"/></svg>
                    <h1>Play on itch.io</h1>
                </a>
                <a class="link" href="https://github.com/BenjaminHalko/${info.github}" target="_blank" style="--col: #0d1117">
                    <svg><use href="/svg/github.svg#Capa_1"/></svg>
                    <h1>Source Code</h1>
                </a>
            </div>
        </div>
    </div>
    `;

    loadedGame = i;
}

loadGameInfo(window.location.href.split("/#").pop())

function loadGame() {
    const info = gameInfo[loadedGame];
    const game = document.getElementById('game');
    game.classList.remove('nonactive');
    game.innerHTML = `
    <iframe frameborder="0" src="https://itch.io/embed-upload/${info.embed}?color=000000" allowfullscreen="" width="${info.width}" height="${info.height}"><a href="https://benjamin-halko.itch.io/${info.itch}">Play ${info.name} on itch.io</a></iframe>
    `;
}

function removeGame() {
    active.innerHTML = "";
    active.style.display = "none";
}