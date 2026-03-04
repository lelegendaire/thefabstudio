"use client";
import Image from "next/image";
import Copy_bloc from "../components/Copy_bloc";
import AnimatedLink from "../components/AnimatedLink";
import {Slider} from "../components/ui/slider";
import { useEffect, useRef, useState } from "react";
import { druck } from "@/fonts";
import OsmoMenu from "./MenuTWD";
import { useRouter } from "next/navigation";
import { vertexShader, fragmentShader } from "./shader_TWD";
import {Pause,Play, Rewind,FastForward,Volume,Volume2 } from "lucide-react"
import {
  ScrubBarContainer,
  ScrubBarProgress,
  ScrubBarTimeLabel,
  ScrubBarTrack,
} from "../components/ui/scrub-bar"
// ─── ATLAS LOADER — vraies covers albums ────────────────────────────────────────
async function buildAlbumAtlas(THREE) {
  // Fetch covers depuis notre route Spotify
  const albums = await fetch("/api/deezer-albums").then((r) => r.json());

  const SIZE = 512;
  const N = albums.length;

  const loadImg = (album) =>
    new Promise((resolve) => {
      const img = new globalThis.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve({ img, album });
      img.onerror = () => resolve({ img: null, album });
      img.src = album.url;
    });

  const results = await Promise.all(albums.map(loadImg));

  const atl = document.createElement("canvas");
  atl.width = SIZE;
  atl.height = SIZE * N;
  const ctx = atl.getContext("2d");

  for (let i = 0; i < N; i++) {
    const oy = i * SIZE;
    const { img, album } = results[i];

    if (img) {
      const r = img.naturalWidth / img.naturalHeight;
      let sx = 0,
        sy = 0,
        sw = img.naturalWidth,
        sh = img.naturalHeight;
      if (r > 1) {
        sw = sh;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = sw;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, oy, SIZE, SIZE);
    } else {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, oy, SIZE, SIZE);
    }

    // Overlay + titre
    const ov = ctx.createLinearGradient(0, oy + SIZE * 0.62, 0, oy + SIZE);
    ov.addColorStop(0, "rgba(0,0,0,0)");
    ov.addColorStop(1, "rgba(0,0,0,0.85)");
    ctx.fillStyle = ov;
    ctx.fillRect(0, oy, SIZE, SIZE);

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = `700 ${SIZE * 0.065}px Helvetica Neue, Arial, sans-serif`;
    ctx.fillText(album.title, SIZE * 0.06, oy + SIZE - SIZE * 0.09);

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `400 ${SIZE * 0.045}px Helvetica Neue, Arial, sans-serif`;
    ctx.fillText(album.year, SIZE * 0.06, oy + SIZE - SIZE * 0.04);
  }

  const imageInfos = Array.from({ length: N }, (_, i) => ({
    album: albums[i],
    uvs: {
      xStart: 0,
      xEnd: 1,
      yStart: 1 - (i * SIZE) / (SIZE * N),
      yEnd: 1 - ((i + 1) * SIZE) / (SIZE * N),
    },
  }));

  const tex = new THREE.Texture(atl);
  tex.needsUpdate = true;
  return { texture: tex, imageInfos, N_ALBUMS: N, albums };
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const Image_3 = [
  {
    title: "4 win Grammy Awards",
    image: "/medias/The_Weeknd/grammy_Awards.webp",
  },
  {
    title: "100M+ monthly listeners",
    image: "/medias/The_Weeknd/profile.webp",
  },
  { title: "3 eras", image: "/medias/The_Weeknd/eras.webp" },
];

export default function MainTheWeeknd() {
  const [value, setValue] = useState(30)
  const duration2 = 100
  const [duration, setDuration] = useState(0);
  const router = useRouter();
  const playerRef = useRef(null);
  const markerRef = useRef(null);
  const timelineRef = useRef(null);
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const stRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [hoveredAlbum, setHoveredAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
const isDraggingRef = useRef(false);
  // ── GSAP scroll animations ────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    let killed = false;

    async function init() {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const splitMod = await import("gsap/SplitText");
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.default || stMod.ScrollTrigger;
      const SplitText = splitMod.default || splitMod.SplitText;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      if (killed) return;
      stRef.current = ScrollTrigger;

      await new Promise((r) => setTimeout(r, 100));
      if (!containerRef.current || killed) return;

      containerRef.current.querySelectorAll(".work-item").forEach((item) => {
        const img = item.querySelector(".work-item-img");
        const nameH1 = item.querySelector(".work-item-name h1");
        const split = new SplitText(nameH1, { type: "chars" });
        gsap.set(split.chars, { y: "125%" });
        split.chars.forEach((char, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: `top+=${index * 25 - 250} top`,
            end: `top+=${index * 25 - 100} top`,
            scrub: 1,
            animation: gsap.fromTo(
              char,
              { y: "125%" },
              { y: "0%", ease: "none" },
            ),
          });
        });
        ScrollTrigger.create({
          trigger: item,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
          animation: gsap.fromTo(
            img,
            { clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
            },
          ),
        });
        ScrollTrigger.create({
          trigger: item,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 0.5,
          animation: gsap.fromTo(
            img,
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
              ease: "none",
            },
          ),
        });
      });
      ScrollTrigger.refresh();
    }

    init();
    return () => {
      killed = true;
      stRef.current?.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ── Three.js magazine ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf,
      killed = false;

    async function init() {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default || gsapMod.gsap;
      const ScrollTrigger = stMod.default || stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const THREE = await import("three");
      if (killed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        70,
        innerWidth / innerHeight,
        0.1,
        100,
      );
      camera.position.z = 6;
      scene.add(camera);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(Math.min(2, devicePixelRatio));

      const MESH_COUNT = 24; // 3 cycles × 8 albums
      const PAGE_THICKNESS = 0.1;
      const PAGE_SPACING = 1;
      const PAGE_W = 3.0;
      const PAGE_H = 3.0;
      const HOVER_SCALE = 1.12;
      const SCALE_LERP = 0.1;

      const {
        texture: atlasTexture,
        imageInfos,
        N_ALBUMS,
        albums,
      } = await buildAlbumAtlas(THREE);
      if (killed) return;
      const geo = new THREE.BoxGeometry(
        PAGE_W,
        PAGE_H,
        PAGE_THICKNESS,
        50,
        50,
        1,
      );
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
          uProgress: { value: 0 },
          uSplitProgress: { value: 0 },
          uPageThickness: { value: PAGE_THICKNESS },
          uPageWidth: { value: PAGE_W },
          uPageHeight: { value: PAGE_H },
          uMeshCount: { value: MESH_COUNT },
          uTime: { value: 0 },
          uAtlas: { value: atlasTexture },
          uScrollY: { value: 0 },
          uSpeedY: { value: 0 },
          uPageSpacing: { value: PAGE_SPACING },
        },
      });

      const instMesh = new THREE.InstancedMesh(geo, mat, MESH_COUNT);
      const texCoords = new Float32Array(MESH_COUNT * 4);
      const idxArr = new Float32Array(MESH_COUNT);
      const scaleArr = new Float32Array(MESH_COUNT).fill(1.0);
      const dummy = new THREE.Object3D();

      for (let i = 0; i < MESH_COUNT; i++) {
        const img = imageInfos[i % N_ALBUMS];
        texCoords[i * 4] = img.uvs.xStart;
        texCoords[i * 4 + 1] = img.uvs.xEnd;
        texCoords[i * 4 + 2] = img.uvs.yStart;
        texCoords[i * 4 + 3] = img.uvs.yEnd;
        idxArr[i] = i;
        dummy.updateMatrix();
        instMesh.setMatrixAt(i, dummy.matrix);
      }

      const scaleBuf = new THREE.InstancedBufferAttribute(scaleArr, 1);
      instMesh.geometry.setAttribute(
        "aTextureCoords",
        new THREE.InstancedBufferAttribute(texCoords, 4),
      );
      instMesh.geometry.setAttribute(
        "aIndex",
        new THREE.InstancedBufferAttribute(idxArr, 1),
      );
      instMesh.geometry.setAttribute("aScale", scaleBuf);
      instMesh.instanceMatrix.needsUpdate = true;
      scene.add(instMesh);

      // ── Raycaster hover ───────────────────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const mouseNDC = new THREE.Vector2(-9999, -9999);
      let hoveredId = -1;
      let scaleReady = false;

      const onMouseMove = (e) => {
        if (!scaleReady) return;
        mouseNDC.x = (e.clientX / innerWidth) * 2 - 1;
        mouseNDC.y = -(e.clientY / innerHeight) * 2 + 1;
      };
      const onMouseLeave = () => mouseNDC.set(-9999, -9999);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);

      // ── Scroll ────────────────────────────────────────────────────────────────
      const scrollY = { target: 0, current: 0 };
      let wheelReady = false;
      const getWorldH = () =>
        camera.position.z * Math.tan((camera.fov * Math.PI) / 360) * 2;
      const applyDelta = (d) => {
        const v = (d * getWorldH()) / innerHeight;
        scrollY.target += v;
        mat.uniforms.uSpeedY.value += v;
      };
      const tState = { last: 0, active: false };
      const onTStart = (e) => {
        if (!wheelReady) return;
        tState.last = e.touches[0].clientX;
        tState.active = true;
      };
      const onTMove = (e) => {
        if (!tState.active || !wheelReady) return;
        e.preventDefault();
        applyDelta((tState.last - e.touches[0].clientX) * 2);
        tState.last = e.touches[0].clientX;
      };
      const onTEnd = () => {
        tState.active = false;
      };
      const onResize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        renderer.setPixelRatio(Math.min(2, devicePixelRatio));
      };

      window.addEventListener("touchstart", onTStart, { passive: false });
      window.addEventListener("touchend", onTEnd);
      window.addEventListener("resize", onResize);
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 → 1
          scrollY.target = progress * 60; // ajuste la force ici
        },
      });
      // Le wheel s'additionne par-dessus — actif dès que la section est pinnée
      const onWheelPinned = (e) => {
        let px = e.deltaY;
        if (e.deltaMode === 1) px *= 28;
        if (e.deltaMode === 2) px *= innerHeight;
        applyDelta(px * 0.3); // ← 0.3 pour pas que ça parte trop vite vs le ST
      };

      // ── Render loop ───────────────────────────────────────────────────────────
      const INTRO_DUR = 5.5,
        SPLIT_START = 4.9,
        SPLIT_DUR = 1.2;
      let startTime = null;

      function animate(ts) {
        if (killed) return;
        raf = requestAnimationFrame(animate);
        if (!startTime) startTime = ts;
        const elapsed = (ts - startTime) / 1000;

        mat.uniforms.uProgress.value = easeInOut(
          Math.min(elapsed / INTRO_DUR, 1),
        );
        const se = elapsed - SPLIT_START;
        if (se > 0) {
          const rawS = Math.min(se / SPLIT_DUR, 1);
          mat.uniforms.uSplitProgress.value = easeInOut(rawS);
          if (rawS >= 1 && !wheelReady) {
            wheelReady = scaleReady = true;
            setReady(true);
            window.addEventListener("wheel", onWheelPinned); // ✅ défini au-dessus
            window.addEventListener("touchmove", onTMove, { passive: false });
          }
        }
        mat.uniforms.uTime.value = elapsed;

        // Raycasting + lerp scales
        if (scaleReady) {
          raycaster.setFromCamera(mouseNDC, camera);
          const hits = raycaster.intersectObject(instMesh);
          const newId = hits.length ? hits[0].instanceId : -1;

          if (newId !== hoveredId) {
            hoveredId = newId;
            setHoveredAlbum(
              hoveredId >= 0 ? albums[hoveredId % N_ALBUMS] : null,
            );
            canvas.style.cursor = hoveredId >= 0 ? "pointer" : "default";
          }
          if (newId !== hoveredId) {
            hoveredId = newId;
            setHoveredAlbum(
              hoveredId >= 0 ? albums[hoveredId % N_ALBUMS] : null,
            );
            canvas.style.cursor = hoveredId >= 0 ? "pointer" : "default";
          }
          let dirty = false;
          for (let i = 0; i < MESH_COUNT; i++) {
            const target = i === hoveredId ? HOVER_SCALE : 1.0;
            const next = scaleArr[i] + (target - scaleArr[i]) * SCALE_LERP;
            if (Math.abs(next - scaleArr[i]) > 0.0001) {
              scaleArr[i] = next;
              dirty = true;
            }
          }
          if (dirty) scaleBuf.needsUpdate = true;
        }

        scrollY.current += (scrollY.target - scrollY.current) * 0.12;
        mat.uniforms.uScrollY.value = scrollY.current;
        mat.uniforms.uSpeedY.value *= 0.835;

        renderer.render(scene, camera);
      }
      requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("touchstart", onTStart);
        window.removeEventListener("touchmove", onTMove);
        window.removeEventListener("touchend", onTEnd);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("wheel", onWheelPinned);
        renderer.dispose();
        mat.dispose();
        geo.dispose();
        atlasTexture.dispose();
      };
    }

    let cleanupFn;
    init().then((fn) => {
      cleanupFn = fn;
    });
    return () => {
      killed = true;
      cancelAnimationFrame(raf);
      cleanupFn?.();
    };
  }, []);
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: "e2PsmMlSP5s", // ← remplace
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          autoplay: 1,        // ← autoplay force le chargement sans afficher le titre
          mute: 1,            // ← requis pour autoplay
          playsinline: 1,
          iv_load_policy: 3,  // ← cache les annotations
          disablekb: 1,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            event.target.mute(); // obligatoire

            const checkDuration = setInterval(() => {
              const d = playerRef.current.getDuration();
              if (d > 0) {
                setDuration(d);
                clearInterval(checkDuration);
              }
            }, 200);
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            console.log("NEW STATE:", event.data);
          },
        },
      });
    };
  }, []);

  const toggleVideo = () => {
    console.log("CLICKED");
    console.log("PLAYER:", playerRef.current);
    if (!playerRef.current) {
      console.log("NO PLAYER");
      return;
    }
    const state = playerRef.current.getPlayerState();

    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };
  // Custom cursor
  useEffect(() => {
    const moveCursor = (e) => {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleTimelineClick = (e) => {
  if (!timelineRef.current || !playerRef.current || !duration) return;

  const rect    = timelineRef.current.getBoundingClientRect();
  const clickX  = e.clientX - rect.left;
  const percent = Math.max(0, Math.min(1, clickX / rect.width));
  const seekTime = percent * duration;

  playerRef.current.seekTo(seekTime, true);

  // Met à jour le marker immédiatement sans attendre la prochaine frame
  if (markerRef.current) {
    markerRef.current.style.left = `${percent * 100}%`;
  }
};
  useEffect(() => {
    let animationFrame;

    const updateTimeline = () => {
  // Ne pas écraser la position pendant qu'on drag
  if (playerRef.current && duration && !isDraggingRef.current) {
    const currentTime = playerRef.current.getCurrentTime();
    const progress    = (currentTime / duration) * 100;
    if (markerRef.current) {
      markerRef.current.style.left = `${progress}%`;
    }
  }
  animationFrame = requestAnimationFrame(updateTimeline);
};

    updateTimeline();

    return () => cancelAnimationFrame(animationFrame);
  }, [duration]);
  
  return (
    <>
      {/* Hero */}
      <section className="bg-[url(/medias/The_Weeknd/weekndposter.webp)] h-screen bg-cover w-screen flex items-center justify-center flex-col">
        <div className="noise bg-[url(/medias/noise.webp)] h-screen bg-center bg-repeat absolute w-full opacity-5" />
        <div className="text-white flex justify-end items-start w-full px-5 pt-5 mb-auto z-5">
          <OsmoMenu />
        </div>
        <div className="mb-auto">
          <h2 className={`${druck.className} text-9xl text-white`}>
            The Weeknd
          </h2>
          <h2 className="text-2xl text-white">
            One artist. One universe. One experience.
          </h2>
        </div>
        <div className="flex justify-between items-center text-white w-full p-5 z-2 relative">
          <p>Introducing the idol</p>
          <AnimatedLink color={"white"} onClick={() => router.push("/")}>
            Created by TheFabStudio
          </AnimatedLink>
        </div>
      </section>

      {/* Bio */}
      <section className="h-screen bg-black text-white flex items-center justify-center flex-col relative z-20">
        <Copy_bloc blockColor="#e10430">
          <h1 className="text-4xl font-bold">Who is he ?</h1>
        </Copy_bloc>
        <div className="flex justify-evenly items-center">
          <div className="w-60/100">
            <Copy_bloc blockColor="#e10430">
              <p>
                The Weeknd, nom de scène d&apos;Abel Makkonen Tesfaye est un
                chanteur, acteur, auteur-compositeur-interprète et producteur
                canadien, né le 16 février 1990 à Toronto. Le 1er janvier 2023,
                son single Blinding Lights devient le plus écouté de tous les
                temps sur Spotify, dépassant Shape of You d&apos;Ed Sheeran.
              </p>
            </Copy_bloc>
          </div>
          <div>
            <Image
              src="/medias/The_Weeknd/weeknd_pose.webp"
              width={300}
              height={700}
              alt="The weeknd Picture"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Scroll images */}
      <section
        ref={containerRef}
        className="h-full bg-black text-white flex items-center justify-center flex-col"
      >
        {Image_3.map((work, index) => (
          <div
            key={index}
            className="work-item h-[150vh] relative overflow-hidden w-screen"
          >
            <div className="work-item-img absolute w-full h-full [clip-path:polygon(25%_25%,75%_40%,100%_100%,0%_100%)] will-change-[clip-path]">
              <img
                src={work.image}
                alt={work.title}
                className={`w-full h-full object-cover ${index === 1 ? "object-center" : "object-top"}`}
              />
            </div>
            <div className="work-item-name absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-1">
              <h1 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tight">
                {work.title}
              </h1>
            </div>
          </div>
        ))}
        <section className="h-screen flex items-center justify-center">
          <h2 className="text-white text-4xl">A extraordinary artist</h2>
        </section>
      </section>

      {/* WebGL Magazine */}
      <section
        ref={sectionRef}
        className="h-screen w-screen relative bg-black overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />

        {/* Nom de l'album au hover — apparaît en haut au centre */}
        <div
          style={{
            position: "absolute",
            top: "4vmax",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            textAlign: "center",
            pointerEvents: "none",
            transition: "opacity 0.25s ease",
            opacity: hoveredAlbum ? 1 : 0,
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.92)",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontWeight: 700,
              fontSize: "max(1em, 1.1vmax)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {hoveredAlbum?.title}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
              fontSize: "max(0.5em, 0.6vmax)",
              letterSpacing: "0.15em",
              marginTop: "0.3em",
            }}
          >
            {hoveredAlbum?.year}
          </p>
        </div>

        {/* Scroll hint */}
        <p
          style={{
            position: "absolute",
            bottom: "4vmax",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "monospace",
            fontSize: "max(0.5em, 0.6vmax)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transition: "opacity 1s ease",
            opacity: ready ? 1 : 0,
          }}
        >
          Scroll to browse
        </p>
      </section>
     <section className="h-screen relative w-full bg-black text-white flex justify-center items-center">
  <div
    className="rounded-2xl w-90/100 h-90/100 relative overflow-hidden group shadow-xs shadow-red-500"
    onMouseEnter={() => setTimelineVisible(true)}
    onMouseLeave={() => setTimelineVisible(false)}
  >
    {/* Vidéo */}
    <div className="video-container relative right-0 bottom-0 w-full h-full overflow-hidden">
      <div id="youtube-player" className="w-full h-full pointer-events-none" />
    </div>

  
    {/* Cursor custom */}
    <div
      ref={cursorRef}
      className="cursor absolute top-5 left-5 uppercase transition-transform duration-100 ease-[cubic-bezier(0.075,0.82,0.165,1)] z-20 pointer-events-none"
    >
      <p>{isPlaying ? "Pause" : "Play"}</p>
    </div>

    {/* Timeline — slide depuis le bas */}
    <div
      ref={timelineRef}
      onClick={handleTimelineClick}
      style={{
        transform: timelineVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="video-timeline absolute bottom-0 w-full h-40 flex flex-col p-4 gap-2 cursor-pointer bg-linear-to-t from-black/90 to-transparent z-10"
    >
      <div
  ref={markerRef}
  className="video-marker absolute bottom-3 left-0 w-0.5 h-38.5 bg-red-500 z-20
    before:absolute before:content-[''] before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-red-500"
  style={{ cursor: "ew-resize" }}
  onMouseDown={(e) => {
    e.stopPropagation(); // empêche le click de la timeline de se déclencher
    isDraggingRef.current = true;

    const onMove = (moveEvent) => {
      if (!isDraggingRef.current || !timelineRef.current || !duration) return;
      const rect    = timelineRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));

      // Déplace le marker visuellement en temps réel
      if (markerRef.current) {
        markerRef.current.style.left = `${percent * 100}%`;
      }

      // Seek en continu pendant le drag
      playerRef.current?.seekTo(percent * duration, true);
    };

    const onUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup",   onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup",   onUp);
  }}
/>
      <div className="video-timestamps relative w-full flex justify-between text-xs">
       {Array.from({ length: 11 }).map((_, i) => {
    const seconds = Math.round((i / 10) * duration);
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return <p key={i}>{`${m}:${s}`}</p>;
  })}
      </div>
      <div className="video-frames h-full w-full flex justify-between gap-4 border-t border-dashed border-white/30 border-b border-b-white/30 px-0 py-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className='frame relative after:content-[""] after:absolute after:inset-0 after:bg-black/50 hover:after:bg-black duration-300 transition'>
            <img src="/medias/Blade_runner.webp" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>

    {/* Click overlay play/pause */}
    <div onClick={toggleVideo} className="absolute inset-0 z-10" />
  </div>
</section>
     <section className="relative h-screen w-screen overflow-hidden flex items-center justify-center">

  {/* Background */}
  <img
    src="/medias/The_Weeknd/weekndposter.webp"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Glass Card */}
  <div className="relative h-120 w-75 rounded-4xl overflow-hidden flex justify-center ">
    <div className="z-999 text-white flex items-center justify-around flex-col">
    <div className="h-60 w-60 rounded-2xl overflow-hidden"><img src={"/medias/The_Weeknd/eras.webp"} className="object-cover h-full w-full"></img></div>
<div><div><h1>After Hours</h1></div>
<div><h2>The Weeknd</h2></div></div>
<div className="flex items-center justify-center relative w-full"><ScrubBarContainer duration={duration2} value={value} onScrub={setValue}>
      <ScrubBarTimeLabel time={value} />
      <ScrubBarTrack className="mx-2">
        <ScrubBarProgress />
        
      </ScrubBarTrack>
      <ScrubBarTimeLabel time={duration} />
    </ScrubBarContainer></div>
<div className="flex justify-around w-full"><Rewind/><Play/><FastForward/></div>
<div className="flex items-center justify-center w-full "><Volume/><div className="relative w-full"><Slider></Slider></div><Volume2/></div>
</div>
    {/* Blur Layer */}
    <div className="absolute inset-0 backdrop-blur-xs bg-white/10" />

   

    {/* Border Gradient */}
    <div className="absolute inset-0 rounded-4xl border border-white/20 shadow-2xl" />
  </div>
</section>
      <section className="gallery h-screen bg-black flex items-center justify-center"></section>
      <section className="footer overflow-hidden relative h-screen bg-black items-center justify-center text-white flex flex-col">
        <h1>The story isn't over.</h1>
        <h2 className={`${druck.className} text-[10rem] text-white absolute -bottom-20`}>
            The Weeknd
          </h2>
      </section>

      <style>{`
        .noise { animation: noiseAnim 0.2s infinite; }
        @keyframes noiseAnim {
          0%  { background-position: 0 0; }
          10% { background-position: 10px -10px; }
          20% { background-position: -10px 10px; }
          30% { background-position: 10px 10px; }
          40% { background-position: -10px -10px; }
          50% { background-position: 0 0; }
        }
          #youtube-player iframe {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
      `}</style>
    </>
  );
}
