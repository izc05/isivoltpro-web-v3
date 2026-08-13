import * as THREE from 'three';

export function initHeroCore() {
  const host = document.querySelector('[data-hero-core]');
  const canvasHost = document.querySelector('[data-hero-core-canvas]');
  if (!(host instanceof HTMLElement) || !(canvasHost instanceof HTMLElement)) return;
  if (host.dataset.ready === 'true') return;
  host.dataset.ready = 'true';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (_) {
    host.classList.add('is-static');
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  canvasHost.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 1.1, 8.6);

  const root = new THREE.Group();
  root.rotation.x = -0.08;
  scene.add(root);

  scene.add(new THREE.AmbientLight(0x5f7fae, 1.35));

  const key = new THREE.PointLight(0x4b92ff, 34, 18, 2);
  key.position.set(3.4, 3.2, 4.5);
  scene.add(key);

  const rim = new THREE.PointLight(0x1769ff, 28, 16, 2);
  rim.position.set(-4.2, -1.8, 1.5);
  scene.add(rim);

  const warm = new THREE.PointLight(0xb8d7ff, 10, 10, 2);
  warm.position.set(0, 4.5, -3.5);
  scene.add(warm);

  const metal = new THREE.MeshPhysicalMaterial({
    color: 0x09111d,
    metalness: 0.92,
    roughness: 0.28,
    clearcoat: 0.55,
    clearcoatRoughness: 0.28,
  });

  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x050a11,
    metalness: 0.85,
    roughness: 0.42,
  });

  const blueGlass = new THREE.MeshPhysicalMaterial({
    color: 0x1769ff,
    emissive: 0x0b46b7,
    emissiveIntensity: 1.4,
    transparent: true,
    opacity: 0.64,
    metalness: 0.35,
    roughness: 0.18,
  });

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.08, 2), metal);
  core.scale.set(1.05, 1.16, 1.05);
  root.add(core);

  const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.63, 2), blueGlass);
  root.add(inner);

  const rings = [];
  [1.42, 1.72, 2.06].forEach((radius, index) => {
    const material = new THREE.MeshBasicMaterial({
      color: index === 1 ? 0x6ea0ff : 0x1769ff,
      transparent: true,
      opacity: index === 1 ? 0.56 : 0.26,
      toneMapped: false,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, index === 1 ? 0.018 : 0.011, 12, 120), material);
    ring.rotation.x = Math.PI / 2 + (index - 1) * 0.12;
    ring.rotation.y = (index - 1) * 0.24;
    root.add(ring);
    rings.push(ring);
  });

  const modulePositions = [
    [-2.7, 1.65, -0.4], [2.55, 1.72, -0.15],
    [-2.9, -1.45, 0.2], [2.72, -1.38, 0.28],
    [-1.65, 2.65, -1.25], [1.8, 2.48, -1.45],
    [-1.55, -2.45, -1.2], [1.65, -2.55, -1.05],
  ];

  const modules = new THREE.Group();
  root.add(modules);

  modulePositions.forEach((coords, index) => {
    const [x, y, z] = coords;
    const w = index < 4 ? 1.1 : 0.76;
    const h = index < 4 ? 0.58 : 0.42;
    const d = index < 4 ? 0.64 : 0.48;
    const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), darkMetal);
    box.position.set(x, y, z);
    box.rotation.y = (index % 2 ? -1 : 1) * 0.16;
    modules.add(box);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(box.geometry),
      new THREE.LineBasicMaterial({ color: 0x396da9, transparent: true, opacity: 0.42 })
    );
    edges.position.copy(box.position);
    edges.rotation.copy(box.rotation);
    modules.add(edges);

    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x * 0.36, y * 0.36, z * 0.2),
        new THREE.Vector3(x * 0.78, y * 0.78, z * 0.72),
      ]),
      new THREE.LineBasicMaterial({ color: 0x3c82ff, transparent: true, opacity: index < 4 ? 0.48 : 0.22 })
    );
    root.add(line);
  });

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(3.45, 96),
    new THREE.MeshBasicMaterial({ color: 0x0a2449, transparent: true, opacity: 0.11, side: THREE.DoubleSide })
  );
  floor.rotation.x = Math.PI / 2;
  floor.position.y = -2.78;
  root.add(floor);

  const particleCount = 84;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.32;
    const radius = 2.4 + Math.random() * 2.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5.6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2.8 - 0.8;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({ color: 0x6ea0ff, size: 0.026, transparent: true, opacity: 0.6, sizeAttenuation: true })
  );
  root.add(particles);

  let pointerX = 0;
  let pointerY = 0;
  let visible = true;
  let raf = 0;
  const clock = new THREE.Clock();

  const resize = () => {
    const width = Math.max(canvasHost.clientWidth, 1);
    const height = Math.max(canvasHost.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
  }, { threshold: 0.02 });
  observer.observe(host);

  if (finePointer && !reducedMotion) {
    host.addEventListener('pointermove', (event) => {
      const rect = host.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    host.addEventListener('pointerleave', () => {
      pointerX = 0;
      pointerY = 0;
    });
  }

  const animate = () => {
    raf = requestAnimationFrame(animate);
    if (!visible) return;

    const t = clock.getElapsedTime();
    const targetY = reducedMotion ? -0.18 : -0.18 + pointerX * 0.16 + Math.sin(t * 0.16) * 0.04;
    const targetX = reducedMotion ? -0.08 : -0.08 + pointerY * 0.07;
    root.rotation.y += (targetY - root.rotation.y) * 0.035;
    root.rotation.x += (targetX - root.rotation.x) * 0.035;

    if (!reducedMotion) {
      inner.rotation.y = t * 0.16;
      inner.rotation.x = t * 0.07;
      rings[0].rotation.z = t * 0.045;
      rings[1].rotation.z = -t * 0.033;
      rings[2].rotation.z = t * 0.022;
      const pulse = 1 + Math.sin(t * 1.15) * 0.018;
      inner.scale.setScalar(pulse);
      particles.rotation.y = t * 0.012;
    }

    renderer.render(scene, camera);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(canvasHost);
  resize();
  animate();

  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    ro.disconnect();
    renderer.dispose();
  }, { once: true });
}
