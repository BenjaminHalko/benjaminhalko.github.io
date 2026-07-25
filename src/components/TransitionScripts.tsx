/** @jsxRuntime automatic @jsxImportSource preact */
// Page transitions are driven by the native cross-document View Transition API;
// the animations live in src/styles/view-transitions.css.
//
// The browser-side logic is authored as real TypeScript in src/scripts/
// (transition-direction.ts, prefetch-fallback.ts) and compiled HERE, at build
// time, into inline classic scripts. This component only ever runs in Node
// during static rendering (via config/pages.tsx), so it can read and transpile
// those files synchronously.
//
// The scripts MUST stay inline classic scripts in <head>: `pagereveal` fires on
// the incoming document before its first render, earlier than any deferred
// `type="module"` bundle would execute - that gap is exactly what made the old
// hand-rolled transition stall in production builds.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";

const compileInlineScript = (relPath: string): string =>
  ts.transpileModule(readFileSync(resolve(process.cwd(), relPath), "utf8"), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      removeComments: true,
    },
  }).outputText;

const directionScript = compileInlineScript(
  "src/scripts/transition-direction.ts",
);
const prefetchFallbackScript = compileInlineScript(
  "src/scripts/prefetch-fallback.ts",
);

// Prerender the likely destination on hover intent so the document, its CSS and
// its scripts are already rendered by the time the navigation commits. Without
// this the transition still looks correct - the browser holds the outgoing
// frame - but that hold is itself the perceived delay.
//
// `moderate` starts on sustained hover/pointer intent rather than eagerly, so a
// page is never built just because a link exists. Opt a link out with
// `data-no-prerender`.
const speculationRules = JSON.stringify({
  prerender: [
    {
      source: "document",
      where: {
        and: [
          { href_matches: "/*" },
          {
            not: {
              selector_matches:
                'a[target], a[download], a[rel~="external"], a[data-no-prerender]',
            },
          },
        ],
      },
      eagerness: "moderate",
    },
  ],
});

export function TransitionScripts() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: directionScript }} />
      <script
        type="speculationrules"
        dangerouslySetInnerHTML={{ __html: speculationRules }}
      />
      <script dangerouslySetInnerHTML={{ __html: prefetchFallbackScript }} />
    </>
  );
}
