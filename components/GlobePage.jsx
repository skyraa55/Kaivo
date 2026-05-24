"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────────
   AIRPORTS
───────────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────────
   MATH HELPERS
───────────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────────
   RESPONSIVE BREAKPOINT HELPER — runs only client-side
───────────────────────────────────────────────────────────────────────────── */
function getBreakpoint(w) {
  if (w < 380)  return "xs";      // tiny phones
  if (w < 480)  return "sm";      // phones
  if (w < 768)  return "md";      // large phones / small tablets
  if (w < 1024) return "lg";      // tablets / small laptops
  return "xl";                    // desktops
}

/* ─────────────────────────────────────────────────────────────────────────────
   PLANE TEXTURE  – nose drawn at TOP so atan2(dx,dy) rotation works correctly
───────────────────────────────────────────────────────────────────────────── */
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

  ctx.beginPath();
  ctx.moveTo(cx, 20);
  ctx.bezierCurveTo(cx+9, 60, cx+10, 130, cx+8, 190);
  ctx.lineTo(cx, 182);
  ctx.lineTo(cx-8, 190);
  ctx.bezierCurveTo(cx-10, 130, cx-9, 60, cx, 20);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx-6,  90);
  ctx.lineTo(cx-115, 158);
  ctx.lineTo(cx-100, 172);
  ctx.lineTo(cx+2,   128);
  ctx.lineTo(cx+100, 172);
  ctx.lineTo(cx+115, 158);
  ctx.lineTo(cx+6,   90);
  ctx.closePath();
  ctx.fill();

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

/* ─────────────────────────────────────────────────────────────────────────────
   RESPONSIVE CONFIG
   Returns all layout/scene values derived from screen width.
   Called only on the client after mount.
───────────────────────────────────────────────────────────────────────────── */
function getResponsiveConfig(w, h) {
  const bp = getBreakpoint(w);

  // Portrait vs landscape on mobile
  const isPortrait = h > w;

  const configs = {
    xs: {
      // Camera — tighter FOV + closer distance shows more of the globe
      fov: 50,
      camDist: 2.10,
      // Globe is rendered in top 60% of the screen on portrait
      // Use a viewport offset so globe center is shifted up
      globeOffsetY: isPortrait ? -0.08 : 0,
      planeScale: 0.14,
      bottomBarHeight: 110,
      airportCodeSize: "22px",
      cityNameSize: "9px",
      bottomPad: "12px 14px 18px",
      labelOffset: 8,
      labelDotSize: 5,
      labelFontSize: "10px",
      statusDotSize: "6px",
      statusFontSize: "10px",
      brandTopSize: "9px",
      brandSubSize: "8px",
      brandTop: "10px",
      doneCardPad: "16px 22px",
      doneCodeSize: "18px",
      doneSubSize: "10px",
    },
    sm: {
      fov: 46,
      camDist: 2.20,
      globeOffsetY: isPortrait ? -0.06 : 0,
      planeScale: 0.13,
      bottomBarHeight: 120,
      airportCodeSize: "26px",
      cityNameSize: "10px",
      bottomPad: "12px 16px 20px",
      labelOffset: 10,
      labelDotSize: 6,
      labelFontSize: "11px",
      statusDotSize: "6px",
      statusFontSize: "10px",
      brandTopSize: "10px",
      brandSubSize: "8px",
      brandTop: "12px",
      doneCardPad: "18px 26px",
      doneCodeSize: "20px",
      doneSubSize: "10px",
    },
    md: {
      fov: 42,
      camDist: 2.40,
      globeOffsetY: isPortrait ? -0.04 : 0,
      planeScale: 0.11,
      bottomBarHeight: 130,
      airportCodeSize: "32px",
      cityNameSize: "11px",
      bottomPad: "14px 22px 22px",
      labelOffset: 12,
      labelDotSize: 7,
      labelFontSize: "11px",
      statusDotSize: "6px",
      statusFontSize: "11px",
      brandTopSize: "10px",
      brandSubSize: "9px",
      brandTop: "16px",
      doneCardPad: "20px 32px",
      doneCodeSize: "24px",
      doneSubSize: "11px",
    },
    lg: {
      fov: 40,
      camDist: 2.65,
      globeOffsetY: 0,
      planeScale: 0.105,
      bottomBarHeight: 140,
      airportCodeSize: "38px",
      cityNameSize: "11px",
      bottomPad: "0 28px 28px",
      labelOffset: 13,
      labelDotSize: 7,
      labelFontSize: "12px",
      statusDotSize: "6px",
      statusFontSize: "11px",
      brandTopSize: "10px",
      brandSubSize: "9px",
      brandTop: "20px",
      doneCardPad: "22px 42px",
      doneCodeSize: "26px",
      doneSubSize: "11px",
    },
    xl: {
      fov: 38,
      camDist: 2.85,
      globeOffsetY: 0,
      planeScale: 0.10,
      bottomBarHeight: 150,
      airportCodeSize: "clamp(28px, 3.5vw, 44px)",
      cityNameSize: "clamp(10px, 1vw, 12px)",
      bottomPad: "0 32px 32px",
      labelOffset: 14,
      labelDotSize: 8,
      labelFontSize: "clamp(10px, 1vw, 12px)",
      statusDotSize: "6px",
      statusFontSize: "clamp(10px, 1vw, 12px)",
      brandTopSize: "clamp(9px, 0.8vw, 11px)",
      brandSubSize: "clamp(8px, 0.7vw, 10px)",
      brandTop: "clamp(14px, 2.5vw, 28px)",
      doneCardPad: "clamp(16px,2.5vw,26px) clamp(24px,4.5vw,52px)",
      doneCodeSize: "clamp(18px,3vw,28px)",
      doneSubSize: "clamp(10px,1vw,12px)",
    },
  };

  return { bp, ...configs[bp] };
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function GlobePage() {
  const router   = useRouter();
  const mountRef = useRef(null);

  const cameraRef        = useRef(null);
  const rendererRef      = useRef(null);
  const globeGroupRef    = useRef(null);
  const fromVecLocalRef  = useRef(null);
  const toVecLocalRef    = useRef(null);
  const configRef        = useRef(null);   // live responsive config
  const planeSpriteRef   = useRef(null);
  const planeMatRef      = useRef(null);

  // ── State — all SSR-safe defaults ────────────────────────────────────────
  const [phase,     setPhase]     = useState("rotating");
  const [fromPos,   setFromPos]   = useState(null);
  const [toPos,     setToPos]     = useState(null);
  const [showDots,  setShowDots]  = useState(false);
  const [dots,      setDots]      = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  // cfg is null on SSR, populated after mount — prevents hydration mismatch
  const [cfg,       setCfg]       = useState(null);

  // Set isMounted + initial cfg only after first client paint
  useEffect(() => {
    setIsMounted(true);
    const c = getResponsiveConfig(window.innerWidth, window.innerHeight);
    setCfg(c);
    configRef.current = c;
  }, []);

  // Dots ticker
  useEffect(() => {
    if (!isMounted) return;
    const id = setInterval(() => setDots(d => (d + 1) % 4), 500);
    return () => clearInterval(id);
  }, [isMounted]);

  // Responsive resize — update cfg state + renderer + camera + plane scale
  useEffect(() => {
    if (!isMounted) return;
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const next = getResponsiveConfig(w, h);
      setCfg(next);
      configRef.current = next;

      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.fov    = next.fov;
        cameraRef.current.aspect = w / h;
        cameraRef.current.position.z = next.camDist;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      }
      if (planeSpriteRef.current) {
        const s = next.planeScale;
        planeSpriteRef.current.scale.set(s, s, s);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMounted]);

  const updateOverlays = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !globeGroupRef.current) return;
    const W  = rendererRef.current.domElement.clientWidth;
    const H  = rendererRef.current.domElement.clientHeight;
    const fW = fromVecLocalRef.current?.clone().applyQuaternion(globeGroupRef.current.quaternion);
    const tW = toVecLocalRef.current?.clone().applyQuaternion(globeGroupRef.current.quaternion);
    if (fW) setFromPos(projectToScreen(fW, cameraRef.current, W, H));
    if (tW) setToPos(projectToScreen(tW, cameraRef.current, W, H));
  }, []);

  // Pull query params with safe defaults
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

  // ── Three.js scene ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!router.isReady) return;
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    // Use live configRef so initial scene config matches current viewport
    const initCfg = getResponsiveConfig(W, H);
    configRef.current = initCfg;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(initCfg.fov, W / H, 0.1, 1000);
    camera.position.set(0, 0, initCfg.camDist);
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

    // Surface arc points
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

    // Path line
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
    const planeTex    = makePlaneTexture();
    const planeMat    = new THREE.SpriteMaterial({
      map: planeTex, transparent: true, depthTest: false, sizeAttenuation: true,
    });
    planeMatRef.current = planeMat;
    const planeSprite   = new THREE.Sprite(planeMat);
    planeSpriteRef.current = planeSprite;
    const s = initCfg.planeScale;
    planeSprite.scale.set(s, s, s);
    const planeGroup  = new THREE.Group();
    planeGroup.add(planeSprite);
    planeGroup.visible = false;
    scene.add(planeGroup);

    // ── Animation loop ───────────────────────────────────────────────────────
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
        const idxN = Math.min(idx + 1, ARC_SEG - 1);

        const worldPos  = arcPoints[idx].clone().applyQuaternion(globeGroup.quaternion);
        const worldPosN = arcPoints[idxN].clone().applyQuaternion(globeGroup.quaternion);
        planeGroup.position.copy(worldPos);

        const rW = renderer.domElement.clientWidth;
        const rH = renderer.domElement.clientHeight;
        const sA = worldPos.clone().project(camera);
        const sB = worldPosN.clone().project(camera);
        const dx = (sB.x - sA.x) * rW;
        const dy = -(sB.y - sA.y) * rH;
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

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, fromCode, toCode]);

  // ── Derived values — safe for SSR (cfg is null until mount) ──────────────
  const dotsStr  = isMounted ? ".".repeat(dots) : "";

  const statusMsg = !isMounted
    ? "Locating route"
    : phase === "rotating" || phase === "drawing"
    ? `Locating route${dotsStr}`
    : phase === "flying"
    ? `Ranking the best value picks${dotsStr}`
    : "Route locked in · Loading results…";

  // While SSR or before mount, render a minimal shell that matches server output
  // (no cfg-dependent inline styles that could differ). After mount cfg is set.
  if (!cfg) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#040d1a",
        overflow: "hidden",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');* { box-sizing: border-box; }`}</style>
        <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  // Safe to use cfg now — we're on the client
  const isXs = cfg.bp === "xs";
  const isSm = cfg.bp === "sm" || cfg.bp === "xs";

  // Bottom info bar layout: on very small screens stack the route info
  // vertically to avoid cramping
  const useCompactBar = isXs;

  return (
    <div style={{
      position:   "fixed",
      inset:      0,
      background: "#040d1a",
      overflow:   "hidden",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* THREE.js canvas mount */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />

      {/* ── Brand — top-centre ── */}
      <div style={{
        position:      "absolute",
        top:           cfg.brandTop,
        left:          "50%",
        transform:     "translateX(-50%)",
        textAlign:     "center",
        pointerEvents: "none",
        zIndex:        10,
        whiteSpace:    "nowrap",
      }}>
        <div style={{
          fontSize:      cfg.brandTopSize,
          fontWeight:    700,
          letterSpacing: "0.30em",
          color:         "rgba(255,255,255,0.65)",
        }}>
          KAIVO · OPERATOR MODE
        </div>
        <div style={{
          fontSize:      cfg.brandSubSize,
          color:         "rgba(255,255,255,0.30)",
          letterSpacing: "0.10em",
          marginTop:     3,
        }}>
          Live route intelligence
        </div>
      </div>

      {/* ── Airport label FROM ── */}
      {showDots && fromPos?.visible && (
        <div style={{
          position:      "absolute",
          left:          fromPos.x,
          top:           fromPos.y,
          transform:     `translate(${cfg.labelOffset}px, -50%)`,
          pointerEvents: "none",
          zIndex:        20,
          display:       "flex",
          alignItems:    "center",
          gap:           isXs ? 3 : 5,
        }}>
          <div style={{
            width:        cfg.labelDotSize,
            height:       cfg.labelDotSize,
            borderRadius: "50%",
            border:       "1.5px solid rgba(255,255,255,0.80)",
            flexShrink:   0,
          }} />
          <span style={{
            fontSize:      cfg.labelFontSize,
            fontWeight:    700,
            color:         "rgba(255,255,255,0.85)",
            letterSpacing: "0.06em",
            textShadow:    "0 1px 8px rgba(0,0,0,0.95)",
          }}>
            {fromCode}
          </span>
        </div>
      )}

      {/* ── Airport label TO ── */}
      {showDots && toPos?.visible && (
        <div style={{
          position:      "absolute",
          left:          toPos.x,
          top:           toPos.y,
          transform:     `translate(${cfg.labelOffset}px, -50%)`,
          pointerEvents: "none",
          zIndex:        20,
          display:       "flex",
          alignItems:    "center",
          gap:           isXs ? 3 : 5,
        }}>
          <div style={{
            width:        cfg.labelDotSize,
            height:       cfg.labelDotSize,
            borderRadius: "50%",
            border:       "1.5px solid rgba(255,255,255,0.80)",
            flexShrink:   0,
          }} />
          <span style={{
            fontSize:      cfg.labelFontSize,
            fontWeight:    700,
            color:         "rgba(255,255,255,0.85)",
            letterSpacing: "0.06em",
            textShadow:    "0 1px 8px rgba(0,0,0,0.95)",
          }}>
            {toCode}
          </span>
        </div>
      )}

      {/* ── Bottom info bar ── */}
      <div style={{
        position:      "absolute",
        bottom:        0,
        left:          0,
        right:         0,
        padding:       cfg.bottomPad,
        pointerEvents: "none",
        zIndex:        10,
        // Subtle gradient so text reads against any globe colour
        background:    "linear-gradient(to top, rgba(4,13,26,0.92) 0%, rgba(4,13,26,0.70) 60%, transparent 100%)",
      }}>

        {/* Airport codes row */}
        {useCompactBar ? (
          /* ── XS: vertical compact layout ── */
          <div style={{
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            6,
            marginBottom:   8,
          }}>
            {/* Route codes inline */}
            <div style={{
              display:     "flex",
              alignItems:  "center",
              gap:         10,
            }}>
              <span style={{
                fontSize:   cfg.airportCodeSize,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color:      "rgba(255,255,255,0.90)",
                lineHeight: 1,
              }}>
                {fromCode}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
              <span style={{
                fontSize:   cfg.airportCodeSize,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color:      "rgba(255,255,255,0.90)",
                lineHeight: 1,
              }}>
                {toCode}
              </span>
            </div>
            {/* City names inline */}
            <div style={{
              display:    "flex",
              gap:        6,
              alignItems: "center",
            }}>
              <span style={{ fontSize: cfg.cityNameSize, color: "rgba(255,255,255,0.40)", fontWeight: 500 }}>
                {fromCity}
              </span>
              <span style={{ fontSize: cfg.cityNameSize, color: "rgba(255,255,255,0.20)" }}>→</span>
              <span style={{ fontSize: cfg.cityNameSize, color: "rgba(255,255,255,0.40)", fontWeight: 500 }}>
                {toCity}
              </span>
            </div>
            {/* Depart badge */}
            <span style={{
              fontSize:      "8px",
              color:         "rgba(255,255,255,0.25)",
              letterSpacing: "0.12em",
              fontWeight:    600,
              textTransform: "uppercase",
            }}>
              {depart}
            </span>
          </div>
        ) : (
          /* ── SM and up: horizontal three-column layout ── */
          <div style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
            marginBottom:   isSm ? 10 : "clamp(8px, 1.5vw, 16px)",
            gap:            8,
          }}>
            {/* FROM block */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start", minWidth: 0 }}>
              <span style={{
                fontSize:      cfg.airportCodeSize,
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    800,
                color:         "rgba(255,255,255,0.90)",
                letterSpacing: "0.06em",
                lineHeight:    1,
                display:       "block",
              }}>
                {fromCode}
              </span>
              <span style={{
                fontSize:      cfg.cityNameSize,
                color:         "rgba(255,255,255,0.40)",
                letterSpacing: "0.05em",
                fontWeight:    500,
                whiteSpace:    "nowrap",
                overflow:      "hidden",
                textOverflow:  "ellipsis",
                maxWidth:      "20vw",
              }}>
                {fromCity}
              </span>
            </div>

            {/* Centre divider */}
            <div style={{
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            4,
              flex:           1,
              paddingBottom:  isSm ? 4 : 6,
            }}>
              <div style={{
                height:     1,
                width:      "100%",
                background: "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.20), rgba(255,255,255,0.05))",
              }} />
              <svg width={isSm ? 14 : 18} height={isSm ? 14 : 18} viewBox="0 0 24 24" fill="rgba(255,255,255,0.30)">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
              <span style={{
                fontSize:      isSm ? "8px" : "9px",
                color:         "rgba(255,255,255,0.25)",
                letterSpacing: "0.12em",
                fontWeight:    600,
                textTransform: "uppercase",
              }}>
                {depart}
              </span>
            </div>

            {/* TO block */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end", minWidth: 0 }}>
              <span style={{
                fontSize:      cfg.airportCodeSize,
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    800,
                color:         "rgba(255,255,255,0.90)",
                letterSpacing: "0.06em",
                lineHeight:    1,
                display:       "block",
              }}>
                {toCode}
              </span>
              <span style={{
                fontSize:      cfg.cityNameSize,
                color:         "rgba(255,255,255,0.40)",
                letterSpacing: "0.05em",
                fontWeight:    500,
                whiteSpace:    "nowrap",
                overflow:      "hidden",
                textOverflow:  "ellipsis",
                maxWidth:      "20vw",
              }}>
                {toCity}
              </span>
            </div>
          </div>
        )}

        {/* Status row */}
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          gap:            8,
          paddingBottom:  isXs ? 2 : 0,
        }}>
          <div style={{
            width:        cfg.statusDotSize,
            height:       cfg.statusDotSize,
            borderRadius: "50%",
            background:   "#c8f135",
            flexShrink:   0,
          }} />
          <span style={{
            fontSize:      cfg.statusFontSize,
            color:         "rgba(255,255,255,0.38)",
            letterSpacing: "0.06em",
            textAlign:     "center",
          }}>
            {statusMsg}
          </span>
        </div>
      </div>

      {/* ── Route locked — done overlay ── */}
      {phase === "done" && (
        <div style={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          pointerEvents:  "none",
          zIndex:         30,
          padding:        "0 16px",
        }}>
          <div style={{
            background:     "rgba(4,13,26,0.88)",
            border:         "1px solid rgba(255,255,255,0.12)",
            borderRadius:   isXs ? 12 : isSm ? 16 : "clamp(12px, 2vw, 20px)",
            padding:        cfg.doneCardPad,
            textAlign:      "center",
            backdropFilter: "blur(20px)",
            boxShadow:      "0 0 60px rgba(0,0,0,0.6)",
            maxWidth:       "88vw",
            width:          "fit-content",
          }}>
            <div style={{
              fontSize:      isXs ? "8px" : "clamp(8px, 1vw, 10px)",
              fontWeight:    700,
              letterSpacing: "0.26em",
              color:         "rgba(200,241,53,0.75)",
              marginBottom:  isXs ? 8 : "clamp(8px, 1.2vw, 12px)",
            }}>
              ROUTE LOCKED IN
            </div>
            <div style={{
              fontSize:      cfg.doneCodeSize,
              fontFamily:    "'Syne', sans-serif",
              fontWeight:    800,
              color:         "#fff",
              letterSpacing: "0.08em",
            }}>
              {fromCode} → {toCode}
            </div>
            <div style={{
              fontSize:  cfg.doneSubSize,
              color:     "rgba(255,255,255,0.35)",
              marginTop: isXs ? 8 : "clamp(8px, 1.2vw, 12px)",
            }}>
              Loading flight results…
            </div>
          </div>
        </div>
      )}
    </div>
  );
}