import{$ as n,t as s,L as r,x as a,a0 as c,W as f,a1 as y,a2 as m,a3 as d,p,a4 as g,G as v,a5 as u}from"./index-DwrvwC1P.js";import{i as L,r as b}from"./dev.utils-DM7Qhcet-8lYsh2fs.js";const h=()=>{let t=a().KoliBri;return t===void 0&&(t={},Object.defineProperty(a(),"KoliBri",{value:t,writable:!1})),t};function i(t,e){try{Object.defineProperty(h(),t,{get:function(){return e}})}catch{r.debug(`KoliBri property ${t} is already bind.`)}}const l=(t,e)=>r.debug(`${t} ${e?"":"not "}activated`),w=()=>{if(L(),n()&&(b(),i("a11yColorContrast",c),i("querySelector",f),i("querySelectorAll",y),i("querySelectorColors",m),i("utils",function(){return d}),i("parseJson",p),i("stringifyJson",g),l("Development mode",n()),l("Experimental mode",v()),l("Color contrast analysis",u()),setTimeout(()=>{try{const t=s(),e=t?.body;if(t&&e&&typeof t.createElement=="function"){const o=t.createElement("svg");o.setAttribute("aria-label","KoliBri-DevTools"),o.setAttribute("xmlns","http://www.w3.org/2000/svg"),o.setAttribute("role","toolbar"),o.setAttribute("style","position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;"),o.innerHTML=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 600 600"
>
  <path d="M353 322L213 304V434L353 322Z" fill="#047" />
  <path d="M209 564V304L149 434L209 564Z" fill="#047" />
  <path d="M357 316L417 250L361 210L275 244L357 316Z" fill="#047" />
  <path d="M353 318L35 36L213 300L353 318Z" fill="#047" />
  <path d="M329 218L237 92L250 222L272 241L329 218Z" fill="#047" />
  <path d="M391 286L565 272L421 252L391 286Z" fill="#047" />
</svg>`,e.appendChild(o)}}catch(t){r.debug(["Could not initialize DevTools UI (likely in SSR/test environment):",t])}},100),u())){const t=setTimeout(()=>{clearTimeout(t);try{const e=s(),o=e?.body;e&&o&&typeof e.createElement=="function"&&setInterval(()=>{d.queryHtmlElementColors(e.createElement("div"),c(o),!1,!1)},1e4)}catch(e){r.debug(["Could not initialize color contrast analysis:",e])}},2500)}};export{w as initialize};
