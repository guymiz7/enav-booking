"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEBREW_DAYS = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"] as const;
const HEBREW_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
] as const;

type DateOption = {
  iso: string;
  dayName: string;
  dayNum: number;
  monthName: string;
  isToday: boolean;
  isTomorrow: boolean;
};

const generateUpcomingDays = (count: number): DateOption[] => {
  const out: DateOption[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    // skip Saturdays — typical for IL sales tours
    if (d.getDay() === 6) continue;
    out.push({
      iso: d.toISOString().slice(0, 10),
      dayName: HEBREW_DAYS[d.getDay()],
      dayNum: d.getDate(),
      monthName: HEBREW_MONTHS[d.getMonth()],
      isToday: i === 0,
      isTomorrow: i === 1,
    });
  }
  return out;
};

const ALL_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

// Pseudo-availability: deterministic per date so the UI feels real.
const takenSlotsFor = (iso: string): Set<string> => {
  const seed = iso.split("-").reduce((a, b) => a + parseInt(b, 10), 0);
  const taken = new Set<string>();
  ALL_SLOTS.forEach((s, idx) => {
    if ((seed + idx * 3) % 5 === 0) taken.add(s);
  });
  return taken;
};

export function Booking() {
  const days = useMemo(() => generateUpcomingDays(14), []);
  const [selectedDate, setSelectedDate] = useState<string>(days[0]?.iso ?? "");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const taken = useMemo(() => takenSlotsFor(selectedDate), [selectedDate]);
  const remaining = ALL_SLOTS.length - taken.size;

  const selectedDayInfo = days.find((d) => d.iso === selectedDate);
  const canConfirm = Boolean(selectedDate && selectedTime);

  return (
    <main className="relative min-h-[100svh] w-full bg-navy">
      {/* ========== Header ========== */}
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-navy/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[640px] items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-[13px] font-light text-white/70 transition-colors hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            חזרה
          </Link>
          <div className="flex items-center gap-2">
            <img
              src={asset("/media/logo.png")}
              alt="ENAV"
              className="h-7 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-[10px] font-light tracking-[0.32em] text-white/70">
              360 · כפר סבא
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[640px] px-5 pb-32 pt-8">
        {/* ========== Title ========== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
              סיור בלעדי בשטח
            </span>
          </div>
          <h1 className="font-display text-[clamp(2rem,8vw,2.6rem)] font-extralight leading-[1.05] tracking-[-0.025em] text-white">
            בחירת תור לסיור
            <span className="text-gold">.</span>
          </h1>
          <p className="mt-3 text-[15px] font-light leading-[1.55] text-white/70">
            בחרו יום ושעה שמתאימים לכם. הסיור אורך כ-45 דקות וכולל מפגש אישי עם
            יועץ המכר.
          </p>
        </motion.div>

        {/* ========== Date strip ========== */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="mt-10"
        >
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-[12px] font-medium uppercase tracking-[0.28em] text-white/55">
              בחרו תאריך
            </h2>
            <span className="text-[11px] font-light text-white/40">
              {days.length} ימים זמינים
            </span>
          </div>

          <div
            dir="ltr"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {days.map((d) => {
              const active = d.iso === selectedDate;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => {
                    setSelectedDate(d.iso);
                    setSelectedTime(null);
                  }}
                  className={cn(
                    "group relative flex min-w-[78px] flex-col items-center gap-1 rounded-2xl border px-3 py-3 transition-all duration-200",
                    active
                      ? "border-gold bg-gold text-navy shadow-[0_8px_24px_-8px_rgba(201,169,97,0.5)]"
                      : "border-white/12 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.06]"
                  )}
                  dir="rtl"
                >
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.22em]",
                      active ? "text-navy/70" : "text-white/55"
                    )}
                  >
                    {d.isToday ? "היום" : d.isTomorrow ? "מחר" : d.dayName}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[26px] font-light leading-none tabular",
                      active ? "text-navy" : "text-white"
                    )}
                  >
                    {d.dayNum}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-light",
                      active ? "text-navy/70" : "text-white/50"
                    )}
                  >
                    {d.monthName}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* ========== Time slots ========== */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="mt-10"
        >
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-[12px] font-medium uppercase tracking-[0.28em] text-white/55">
              בחרו שעה
            </h2>
            <span className="text-[11px] font-light text-gold">
              {remaining} תורים פנויים
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {ALL_SLOTS.map((slot) => {
                const isTaken = taken.has(slot);
                const isSelected = slot === selectedTime;
                return (
                  <motion.button
                    key={`${selectedDate}-${slot}`}
                    type="button"
                    disabled={isTaken}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "relative flex h-14 items-center justify-center rounded-xl border text-[15px] font-light tabular tracking-wider transition-all duration-200",
                      isTaken &&
                        "cursor-not-allowed border-white/[0.06] bg-white/[0.02] text-white/25 line-through",
                      !isTaken &&
                        !isSelected &&
                        "border-white/15 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]",
                      isSelected &&
                        "border-gold bg-gold text-navy shadow-[0_8px_24px_-8px_rgba(201,169,97,0.5)]"
                    )}
                  >
                    {slot}
                    {isTaken && (
                      <span className="absolute -top-1.5 right-2 rounded-full bg-navy px-1.5 text-[8px] font-medium uppercase tracking-wider text-white/40">
                        תפוס
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {remaining <= 4 && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] font-light text-gold/90">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ביום הזה נותרו תורים בודדים בלבד
            </p>
          )}
        </motion.section>
      </div>

      {/* ========== Sticky confirm bar ========== */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] bg-navy/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[640px] items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
              התור שלכם
            </p>
            <p className="mt-0.5 truncate text-[14px] font-light text-white">
              {selectedDayInfo && selectedTime ? (
                <>
                  יום {selectedDayInfo.dayName} ·{" "}
                  <span className="font-medium">{selectedDayInfo.dayNum}</span>{" "}
                  ב{selectedDayInfo.monthName} ·{" "}
                  <span className="tabular text-gold">{selectedTime}</span>
                </>
              ) : (
                <span className="text-white/40">
                  בחרו תאריך ושעה להמשך
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            disabled={!canConfirm}
            className={cn(
              "shrink-0 rounded-full px-6 py-3 text-[14px] font-medium transition-all duration-300",
              canConfirm
                ? "bg-gold text-navy shadow-[0_8px_24px_-8px_rgba(201,169,97,0.6)] hover:brightness-110"
                : "cursor-not-allowed bg-white/[0.06] text-white/30"
            )}
          >
            המשך לפרטים
          </button>
        </div>
      </div>
    </main>
  );
}
