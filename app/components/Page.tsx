"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "./Hero";
import { Form, type LeadData } from "./Form";
import { Success } from "./Success";

export function Page() {
  const [success, setSuccess] = useState<{
    name: string;
    date: string;
    time: string;
  } | null>(null);
  const [formKey, setFormKey] = useState(0);

  const onSubmit = (d: LeadData) => {
    setSuccess({ name: d.name, date: d.date, time: d.time });
  };

  const onRestart = () => {
    setSuccess(null);
    setFormKey((k) => k + 1);
    setTimeout(() => {
      document
        .getElementById("form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <>
      <main className="snap-scroll">
        <Hero />
        <AnimatePresence>
          <Form key={`form-${formKey}`} onSubmit={onSubmit} />
        </AnimatePresence>
      </main>
      {success && (
        <Success
          name={success.name}
          date={success.date}
          time={success.time}
          onRestart={onRestart}
        />
      )}
    </>
  );
}
