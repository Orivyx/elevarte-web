import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
for(const [width,height] of [[1440,900],[3440,1440],[390,844],[1440,650]]){
 const p=await b.newPage({viewport:{width,height}});await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 for(const time of [4.6,9,4.6,9]){
 await p.evaluate(async time=>{const {ScrollTrigger}=await import('/src/animations/engine.ts');const t=ScrollTrigger.getById('cinema');scrollTo(0,t.start+(t.end-t.start)*time/28)},time);
 await p.waitForFunction(async time=>{const {ScrollTrigger}=await import('/src/animations/engine.ts');return Math.abs(ScrollTrigger.getById('cinema').animation.time()-time)<.01},time);
 const sizes=await p.locator('.c-nogueira figure img').evaluateAll(imgs=>imgs.map(img=>{const i=img.getBoundingClientRect(),f=img.parentElement.getBoundingClientRect();return {fit:getComputedStyle(img).objectFit,inside:i.left>=f.left-1&&i.top>=f.top-1&&i.right<=f.right+1&&i.bottom<=f.bottom+1,imageHeight:i.height,frameHeight:f.height}}));
 for(const size of sizes){assert.equal(size.fit,'contain');assert(size.inside,JSON.stringify({width,height,time,size}));}
 }
 await p.screenshot({path:`artifacts/qa-cinema/nogueira-fixed-${width}-${height}.png`});console.log({width,height,imagesInsideFrames:true});await p.close();
}
await b.close();
const inputs=await Promise.all(['nogueira-fixed-1440-900','nogueira-fixed-390-844'].map((n,i)=>sharp('artifacts/qa-cinema/'+n+'.png').resize({width:i?260:1000}).toBuffer()));await sharp({create:{width:1260,height:625,channels:3,background:'#101311'}}).composite([{input:inputs[0],left:0,top:0},{input:inputs[1],left:1000,top:0}]).jpeg({quality:85}).toFile('artifacts/qa-cinema/gallery-review.jpg');