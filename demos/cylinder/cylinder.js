/* Geometry adapted from the original app_cylinder.html. No framework required. */
(function () {
  'use strict';
  const ids = ['theta', 'alpha', 'h', 'r'];
  const controls = Object.fromEntries(ids.map(id => [id, document.getElementById(id + 'Slider')]));
  const canvas = document.getElementById('canvas2d');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('canvas3d_container');
  const status = document.getElementById('demo-status');
  let view3d = null;

  function showStatus(message) {
    status.textContent = message;
    status.hidden = false;
  }

  function create3dView() {
    if (!window.THREE) throw new Error('Three.js unavailable');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f7f4);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(15, 12, 18);
    camera.lookAt(0, 5, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);
    scene.add(new THREE.AxesHelper(15));
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(35, 35), new THREE.MeshBasicMaterial({ color: 0x315e79, side: THREE.DoubleSide, transparent: true, opacity: 0.24 }));
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.CylinderGeometry(1, 1, 30, 64, 1, true);
    geometry.translate(0, 15, 0);
    const cylinder = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xb17b48, transparent: true, opacity: 0.42, side: THREE.DoubleSide, shininess: 60 }));
    group.add(cylinder);
    const sectionGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(121 * 3);
    sectionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const section = new THREE.Line(sectionGeometry, new THREE.LineBasicMaterial({ color: 0x773f49 }));
    // The intersection moves with the controls; do not cull it using stale bounds.
    section.frustumCulled = false;
    scene.add(section);
    scene.add(new THREE.AmbientLight(0xaaaaaa));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(10, 20, 10).normalize();
    scene.add(light);
    renderer.domElement.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      showStatus('The 3D view is unavailable. The top view and all controls still work. Reload to restore the 3D view.');
      view3d = null;
    });
    return {
      draw(state, points) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        plane.position.y = state.h;
        cylinder.scale.set(state.r, 1, state.r);
        cylinder.rotation.z = -state.alpha;
        group.rotation.y = state.theta;
        points.forEach((p, i) => {
          positions[i * 3] = p.x;
          positions[i * 3 + 1] = state.h;
          positions[i * 3 + 2] = -p.y;
        });
        sectionGeometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      }
    };
  }

  try { view3d = create3dView(); }
  catch (_) { showStatus('The 3D view needs WebGL and a connection to load Three.js. The top view and all controls still work.'); }

  function draw2d(state, points) {
    if (!ctx) return;
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#f7f7f4';
    ctx.fillRect(0, 0, width, height);
    const cx = width / 2, cy = height / 2;
    const scale = Math.min(width, height) / 2 / Math.max(10, (state.orbit + state.a) * 1.3);
    ctx.beginPath();
    ctx.strokeStyle = '#d7d2c8';
    ctx.lineWidth = 1;
    ctx.moveTo(0, cy); ctx.lineTo(width, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, height);
    ctx.stroke();
    const diskRadius = state.b - state.orbit;
    if (diskRadius > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, diskRadius * scale, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(49,94,121,0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(49,94,121,0.5)';
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, state.orbit * scale, 0, 2 * Math.PI);
    ctx.strokeStyle = '#858177';
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    points.forEach((point, i) => {
      const x = cx + point.x * scale, y = cy - point.y * scale;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#773f49';
    ctx.stroke();
    const x = cx + state.xc * scale, y = cy - state.yc * scale;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#292824';
    ctx.fill();
    const dx = state.a * Math.cos(state.theta) * scale, dy = state.a * Math.sin(state.theta) * scale;
    ctx.beginPath();
    ctx.moveTo(x - dx, y + dy); ctx.lineTo(x + dx, y - dy);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(41,40,36,0.35)';
    ctx.stroke();
  }

  function update() {
    const theta = Number(controls.theta.value) * Math.PI / 180;
    const alpha = Number(controls.alpha.value) * Math.PI / 180;
    const h = Number(controls.h.value), r = Number(controls.r.value);
    const a = r / Math.cos(alpha), b = r, orbit = h * Math.tan(alpha);
    const xc = orbit * Math.cos(theta), yc = orbit * Math.sin(theta);
    const state = { theta, alpha, h, r, a, b, orbit, xc, yc };
    ids.forEach(id => {
      const value = Number(controls[id].value);
      document.getElementById(id + 'Val').textContent = id === 'h' || id === 'r' ? value.toFixed(1) : String(value);
      controls[id].setAttribute('aria-valuetext', String(value) + (id === 'h' || id === 'r' ? ' units' : ' degrees'));
    });
    Object.entries({ xc, yc, a, b }).forEach(([key, value]) => { document.getElementById(key + 'Val').textContent = value.toFixed(2); });
    const points = Array.from({ length: 121 }, (_, i) => {
      const phi = i * 2 * Math.PI / 120;
      const ex = a * Math.cos(phi), ey = b * Math.sin(phi);
      return { x: ex * Math.cos(theta) - ey * Math.sin(theta) + xc, y: ex * Math.sin(theta) + ey * Math.cos(theta) + yc };
    });
    draw2d(state, points);
    if (view3d) view3d.draw(state, points);
  }
  ids.forEach(id => controls[id].addEventListener('input', update));
  document.getElementById('reset-demo').addEventListener('click', () => {
    ids.forEach(id => { controls[id].value = controls[id].defaultValue; });
    update();
  });
  new ResizeObserver(update).observe(canvas.parentElement);
  window.addEventListener('resize', update);
  update();
}());
