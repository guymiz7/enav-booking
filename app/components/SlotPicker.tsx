"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    out.push({
      iso: `${yyyy}-${mm}-${dd}`,
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
  if (!iso) return new Set();
  const seed = iso.split("-").reduce((a, b) => a + parseInt(b, 10), 0);
  const taken = new Set<string>();
  ALL_SLOTS.forEach((s, idx) => {
    if ((seed + idx * 3) % 5 === 0) taken.add(s);
  });
  return taken;
};

export function SlotPicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
}: {
  date: string;
  time: string;
  onDateChange: (iso: string) => void;
  onTimeChange: (hhmm: string) => void;
  dateError?: string;
  timeError?: string;
}) {
  const days = useMemo(() => generateUpcomingDays(14), []);
  const taken = useMemo(() => takenSlotsFor(date), [date]);

  return (
    <div className="!mt-4">
      {/* ============ Date strip ============ */}
      <div className="mb-2 flex items-baseline justify-between text-[12.5px] font-light">
        <span className="text-white/55">
          תאריך<span className="ms-0.5">*</span>
        </span>
        {dateError && <span className="text-white/55">{dateError}</span>}
      </div>

      <div
        dir="ltr"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {days.map((d) => {
          const active = d.iso === date;
          return (
            <button
              key={d.iso}
              type="button"
              onClick={() => onDateChange(d.iso)}
              className={cn(
                "flex min-w-[74px] flex-col items-center gap-1 border px-3 py-3 transition-all duration-200",
                active
                  ? "border-white bg-white text-navy"
                  : "border-white/22 bg-transparent text-white hover:border-white/55"
              )}
              dir="rtl"
            >
              <span
                className={cn(
                  "text-[10px] font-light uppercase tracking-[0.22em]",
                  active ? "text-navy/65" : "text-white/55"
                )}
              >
                {d.isToday ? "היום" : d.isTomorrow ? "מחר" : d.dayName}
              </span>
              <span
                className={cn(
                  "font-display text-[24px] font-light leading-none tabular",
                  active ? "text-navy" : "text-white"
                )}
              >
                {d.dayNum}
              </span>
              <span
                className={cn(
                  "text-[10px] font-light",
                  active ? "text-navy/60" : "text-white/50"
                )}
              >
                {d.monthName}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============ Time grid ============ */}
      <div className="!mt-6">
        <div className="mb-2 flex items-baseline justify-between text-[12.5px] font-light">
          <span className="text-white/55">
            שעה<span className="ms-0.5">*</span>
          </span>
          {timeError && <span className="text-white/55">{timeError}</span>}
        </div>

        {!date ? (
          <p className="border border-white/15 bg-transparent px-4 py-5 text-center text-[13px] font-light text-white/40">
            בחרו תאריך כדי לראות שעות פנויות
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {ALL_SLOTS.map((slot) => {
                const isTaken = taken.has(slot);
                const isSelected = slot === time;
                return (
                  <motion.button
                    key={`${date}-${slot}`}
                    type="button"
                    disabled={isTaken}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    onClick={() => onTimeChange(slot)}
                    className={cn(
                      "relative flex h-12 items-center justify-center border text-[15px] font-light tabular tracking-wider transition-all duration-200",
                      isTaken &&
                        "cursor-not-allowed border-white/[0.08] bg-transparent text-white/25 line-through",
                      !isTaken &&
                        !isSelected &&
                        "border-white/22 bg-transparent text-white hover:border-white/55",
                      isSelected && "border-white bg-white text-navy"
                    )}
                  >
                    {slot}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
