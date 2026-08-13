import * as THREE from 'three';

export function initHeroSceneV2() {
  const hero = document.querySelector<HTMLElement>('[data-v2-hero]');
  const stage = document.querySelector<HTMLElement>('[data-v2-stage]');
  const host = document.querySelector<HTMLElement>('[data-v2-canvas]');
  if (!hero || !stage || !host) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 4.1, 11.2);
  camera.lookAt(0, 0.4, 0);

  const root = new THREE.Group();
  root.position.set(1.15, -0.25, 0);
  scene.add(root);
  scene.add(new THREE.AmbientLight(0x6d8db6, 1.3));
  const light = new THREE.PointLight(0x3b86ff, 32, 20, 2);
  light.position.set(2, 7, 5);
  scene.add(light);

  const metal = new THREE.MeshPhysicalMaterial({ color: 0x07101b, metalness: 0.95, roughness: 0.24, clearcoat: 0.45 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x030810, metalness: 0.84, roughness: 0.45 });
  const core = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.85, 2.2), metal);
  core.position.y = 0.45;
  root.add(core);
  const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry), new THREE.LineBasicMaterial({ color: 0x69a2ff, transparent: true, opacity: 0.8 }));
  coreEdges.position.copy(core.position);
  root.add(coreEdges);

  const platform = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.38, 3.5), metal);
  platform.position.y = -0.7;
  root.add(platform);
  const grid = new THREE.GridHelper(18, 28, 0x2e64aa, 0x102642);
  grid.position.y = -0.9;
  const gridMaterial = Array.isArray(grid.material) ? grid.material[0] : grid.material;
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.18;
  root.add(grid);

  const beamMaterial = new THREE.MeshBasicMaterial({ color: 0x2f7cff, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending, depthWrite: false });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.2, 9, 20, 1, true), beamMaterial);
  beam.position.y = 5.35;
  root.add(beam);

  const rings: THREE.Mesh[] = [];
  [1.55, 2.2, 2.9].forEach((radius, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.018, 10, 96), new THREE.MeshBasicMaterial({ color: 0x4286ff, transparent: true, opacity: index === 1 ? 0.58 : 0.3 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 2.2 + index * 0.7;
    root.add(ring);
    rings.push(ring);
  });

  const buildings = [[-4.3,-2.5,1.4,1.7,1.5],[-3.3,2.3,1.8,1.2,1.4],[4.1,-2.3,1.5,1.9,1.4],[3.5,2.5,1.7,1.2,1.5],[-5.0,0.8,1.1,0.9,1.2],[5.0,0.7,1.1,1.05,1.15]];
  buildings.forEach(([x,z,w,h,d]) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), dark);
    mesh.position.set(x, -0.88 + h / 2, z);
    root.add(mesh);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ color: 0x32669f, transparent: true, opacity: 0.3 }));
    edge.position.copy(mesh.position);
    root.add(edge);
    root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,-0.62,0), new THREE.Vector3(x * 0.82,-0.62,z * 0.82)]), new THREE.LineBasicMaterial({ color: 0x2f7cff, transparent: true, opacity: 0.38 })));
  });

  const positions = new Float32Array(360);
  for (let i = 0; i < 120; i += 1) {
    const a = i * 0.45;
    const radius = 0.5 + (i % 18) * 0.09;
    positions[i * 3] = Math.cos(a) * radius;
    positions[i * 3 + 1] = 0.9 + (i % 50) * 0.16;
    positions[i * 3 + 2] = Math.sin(a) * radius;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color: 0x8ab5ff, size: 0.035, transparent: true, opacity: 0.62 }));
  root.add(particles);

  let px = 0;
  let py = 0;
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
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
  const animate = () => {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    root.rotation.y += ((px * 0.045 + Math.sin(t * 0.14) * 0.016) - root.rotation.y) * 0.025;
    root.rotation.x += ((-0.04 + py * 0.018) - root.rotation.x) * 0.025;
    rings.forEach((ring, index) => { ring.rotation.z = t * (index % 2 === 0 ? 0.08 : -0.06); });
    particles.rotation.y = t * 0.035;
    renderer.render(scene, camera);
  };
  animate();

  hero.dataset.webglReady = 'true';
  document.documentElement.dataset.heroReady = 'true';
}
