import {readFileSync,writeFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8').replaceAll('\r\n','\n');
let s=read('src/sections/Services.tsx');
const begin=s.indexOf('        gsap.set(scenes.slice(1)');
const end=s.indexOf('\n      },\n      root,',begin);
s=s.slice(0,begin)+`
        // Each panel physically replaces the previous one inside a fixed stage.
        gsap.set(scenes, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(scenes.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "servicos",
            trigger: root.current,
            start: "top top",
            end: () => "+=" + innerHeight * (innerWidth < 768 ? 3.5 : 4.5),
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        scenes.forEach((scene, i) => {
          const at = i * 1.5;
          const title = scene.querySelector("h3");
          const image = scene.querySelector("img");
          if (i > 0) {
            tl.to(scene, {
              clipPath: "inset(0% 0% 0% 0%)", duration: 0.8,
              ease: "power2.inOut",
            }, at - 0.8)
            .to(scenes[i - 1].querySelector("h3"), {
              yPercent: -65, duration: 0.8, ease: "power2.inOut",
            }, at - 0.8)
            .to(scenes[i - 1].querySelector("img"), {
              yPercent: -16, duration: 0.8, ease: "power2.inOut",
            }, at - 0.8);
          }
          tl.fromTo(title,
            { xPercent: i % 2 ? -14 : 14, yPercent: 0 },
            { xPercent: 0, duration: 0.8, ease: "power2.out" },
            Math.max(0, at - 0.7),
          ).fromTo(image,
            { scale: 0.86, xPercent: i % 2 ? -12 : 12, rotate: i % 2 ? 3 : -3 },
            { scale: 1, xPercent: 0, rotate: 0, duration: 1.2, ease: "power1.inOut" },
            Math.max(0, at - 0.7),
          );
          // A reading interval between transitions is part of the scroll timeline.
          tl.to({}, { duration: 0.7 }, at);
        });
`+s.slice(end);
writeFileSync('src/sections/Services.tsx',s);
s=read('src/sections/Studio.tsx');
const a=s.indexOf('        tl.fromTo(');
const b=s.indexOf('\n      },\n      root,',a);
s=s.slice(0,a)+`
        tl.fromTo(".studio-fragment.one",
          { xPercent: -12, yPercent: 55, rotate: -8, scale: 0.85 },
          { xPercent: 15, yPercent: -12, rotate: 0, scale: 1, duration: 1.3, ease: "power1.inOut" }, 0)
          .fromTo(".studio-fragment.two",
            { xPercent: 16, yPercent: 35, rotate: 8, scale: 0.85 },
            { xPercent: -10, yPercent: -30, rotate: 0, scale: 1, duration: 1.3, ease: "power1.inOut" }, 0)
          .fromTo(".studio-statement span:first-child",
            { xPercent: -14 }, { xPercent: 0, duration: 1.3, ease: "power1.inOut" }, 0)
          .fromTo(".studio-statement span:last-child",
            { xPercent: 25 }, { xPercent: 0, duration: 1.3, ease: "power1.inOut" }, 0)
          .to(".studio-fragment.one",
            { xPercent: -100, clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: "power2.inOut" }, 1.3)
          .to(".studio-fragment.two",
            { xPercent: 100, clipPath: "inset(0 0 0 100%)", duration: 0.9, ease: "power2.inOut" }, 1.3)
          .to(".studio-statement",
            { yPercent: -18, scale: 0.94, duration: 0.9, ease: "power2.inOut" }, 1.3)
          .fromTo(".studio-copy",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power2.inOut" }, 1.5)
          .to({}, {duration: 0.4}, 2.4);
`+s.slice(b);
writeFileSync('src/sections/Studio.tsx',s);
s=read('src/sections/Cinema.tsx').replace('<div className="c-hero">','<div className="c-hero">\n          <div className="c-hero-glow" aria-hidden="true" />');
s=s.replace('<span>{name}</span>','<span>{name}</span>\n              <i aria-hidden="true" />');
writeFileSync('src/sections/Cinema.tsx',s);
s=read('src/animations/useCinema.ts');
s=s.replace('          scale: 0.03,\n          rotate: -8,','          scale: 0.52,\n          rotate: 0,');
s=s.replace('clipPath: "inset(0 46% 0 46%)"','clipPath: "inset(49% 0% 49% 0%)"');
s=s.replace('        gsap.set(q(".c-aol-image"), { xPercent: 55, scale: 1.15 });','        gsap.set(q(".c-aol-image"), { xPercent: 35, scale: 0.9, rotateY: -12, transformPerspective: 1400 });');
s=s.replace('          rotate: 7,','          rotate: 0,\n          rotateY: -10,\n          transformPerspective: 1400,');
s=s.replace('{ scale: 0.74, rotate: -3, yPercent: 0, duration: 1.3 }','{ scale: 0.74, rotateY: -4, yPercent: 0, duration: 1.3, ease: "power2.inOut" }');
s=s.replace('{ scale: 1.02, rotate: 0, xPercent: 0, yPercent: 0, duration: 1.8 }','{ scale: 1, rotateY: 0, xPercent: 0, yPercent: 0, duration: 1.8, ease: "power2.inOut" }');
s=s.replace('{ xPercent: 0, scale: 1, duration: 1.2 }','{ xPercent: 0, scale: 1, rotateY: 0, duration: 1.2, ease: "power2.inOut" }');
s=s.replace('clipPath: "inset(0 0% 0 0%)",\n              duration: 2.3,','clipPath: "inset(0% 0% 0% 0%)",\n              ease: "power2.inOut",\n              duration: 2.3,');
s=s.replace('{ scale: 1, xPercent: 0, yPercent: 0, duration: 1.1 }','{ scale: 1, xPercent: 0, yPercent: 0, duration: 1.1, ease: "power2.inOut" }');
s=s.replace('        ScrollTrigger.refresh();',`
        // An actual band of light travels across the letterforms, never a full fade.
        tl.fromTo(q(".c-hero-glow"),
          { xPercent: -45, scale: 0.65, opacity: 0 },
          { xPercent: 10, scale: 1, opacity: 0.65, duration: 1.5 }, 0.4)
          .to(q(".c-hero-glow"), { xPercent: 55, opacity: 0, duration: 1.5 }, 1.9);
        // Aperture opens into the film while the outgoing still moves away.
        tl.to(q(".c-t-detail"), { yPercent: -8, duration: 0.85, ease: "power2.inOut" }, 21.5);
        const meters = q(".cinema-index i");
        [[4, 6.8], [10.8, 5.6], [16.4, 9.9]].forEach(([start, duration], i) => {
          tl.fromTo(meters[i], { scaleX: 0 }, { scaleX: 1, duration }, start);
        });
        ScrollTrigger.refresh();`);
s=s.replace('{ clipPath: "inset(0 100% 0 0)", xPercent: -12 },\n            { clipPath: "inset(0 0 0 100%)", xPercent: 12, duration: 1.1 },','{ clipPath: "polygon(-30% 0, -10% 0, -30% 100%, -50% 100%)" },\n            { clipPath: "polygon(130% 0, 150% 0, 130% 100%, 110% 100%)", duration: 1.8 },');
writeFileSync('src/animations/useCinema.ts',s);