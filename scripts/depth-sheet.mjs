import sharp from 'sharp';
const names=['hero-light','assembly','nogueira-depth','nogueira-break','aol-depth','tatiana-depth'];
const thumbs=[];
for(let i=0;i<names.length;i++) {
 const input=await sharp('artifacts/qa-cinema/desktop-'+names[i]+'.png').resize(540,338).toBuffer();
 thumbs.push({input,left:(i%2)*540,top:Math.floor(i/2)*338});
}
await sharp({create:{width:1080,height:1014,channels:3,background:'#090b0b'}}).composite(thumbs).jpeg({quality:85}).toFile('artifacts/qa-cinema/depth-review.jpg');