"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// --- Three.js Canvas Component ---
export const WovenLightHero = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const mountNode = mountRef.current;
    mountNode.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // --- Woven Silk ---
    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const vertCount = torusKnot.attributes.position.count;
    const torusPos = torusKnot.attributes.position;

    // Pre-allocate temp vectors (avoid GC in hot loop)
    const _currentPos = new THREE.Vector3();
    const _originalPos = new THREE.Vector3();
    const _velocity = new THREE.Vector3();
    const _mouseWorld = new THREE.Vector3();

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % vertCount;
        const x = torusPos.getX(vertexIndex);
        const y = torusPos.getY(vertexIndex);
        const z = torusPos.getZ(vertexIndex);
        
        const i3 = i * 3;
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
        originalPositions[i3] = x;
        originalPositions[i3 + 1] = y;
        originalPositions[i3 + 2] = z;

        const hue = Math.random();
        const l = isDarkMode ? 0.5 : 0.7;
        // Inline HSL to RGB (s=0.8)
        const s = 0.8;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x2 = c * (1 - Math.abs((hue * 6) % 2 - 1));
        const m = l - c / 2;
        let r1 = 0, g1 = 0, b1 = 0;
        const h6 = hue * 6;
        if (h6 < 1) { r1 = c; g1 = x2; }
        else if (h6 < 2) { r1 = x2; g1 = c; }
        else if (h6 < 3) { g1 = c; b1 = x2; }
        else if (h6 < 4) { g1 = x2; b1 = c; }
        else if (h6 < 5) { r1 = x2; b1 = c; }
        else { r1 = c; b1 = x2; }
        colors[i3] = r1 + m;
        colors[i3 + 1] = g1 + m;
        colors[i3 + 2] = b1 + m;

        velocities[i3] = 0;
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = 0;
    }

    torusKnot.dispose();

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
        transparent: true,
        opacity: isDarkMode ? 1.0 : 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Visibility-based pause to free main thread when off-screen
    let isVisible = true;
    let rafId = 0;
    const visibilityIO = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId) {
          clock.getDelta(); // reset delta so no jump
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    visibilityIO.observe(mountNode);

    const animate = () => {
        if (!isVisible) { rafId = 0; return; }
        rafId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        _mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            _currentPos.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            _originalPos.set(originalPositions[i3], originalPositions[i3 + 1], originalPositions[i3 + 2]);
            _velocity.set(velocities[i3], velocities[i3 + 1], velocities[i3 + 2]);

            const dx = _currentPos.x - _mouseWorld.x;
            const dy = _currentPos.y - _mouseWorld.y;
            const dz = _currentPos.z - _mouseWorld.z;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 2.25) { // 1.5^2
                const dist = Math.sqrt(distSq);
                const force = (1.5 - dist) * 0.01;
                const invDist = 1 / (dist || 1);
                _velocity.x += dx * invDist * force;
                _velocity.y += dy * invDist * force;
                _velocity.z += dz * invDist * force;
            }

            // Return to original position
            _velocity.x += (_originalPos.x - _currentPos.x) * 0.001;
            _velocity.y += (_originalPos.y - _currentPos.y) * 0.001;
            _velocity.z += (_originalPos.z - _currentPos.z) * 0.001;
            
            // Damping
            _velocity.x *= 0.95;
            _velocity.y *= 0.95;
            _velocity.z *= 0.95;

            positions[i3] += _velocity.x;
            positions[i3 + 1] += _velocity.y;
            positions[i3 + 2] += _velocity.z;
            
            velocities[i3] = _velocity.x;
            velocities[i3 + 1] = _velocity.y;
            velocities[i3 + 2] = _velocity.z;
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y = elapsedTime * 0.05;
        renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
        cancelAnimationFrame(rafId);
        visibilityIO.disconnect();
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (mountNode.contains(renderer.domElement)) {
          mountNode.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={mountRef} className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[30%] h-full z-0" />;
};
