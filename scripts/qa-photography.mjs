import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const errors=[];
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/?v=quiet-photography-02',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.media-strip,.c-n-companion,.c-t-satellite,.studio-fragment').count(),0);
 assert.equal(await page.locator('[data-react-bits="MetallicPaint"]').count(),1);
 const t=await page.evaluate(async()=>{const {ScrollTrigger}=await import('/src/animations/engine.ts');const t=ScrollTrigger.getById('cinema');return {start:t.start,end:t.end}});
 const seek=async time=>{await page.evaluate(y=>scrollTo(0,y),t.start+(t.end-t.start)*time/28);await page.waitForTimeout(130)};
 for(const [name,selector,start,end] of [['nogueira','.c-n-cover',4.6,5.8],['aol','.c-aol-image',12.8,15],['tatiana','.c-t-cover',18,19]]){
  await seek(start);
  const first=await page.locator(selector+' > img').boundingBox();
  assert.equal(await page.locator(selector+' > img').evaluate(n=>getComputedStyle(n).visibility),'visible');
  await page.screenshot({path:'artifacts/qa-cinema/quiet-'+name+'-'+width+'.png'});
  await seek(end);
  const last=await page.locator(selector+' > img').boundingBox();
  for(const key of ['x','y','width','height']) assert(Math.abs(first[key]-last[key])<.25,name+' image remains anchored: '+key);
  assert.equal(await page.locator(selector+' > img').evaluate(n=>getComputedStyle(n).transform),'none');
 }
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.close();
}
await browser.close();
assert.deepEqual(errors,[]);
const parts=[];
for(const [i,name] of ['nogueira','aol','tatiana'].entries()){
 const input=await sharp('artifacts/qa-cinema/quiet-'+name+'-1440.png').resize(500,313).toBuffer();
 parts.push({input,left:i*500,top:0});
}
await sharp({create:{width:1500,height:313,channels:3,background:'#090b0b'}}).composite(parts).jpeg({quality:88}).toFile('artifacts/qa-cinema/quiet-review.jpg');
console.log('Photos remain whole and stationary across project timelines on desktop/mobile; no floating duplicates or image transforms; logo retained.');