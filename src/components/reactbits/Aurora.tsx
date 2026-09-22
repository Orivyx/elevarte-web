/* React Bits Aurora by David Haz. See LICENSE.md and upstream/Aurora.tsx.txt. */
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    chroma /= max(chromaPeak, 0.0001);
    fragColor = vec4(mix(vec3(1.0), chroma, min(coverage * 1.08, 0.94)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;

/**
 * React Bits Aurora shader with an Elevarte scroll-driven renderer.
 * No autonomous animation loop: GSAP requests a render at the current timeline time.
 */
export default function Aurora() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = container.current;
    const stage = host?.closest<HTMLElement>(".cinema");
    if (!host || !stage) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const setup = () => {
      if (preference.matches) return () => {};
      const canvas = document.createElement("canvas");
      if (
        !canvas.getContext("webgl2", {
          alpha: true,
          antialias: false,
          premultipliedAlpha: true,
        })
      ) {
        host.dataset.fallback = "true";
        return () => {};
      }
      let renderer: Renderer;
      try {
        renderer = new Renderer({
          canvas,
          alpha: true,
          antialias: false,
          premultipliedAlpha: true,
          dpr: 1,
        });
      } catch {
        host.dataset.fallback = "true";
        return () => {};
      }
      delete host.dataset.fallback;
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      const geometry = new Triangle(gl);
      delete geometry.attributes.uv;
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: 1.1 },
          uColorStops: {
            value: ["#075943", "#3fe7be", "#167f85"].map((hex) => {
              const c = new Color(hex);
              return [c.r, c.g, c.b];
            }),
          },
          uResolution: { value: [1, 1] },
          uBlend: { value: 0.55 },
          uLightMode: { value: 0 },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });
      host.appendChild(canvas);
      let frame = 0;
      let time = 0;
      let active = true;
      const draw = () => {
        frame = 0;
        program.uniforms.uTime.value = time * 2.4;
        renderer.render({ scene: mesh });
        host.dataset.frameTime = time.toFixed(3);
      };
      const schedule = () => {
        if (!frame && active && !document.hidden)
          frame = requestAnimationFrame(draw);
      };
      const resize = () => {
        const width = Math.max(1, host.clientWidth);
        const height = Math.max(1, host.clientHeight);
        renderer.setSize(width, height);
        program.uniforms.uResolution.value = [
          gl.drawingBufferWidth,
          gl.drawingBufferHeight,
        ];
        schedule();
      };
      const onFrame = (event: Event) => {
        const detail = (event as CustomEvent<{ time: number }>).detail;
        time = Math.max(0, Math.min(3.8, detail.time));
        active = detail.time <= 3.8;
        if (!active && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        schedule();
      };
      const visibility = () => schedule();
      const observer = new ResizeObserver(resize);
      observer.observe(host);
      stage.addEventListener("cinema-frame", onFrame);
      document.addEventListener("visibilitychange", visibility);
      resize();
      return () => {
        observer.disconnect();
        stage.removeEventListener("cinema-frame", onFrame);
        document.removeEventListener("visibilitychange", visibility);
        cancelAnimationFrame(frame);
        canvas.remove();
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
      className="rb-aurora pointer-events-none absolute inset-0 opacity-10 motion-reduce:hidden data-fallback:bg-[radial-gradient(ellipse_at_50%_0%,#167f8566,transparent_65%)] [&>canvas]:block [&>canvas]:size-full"
      ref={container}
      aria-hidden="true"
      data-react-bits="Aurora"
    />
  );
}
