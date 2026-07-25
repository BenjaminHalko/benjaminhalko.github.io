// Tags each cross-document view transition with a direction ('forward' |
// 'back') so view-transitions.css can pick the matching slide, skips the
// transition entirely under prefers-reduced-motion, and marks the incoming
// document with data-vt-navigation so the navbar's one-shot drop-in animation
// is suppressed on navigation (html[data-vt-navigation] .navbar in navbar.css).
// The marker is intentionally never removed - the page arrived via navigation
// for the rest of its life.
//
// This file is compiled at build time (see components/TransitionScripts.tsx)
// and injected as an INLINE CLASSIC script in <head>, before any stylesheet:
// `pagereveal` fires before the incoming document's first render, earlier than
// any deferred module could run. It must therefore stay a side-effect-only
// script: NO import/export statements.

// The Navigation API surface we touch, typed locally so this file does not
// depend on lib.dom shipping the (still new) NavigationActivation types.
interface VtHistoryEntry {
  readonly index: number;
  readonly url: string | null;
}

interface VtActivation {
  readonly from?: VtHistoryEntry | null;
  readonly entry?: VtHistoryEntry | null;
  readonly navigationType?: string;
}

interface VtViewTransition {
  readonly types?: Set<string>;
  skipTransition(): void;
}

interface VtPageTransitionEvent extends Event {
  readonly viewTransition?: VtViewTransition | null;
  readonly activation?: VtActivation | null;
}

(() => {
  // Product decision: a normal link to the home page reads as going "back",
  // even though it pushes a new history entry.
  const HOME_PATH = "/";

  const directionFor = (activation: VtActivation | null | undefined): string | null => {
    if (!activation) return null;

    const from = activation.from;
    const entry = activation.entry;

    // Browser back/forward: trust real history order.
    if (
      activation.navigationType === "traverse" &&
      from &&
      entry &&
      from.index >= 0 &&
      entry.index >= 0 &&
      from.index !== entry.index
    ) {
      return entry.index < from.index ? "back" : "forward";
    }

    try {
      if (entry?.url && new URL(entry.url).pathname === HOME_PATH) return "back";
    } catch {
      // Unparseable URL: fall through to the default.
    }
    return "forward";
  };

  const configure = (
    transition: VtViewTransition | null | undefined,
    activation: VtActivation | null | undefined,
  ): void => {
    if (!transition) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      transition.skipTransition();
      return;
    }

    const direction = directionFor(activation);
    if (direction && transition.types) transition.types.add(direction);
  };

  addEventListener("pageswap", (event) => {
    const e = event as VtPageTransitionEvent;
    configure(e.viewTransition, e.activation);
  });

  addEventListener("pagereveal", (event) => {
    const e = event as VtPageTransitionEvent;
    if (e.viewTransition) document.documentElement.dataset.vtNavigation = "";
    const nav = (globalThis as { navigation?: { activation?: VtActivation | null } }).navigation;
    configure(e.viewTransition, nav?.activation);
  });
})();
