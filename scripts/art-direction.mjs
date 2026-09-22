import {readFileSync,writeFileSync} from 'node:fs';
const p='src/sections/Cinema.tsx';let s=readFileSync(p,'utf8');
s=s.replace('case-gallery-03','art-direction-04');
s=s.replace('<div className="case-heading">','<span className="case-page-number" aria-hidden="true">0{i + 1}</span>\n            <div className="case-heading">');
s=s.replace('{["Nogueira", "AOL", "Dra. Tatiana Sanchez"][i]}','{i === 2 ? <>Tatiana<br /><span>Sanchez.</span></> : ["Nogueira®", "AOL"][i]}');
// The registered mark would make an unsupported claim about the client brand.
s=s.replace('Nogueira®','Nogueira.');
s=s.replace('<div className="case-description">','<div className="case-description">\n                <span className="case-direction">{(language === "pt" ? ["Feita para seguir em frente.", "A força da clareza.", "O cuidado ganha forma."] : ["Designed to move forward.", "The strength of clarity.", "Care takes shape."])[i]}</span>');
s=s.replace('<div className="case-visual">','<div className="case-visual">\n              <div className="case-material" aria-hidden="true"><span>ELEVARTE / {project.number}</span><strong>{["N.", "A", "Ts."][i]}</strong><div className="case-swatches"><i /><i /><i /></div><small>IDENTITY SYSTEM</small></div>');
s=s.replace('          </article>','            <div className="case-colophon"><span>{language === "pt" ? "ESTUDO DE IDENTIDADE" : "IDENTITY STUDY"}</span><span>{["PRETO / VERMELHO / MOVIMENTO", "FORMA / CONTRASTE / EQUILÍBRIO", "TEXTURA / DELICADEZA / CUIDADO"][i]}</span><span>ELEVARTE ↗</span><i /></div>\n          </article>');
writeFileSync(p,s);
const ep='src/styles/editorial.css';let c=readFileSync(ep,'utf8');c=c.slice(0,c.indexOf('/* Case studies:'));writeFileSync(ep,c);
const mp='src/main.tsx';let main=readFileSync(mp,'utf8');main+='\nimport "./styles/projects.css";\n';writeFileSync(mp,main);
const ap='src/animations/useCinema.ts';let a=readFileSync(ap,'utf8');
a=a.replace('      const meters = q(".cinema-index i");',`      // A measured opening, an identity study, then the photographic detail.
      const starts = [2.5, 10.8, 16.4];
      const spans = [8.3, 5.6, 9.9];
      q(".case-panel").forEach((panel: Element, i: number) => {
        const title = panel.querySelector(".case-heading h2");
        const visual = panel.querySelector(".case-visual");
        tl.fromTo(title, { clipPath: "inset(0% 100% 0% 0%)", x: mobile ? 0 : -32 },
          { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 1.15 }, starts[i] + .25);
        tl.fromTo(visual, { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.55 }, starts[i] + .35);
        tl.fromTo(panel.querySelector(".case-colophon i"), { scaleX: 0 },
          { scaleX: 1, duration: spans[i] - 1.5 }, starts[i] + 1.5);
        tl.fromTo(panel.querySelectorAll(".case-swatches i"), { scaleY: 0 },
          { scaleY: 1, duration: 1.25, stagger: .13 }, starts[i] + 1.6);
      });
      tl.to(q(".c-aol .case-material strong"), { rotation: 90, duration: 2.6 }, 13.5);
      const meters = q(".cinema-index i");`);
writeFileSync(ap,a);