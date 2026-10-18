"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import {
  SlideCover,
  SlideMembers,
  SlideAgenda,
  SlideDivider1,
  SlideIntro,
  SlideWhy,
  SlideDivider2,
  SlideStats,
} from "./slides-a";
import {
  SlideChallenges,
  SlideDivider3,
  SlideOverview,
  SlideItinerary,
  SlideCosts,
  SlideConclusion,
  SlideThanks,
} from "./slides-b";

const LABELS = [
  "Bìa",
  "Thành viên",
  "Nội dung",
  "P1 · Mở đầu",
  "Nha Trang",
  "Lý do & Mục tiêu",
  "P2 · Thực trạng",
  "Tiềm năng",
  "Thách thức",
  "P3 · Thiết kế tour",
  "Tổng quan",
  "Lịch trình",
  "Chi phí",
  "Kết luận",
  "Cảm ơn",
];

const SLIDES = [
  SlideCover,
  SlideMembers,
  SlideAgenda,
  SlideDivider1,
  SlideIntro,
  SlideWhy,
  SlideDivider2,
  SlideStats,
  SlideChallenges,
  SlideDivider3,
  SlideOverview,
  SlideItinerary,
  SlideCosts,
  SlideConclusion,
  SlideThanks,
];

export default function Deck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isFs, setIsFs] = useState(false);
  const activeRef = useRef(0);
  const lockRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /* ---------- observe sections (class toggle + active index) ---------- */
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add("is-on");
            const idx = Number(el.dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          } else {
            el.classList.remove("is-on");
          }
        });
      },
      { root, threshold: 0.55 },
    );
    root.querySelectorAll(".deck-slide").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ---------- navigation ---------- */
  const goTo = useCallback((i: number) => {
    const root = containerRef.current;
    if (!root) return;
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, i));
    lockRef.current = true;
    window.setTimeout(() => (lockRef.current = false), 750);
    root.children[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ---------- fullscreen ---------- */
  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const h = () => {
      const on = !!document.fullscreenElement;
      setIsFs(on);
      document.body.classList.toggle("fs-on", on);
    };
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const a = activeRef.current;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(a + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(a - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(SLIDES.length - 1);
      } else if (e.key.toLowerCase() === "f" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        toggleFs();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, toggleFs]);

  /* ---------- parallax ---------- */
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let raf = 0;
    const imgs = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const tick = () => {
      const top = root.scrollTop;
      const vh = root.clientHeight;
      imgs.forEach((img) => {
        const sec = img.closest<HTMLElement>(".deck-slide");
        if (!sec) return;
        const p = Math.max(0, Math.min(1, (top - sec.offsetTop) / vh));
        const speed = Number(img.dataset.parallax) || 0.5;
        img.style.transform = `translateY(${(p - 0.5) * speed * 120}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---------- custom cursor ---------- */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;
    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      const t = e.target as HTMLElement;
      ring.classList.toggle("grow", !!t.closest("[data-cursor],a,button"));
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`;
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    const id = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(id);
      dot.remove();
      ring.remove();
    };
  }, []);

  const progress = SLIDES.length > 1 ? active / (SLIDES.length - 1) : 0;
  const darkSlide = [3, 9, 14].includes(active);

  return (
    <main className="relative bg-[#062a44]" data-fs={isFs}>
      {/* progress bar */}
      <div className="fixed inset-x-0 top-0 z-[80] h-[5px] bg-black/10">
        <div
          className="h-full origin-left bg-gradient-to-r from-[#2ec4b6] to-[#7be3d9] transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* fullscreen button */}
      <button
        onClick={toggleFs}
        aria-label={isFs ? "Thoát toàn màn hình" : "Toàn màn hình (F11)"}
        className={`fixed right-5 top-5 z-[85] flex h-12 w-12 items-center justify-center rounded-full ring-1 backdrop-blur transition-all hover:scale-110 ${
          darkSlide
            ? "bg-white/10 text-white ring-white/25 hover:bg-white/20"
            : "bg-[#0a3d62]/8 text-[#0a3d62] ring-[#0a3d62]/20 hover:bg-[#0a3d62]/15"
        }`}
      >
        {isFs ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>

      {/* dot nav */}
      <nav
        aria-label="Điều hướng slide"
        className="fixed right-5 top-1/2 z-[85] hidden -translate-y-1/2 flex-col items-end gap-2.5 md:flex"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Đến slide ${i + 1}: ${LABELS[i]}`}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`pointer-events-none rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                darkSlide ? "bg-white/15 text-white" : "bg-[#0a3d62]/90 text-white"
              }`}
            >
              {LABELS[i]}
            </span>
            <span
              className={`block rounded-full transition-all duration-400 ${
                i === active
                  ? "h-2.5 w-2.5 bg-[#2ec4b6] shadow-[0_0_0_4px_rgba(46,196,182,0.25)]"
                  : `h-1.5 w-1.5 ${darkSlide ? "bg-white/40 hover:bg-white/80" : "bg-[#0a3d62]/30 hover:bg-[#0a3d62]/70"}`
              }`}
            />
          </button>
        ))}
      </nav>

      {/* counter */}
      <div
        className={`fixed bottom-5 left-[7vw] z-[85] select-none font-extrabold tracking-widest ${
          darkSlide ? "text-white/80" : "text-[#0a3d62]/70"
        }`}
        aria-hidden="true"
      >
        <span className="text-[clamp(1rem,1.6vw,1.5rem)]">
          {String(active + 1).padStart(2, "0")}
        </span>
        <span className="mx-1.5 text-[0.7em] opacity-70">/ {SLIDES.length}</span>
      </div>

      {/* keyboard hint */}
      <div
        className={`fs-hint fixed bottom-5 right-[max(1.25rem,4.5vw)] z-[85] hidden text-[0.75rem] font-semibold uppercase tracking-[0.16em] lg:block ${
          darkSlide ? "text-white/75" : "text-[#56718a]"
        }`}
      >
        ↑ ↓ điều hướng · F / F11 toàn màn hình
      </div>

      {/* grain */}
      <div className="grain" aria-hidden="true" />

      {/* slides */}
      <div ref={containerRef} className="deck-scroll">
        {SLIDES.map((S, i) => (
          <S key={i} />
        ))}
      </div>
    </main>
  );
}
