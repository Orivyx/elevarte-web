import { useEffect, useRef } from "react";
const vertexShader = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 vP;
void main(){vP=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`;

const fragmentShader = `#version 300 es
precision highp float;
in vec2 vP;
out vec4 oC;
uniform sampler2D u_tex;
uniform float u_time,u_ratio,u_imgRatio,u_seed,u_scale,u_refract,u_blur,u_liquid;
uniform float u_bright,u_contrast,u_angle,u_fresnel,u_sharp,u_wave,u_noise,u_chroma;
uniform float u_distort,u_contour;
uniform vec3 u_lightColor,u_darkColor,u_tint;

vec3 sC,sM;

vec3 pW(vec3 v){
  vec3 i=floor(v),f=fract(v),s=sign(fract(v*.5)-.5),h=fract(sM*i+i.yzx),c=f*(f-1.);
  return s*c*((h*16.-4.)*c-1.);
}

vec3 aF(vec3 b,vec3 c){return pW(b+c.zxy-pW(b.zxy+c.yzx)+pW(b.yzx+c.xyz));}
vec3 lM(vec3 s,vec3 p){return(p+aF(s,p))*.5;}

vec2 fA(){
  vec2 c=vP-.5;
  c.x*=u_ratio>u_imgRatio?u_ratio/u_imgRatio:1.;
  c.y*=u_ratio>u_imgRatio?1.:u_imgRatio/u_ratio;
  return vec2(c.x+.5,.5-c.y);
}

vec2 rot(vec2 p,float r){float c=cos(r),s=sin(r);return vec2(p.x*c+p.y*s,p.y*c-p.x*s);}

float bM(vec2 c,float t){
  vec2 l=smoothstep(vec2(0.),vec2(t),c),u=smoothstep(vec2(0.),vec2(t),1.-c);
  return l.x*l.y*u.x*u.y;
}

float mG(float hi,float lo,float t,float sh,float cv){
  sh*=(2.-u_sharp);
  float ci=smoothstep(.15,.85,cv),r=lo;
  float e1=.08/u_scale;
  r=mix(r,hi,smoothstep(0.,sh*1.5,t));
  r=mix(r,lo,smoothstep(e1-sh,e1+sh,t));
  float e2=e1+.05/u_scale*(1.-ci*.35);
  r=mix(r,hi,smoothstep(e2-sh,e2+sh,t));
  float e3=e2+.025/u_scale*(1.-ci*.45);
  r=mix(r,lo,smoothstep(e3-sh,e3+sh,t));
  float e4=e1+.1/u_scale;
  r=mix(r,hi,smoothstep(e4-sh,e4+sh,t));
  float rm=1.-e4,gT=clamp((t-e4)/rm,0.,1.);
  r=mix(r,mix(hi,lo,smoothstep(0.,1.,gT)),smoothstep(e4-sh*.5,e4+sh*.5,t));
  return r;
}

void main(){
  sC=fract(vec3(.7548,.5698,.4154)*(u_seed+17.31))+.5;
  sM=fract(sC.zxy-sC.yzx*1.618);
  vec2 sc=vec2(vP.x*u_ratio,1.-vP.y);
  float angleRad=u_angle*3.14159/180.;
  sc=rot(sc-.5,angleRad)+.5;
  sc=clamp(sc,0.,1.);
  float sl=sc.x-sc.y,an=u_time*.001;
  vec2 iC=fA();
  vec4 texSample=texture(u_tex,iC);
  float dp=texSample.r;
  float shapeMask=texSample.a;
  vec3 hi=u_lightColor*u_bright;
  vec3 lo=u_darkColor*(2.-u_bright);
  lo.b+=smoothstep(.6,1.4,sc.x+sc.y)*.08;
  vec2 fC=sc-.5;
  float rd=length(fC+vec2(0.,sl*.15));
  vec2 ag=rot(fC,(.22-sl*.18)*3.14159);
  float cv=1.-pow(rd*1.65,1.15);
  cv*=pow(sc.y,.35);
  float vs=shapeMask;
  vs*=bM(iC,.01);
  float fr=pow(1.-cv,u_fresnel)*.3;
  vs=min(vs+fr*vs,1.);
  float mT=an*.0625;
  vec3 wO=vec3(-1.05,1.35,1.55);
  vec3 wA=aF(vec3(31.,73.,56.),mT+wO)*.22*u_wave;
  vec3 wB=aF(vec3(24.,64.,42.),mT-wO.yzx)*.22*u_wave;
  vec2 nC=sc*45.*u_noise;
  nC+=aF(sC.zxy,an*.17*sC.yzx-sc.yxy*.35).xy*18.*u_wave;
  vec3 tC=vec3(.00041,.00053,.00076)*mT+wB*nC.x+wA*nC.y;
  tC=lM(sC,tC);
  tC=lM(sC+1.618,tC);
  float tb=sin(tC.x*3.14159)*.5+.5;
  tb=tb*2.-1.;
  float noiseVal=pW(vec3(sc*8.+an,an*.5)).x;
  float edgeFactor=smoothstep(0.,.5,dp)*smoothstep(1.,.5,dp);
  float lD=dp+(1.-dp)*u_liquid*tb;
  lD+=noiseVal*u_distort*.15*edgeFactor;
  float rB=clamp(1.-cv,0.,1.);
  float fl=ag.x+sl;
  fl+=noiseVal*sl*u_distort*edgeFactor;
  fl*=mix(1.,1.-dp*.5,u_contour);
  fl-=dp*u_contour*.8;
  float eI=smoothstep(0.,1.,lD)*smoothstep(1.,0.,lD);
  fl-=tb*sl*1.8*eI;
  float cA=cv*clamp(pow(sc.y,.12),.25,1.);
  fl*=.12+(1.05-lD)*cA;
  fl*=smoothstep(1.,.65,lD);
  float vA1=smoothstep(.08,.18,sc.y)*smoothstep(.38,.18,sc.y);
  float vA2=smoothstep(.08,.18,1.-sc.y)*smoothstep(.38,.18,1.-sc.y);
  fl+=vA1*.16+vA2*.025;
  fl*=.45+pow(sc.y,2.)*.55;
  fl*=u_scale;
  fl-=an;
  float rO=rB+cv*tb*.025;
  float vM1=smoothstep(-.12,.18,sc.y)*smoothstep(.48,.08,sc.y);
  float cM1=smoothstep(.35,.55,cv)*smoothstep(.95,.35,cv);
  rO+=vM1*cM1*4.5;
  rO-=sl;
  float bO=rB*1.25;
  float vM2=smoothstep(-.02,.35,sc.y)*smoothstep(.75,.08,sc.y);
  float cM2=smoothstep(.35,.55,cv)*smoothstep(.75,.35,cv);
  bO+=vM2*cM2*.9;
  bO-=lD*.18;
  rO*=u_refract*u_chroma;
  bO*=u_refract*u_chroma;
  float sf=u_blur;
  float rP=fract(fl+rO);
  float rC=mG(hi.r,lo.r,rP,sf+.018+u_refract*cv*.025,cv);
  float gP=fract(fl);
  float gC=mG(hi.g,lo.g,gP,sf+.008/max(.01,1.-sl),cv);
  float bP=fract(fl-bO);
  float bC=mG(hi.b,lo.b,bP,sf+.008,cv);
  vec3 col=vec3(rC,gC,bC);
  col=(col-.5)*u_contrast+.5;
  col=clamp(col,0.,1.);
  col=mix(col,1.-min(vec3(1.),(1.-col)/max(u_tint,vec3(.001))),length(u_tint-1.)*.5);
  col=clamp(col,0.,1.);
  oC=vec4(col*vs,vs);
}`;

function processImage(img: HTMLImageElement): ImageData {
  const MAX_SIZE = 512;
  const MIN_SIZE = 256;
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  if (
    width > MAX_SIZE ||
    height > MAX_SIZE ||
    width < MIN_SIZE ||
    height < MIN_SIZE
  ) {
    const scale =
      width > height
        ? width > MAX_SIZE
          ? MAX_SIZE / width
          : width < MIN_SIZE
            ? MIN_SIZE / width
            : 1
        : height > MAX_SIZE
          ? MAX_SIZE / height
          : height < MIN_SIZE
            ? MIN_SIZE / height
            : 1;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const size = width * height;
  const alphaValues = new Float32Array(size);
  const shapeMask = new Uint8Array(size);
  const boundaryMask = new Uint8Array(size);

  for (let i = 0; i < size; i++) {
    const idx = i * 4;
    const r = data[idx],
      g = data[idx + 1],
      b = data[idx + 2],
      a = data[idx + 3];
    const isBackground = (r > 250 && g > 250 && b > 250 && a === 255) || a < 5;
    alphaValues[i] = isBackground ? 0 : a / 255;
    shapeMask[i] = alphaValues[i] > 0.1 ? 1 : 0;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!shapeMask[idx]) continue;
      if (
        x === 0 ||
        x === width - 1 ||
        y === 0 ||
        y === height - 1 ||
        !shapeMask[idx - 1] ||
        !shapeMask[idx + 1] ||
        !shapeMask[idx - width] ||
        !shapeMask[idx + width]
      ) {
        boundaryMask[idx] = 1;
      }
    }
  }

  const u = new Float32Array(size);
  const ITERATIONS = 200;
  const C = 0.01;
  const omega = 1.85;

  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        if (!shapeMask[idx] || boundaryMask[idx]) continue;
        const sum =
          (shapeMask[idx + 1] ? u[idx + 1] : 0) +
          (shapeMask[idx - 1] ? u[idx - 1] : 0) +
          (shapeMask[idx + width] ? u[idx + width] : 0) +
          (shapeMask[idx - width] ? u[idx - width] : 0);
        const newVal = (C + sum) / 4;
        u[idx] = omega * newVal + (1 - omega) * u[idx];
      }
    }
  }

  let maxVal = 0;
  for (let i = 0; i < size; i++) if (u[i] > maxVal) maxVal = u[i];
  if (maxVal === 0) maxVal = 1;

  const outData = ctx.createImageData(width, height);
  for (let i = 0; i < size; i++) {
    const px = i * 4;
    const depth = u[i] / maxVal;
    const gray = Math.round(255 * (1 - depth * depth));
    outData.data[px] = outData.data[px + 1] = outData.data[px + 2] = gray;
    outData.data[px + 3] = Math.round(alphaValues[i] * 255);
  }

  return outData;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [1, 1, 1];
}

/** React Bits MetallicPaint shader and image-depth processing, adapted for scroll.
 * Original source snapshot and license are alongside this file. */
export default function MetallicPaint() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    const stage = host?.closest<HTMLElement>(".cinema");
    if (!host || !stage) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const setup = () => {
      if (preference.matches) return () => {};
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
      if (!gl) return () => {};
      const program = gl.createProgram()!;
      const shaders: WebGLShader[] = [];
      for (const [type, source] of [
        [gl.VERTEX_SHADER, vertexShader],
        [gl.FRAGMENT_SHADER, fragmentShader],
      ] as const) {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          shaders.forEach((s) => gl.deleteShader(s));
          gl.deleteProgram(program);
          return () => {};
        }
        gl.attachShader(program, shader);
        shaders.push(shader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        shaders.forEach((s) => gl.deleteShader(s));
        gl.deleteProgram(program);
        return () => {};
      }
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const pos = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
      const u = (name: string) => gl.getUniformLocation(program, name);
      const uniforms: Record<string, number> = {
        u_seed: 42,
        u_scale: 2.4,
        u_refract: 0.015,
        u_blur: 0.018,
        u_liquid: 0.45,
        u_bright: 1.25,
        u_contrast: 1.1,
        u_angle: 35,
        u_fresnel: 1.1,
        u_sharp: 1,
        u_wave: 0.55,
        u_noise: 0.4,
        u_chroma: 0.15,
        u_distort: 0.3,
        u_contour: 0.8,
      };
      Object.entries(uniforms).forEach(([key, value]) =>
        gl.uniform1f(u(key), value),
      );
      for (const [key, value] of Object.entries({
        u_lightColor: "#d5fff1",
        u_darkColor: "#032c28",
        u_tint: "#69d9c1",
      })) {
        gl.uniform3fv(u(key), hexToRgb(value));
      }
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1i(u("u_tex"), 0);
      let disposed = false;
      let ready = false;
      let time = 0;
      let frame = 0;
      const draw = () => {
        frame = 0;
        if (!ready || disposed) return;
        gl.uniform1f(u("u_time"), 650 + time * 1700);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        host.dataset.frameTime = time.toFixed(3);
      };
      const schedule = () => {
        if (!frame && time < 4.2) frame = requestAnimationFrame(draw);
      };
      const resize = () => {
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        canvas.width = Math.max(1, Math.round(host.clientWidth * dpr));
        canvas.height = Math.max(1, Math.round(host.clientHeight * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1f(u("u_ratio"), canvas.width / canvas.height);
        schedule();
      };
      const onFrame = (e: Event) => {
        time = (e as CustomEvent<{ time: number }>).detail.time;
        schedule();
      };
      host.appendChild(canvas);
      const observer = new ResizeObserver(resize);
      observer.observe(host);
      stage.addEventListener("cinema-frame", onFrame);
      getLogoDepth()
        .then((data) => {
          if (disposed) return;
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            data.width,
            data.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            data.data,
          );
          gl.uniform1f(u("u_imgRatio"), data.width / data.height);
          ready = true;
          host.dataset.ready = "true";
          resize();
        })
        .catch(() => {});
      return () => {
        disposed = true;
        observer.disconnect();
        stage.removeEventListener("cinema-frame", onFrame);
        cancelAnimationFrame(frame);
        canvas.remove();
        delete host.dataset.ready;
        gl.deleteTexture(texture);
        gl.deleteBuffer(buffer);
        shaders.forEach((s) => gl.deleteShader(s));
        gl.deleteProgram(program);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };
    let dispose = setup();
    const change = () => {
      dispose();
      dispose = setup();
    };
    preference.addEventListener("change", change);
    return () => {
      dispose();
      preference.removeEventListener("change", change);
    };
  }, []);
  return (
    <div
      ref={hostRef}
      className="hero-sculpture pointer-events-none absolute top-[24%] right-[-3vw] z-2 size-[59vw] md:top-[5%] md:right-[3%] md:size-[calc(32*var(--design-vw))] [&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-contain [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:size-full [&>canvas]:object-contain data-ready:[&>img]:invisible"
      data-react-bits="MetallicPaint"
      aria-hidden="true"
    >
      <img src="/favicon.svg" alt="" />
    </div>
  );
}
let logoDepth: Promise<ImageData> | undefined;
function getLogoDepth() {
  if (!logoDepth)
    logoDepth = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(processImage(image));
      image.onerror = reject;
      image.src = "/favicon.svg";
    });
  return logoDepth;
}
