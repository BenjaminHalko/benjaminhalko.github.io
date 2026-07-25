// Hover/focus prefetch for browsers WITHOUT the Speculation Rules API
// (Firefox, Safari): having the destination document in the HTTP cache before
// the click lands still shortens the navigation the view transition has to
// cover. Chromium exits early - it gets full prerendering from the
// <script type="speculationrules"> block instead.
//
// Compiled at build time (see components/TransitionScripts.tsx) and injected
// as an INLINE CLASSIC script: NO import/export statements allowed here.

(() => {
  const supports = (
    HTMLScriptElement as { supports?: (type: string) => boolean }
  ).supports;
  if (supports && supports("speculationrules")) return;

  const seen = new Set<string>();

  const prefetch = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest<HTMLAnchorElement>("a[href]");
    if (
      !anchor ||
      anchor.origin !== location.origin ||
      anchor.target ||
      anchor.hasAttribute("download") ||
      anchor.hasAttribute("data-no-prerender") ||
      seen.has(anchor.href)
    ) {
      return;
    }
    seen.add(anchor.href);

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = anchor.href;
    document.head.appendChild(link);
  };

  addEventListener("pointerover", prefetch, { passive: true });
  addEventListener("focusin", prefetch);
})();
