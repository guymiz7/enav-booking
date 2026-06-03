"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LegalSheet } from "./LegalSheet";
import { SlotPicker } from "./SlotPicker";

export type LeadData = {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  consent: boolean;
};

export function Form({ onSubmit }: { onSubmit: (d: LeadData) => void }) {
  const [data, setData] = useState<LeadData>({
    date: "",
    time: "",
    consent: true,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof LeadData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [legalOpen, setLegalOpen] = useState<"terms" | "privacy" | null>(null);

  const dateOk = data.date.length > 0;
  const timeOk = /^\d{2}:\d{2}$/.test(data.time);

  const formValid = dateOk && timeOk && data.consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ date: true, time: true, consent: true });
    if (!formValid) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(data), 900);
  };

  return (
    <section id="form" className="snap-section-grow bg-navy">
      <div className="flex min-h-[100svh] flex-col px-5 pb-6 pt-16 sm:pt-20">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-[460px] flex-1 flex-col"
        >
          {/* ============== Scheduling headline ============== */}
          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-display font-extralight leading-[1.15] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.75rem, 6.5vw, 2.2rem)" }}
          >
            מתי מתאים לך שנפגש?
          </motion.h2>

          <div className="mt-8">
            <SlotPicker
              date={data.date}
              time={data.time}
              onDateChange={(iso) => {
                setData({ ...data, date: iso, time: "" });
                setTouched((t) => ({ ...t, date: true }));
              }}
              onTimeChange={(hhmm) => {
                setData({ ...data, time: hhmm });
                setTouched((t) => ({ ...t, time: true }));
              }}
              dateError={touched.date && !dateOk ? "בחרו תאריך" : undefined}
              timeError={touched.time && !timeOk ? "בחרו שעה" : undefined}
            />
          </div>

          <label className="mt-10 flex items-start gap-3 text-right text-[12.5px] font-light leading-[1.65] text-white/75">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => {
                setData({ ...data, consent: e.target.checked });
                setTouched((t) => ({ ...t, consent: true }));
              }}
              className="check-box"
            />
            <span>
              {`מאשר/ת קבלת חומר פרסומי ומידע ענב יזום ניהול ש.ר ו/או מכל החברות הקשורות בה לרבות חברות בת ו/או שותפויות מטעמה ו/או כל חברה קשורה אחרת, בדוא"ל ו/או SMS ו/או שיחות שיווק טלפוני וכיוצ"ב גם אם אחד ממספרי הטלפון שלי רשום במאגר "אל תתקשרו אליי" ומסכים/ה ל`}
              <button
                type="button"
                onClick={() => setLegalOpen("terms")}
                className="underline underline-offset-2"
              >
                תקנון
              </button>
              {" ול"}
              <button
                type="button"
                onClick={() => setLegalOpen("privacy")}
                className="underline underline-offset-2"
              >
                מדיניות הפרטיות
              </button>
              {`. ניתן להסרה.`}
              {touched.consent && !data.consent && (
                <span className="ms-2 text-white/45">— נדרש אישור</span>
              )}
            </span>
          </label>

          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.985 }}
            className={cn(
              "mt-10 w-full border py-[18px] text-[17px] font-medium tracking-wide transition",
              formValid && !submitting
                ? "border-white bg-white text-navy"
                : "border-white/15 bg-transparent text-white/45"
            )}
          >
            {submitting ? "כמעט שם..." : "קבענו!"}
          </motion.button>
        </form>
      </div>

      <LegalSheet kind={legalOpen} onClose={() => setLegalOpen(null)} />
    </section>
  );
}
