import * as THREE from 'three';

function brandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5f8fd';
  ctx.font = '700 64px Arial';
  ctx.fillText('ISIVOLTPRO', 384, 112);
  ctx.fillStyle = '#6ea0ff';
  ctx.font = '600 30px Arial';
  ctx.fillText('CORE', 384, 166);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addBrandFace(group: THREE.Group, texture: THREE.Texture | null, z: number, rotationY = 0) {
  if (!texture) return;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 0.58), material);
  plane.position.set(0, 0.52, z);
  plane.rotation.y = rotationY;
  group.add(plane);
}

export function initHeroSceneV2() {
  const hero = document.querySelector<HTMLElement>('[data-v2-hero]');
  const stage = document.querySelector<HTMLElement>('[data-v2-stage]');
  const host = document.querySelector<HTMLElement>('[data-v2-canvas]');
  if (!hero || !stage || !host) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.45));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.14;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x02060a, 0.035);

  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 80);
  camera.position.set(0, 5.2, 14.7);
  camera.lookAt(0.5, 0.45, 0);

  const root = new THREE.Group();
  root.position.set(1.0, -0.45, 0);
  root.rotation.x = -0.045;
  scene.add(root);

  scene.add(new THREE.HemisphereLight(0x6f9fff, 0x010409, 1.15));
  scene.add(new THREE.AmbientLight(0x5d7ea8, 0.88));

  const key = new THREE.PointLight(0x3c86ff, 38, 25, 2);
  key.position.set(1, 7.3, 4.8);
  scene.add(key);

  const fill = new THREE.PointLight(0x93bdff, 13, 18, 2);
  fill.position.set(-5, 3, 7);
  scene.add(fill);

  const metal = new THREE.MeshPhysicalMaterial({ color: 0x07111d, metalness: 0.97, roughness: 0.23, clearcoat: 0.55, clearcoatRoughness: 0.18 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x040a12, metalness: 0.9, roughness: 0.38 });
  const structure = new THREE.MeshStandardMaterial({ color: 0x08121e, metalness: 0.82, roughness: 0.48 });
  const blue = new THREE.MeshBasicMaterial({ color: 0x1769ff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
  const softBlue = new THREE.LineBasicMaterial({ color: 0x3d86ff, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending });

  const base1 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.32, 5.6), darkMetal);
  base1.position.y = -0.92;
  root.add(base1);

  const base2 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.28, 4.8), metal);
  base2.position.y = -0.61;
  root.add(base2);

  const baseGlow = new THREE.Mesh(new THREE.BoxGeometry(4.95, 0.04, 4.95), blue);
  baseGlow.position.y = -0.42;
  root.add(baseGlow);

  const coreGroup = new THREE.Group();
  coreGroup.position.y = 0.1;
  root.add(coreGroup);

  const core = new THREE.Mesh(new THREE.BoxGeometry(2.55, 2.05, 2.55), metal);
  core.position.y = 0.55;
  coreGroup.add(core);

  const coreEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(core.geometry),
    new THREE.LineBasicMaterial({ color: 0x73a9ff, transparent: true, opacity: 0.78 })
  );
  coreEdges.position.copy(core.position);
  coreGroup.add(coreEdges);

  const coreRing = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.055, 12, 120), blue);
  coreRing.rotation.x = Math.PI / 2;
  coreRing.position.y = -0.3;
  coreGroup.add(coreRing);

  const topPlate = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.065, 1.46), blue);
  topPlate.position.y = 1.62;
  coreGroup.add(topPlate);

  const brand = brandTexture();
  addBrandFace(coreGroup, brand, 1.286);
  addBrandFace(coreGroup, brand, -1.286, Math.PI);

  const beamMaterial = new THREE.MeshBasicMaterial({ color: 0x3181ff, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.22, 11, 24, 1, true), beamMaterial);
  beam.position.y = 7.05;
  coreGroup.add(beam);

  const halo = new THREE.PointLight(0x2f7cff, 42, 18, 2);
  halo.position.set(0, 1.9, 0);
  coreGroup.add(halo);

  const rings: THREE.Mesh[] = [];
  [1.75, 2.35, 3.05].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, index === 1 ? 0.024 : 0.016, 10, 120),
      new THREE.MeshBasicMaterial({ color: index === 1 ? 0x5c9bff : 0x246fd9, transparent: true, opacity: index === 1 ? 0.62 : 0.32, blending: THREE.AdditiveBlending })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 2.65 + index * 0.72;
    coreGroup.add(ring);
    rings.push(ring);
  });

  const grid = new THREE.GridHelper(24, 38, 0x2f6fbf, 0x10253f);
  grid.position.y = -1.08;
  const gridMaterial = Array.isArray(grid.material) ? grid.material[0] : grid.material;
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.19;
  root.add(grid);

  const buildings: Array<[number, number, number, number, number]> = [
    [-5.8,-3.4,1.5,2.4,1.7],[-4.4,-0.8,1.8,1.5,1.6],[-5.5,2.5,1.4,2.8,1.5],[-3.8,3.7,1.7,1.4,1.6],
    [5.7,-3.0,1.8,2.1,1.8],[4.2,-0.5,1.6,1.45,1.5],[5.5,2.5,1.5,2.5,1.6],[3.8,3.9,1.8,1.35,1.7],
    [-7.2,0.2,1.2,1.3,1.35],[7.1,0.5,1.3,1.55,1.4],[-2.6,-4.8,1.5,1.05,1.5],[2.7,-4.7,1.45,1.0,1.45],
    [-1.9,5.2,1.45,1.2,1.5],[2.0,5.0,1.5,1.4,1.55]
  ];

  const connectionPoints: THREE.Vector3[] = [];
  buildings.forEach(([x,z,w,h,d], index) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), index % 3 === 0 ? structure : darkMetal);
    mesh.position.set(x, -1.05 + h / 2, z);
    root.add(mesh);

    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 0x2e6cb2, transparent: true, opacity: 0.34 })
    );
    edge.position.copy(mesh.position);
    root.add(edge);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, 0.025, d * 0.72), new THREE.MeshBasicMaterial({ color: index % 4 === 0 ? 0x42da8b : 0x2f7cff, transparent: true, opacity: 0.7 }));
    cap.position.set(x, mesh.position.y + h / 2 + 0.03, z);
    root.add(cap);

    connectionPoints.push(new THREE.Vector3(x * 0.86, -0.66, z * 0.86));
  });

  connectionPoints.forEach((target, index) => {
    const elbow = new THREE.Vector3(target.x * 0.45, -0.66, target.z * 0.45);
    const points = [new THREE.Vector3(0, -0.66, 0), elbow, target];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), softBlue.clone());
    (line.material as THREE.LineBasicMaterial).opacity = index % 3 === 0 ? 0.68 : 0.38;
    root.add(line);

    const node = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), blue.clone());
    node.position.copy(target);
    root.add(node);
  });

  const networkRing = new THREE.Mesh(
    new THREE.TorusGeometry(6.25, 0.018, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0x1769ff, transparent: true, opacity: 0.18 })
  );
  networkRing.rotation.x = Math.PI / 2;
  networkRing.position.y = -0.7;
  root.add(networkRing);

  const particleCount = 190;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const a = i * 0.51;
    const radius = 0.38 + (i % 23) * 0.055;
    positions[i * 3] = Math.cos(a) * radius;
    positions[i * 3 + 1] = 1.35 + (i % 64) * 0.13;
    positions[i * 3 + 2] = Math.sin(a) * radius;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({ color: 0x8ab5ff, size: 0.045, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  coreGroup.add(particles);

  let px = 0;
  let py = 0;
  if (!reduced && finePointer) {
    stage.addEventListener('pointermove', (event) => {
      px = (event.clientX / window.innerWidth - 0.5) * 2;
      py = (event.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  const resize = () => {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const clock = new THREE.Clock();
  let running = true;
  const observer = new IntersectionObserver(([entry]) => {
    running = Boolean(entry?.isIntersecting);
  }, { threshold: 0.01 });
  observer.observe(hero);

  const animate = () => {
    requestAnimationFrame(animate);
    if (!running) return;

    const t = clock.getElapsedTime();
    const targetY = px * 0.028 + Math.sin(t * 0.12) * 0.012;
    const targetX = -0.045 + py * 0.014;
    root.rotation.y += (targetY - root.rotation.y) * 0.025;
    root.rotation.x += (targetX - root.rotation.x) * 0.025;
    rings.forEach((ring, index) => { ring.rotation.z = t * (index % 2 === 0 ? 0.085 : -0.065); });
    particles.rotation.y = t * 0.045;
    coreRing.rotation.z = t * 0.08;
    beamMaterial.opacity = 0.24 + Math.sin(t * 1.15) * 0.06;
    renderer.render(scene, camera);
  };

  renderer.render(scene, camera);
  animate();

  hero.dataset.webglReady = 'true';
  document.documentElement.dataset.heroReady = 'true';
  window.dispatchEvent(new CustomEvent('isivolt:hero-ready'));
}
