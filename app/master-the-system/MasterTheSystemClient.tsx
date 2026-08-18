"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, Mail, Wrench } from "lucide-react";

const issueSections = [
  {
    number: "01",
    title: "The constraint",
    description: "One pattern quietly making the business slower, heavier, or more dependent on you.",
  },
  {
    number: "02",
    title: "The principle",
    description: "A clear way to think about the problem without hiding behind a fashionable playbook.",
  },
  {
    number: "03",
    title: "The move",
    description: "One action you can take this week to improve how the company thinks, sells, or operates.",
  },
];

function LetterSignup({ dark = false }: { dark?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState("sending");
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: name, email, source: "master_the_system" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We could not subscribe you.");
      setState("sent");
    } catch (submitError) {
      setState("idle");
      setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    }
  };

  if (state === "sent") {
    return (
      <div className={`rounded-3xl border p-7 ${dark ? "border-white/20 bg-white/10" : "border-[#c9c5ba] bg-[#e9e5da]"}`}>
        <CheckCircle2 className="h-9 w-9 text-[#ff6c50]" />
        <h3 className="mt-5 text-2xl font-black">You’re on the list.</h3>
        <p className={`mt-3 leading-relaxed ${dark ? "text-white/70" : "text-[#666258]"}`}>
          Check your inbox for a welcome note. The next useful operating idea arrives with the weekly send.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={dark ? "footer-name" : "hero-name"} className="sr-only">First name</label>
          <input
            id={dark ? "footer-name" : "hero-name"}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="given-name"
            placeholder="First name"
            className={`w-full rounded-full border px-5 py-4 outline-none transition ${
              dark
                ? "border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-white"
                : "border-[#bdb9ae] bg-[#faf8f1] focus:border-[#171712]"
            }`}
          />
        </div>
        <div>
          <label htmlFor={dark ? "footer-email" : "hero-email"} className="sr-only">Email address</label>
          <input
            id={dark ? "footer-email" : "hero-email"}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            placeholder="Email address"
            className={`w-full rounded-full border px-5 py-4 outline-none transition ${
              dark
                ? "border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-white"
                : "border-[#bdb9ae] bg-[#faf8f1] focus:border-[#171712]"
            }`}
          />
        </div>
      </div>
      {error && <p className={`text-sm font-semibold ${dark ? "text-[#ff9a85]" : "text-red-700"}`}>{error}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition disabled:opacity-60 ${
          dark ? "bg-[#ff6c50] text-[#171712] hover:bg-white" : "bg-[#171712] text-white hover:bg-[#e84a2f]"
        }`}
      >
        {state === "sending" ? "Joining…" : "Join the weekly letter"}
        {state !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className={`text-center text-xs ${dark ? "text-white/50" : "text-[#777267]"}`}>
        Free. One thoughtful email a week. Unsubscribe anytime.
      </p>
    </form>
  );
}

export default function MasterTheSystemClient() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] pt-20 text-[#171712]">

      <main>
        <section className="border-b border-[#d9d7d0]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-8 text-xs font-bold uppercase tracking-[0.24em] text-[#e84a2f]">A weekly letter for founders</p>
              <h1 className="text-6xl font-black leading-[0.88] tracking-[-0.065em] sm:text-8xl lg:text-[112px]">
                Master<br />the System<span className="text-[#e84a2f]">.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#5f5b52] sm:text-2xl">
                One precise idea each week for building a company that can think, sell, and move without waiting for you.
              </p>
            </div>

            <div className="rounded-[30px] border border-[#171712] bg-[#faf8f1] p-6 sm:p-8">
              <div className="mb-7 flex items-center gap-3 border-b border-[#d9d7d0] pb-5">
                <Mail className="h-5 w-5 text-[#e84a2f]" />
                <div>
                  <p className="text-sm font-bold">Every Thursday morning</p>
                  <p className="text-xs text-[#777267]">Five minutes. One practical move.</p>
                </div>
              </div>
              <LetterSignup />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e84a2f]">Why it exists</p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em] sm:text-6xl">Most founder advice adds work.</h2>
            </div>
            <div className="max-w-3xl text-xl leading-relaxed text-[#5f5b52]">
              <p>
                Master the System is about removing the work that should never have depended on you. No motivational theatre. No borrowed playbook presented as universal truth.
              </p>
              <p className="mt-6">
                Each issue starts with a real operating constraint, explains the principle underneath it, and ends with one move your team can actually make.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d9d7d0] bg-[#e9e5da]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e84a2f]">Inside each issue</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl">A short letter with a job to do.</h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#c9c5ba] bg-[#c9c5ba] md:grid-cols-3">
              {issueSections.map((section) => (
                <article key={section.number} className="bg-[#f4f1e8] p-7 sm:p-9">
                  <span className="text-4xl font-black text-[#e84a2f]">{section.number}</span>
                  <h3 className="mt-10 text-2xl font-black tracking-tight">{section.title}</h3>
                  <p className="mt-4 leading-relaxed text-[#666258]">{section.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-[30px] border border-[#d1cdc2] bg-[#faf8f1] p-7 sm:p-10">
              <Clock3 className="h-7 w-7 text-[#e84a2f]" />
              <h2 className="mt-8 text-3xl font-black tracking-[-0.035em]">Written for a real Thursday.</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#666258]">
                Short enough to read before the day takes over. Substantial enough to change a conversation, meeting, or decision.
              </p>
            </div>
            <div className="rounded-[30px] border border-[#d1cdc2] bg-[#faf8f1] p-7 sm:p-10">
              <Wrench className="h-7 w-7 text-[#e84a2f]" />
              <h2 className="mt-8 text-3xl font-black tracking-[-0.035em]">Made to be used.</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#666258]">
                Frameworks, questions, and operating moves—not content designed only to be admired or shared.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#171712] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff6c50]">The next issue</p>
              <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-7xl">Build a company that can carry the conviction.</h2>
            </div>
            <LetterSignup dark />
          </div>
        </section>
      </main>

    </div>
  );
}

