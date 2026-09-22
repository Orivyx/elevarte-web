import {readFileSync,writeFileSync} from 'node:fs';
const p='src/sections/Cinema.tsx';let s=readFileSync(p,'utf8');
s=s.replace(/const chapterCopy = \{[\s\S]*?\n\};\r?\n/,'');
const a=s.indexOf('        <div className="c-nogueira">');const b=s.indexOf('        <div className="c-end">',a);
s=s.slice(0,a)+`        {projects.map((project, i) => (
          <article className={"case-panel " + ["c-nogueira", "c-aol", "c-tatiana"][i]} id={["projetos", "aol", "tatiana"][i]} key={project.id ?? i}>
            <div className="case-heading">
              <span className="case-eyebrow">0{i + 1} / 03 — {language === "pt" ? "PROJETO SELECIONADO" : "SELECTED WORK"}</span>
              <h2>{["Nogueira", "AOL", "Dra. Tatiana Sanchez"][i]}</h2>
              <p className="case-sector">{[language === "pt" ? "Despachante" : "Vehicle documentation", "Advogados", language === "pt" ? "Farmacêutica esteta" : "Aesthetic pharmacist"][i]}</p>
              <div className="case-description">
                <p>{(language === "pt" ? ["Presença forte. Identidade direta. Uma marca feita para transmitir segurança.", "Precisão em cada escolha. Uma identidade que traduz clareza e confiança.", "Sensibilidade e precisão. Uma identidade pensada para o cuidado."] : ["A strong presence. A direct identity. A brand designed to inspire confidence.", "Precision in every choice. An identity expressing clarity and trust.", "Sensitivity and precision. An identity designed around care."])[i]}</p>
                <span>BRAND IDENTITY<br />ART DIRECTION</span>
              </div>
            </div>
            <div className="case-visual">
              <figure className={["c-n-cover", "c-aol-image", "c-t-cover"][i] + " c-surface"}>
                <img src={project.cover} width="1536" height="1024" loading={i === 0 ? "eager" : "lazy"} alt={["Papelaria Nogueira em preto e vermelho", "Papelaria AOL Advogados sobre volumes arquitetônicos", "Papelaria Dra. Tatiana Sanchez em tons rosados"][i]} />
              </figure>
              {i !== 1 && <figure className={(i === 0 ? "c-n-detail" : "c-t-detail") + " c-surface"}>
                <img src={i === 0 ? project.assets.identity : project.assets.digital} width="1536" height="1024" loading="lazy" alt={i === 0 ? "Aplicação digital da identidade Nogueira" : "Embalagens Dra. Tatiana Sanchez"} />
              </figure>}
              {i === 2 && <ScrollFilm language={language} />}
            </div>
          </article>
        ))}
`+s.slice(b);
s=s.replace('quiet-photography-02','case-gallery-03');writeFileSync(p,s);
const ap='src/animations/useCinema.ts';let m=readFileSync(ap,'utf8');
const x=m.indexOf('      gsap.set(q(".c-n-cover")');const y=m.indexOf('\n      const scrubber',x);
m=m.slice(0,x)+`      gsap.set(q(".case-panel"), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(q(".c-n-detail,.c-t-detail"), { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(q(".cinema-index,.c-exhibit-label"), { autoAlpha: 0 });
      gsap.set(q(".c-t-film"), { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(q(".c-end"), { clipPath: "inset(50% 0% 50% 0%)" });
`+m.slice(y);
const z=m.indexOf('        .set(q(".c-n-cover")');const e=m.indexOf('        .to(filmClock',z);
m=m.slice(0,z)+`        .to(q(".c-nogueira"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7 }, 2.5)
        .set(q(".c-headline"), { autoAlpha: 0 }, 3.5)
        .to(q(".cinema-index"), { autoAlpha: 1, duration: 0.4 }, 4)
        .addLabel("nogueira", 4.6)
        .to(q(".c-n-detail"), { clipPath: "inset(0% 0% 0% 0%)", duration: 2.2 }, 6.4)
        .to(q(".c-aol"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 }, 10.8)
        .addLabel("aol", 12.8)
        .to(q(".c-tatiana"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 }, 16.4)
        .addLabel("tatiana", 18)
        .to(q(".c-t-detail"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1 }, 19.8)
        .set(q(".c-t-film"), { autoAlpha: 1 }, 21.5)
        .to(q(".c-t-film"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65 }, 21.5)
`+m.slice(e);
writeFileSync(ap,m);
const sp='src/sections/Services.tsx';let v=readFileSync(sp,'utf8').replace(/const assets = \[[\s\S]*?\];\r?\n/,'').replace(/\s*<img src=\{"\/assets\/" \+ assets\[i\] \+ "\.webp"\} alt="" loading="lazy" \/>/,'');writeFileSync(sp,v);