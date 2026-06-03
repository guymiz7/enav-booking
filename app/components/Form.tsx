"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LegalSheet } from "./LegalSheet";
import { SlotPicker } from "./SlotPicker";

export type LeadData = {
  name: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  consent: boolean;
};

export function Form({ onSubmit }: { onSubmit: (d: LeadData) => void }) {
  const [data, setData] = useState<LeadData>({
    name: "",
    phone: "",
    date: "",
    time: "",
    consent: true,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof LeadData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [legalOpen, setLegalOpen] = useState<"terms" | "privacy" | null>(null);

  const nameOk = data.name.trim().length >= 2;
  const phoneOk = data.phone.replace(/\D/g, "").length >= 9;
  const dateOk = data.date.length > 0;
  const timeOk = /^\d{2}:\d{2}$/.test(data.time);

  const formValid = nameOk && phoneOk && dateOk && timeOk && data.consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      date: true,
      time: true,
      consent: true,
    });
    if (!formValid) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(data), 900);
  };

  return (
    <section id="form" className="snap-section-grow bg-navy">
      <div className="flex min-h-[100svh] flex-col px-5 pb-6 pt-16">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-[460px] flex-1 flex-col"
        >
          <Field
            label="שם מלא"
            required
            error={touched.name && !nameOk ? "חובה" : undefined}
          >
            <input
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="—"
              className="input-line text-right"
              dir="rtl"
            />
          </Field>

          <Field
            label="טלפון"
            required
            error={
              touched.phone && !phoneOk
                ? data.phone
                  ? "לא תקין"
                  : "חובה"
                : undefined
            }
          >
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="050 000 0000"
              className="input-line text-right tabular"
              dir="ltr"
            />
          </Field>

          {/* ============== Appointment scheduling ============== */}
          <div className="mt-9 mb-3 flex items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/65">
              קביעת תור לסיור
            </span>
            <span className="h-px flex-1 bg-white/20" />
          </div>

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
            {submitting ? "כמעט שם..." : "אישור התור"}
          </motion.button>
        </form>
      </div>

      <LegalSheet kind={legalOpen} onClose={() => setLegalOpen(null)} />
    </section>
  );
}

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="!mt-3 first:!mt-0">
      <div className="mb-1.5 flex items-baseline justify-between text-[12.5px] font-light">
        <span className="text-white/70">
          {label}
          {required && <span className="ms-0.5">*</span>}
          {optional && <span className="ms-1 text-white/30">(רשות)</span>}
        </span>
        {error && <span className="text-white/55">{error}</span>}
      </div>
      {children}
    </div>
  );
}
