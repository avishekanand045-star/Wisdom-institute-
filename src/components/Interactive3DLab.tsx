import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Atom, Compass, Play, RotateCcw, Sparkles, Zap, Layers } from 'lucide-react';

const ELEMENTS_LIST = [
  { name: 'Hydrogen', symbol: 'H', z: 1, config: [1], valency: 1, notes: 'Single electron in K-shell. Highly reactive.' },
  { name: 'Carbon', symbol: 'C', z: 6, config: [2, 4], valency: 4, notes: 'Tetravalent. Forms covalent bonds in Organic Chemistry (Class 10).' },
  { name: 'Oxygen', symbol: 'O', z: 8, config: [2, 6], valency: 2, notes: 'Needs 2 electrons for stable octet configuration.' },
  { name: 'Sodium', symbol: 'Na', z: 11, config: [2, 8, 1], valency: 1, notes: 'Alkali metal with 1 valence electron in M-shell.' },
  { name: 'Chlorine', symbol: 'Cl', z: 17, config: [2, 8, 7], valency: 1, notes: 'Halogen. Strongly electronegative with 7 valence electrons.' },
  { name: 'Calcium', symbol: 'Ca', z: 20, config: [2, 8, 8, 2], valency: 2, notes: 'Alkaline earth metal with filled M-octet and 2 N-electrons.' },
];

export const Interactive3DLab: React.FC = () => {
  const [labMode, setLabMode] = useState<'atom' | 'optics'>('atom');
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(3); // Sodium
  const [angleIncidence, setAngleIncidence] = useState<number>(45);
  const [refractiveIndex, setRefractiveIndex] = useState<number>(1.52); // Glass
  const [isExcited, setIsExcited] = useState<boolean>(false);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const currentElement = ELEMENTS_LIST[selectedElementIndex];

  // Calculate Snell's Law Angle of Refraction (in radians then degrees)
  const angleIncRad = (angleIncidence * Math.PI) / 180;
  const sinR = Math.sin(angleIncRad) / refractiveIndex;
  const angleRefDeg = (Math.asin(Math.min(sinR, 0.99)) * 180) / Math.PI;
  const angleDevDeg = Math.abs(angleIncidence - angleRefDeg);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    const electrons: { mesh: THREE.Mesh; shellRadius: number; speed: number; angle: number; axis: THREE.Vector3 }[] = [];

    if (labMode === 'atom') {
      // 1. Nucleus
      const nucleusGeo = new THREE.SphereGeometry(0.55, 32, 32);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xb91c1c,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      group.add(nucleus);

      // Mini proton/neutron cluster effect
      for (let i = 0; i < 6; i++) {
        const pGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const pMat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xef4444 : 0x3b82f6,
          roughness: 0.3,
        });
        const p = new THREE.Mesh(pGeo, pMat);
        const phi = Math.random() * Math.PI;
        const theta = Math.random() * Math.PI * 2;
        p.position.set(0.35 * Math.sin(phi) * Math.cos(theta), 0.35 * Math.sin(phi) * Math.sin(theta), 0.35 * Math.cos(phi));
        group.add(p);
      }

      // 2. Electron Shells
      const shellRadii = [1.3, 2.1, 2.9, 3.7]; // K, L, M, N
      const config = currentElement.config;

      config.forEach((electronCount, shellIdx) => {
        const radius = shellRadii[shellIdx];

        // Shell ring
        const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: isExcited ? 0xf59e0b : 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2 + (shellIdx * 0.2);
        group.add(ring);

        // Electrons on this shell
        for (let e = 0; e < electronCount; e++) {
          const eGeo = new THREE.SphereGeometry(0.12, 16, 16);
          const eMat = new THREE.MeshStandardMaterial({
            color: isExcited ? 0xfbbf24 : 0x06b6d4,
            emissive: isExcited ? 0xf59e0b : 0x0891b2,
            emissiveIntensity: 0.9,
          });
          const eMesh = new THREE.Mesh(eGeo, eMat);
          group.add(eMesh);

          electrons.push({
            mesh: eMesh,
            shellRadius: radius,
            speed: (1.5 - shellIdx * 0.25) * (isExcited ? 2.5 : 1),
            angle: (e * (Math.PI * 2)) / electronCount,
            axis: new THREE.Vector3(0, 1, shellIdx * 0.1).normalize(),
          });
        }
      });
    } else {
      // Optics 3D Glass Prism Simulation
      const prismGeo = new THREE.CylinderGeometry(1.8, 1.8, 2.2, 3, 1);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.65,
        roughness: 0.05,
        transmission: 0.9,
        ior: refractiveIndex,
        thickness: 1.5,
      });
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.rotation.y = Math.PI / 6;
      group.add(prism);

      // Incident ray (White beam)
      const rayGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2);
      const rayMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(-2.2, 0, 0);
      ray.rotation.z = Math.PI / 2 - (angleIncidence * Math.PI) / 180;
      group.add(ray);

      // Dispersed spectrum rays exiting
      const spectrumColors = [0xef4444, 0xf97316, 0xeab308, 0x22c55e, 0x06b6d4, 0x3b82f6, 0x8b5cf6];
      spectrumColors.forEach((col, idx) => {
        const spreadAngle = (idx - 3) * 0.04;
        const outRayGeo = new THREE.CylinderGeometry(0.025, 0.025, 3.4);
        const outRayMat = new THREE.MeshBasicMaterial({ color: col });
        const outRay = new THREE.Mesh(outRayGeo, outRayMat);
        outRay.position.set(1.9, -0.2, 0);
        outRay.rotation.z = Math.PI / 2 + angleRefDeg * 0.015 + spreadAngle;
        group.add(outRay);
      });
    }

    // Animation
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (labMode === 'atom') {
        electrons.forEach((el) => {
          el.angle += el.speed * delta;
          el.mesh.position.x = el.shellRadius * Math.cos(el.angle);
          el.mesh.position.y = el.shellRadius * Math.sin(el.angle) * 0.85;
          el.mesh.position.z = el.shellRadius * Math.sin(el.angle) * 0.4;
        });
        group.rotation.y = elapsed * 0.15;
      } else {
        group.rotation.y = Math.PI / 6 + Math.sin(elapsed * 0.5) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [labMode, selectedElementIndex, angleIncidence, refractiveIndex, isExcited]);

  return (
    <section id="3d-lab" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-amber-400 uppercase tracking-wider font-mono">Hands-on EdTech</span>
            <span aria-hidden="true">·</span>
            <span>Interactive WebGL Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>NCERT & ICSE Lab Correlated</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Experience Science in 3D Space
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            At Wisdom Institute, students don't memorize flat diagrams. They interact with dynamic 3D
            simulations to understand atomic orbitals, light dispersion, and reaction mechanics.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex items-center gap-1 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 mt-2">
            <button
              onClick={() => setLabMode('atom')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                labMode === 'atom'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Atom className="w-4 h-4" />
              <span>3D Bohr Atomic Structure</span>
            </button>
            <button
              onClick={() => setLabMode('optics')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                labMode === 'optics'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>3D Prism Light Refraction</span>
            </button>
          </div>
        </div>

        {/* 2-Zone Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950/90 rounded-3xl border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Left Zone: 3D Visual Stage */}
          <div className="lg:col-span-7 relative h-[420px] lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800">
            <div ref={canvasContainerRef} className="w-full h-full select-none" />

            {/* Stage HUD Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {labMode === 'atom'
                  ? `${currentElement.name} (Z = ${currentElement.z})`
                  : `Prism Refraction (μ = ${refractiveIndex})`}
              </span>
            </div>

            {labMode === 'atom' && (
              <div className="absolute bottom-4 right-4 pointer-events-auto">
                <button
                  onClick={() => setIsExcited(!isExcited)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                    isExcited
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isExcited ? 'Excited State Active' : 'Excite Electrons'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Zone: Control & Concept Deck */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {labMode === 'atom' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-display mb-1">
                    Bohr Shell Structure Explorer
                  </h3>
                  <p className="text-xs text-slate-400">
                    Mandatory curriculum for ICSE Class 8–9 Chemistry and CBSE Class 9–10 Science.
                  </p>
                </div>

                {/* Element Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Select Element (Z = 1 to 20):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ELEMENTS_LIST.map((elm, idx) => (
                      <button
                        key={elm.symbol}
                        onClick={() => setSelectedElementIndex(idx)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedElementIndex === idx
                            ? 'bg-amber-400/20 border-amber-400/80 text-white'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold font-mono text-amber-400">{elm.symbol}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Z={elm.z}</span>
                        </div>
                        <div className="text-xs font-medium truncate mt-0.5">{elm.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shell Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Electronic Configuration:</span>
                    <span className="text-amber-400 font-bold tabular-nums">
                      {currentElement.config.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Valency:</span>
                    <span className="text-emerald-400 font-bold tabular-nums">
                      {currentElement.valency}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Board Concept Note: </span>
                    {currentElement.notes}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-display mb-1">
                    Prism Dispersion & Snell's Law
                  </h3>
                  <p className="text-xs text-slate-400">
                    Key experiment for ICSE Class 10 Physics (Light) & CBSE Class 10 Science (Human Eye & Colorful World).
                  </p>
                </div>

                {/* Angle Slider with visible value & unit */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Angle of Incidence (i):</span>
                    <span className="text-amber-400 font-bold tabular-nums">{angleIncidence}°</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="65"
                    value={angleIncidence}
                    onChange={(e) => setAngleIncidence(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>20° (Grazing)</span>
                    <span>45° (Standard)</span>
                    <span>65° (High Deviation)</span>
                  </div>
                </div>

                {/* Material Switcher */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Prism Medium:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setRefractiveIndex(1.52)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-colors ${
                        refractiveIndex === 1.52
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div>Crown Glass</div>
                      <div className="text-[10px] text-slate-500 font-mono">μ = 1.52</div>
                    </button>
                    <button
                      onClick={() => setRefractiveIndex(1.66)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-colors ${
                        refractiveIndex === 1.66
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div>Dense Flint Glass</div>
                      <div className="text-[10px] text-slate-500 font-mono">μ = 1.66</div>
                    </button>
                  </div>
                </div>

                {/* Mathematical Computation Box */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Angle of Refraction (r):</span>
                    <span className="text-cyan-400 font-bold tabular-nums">
                      {angleRefDeg.toFixed(1)}°
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Angle of Deviation (δ):</span>
                    <span className="text-amber-400 font-bold tabular-nums">
                      {angleDevDeg.toFixed(1)}°
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                    Snell's Law: sin({angleIncidence}°) / sin({angleRefDeg.toFixed(1)}°) ≈ {refractiveIndex}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Pedagogical Summary */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-white">Wisdom STEM Advantage</div>
                <div className="text-[11px] text-slate-400">
                  Every enrolled student receives access to 60+ interactive 3D lab modules.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
