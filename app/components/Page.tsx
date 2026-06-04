"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { Form } from "./Form";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function Page() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main style={{ height: "100svh", overflow: "hidden", position: "relative" }}>
      {/* ── Hero panel — locks in place, slides up when form activates ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          transition: `transform 0.65s ${EASE}`,
          transform: showForm ? "translateY(-100%)" : "translateY(0)",
          pointerEvents: showForm ? "none" : "auto",
        }}
      >
        <Hero onBook={() => setShowForm(true)} />
      </div>

      {/* ── Form panel — rises from below, no way back ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          overflowY: showForm ? "auto" : "hidden",
          transition: `transform 0.65s ${EASE}`,
          transform: showForm ? "translateY(0)" : "translateY(100%)",
          pointerEvents: showForm ? "auto" : "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        <Form />
      </div>
    </main>
  );
}
