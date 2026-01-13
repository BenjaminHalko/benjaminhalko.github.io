// Background animation with floating gradient circles

interface Circle {
  x: number;
  y: number;
  r: number;
  color: number;
}

const NUM_CIRCLES = 5;
const MIN_HUE = 190;
const MAX_HUE = 285;
const SPEED = 0.05;
const START_RADIUS = 200;
const END_RADIUS = 500;

// Setup the canvas
document.body.style.background = 'black';
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.style.cssText = 'position:fixed;left:0;top:0;z-index:-1';
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d')!;
let lastTime = 0;
let dir = 0;

// Create the circles
const circles: Circle[] = [];
for (let i = 0; i < NUM_CIRCLES; i++) {
  circles.push({
    x: Math.round(Math.random() * Math.cos(dir * Math.PI / 180) * window.innerWidth / 2 + window.innerWidth / 2),
    y: Math.round(Math.random() * Math.sin(dir * Math.PI / 180) * window.innerHeight / 2 + window.innerHeight / 2),
    r: i / NUM_CIRCLES,
    color: MIN_HUE + Math.round(Math.random() * (MAX_HUE - MIN_HUE))
  });
  dir = (dir + 360 / NUM_CIRCLES + 50 * Math.random()) % 360;
}

function animate(timeStamp: number): void {
  // Resize the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Calculate the elapsed time since the last frame
  let elapsedTime = timeStamp - lastTime;
  lastTime = timeStamp;

  // If the elapsed time is too large, reset it
  if (elapsedTime > 500) elapsedTime = 1;

  // Clear the canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const circle of circles) {
    // Scale the animation value based on elapsed time
    circle.r += SPEED * (elapsedTime / 1000);

    if (circle.r >= 1) {
      circle.r = circle.r % 1;
      circle.x = Math.round(Math.random() * Math.cos(dir * Math.PI / 180) * window.innerWidth / 2 + window.innerWidth / 2);
      circle.y = Math.round(Math.random() * Math.sin(dir * Math.PI / 180) * window.innerHeight / 2 + window.innerHeight / 2);
      circle.color = MIN_HUE + Math.round(Math.random() * (MAX_HUE - MIN_HUE));
      dir = (dir + 360 / NUM_CIRCLES + 50 * Math.random()) % 360;
    }

    const radius = Math.round(START_RADIUS + Math.sin(circle.r * Math.PI) * (END_RADIUS - START_RADIUS));
    const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, radius);
    const alpha = Math.round(Math.min(100, (1 - Math.abs(1 - circle.r * 2)) * 140));

    gradient.addColorStop(0, `hsla(${circle.color}, 100%, 15%, ${alpha}%)`);
    gradient.addColorStop(1, `hsla(${circle.color}, 100%, 15%, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
