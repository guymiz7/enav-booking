"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEBREW_DAYS = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"] as const;

type DateOption = {
  iso: string;
  dayName: string;
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
      dayName: HEBREW_DAYS[d.getDay()],
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

// Pseudo-availability: deterministic per date so the UI feels real.
type Availability = "high" | "medium" | "low" | "taken";

const availabilityFor = (iso: string, slotIdx: number): Availability => {
  if (!iso) return "high";
  const seed = iso.split("-").reduce((a, b) => a + parseInt(b, 10), 0);
  const m = (seed + slotIdx * 3) % 5;
  if (m === 0) return "taken";
  if (m === 1) return "low";
  if (m === 2) return "medium";
  return "high";
};

const dayAvailability = (iso: string): Exclude<Availability, "taken"> => {
  const seed = iso.split("-").reduce((a, b) => a + parseInt(b, 10), 0);
  const m = seed % 6;
  if (m === 0) return "low";
  if (m === 1 || m === 2) return "medium";
  return "high";
};

const AVAILABILITY_LABEL: Record<Exclude<Availability, "taken">, string> = {
  high: "זמינות גבוהה",
  medium: "זמינות בינונית",
  low: "מקומות אחרונים",
};

const AVAILABILITY_DOT: Record<Exclude<Availability, "taken">, string> = {
  high: "bg-emerald-400",
  medium: "bg-amber-400",
  low: "bg-red-400",
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
  const selectedDay = days.find((d) => d.iso === date);
  const [mode, setMode] = useState<"date" | "time">(date ? "time" : "date");

  if (!date && mode === "time") setMode("date");

  return (
    <div className="!mt-4">
      {/* ============ Card — uses page palette (navy/white) ============ */}
      <div className="rounded-2xl border border-white/12 bg-white/[0.035] p-5 backdrop-blur-sm">
        {/* Card header */}
        <div className="flex items-center justify-between gap-3 pb-3">
          <button
            type="button"
            aria-label={mode === "time" ? "חזרה לבחירת תאריך" : "פתוח"}
            onClick={() => mode === "time" && setMode("date")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-white/55 transition",
              mode === "time" && "hover:bg-white/[0.06] hover:text-white"
            )}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              className={mode === "time" ? "rotate-90" : ""}
            >
              <path
                d="M2 4 L6 8 L10 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h3 className="font-display text-[16px] font-light tracking-wide text-white">
            תאריך ושעה
          </h3>
        </div>
        <div className="h-px w-full bg-white/12" />

        {/* Subheader */}
        <div className="mt-4 mb-4 text-center">
          <h4 className="font-display text-[14px] font-light text-white/85">
            {mode === "date"
              ? "בחרו תאריך"
              : `בחרו שעה · ${selectedDay?.pretty ?? ""}`}
          </h4>
        </div>

        {/* ===== Date grid ===== */}
        <AnimatePresence mode="wait">
          {mode === "date" && (
            <motion.div
              key="dates"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="grid grid-cols-2 gap-2.5"
            >
              {days.map((d, i) => {
                const active = d.iso === date;
                const avail = dayAvailability(d.iso);
                const isLastOdd = i === days.length - 1 && days.length % 2 === 1;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => {
                      onDateChange(d.iso);
                      setMode("time");
                    }}
                    className={cn(
                      "flex flex-col items-center gap-0.5 rounded-full border px-3 py-2 text-center transition-all duration-200",
                      isLastOdd && "col-span-2 mx-auto w-[calc(50%-5px)]",
                      active
                        ? "border-white bg-white text-navy"
                        : "border-white/22 bg-transparent text-white hover:border-white/55 hover:bg-white/[0.04]"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-[14px] font-light leading-tight tabular",
                        active ? "text-navy" : "text-white"
                      )}
                    >
                      {d.isToday ? "היום" : d.isTomorrow ? "מחר" : d.pretty}
                    </span>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-[10.5px] font-light leading-tight",
                        active ? "text-navy/65" : "text-white/55"
                      )}
                    >
                      {AVAILABILITY_LABEL[avail]}
                      <span
                        className={cn(
                          "inline-block h-1.5 w-1.5 rounded-full",
                          AVAILABILITY_DOT[avail]
                        )}
                      />
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* ===== Time grid ===== */}
          {mode === "time" && date && (
            <motion.div
              key="times"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="grid grid-cols-3 gap-2"
            >
              {ALL_SLOTS.map((slot, idx) => {
                const avail = availabilityFor(date, idx);
                const isTaken = avail === "taken";
                const isSelected = slot === time;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isTaken}
                    onClick={() => onTimeChange(slot)}
                    className={cn(
                      "relative flex h-11 items-center justify-center rounded-full border text-[14px] font-light tabular transition-all duration-200",
                      isTaken &&
                        "cursor-not-allowed border-white/[0.08] bg-transparent text-white/25 line-through",
                      !isTaken &&
                        !isSelected &&
                        "border-white/22 bg-transparent text-white hover:border-white/55 hover:bg-white/[0.04]",
                      isSelected && "border-white bg-white text-navy"
                    )}
                  >
                    {slot}
                    {!isTaken && !isSelected && (
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-1/2 inline-block h-1 w-1 -translate-x-1/2 rounded-full",
                          AVAILABILITY_DOT[avail as Exclude<Availability, "taken">]
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* back to date hint */}
        {mode === "time" && (
          <button
            type="button"
            onClick={() => setMode("date")}
            className="mx-auto mt-5 flex items-center gap-1 text-[12px] font-light text-white/55 underline underline-offset-2 transition hover:text-white"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M4 2 L8 6 L4 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            חזרה לבחירת תאריך
          </button>
        )}
      </div>

      {(dateError || timeError) && (
        <div className="mt-2 text-right text-[12px] font-light text-white/65">
          {dateError ?? timeError}
        </div>
      )}
    </div>
  );
}
