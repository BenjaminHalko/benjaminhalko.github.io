export { };

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    // Parallax Background (Global)
    // Since bg is position: absolute (scrolls with page), we move the texture DOWN
    // to counteract the upward scroll, creating a "slower" scroll effect.
    // 0.8 means the pattern moves at 1.0 - 0.8 = 0.2 speed relative to viewport.
    const parallaxBg = document.querySelector(".parallax-bg") as HTMLElement | null;
    if (parallaxBg) {
        parallaxBg.style.backgroundPositionY = scrolled * 0.8 + "px";
    }

    // Parallax Hero Content (Faster/Stronger effect)
    const heroContent = document.querySelector(".hero-content") as HTMLElement | null;
    if (heroContent) {
        // translate Y down to create a distinct depth layer
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = (1 - scrolled / 700).toString(); // Fade out too
    }
});
