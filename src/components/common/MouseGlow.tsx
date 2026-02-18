import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

interface MouseGlowProps {
  paused?: boolean;
}

export function MouseGlow({ paused = false }: MouseGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const { theme } = useTheme();

  useEffect(() => {
    pausedRef.current = paused;

    if (containerRef.current) {
      containerRef.current.style.opacity = paused ? '0' : '1';
    }
  }, [paused]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Clear any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const isLight = theme === 'light';

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Add fade transition with GSAP
    renderer.domElement.style.opacity = '0';
    container.appendChild(renderer.domElement);
    gsap.to(renderer.domElement, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    // DARK THEME: Subtle moving particles with static color/opacity
    if (!isLight) {
      // Create point cloud
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 120;
        const y = (Math.random() - 0.5) * 70;
        const z = (Math.random() - 0.5) * 40;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        sizes[i] = Math.random() * 0.7 + 0.9;
        velocities[i * 3] = (Math.random() - 0.5) * 0.018;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.018;
        velocities[i * 3 + 2] = 0;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute(
        'velocity',
        new THREE.BufferAttribute(velocities, 3)
      );

      const color1 = new THREE.Color(0x9f8bd4);
      const color2 = new THREE.Color(0x6b5ca8);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: color1 },
          color2: { value: color2 },
          pixelRatio: { value: renderer.getPixelRatio() },
          pointSizeMultiplier: { value: 40.0 },
          alphaMultiplier: { value: 0.38 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 velocity;
          uniform float time;
          uniform float pixelRatio;
          uniform float pointSizeMultiplier;
          
          varying float vSize;
          
          void main() {
            vec3 pos = position;
            
            vSize = size;
            
            // Constant drift without brightness modulation
            pos += velocity * time * 10.0;
            if (pos.x > 60.0) pos.x = -60.0;
            if (pos.x < -60.0) pos.x = 60.0;
            if (pos.y > 35.0) pos.y = -35.0;
            if (pos.y < -35.0) pos.y = 35.0;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * pixelRatio * (pointSizeMultiplier / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float alphaMultiplier;
          
          varying float vSize;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            
            vec3 color = mix(color2, color1, vSize);
            alpha *= 0.92;
            
            gl_FragColor = vec4(color, alpha * alphaMultiplier);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.pixelRatio.value = renderer.getPixelRatio();
      };

      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();
      let animationId: number;

      const animate = () => {
        if (pausedRef.current) {
          clock.getDelta();
          animationId = requestAnimationFrame(animate);
          return;
        }

        const elapsedTime = clock.getElapsedTime();
        clock.getDelta();

        material.uniforms.time.value = elapsedTime;

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);

        geometry.dispose();
        material.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } else {
      // LIGHT THEME: Elegant floating particles with gradient waves
      const particleCount = 1200;
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 120;
        const y = (Math.random() - 0.5) * 70;
        const z = (Math.random() - 0.5) * 40;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        sizes[i] = Math.random() * 0.3 + 0.2;

        // Slow floating velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute(
        'velocity',
        new THREE.BufferAttribute(velocities, 3)
      );

      // Light theme colors from project palette
      const color1 = new THREE.Color(0x7c3aed); // accent
      const color2 = new THREE.Color(0xa78bfa); // accent-hover

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: color1 },
          color2: { value: color2 },
          pixelRatio: { value: renderer.getPixelRatio() },
          pointSizeMultiplier: { value: 35.0 },
          alphaMultiplier: { value: 0.5 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 velocity;
          uniform float time;
          uniform float pixelRatio;
          uniform float pointSizeMultiplier;
          
          varying float vSize;
          
          void main() {
            vec3 pos = position;
            
            // Constant drift
            pos += velocity * time * 10.0;
            
            // Wrap around edges
            if (pos.x > 60.0) pos.x = -60.0;
            if (pos.x < -60.0) pos.x = 60.0;
            if (pos.y > 35.0) pos.y = -35.0;
            if (pos.y < -35.0) pos.y = 35.0;
            
            vSize = size;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * pixelRatio * (pointSizeMultiplier / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float alphaMultiplier;
          
          varying float vSize;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
            
            vec3 color = mix(color2, color1, vSize);
            alpha *= 0.9;
            
            gl_FragColor = vec4(color, alpha * alphaMultiplier);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.pixelRatio.value = renderer.getPixelRatio();
      };

      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();
      let animationId: number;

      const animate = () => {
        if (pausedRef.current) {
          animationId = requestAnimationFrame(animate);
          return;
        }

        const elapsedTime = clock.getElapsedTime();
        material.uniforms.time.value = elapsedTime;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);

        geometry.dispose();
        material.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none transition-opacity duration-200"
    />
  );
}
