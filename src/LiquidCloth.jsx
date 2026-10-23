import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int index = 0; index < 4; index++) {
      value += noise(p) * amplitude;
      p = p * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
    float time = uTime * 0.55;

    float cells = 30.0;
    vec2 mosaic = p * cells;
    vec2 cell = floor(mosaic);
    vec2 local = fract(mosaic);
    vec2 center = (cell + 0.5) / cells;

    float pixelMask =
      step(0.08, local.x) * step(local.x, 0.92) *
      step(0.08, local.y) * step(local.y, 0.92);

    vec2 drift = vec2(time * 0.12, cos(time * 0.4) * 0.08);
    float n = fbm(center * 2.6 + drift);
    float wave = 0.5 + 0.5 * sin(center.x * 7.0 - center.y * 5.0 + n * 6.0 + time * 1.8);
    float pulse = smoothstep(0.35, 1.0, wave);

    float intensity = (0.25 + n * 0.5) * (0.35 + pulse * 0.85);
    float sparkle = step(0.92, hash21(cell + vec2(floor(time * 3.0))));
    intensity += sparkle * 0.5;

    float radius = length(p);
    float angle = atan(p.y, p.x);

    float ringA = smoothstep(0.009, 0.0, abs(radius - (0.66 + 0.02 * sin(angle * 3.0 + time * 0.8))));
    float ringB = smoothstep(0.007, 0.0, abs(radius - (0.98 + 0.015 * cos(angle * 4.0 - time * 0.6))));
    float ringC = smoothstep(0.006, 0.0, abs(radius - (0.4 + 0.012 * sin(angle * 2.0 - time))));

    float dashA = 0.4 + 0.6 * step(0.0, sin(angle * 16.0 + time * 2.2));
    float dashB = 0.3 + 0.7 * step(0.0, sin(angle * 22.0 - time * 1.6));

    float orbits = ringA * dashA * 0.85 + ringB * dashB * 0.5 + ringC * 0.35;

    float angleOne = time * 1.1;
    vec2 dotOne = vec2(cos(angleOne), sin(angleOne)) * (0.66 + 0.02 * sin(angleOne * 3.0));
    float glowOne = smoothstep(0.05, 0.0, length(p - dotOne));

    float angleTwo = -time * 0.7 + 2.2;
    vec2 dotTwo = vec2(cos(angleTwo), sin(angleTwo)) * (0.98 + 0.015 * cos(angleTwo * 4.0));
    float glowTwo = smoothstep(0.032, 0.0, length(p - dotTwo));

    float angleThree = time * 1.6 + 4.0;
    vec2 dotThree = vec2(cos(angleThree), sin(angleThree)) * 0.4;
    float glowThree = smoothstep(0.024, 0.0, length(p - dotThree));

    vec2 pointer = uPointer * 0.55;
    float pointerGlow = smoothstep(0.55, 0.0, length(p - pointer));

    vec3 charcoal = vec3(0.022, 0.021, 0.019);
    vec3 espresso = vec3(0.17, 0.13, 0.10);
    vec3 bronze = vec3(0.48, 0.34, 0.22);
    vec3 sand = vec3(0.79, 0.66, 0.49);
    vec3 ivory = vec3(0.90, 0.90, 0.87);

    vec3 pixelColor = mix(espresso, sand, n);

    vec3 color = charcoal;
    color += pixelColor * intensity * pixelMask * 0.58;
    color += bronze * pow(intensity, 3.0) * pixelMask * 0.26;
    color += sand * orbits * 1.3;
    color += ivory * (glowOne + glowTwo) * 1.3;
    color += sand * glowThree * 1.05;
    color += sand * pointerGlow * pixelMask * 0.42;
    color += sand * pointerGlow * 0.1;

    float grain = hash21(gl_FragCoord.xy + uTime * 24.0);
    color += (grain - 0.5) * 0.025;

    float vignette = 1.0 - smoothstep(0.55, 1.35, length(p * vec2(0.82, 0.92)));
    color *= 0.8 + 0.5 * vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function LiquidCloth({ activationClass = 'is-ready' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const playbackElement = container?.parentElement;

    if (!canvas || !container || !playbackElement) return undefined;

    let renderer;
    let animationFrame;
    let isDisposed = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x0b0b0c, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0, 0) },
    };
    const pointerTarget = new THREE.Vector2(0, 0);

    const handlePointerMove = (event) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height), false);
      renderer.getDrawingBufferSize(uniforms.uResolution.value);
    };

    const isVisible = () => playbackElement.classList.contains(activationClass) && document.visibilityState === 'visible';

    const render = (time) => {
      animationFrame = undefined;
      if (isDisposed || !isVisible()) return;
      uniforms.uTime.value = reducedMotion ? 0 : time * 0.001;
      uniforms.uPointer.value.lerp(pointerTarget, 0.045);
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    const updatePlayback = () => {
      if (isDisposed) return;

      if (reducedMotion) {
        if (isVisible()) renderer.render(scene, camera);
        return;
      }

      if (isVisible() && !animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      } else if (!isVisible() && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const stateObserver = new MutationObserver(updatePlayback);
    resizeObserver.observe(container);
    stateObserver.observe(playbackElement, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', updatePlayback);
    resize();
    updatePlayback();

    return () => {
      isDisposed = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      stateObserver.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      window.removeEventListener('pointermove', handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [activationClass]);

  return <canvas ref={canvasRef} className="liquid-cloth-canvas" aria-hidden="true" />;
}
