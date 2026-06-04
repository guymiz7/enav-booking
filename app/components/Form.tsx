"use client";

import { motion } from "framer-motion";
import { CalEmbed } from "./CalEmbed";

export function Form() {
  return (
    <section id="form" className="snap-section-grow bg-navy">
      <div className="mx-auto flex w-full max-w-[820px] flex-col px-5 pb-10 pt-14 sm:px-6 sm:pt-20">
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-display font-extralight leading-[1.15] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(1.75rem, 6.5vw, 2.2rem)" }}
        >
          מתי מתאים לך שנפגש?
        </motion.h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.02]">
          <CalEmbed />
        </div>
      </div>
    </section>
  );
}
