import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';
import type { CometType, IComet } from '../../types/comet.types';

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
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Add fade transition with GSAP
    renderer.domElement.style.opacity = '0';
    container.appendChild(renderer.domElement);
    gsap.to(renderer.domElement, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    // DARK THEME: Subtle galaxy background tuned for content readability
    if (!isLight) {
      // Create point cloud with fading stars
      const particleCount = 1800;
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const opacities = new Float32Array(particleCount);
      const fadeSpeeds = new Float32Array(particleCount);
      const fadeOffsets = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 120;
        const y = (Math.random() - 0.5) * 70;
        const z = (Math.random() - 0.5) * 40;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        sizes[i] = Math.random() * 0.7 + 0.9;
        opacities[i] = Math.random(); // Random initial opacity
        fadeSpeeds[i] = 0.5 + Math.random() * 1.5; // Individual fade speed
        fadeOffsets[i] = Math.random() * Math.PI * 2; // Individual phase offset
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
      geometry.setAttribute(
        'fadeSpeed',
        new THREE.BufferAttribute(fadeSpeeds, 1)
      );
      geometry.setAttribute(
        'fadeOffset',
        new THREE.BufferAttribute(fadeOffsets, 1)
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
          attribute float opacity;
          attribute float fadeSpeed;
          attribute float fadeOffset;
          uniform float time;
          uniform float pixelRatio;
          uniform float pointSizeMultiplier;
          
          varying float vSize;
          varying float vOpacity;
          
          void main() {
            vec3 pos = position;
            
            vSize = size;
            
            // Individual fading star effect with unique cycles
            float fadeCycle = sin(time * fadeSpeed + fadeOffset) * 0.5 + 0.5;
            float baseOpacity = opacity * 0.5 + 0.3; // Base opacity range
            vOpacity = baseOpacity + fadeCycle * 0.4; // Fade between base and bright
            vOpacity = clamp(vOpacity, 0.2, 1.0);
            
            // Floating animation
            pos.y += sin(time * 0.2 + position.x * 0.08) * 0.2;
            pos.x += cos(time * 0.15 + position.y * 0.08) * 0.15;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * pixelRatio * (pointSizeMultiplier / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float time;
          uniform float alphaMultiplier;
          
          varying float vSize;
          varying float vOpacity;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            
            vec3 color = mix(color2, color1, vSize);
            
            // Enhanced twinkle with fading effect
            float twinkle = sin(time * 1.0 + vSize * 60.0) * 0.12 + 0.88;
            alpha *= twinkle * vOpacity; // Apply individual fading opacity
            
            // Add glow effect
            float glow = 1.0 - smoothstep(0.0, 0.5, dist);
            alpha += glow * 0.12;
            
            gl_FragColor = vec4(color, alpha * alphaMultiplier);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Subtle comets system
      const comets: IComet[] = [];
      const cometsGroup = new THREE.Group();
      scene.add(cometsGroup);

      // Object pool for comets (optimization)
      const cometPool: THREE.Line[] = [];
      const MAX_POOL_SIZE = 12;

      const getCometFromPool = (): THREE.Line | null => {
        if (cometPool.length > 0) {
          return cometPool.pop() || null;
        }
        return null;
      };

      const returnCometToPool = (line: THREE.Line) => {
        if (cometPool.length < MAX_POOL_SIZE) {
          line.visible = false;
          cometPool.push(line);
        } else {
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
        }
      };

      const createComet = (type: CometType = 'medium') => {
        // Random starting position
        const startX = (Math.random() - 0.5) * 100;
        const startY = 40;

        let length: number;
        let angle: number;
        let speed: number;
        let maxLife: number;
        let tailSegments: number;
        let color: THREE.Color;

        // Configure based on type
        switch (type) {
          case 'large': {
            length = 18 + Math.random() * 10;
            angle = (Math.random() - 0.5) * 0.25;
            speed = 10 + Math.random() * 6;
            maxLife = 6;
            tailSegments = 40;
            // Purple variants from project colors
            const largeColors = [
              new THREE.Color(0xa78bfa), // accent
              new THREE.Color(0xc4b5fd), // accent-hover
              new THREE.Color(0x8b5cf6), // gradient-end
            ];
            color = largeColors[Math.floor(Math.random() * largeColors.length)];
            break;
          }
          default: {
            // medium
            length = 10 + Math.random() * 6;
            angle = (Math.random() - 0.5) * 0.3;
            speed = 14 + Math.random() * 8;
            maxLife = 4;
            tailSegments = 30;
            const mediumColors = [
              new THREE.Color(0xc4b5fd),
              new THREE.Color(0xa78bfa),
              new THREE.Color(0xddd6fe),
            ];
            color =
              mediumColors[Math.floor(Math.random() * mediumColors.length)];
            break;
          }
        }

        // Try to reuse from pool
        let cometLine = getCometFromPool();
        let tailGeometry: THREE.BufferGeometry;
        let originalPositions: Float32Array;

        if (cometLine) {
          tailGeometry = cometLine.geometry;
          originalPositions = new Float32Array(
            tailGeometry.attributes.position.array
          );
          cometLine.visible = true;
        } else {
          // Create new comet
          const tailPoints: THREE.Vector3[] = [];
          tailPoints.push(new THREE.Vector3(startX, startY, 0));

          for (let i = 1; i <= tailSegments; i++) {
            const t = i / tailSegments;
            const tailX = startX + Math.sin(angle) * t * length * 0.3;
            const tailY = startY - t * length;
            tailPoints.push(new THREE.Vector3(tailX, tailY, 0));
          }

          tailGeometry = new THREE.BufferGeometry().setFromPoints(tailPoints);
          const positions = tailGeometry.attributes.position;
          originalPositions = new Float32Array(positions.array);
        }

        // Update geometry if reused
        if (cometLine) {
          const positions = tailGeometry.attributes.position;
          const positionsArray = positions.array as Float32Array;
          const tailPoints: THREE.Vector3[] = [];
          tailPoints.push(new THREE.Vector3(startX, startY, 0));

          for (let i = 1; i <= tailSegments; i++) {
            const t = i / tailSegments;
            const tailX = startX + Math.sin(angle) * t * length * 0.3;
            const tailY = startY - t * length;
            tailPoints.push(new THREE.Vector3(tailX, tailY, 0));
          }

          for (let i = 0; i < tailPoints.length; i++) {
            const point = tailPoints[i];
            positionsArray[i * 3] = point.x;
            positionsArray[i * 3 + 1] = point.y;
            positionsArray[i * 3 + 2] = point.z;
          }
          positions.needsUpdate = true;
          originalPositions = new Float32Array(positionsArray);
        }

        // Create or update material
        const cometMaterial = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          linewidth: type === 'large' ? 4 : 3,
          vertexColors: true,
        });

        // Add colors for gradient effect
        const colors: number[] = [];
        const pointCount = tailSegments + 1;
        for (let i = 0; i < pointCount; i++) {
          if (i === 0) {
            colors.push(1.0, 1.0, 1.0); // Bright white head
          } else {
            const t = (i - 1) / (tailSegments - 1);
            const brightness = Math.max(0.2, 1.0 - t * 0.8);
            colors.push(
              color.r * brightness,
              color.g * brightness,
              color.b * brightness
            );
          }
        }
        tailGeometry.setAttribute(
          'color',
          new THREE.Float32BufferAttribute(colors, 3)
        );

        if (!cometLine) {
          cometLine = new THREE.Line(tailGeometry, cometMaterial);
        } else {
          cometLine.material = cometMaterial;
        }

        cometsGroup.add(cometLine);

        comets.push({
          line: cometLine,
          startX,
          startY,
          speed,
          life: 0,
          maxLife,
          originalPositions,
          color,
          type,
        });
      };

      // Spawn timers for subtle comet motion
      let largeCometTimer = 0;
      let mediumCometTimer = 0;
      const getRandomSpawnInterval = (min: number, max: number) =>
        min + Math.random() * (max - min);
      let nextLargeComet = getRandomSpawnInterval(18, 28);
      let nextMediumComet = getRandomSpawnInterval(12, 20);

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
        const deltaTime = clock.getDelta();

        material.uniforms.time.value = elapsedTime;
        particles.rotation.z = elapsedTime * 0.008;

        // Spawn different comet types
        largeCometTimer += deltaTime;
        if (largeCometTimer >= nextLargeComet) {
          createComet('large');
          largeCometTimer = 0;
          nextLargeComet = getRandomSpawnInterval(18, 28);
        }

        mediumCometTimer += deltaTime;
        if (mediumCometTimer >= nextMediumComet) {
          createComet('medium');
          mediumCometTimer = 0;
          nextMediumComet = getRandomSpawnInterval(12, 20);
        }

        // Update existing comets
        for (let i = comets.length - 1; i >= 0; i--) {
          const comet = comets[i];
          comet.life += deltaTime;

          const offsetY = -comet.speed * comet.life;
          const offsetX = Math.sin(comet.life * 0.5) * 2;

          const positions = comet.line.geometry.attributes.position;
          const positionsArray = positions.array as Float32Array;
          for (let j = 0; j < comet.originalPositions.length; j += 3) {
            positionsArray[j] = comet.originalPositions[j] + offsetX;
            positionsArray[j + 1] = comet.originalPositions[j + 1] + offsetY;
            positionsArray[j + 2] = comet.originalPositions[j + 2];
          }
          positions.needsUpdate = true;

          const lifeProgress = comet.life / comet.maxLife;
          const opacity =
            lifeProgress < 0.8
              ? 1.0
              : Math.max(0, 1 - ((lifeProgress - 0.8) / 0.2) * 5);
          const cometMaterial = comet.line.material as THREE.LineBasicMaterial;
          cometMaterial.opacity = opacity;

          const currentY = comet.startY + offsetY;
          if (comet.life >= comet.maxLife || currentY < -50) {
            cometsGroup.remove(comet.line);
            returnCometToPool(comet.line);
            comets.splice(i, 1);
          }
        }

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);

        // Cleanup comets
        comets.forEach((comet) => {
          cometsGroup.remove(comet.line);
          comet.line.geometry.dispose();
          (comet.line.material as THREE.Material).dispose();
        });
        comets.length = 0;

        // Cleanup pool
        cometPool.forEach((line) => {
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
        });
        cometPool.length = 0;

        geometry.dispose();
        material.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } else {
      // LIGHT THEME: Elegant floating particles with gradient waves
      const particleCount = 2000;
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);
      const phases = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 120;
        const y = (Math.random() - 0.5) * 70;
        const z = (Math.random() - 0.5) * 40;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        sizes[i] = Math.random() * 0.3 + 0.2;
        phases[i] = Math.random() * Math.PI * 2;

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
      geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

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
          attribute float phase;
          uniform float time;
          uniform float pixelRatio;
          uniform float pointSizeMultiplier;
          
          varying float vSize;
          varying float vPhase;
          
          void main() {
            vec3 pos = position;
            
            // Gentle floating movement with phase offset
            pos += velocity * time * 10.0;
            pos.y += sin(time * 0.3 + position.x * 0.05 + phase) * 0.3;
            pos.x += cos(time * 0.25 + position.y * 0.05 + phase) * 0.2;
            
            // Wrap around edges
            if (pos.x > 60.0) pos.x = -60.0;
            if (pos.x < -60.0) pos.x = 60.0;
            if (pos.y > 35.0) pos.y = -35.0;
            if (pos.y < -35.0) pos.y = 35.0;
            
            vSize = size;
            vPhase = phase;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * pixelRatio * (pointSizeMultiplier / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float time;
          uniform float alphaMultiplier;
          
          varying float vSize;
          varying float vPhase;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
            
            vec3 color = mix(color2, color1, vSize);
            
            // Gentle pulsing with phase offset
            float pulse = sin(time * 0.8 + vSize * 50.0 + vPhase) * 0.15 + 0.85;
            alpha *= pulse;
            
            // Soft glow
            float glow = 1.0 - smoothstep(0.0, 0.4, dist);
            alpha += glow * 0.2;
            
            gl_FragColor = vec4(color, alpha * alphaMultiplier);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Add gradient wave background using canvas
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      let gradientInterval: number | null = null;
      let gradientTexture: THREE.CanvasTexture | null = null;
      let planeGeometry: THREE.PlaneGeometry | null = null;
      let planeMaterial: THREE.MeshBasicMaterial | null = null;
      let plane: THREE.Mesh | null = null;

      if (ctx) {
        gradientTexture = new THREE.CanvasTexture(canvas);
        gradientTexture.wrapS = THREE.RepeatWrapping;
        gradientTexture.wrapT = THREE.RepeatWrapping;

        planeGeometry = new THREE.PlaneGeometry(200, 120);
        planeMaterial = new THREE.MeshBasicMaterial({
          map: gradientTexture,
          transparent: true,
          opacity: 0.15,
          depthWrite: false,
        });
        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.z = -30;
        scene.add(plane);

        // Animate gradient
        let gradientTime = 0;
        const updateGradient = () => {
          if (!ctx || !gradientTexture) return;
          gradientTime += 0.01;

          const gradient = ctx.createLinearGradient(0, 0, 256, 256);
          const offset1 = (Math.sin(gradientTime) + 1) * 0.5;
          const offset2 = (Math.cos(gradientTime * 0.7) + 1) * 0.5;

          gradient.addColorStop(
            0,
            `rgba(124, 58, 237, ${0.3 + offset1 * 0.2})`
          );
          gradient.addColorStop(
            0.5,
            `rgba(167, 139, 250, ${0.2 + offset2 * 0.15})`
          );
          gradient.addColorStop(
            1,
            `rgba(196, 181, 253, ${0.1 + offset1 * 0.1})`
          );

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 256, 256);
          gradientTexture.needsUpdate = true;
        };

        gradientInterval = window.setInterval(updateGradient, 50);
        updateGradient();
      }

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
        particles.rotation.z = elapsedTime * 0.003;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);

        // Cleanup gradient
        if (gradientInterval !== null) {
          clearInterval(gradientInterval);
        }
        if (gradientTexture) {
          gradientTexture.dispose();
        }
        if (planeGeometry) {
          planeGeometry.dispose();
        }
        if (planeMaterial) {
          planeMaterial.dispose();
        }

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
