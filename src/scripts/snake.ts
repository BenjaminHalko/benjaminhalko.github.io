import videoUrl from "../res/home/video.txt?url";

export {};

const GRID_WIDTH = 20;
const GRID_HEIGHT = 7;
const START_TAIL_LENGTH = 6;

let lastDir = -1;
let dir = -1;
let head: [number, number] = [9, 3];
let apple: [number, number] = [0, 0];
let grid: [number, number][][] = [];
let tailLength = 0;
let snakeState = 0;
let snakeTimer: ReturnType<typeof setTimeout> | null = null;
let color = 100;
let appleColor = (Math.round(color + Math.random() * 300 - 150) + 180) % 360;

let logoText: HTMLElement | null = null;
let originalHtml = "";

declare global {
  interface Window {
    toggleSnake: () => void;
  }
}

window.toggleSnake = toggleSnake;

function toggleSnake(): void {
  const activeLogoText = logoText;
  if (activeLogoText === null) return;

  if (snakeTimer !== null) {
    clearTimeout(snakeTimer);
    activeLogoText.innerHTML = originalHtml;
    snakeTimer = null;
    snakeState = 0;
    tailLength = 0;
  } else if (snakeState === 3) {
    activeLogoText.innerHTML = originalHtml;
    snakeTimer = null;
  } else {
    startSnake();
  }
}

function startSnake(): void {
  const lastState = snakeState;
  head = [9, 3];
  apple = [
    Math.floor(Math.random() * GRID_WIDTH),
    Math.floor(Math.random() * GRID_HEIGHT),
  ];
  dir = -1;
  lastDir = -1;
  snakeState = 0;
  grid = Array.from({ length: GRID_HEIGHT }, () =>
    Array.from({ length: GRID_WIDTH }, (): [number, number] => [0, 0]),
  );
  color = 103;
  appleColor = (Math.round(color + Math.random() * 300 - 150) + 180) % 360;

  if (lastState === 2) {
    snakeIntro(GRID_HEIGHT + GRID_WIDTH);
  } else {
    snakeIntro(0);
  }
}

function snakeIntro(num: number): void {
  const activeLogoText = logoText;
  if (activeLogoText === null) return;

  let html = "";
  if (num === GRID_WIDTH + GRID_HEIGHT + 3) {
    activeLogoText.style.setProperty("--color", `hsl(${color}, 100%, 50%)`);
    html = `
● ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ●<br>
|<span>  _______ __   _ ______ _     _ _______  </span>|<br>
|<span>  |______ | \\  | |____| |____/  |______  </span>|<br>
|<span>  ______| |  \\_| |    | |    \\_ |______  </span>|<br>
|                                         |<br>
|                                         |<br>
|<span>       Press any arrow key to start      </span>|<br>
|                                         |<br>
● ─ Score: ${tailLength.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })} ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ●
`;
    displaySnake(html.replace(/ /g, "&nbsp;"));
  } else {
    html += "● ";
    for (let i = 0; i < Math.min(num, GRID_WIDTH); i++) html += "─ ";
    if (num >= GRID_WIDTH) html += "●";
    html += "<br>";

    for (let i = 0; i < GRID_HEIGHT; i++) {
      if (num >= GRID_HEIGHT - i + GRID_WIDTH) html += "|";
      else html += " ";
      for (let j = 0; j < GRID_WIDTH; j++) html += "  ";
      if (num > i + GRID_WIDTH) html += " |";
      else html += " ";
      html += "<br>";
    }
    if (num >= GRID_WIDTH) html += "● ";
    else html += "  ";
    for (let i = 0; i < GRID_WIDTH; i++) {
      if (i > GRID_WIDTH - num) {
        if (i === 1) html += "Sc";
        else if (i === 2) html += "or";
        else if (i === 3) html += "e:";
        else if (i === 4) html += " 0";
        else if (i === 5) html += "0 ";
        else html += "─ ";
      } else {
        html += "  ";
      }
    }
    html += "●";
    displaySnake(html.replace(/ /g, "&nbsp;"));
    snakeTimer = setTimeout(() => snakeIntro(num + 1), 10);
  }
}

function snake(): void {
  const activeLogoText = logoText;
  if (activeLogoText === null) return;

  if (dir !== lastDir) {
    if ((dir + lastDir) % 2 === 0 && lastDir !== -1) {
      dir = lastDir;
    } else {
      if ((dir === 1 && lastDir === 2) || (lastDir === 3 && dir === 0))
        grid[head[1]][head[0]][1] = 4;
      else if ((dir === 2 && lastDir === 1) || (lastDir === 0 && dir === 3))
        grid[head[1]][head[0]][1] = 2;
      else if ((dir === 3 && lastDir === 2) || (lastDir === 1 && dir === 0))
        grid[head[1]][head[0]][1] = 3;
      else grid[head[1]][head[0]][1] = 5;
      lastDir = dir;
    }
  }
  head[0] += dir === 1 ? 1 : dir === 3 ? -1 : 0;
  head[1] += dir === 2 ? 1 : dir === 0 ? -1 : 0;
  if (head[0] === GRID_WIDTH) head[0] = 0;
  else if (head[0] === -1) head[0] = GRID_WIDTH - 1;
  if (head[1] === GRID_HEIGHT) head[1] = 0;
  else if (head[1] === -1) head[1] = GRID_HEIGHT - 1;
  grid[head[1]][head[0]][1] = dir % 2;

  if (
    grid[head[1]][head[0]][0] > 0 &&
    head[0] !== apple[0] &&
    head[1] !== apple[1]
  ) {
    apple = [0, -1];
    snakeState = 2;
    drawSnake();
    snakeDeath();
    return;
  }

  if (head[0] === apple[0] && head[1] === apple[1]) {
    apple = [
      Math.floor(Math.random() * GRID_WIDTH),
      Math.floor(Math.random() * GRID_HEIGHT),
    ];
    while (grid[apple[1]][apple[0]][0] > 0) {
      apple = [
        Math.floor(Math.random() * GRID_WIDTH),
        Math.floor(Math.random() * GRID_HEIGHT),
      ];
    }
    tailLength += 1;
    color = appleColor;
    appleColor = (Math.round(color + Math.random() * 300 - 150) + 180) % 360;
    activeLogoText.style.setProperty("--color", `hsl(${color}, 100%, 70%)`);

    for (let i = 0; i < GRID_HEIGHT; i++) {
      for (let j = 0; j < GRID_WIDTH; j++) {
        if (grid[i][j][0] > 0) grid[i][j][0] += 1;
      }
    }
  }

  grid[head[1]][head[0]][0] = START_TAIL_LENGTH + tailLength;

  drawSnake();

  snakeTimer = setTimeout(snake, Math.max(150 - tailLength * 5, 70));
}

function drawSnake(explode = -1): void {
  const chars = "|─┐┘└┌";
  const explosionChars = " .:-=+*#%@";
  let html = "● ";
  for (let j = 0; j < GRID_WIDTH; j++) html += "─ ";
  html += "●<br>";
  for (let i = 0; i < GRID_HEIGHT; i++) {
    html += "|<span> ";
    for (let j = 0; j < GRID_WIDTH; j++) {
      if (explode === -1) {
        if (i === head[1] && j === head[0]) {
          if (dir === 0) html += "▲ ";
          else if (dir === 1) html += "► ";
          else if (dir === 2) html += "▼ ";
          else if (dir === 3) html += "◄ ";
        } else if (i === apple[1] && j === apple[0]) {
          html = html.slice(0, -1);
          html += "<○>";
        } else if (grid[i][j][0] > 0) {
          grid[i][j][0] -= 1;
          html += chars[grid[i][j][1]] + " ";
        } else {
          html += "  ";
        }
      } else {
        const dist = Math.abs(i - head[1]) + Math.abs(j - head[0]);
        if (dist <= explode) {
          html +=
            explosionChars[
              Math.floor(
                Math.random() *
                  Math.max(
                    0,
                    Math.min(explosionChars.length * 3, 30 + dist - explode) %
                      explosionChars.length,
                  ),
              )
            ] + " ";
        } else {
          html += "  ";
        }
      }
    }
    html += "</span>|<br>";
  }
  html +=
    "● ─ Score: " +
    tailLength.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    " ";
  for (let j = 0; j < GRID_WIDTH - 6; j++) html += "─ ";
  html += "●";

  displaySnake(
    html
      .replace(/ /g, "&nbsp;")
      .replace(
        /<○>/g,
        `<span style='color: hsl(${appleColor}, 100%, 80%)'><○></span>`,
      ),
  );
}

function snakeDeath(): void {
  const activeLogoText = logoText;
  if (activeLogoText === null) return;

  activeLogoText.style.setProperty(
    "--color",
    `hsl(${Math.round(Math.random() * 40)}, 100%, 50%)`,
  );

  if (++apple[0] > 45 + START_TAIL_LENGTH + tailLength) {
    drawSnake(apple[0] - (45 + START_TAIL_LENGTH + tailLength));
    if (apple[0] > 100 + START_TAIL_LENGTH + tailLength) {
      startSnake();
      return;
    }
  } else if (apple[0] > 25) {
    if (apple[0] > 25 + START_TAIL_LENGTH + tailLength) dir = (dir + 1) % 4;
    drawSnake();
  }
  snakeTimer = setTimeout(snakeDeath, 20);
}

function displaySnake(text: string): void {
  const activeLogoText = logoText;
  if (activeLogoText === null) return;

  activeLogoText.innerHTML = `<p style='font-family: monospace, monospace; line-height: 20px; font-size: 14px'>${text}</p>`;
}

function isSnakeActive(): boolean {
  return snakeTimer !== null || snakeState === 3;
}

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (logoText === null) return;

  let key = -1;
  if (event.key === "ArrowDown") key = 2;
  else if (event.key === "ArrowUp") key = 0;
  else if (event.key === "ArrowLeft") key = 3;
  else if (event.key === "ArrowRight") key = 1;

  if (key !== -1 && isSnakeActive()) event.preventDefault();

  if (key !== -1 && snakeState !== 3) {
    if (key === code[codePos]) {
      codePos++;
      if (codePos === code.length) {
        codePos = 0;
        void loadVideoData().then((data) => {
          if (data === null) return;
          videoData = data;
          playVideo();
        });
      }
    } else if (codePos !== 2 || key !== 0) {
      codePos = 0;
    }
  }

  if (snakeState === 2) return;
  dir = key;

  if (key !== -1) {
    if (snakeTimer !== null && snakeState === 0) {
      snakeState = 1;
      tailLength = 0;
      snake();
    }
  }
});

const code = [0, 0, 2, 2, 3, 1, 3, 1];
let codePos = 0;
let videoData: string | null = null;
let vidIndex = 0;
const VIDEO_WIDTH = 40;
const VIDEO_HEIGHT = 17;

/* Deliberately NOT fetched on page load: this payload is ~500 KB, which was
   two thirds of the homepage's transfer weight and contended with the LCP
   image for bandwidth. It is only needed once the code above is entered. */
let videoRequest: Promise<string | null> | null = null;

function loadVideoData(): Promise<string | null> {
  videoRequest ??= fetch(videoUrl)
    .then((response) => (response.ok ? response.text() : null))
    .catch(() => null);
  return videoRequest;
}

function playVideo(): void {
  snakeState = 3;
  vidIndex = 0;
  if (snakeTimer) clearTimeout(snakeTimer);
  snakeTimer = setInterval(video, 1000 / 25);
}

function video(): void {
  const activeLogoText = logoText;
  if (!videoData || activeLogoText === null) return;

  let html = "";

  for (let i = 0; i < VIDEO_HEIGHT; i++) {
    for (let j = 0; j < VIDEO_WIDTH * 7; j += 7) {
      const num = vidIndex + i * VIDEO_WIDTH * 7 + j;
      html += `<span style="color: #${videoData.slice(num + 1, num + 7)}">${videoData[num]}</span>`;
    }
    if (i !== VIDEO_HEIGHT - 1) html += "<br>";
  }

  activeLogoText.innerHTML = `
    <div style="display: flex; font-family: monospace, monospace;">
    <p style="margin-right: 2px; line-height: 21px; text-align: right; color: cyan">||<br>|||<br>||||<br>||<||<br>||||<br>|||<br>||</p>
    <p style='line-height: 10px; font-size: 10px'>${html}</p>
    <p style="margin-left: 2px; line-height: 21px; color: cyan">||<br>|||<br>||||<br>||>||<br>||||<br>|||<br>||</p>
    </div>
  `;

  vidIndex += VIDEO_WIDTH * VIDEO_HEIGHT * 7;
  if (vidIndex >= videoData.length) vidIndex = 0;
}

function setupSnake(): void {
  const nextLogoText = document.getElementById("logoContent");
  if (nextLogoText === logoText) return;

  logoText = nextLogoText;
  originalHtml = nextLogoText?.innerHTML ?? "";
}

function teardownSnake(): void {
  if (snakeTimer !== null) clearTimeout(snakeTimer);

  snakeTimer = null;
  snakeState = 0;
  tailLength = 0;
  dir = -1;
  lastDir = -1;
  codePos = 0;
  logoText = null;
  originalHtml = "";
}

document.addEventListener("astro:page-load", setupSnake);
document.addEventListener("astro:before-swap", teardownSnake);
