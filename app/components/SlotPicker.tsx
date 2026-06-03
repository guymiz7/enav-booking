"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEBREW_DAYS = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"] as const;

type DateOption = {
  iso: string;
  pretty: string; // e.g. "א' 7.06"
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
      pretty: `${HEBREW_DAYS[d.getDay()]} ${d.getDate()}.${mm}`,
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

// Deterministic per-date "taken" slots so the UI feels real.
const takenSlotsFor = (iso: string): Set<string> => {
  if (!iso) return new Set();
  const seed = iso.split("-").reduce((a, b) => a + parseInt(b, 10), 0);
  const out = new Set<string>();
  ALL_SLOTS.forEach((s, idx) => {
    if ((seed + idx * 3) % 5 === 0) out.add(s);
  });
  return out;
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
    <div>
      {/* ============ Date ============ */}
      <div className="!mt-3">
        <div className="mb-2 flex items-baseline justify-between text-[12.5px] font-light">
          <span className="text-white/70">
            תאריך<span className="ms-0.5">*</span>
          </span>
          {dateError && <span className="text-white/65">{dateError}</span>}
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {days.map((d) => {
            const active = d.iso === date;
            return (
              <button
                key={d.iso}
                type="button"
                onClick={() => onDateChange(d.iso)}
                className={cn(
                  "flex h-12 items-center justify-center rounded-full border text-center font-display text-[15px] font-medium tabular tracking-wide transition-all duration-200",
                  active
                    ? "border-white bg-white text-navy shadow-[0_4px_18px_-6px_rgba(255,255,255,0.4)]"
                    : "border-white/40 bg-white/[0.03] text-white hover:border-white hover:bg-white/[0.07]"
                )}
              >
                {d.isToday ? "היום" : d.isTomorrow ? "מחר" : d.pretty}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ Time ============ */}
      <div className="!mt-7">
        <div className="mb-2 flex items-baseline justify-between text-[12.5px] font-light">
          <span className="text-white/70">
            שעה<span className="ms-0.5">*</span>
          </span>
          {timeError && <span className="text-white/65">{timeError}</span>}
        </div>

        {!date ? (
          <p className="rounded-full border border-white/20 bg-white/[0.02] px-4 py-3.5 text-center text-[13px] font-light text-white/45">
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
                    transition={{ duration: 0.25, ease: EASE }}
                    onClick={() => onTimeChange(slot)}
                    className={cn(
                      "flex h-12 items-center justify-center rounded-full border text-[15px] font-medium tabular tracking-wider transition-all duration-200",
                      isTaken &&
                        "cursor-not-allowed border-white/[0.1] bg-transparent text-white/25 line-through",
                      !isTaken &&
                        !isSelected &&
                        "border-white/40 bg-white/[0.03] text-white hover:border-white hover:bg-white/[0.07]",
                      isSelected &&
                        "border-white bg-white text-navy shadow-[0_4px_18px_-6px_rgba(255,255,255,0.4)]"
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
