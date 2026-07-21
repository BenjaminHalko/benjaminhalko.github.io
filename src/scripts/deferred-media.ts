import gifBossWorld2 from "../pages/johnsquest/res/gifs/boss_world2.gif";
import gifFallingRocks from "../pages/johnsquest/res/gifs/falling_rocks.gif";
import gifOpening from "../pages/johnsquest/res/gifs/opening.gif";
import gifSprings from "../pages/johnsquest/res/gifs/springs.gif";
import gifSword from "../pages/johnsquest/res/gifs/sword.gif";
import gifWalking from "../pages/johnsquest/res/gifs/walking.gif";

const gifUrls: Record<string, string> = {
  springs: gifSprings,
  sword: gifSword,
  boss_world2: gifBossWorld2,
  walking: gifWalking,
  falling_rocks: gifFallingRocks,
  opening: gifOpening,
};

const deferredImages = document.querySelectorAll<HTMLImageElement>("img[data-deferred-key]");
const deferredIframes = document.querySelectorAll<HTMLIFrameElement>("iframe[data-deferred-src]");

const hydrateImage = (image: HTMLImageElement) => {
  const key = image.dataset.deferredKey;
  if (!key) {
    return;
  }

  const src = gifUrls[key];
  if (!src) {
    return;
  }

  image.src = src;
  image.removeAttribute("data-deferred-key");
};

const hydrateIframe = (iframe: HTMLIFrameElement) => {
  const src = iframe.dataset.deferredSrc;
  if (!src) {
    return;
  }

  iframe.src = src;
  iframe.removeAttribute("data-deferred-src");
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target instanceof HTMLImageElement) {
            hydrateImage(entry.target);
          } else if (entry.target instanceof HTMLIFrameElement) {
            hydrateIframe(entry.target);
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "200px 0px" }
  );

  deferredImages.forEach((el) => observer.observe(el));
  deferredIframes.forEach((el) => observer.observe(el));
} else {
  deferredImages.forEach((el) => hydrateImage(el));
  deferredIframes.forEach((el) => hydrateIframe(el));
}
