"use client";

import { Hero } from "./Hero";
import { Form } from "./Form";

export function Page() {
  return (
    <main className="snap-scroll">
      <Hero />
      <Form />
    </main>
  );
}
