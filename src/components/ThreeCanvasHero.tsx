import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Orbit } from 'lucide-react';

interface ThreeCanvasHeroProps {
  onInteract?: () => void;
}

export const ThreeCanvasHero: React.FC<ThreeCanvasHeroProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isSpinningFast, setIsSpinningFast] = useState(false);
  const [boardFocus, setBoardFocus] = useState<'both' | 'icse' | 'cbse'>('both');
  const [hasWebGL, setHasWebGL] = useState(true);

  // References for runtime manipulation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const coreWireMeshRef = useRef<THREE.LineSegments | null>(null);
  const ringIcseRef = useRef<THREE.Mesh | null>(null);
  const ringCbseRef = useRef<THREE.Mesh | null>(null);
  const satellitesRef = useRef<THREE.Group[]>([]);
  const shockwaveRef = useRef<THREE.Mesh | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });
  const rotationDampingRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    // Key Light (Amber warm)
    const keyLight = new THREE.DirectionalLight(0xf59e0b, 3.5);
    keyLight.position.set(6, 6, 8);
    scene.add(keyLight);

    // Fill Light (Cyan cool)
    const fillLight = new THREE.DirectionalLight(0x06b6d4, 3.0);
    fillLight.position.set(-6, -4, 6);
    scene.add(fillLight);

    // Rim Light (Clean white)
    const rimLight = new THREE.PointLight(0xffffff, 4.0, 15);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // 1. Central Core: Knowledge Polyhedron (Icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x091e42,
      roughness: 0.25,
      metalness: 0.85,
      emissive: 0x0a2540,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Core Wireframe overlay
    const wireframeGeometry = new THREE.WireframeGeometry(coreGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      linewidth: 1,
    });
    const coreWireMesh = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    coreMesh.add(coreWireMesh);
    coreWireMeshRef.current = coreWireMesh;

    // 2. Dual Board Orbit Rings:
    // ICSE Orbit (Amber/Gold ring tilted 35 deg)
    const icseRingGeo = new THREE.TorusGeometry(3.0, 0.04, 16, 120);
    const icseRingMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ringIcse = new THREE.Mesh(icseRingGeo, icseRingMat);
    ringIcse.rotation.x = Math.PI / 4;
    ringIcse.rotation.y = Math.PI / 6;
    scene.add(ringIcse);
    ringIcseRef.current = ringIcse;

    // CBSE Orbit (Cyan/Sky ring tilted -40 deg)
    const cbseRingGeo = new THREE.TorusGeometry(3.4, 0.04, 16, 120);
    const cbseRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ringCbse = new THREE.Mesh(cbseRingGeo, cbseRingMat);
    ringCbse.rotation.x = -Math.PI / 3.5;
    ringCbse.rotation.y = -Math.PI / 5;
    scene.add(ringCbse);
    ringCbseRef.current = ringCbse;

    // 3. Orbiting Subject Satellites
    const subjects = [
      { color: 0xf59e0b, size: 0.32, dist: 3.0, speed: 0.9, label: 'ICSE Math' },
      { color: 0x06b6d4, size: 0.30, dist: 3.4, speed: -0.75, label: 'CBSE Science' },
      { color: 0x10b981, size: 0.26, dist: 2.3, speed: 1.2, label: 'STEM Lab' },
      { color: 0x8b5cf6, size: 0.24, dist: 3.8, speed: -0.6, label: 'Analytics' },
    ];

    const satellites: THREE.Group[] = [];
    subjects.forEach((sub) => {
      const pivot = new THREE.Group();
      scene.add(pivot);

      // Satellite body
      const satGeo = new THREE.SphereGeometry(sub.size, 24, 24);
      const satMat = new THREE.MeshStandardMaterial({
        color: sub.color,
        emissive: sub.color,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.7,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.x = sub.dist;
      pivot.add(satMesh);

      // Mini satellite halo
      const haloGeo = new THREE.RingGeometry(sub.size * 1.3, sub.size * 1.45, 24);
      const haloMat = new THREE.MeshBasicMaterial({ color: sub.color, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.x = sub.dist;
      haloMesh.rotation.x = Math.PI / 2;
      pivot.add(haloMesh);

      satellites.push(pivot);
    });
    satellitesRef.current = satellites;

    // 4. Floating Academic Particle Field
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      // Alternating amber and cyan colors
      const isAmber = Math.random() > 0.5;
      particleColors[i * 3] = isAmber ? 0.96 : 0.05;
      particleColors[i * 3 + 1] = isAmber ? 0.62 : 0.71;
      particleColors[i * 3 + 2] = isAmber ? 0.05 : 0.83;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Expandable Shockwave Pulse
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.2, 48);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwave.rotation.x = Math.PI / 2;
    scene.add(shockwave);
    shockwaveRef.current = shockwave;

    // Mouse Tracking for Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current.targetX = x * 0.45;
      mousePosRef.current.targetY = y * 0.45;

      if (isDraggingRef.current && coreMeshRef.current) {
        const deltaX = e.clientX - previousPointerPositionRef.current.x;
        const deltaY = e.clientY - previousPointerPositionRef.current.y;
        coreMeshRef.current.rotation.y += deltaX * 0.01;
        coreMeshRef.current.rotation.x += deltaY * 0.01;
        previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speedMultiplier = isSpinningFast ? 2.5 : 1.0;

      // Parallax smooth interpolation
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05;

      camera.position.x = mousePosRef.current.x * 2.2;
      camera.position.y = mousePosRef.current.y * 1.5;
      camera.lookAt(0, 0, 0);

      // Core rotation
      if (coreMeshRef.current && !isDraggingRef.current) {
        coreMeshRef.current.rotation.y += 0.008 * speedMultiplier;
        coreMeshRef.current.rotation.x += 0.004 * speedMultiplier;
      }

      // Rings dynamic spin & breathing
      if (ringIcseRef.current) {
        ringIcseRef.current.rotation.z += 0.006 * speedMultiplier;
        ringIcseRef.current.rotation.y += 0.003 * speedMultiplier;
      }
      if (ringCbseRef.current) {
        ringCbseRef.current.rotation.z -= 0.005 * speedMultiplier;
        ringCbseRef.current.rotation.x -= 0.003 * speedMultiplier;
      }

      // Satellites orbiting
      satellites.forEach((sat, index) => {
        const sub = subjects[index];
        sat.rotation.y = elapsedTime * sub.speed * speedMultiplier * 0.6;
        sat.rotation.z = Math.sin(elapsedTime * 0.5 + index) * 0.2;
      });

      // Particles gentle drift
      particles.rotation.y = elapsedTime * 0.02;

      // Shockwave animation if active
      if (shockwaveRef.current && shockwaveRef.current.scale.x > 0.1) {
        shockwaveRef.current.scale.x += 0.15;
        shockwaveRef.current.scale.y += 0.15;
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity *= 0.94;
        if (mat.opacity < 0.01) {
          shockwaveRef.current.scale.set(0.1, 0.1, 0.1);
          mat.opacity = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [isSpinningFast]);

  // Handle wireframe toggling
  useEffect(() => {
    if (coreWireMeshRef.current) {
      coreWireMeshRef.current.visible = isWireframe;
    }
    if (coreMeshRef.current) {
      (coreMeshRef.current.material as THREE.MeshStandardMaterial).wireframe = isWireframe;
    }
  }, [isWireframe]);

  // Handle board focus
  useEffect(() => {
    if (ringIcseRef.current && ringCbseRef.current) {
      if (boardFocus === 'both') {
        ringIcseRef.current.visible = true;
        ringCbseRef.current.visible = true;
      } else if (boardFocus === 'icse') {
        ringIcseRef.current.visible = true;
        ringCbseRef.current.visible = false;
      } else if (boardFocus === 'cbse') {
        ringIcseRef.current.visible = false;
        ringCbseRef.current.visible = true;
      }
    }
  }, [boardFocus]);

  // Trigger pulse wave
  const triggerKnowledgePulse = () => {
    if (shockwaveRef.current) {
      shockwaveRef.current.scale.set(0.5, 0.5, 0.5);
      const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.9;
      mat.color.setHex(boardFocus === 'icse' ? 0xf59e0b : boardFocus === 'cbse' ? 0x06b6d4 : 0x38bdf8);
    }
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 border border-slate-800/80 shadow-2xl flex items-center justify-center">
      {/* 3D Canvas Mounting Node */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate 3D Knowledge Core"
      />

      {/* WebGL Fallback if device lacks hardware acceleration */}
      {!hasWebGL && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
            <Orbit className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Wisdom 3D Engine Preview</h4>
          <p className="text-sm text-slate-400 max-w-sm">
            Experience our dual-board ICSE & CBSE conceptual curriculum system.
          </p>
        </div>
      )}

      {/* Top Floating Orbit Status Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">
            3D Spatial Matrix
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-xs font-mono text-cyan-400">Classes VI–X</span>
        </div>

        {/* Orbit Filter Controls */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 pointer-events-auto">
          <button
            onClick={() => setBoardFocus('both')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              boardFocus === 'both' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dual Orbit
          </button>
          <button
            onClick={() => setBoardFocus('icse')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              boardFocus === 'icse' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            ICSE Stream
          </button>
          <button
            onClick={() => setBoardFocus('cbse')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              boardFocus === 'cbse' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            CBSE Stream
          </button>
        </div>
      </div>

      {/* Interactive Orbit HUD Controls on Bottom */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-400 pointer-events-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Drag to orbit 360°</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Structural Wireframe Geometry"
            className={`p-2 rounded-xl border transition-colors ${
              isWireframe
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsSpinningFast(!isSpinningFast)}
            title="Toggle Core Acceleration"
            className={`p-2 rounded-xl border transition-colors ${
              isSpinningFast
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={triggerKnowledgePulse}
            title="Emit Concept Knowledge Shockwave"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-medium text-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pulse Wave</span>
          </button>
        </div>
      </div>
    </div>
  );
};
