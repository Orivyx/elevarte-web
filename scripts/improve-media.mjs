import sharp from 'sharp';
import {readFileSync,writeFileSync} from 'node:fs';
const base='C:/Users/Sanchez/.codex/generated_images/01a09da5-be33-71b0-b3f3-fd660216cd5a/';
const assets=[
 ['artifacts/generated/nogueira-cover.png','nogueira-editorial-v2'],
 ['artifacts/generated/nogueira-atmosphere.png','nogueira-atmosphere-v2'],
 [base+'exec-c1fe687e-0a71-450f-9d64-53beffa534f4.png','aol-cover'],
 [base+'exec-8f59ab6a-b446-49e8-a0fb-cf344d09baf4.png','tatiana-editorial-v1'],
 [base+'exec-4414c2b3-62b0-4a28-8c15-9fb2e37cb710.png','tatiana-cosmetics-v1']
];
for(const [source,name] of assets) {
 await sharp(source).webp({lossless:true,effort:6}).toFile('public/assets/'+name+'.webp');
}
let scene=readFileSync('src/sections/Cinema.tsx','utf8');
scene=scene.replace(/\s+srcSet="[^"]+"/g,'').replace(/\s+sizes="100vw"/g,'');
writeFileSync('src/sections/Cinema.tsx',scene);
let video=readFileSync('scripts/prepare-video.mjs','utf8').replace('"21"','"12"').replace(/  "-q:v",\r?\n  "2",\r?\n/,'').replaceAll('tatiana-poster.jpg','tatiana-poster.png').replace('.webp({ quality: 90 })','.webp({ lossless: true })');
writeFileSync('scripts/prepare-video.mjs',video);
let animation=readFileSync('src/animations/useCinema.ts','utf8');
animation=animation.replace('scale: 1.035','scale: 1').replaceAll('scale: 1.18','scale: 1.04').replace('scale: 1.2, xPercent: 8','scale: 1.04, xPercent: 2').replace('scale: 1.04, xPercent: -6','scale: 1, xPercent: -2').replace('scale: 1.12','scale: 1.04').replace('scale: 1.24','scale: 1.08').replace('scale: 1.45','scale: 1.12').replace('scale: 1.14, xPercent: 8','scale: 1.04, xPercent: 2');
writeFileSync('src/animations/useCinema.ts',animation);