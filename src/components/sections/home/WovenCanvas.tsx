"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 50000;
const MOUSE_INFLUENCE_RADIUS = 1.5;

export function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const startedAt = window.performance.now();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const torusPositions = torusKnot.attributes.position;

    if (!(torusPositions instanceof THREE.BufferAttribute)) {
      return;
    }

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const vertexIndex = i % torusPositions.count;
      const x = torusPositions.getX(vertexIndex);
      const y = torusPositions.getY(vertexIndex);
      const z = torusPositions.getZ(vertexIndex);
      const positionIndex = i * 3;
      const color = new THREE.Color();

      positions[positionIndex] = x;
      positions[positionIndex + 1] = y;
      positions[positionIndex + 2] = z;
      originalPositions[positionIndex] = x;
      originalPositions[positionIndex + 1] = y;
      originalPositions[positionIndex + 2] = z;

      color.setHSL(Math.random(), 0.8, 0.5);
      colors[positionIndex] = color.r;
      colors[positionIndex + 1] = color.g;
      colors[positionIndex + 2] = color.b;

      velocities[positionIndex] = 0;
      velocities[positionIndex + 1] = 0;
      velocities[positionIndex + 2] = 0;
    }

    const positionAttribute = new THREE.BufferAttribute(positions, 3);

    geometry.setAttribute("position", positionAttribute);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 1.0,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const positionScene = () => {
      const isDesktop = window.innerWidth >= 768;

      points.position.x = isDesktop ? 1.8 : 0.75;
      points.position.y = 0;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      positionScene();
    };

    positionScene();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let animationFrame: number | null = null;

    const animate = () => {
      animationFrame = window.requestAnimationFrame(animate);

      const elapsedTime = (window.performance.now() - startedAt) / 1000;
      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

      if (!prefersReducedMotion) {
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          const ix = i * 3;
          const iy = ix + 1;
          const iz = ix + 2;
          const currentPos = new THREE.Vector3(
            positions[ix],
            positions[iy],
            positions[iz],
          );
          const originalPos = new THREE.Vector3(
            originalPositions[ix],
            originalPositions[iy],
            originalPositions[iz],
          );
          const velocity = new THREE.Vector3(
            velocities[ix],
            velocities[iy],
            velocities[iz],
          );
          const dist = currentPos.distanceTo(mouseWorld);

          if (dist < MOUSE_INFLUENCE_RADIUS) {
            const force = (MOUSE_INFLUENCE_RADIUS - dist) * 0.01;
            const direction = new THREE.Vector3()
              .subVectors(currentPos, mouseWorld)
              .normalize();
            velocity.add(direction.multiplyScalar(force));
          }

          const returnForce = new THREE.Vector3()
            .subVectors(originalPos, currentPos)
            .multiplyScalar(0.001);
          velocity.add(returnForce);
          velocity.multiplyScalar(0.95);

          positions[ix] = (positions[ix] ?? 0) + velocity.x;
          positions[iy] = (positions[iy] ?? 0) + velocity.y;
          positions[iz] = (positions[iz] ?? 0) + velocity.z;

          velocities[ix] = velocity.x;
          velocities[iy] = velocity.y;
          velocities[iz] = velocity.z;
        }

        positionAttribute.needsUpdate = true;
        points.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }

      torusKnot.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}
