import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const errors=[];
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 for(const id of ['estudio','servicos']){
  const bounds=await page.evaluate(async id=>{
   const {ScrollTrigger}=await import('/src/animations/engine.ts');
   const t=ScrollTrigger.getById(id);
   return {start:t.start,end:t.end,scrub:t.vars.scrub};
  },id);
  assert.equal(bounds.scrub,true);
  const state=async progress=>{
   await page.evaluate(y=>scrollTo(0,y),bounds.start+(bounds.end-bounds.start)*progress);
   await page.waitForTimeout(120);
   return page.locator('#'+id).evaluate(el=>[...el.querySelectorAll('h3,img,.discipline,.studio-statement,.studio-copy')].map(n=>{const s=getComputedStyle(n);return s.transform+s.clipPath+s.opacity}));
  };
  for(const p of [.08,.25,.5,.73,.92]){
   const before=await state(p);
   await state(.98);
   assert.deepEqual(await state(p),before,id+' reverses at '+p);
  }
  await state(.5);
  await page.screenshot({path:'artifacts/qa-cinema/'+id+'-motion-'+width+'.png'});
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForFunction(()=>document.querySelectorAll('.pin-spacer').length===0);
 assert.equal(await page.locator('.pin-spacer').count(),0);
 await page.close();
}
await browser.close();
assert.deepEqual(errors,[]);
await sharp('artifacts/qa-cinema/servicos-motion-1440.png').resize(1000).jpeg({quality:85}).toFile('artifacts/qa-cinema/motion-review.jpg');
console.log('Studio and services reverse correctly at five scroll positions on desktop/mobile; reduced motion and console checks passed.');