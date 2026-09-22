import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const pt=JSON.parse(readFileSync('src/i18n/locales/pt.json','utf8'));const en=JSON.parse(readFileSync('src/i18n/locales/en.json','utf8'));
const keys=(obj,p='')=>Object.entries(obj).flatMap(([k,v])=>typeof v==='object'?keys(v,p+k+'.'):[p+k]).sort();assert.deepEqual(keys(pt),keys(en));
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
for(const width of [1440,390]){
 const ctx=await b.newContext({viewport:{width,height:900},locale:'pt-BR'});const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 assert.equal(await p.locator('html').getAttribute('lang'),'pt-BR');assert((await p.locator('h1').textContent()).includes('MARCAS QUE'));
 await p.locator('#client-name').fill('Teste & Design');await p.locator('#client-email').fill('teste@example.com');await p.locator('#client-project').fill('Identidade visual para minha marca.');
 for(const lang of ['en','pt','en']){
  await p.locator('.language button').nth(lang==='en'?1:0).click();await p.waitForTimeout(150);
  assert.equal(await p.locator('html').getAttribute('lang'),lang==='en'?'en':'pt-BR');
  assert.equal(await p.locator('#client-name').inputValue(),'Teste & Design');
  assert.equal(await p.locator('#client-email').getAttribute('placeholder'),lang==='en'?'you@company.com':'voce@empresa.com');
  assert.equal(await p.locator('.c-aol .case-sector').textContent(),lang==='en'?'Attorneys':'Advogados');
  assert.equal(await p.locator('.pin-spacer').count(),3);
 }
 await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('html').getAttribute('lang'),'en');
 assert.equal(await p.evaluate(()=>localStorage.getItem('elevarte-language')),'en');
 await p.locator('#client-name').fill('Teste & Design');await p.locator('#client-email').fill('teste@example.com');await p.locator('#client-project').fill('Identity for a new brand.');
 const message=await p.locator('form').evaluate(form=>{form.addEventListener('submit',e=>e.preventDefault(),{once:true});form.requestSubmit();return form.querySelector('[name=text]').value});
 assert(message.includes('Name: Teste & Design'));assert(message.includes('Identity for a new brand.'));
 const style=await p.evaluate(()=>{const q=s=>getComputedStyle(document.querySelector(s));return {grid:q('.contact-fields').display,columns:q('.contact-fields').gridTemplateColumns.split(' ').length,button:q('.text-cta').backgroundColor,header:q('.site-header').position,nav:q('.desktop-nav').display}});
 assert.equal(style.grid,'grid');assert.equal(style.columns,width<768?1:2);assert.equal(style.button,'rgb(184, 233, 206)');assert.equal(style.header,'fixed');assert.equal(style.nav,width<768?'none':'flex');
 if(width<768){await p.locator('.menu-toggle').click();assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape');assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(200);assert.equal(await p.locator('.pin-spacer').count(),0);
 const bounds=await p.locator('.discipline').evaluateAll(els=>els.map(e=>{const b=e.getBoundingClientRect();return {top:b.top,bottom:b.bottom}}));for(let i=1;i<bounds.length;i++)assert(bounds[i].top>=bounds[i-1].bottom-1);
 assert.deepEqual(errors,[]);console.log({width,translations:true,persisted:true,formRetained:true,tailwind:style,reducedMotion:true});await ctx.close();
}
const ctx=await b.newContext({locale:'fr-FR'});const p=await ctx.newPage();await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});assert.equal(await p.locator('html').getAttribute('lang'),'pt-BR');await b.close();
console.log('Locale parity, unsupported language fallback, UI and layout passed.');