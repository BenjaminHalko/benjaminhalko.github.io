/** @jsxRuntime automatic @jsxImportSource preact */

// Page transitions are driven by the native cross-document View Transition API;
// the animations live in src/styles/view-transitions.css. All this script does
// is tag each navigation with a direction so the CSS can pick the matching
// slide, opt out when the user asked for reduced motion, and mark the incoming
// document so the navbar's one-shot drop-in animation is suppressed on
// navigation (see `html[data-vt-navigation] .navbar` in styles/navbar.css). That
// marker is intentionally never removed - the page arrived via navigation for
// the rest of its life.
//
// It has to stay an *inline classic* script. `pagereveal` fires on the incoming
// document before its first render, which is earlier than a deferred
// `type="module"` bundle would ever execute - that gap is exactly what made the
// old hand-rolled transition stall in production builds.
const HOME_PATH = "/";

const directionScript = `(function(){
var HOME=${JSON.stringify(HOME_PATH)};
function directionFor(a){
if(!a)return null;
var from=a.from,entry=a.entry;
if(a.navigationType==='traverse'&&from&&entry&&from.index>=0&&entry.index>=0&&from.index!==entry.index){
return entry.index<from.index?'back':'forward';
}
try{if(entry&&new URL(entry.url).pathname===HOME)return 'back';}catch(e){}
return 'forward';
}
function configure(t,a){
if(!t)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches){t.skipTransition();return;}
var d=directionFor(a);
if(d&&t.types)t.types.add(d);
}
addEventListener('pageswap',function(e){configure(e.viewTransition,e.activation);});
addEventListener('pagereveal',function(e){
if(e.viewTransition)document.documentElement.dataset.vtNavigation='';
configure(e.viewTransition,typeof navigation!=='undefined'?navigation.activation:null);
});
})();`;

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

// Browsers without speculation rules (Firefox, Safari) still benefit from having
// the destination document in the HTTP cache before the click lands.
const prefetchFallbackScript = `(function(){
if(typeof HTMLScriptElement!=='undefined'&&HTMLScriptElement.supports&&HTMLScriptElement.supports('speculationrules'))return;
var seen=new Set();
function prefetch(event){
var t=event.target;
var a=t&&t.closest?t.closest('a[href]'):null;
if(!a||a.origin!==location.origin||a.target||a.hasAttribute('download')||a.hasAttribute('data-no-prerender')||seen.has(a.href))return;
seen.add(a.href);
var link=document.createElement('link');
link.rel='prefetch';
link.href=a.href;
document.head.appendChild(link);
}
addEventListener('pointerover',prefetch,{passive:true});
addEventListener('focusin',prefetch);
})();`;

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
