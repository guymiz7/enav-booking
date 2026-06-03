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

// For each date, derive a single high/medium/low label for the card label.
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
  high: "bg-emerald-500",
  medium: "bg-amber-500",
  low: "bg-red-500",
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

  // keep mode in sync if parent resets date externally
  if (!date && mode === "time") setMode("date");

  return (
    <div className="!mt-4">
      {/* ============ Kitzis-style card ============ */}
      <div className="rounded-2xl bg-[#EDE4CE] p-5 text-navy shadow-[0_18px_42px_-22px_rgba(0,0,0,0.4)]">
        {/* Card header */}
        <div className="flex items-center justify-between gap-3 pb-3">
          <button
            type="button"
            aria-label={mode === "time" ? "חזרה לבחירת תאריך" : "פתוח"}
            onClick={() => mode === "time" && setMode("date")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-navy/60 transition",
              mode === "time" && "hover:bg-navy/[0.05] hover:text-navy"
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
          <h3 className="font-display text-[16px] font-medium tracking-wide text-navy">
            תאריך ושעה
          </h3>
        </div>
        <div className="h-px w-full bg-navy/15" />

        {/* Subheader */}
        <div className="mt-4 mb-4 flex items-baseline justify-between">
          <h4 className="mx-auto font-display text-[15px] font-medium text-navy">
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
                // For odd last item, span both columns and center
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
                      "group flex flex-col items-center gap-0.5 rounded-full border px-3 py-2 text-center transition-all duration-200",
                      isLastOdd && "col-span-2 mx-auto w-[calc(50%-5px)]",
                      active
                        ? "border-navy bg-navy text-[#EDE4CE]"
                        : "border-navy/25 bg-transparent text-navy hover:border-navy/55 hover:bg-navy/[0.04]"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-[14px] font-medium leading-tight tabular",
                        active ? "text-[#EDE4CE]" : "text-navy"
                      )}
                    >
                      {d.isToday ? "היום" : d.isTomorrow ? "מחר" : d.pretty}
                    </span>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-[10.5px] font-light leading-tight",
                        active ? "text-[#EDE4CE]/75" : "text-navy/65"
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
                      "relative flex h-11 items-center justify-center rounded-full border text-[14px] font-medium tabular transition-all duration-200",
                      isTaken &&
                        "cursor-not-allowed border-navy/10 bg-transparent text-navy/25 line-through",
                      !isTaken &&
                        !isSelected &&
                        "border-navy/25 bg-transparent text-navy hover:border-navy/55 hover:bg-navy/[0.04]",
                      isSelected && "border-navy bg-navy text-[#EDE4CE]"
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

        {/* "back to date" hint when in time mode */}
        {mode === "time" && (
          <button
            type="button"
            onClick={() => setMode("date")}
            className="mx-auto mt-5 flex items-center gap-1 text-[12px] font-light text-navy/65 underline underline-offset-2 transition hover:text-navy"
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

      {/* Errors shown below card to keep the card clean */}
      {(dateError || timeError) && (
        <div className="mt-2 text-right text-[12px] font-light text-white/65">
          {dateError ?? timeError}
        </div>
      )}
    </div>
  );
}
