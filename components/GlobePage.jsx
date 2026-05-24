import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import * as THREE from "three";

const AIRPORTS = {
  MIA: { lat: 25.796,  lon: -80.287,  city: "Miami" },
  JFK: { lat: 40.641,  lon: -73.778,  city: "New York" },
  LGA: { lat: 40.777,  lon: -73.873,  city: "New York" },
  LAX: { lat: 33.943,  lon:-118.408,  city: "Los Angeles" },
  ORD: { lat: 41.974,  lon: -87.907,  city: "Chicago" },
  SFO: { lat: 37.619,  lon:-122.375,  city: "San Francisco" },
  ATL: { lat: 33.641,  lon: -84.427,  city: "Atlanta" },
  DFW: { lat: 32.897,  lon: -97.038,  city: "Dallas" },
  SEA: { lat: 47.449,  lon:-122.309,  city: "Seattle" },
  BOS: { lat: 42.365,  lon: -71.005,  city: "Boston" },
  EWR: { lat: 40.690,  lon: -74.174,  city: "Newark" },
  IAD: { lat: 38.944,  lon: -77.456,  city: "Washington DC" },
  YYZ: { lat: 43.677,  lon: -79.631,  city: "Toronto" },
  MEX: { lat: 19.436,  lon: -99.072,  city: "Mexico City" },
  GRU: { lat:-23.432,  lon: -46.469,  city: "São Paulo" },
  EZE: { lat:-34.822,  lon: -58.535,  city: "Buenos Aires" },
  BOG: { lat:  4.702,  lon: -74.147,  city: "Bogotá" },
  LIM: { lat:-12.022,  lon: -77.114,  city: "Lima" },
  LHR: { lat: 51.477,  lon:  -0.461,  city: "London" },
  CDG: { lat: 49.013,  lon:   2.550,  city: "Paris" },
  AMS: { lat: 52.309,  lon:   4.764,  city: "Amsterdam" },
  FRA: { lat: 50.033,  lon:   8.571,  city: "Frankfurt" },
  MAD: { lat: 40.472,  lon:  -3.561,  city: "Madrid" },
  BCN: { lat: 41.297,  lon:   2.078,  city: "Barcelona" },
  FCO: { lat: 41.800,  lon:  12.239,  city: "Rome" },
  MXP: { lat: 45.630,  lon:   8.728,  city: "Milan" },
  LIS: { lat: 38.774,  lon:  -9.134,  city: "Lisbon" },
  ZRH: { lat: 47.464,  lon:   8.549,  city: "Zurich" },
  VIE: { lat: 48.110,  lon:  16.569,  city: "Vienna" },
  MUC: { lat: 48.353,  lon:  11.786,  city: "Munich" },
  BRU: { lat: 50.901,  lon:   4.484,  city: "Brussels" },
  CPH: { lat: 55.618,  lon:  12.656,  city: "Copenhagen" },
  ARN: { lat: 59.651,  lon:  17.919,  city: "Stockholm" },
  OSL: { lat: 60.193,  lon:  11.100,  city: "Oslo" },
  HEL: { lat: 60.317,  lon:  24.963,  city: "Helsinki" },
  WAW: { lat: 52.165,  lon:  20.967,  city: "Warsaw" },
  ATH: { lat: 37.936,  lon:  23.947,  city: "Athens" },
  IST: { lat: 40.976,  lon:  28.815,  city: "Istanbul" },
  DXB: { lat: 25.253,  lon:  55.364,  city: "Dubai" },
  AUH: { lat: 24.433,  lon:  54.651,  city: "Abu Dhabi" },
  DOH: { lat: 25.261,  lon:  51.565,  city: "Doha" },
  RUH: { lat: 24.958,  lon:  46.699,  city: "Riyadh" },
  TLV: { lat: 32.011,  lon:  34.887,  city: "Tel Aviv" },
  CAI: { lat: 30.122,  lon:  31.406,  city: "Cairo" },
  JNB: { lat:-26.134,  lon:  28.242,  city: "Johannesburg" },
  NBO: { lat: -1.319,  lon:  36.928,  city: "Nairobi" },
  LOS: { lat:  6.577,  lon:   3.321,  city: "Lagos" },
  CMN: { lat: 33.367,  lon:  -7.590,  city: "Casablanca" },
  SIN: { lat:  1.359,  lon: 103.989,  city: "Singapore" },
  NRT: { lat: 35.765,  lon: 140.386,  city: "Tokyo" },
  HND: { lat: 35.549,  lon: 139.780,  city: "Tokyo" },
  SYD: { lat:-33.946,  lon: 151.177,  city: "Sydney" },
  MEL: { lat:-37.669,  lon: 144.841,  city: "Melbourne" },
  ICN: { lat: 37.460,  lon: 126.440,  city: "Seoul" },
  PEK: { lat: 40.080,  lon: 116.585,  city: "Beijing" },
  PVG: { lat: 31.143,  lon: 121.805,  city: "Shanghai" },
  HKG: { lat: 22.308,  lon: 113.915,  city: "Hong Kong" },
  BKK: { lat: 13.681,  lon: 100.747,  city: "Bangkok" },
  KUL: { lat:  2.745,  lon: 101.710,  city: "Kuala Lumpur" },
  MNL: { lat: 14.509,  lon: 121.019,  city: "Manila" },
  CGK: { lat: -6.126,  lon: 106.656,  city: "Jakarta" },
  SGN: { lat: 10.819,  lon: 106.652,  city: "Ho Chi Minh" },
  HAN: { lat: 21.221,  lon: 105.807,  city: "Hanoi" },
  DEL: { lat: 28.556,  lon:  77.100,  city: "Delhi" },
  BOM: { lat: 19.089,  lon:  72.868,  city: "Mumbai" },
  BLR: { lat: 13.198,  lon:  77.706,  city: "Bangalore" },
  MAA: { lat: 12.990,  lon:  80.169,  city: "Chennai" },
  HYD: { lat: 17.231,  lon:  78.430,  city: "Hyderabad" },
  CCU: { lat: 22.654,  lon:  88.446,  city: "Kolkata" },
  AMD: { lat: 23.072,  lon:  72.634,  city: "Ahmedabad" },
  GOI: { lat: 15.381,  lon:  73.831,  city: "Goa" },
  COK: { lat:  9.945,  lon:  76.271,  city: "Kochi" },
  PNQ: { lat: 18.582,  lon:  73.920,  city: "Pune" },
  KHI: { lat: 24.906,  lon:  67.161,  city: "Karachi" },
  LHE: { lat: 31.522,  lon:  74.404,  city: "Lahore" },
  ISB: { lat: 33.617,  lon:  73.099,  city: "Islamabad" },
};

function latLonToVec3(lat, lon, radius = 1) {
  const phi   = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta),
  );
}

function buildSurfaceArcPoints(fromVec, toVec, segments = 300) {
  const from = fromVec.clone().normalize();
  const to   = toVec.clone().normalize();
  const pts  = [];
  for (let i = 0; i <= segments; i++) {
    pts.push(new THREE.Vector3().copy(from).lerp(to, i / segments).normalize());
  }
  return pts;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
}
function easeOutQuad(t) { return 1 - (1-t)*(1-t); }

function projectToScreen(worldPt, camera, W, H) {
  const v = worldPt.clone().project(camera);
  return { x: (v.x * 0.5 + 0.5) * W, y: (v.y * -0.5 + 0.5) * H, visible: v.z < 1 };
}

// ─── FIX 1: Plane icon drawn pointing UP (nose at canvas top = +Y in sprite UV).
// The rotation math uses atan2(dx, dy) which rotates this nose toward the travel
// direction. So the icon MUST have its nose pointing UP (low Y in canvas coords).
function makePlaneTexture() {
  const sz  = 256;
  const c   = document.createElement("canvas");
  c.width   = sz;
  c.height  = sz;
  const ctx = c.getContext("2d");
  const cx  = sz / 2;

  ctx.clearRect(0, 0, sz, sz);
  ctx.fillStyle   = "#ffffff";
  ctx.shadowColor = "rgba(255,255,255,0.9)";
  ctx.shadowBlur  = 20;

  // Fuselage — nose at TOP (low Y), tail at BOTTOM (high Y)
  ctx.beginPath();
  ctx.moveTo(cx, 20);                                          // nose tip (top)
  ctx.bezierCurveTo(cx+9, 60, cx+10, 130, cx+8, 190);         // right side
  ctx.lineTo(cx, 182);
  ctx.lineTo(cx-8, 190);                                       // left side
  ctx.bezierCurveTo(cx-10, 130, cx-9, 60, cx, 20);
  ctx.closePath();
  ctx.fill();

  // Wings — at ~40 % from top, swept toward tail (higher Y = toward bottom)
  ctx.beginPath();
  ctx.moveTo(cx-6,  90);     // left wing root, leading edge
  ctx.lineTo(cx-115, 158);   // left wingtip
  ctx.lineTo(cx-100, 172);   // left wingtip trailing
  ctx.lineTo(cx+2,   128);   // root trailing edge
  ctx.lineTo(cx+100, 172);   // right wingtip trailing
  ctx.lineTo(cx+115, 158);   // right wingtip
  ctx.lineTo(cx+6,   90);    // right wing root, leading edge
  ctx.closePath();
  ctx.fill();

  // Tail fins — small, near bottom
  ctx.beginPath();
  ctx.moveTo(cx-4, 172);
  ctx.lineTo(cx-44, 214);
  ctx.lineTo(cx-36, 222);
  ctx.lineTo(cx,    196);
  ctx.lineTo(cx+36, 222);
  ctx.lineTo(cx+44, 214);
  ctx.lineTo(cx+4,  172);
  ctx.closePath();
  ctx.fill();

  return new THREE.CanvasTexture(c);
}

export default function GlobePage() {
  const router   = useRouter();
  const mountRef = useRef(null);

  const cameraRef       = useRef(null);
  const rendererRef     = useRef(null);
  const globeGroupRef   = useRef(null);
  const fromVecLocalRef = useRef(null);
  const toVecLocalRef   = useRef(null);

  // ─── FIX 2: All state that differs between SSR and client is initialised to
  //   a "safe" value that SSR also renders, so React never sees a mismatch.
  //   We flip isMounted → true inside useEffect (client-only), which makes
  //   opacity transitions fire only after hydration.
  const [phase,     setPhase]     = useState("rotating");
  const [fromPos,   setFromPos]   = useState(null);
  const [toPos,     setToPos]     = useState(null);
  const [showDots,  setShowDots]  = useState(false);
  const [dots,      setDots]      = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Mark client-only once, after first paint
  useEffect(() => { setIsMounted(true); }, []);

  // Dots ticker — client only, wrapped in isMounted guard so server never runs it
  useEffect(() => {
    if (!isMounted) return;
    const id = setInterval(() => setDots(d => (d + 1) % 4), 500);
    return () => clearInterval(id);
  }, [isMounted]);

  const updateOverlays = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !globeGroupRef.current) return;
    const W = rendererRef.current.domElement.clientWidth;
    const H = rendererRef.current.domElement.clientHeight;
    const fW = fromVecLocalRef.current?.clone().applyQuaternion(globeGroupRef.current.quaternion);
    const tW = toVecLocalRef.current?.clone().applyQuaternion(globeGroupRef.current.quaternion);
    if (fW) setFromPos(projectToScreen(fW, cameraRef.current, W, H));
    if (tW) setToPos(projectToScreen(tW, cameraRef.current, W, H));
  }, []);

  // Pull query params — safe defaults so SSR and first client render match
  const {
    from: qFrom, to: qTo,
    fromCity: qFromCity, toCity: qToCity,
    depart: qDepart, query: qQuery,
  } = router.isReady ? router.query : {};

  const fromCode = qFrom     || "MIA";
  const toCode   = qTo       || "JFK";
  const fromCity = qFromCity || (AIRPORTS[fromCode]?.city ?? fromCode);
  const toCity   = qToCity   || (AIRPORTS[toCode]?.city   ?? toCode);
  const depart   = qDepart   || "Soon";
  const query    = qQuery    || "";

  useEffect(() => {
    if (!router.isReady) return;
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    // ── Scene setup ──────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 1000);
    camera.position.set(0, 0, 2.85);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x040d1a, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Stars
    const sv = [];
    for (let i = 0; i < 10000; i++) {
      const v = new THREE.Vector3(
        (Math.random()-.5)*2, (Math.random()-.5)*2, (Math.random()-.5)*2
      ).normalize().multiplyScalar(80 + Math.random()*140);
      sv.push(v.x, v.y, v.z);
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.Float32BufferAttribute(sv, 3));
    scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({
      color:0xffffff, size:0.18, sizeAttenuation:true, transparent:true, opacity:0.55
    })));

    // Lights
    scene.add(new THREE.AmbientLight(0x1a2a4a, 2.2));
    const sun = new THREE.DirectionalLight(0xfff8f0, 3.2);
    sun.position.set(6, 2, 4);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x3355cc, 0.9);
    rim.position.set(-5, 0, -4);
    scene.add(rim);

    // Globe
    const RADIUS = 1.0;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    const globeGeo = new THREE.SphereGeometry(RADIUS, 128, 128);
    const globeMat = new THREE.MeshPhongMaterial({
      shininess:18, specular: new THREE.Color(0x1a3388)
    });
    loader.load("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg", tex => {
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      globeMat.map = tex; globeMat.needsUpdate = true;
    });
    loader.load("https://unpkg.com/three-globe/example/img/earth-topology.png", tex => {
      globeMat.bumpMap = tex; globeMat.bumpScale = 0.012; globeMat.needsUpdate = true;
    });
    loader.load("https://unpkg.com/three-globe/example/img/earth-water.png", tex => {
      globeMat.specularMap = tex; globeMat.needsUpdate = true;
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);

    const cloudGeo = new THREE.SphereGeometry(RADIUS*1.012, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({ transparent:true, opacity:0.28, depthWrite:false });
    loader.load("https://unpkg.com/three-globe/example/img/earth-clouds.png", tex => {
      cloudMat.map = tex; cloudMat.needsUpdate = true;
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);

    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS*1.055, 64, 64),
      new THREE.MeshPhongMaterial({
        color:0x1155cc, transparent:true, opacity:0.06, depthWrite:false
      })
    ));
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS*1.10, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader:  `varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader:`varying vec3 vN;void main(){float i=pow(.62-dot(vN,vec3(0,0,1)),2.8);gl_FragColor=vec4(.18,.48,1.,1.)*i*0.9;}`,
        blending:THREE.AdditiveBlending, side:THREE.BackSide, transparent:true, depthWrite:false,
      })
    ));

    const globeGroup = new THREE.Group();
    globeGroup.add(globe, clouds);
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Airport positions
    const fromData     = AIRPORTS[fromCode] || { lat:25.796, lon:-80.287 };
    const toData       = AIRPORTS[toCode]   || { lat:40.641, lon:-73.778 };
    const fromVecLocal = latLonToVec3(fromData.lat, fromData.lon, RADIUS);
    const toVecLocal   = latLonToVec3(toData.lat,   toData.lon,   RADIUS);
    fromVecLocalRef.current = fromVecLocal;
    toVecLocalRef.current   = toVecLocal;

    // Rotate globe so route midpoint faces camera
    const midLocal   = new THREE.Vector3().addVectors(fromVecLocal, toVecLocal).normalize();
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(midLocal, new THREE.Vector3(0,0,1));

    // Surface arc points — stays ON globe
    const ARC_SEG   = 300;
    const PLANE_R   = RADIUS + 0.004;
    const arcPoints = buildSurfaceArcPoints(fromVecLocal, toVecLocal, ARC_SEG)
      .map(p => p.clone().multiplyScalar(PLANE_R));

    // Airport dot markers
    function makeAirportDot(vec) {
      const g   = new THREE.Group();
      const pos = vec.clone().normalize().multiplyScalar(RADIUS + 0.003);
      g.add(new THREE.Mesh(
        new THREE.RingGeometry(0.016, 0.024, 32),
        new THREE.MeshBasicMaterial({ color:0xffffff, transparent:true, opacity:0.90, side:THREE.DoubleSide, depthWrite:false })
      ));
      g.add(new THREE.Mesh(
        new THREE.CircleGeometry(0.007, 20),
        new THREE.MeshBasicMaterial({ color:0xffffff, transparent:true, opacity:0.65, side:THREE.DoubleSide, depthWrite:false })
      ));
      g.add(new THREE.Mesh(
        new THREE.RingGeometry(0.026, 0.034, 32),
        new THREE.MeshBasicMaterial({ color:0xffffff, transparent:true, opacity:0.28, side:THREE.DoubleSide, depthWrite:false })
      ));
      g.position.copy(pos);
      g.lookAt(pos.clone().multiplyScalar(2));
      return g;
    }

    const fromDot = makeAirportDot(fromVecLocal);
    const toDot   = makeAirportDot(toVecLocal);
    fromDot.visible = false;
    toDot.visible   = false;
    globeGroup.add(fromDot, toDot);

    // Path line — drawn incrementally as plane moves
    const pathPositions = new Float32Array((ARC_SEG + 1) * 3);
    arcPoints.forEach((p, i) => {
      pathPositions[i*3]   = p.x;
      pathPositions[i*3+1] = p.y;
      pathPositions[i*3+2] = p.z;
    });
    const pathGeo = new THREE.BufferGeometry();
    pathGeo.setAttribute("position", new THREE.BufferAttribute(pathPositions, 3));
    pathGeo.setDrawRange(0, 0);
    const pathLine = new THREE.Line(pathGeo,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
    );
    pathLine.visible = false;
    globeGroup.add(pathLine);

    // Plane sprite
    const planeTex = makePlaneTexture();
    const planeMat = new THREE.SpriteMaterial({
      map: planeTex, transparent: true, depthTest: false, sizeAttenuation: true,
    });
    const planeSprite = new THREE.Sprite(planeMat);
    planeSprite.scale.set(0.10, 0.10, 0.10);
    const planeGroup = new THREE.Group();
    planeGroup.add(planeSprite);
    planeGroup.visible = false;
    scene.add(planeGroup);

    // ── Animation ────────────────────────────────────────────────────────────
    let animPhase = "rotating";
    let rotProg   = 0;
    let arcProg   = 0;
    let flyProg   = 0;
    let doneTimer = 0;
    const startQuat = new THREE.Quaternion();
    const clock     = new THREE.Clock();
    let raf;

    function animate() {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);

      clouds.rotation.y += dt * 0.016;

      if (animPhase === "rotating") {
        rotProg = Math.min(rotProg + dt * 0.55, 1);
        globeGroup.quaternion.slerpQuaternions(startQuat, targetQuat, easeInOutCubic(rotProg));

        if (rotProg >= 1) {
          animPhase = "drawing";
          fromDot.visible  = true;
          toDot.visible    = true;
          pathLine.visible = true;
          setPhase("drawing");
          setShowDots(true);
        }

      } else if (animPhase === "drawing") {
        arcProg = Math.min(arcProg + dt * 1.2, 1);
        const steps = Math.floor(easeOutQuad(arcProg) * ARC_SEG);
        pathGeo.setDrawRange(0, steps + 1);
        pathGeo.attributes.position.needsUpdate = true;

        if (arcProg >= 1) {
          animPhase = "flying";
          planeGroup.visible = true;
          setPhase("flying");
        }

      } else if (animPhase === "flying") {
        flyProg = Math.min(flyProg + dt * 0.22, 1);

        const idx  = Math.floor(flyProg * (ARC_SEG - 1));
        // ─── FIX 1: look ONE step AHEAD (not behind) so nose points toward "To"
        const idxN = Math.min(idx + 1, ARC_SEG - 1);

        const worldPos  = arcPoints[idx].clone().applyQuaternion(globeGroup.quaternion);
        const worldPosN = arcPoints[idxN].clone().applyQuaternion(globeGroup.quaternion);

        planeGroup.position.copy(worldPos);

        const rW = renderer.domElement.clientWidth;
        const rH = renderer.domElement.clientHeight;
        const sA = worldPos.clone().project(camera);
        const sB = worldPosN.clone().project(camera);

        // screen-space travel vector
        const dx = (sB.x - sA.x) * rW;
        const dy = -(sB.y - sA.y) * rH; // flip NDC Y → screen Y

        // Sprite nose drawn at canvas TOP = "up" in sprite UV = angle 0.
        // atan2(dx, dy): rotates the "up" nose to point in travel direction.
        // This is already correct as long as the texture nose IS at the top.
        // Previously the texture nose was accidentally at the BOTTOM which
        // caused the reversed direction. The makePlaneTexture above is correct.
        planeMat.rotation = Math.atan2(dx, dy);

        // Pulse airport rings
        const t1 = (Date.now() % 1800) / 1800;
        const t2 = ((Date.now() + 600) % 1800) / 1800;
        [fromDot, toDot].forEach((dot, di) => {
          const p = di === 0 ? t1 : t2;
          const pulse = dot.children[2];
          pulse.material.opacity = Math.max(0, 0.28 - p * 0.28);
          pulse.scale.setScalar(1 + p * 2.5);
        });

        if (flyProg >= 1) {
          animPhase = "done";
          setPhase("done");
        }

      } else if (animPhase === "done") {
        doneTimer += dt;
        if (doneTimer >= 1.6) {
          animPhase = "navigating";
          router.push({
            pathname: "/flights",
            query: { from: fromCode, to: toCode, fromCity, toCity, depart, query },
          });
        }
      }

      updateOverlays();
      renderer.render(scene, camera);
    }

    animate();

    // ─── FIX 3: Responsive — listen to resize and update camera + renderer
    const onResize = () => {
      const W2 = container.clientWidth  || window.innerWidth;
      const H2 = container.clientHeight || window.innerHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, fromCode, toCode]);

  // ─── FIX 2: All visible text is derived from state that is identical on
  //   server and client until isMounted is true, so no mismatch occurs.
  const dotsStr = isMounted ? ".".repeat(dots) : "";

  // ─── FIX 3: Responsive font sizes via clamp(), layout via flexbox.
  //   No media queries needed — everything scales fluidly.
  return (
    <div style={{
      position:   "fixed",
      inset:      0,
      background: "#040d1a",
      overflow:   "hidden",
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* THREE.js canvas container */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />

      {/* Brand — top-centre */}
      <div style={{
        position:      "absolute",
        top:           "clamp(14px, 3vw, 28px)",
        left:          "50%",
        transform:     "translateX(-50%)",
        textAlign:     "center",
        pointerEvents: "none",
        zIndex:        10,
        whiteSpace:    "nowrap",
      }}>
        <div style={{
          fontSize:      "clamp(9px, 1.2vw, 11px)",
          fontWeight:    700,
          letterSpacing: "0.30em",
          color:         "rgba(255,255,255,0.65)",
        }}>
          KAIVO · OPERATOR MODE
        </div>
        <div style={{
          fontSize:      "clamp(8px, 1vw, 10px)",
          color:         "rgba(255,255,255,0.30)",
          letterSpacing: "0.10em",
          marginTop:     3,
        }}>
          Live route intelligence
        </div>
      </div>

      {/* Airport label — FROM (only rendered client-side, after isMounted) */}
      {isMounted && showDots && fromPos?.visible && (
        <div style={{
          position:      "absolute",
          left:          fromPos.x,
          top:           fromPos.y,
          transform:     "translate(14px, -50%)",
          pointerEvents: "none",
          zIndex:        20,
          display:       "flex",
          alignItems:    "center",
          gap:           5,
          opacity:       1,
          transition:    "opacity 0.5s ease",
        }}>
          <div style={{
            width:        "clamp(6px, 1vw, 8px)",
            height:       "clamp(6px, 1vw, 8px)",
            borderRadius: "50%",
            border:       "1.5px solid rgba(255,255,255,0.80)",
            flexShrink:   0,
          }} />
          <span style={{
            fontSize:      "clamp(10px, 1.4vw, 12px)",
            fontWeight:    700,
            color:         "rgba(255,255,255,0.85)",
            letterSpacing: "0.06em",
            textShadow:    "0 1px 8px rgba(0,0,0,0.95)",
          }}>
            {fromCode}
          </span>
        </div>
      )}

      {/* Airport label — TO */}
      {isMounted && showDots && toPos?.visible && (
        <div style={{
          position:      "absolute",
          left:          toPos.x,
          top:           toPos.y,
          transform:     "translate(14px, -50%)",
          pointerEvents: "none",
          zIndex:        20,
          display:       "flex",
          alignItems:    "center",
          gap:           5,
          opacity:       1,
          transition:    "opacity 0.5s ease",
        }}>
          <div style={{
            width:        "clamp(6px, 1vw, 8px)",
            height:       "clamp(6px, 1vw, 8px)",
            borderRadius: "50%",
            border:       "1.5px solid rgba(255,255,255,0.80)",
            flexShrink:   0,
          }} />
          <span style={{
            fontSize:      "clamp(10px, 1.4vw, 12px)",
            fontWeight:    700,
            color:         "rgba(255,255,255,0.85)",
            letterSpacing: "0.06em",
            textShadow:    "0 1px 8px rgba(0,0,0,0.95)",
          }}>
            {toCode}
          </span>
        </div>
      )}

      {/* Bottom bar — airport codes + status */}
      <div style={{
        position:      "absolute",
        bottom:        0,
        left:          0,
        right:         0,
        padding:       "0 clamp(16px, 4vw, 32px) clamp(16px, 4vw, 32px)",
        pointerEvents: "none",
        zIndex:        10,
      }}>
        <div style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-end",
          marginBottom:   "clamp(8px, 2vw, 16px)",
        }}>
          <span style={{
            fontSize:      "clamp(22px, 5vw, 44px)",
            fontWeight:    800,
            color:         "rgba(255,255,255,0.90)",
            letterSpacing: "0.08em",
            lineHeight:    1,
          }}>
            {fromCode}
          </span>
          <span style={{
            fontSize:      "clamp(22px, 5vw, 44px)",
            fontWeight:    800,
            color:         "rgba(255,255,255,0.90)",
            letterSpacing: "0.08em",
            lineHeight:    1,
          }}>
            {toCode}
          </span>
        </div>

        {/* Status row */}
        <div style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          gap:             8,
        }}>
          <div style={{
            width:        "clamp(5px, 1vw, 6px)",
            height:       "clamp(5px, 1vw, 6px)",
            borderRadius: "50%",
            background:   "#c8f135",
            flexShrink:   0,
          }} />
          <span style={{
            fontSize:      "clamp(10px, 1.4vw, 12px)",
            color:         "rgba(255,255,255,0.38)",
            letterSpacing: "0.06em",
            textAlign:     "center",
          }}>
            {/* ─── FIX 2: guard with isMounted so SSR and first client render match */}
            {!isMounted
              ? "Locating route"
              : phase === "rotating" || phase === "drawing"
              ? `Locating route${dotsStr}`
              : phase === "flying"
              ? `Ranking the best value picks${dotsStr}`
              : "Route locked in · Loading results…"}
          </span>
        </div>
      </div>

      {/* Done overlay — only shown client-side */}
      {isMounted && phase === "done" && (
        <div style={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          pointerEvents:  "none",
          zIndex:         30,
        }}>
          <div style={{
            background:    "rgba(4,13,26,0.88)",
            border:        "1px solid rgba(255,255,255,0.12)",
            borderRadius:  "clamp(12px, 2vw, 20px)",
            padding:       "clamp(16px, 3vw, 26px) clamp(24px, 5vw, 52px)",
            textAlign:     "center",
            backdropFilter:"blur(20px)",
            boxShadow:     "0 0 60px rgba(0,0,0,0.6)",
            maxWidth:      "90vw",
          }}>
            <div style={{
              fontSize:      "clamp(8px, 1.2vw, 10px)",
              fontWeight:    700,
              letterSpacing: "0.26em",
              color:         "rgba(200,241,53,0.75)",
              marginBottom:  "clamp(8px, 1.5vw, 12px)",
            }}>
              ROUTE LOCKED IN
            </div>
            <div style={{
              fontSize:      "clamp(16px, 3.5vw, 28px)",
              fontWeight:    800,
              color:         "#fff",
              letterSpacing: "0.08em",
            }}>
              {fromCode} → {toCode}
            </div>
            <div style={{
              fontSize:   "clamp(10px, 1.4vw, 12px)",
              color:      "rgba(255,255,255,0.35)",
              marginTop:  "clamp(8px, 1.5vw, 12px)",
            }}>
              Loading flight results…
            </div>
          </div>
        </div>
      )}
    </div>
  );
}