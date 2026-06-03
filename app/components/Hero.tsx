"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="hero" className="snap-section bg-navy">
      {/* Full-bleed הדמייה background — fills the viewport edge to edge */}
      <img
        src={asset("/media/hero.jpeg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center center" }}
      />

      {/* full-page navy wash so the text is always legible against the photo */}
      <div className="pointer-events-none absolute inset-0 bg-navy/45" />

      {/* extra washes at top + bottom edges where the text actually sits */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-navy via-navy/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-navy via-navy/80 to-transparent" />

      {/* ============== Content (natural flow, no overlap risk) ============== */}
      <div className="relative z-10 flex h-full w-full flex-col px-5 pb-7 pt-8 sm:px-6 sm:pb-10 sm:pt-12">
        {/* ===== TOP: logo + headline ===== */}
        <div className="flex flex-col items-center">
          <motion.img
            src={asset("/media/logo.png")}
            alt="ENAV"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="h-16 w-auto sm:h-24"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
            className="mt-5 text-center font-display text-[clamp(2.6rem,12vw,4.2rem)] font-extralight leading-[1.05] tracking-[-0.025em] text-white sm:mt-6"
            style={{ textShadow: "0 1px 14px rgba(16,43,75,0.55)" }}
          >
            קודם כל בית
            <span className="text-white/90">.</span>
          </motion.h1>
        </div>

        {/* ===== Spacer pushes bottom block to bottom of viewport ===== */}
        <div className="flex-1" />

        {/* ===== BOTTOM: description + pricing + banking + CTA ===== */}
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: EASE }}
            className="mx-auto max-w-[480px] text-center text-[16px] font-light leading-[1.5] text-white text-balance sm:text-[20px]"
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
            transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
            className="mt-4 flex w-fit max-w-full items-center gap-2.5 rounded-full border border-white/55 bg-white/[0.06] px-4 py-2.5 backdrop-blur-sm sm:mt-5 sm:gap-3 sm:px-6 sm:py-3"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="shrink-0 text-white/85"
            >
              <path
                d="M9 3 L5 7 L9 11 M12 3 L8 7 L12 11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[13px] font-medium leading-tight text-white sm:text-[15px]">
              החל מ-<span className="tabular">3.98</span> מיליון ש&quot;ח · 5–6
              חדרים מרווחות
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
            className="mx-auto mt-3 max-w-[460px] text-center text-[13px] font-light leading-[1.5] text-white/85 text-balance sm:mt-4 sm:text-[14px]"
            style={{ textShadow: "0 1px 14px rgba(16,43,75,0.7)" }}
          >
            ליווי בנקאי צמוד במסלולי מימון מותאמים אישית
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.55 }}
            className="mt-2 text-center text-[9.5px] font-light tracking-wider text-white/55"
          >
            *בכפוף לתקנון · ט.ל.ח
          </motion.p>

          {/* CTA — scrolls to the form */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease: EASE }}
            onClick={() =>
              document
                .getElementById("form")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="mt-5 rounded-full border border-white bg-white px-7 py-3 text-[14.5px] font-medium tracking-wide text-navy shadow-[0_8px_24px_-10px_rgba(255,255,255,0.45)] transition hover:bg-white/95 sm:mt-6 sm:px-8 sm:py-3.5 sm:text-[15px]"
          >
            לקביעת פגישת ייעוץ
          </motion.button>
        </div>
      </div>
    </section>
  );
}
