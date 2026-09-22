import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
for(const width of [1440,390]) {
 const p=await b.newPage({viewport:{width,height:width===1440?900:844}});
 await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 for(const [name,time] of [['nogueira',4.6],['aol',12.8],['tatiana',21]]) {
  await p.evaluate(async time=>{const {ScrollTrigger}=await import('/src/animations/engine.ts'); const t=ScrollTrigger.getById('cinema');scrollTo(0,t.start+(t.end-t.start)*time/28)},time);
  await p.waitForFunction(async time=>{const {ScrollTrigger}=await import('/src/animations/engine.ts');return Math.abs(ScrollTrigger.getById('cinema').animation.time()-time)<.01},time);
  await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await p.locator(".case-panel img").evaluateAll(images => Promise.all(images.map(img => { img.loading = "eager"; return img.decode(); })));
  const result=await p.locator('.c-'+(name==='nogueira'?'nogueira':name==='aol'?'aol':'tatiana')).evaluate(el=>{
   const h=el.querySelector('.case-heading h2').getBoundingClientRect();const v=el.querySelector('.c-surface').getBoundingClientRect();const img=el.querySelector('img');const f=img.parentElement;
   return {separate:h.right<=v.left+1||h.bottom<=v.top+1,opacity:getComputedStyle(f).opacity,visible:getComputedStyle(img).visibility,loaded:img.complete&&img.naturalWidth>0};
  });
  assert(result.separate, name+' text overlaps photography');assert.equal(result.opacity,'1');assert.equal(result.visible,'visible');assert(result.loaded);
  await p.screenshot({path:`artifacts/qa-cinema/gallery-${name}-${width}.png`});
 }
 assert.equal(await p.locator('.services img').count(),0);await p.close();
}
await b.close();
const files=['gallery-nogueira-1440','gallery-aol-1440','gallery-tatiana-390'];
const images=await Promise.all(files.map((name,i)=>sharp('artifacts/qa-cinema/'+name+'.png').resize({width:i===2?260:620}).toBuffer()));
await sharp({create:{width:1500,height:563,channels:3,background:'#151515'}}).composite(images.map((input,i)=>({input,left:i*620,top:0}))).jpeg({quality:85}).toFile('artifacts/qa-cinema/gallery-review.jpg');
console.log('Desktop/mobile: images visible, no title overlap, no service photos.');