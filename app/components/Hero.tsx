"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-navy">
      {/* ============== UPPER HALF — hero rendering ============== */}
      <div className="relative h-[58svh] w-full overflow-hidden sm:h-[62svh]">
        {/* blurred zoom fill so the image bleeds edge-to-edge */}
        <img
          src={asset("/media/hero.jpeg")}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
        />
        {/* foreground rendering */}
        <motion.img
          src={asset("/media/hero.jpeg")}
          alt="פרויקט ענב 360 בכפר סבא"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 38%" }}
        />

        {/* top wash so the logo reads cleanly over the sky */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-navy/85 via-navy/35 to-transparent" />

        {/* bottom wash that melts the image into the navy below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-navy via-navy/70 to-transparent" />

        {/* ============== ENAV 360 logo lockup — top center ============== */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="absolute inset-x-0 top-8 z-10 flex flex-col items-center sm:top-10"
        >
          <img
            src={asset("/media/logo.png")}
            alt="ENAV ענב"
            className="h-20 w-auto sm:h-24"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          {/* "360" + "כפר סבא" sub-lockup, matches the reference */}
          <div className="mt-1 flex flex-col items-center leading-none">
            <span className="font-display text-[34px] font-light tracking-[0.12em] text-white sm:text-[40px]">
              360
            </span>
            <span className="mt-1 text-[11px] font-light tracking-[0.42em] text-white/85 sm:text-[12px]">
              כפר סבא
            </span>
          </div>
        </motion.div>
      </div>

      {/* ============== LOWER HALF — headline + CTA ============== */}
      <section className="relative z-10 -mt-[12svh] flex flex-col items-center px-6 pb-10 text-center">
        {/* main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: EASE }}
          className="font-display text-[clamp(3rem,14vw,4.4rem)] font-extralight leading-[1] tracking-[-0.03em] text-white"
        >
          קודם כל בית<span className="text-gold">.</span>
        </motion.h1>

        {/* subhead */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1, ease: EASE }}
          className="mt-6 max-w-[420px] text-[17px] font-light leading-[1.55] text-white/90 sm:text-[18px]"
        >
          נכנסים <span className="font-medium text-white">בקיץ הקרוב</span> לבית
          החדש שלכם בכפר סבא,
          <br />
          ומשלמים בעוד <span className="font-medium text-white">שנה וחצי</span>.
        </motion.p>

        {/* pricing pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1.25, ease: EASE }}
          className="mt-7 flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 backdrop-blur-sm"
        >
          <span className="text-[10px] font-light uppercase tracking-[0.32em] text-white/55">
            החל מ
          </span>
          <span className="font-display text-[19px] font-medium tabular text-white">
            3.98
          </span>
          <span className="text-[14px] font-light text-white/80">
            מיליון ש&quot;ח
          </span>
          <span className="mx-1 text-white/25">•</span>
          <span className="text-[13px] font-light text-white/80">
            5–6 חדרים
          </span>
        </motion.div>

        {/* ============== FOMO CTA ============== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.55, ease: EASE }}
          className="mt-10 flex w-full max-w-[420px] flex-col items-center"
        >
          {/* urgency tag above the button */}
          <div className="mb-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
              נותרו מקומות בודדים
            </span>
          </div>

          <Link
            href="/booking"
            className="group relative block w-full overflow-hidden rounded-full bg-gold px-8 py-4 text-center text-[16px] font-medium text-navy shadow-[0_8px_32px_-8px_rgba(201,169,97,0.6)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(201,169,97,0.8)] hover:brightness-110"
          >
            {/* shimmer */}
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[120%]"
            />
            <span className="relative inline-flex items-center justify-center gap-2">
              לתפוס תור לסיור בשטח
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <p className="mt-3 text-[12px] font-light text-white/55">
            הסיור הקרוב — בימים הבאים. תורים מוגבלים.
          </p>
        </motion.div>

        {/* banking note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.9 }}
          className="mt-10 text-[13px] font-light text-white/65"
        >
          ליווי בנקאי צמוד · מסלולי מימון מותאמים אישית
        </motion.p>

        {/* legal */}
        <p className="mt-6 text-[10px] font-light tracking-wider text-white/30">
          בכפוף לתקנון · ט.ל.ח
        </p>
      </section>
    </main>
  );
}
