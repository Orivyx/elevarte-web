import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const results=[];
for(const [w,h] of [[3440,1440],[5120,1440],[2560,1080],[1440,900],[390,844]]) {
 const p=await b.newPage({viewport:{width:w,height:h}}); const errors=[]; p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 for(const [name,t] of [['hero',0],['nogueira',4.6],['aol',12.8],['tatiana',18]]) {
  await p.evaluate(async t=>{const {ScrollTrigger}=await import('/src/animations/engine.ts');const st=ScrollTrigger.getById('cinema');scrollTo(0,st.start+(st.end-st.start)*t/28)},t);
  await p.waitForTimeout(150);
  const box=await p.locator(name==='hero'?'.c-hero .composition':'.c-'+name+' .composition').boundingBox();
  assert(box.width<=1601);assert(Math.abs(box.x+(box.width/2)-w/2)<2);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  if(w>=2560) await p.screenshot({path:`artifacts/qa-cinema/wide-${w}-${name}.png`});
 }
 for(const id of ['estudio','servicos']) {
  await p.evaluate(async id=>{const {ScrollTrigger}=await import('/src/animations/engine.ts');const st=ScrollTrigger.getById(id);scrollTo(0,st.start+(st.end-st.start)*.8)},id);await p.waitForTimeout(150);
  if(w===3440)await p.screenshot({path:`artifacts/qa-cinema/wide-${w}-${id}.png`});
 }
 await p.locator('#contato').scrollIntoViewIfNeeded();await p.waitForTimeout(100);
 const form=await p.locator('.contact-form').boundingBox();assert(form.width<850);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if(w===3440)await p.screenshot({path:`artifacts/qa-cinema/wide-${w}-contact.png`});
 assert.deepEqual(errors,[]);results.push({width:w,height:h,centered:true,bounded:true,formWidth:Math.round(form.width)}); await p.close();
}
await b.close();
const names=['hero','nogueira','tatiana','estudio','servicos','contact'];
const images=await Promise.all(names.map(n=>sharp(`artifacts/qa-cinema/wide-3440-${n}.png`).resize({width:1100}).toBuffer()));
await sharp({create:{width:2200,height:1383,channels:3,background:'#090b0b'}}).composite(images.map((input,i)=>({input,left:i%2*1100,top:Math.floor(i/2)*461}))).jpeg({quality:82}).toFile('artifacts/qa-cinema/wide-review.jpg');
console.log(JSON.stringify(results));