"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="snap-section-grow bg-navy"
    >
      {/* Full-bleed הדמייה background */}
      <img
        src={asset("/media/hero.jpeg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center center" }}
      />

      {/* Base wash — light enough that the image still reads through
          the middle band, dark enough that text everywhere stays legible. */}
      <div className="pointer-events-none absolute inset-0 bg-navy/35" />

      {/* gradient wash behind logo + headline (top) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-navy via-navy/75 to-transparent" />

      {/* gradient wash behind marketing copy + CTA (bottom). Higher
          opacity because that band carries the densest text. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-navy via-navy/90 to-transparent" />

      {/* ============== Content — single vertical hierarchy ============== */}
      <div
        className="
          relative z-10
          flex min-h-[100svh] w-full flex-col items-center
          px-5 sm:px-6
        "
        style={{
          paddingTop: "max(48px, 14svh)",
          paddingBottom: "max(28px, 6svh)",
        }}
      >
        {/* ===== Brand block (top focal area) ===== */}
        <motion.img
          src={asset("/media/logo.png")}
          alt="ENAV"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="h-28 w-auto sm:h-36"
          style={{ filter: "brightness(0) invert(1)" }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
          className="mt-4 text-center font-display font-extralight leading-[1.05] tracking-[-0.025em] text-white"
          style={{
            fontSize: "clamp(2.8rem, 11.5vw, 4.2rem)",
            textShadow: "0 1px 16px rgba(16,43,75,0.55)",
          }}
        >
          קודם כל בית
          <span className="text-white/90">.</span>
        </motion.h1>

        {/* ===== Marketing copy block (clearly separated from brand) ===== */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.95, ease: EASE }}
          className="mt-9 max-w-[440px] text-center text-[17px] font-light leading-[1.55] text-white text-balance sm:mt-11 sm:max-w-[520px] sm:text-[20px]"
          style={{ textShadow: "0 1px 14px rgba(16,43,75,0.7)" }}
        >
          נכנסים{" "}
          <span className="font-medium underline decoration-white/85 decoration-[1.5px] underline-offset-[5px]">
            בקיץ הקרוב
          </span>{" "}
          לבית החדש שלכם בכפר סבא ומשלמים בעוד{" "}
          <span className="font-medium underline decoration-white/85 decoration-[1.5px] underline-offset-[5px]">
            שנה וחצי
          </span>
          !
        </motion.p>

        {/* Pricing pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.15, ease: EASE }}
          className="mt-5 flex w-fit max-w-full items-center gap-2.5 rounded-full bg-white px-5 py-2.5 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.55)] sm:gap-3 sm:px-6 sm:py-3"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            className="shrink-0 text-navy/75"
          >
            <path
              d="M9 3 L5 7 L9 11 M12 3 L8 7 L12 11"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[14px] font-medium leading-tight text-navy sm:text-[15px]">
            החל מ-<span className="tabular">3.98</span> מיליון ש&quot;ח · 5–6
            חדרים מרווחות
          </span>
        </motion.div>

        {/* Secondary supporting info */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
          className="mt-3 max-w-[440px] text-center text-[13px] font-light leading-[1.5] text-white/85 text-balance sm:text-[14px]"
          style={{ textShadow: "0 1px 14px rgba(16,43,75,0.7)" }}
        >
          ליווי בנקאי צמוד במסלולי מימון מותאמים אישית
        </motion.p>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.45 }}
          className="mt-2 text-center text-[10px] font-light tracking-wider text-white/55"
        >
          *בכפוף לתקנון · ט.ל.ח
        </motion.p>

        {/* ===== Primary action (clearly separated from copy) ===== */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.65, ease: EASE }}
          onClick={() =>
            document
              .getElementById("form")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="mt-8 rounded-full border border-white bg-white px-8 py-3.5 text-[15px] font-medium tracking-wide text-navy shadow-[0_10px_28px_-12px_rgba(255,255,255,0.5)] transition hover:bg-white/95 sm:mt-10 sm:px-10 sm:py-4 sm:text-[16px]"
        >
          לקביעת פגישת ייעוץ
        </motion.button>
      </div>
    </section>
  );
}
