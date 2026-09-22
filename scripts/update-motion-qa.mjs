import {readFileSync,writeFileSync} from 'node:fs';
let s=readFileSync('scripts/qa-cinema.mjs','utf8').replaceAll('\r\n','\n');
const a=s.indexOf('  await page.locator(".contact-trigger")');
const b=s.indexOf('  assert.equal(\n    await page.locator(".instagram-link")',a);
if(a>=0&&b>a) s=s.slice(0,a)+'  assert.equal(await page.locator(".contact-form").count(), 1);\n  assert.equal(await page.locator(".contact-form").getAttribute("action"), "https://wa.me/5511981940728");\n'+s.slice(b);
writeFileSync('scripts/qa-cinema.mjs',s);