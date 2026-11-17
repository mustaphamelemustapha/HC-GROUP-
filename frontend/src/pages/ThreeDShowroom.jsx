import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Box, 
  RotateCw, 
  Sun, 
  Moon, 
  Sunset, 
  Maximize2, 
  Layers, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  Camera, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Ruler,
  Info
} from 'lucide-react';

// Procedural texture generators for ultra-high-resolution realistic materials
function createMarbleTexture(variant = 'gold') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base marble stone tone
  if (variant === 'nero') {
    ctx.fillStyle = '#11141a';
    ctx.fillRect(0, 0, 1024, 1024);
  } else if (variant === 'verde') {
    ctx.fillStyle = '#0f291e';
    ctx.fillRect(0, 0, 1024, 1024);
  } else {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);
  }

  // Draw intricate vein networks
  const veinColor = variant === 'gold' 
    ? 'rgba(212, 175, 55, 0.45)' 
    : variant === 'nero' 
    ? 'rgba(255, 255, 255, 0.35)' 
    : variant === 'verde'
    ? 'rgba(212, 175, 55, 0.4)'
    : 'rgba(100, 116, 139, 0.35)';

  ctx.strokeStyle = veinColor;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  for (let v = 0; v < 16; v++) {
    ctx.beginPath();
    let x = (v * 70) % 1024;
    let y = 0;
    ctx.moveTo(x, y);

    while (y < 1024) {
      x += (Math.random() - 0.48) * 45;
      y += Math.random() * 50 + 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createCarpetTexture(variant = 'isfahan') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base background
  const bgColors = {
    isfahan: '#0d1b2a',
    sapphire: '#1b263b',
    obsidian: '#1a1a1a',
    pearl: '#d4af37'
  };
  ctx.fillStyle = bgColors[variant] || '#0d1b2a';
  ctx.fillRect(0, 0, 1024, 1024);

  // Intricate medallion border and geometric motifs
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, 964, 964);

  ctx.lineWidth = 6;
  ctx.strokeRect(60, 60, 904, 904);

  // Central ornate medallion
  ctx.save();
  ctx.translate(512, 512);
  for (let i = 0; i < 16; i++) {
    ctx.rotate((Math.PI * 2) / 16);
    ctx.beginPath();
    ctx.ellipse(0, 180, 45, 120, 0, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? 'rgba(212, 175, 55, 0.65)' : 'rgba(239, 68, 68, 0.55)';
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  // Subtle woven fiber texture overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let i = 0; i < 1024; i += 4) {
    ctx.fillRect(i, 0, 2, 1024);
    ctx.fillRect(0, i, 1024, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 3D Configurator Catalog Items
const SHOWROOM_ITEMS = [
  {
    id: 'door-pivot-3d',
    name: 'Executive Grand Copper Pivot Door (Oversized)',
    category: 'Bespoke Architectural Doors',
    sku: 'HC-PIVOT-COPPER-3D',
    price: 3850000,
    dimensions: '1,800mm (W) × 3,200mm (H) × 95mm (T)',
    leadTime: '30 – 40 Business Days',
    desc: 'Oversized engineered pivot entrance featuring German concealed floor closer with 360° fluid damping, biometric multi-point locking, and hand-patinated architectural facing.',
    finishes: [
      { id: 'patina-copper', name: 'Hand-Hammered Patinated Copper', color: '#b87333', metalness: 0.85, roughness: 0.35 },
      { id: 'champagne-gold', name: 'Brushed Champagne Gold & Brass', color: '#d4af37', metalness: 0.92, roughness: 0.28 },
      { id: 'obsidian-black', name: 'Matte Obsidian Architectural Black', color: '#1a1f26', metalness: 0.6, roughness: 0.65 },
      { id: 'smoked-walnut', name: 'Acoustic Smoked Walnut Timber', color: '#3d2817', metalness: 0.1, roughness: 0.75 }
    ],
    features: [
      'Concealed German hydraulic floor pivot hinge',
      'Dual biometric fingerprint & smartphone entry',
      'Aircraft-grade thermally broken internal steel frame',
      'Zero-tolerance acoustic brush weather seals'
    ]
  },
  {
    id: 'carpet-isfahan-3d',
    name: 'Royal Isfahan Hand-Knotted Silk & Wool Carpet',
    category: 'Luxury Architectural Carpets',
    sku: 'HC-CARPET-ISFAHAN-3D',
    price: 4500000,
    dimensions: '3,000mm (W) × 4,000mm (L) • 14mm Pile Height',
    leadTime: 'In Stock / Ready for Maiduguri Dispatch',
    desc: 'Museum-grade hand-knotted floor covering woven with 1,200,000 knots/m² from organic mulberry silk and fine New Zealand worsted wool.',
    finishes: [
      { id: 'isfahan', name: 'Royal Isfahan Midnight & Gold', color: '#0d1b2a', metalness: 0.1, roughness: 0.85 },
      { id: 'sapphire', name: 'Presidential Sapphire & Cream', color: '#1b263b', metalness: 0.1, roughness: 0.85 },
      { id: 'obsidian', name: 'Obsidian Velvet & Bronze Silk', color: '#1a1a1a', metalness: 0.1, roughness: 0.85 },
      { id: 'pearl', name: 'Desert Sand & Royal Pearl Wool', color: '#c5a059', metalness: 0.1, roughness: 0.85 }
    ],
    features: [
      '1.2 Million knots per square meter density',
      'Pure organic mulberry silk floral embossing',
      'Hypoallergenic double-twisted worsted wool core',
      'Hand-serged edges with anti-slip suede backing'
    ]
  },
  {
    id: 'marble-calacatta-3d',
    name: 'Italian Bookmatched Calacatta Oro Slabs',
    category: 'Italian Marble & Stonework',
    sku: 'HC-MARBLE-CALACATTA-3D',
    price: 2950000,
    dimensions: '2,800mm (W) × 1,900mm (H) × 20mm (T)',
    leadTime: 'Direct Sourcing & Polishing',
    desc: 'Quarried in Carrara, Italy. Precision mirror-matched continuous marble slab paneling finished with a 95-gloss diamond polish for dramatic feature walls.',
    finishes: [
      { id: 'gold', name: 'Calacatta Oro (Warm Gold Veining)', color: '#f8fafc', metalness: 0.15, roughness: 0.1 },
      { id: 'nero', name: 'Nero Marquina (Black Velvet & White)', color: '#11141a', metalness: 0.15, roughness: 0.1 },
      { id: 'verde', name: 'Verde Alpi (Deep Alpine Emerald)', color: '#0f291e', metalness: 0.15, roughness: 0.1 }
    ],
    features: [
      'Sub-millimeter CNC bookmatched mirror symmetry',
      'Micro-mesh resin backing for seismic tensile strength',
      '95-Gloss diamond liquid mirror finish',
      'Pre-sealed with Oleophobic stain resistance'
    ]
  },
  {
    id: 'bath-monolith-3d',
    name: 'Monolithic Freestanding Stone Bathtub',
    category: 'Sanitary Ware & Baths',
    sku: 'HC-BATH-MONOLITH-3D',
    price: 3200000,
    dimensions: '1,850mm (L) × 880mm (W) × 580mm (H)',
    leadTime: '15 – 25 Business Days',
    desc: 'Carved from a solid composite mineral stone block, providing exceptional thermal heat retention, velvet tactile matte finish, and integrated overflow.',
    finishes: [
      { id: 'matte-white', name: 'Honed Matte Carrara White', color: '#f1f5f9', metalness: 0.05, roughness: 0.4 },
      { id: 'volcanic-black', name: 'Volcanic Basalt Matte Black', color: '#1e242b', metalness: 0.05, roughness: 0.45 },
      { id: 'travertine', name: 'Classic Roman Travertine Stone', color: '#d8c29d', metalness: 0.05, roughness: 0.55 }
    ],
    features: [
      'Solid surface cast stone composite (210 kg dry weight)',
      'Exceptional thermal insulation keeps water hot 2x longer',
      'Integrated hidden chrome/gold pop-up waste drain',
      'Non-porous anti-bacterial velvet tactile finish'
    ]
  }
];

export default function ThreeDShowroom({ onAddToCart, setActiveTab }) {
  const mountRef = useRef(null);

  // Active state
  const [activeItemId, setActiveItemId] = useState('door-pivot-3d');
  const activeItem = SHOWROOM_ITEMS.find(i => i.id === activeItemId) || SHOWROOM_ITEMS[0];
  const [selectedFinish, setSelectedFinish] = useState(activeItem.finishes[0]);
  const [lightingMode, setLightingMode] = useState('daylight'); // daylight | sunset | midnight
  const [autoRotate, setAutoRotate] = useState(true);
  const [doorOpen, setDoorOpen] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  // References for Three.js scene components
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelGroupRef = useRef(null);
  const pivotDoorMeshRef = useRef(null);
  const dirLightRef = useRef(null);
  const hemiLightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // When active item changes, reset selected finish
  useEffect(() => {
    setSelectedFinish(activeItem.finishes[0]);
    setDoorOpen(false);
  }, [activeItemId]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1022);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 4.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent camera from going deep underground
    controls.minDistance = 1.5;
    controls.maxDistance = 8.5;
    controls.target.set(0, 1.0, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0c1630, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    dirLight.position.set(4, 6, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 15;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Secondary fill light for rim highlights
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.8);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // 6. Showroom Floor Ground with Circular Showcase Pedestal
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x080f20,
      roughness: 0.45,
      metalness: 0.55
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Circular illuminated showroom platform
    const platformGeo = new THREE.CylinderGeometry(2.4, 2.5, 0.08, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x111c38,
      roughness: 0.35,
      metalness: 0.75
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = 0.04;
    platform.receiveShadow = true;
    scene.add(platform);

    // Gold halo ring around platform
    const ringGeo = new THREE.RingGeometry(2.42, 2.48, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.082;
    scene.add(ring);

    // 7. Model container group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let currentPivotAngle = 0;
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Auto-rotation
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 0.9;
        controlsRef.current.update();
      }

      // Smooth pivot door animation interpolation
      if (pivotDoorMeshRef.current) {
        const targetAngle = doorOpen ? -Math.PI * 0.42 : 0;
        currentPivotAngle += (targetAngle - currentPivotAngle) * 0.06;
        pivotDoorMeshRef.current.rotation.y = currentPivotAngle;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Lighting Mode
  useEffect(() => {
    if (!sceneRef.current || !dirLightRef.current || !hemiLightRef.current || !ambientLightRef.current) return;
    
    if (lightingMode === 'daylight') {
      sceneRef.current.background = new THREE.Color(0x0a1022);
      ambientLightRef.current.color.setHex(0xffffff);
      ambientLightRef.current.intensity = 0.8;
      dirLightRef.current.color.setHex(0xffffff);
      dirLightRef.current.intensity = 2.4;
      dirLightRef.current.position.set(4, 6, 4);
      hemiLightRef.current.color.setHex(0xffffff);
      hemiLightRef.current.groundColor.setHex(0x0c1630);
    } else if (lightingMode === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x180f14);
      ambientLightRef.current.color.setHex(0xffd5b0);
      ambientLightRef.current.intensity = 0.55;
      dirLightRef.current.color.setHex(0xffa153);
      dirLightRef.current.intensity = 3.2;
      dirLightRef.current.position.set(6, 3, 2);
      hemiLightRef.current.color.setHex(0xff9a3c);
      hemiLightRef.current.groundColor.setHex(0x280e1c);
    } else if (lightingMode === 'midnight') {
      sceneRef.current.background = new THREE.Color(0x040711);
      ambientLightRef.current.color.setHex(0x60a5fa);
      ambientLightRef.current.intensity = 0.35;
      dirLightRef.current.color.setHex(0x93c5fd);
      dirLightRef.current.intensity = 1.4;
      dirLightRef.current.position.set(2, 5, 3);
      hemiLightRef.current.color.setHex(0x1e3a8a);
      hemiLightRef.current.groundColor.setHex(0x020617);
    }
  }, [lightingMode]);

  // Construct Active 3D Model
  useEffect(() => {
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    // Clear previous children
    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0];
      modelGroup.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }
    pivotDoorMeshRef.current = null;

    const finishColor = new THREE.Color(selectedFinish?.color || 0xd4af37);
    const metalness = selectedFinish?.metalness !== undefined ? selectedFinish.metalness : 0.8;
    const roughness = selectedFinish?.roughness !== undefined ? selectedFinish.roughness : 0.3;

    // =========================================================================
    // MODEL 1: ARCHITECTURAL PIVOT DOOR (OVERSIZED)
    // =========================================================================
    if (activeItemId === 'door-pivot-3d') {
      const doorHeight = 2.4;
      const doorWidth = 1.25;
      const doorThick = 0.08;

      // Outer Structural Frame
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x0c1322,
        roughness: 0.5,
        metalness: 0.8
      });
      const frameTopGeo = new THREE.BoxGeometry(doorWidth + 0.16, 0.08, 0.12);
      const frameTop = new THREE.Mesh(frameTopGeo, frameMat);
      frameTop.position.set(0, doorHeight + 0.04, 0);
      frameTop.castShadow = true;
      modelGroup.add(frameTop);

      const frameSideGeo = new THREE.BoxGeometry(0.08, doorHeight, 0.12);
      const frameLeft = new THREE.Mesh(frameSideGeo, frameMat);
      frameLeft.position.set(-(doorWidth / 2) - 0.04, doorHeight / 2, 0);
      frameLeft.castShadow = true;
      modelGroup.add(frameLeft);

      const frameRight = new THREE.Mesh(frameSideGeo, frameMat);
      frameRight.position.set((doorWidth / 2) + 0.04, doorHeight / 2, 0);
      frameRight.castShadow = true;
      modelGroup.add(frameRight);

      // Pivot Axis Assembly (Pivots 20% inward from left jamb)
      const pivotAssembly = new THREE.Group();
      const pivotOffset = -(doorWidth / 2) + 0.22;
      pivotAssembly.position.set(pivotOffset, 0, 0);
      modelGroup.add(pivotAssembly);
      pivotDoorMeshRef.current = pivotAssembly;

      // Moving Door Leaf
      const doorMat = new THREE.MeshStandardMaterial({
        color: finishColor,
        metalness: metalness,
        roughness: roughness,
        envMapIntensity: 1.2
      });

      const doorLeafGeo = new THREE.BoxGeometry(doorWidth, doorHeight, doorThick);
      const doorLeaf = new THREE.Mesh(doorLeafGeo, doorMat);
      // Center leaf relative to its pivot axis point
      doorLeaf.position.set(-pivotOffset, doorHeight / 2, 0);
      doorLeaf.castShadow = true;
      doorLeaf.receiveShadow = true;
      pivotAssembly.add(doorLeaf);

      // Inset Fluted Paneling Grooves
      for (let i = 0; i < 7; i++) {
        const grooveGeo = new THREE.BoxGeometry(0.02, doorHeight * 0.85, 0.005);
        const grooveMat = new THREE.MeshStandardMaterial({ color: 0x080c14, roughness: 0.6 });
        const groove = new THREE.Mesh(grooveGeo, grooveMat);
        groove.position.set(-pivotOffset - 0.35 + (i * 0.12), doorHeight / 2, doorThick / 2 + 0.003);
        pivotAssembly.add(groove);
      }

      // Executive Vertical Pull Bar Handle (Champagne Gold / Brass)
      const handleMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.95,
        roughness: 0.2
      });
      const handleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.3, 32);
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.set(-pivotOffset + (doorWidth / 2) - 0.14, doorHeight / 2, doorThick / 2 + 0.06);
      handle.castShadow = true;
      pivotAssembly.add(handle);

      // Handle Stems
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.06, 16);
      const stem1 = new THREE.Mesh(stemGeo, handleMat);
      stem1.rotation.x = Math.PI / 2;
      stem1.position.set(-pivotOffset + (doorWidth / 2) - 0.14, doorHeight / 2 + 0.5, doorThick / 2 + 0.03);
      pivotAssembly.add(stem1);

      const stem2 = new THREE.Mesh(stemGeo, handleMat);
      stem2.rotation.x = Math.PI / 2;
      stem2.position.set(-pivotOffset + (doorWidth / 2) - 0.14, doorHeight / 2 - 0.5, doorThick / 2 + 0.03);
      pivotAssembly.add(stem2);

      // Biometric Digital Lock Escutcheon
      const lockGeo = new THREE.BoxGeometry(0.06, 0.22, 0.015);
      const lockMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.1 });
      const lock = new THREE.Mesh(lockGeo, lockMat);
      lock.position.set(-pivotOffset + (doorWidth / 2) - 0.14, doorHeight / 2, doorThick / 2 + 0.01);
      pivotAssembly.add(lock);
    }

    // =========================================================================
    // MODEL 2: LUXURY HAND-KNOTTED CARPET & RUG
    // =========================================================================
    else if (activeItemId === 'carpet-isfahan-3d') {
      const carpetTexture = createCarpetTexture(selectedFinish?.id || 'isfahan');
      
      const carpetWidth = 2.4;
      const carpetLength = 3.2;
      const carpetHeight = 0.04;

      // Carpet Body
      const carpetMat = new THREE.MeshStandardMaterial({
        map: carpetTexture,
        roughness: 0.9,
        metalness: 0.08
      });

      const carpetGeo = new THREE.BoxGeometry(carpetWidth, carpetHeight, carpetLength);
      const carpet = new THREE.Mesh(carpetGeo, carpetMat);
      carpet.position.set(0, carpetHeight / 2 + 0.08, 0);
      carpet.castShadow = true;
      carpet.receiveShadow = true;
      modelGroup.add(carpet);

      // Soft Edge Fringe Trim
      const fringeMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.95 });
      const fringeNorthGeo = new THREE.BoxGeometry(carpetWidth + 0.04, 0.01, 0.08);
      const fringeNorth = new THREE.Mesh(fringeNorthGeo, fringeMat);
      fringeNorth.position.set(0, 0.085, carpetLength / 2 + 0.04);
      modelGroup.add(fringeNorth);

      const fringeSouth = new THREE.Mesh(fringeNorthGeo, fringeMat);
      fringeSouth.position.set(0, 0.085, -carpetLength / 2 - 0.04);
      modelGroup.add(fringeSouth);
    }

    // =========================================================================
    // MODEL 3: ITALIAN BOOKMATCHED CALACATTA MARBLE SLAB
    // =========================================================================
    else if (activeItemId === 'marble-calacatta-3d') {
      const marbleTex = createMarbleTexture(selectedFinish?.id || 'gold');

      const slabWidth = 2.4;
      const slabHeight = 1.6;
      const slabThick = 0.06;

      const marbleMat = new THREE.MeshPhysicalMaterial({
        map: marbleTex,
        roughness: 0.08,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 0.9
      });

      // Left Bookmatched Slab
      const slabLeftGeo = new THREE.BoxGeometry(slabWidth / 2 - 0.01, slabHeight, slabThick);
      const slabLeft = new THREE.Mesh(slabLeftGeo, marbleMat);
      slabLeft.position.set(-(slabWidth / 4) - 0.005, slabHeight / 2 + 0.15, 0);
      slabLeft.castShadow = true;
      modelGroup.add(slabLeft);

      // Right Bookmatched Slab (Mirrored UV scale)
      const slabRight = new THREE.Mesh(slabLeftGeo, marbleMat);
      slabRight.rotation.y = Math.PI; // Invert to simulate true mirror bookmatching!
      slabRight.position.set((slabWidth / 4) + 0.005, slabHeight / 2 + 0.15, 0);
      slabRight.castShadow = true;
      modelGroup.add(slabRight);

      // Architectural Gold Mounting Stand Base
      const standMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.25 });
      const standBaseGeo = new THREE.BoxGeometry(slabWidth + 0.2, 0.12, 0.4);
      const standBase = new THREE.Mesh(standBaseGeo, standMat);
      standBase.position.set(0, 0.12, 0);
      standBase.castShadow = true;
      modelGroup.add(standBase);
    }

    // =========================================================================
    // MODEL 4: FREESTANDING MONOLITHIC STONE BATHTUB
    // =========================================================================
    else if (activeItemId === 'bath-monolith-3d') {
      const bathMat = new THREE.MeshStandardMaterial({
        color: finishColor,
        roughness: roughness,
        metalness: metalness
      });

      // Outer elliptical bathtub shell
      const outerGeo = new THREE.CylinderGeometry(0.85, 0.75, 0.7, 48);
      outerGeo.scale(1.35, 1, 0.85); // Elliptical profile
      const outerMesh = new THREE.Mesh(outerGeo, bathMat);
      outerMesh.position.set(0, 0.45, 0);
      outerMesh.castShadow = true;
      outerMesh.receiveShadow = true;
      modelGroup.add(outerMesh);

      // Inner basin water surface
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75
      });
      const waterGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.02, 32);
      waterGeo.scale(1.25, 1, 0.75);
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.position.set(0, 0.65, 0);
      modelGroup.add(water);

      // Luxury Gold Freestanding Floor Filler Tap Assembly
      const tapMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
      
      const tapStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.1, 16);
      const tapStem = new THREE.Mesh(tapStemGeo, tapMat);
      tapStem.position.set(0, 0.6, -0.75);
      tapStem.castShadow = true;
      modelGroup.add(tapStem);

      const tapSpoutGeo = new THREE.TorusGeometry(0.12, 0.02, 16, 16, Math.PI);
      const tapSpout = new THREE.Mesh(tapSpoutGeo, tapMat);
      tapSpout.position.set(0, 1.15, -0.63);
      tapSpout.rotation.y = Math.PI / 2;
      modelGroup.add(tapSpout);
    }

  }, [activeItemId, selectedFinish]);

  // Capture High-Res 3D Snapshot
  const handleSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `HC-GROUP-3D-${activeItem.sku}-${selectedFinish.id}.png`;
    a.click();
  };

  // Add Configured Item to Direct Cart
  const handleAddConfiguredToCart = () => {
    if (onAddToCart) {
      onAddToCart(
        `${activeItem.sku}-${selectedFinish.id}`,
        `${activeItem.name} (${selectedFinish.name})`,
        `${activeItem.sku}`,
        activeItem.price
      );
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 4500);
    }
  };

  return (
    <div className="showroom-page-container">
      {/* Top Breadcrumb & Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge-luxury" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={12} /> INTERACTIVE 3D VIRTUAL SHOWROOM
            </span>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700', letterSpacing: '1px' }}>
              • WEBGL 60 FPS
            </span>
          </div>
          <h2 className="section-title" style={{ marginBottom: '0.25rem', textAlign: 'left' }}>
            3D Architectural Studio & Material Configurator
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Orbit, inspect millimeter-precision geometries, test dynamic daylighting, and specify bespoke architectural materials.
          </p>
        </div>

        {/* Quick WhatsApp Concierge Button */}
        <a 
          href={`https://wa.me/2349068875555?text=${encodeURIComponent(`Hello HC Group, I am configuring the 3D model "${activeItem.name}" in finish "${selectedFinish.name}" (SKU: ${activeItem.sku}). Please provide the technical CAD spec sheet.`)}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-action-btn"
        >
          <MessageCircle size={17} /> Inquire Spec on WhatsApp
        </a>
      </div>

      {/* Main 3D Studio Split Layout */}
      <div className="showroom-studio-grid">
        
        {/* Left Column: Interactive 3D Canvas Viewport */}
        <div className="canvas-viewport-wrapper">
          
          {/* 3D WebGL Canvas Container */}
          <div ref={mountRef} className="three-canvas-container" />

          {/* Floating Top Controls: Lighting Environment & Auto-Rotate */}
          <div className="canvas-floating-top-bar">
            {/* Lighting Mode Selector */}
            <div className="lighting-pill-group">
              <span className="lighting-label">Lighting Ambience:</span>
              <button 
                className={`lighting-btn ${lightingMode === 'daylight' ? 'active' : ''}`}
                onClick={() => setLightingMode('daylight')}
                title="5500K Architectural Daylight"
              >
                <Sun size={14} /> Daylight
              </button>
              <button 
                className={`lighting-btn ${lightingMode === 'sunset' ? 'active' : ''}`}
                onClick={() => setLightingMode('sunset')}
                title="3200K Golden Hour Sunset"
              >
                <Sunset size={14} /> Golden Hour
              </button>
              <button 
                className={`lighting-btn ${lightingMode === 'midnight' ? 'active' : ''}`}
                onClick={() => setLightingMode('midnight')}
                title="4000K Executive Midnight Ambience"
              >
                <Moon size={14} /> Midnight VIP
              </button>
            </div>

            {/* Auto-Rotate & Snapshot Action */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className={`canvas-tool-btn ${autoRotate ? 'active' : ''}`}
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle 360° Auto-Rotation"
              >
                <RotateCw size={14} /> {autoRotate ? 'Rotating' : 'Static'}
              </button>
              <button 
                className="canvas-tool-btn"
                onClick={handleSnapshot}
                title="Download High-Res 3D Snapshot (PNG)"
              >
                <Camera size={14} /> Snapshot
              </button>
            </div>
          </div>

          {/* Model Specific Interactive Control Pill (Pivot Open/Close) */}
          {activeItemId === 'door-pivot-3d' && (
            <div className="canvas-pivot-toggle-bar">
              <button 
                className="btn-gold"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                onClick={() => setDoorOpen(!doorOpen)}
              >
                {doorOpen ? 'Close Pivot Door' : 'Interactive Swing Open (75° Pivot)'}
              </button>
            </div>
          )}

          {/* Floating Bottom Help Note */}
          <div className="canvas-floating-bottom-hint">
            <span>Left-Click + Drag: <strong>Orbit 360°</strong></span>
            <span>&bull;</span>
            <span>Scroll: <strong>Zoom</strong></span>
            <span>&bull;</span>
            <span>Right-Click: <strong>Pan</strong></span>
          </div>
        </div>

        {/* Right Column: Customization & Specification Inspector */}
        <div className="showroom-inspector-panel">
          
          {/* Model Category Tab Strip */}
          <div className="inspector-models-list">
            <label className="inspector-section-label">Select 3D Architectural Model:</label>
            <div className="model-selector-pills">
              {SHOWROOM_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`model-pill-btn ${activeItemId === item.id ? 'active' : ''}`}
                  onClick={() => setActiveItemId(item.id)}
                >
                  <Box size={14} />
                  <span>{item.name.split('(')[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Model Meta Card */}
          <div className="inspector-item-card">
            <span className="badge-luxury" style={{ fontSize: '0.7rem' }}>{activeItem.category}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg-navy)', fontSize: '1.4rem', marginTop: '0.35rem', marginBottom: '0.5rem' }}>
              {activeItem.name}
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
              <span>SKU: <strong style={{ color: 'var(--color-gold)' }}>{activeItem.sku}</strong></span>
              <span>&bull;</span>
              <span>Lead: <strong>{activeItem.leadTime}</strong></span>
            </div>

            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {activeItem.desc}
            </p>

            {/* Real-World CAD Engineering Dimensions */}
            <div className="spec-dimensions-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-bg-navy)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <Ruler size={14} color="var(--color-gold)" /> CAD Engineering Sizing:
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#334155', fontWeight: '600' }}>
                {activeItem.dimensions}
              </div>
            </div>

            {/* Material Finish Swatches */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <label className="inspector-section-label">
                Curated Material Finish: <strong style={{ color: 'var(--color-bg-navy)' }}>{selectedFinish.name}</strong>
              </label>
              <div className="finish-swatches-grid">
                {activeItem.finishes.map((finish) => (
                  <button
                    key={finish.id}
                    className={`finish-swatch-btn ${selectedFinish.id === finish.id ? 'active' : ''}`}
                    onClick={() => setSelectedFinish(finish)}
                  >
                    <span 
                      className="swatch-color-circle" 
                      style={{ backgroundColor: finish.color, border: finish.id === 'champagne-gold' ? '1px solid #aa8c2c' : '1px solid #cbd5e1' }}
                    />
                    <span className="swatch-title">{finish.name}</span>
                    {selectedFinish.id === finish.id && <Check size={14} color="var(--color-gold)" className="swatch-check" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Features Checklist */}
            <div style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-bg-navy)', marginBottom: '0.5rem' }}>
                Factory Specifications & Guarantee:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#64748b', lineHeight: '1.7' }}>
                {activeItem.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>

            {/* Pricing & Commercial Order Action */}
            <div className="inspector-purchase-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Commercial Unit Rate:</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--color-bg-navy)' }}>
                  ₦{activeItem.price.toLocaleString('en-NG')}
                </span>
              </div>

              <button 
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', fontSize: '0.95rem' }}
                onClick={handleAddConfiguredToCart}
              >
                <ShoppingBag size={18} />
                {cartSuccess ? 'Added to Order Schedule!' : 'Add 3D Configuration to BoQ'}
              </button>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button 
                  className="btn-outline" 
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                  onClick={() => setActiveTab && setActiveTab('contact')}
                >
                  Book 3D LiDAR Survey
                </button>
                <button 
                  className="btn-outline" 
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                  onClick={() => setActiveTab && setActiveTab('cart')}
                >
                  View Order Schedule <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
