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

let animationFrameId: number | null = null;
let resizeHandler: (() => void) | null = null;

function setup(): void {
  if (
    document.querySelector('[data-animated-bg]') === null ||
    animationFrameId !== null
  ) {
    return;
  }

  document.body.style.background = 'black';

  let canvas = document.getElementById('canvas');
  if (canvas === null) {
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.style.cssText = 'position:fixed;left:0;top:0;z-index:-1';
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const activeCanvas: HTMLCanvasElement = canvas;

  const ctx = activeCanvas.getContext('2d');
  if (ctx === null) return;
  const drawingContext: CanvasRenderingContext2D = ctx;

  let lastTime = 0;
  let dir = 0;
  let canvasW = 0;
  let canvasH = 0;

  function resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w !== canvasW || h !== canvasH) {
      canvasW = w;
      canvasH = h;
      activeCanvas.width = w;
      activeCanvas.height = h;
    }
  }

  resizeHandler = resize;
  window.addEventListener('resize', resize);
  resize();

  const circles: Circle[] = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    circles.push({
      x: Math.round(Math.random() * Math.cos(dir * Math.PI / 180) * canvasW / 2 + canvasW / 2),
      y: Math.round(Math.random() * Math.sin(dir * Math.PI / 180) * canvasH / 2 + canvasH / 2),
      r: i / NUM_CIRCLES,
      color: MIN_HUE + Math.round(Math.random() * (MAX_HUE - MIN_HUE))
    });
    dir = (dir + 360 / NUM_CIRCLES + 50 * Math.random()) % 360;
  }

  function animate(timeStamp: number): void {
    resize();

    let elapsedTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (elapsedTime > 500) elapsedTime = 1;

    drawingContext.clearRect(0, 0, canvasW, canvasH);

    for (const circle of circles) {
      circle.r += SPEED * (elapsedTime / 1000);

      if (circle.r >= 1) {
        circle.r = circle.r % 1;
        circle.x = Math.round(Math.random() * Math.cos(dir * Math.PI / 180) * canvasW / 2 + canvasW / 2);
        circle.y = Math.round(Math.random() * Math.sin(dir * Math.PI / 180) * canvasH / 2 + canvasH / 2);
        circle.color = MIN_HUE + Math.round(Math.random() * (MAX_HUE - MIN_HUE));
        dir = (dir + 360 / NUM_CIRCLES + 50 * Math.random()) % 360;
      }

      const radius = START_RADIUS + Math.sin(circle.r * Math.PI) * (END_RADIUS - START_RADIUS);
      const alpha = Math.min(1, (1 - Math.abs(1 - circle.r * 2)) * 1.4);

      const gradient = drawingContext.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, radius);
      gradient.addColorStop(0, `hsla(${circle.color}, 100%, 15%, ${alpha})`);
      gradient.addColorStop(1, `hsla(${circle.color}, 100%, 15%, 0)`);

      drawingContext.fillStyle = gradient;
      drawingContext.beginPath();
      drawingContext.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
      drawingContext.fill();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);
}

function teardown(): void {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (resizeHandler !== null) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
}

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);
