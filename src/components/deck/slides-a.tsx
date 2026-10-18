"use client";

import Image from "next/image";
import {
  MapPin,
  Waves,
  Sun,
  CheckCircle2,
  Lightbulb,
  Flag,
  type LucideIcon,
} from "lucide-react";
import { IMG, MEMBERS, AGENDA, FACTS, REASONS, GOALS, STATS, MARQUEE } from "@/lib/deck";

/* ---------------- shared bits ---------------- */

export function Chip({
  children,
  tone = "mint",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "mint" | "navy" | "ghost";
  className?: string;
}) {
  const styles =
    tone === "mint"
      ? "bg-[#2ec4b6]/12 text-[#149d92] border border-[#2ec4b6]/40"
      : tone === "navy"
        ? "bg-[#0a3d62]/8 text-[#0a3d62] border border-[#0a3d62]/25"
        : "bg-transparent text-[#2ec4b6] border-2 border-[#2ec4b6]";
  return <span className={`chip-deck ${styles} ${className}`}>{children}</span>;
}

export function Bar({ className = "" }: { className?: string }) {
  return <div className={`bar-accent rv-line bg-[#2ec4b6] ${className}`} aria-hidden="true" />;
}

export function ParallaxImg({
  src,
  alt,
  className = "",
  speed = 0.5,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} data-parallax={speed}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="parallax-img absolute left-0 top-[-10%] h-[120%] w-full object-cover will-change-transform"
      />
    </div>
  );
}

/* ---------------- 01 · Cover ---------------- */

export function SlideCover() {
  return (
    <section className="deck-slide bg-[#f6fbfd]" data-idx={0}>
      <div className="mx-auto grid h-full max-w-[1500px] grid-cols-1 lg:grid-cols-[54%_46%]">
        <div className="relative z-10 flex flex-col justify-center px-[7vw] pb-28 pt-16 lg:pb-20">
          <Chip className="rv w-fit" tone="navy">
            <span className="inline-block h-2 w-2 rounded-full bg-[#2ec4b6]" />
            Bài thuyết trình nhóm
          </Chip>
          <h1
            className="display rv mt-6 text-[clamp(2.5rem,6.2vw,5.6rem)] text-[#0a3d62]"
            style={{ ["--d" as string]: "0.1s" }}
          >
            Tour du lịch
            <br />
            <span className="grad-mint">Nha Trang</span>
          </h1>
          <Bar className="rv mt-7 w-28" />
          <p
            className="rv mt-6 text-[clamp(1rem,1.6vw,1.45rem)] font-medium text-[#56718a]"
            style={{ ["--d" as string]: "0.25s" }}
          >
            Khám phá viên ngọc xanh của biển Đông
          </p>
          <div className="rv mt-6 flex flex-wrap items-center gap-x-4 gap-y-2" style={{ ["--d" as string]: "0.35s" }}>
            <span className="rounded-full bg-[#0a3d62] px-6 py-3 text-[clamp(0.7rem,1vw,0.95rem)] font-bold uppercase tracking-[0.2em] text-white">
              3 ngày 2 đêm
            </span>
            <span className="text-[clamp(0.78rem,1.05vw,1rem)] font-semibold text-[#0a3d62]/70">
              {MEMBERS.join(" · ")}
            </span>
          </div>
        </div>
        <ParallaxImg
          src={IMG.hero}
          alt="Bãi biển Nha Trang nhìn từ trên cao"
          speed={0.55}
          priority
          className="rv-zoom hidden h-full w-full lg:block"
        />
      </div>
      {/* marquee */}
      <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden border-t border-white/10 bg-[#0a3d62] py-3">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="whitespace-nowrap pr-6 text-[clamp(0.7rem,1vw,0.95rem)] font-bold uppercase tracking-[0.3em] text-white/85"
            >
              {MARQUEE.repeat(3)}
            </span>
          ))}
        </div>
      </div>
      {/* scroll hint */}
      <div className="fs-hint absolute bottom-16 right-[7vw] z-20 hidden items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#56718a] lg:flex">
        Cuộn để khám phá
        <span className="inline-block h-8 w-5 rounded-full border-2 border-[#56718a]/50 p-0.5">
          <span className="block h-2 w-1 animate-bounce rounded-full bg-[#2ec4b6]" />
        </span>
      </div>
    </section>
  );
}

/* ---------------- 02 · Members ---------------- */

export function SlideMembers() {
  return (
    <section className="deck-slide bg-white" data-idx={1}>
      <div
        className="ghost-num-light pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 text-[24vw] lg:block"
        aria-hidden="true"
      >
        04
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-[1300px] flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="mint">
          Nhóm thực hiện
        </Chip>
        <h2
          className="display rv mt-5 text-[clamp(2rem,4.8vw,4.2rem)] text-[#0a3d62]"
          style={{ ["--d" as string]: "0.1s" }}
        >
          Thành viên nhóm
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.5rem,4vh,3.5rem)] grid grid-cols-2 gap-[clamp(0.7rem,1.6vw,1.6rem)] lg:grid-cols-4">
          {MEMBERS.map((m, i) => (
            <div
              key={m}
              className="card-hover rv relative flex flex-col items-center rounded-3xl bg-[#f6fbfd] px-4 py-[clamp(1.2rem,3.5vh,2.6rem)] text-center ring-1 ring-[#0a3d62]/10"
              style={{ ["--d" as string]: `${0.15 + i * 0.1}s` }}
              data-cursor
            >
              <span className="absolute right-5 top-4 text-sm font-bold text-[#149d92]">
                0{i + 1}
              </span>
              <span
                className={`flex h-[clamp(4rem,8.5vw,7rem)] w-[clamp(4rem,8.5vw,7rem)] shrink-0 items-center justify-center rounded-full text-[clamp(1.6rem,3.4vw,3rem)] font-extrabold ${
                  i === 1 || i === 2
                    ? "bg-[#2ec4b6] text-white"
                    : "bg-[#0a3d62]/10 text-[#0a3d62]"
                }`}
              >
                {m[0]}
              </span>
              <span className="mt-4 whitespace-nowrap text-[clamp(1rem,1.9vw,1.7rem)] font-extrabold text-[#0a3d62]">
                {m}
              </span>
              <span className="mt-1 text-[clamp(0.6rem,0.9vw,0.85rem)] font-medium text-[#56718a]">
                Thành viên nhóm
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 03 · Agenda ---------------- */

export function SlideAgenda() {
  return (
    <section className="deck-slide bg-[#f6fbfd]" data-idx={2}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1300px] flex-col justify-center px-[7vw]">
        <h2 className="display rv text-[clamp(2rem,4.8vw,4.2rem)] text-[#0a3d62]">
          Nội dung trình bày
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.4rem,3.5vh,3rem)] flex flex-col gap-[clamp(0.55rem,1.4vh,1.1rem)]">
          {AGENDA.map((a, i) => (
            <div
              key={a.n}
              className={`card-hover rv flex items-center gap-[clamp(0.8rem,2vw,1.8rem)] rounded-2xl px-[clamp(1rem,2.4vw,2.2rem)] py-[clamp(0.7rem,1.9vh,1.5rem)] ring-1 ${
                i === 2 ? "bg-[#2ec4b6]/10 ring-[#2ec4b6]/60" : "bg-white ring-[#0a3d62]/10"
              }`}
              style={{ ["--d" as string]: `${0.12 + i * 0.1}s` }}
              data-cursor
            >
              <span className="flex h-[clamp(2.2rem,4.2vw,3.6rem)] w-[clamp(2.2rem,4.2vw,3.6rem)] shrink-0 items-center justify-center rounded-xl bg-[#2ec4b6] text-[clamp(0.95rem,1.6vw,1.5rem)] font-extrabold text-white">
                {a.n}
              </span>
              <div className="min-w-0">
                <p className="display truncate text-[clamp(0.95rem,2.1vw,1.9rem)] text-[#0a3d62]">
                  {a.t}
                </p>
                <p className="mt-0.5 truncate text-[clamp(0.65rem,1vw,0.95rem)] font-medium text-[#56718a]">
                  {a.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 04 · Divider P1 ---------------- */

export function SlideDivider1() {
  return (
    <section className="deck-slide bg-[#0a3d62]" data-idx={3}>
      <div
        className="ghost-num pointer-events-none absolute right-[4vw] top-1/2 -translate-y-1/2 text-[30vw]"
        aria-hidden="true"
      >
        01
      </div>
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-[34rem] w-[34rem] rounded-full border-[3px] border-[#2ec4b6]/25"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="ghost">
          Phần 01 / 04
        </Chip>
        <h2
          className="display rv mt-7 text-[clamp(3rem,9vw,8rem)] text-white"
          style={{ ["--d" as string]: "0.12s" }}
        >
          Mở đầu
        </h2>
        <Bar className="mt-7 w-28" />
        <p
          className="rv mt-6 max-w-xl text-[clamp(0.95rem,1.7vw,1.5rem)] font-medium leading-relaxed text-white/85"
          style={{ ["--d" as string]: "0.25s" }}
        >
          Giới thiệu điểm đến Nha Trang và lý do chọn đề tài
        </p>
      </div>
    </section>
  );
}

/* ---------------- 05 · Intro Nha Trang ---------------- */

const INTRO_ICONS: Record<string, LucideIcon> = { map: MapPin, waves: Waves, sun: Sun };

export function SlideIntro() {
  return (
    <section className="deck-slide bg-white" data-idx={4}>
      <div className="mx-auto grid h-full max-w-[1500px] grid-cols-1 lg:grid-cols-[52%_48%]">
        <div className="relative z-10 flex flex-col justify-center px-[7vw] py-16">
          <Chip className="rv w-fit" tone="mint">
            Giới thiệu
          </Chip>
          <h2
            className="display rv mt-5 text-[clamp(1.8rem,3.8vw,3.4rem)] text-[#0a3d62]"
            style={{ ["--d" as string]: "0.08s" }}
          >
            Nha Trang — <span className="grad-mint">viên ngọc xanh</span> của biển Đông
          </h2>
          <Bar className="mt-6 w-24" />
          <ul className="mt-[clamp(1.2rem,3vh,2.4rem)] flex flex-col gap-[clamp(0.7rem,1.8vh,1.3rem)]">
            {FACTS.map((f, i) => {
              const Ic = INTRO_ICONS[f.icon];
              return (
                <li
                  key={f.icon}
                  className="rv flex items-start gap-4"
                  style={{ ["--d" as string]: `${0.18 + i * 0.1}s` }}
                >
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2ec4b6]/15 text-[#149d92]">
                    <Ic className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <p className="text-[clamp(0.88rem,1.45vw,1.3rem)] font-semibold leading-snug text-[#0a3d62]">
                    {f.t}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="rv mt-7" style={{ ["--d" as string]: "0.5s" }}>
            <Chip tone="navy">Biển xanh · Cát trắng · Nắng vàng</Chip>
          </div>
        </div>
        <ParallaxImg
          src={IMG.panorama}
          alt="Toàn cảnh thành phố biển Nha Trang"
          speed={0.45}
          className="rv-zoom hidden lg:block"
        />
      </div>
    </section>
  );
}

/* ---------------- 06 · Reason & Goals ---------------- */

export function SlideWhy() {
  return (
    <section className="deck-slide bg-[#f6fbfd]" data-idx={5}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-[7vw]">
        <h2 className="display rv text-[clamp(1.8rem,4.2vw,3.8rem)] text-[#0a3d62]">
          Lý do chọn đề tài &amp; mục tiêu
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.3rem,3.2vh,2.6rem)] grid grid-cols-1 gap-[clamp(0.8rem,1.8vw,1.6rem)] lg:grid-cols-2">
          <div
            className="card-hover rv rounded-3xl bg-white p-[clamp(1.2rem,2.6vw,2.4rem)] ring-1 ring-[#0a3d62]/10"
            style={{ ["--d" as string]: "0.12s" }}
            data-cursor
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2ec4b6]/15 text-[#149d92]">
                <Lightbulb className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <Chip tone="mint">Lý do chọn đề tài</Chip>
            </div>
            <ul className="mt-[clamp(0.8rem,2vh,1.6rem)] flex flex-col gap-[clamp(0.55rem,1.5vh,1.1rem)]">
              {REASONS.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#149d92]" strokeWidth={2.2} />
                  <p className="text-[clamp(0.85rem,1.35vw,1.25rem)] font-semibold leading-snug text-[#0a3d62]">
                    {r}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="card-hover rv rounded-3xl bg-[#0a3d62] p-[clamp(1.2rem,2.6vw,2.4rem)]"
            style={{ ["--d" as string]: "0.22s" }}
            data-cursor
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2ec4b6]/25 text-[#2ec4b6]">
                <Flag className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <Chip tone="ghost">Mục tiêu</Chip>
            </div>
            <ul className="mt-[clamp(0.8rem,2vh,1.6rem)] flex flex-col gap-[clamp(0.55rem,1.5vh,1.1rem)]">
              {GOALS.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#2ec4b6]" strokeWidth={2.2} />
                  <p className="text-[clamp(0.85rem,1.35vw,1.25rem)] font-semibold leading-snug text-white">
                    {g}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 07 · Divider P2 ---------------- */

export function SlideDivider2() {
  return (
    <section className="deck-slide bg-[#eef6fa]" data-idx={6}>
      <div
        className="ghost-num-light pointer-events-none absolute right-[2vw] top-1/2 -translate-y-1/2 text-[26vw]"
        aria-hidden="true"
      >
        02
      </div>
      <div className="relative z-10 flex h-full flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="mint">
          Phần 02 / 04
        </Chip>
        <h2
          className="display rv mt-7 max-w-[70%] text-[clamp(2.2rem,6vw,5.5rem)] text-[#0a3d62] lg:max-w-[60%]"
          style={{ ["--d" as string]: "0.12s" }}
        >
          Thực trạng du lịch Nha Trang
        </h2>
        <Bar className="mt-7 w-28" />
        <p
          className="rv mt-6 max-w-xl text-[clamp(0.95rem,1.7vw,1.5rem)] font-medium text-[#56718a]"
          style={{ ["--d" as string]: "0.25s" }}
        >
          Tiềm năng nổi bật và những thách thức hiện nay
        </p>
      </div>
    </section>
  );
}

/* ---------------- 08 · Stats ---------------- */

export function SlideStats() {
  return (
    <section className="deck-slide bg-white" data-idx={7}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="mint">
          Tiềm năng
        </Chip>
        <h2
          className="display rv mt-5 text-[clamp(1.8rem,4.2vw,3.8rem)] text-[#0a3d62]"
          style={{ ["--d" as string]: "0.08s" }}
        >
          Điểm đến hút khách bậc nhất Việt Nam
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.4rem,3.4vh,2.8rem)] grid grid-cols-1 gap-[clamp(0.8rem,1.8vw,1.6rem)] md:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.v}
              className={`card-hover rv flex flex-col items-center justify-center rounded-3xl px-6 py-[clamp(1.4rem,4vh,3rem)] text-center ${
                s.hot
                  ? "bg-[#2ec4b6]/10 ring-2 ring-[#2ec4b6]/60"
                  : "bg-[#f6fbfd] ring-1 ring-[#0a3d62]/10"
              }`}
              style={{ ["--d" as string]: `${0.15 + i * 0.12}s` }}
              data-cursor
            >
              <p
                className={`display text-[clamp(2rem,4.6vw,4rem)] ${
                  s.hot ? "text-[#149d92]" : "text-[#0a3d62]"
                }`}
              >
                {s.v}
              </p>
              <p className="mt-3 max-w-[16rem] text-[clamp(0.78rem,1.15vw,1.05rem)] font-semibold leading-snug text-[#56718a]">
                {s.l}
              </p>
            </div>
          ))}
        </div>
        <p
          className="rv mt-[clamp(0.8rem,2vh,1.6rem)] text-[clamp(0.62rem,0.95vw,0.85rem)] font-medium text-[#56718a]/80"
          style={{ ["--d" as string]: "0.45s" }}
        >
          Nguồn: Hệ thống thống kê du lịch Việt Nam — 2025
        </p>
      </div>
    </section>
  );
}
