"use client";

import Image from "next/image";
import {
  Users,
  Shuffle,
  CreditCard,
  LayoutGrid,
  Clock,
  Bus,
  UsersRound,
  Umbrella,
  ChevronRight,
  Hotel,
  UtensilsCrossed,
  Ticket,
  PiggyBank,
  Building2,
  Route,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { CHALLENGES, OVERVIEW, DAYS, COSTS, CONCLUSIONS, MEMBERS } from "@/lib/deck";
import { Chip, Bar } from "./slides-a";

const CH_ICONS: Record<string, LucideIcon> = {
  users: Users,
  shuffle: Shuffle,
  card: CreditCard,
  grid: LayoutGrid,
};

/* ---------------- 09 · Challenges ---------------- */

export function SlideChallenges() {
  return (
    <section className="deck-slide bg-[#f6fbfd]" data-idx={8}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="navy">
          Thách thức
        </Chip>
        <h2
          className="display rv mt-5 text-[clamp(1.8rem,4.2vw,3.8rem)] text-[#0a3d62]"
          style={{ ["--d" as string]: "0.08s" }}
        >
          Vấn đề cần lưu ý
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.2rem,3vh,2.6rem)] grid grid-cols-1 gap-[clamp(0.7rem,1.6vw,1.5rem)] sm:grid-cols-2">
          {CHALLENGES.map((c, i) => {
            const Ic = CH_ICONS[c.icon];
            return (
              <div
                key={c.t}
                className="card-hover rv flex items-center gap-[clamp(0.8rem,1.8vw,1.5rem)] rounded-2xl bg-white p-[clamp(1rem,2.2vw,1.9rem)] ring-1 ring-[#0a3d62]/10"
                style={{ ["--d" as string]: `${0.14 + i * 0.1}s` }}
                data-cursor
              >
                <span className="flex h-[clamp(2.8rem,5vw,4.2rem)] w-[clamp(2.8rem,5vw,4.2rem)] shrink-0 items-center justify-center rounded-full bg-[#0a3d62]/10 text-[#0a3d62]">
                  <Ic className="h-[45%] w-[45%]" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="display text-[clamp(0.95rem,1.9vw,1.6rem)] text-[#0a3d62]">{c.t}</p>
                  <p className="mt-1 text-[clamp(0.68rem,1.05vw,1rem)] font-medium text-[#56718a]">
                    {c.d}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 10 · Divider P3 ---------------- */

export function SlideDivider3() {
  return (
    <section className="deck-slide bg-[#0a3d62]" data-idx={9}>
      <div
        className="ghost-num pointer-events-none absolute right-[4vw] top-1/2 -translate-y-1/2 text-[30vw]"
        aria-hidden="true"
      >
        03
      </div>
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[26rem] w-[26rem] rounded-full border-[3px] border-[#2ec4b6]/20"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="ghost">
          Phần 03 / 04
        </Chip>
        <h2
          className="display rv mt-7 text-[clamp(3rem,9vw,8rem)] text-white"
          style={{ ["--d" as string]: "0.12s" }}
        >
          Thiết kế tour
        </h2>
        <p
          className="display rv mt-3 text-[clamp(1.4rem,3.4vw,3rem)] text-[#2ec4b6]"
          style={{ ["--d" as string]: "0.2s" }}
        >
          3 ngày 2 đêm
        </p>
        <Bar className="mt-7 w-28" />
        <p
          className="rv mt-6 text-[clamp(0.95rem,1.7vw,1.5rem)] font-medium text-white/85"
          style={{ ["--d" as string]: "0.3s" }}
        >
          Lịch trình — Điểm đến — Chi phí
        </p>
      </div>
    </section>
  );
}

/* ---------------- 11 · Tour overview ---------------- */

const OV_ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  bus: Bus,
  team: UsersRound,
  umbrella: Umbrella,
};

export function SlideOverview() {
  return (
    <section className="deck-slide bg-white" data-idx={10}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="mint">
          Tổng quan
        </Chip>
        <h2
          className="display rv mt-5 text-[clamp(1.8rem,4.2vw,3.8rem)] text-[#0a3d62]"
          style={{ ["--d" as string]: "0.08s" }}
        >
          Thông tin tour
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.2rem,3vh,2.6rem)] grid grid-cols-1 gap-[clamp(0.7rem,1.6vw,1.5rem)] sm:grid-cols-2">
          {OVERVIEW.map((o, i) => {
            const Ic = OV_ICONS[o.icon];
            return (
              <div
                key={o.l}
                className="card-hover rv flex items-center gap-[clamp(0.9rem,1.8vw,1.5rem)] rounded-2xl bg-[#f6fbfd] p-[clamp(1rem,2.2vw,1.9rem)] ring-1 ring-[#0a3d62]/10"
                style={{ ["--d" as string]: `${0.14 + i * 0.1}s` }}
                data-cursor
              >
                <span className="flex h-[clamp(2.8rem,5vw,4.2rem)] w-[clamp(2.8rem,5vw,4.2rem)] shrink-0 items-center justify-center rounded-full bg-[#2ec4b6]/15 text-[#149d92]">
                  <Ic className="h-[45%] w-[45%]" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[clamp(0.62rem,0.95vw,0.85rem)] font-bold uppercase tracking-[0.16em] text-[#56718a]">
                    {o.l}
                  </p>
                  <p className="display mt-1 truncate text-[clamp(1rem,2vw,1.7rem)] text-[#0a3d62]">
                    {o.v}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 12 · Itinerary ---------------- */

export function SlideItinerary() {
  return (
    <section className="deck-slide bg-[#f6fbfd]" data-idx={11}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="mint">
          Lịch trình
        </Chip>
        <h2
          className="display rv mt-5 text-[clamp(1.8rem,4.2vw,3.8rem)] text-[#0a3d62]"
          style={{ ["--d" as string]: "0.08s" }}
        >
          Hành trình 3 ngày 2 đêm
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(0.7rem,2.6vh,2.2rem)] grid grid-cols-1 gap-[clamp(0.55rem,1.6vw,1.5rem)] md:grid-cols-3">
          {DAYS.map((d, i) => (
            <div
              key={d.tag}
              className="card-hover rv overflow-hidden rounded-2xl bg-white ring-1 ring-[#0a3d62]/10 md:rounded-3xl"
              style={{ ["--d" as string]: `${0.14 + i * 0.12}s` }}
              data-cursor
            >
              <div className="relative h-16 w-full overflow-hidden md:h-[clamp(6rem,14vh,9rem)]">
                <Image
                  src={d.img}
                  alt={d.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-[clamp(0.6rem,1.8vw,1.5rem)] md:p-[clamp(0.9rem,1.8vw,1.5rem)]">
                <Chip tone="navy">{d.tag}</Chip>
                <p className="display mt-2 text-[clamp(0.9rem,1.8vw,1.5rem)] text-[#0a3d62] md:mt-3">
                  {d.t}
                </p>
                <ul className="mt-1 flex flex-col gap-1 md:mt-[clamp(0.4rem,1.2vh,0.9rem)]">
                  {d.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-1.5 text-[clamp(0.62rem,1.05vw,0.98rem)] font-semibold leading-snug text-[#0a3d62]/90"
                    >
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#149d92] md:h-4 md:w-4" strokeWidth={2.6} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 13 · Costs ---------------- */

const COST_ICONS: Record<string, LucideIcon> = {
  bus: Bus,
  hotel: Hotel,
  food: UtensilsCrossed,
  ticket: Ticket,
  save: PiggyBank,
};

export function SlideCosts() {
  return (
    <section className="deck-slide bg-white" data-idx={12}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="mint">
          Chi phí
        </Chip>
        <h2
          className="display rv mt-5 text-[clamp(1.8rem,4.2vw,3.8rem)] text-[#0a3d62]"
          style={{ ["--d" as string]: "0.08s" }}
        >
          Chi phí dự trù / 1 người
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.2rem,3vh,2.4rem)] grid grid-cols-1 items-center gap-[clamp(0.9rem,2vw,1.8rem)] lg:grid-cols-[58%_42%]">
          <div className="flex flex-col gap-[clamp(0.5rem,1.3vh,1rem)]">
            {COSTS.map((c, i) => {
              const Ic = COST_ICONS[c.icon];
              return (
                <div
                  key={c.t}
                  className="rv flex items-center gap-4 rounded-2xl bg-[#f6fbfd] px-[clamp(1rem,2vw,1.6rem)] py-[clamp(0.55rem,1.4vh,1rem)] ring-1 ring-[#0a3d62]/10"
                  style={{ ["--d" as string]: `${0.12 + i * 0.08}s` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a3d62]/10 text-[#0a3d62]">
                    <Ic className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <p className="flex-1 text-[clamp(0.85rem,1.4vw,1.3rem)] font-bold text-[#0a3d62]">
                    {c.t}
                  </p>
                  <p className="display text-[clamp(1rem,1.9vw,1.6rem)] text-[#0a3d62]">{c.v}</p>
                </div>
              );
            })}
          </div>
          <div
            className="rv card-hover flex flex-col items-center justify-center rounded-3xl bg-[#0a3d62] px-6 py-[clamp(1.6rem,4.5vh,3.2rem)] text-center"
            style={{ ["--d" as string]: "0.4s" }}
            data-cursor
          >
            <p className="text-[clamp(0.65rem,1vw,0.9rem)] font-bold uppercase tracking-[0.22em] text-white/70">
              Tổng chi phí dự kiến
            </p>
            <p className="display grad-mint mt-3 text-[clamp(2.2rem,5vw,4.2rem)]">2.500.000đ</p>
            <div className="bar-accent mt-4 h-1.5 w-14 bg-[#2ec4b6]" />
            <p className="mt-4 max-w-[18rem] text-[clamp(0.7rem,1.05vw,1rem)] font-medium text-white/75">
              Mức phí phù hợp nhóm học sinh — sinh viên
            </p>
          </div>
        </div>
        <p
          className="rv mt-[clamp(0.6rem,1.6vh,1.2rem)] text-[clamp(0.62rem,0.95vw,0.85rem)] font-medium text-[#56718a]/80"
          style={{ ["--d" as string]: "0.5s" }}
        >
          Số liệu là dự toán tham khảo của nhóm
        </p>
      </div>
    </section>
  );
}

/* ---------------- 14 · Conclusion ---------------- */

const CON_ICONS: Record<string, LucideIcon> = {
  city: Building2,
  route: Route,
  heart: HeartHandshake,
};

export function SlideConclusion() {
  return (
    <section className="deck-slide bg-[#f6fbfd]" data-idx={13}>
      <div className="relative z-10 mx-auto flex h-full max-w-[1300px] flex-col justify-center px-[7vw]">
        <Chip className="rv w-fit" tone="mint">
          Phần 04 / 04 — Kết luận
        </Chip>
        <h2
          className="display rv mt-5 text-[clamp(1.8rem,4.2vw,3.8rem)] text-[#0a3d62]"
          style={{ ["--d" as string]: "0.08s" }}
        >
          Những điều rút ra
        </h2>
        <Bar className="mt-6 w-24" />
        <div className="mt-[clamp(1.2rem,3vh,2.4rem)] flex flex-col gap-[clamp(0.6rem,1.6vh,1.2rem)]">
          {CONCLUSIONS.map((c, i) => {
            const Ic = CON_ICONS[c.icon];
            return (
              <div
                key={c.icon}
                className={`card-hover rv flex items-center gap-[clamp(0.9rem,2vw,1.6rem)] rounded-2xl px-[clamp(1.1rem,2.4vw,2rem)] py-[clamp(0.8rem,2vh,1.6rem)] ${
                  c.hot
                    ? "bg-[#2ec4b6]/12 ring-2 ring-[#2ec4b6]/60"
                    : "bg-white ring-1 ring-[#0a3d62]/10"
                }`}
                style={{ ["--d" as string]: `${0.14 + i * 0.12}s` }}
                data-cursor
              >
                <span className="flex h-[clamp(2.6rem,4.6vw,3.8rem)] w-[clamp(2.6rem,4.6vw,3.8rem)] shrink-0 items-center justify-center rounded-full bg-[#2ec4b6] text-white">
                  <Ic className="h-[46%] w-[46%]" strokeWidth={2.1} />
                </span>
                <p className="text-[clamp(0.88rem,1.5vw,1.4rem)] font-bold leading-snug text-[#0a3d62]">
                  {c.t}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 15 · Thanks ---------------- */

export function SlideThanks() {
  return (
    <section className="deck-slide bg-[#0a3d62]" data-idx={14}>
      <div
        className="pointer-events-none absolute -top-44 -right-36 h-[30rem] w-[30rem] rounded-full bg-[#2ec4b6]/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-[#2ec4b6]/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-28 left-[22%] h-24 w-24 rounded-full border-[3px] border-[#2ec4b6]/30"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[7vw] text-center">
        <Chip className="rv w-fit" tone="ghost">
          Q &amp; A
        </Chip>
        <h2
          className="display rv mt-8 text-[clamp(2.4rem,6.8vw,6.4rem)] text-white"
          style={{ ["--d" as string]: "0.12s" }}
        >
          Cảm ơn thầy cô
          <br />
          và các bạn!
        </h2>
        <div className="bar-accent rv-line mt-8 w-28 bg-[#2ec4b6]" />
        <p
          className="rv mt-7 text-[clamp(0.95rem,1.7vw,1.5rem)] font-medium text-white/85"
          style={{ ["--d" as string]: "0.28s" }}
        >
          Rất mong nhận được câu hỏi và góp ý
        </p>
        <p
          className="rv mt-10 text-[clamp(0.72rem,1.05vw,1rem)] font-semibold tracking-wide text-white/70"
          style={{ ["--d" as string]: "0.4s" }}
        >
          Nhóm thực hiện: {MEMBERS.join(" · ")}
        </p>
      </div>
    </section>
  );
}
