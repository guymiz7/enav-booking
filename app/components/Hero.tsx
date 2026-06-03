"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

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
      <div className="pointer-events-none absolute inset-0 bg-navy/40" />

      {/* extra washes at the top + bottom edges where the text actually sits */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-navy/70 via-navy/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-navy via-navy/75 to-transparent" />

      {/* radial dim behind the centered logo block, just enough to lift it
          off the sky without darkening the whole frame */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 28% at center 50%, rgba(16,43,75,0.55), transparent 70%)",
        }}
      />

      {/* ENAV logo + tagline — vertically centered. Pointer-events disabled
          so the bottom CTA below it remains clickable across the full width. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <motion.img
          src={asset("/media/logo.png")}
          alt="ENAV"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-32 w-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-center text-[17px] font-light tracking-[0.24em] text-white"
          style={{ textShadow: "0 1px 12px rgba(16,43,75,0.55)" }}
        >
          קודם כל בית.
        </motion.p>
      </div>

      {/* bottom headline */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[560px] text-center text-[22px] font-light leading-[1.5] text-white text-balance"
          style={{ textShadow: "0 1px 14px rgba(16,43,75,0.7)" }}
        >
          נכנסים בקיץ הקרוב לבית החדש שלכם בכפר סבא ומשלמים בעוד שנה וחצי!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-[560px] text-center text-[16px] font-light leading-[1.5] text-white/95 text-balance"
          style={{ textShadow: "0 1px 14px rgba(16,43,75,0.7)" }}
        >
          החל מ-3.98 מיליון ש&quot;ח לדירות 5–6 חדרים מרווחות
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-[560px] text-center text-[14px] font-light leading-[1.5] text-white/85 text-balance"
          style={{ textShadow: "0 1px 14px rgba(16,43,75,0.7)" }}
        >
          ליווי בנקאי צמוד במסלולי מימון מותאמים אישית
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.75 }}
          className="mx-auto mt-3 text-center text-[10px] font-light tracking-wider text-white/60"
        >
          *בכפוף לתקנון · ט.ל.ח
        </motion.p>

        {/* CTA — scrolls to the form */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex justify-center"
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            onClick={() =>
              document
                .getElementById("form")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="rounded-full border border-white bg-white px-8 py-3.5 text-[15px] font-medium tracking-wide text-navy shadow-[0_8px_24px_-10px_rgba(255,255,255,0.45)] transition hover:bg-white/95"
          >
            לקביעת פגישת ייעוץ
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
