/**
 * Speculation-rules prerendering (see src/components/TransitionScripts.tsx)
 * executes a page's scripts before the user has committed to the navigation.
 * Anything with an observable side effect - an animation loop, media loading,
 * analytics - must wait until the document is actually activated, otherwise it
 * burns work for pages the user may never visit.
 *
 * Runs `run` immediately when the document is not prerendering.
 */
export function whenActivated(run: () => void): void {
  if ("prerendering" in document && document.prerendering) {
    document.addEventListener("prerenderingchange", run, { once: true });
    return;
  }

  run();
}
