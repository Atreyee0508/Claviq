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
    float time = uTime * 0.045;

    vec2 warp = vec2(
      fbm(p * 1.25 + vec2(time * 0.7, -time * 0.35)),
      fbm(p * 1.35 + vec2(-time * 0.45, time * 0.6))
    );
    vec2 cloth = p + (warp - 0.5) * 0.72;

    float foldA = sin(cloth.x * 3.8 + cloth.y * 5.4 + fbm(cloth * 2.1 + time) * 3.4 + time * 1.4);
    float foldB = sin(cloth.x * 7.2 - cloth.y * 3.1 + fbm(cloth * 3.2 - time) * 2.6 - time * 0.8);
    float silk = smoothstep(0.52, 0.96, 0.5 + 0.5 * (foldA * 0.72 + foldB * 0.28));
    float lavenderFold = smoothstep(0.65, 0.98, 0.5 + 0.5 * sin(cloth.x * 2.7 - cloth.y * 6.2 + fbm(cloth * 2.8) * 3.0 - time));

    vec3 charcoal = vec3(0.0431, 0.0431, 0.0471);
    vec3 silver = vec3(0.78, 0.79, 0.8);
    vec3 lavender = vec3(0.72, 0.67, 0.9);

    float vignette = 1.0 - smoothstep(0.48, 1.28, length(p * vec2(0.82, 0.92)));
    float silverStrength = silk * (0.18 + 0.18 * vignette);
    float lavenderStrength = lavenderFold * (0.12 + 0.16 * vignette);

    vec3 color = charcoal;
    color += silver * silverStrength;
    color += lavender * lavenderStrength;

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
    };
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [activationClass]);

  return <canvas ref={canvasRef} className="liquid-cloth-canvas" aria-hidden="true" />;
}
