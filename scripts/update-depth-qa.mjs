import {readFileSync,writeFileSync} from 'node:fs';
let s=readFileSync('scripts/qa-cinema.mjs','utf8').replaceAll('.c-n-cover img','.c-n-cover > img');
s=s.replace('.c-surface,.c-chapter,h2','.c-surface,.c-chapter,h2,.media-strip,.c-letter,.c-aol-glyphs b,.c-n-companion,.c-t-satellite');
s=s.replace('["hero-light", 1.8],','["hero-light", 1.8], ["assembly", 2.8], ["nogueira-depth", 5.6], ["nogueira-break", 6.8], ["aol-depth", 14.4], ["tatiana-depth", 19.1],');
writeFileSync('scripts/qa-cinema.mjs',s);