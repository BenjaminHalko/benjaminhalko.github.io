const root = document.documentElement;
let navigating = false;
const navigationDelay =
  Number.parseFloat(
    getComputedStyle(root).getPropertyValue("--page-transition-navigation-delay"),
  ) || 100;
const enterDuration =
  Number.parseFloat(
    getComputedStyle(root).getPropertyValue("--page-transition-enter-duration"),
  ) || 320;
const enterTimeout = enterDuration + 50;

const clearBackgroundState = () => {
  root.removeAttribute("data-vt-background");
  root.style.removeProperty("--vt-bg-color");
  root.style.removeProperty("--vt-bg-image");
  root.style.removeProperty("--vt-bg-position");
  root.style.removeProperty("--vt-bg-size");
  root.style.removeProperty("--vt-bg-repeat");
  root.style.removeProperty("--vt-bg-attachment");
};

const clearTransitionState = () => {
  root.removeAttribute("data-vt-pending");
  root.removeAttribute("data-vt-enter");
  root.removeAttribute("data-vt-exit");
  clearBackgroundState();
  navigating = false;
};

const saveBackgroundState = () => {
  try {
    const style = getComputedStyle(document.body);
    const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    const bgState = {
      color: style.backgroundColor,
      image: canvas
        ? `url("${canvas.toDataURL("image/jpeg", 0.65)}")`
        : style.backgroundImage,
      position: canvas ? "top left" : style.backgroundPosition,
      size: canvas ? "100vw 100vh" : style.backgroundSize,
      repeat: canvas ? "no-repeat" : style.backgroundRepeat,
      attachment: canvas ? "fixed" : style.backgroundAttachment,
    };
    sessionStorage.setItem("vt-background", JSON.stringify(bgState));
  } catch (error) {
    console.warn("Page transition background state unavailable", error);
  }
};

const applyBackgroundState = () => {
  try {
    const bgData = sessionStorage.getItem("vt-background");
    if (bgData) {
      const bgState = JSON.parse(bgData);
      if (bgState && typeof bgState === "object") {
        root.style.setProperty("--vt-bg-color", bgState.color || "");
        root.style.setProperty("--vt-bg-image", bgState.image || "");
        root.style.setProperty("--vt-bg-position", bgState.position || "");
        root.style.setProperty("--vt-bg-size", bgState.size || "");
        root.style.setProperty("--vt-bg-repeat", bgState.repeat || "");
        root.style.setProperty("--vt-bg-attachment", bgState.attachment || "");
        root.dataset.vtBackground = "";
      }
    }
  } catch (error) {
    console.warn("Page transition background state unavailable", error);
  }
};

window.addEventListener("pagehide", () => {
  try {
    const state = history.state || {};
    if (state.__vtIndex !== undefined) {
      sessionStorage.setItem("vt-prev-index", state.__vtIndex.toString());
    }
    saveBackgroundState();
  } catch (error) {
    console.warn("Page transition state unavailable", error);
  }
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    clearTransitionState();
    void root.offsetWidth;
    
    try {
      const state = history.state || {};
      const currentIndex = state.__vtIndex;
      const prevIndex = parseInt(sessionStorage.getItem("vt-prev-index") || "-1", 10);
      
      if (
        currentIndex !== undefined &&
        prevIndex !== -1 &&
        currentIndex !== prevIndex
      ) {
        const dir = currentIndex < prevIndex ? "back" : "forward";
        root.dataset.vtPending = dir;
        root.dataset.vtNavigation = "";
        
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        
        if (!prefersReducedMotion) {
          applyBackgroundState();
          scheduleEntranceAnimation(dir);
        } else {
          clearTransitionState();
        }
      }
      
      if (currentIndex !== undefined) {
        sessionStorage.setItem("vt-current-index", currentIndex.toString());
      }
    } catch (e) {
      console.warn("Page transition state unavailable", e);
    }
  }
});

const playEntranceAnimation = (direction: "back" | "forward") => {
  const main = document.querySelector("main");
  if (!main) return;

  root.removeAttribute("data-vt-pending");
  root.dataset.vtEnter = direction;
  
  let fallback: number;
  const onEnterAnimationEnd = (event: AnimationEvent) => {
    if (event.target !== main) return;
    window.clearTimeout(fallback);
    main.removeEventListener("animationend", onEnterAnimationEnd);
    clearTransitionState();
  };
  main.addEventListener("animationend", onEnterAnimationEnd);
  fallback = window.setTimeout(() => {
    main.removeEventListener("animationend", onEnterAnimationEnd);
    clearTransitionState();
  }, enterTimeout);
};

const scheduleEntranceAnimation = (direction: "back" | "forward") => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => playEntranceAnimation(direction));
  });
};

const pendingDirection = root.dataset.vtPending;
if (pendingDirection === "back" || pendingDirection === "forward") {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) {
    clearTransitionState();
  } else {
    scheduleEntranceAnimation(pendingDirection);
  }
}

document.addEventListener("click", (e) => {
  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  ) {
    return;
  }

  const anchor = (e.target as Element | null)?.closest("a");
  if (!anchor || !anchor.href) return;

  const url = new URL(anchor.href);
  if (
    url.origin !== location.origin ||
    (anchor.target && anchor.target !== "_self") ||
    anchor.hasAttribute("download") ||
    !url.protocol.startsWith("http") ||
    (url.pathname === location.pathname && url.search === location.search)
  ) {
    return;
  }

  const href = url.href;
  const main = document.querySelector("main");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!main || prefersReducedMotion) {
    return;
  }

  e.preventDefault();
  if (navigating) return;
  navigating = true;

  const isBack = url.pathname === "/";
  try {
    sessionStorage.setItem("vt-dir", isBack ? "back" : "forward");
    saveBackgroundState();
  } catch (error) {
    console.warn("Page transition state unavailable", error);
    location.assign(href);
    return;
  }
  root.dataset.vtExit = isBack ? "back" : "forward";

  setTimeout(() => {
    location.assign(href);
  }, navigationDelay);
});
