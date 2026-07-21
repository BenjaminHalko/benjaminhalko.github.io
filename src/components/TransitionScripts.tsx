/** @jsxRuntime automatic @jsxImportSource preact */

const bootstrap = `try{let c=parseInt(sessionStorage.getItem('vt-counter')||'0',10),p=parseInt(sessionStorage.getItem('vt-prev-index')||'-1',10),s=history.state||{},i=s.__vtIndex,n=i===undefined;if(n){i=++c;sessionStorage.setItem('vt-counter',c.toString());history.replaceState(Object.assign({},s,{__vtIndex:i}),'')}let d=sessionStorage.getItem('vt-dir');sessionStorage.removeItem('vt-dir');if(!d){let v=performance.getEntriesByType('navigation')[0];if(v&&v.type==='back_forward'&&p!==-1&&!n){d=i<p?'back':'forward'}}if(d){let r=document.documentElement;r.dataset.vtPending=d;r.dataset.vtNavigation='';let b=sessionStorage.getItem('vt-background');if(b){let bg=JSON.parse(b);if(bg&&typeof bg==='object'){r.style.setProperty('--vt-bg-color',bg.color||'');r.style.setProperty('--vt-bg-image',bg.image||'');r.style.setProperty('--vt-bg-position',bg.position||'');r.style.setProperty('--vt-bg-size',bg.size||'');r.style.setProperty('--vt-bg-repeat',bg.repeat||'');r.style.setProperty('--vt-bg-attachment',bg.attachment||'');r.dataset.vtBackground=''}}}sessionStorage.setItem('vt-current-index',i.toString())}catch(e){console.warn('Page transition state unavailable',e)}`;

export function TransitionScripts() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      <script type="module" src="/scripts/transitions.ts" />
    </>
  );
}
