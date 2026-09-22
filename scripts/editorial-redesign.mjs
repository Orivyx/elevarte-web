import {readFileSync,writeFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8').replaceAll('\r\n','\n');
let source=read('src/components/reactbits/upstream/MetallicPaint.tsx.txt');
const shader=source.slice(source.indexOf('const vertexShader'),source.indexOf('interface MetallicPaintProps'));
const process=source.slice(source.indexOf('function processImage'),source.indexOf('export default function MetallicPaint')).replace('const MAX_SIZE = 1000','const MAX_SIZE = 512').replace('const MIN_SIZE = 500','const MIN_SIZE = 256');
writeFileSync('src/components/reactbits/MetallicPaint.tsx','import {useEffect,useRef} from "react";\n'+shader+process+read('artifacts/metal-adapter.txt'));
let s=read('src/sections/Cinema.tsx');
s='import MetallicPaint from "../components/reactbits/MetallicPaint";\n'+s;
s=s.replace('<Aurora />','<Aurora />\n          <MetallicPaint />\n          <div className="hero-kicker mono"><span>ELEVARTE® — BRANDING & DIGITAL</span><p>{language === "pt" ? "Estratégia para ir além.\\nDesign para ser lembrado." : "Strategy to go further.\\nDesign to be remembered."}</p></div>');
s=s.replace('<span className="c-arrow">↓</span>','<a className="hero-project-link" href="#projetos" onClick={e => {e.preventDefault(); navigateTo("projetos");}}>{language === "pt" ? "EXPLORAR PROJETOS" : "EXPLORE PROJECTS"}<span>↗</span></a>');
s=s.replace('className="cinema"','className="cinema" data-design-version="editorial-metal-01"');
writeFileSync('src/sections/Cinema.tsx',s);
s=read('src/animations/useCinema.ts');
s=s.replace('      gsap.set(q(".c-headline")','      gsap.set(q(".hero-sculpture"), { rotate: -14, transformPerspective: 1200 });\n      gsap.set(q(".c-headline")');
s=s.replace('      // Camera passes through',`      tl.to(q(".hero-sculpture"), { xPercent: -75, yPercent: 50, scale: 1.55, rotationY: -28, rotate: 18, duration: 1.65, ease: "power1.inOut" }, 0)
        .to(q(".hero-sculpture"), { xPercent: -115, yPercent: -10, scale: 3.2, rotate: -25, opacity: 0, duration: 1.65, ease: "power2.inOut" }, 1.65)
        .to(q(".hero-kicker"), { clipPath: "inset(0% 0% 100% 0%)", yPercent: -25, duration: 0.75 }, 0.25);
      // Camera passes through`);
s=s.replace('scale: mobile ? 2.7 : 3.5','scale: mobile ? 2.2 : 2.65');
s=s.replace('end: () => "+=" + innerHeight * (mobile ? 15 : 19)','end: () => "+=" + innerHeight * (mobile ? 12 : 15)');
writeFileSync('src/animations/useCinema.ts',s);
s=read('src/main.tsx');
s+='\nimport "./styles/editorial.css";\n';
writeFileSync('src/main.tsx',s);