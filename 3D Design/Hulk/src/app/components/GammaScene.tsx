import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function GammaScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    energySphere: THREE.Mesh;
    time: number;
  } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create gamma energy sphere with pulsing effect
    const sphereGeometry = new THREE.IcosahedronGeometry(1.5, 4);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x39ff14,
      emissive: 0x39ff14,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const energySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(energySphere);

    // Add inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.4, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x39ff14,
      transparent: true,
      opacity: 0.15,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    // Create particle system for energy field
    const particleCount = 3000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random spherical distribution
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Green with some variation
      colors[i3] = 0.2 + Math.random() * 0.3; // R
      colors[i3 + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i3 + 2] = 0.1 + Math.random() * 0.2; // B

      sizes[i] = Math.random() * 2 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const pointLight1 = new THREE.PointLight(0x39ff14, 2, 100);
    pointLight1.position.set(0, 0, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b00ff, 0.5, 100);
    pointLight2.position.set(-5, 5, -5);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      energySphere,
      time: 0,
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!sceneRef.current) return;

      const { renderer, scene, camera, particles, energySphere, time } = sceneRef.current;
      sceneRef.current.time += 0.01;

      // Rotate particles
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.02;

      // Pulse energy sphere
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      energySphere.scale.setScalar(pulse);
      energySphere.rotation.y = time * 0.1;
      energySphere.rotation.x = time * 0.05;

      // Animate particle positions (floating effect)
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Update glow intensity
      (energySphere.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        0.4 + Math.sin(time * 3) * 0.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      const { camera, renderer } = sceneRef.current;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Handle scroll (parallax effect)
    const handleScroll = () => {
      if (!sceneRef.current) return;
      const scrollY = window.scrollY;
      sceneRef.current.camera.position.y = scrollY * 0.001;
      sceneRef.current.camera.rotation.x = scrollY * 0.0001;
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      
      if (sceneRef.current && containerRef.current) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
        sceneRef.current.renderer.dispose();
        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
    />
  );
}