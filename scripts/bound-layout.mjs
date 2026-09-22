import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
// Use the composition width, rather than the entire display, for proportional sizing.
for(const file of readdirSync('src/styles').filter(n=>n.endsWith('.css'))) {
 const path='src/styles/'+file;
 let css=readFileSync(path,'utf8');
 css=css.replace(/(-?\d*\.?\d+)vw\b/g,(_,n)=>`calc(${n} * var(--design-vw))`);
 writeFileSync(path,css);
}
const cp='src/sections/Cinema.tsx';let c=readFileSync(cp,'utf8');
c=c.replace('<div className="c-hero">','<div className="c-hero"><div className="composition">');
c=c.replace('        {projects.map','        </div>\n        {projects.map');
c=c.replace('key={project.slug}>','key={project.slug}>\n            <div className="composition">');
c=c.replace('          </article>','            </div>\n          </article>');
writeFileSync(cp,c);
const st='src/sections/Studio.tsx';let s=readFileSync(st,'utf8');s=s.replace('ref={root}>','ref={root}>\n      <div className="composition">');s=s.replace('    </section>','      </div>\n    </section>');writeFileSync(st,s);
const sp='src/sections/Services.tsx';s=readFileSync(sp,'utf8');s=s.replace('<article className="discipline" key={i}>','<article className="discipline" key={i}><div className="composition">');s=s.replace('        </article>','        </div></article>');writeFileSync(sp,s);
const mp='src/main.tsx';writeFileSync(mp,readFileSync(mp,'utf8')+'\nimport "./styles/layout.css";\n');