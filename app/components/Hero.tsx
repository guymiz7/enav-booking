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

      {/* ENAV logo + tagline — vertically centered */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
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
          יוצרים מציאות חדשה
        </motion.p>
      </div>

      {/* bottom headline */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[560px] text-center text-[22px] font-light leading-[1.5] text-white text-balance"
          style={{ textShadow: "0 1px 14px rgba(16,43,75,0.7)" }}
        >
          מלאו פרטים וקבעו תור לסיור אישי בפרויקט שמעניין אתכם
        </motion.p>

        {/* scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-7 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 5, 0], opacity: [0.5, 0.95, 0.5] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-light uppercase tracking-[0.32em] text-white/70">
              גלילה
            </span>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 2 L10 9 L18 2"
                stroke="white"
                strokeOpacity="0.85"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
