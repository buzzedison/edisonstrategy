"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  answerOptions,
  categoryDetails,
  getScoreBand,
  scorecardQuestions,
  type ScorecardCategory,
} from "./scorecard-data";

type Answers = Record<string, number>;
type Stage = "intro" | "questions" | "results";

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`Question ${current + 1} of ${scorecardQuestions.length}`}>
      {scorecardQuestions.map((question, index) => (
        <span
          key={question.id}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            index <= current ? "bg-[#e84a2f]" : "bg-[#dedbd2]"
          }`}
        />
      ))}
    </div>
  );
}

export default function FounderScorecardClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState("");

  const results = useMemo(() => {
    const categoryScores = Object.keys(categoryDetails).reduce((acc, key) => {
      const category = key as ScorecardCategory;
      const questions = scorecardQuestions.filter((question) => question.category === category);
      const total = questions.reduce((sum, question) => sum + (answers[question.id] || 0), 0);
      acc[category] = Math.round((total / (questions.length * 5)) * 100);
      return acc;
    }, {} as Record<ScorecardCategory, number>);

    const total = Object.values(categoryScores).reduce((sum, value) => sum + value, 0);
    const score = Math.round(total / Object.keys(categoryScores).length);
    const primaryConstraint = (Object.entries(categoryScores) as [ScorecardCategory, number][]).sort(
      (a, b) => a[1] - b[1]
    )[0]?.[0] || "decisions";

    return { score, categoryScores, primaryConstraint, band: getScoreBand(score) };
  }, [answers]);

  const chooseAnswer = (value: number) => {
    const question = scorecardQuestions[currentQuestion];
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    window.setTimeout(() => {
      if (currentQuestion === scorecardQuestions.length - 1) {
        setStage("results");
      } else {
        setCurrentQuestion((current) => current + 1);
      }
    }, 180);
  };

  const goBack = () => {
    if (currentQuestion === 0) {
      setStage("intro");
      return;
    }
    setCurrentQuestion((current) => current - 1);
  };

  const reset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setStage("intro");
    setSubmitState("idle");
    setSubmitError("");
  };

  const submitResults = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitState("sending");
    setSubmitError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          email,
          source: "founder_bottleneck_scorecard",
          fields: {
            founder_score: String(results.score),
            score_band: results.band.label,
            primary_constraint: results.primaryConstraint,
          },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We could not send your result.");

      setSubmitState("sent");
    } catch (error) {
      setSubmitState("idle");
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const question = scorecardQuestions[currentQuestion];
  const constraint = categoryDetails[results.primaryConstraint];

  return (
    <div className="min-h-screen bg-[#f4f2ec] pt-20 text-[#171712]">

      {stage === "intro" && (
        <main>
          <section className="border-b border-[#d9d7d0]">
            <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="mb-8 text-xs font-bold uppercase tracking-[0.24em] text-[#e84a2f]">
                  Free 4-minute assessment
                </p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
                  Is your company growing—or just becoming more dependent on you?
                </h1>
              </div>
              <div className="border-l-2 border-[#171712] pl-6 sm:pl-8">
                <p className="text-xl leading-relaxed text-[#4f4c44]">
                  Find the operating constraint that keeps important work returning to your desk—and get three moves you can make this week.
                </p>
                <button
                  type="button"
                  onClick={() => setStage("questions")}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#171712] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#e84a2f]"
                >
                  Start the scorecard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
            <div className="grid gap-px overflow-hidden border border-[#d9d7d0] bg-[#d9d7d0] md:grid-cols-3">
              {[
                [Clock3, "4 minutes", "Ten direct questions. No jargon or personality typing."],
                [Sparkles, "Immediate result", "See your score, primary constraint, and action plan on screen."],
                [Mail, "Useful follow-up", "Continue with one practical operating idea each week."],
              ].map(([Icon, title, description]) => {
                const CardIcon = Icon as typeof Clock3;
                return (
                  <div key={title as string} className="bg-[#f4f1e8] p-7 sm:p-9">
                    <CardIcon className="mb-8 h-6 w-6 text-[#e84a2f]" />
                    <h2 className="text-xl font-bold tracking-tight">{title as string}</h2>
                    <p className="mt-3 leading-relaxed text-[#666258]">{description as string}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#777267]">
              Your answers are not stored while you take the assessment. The scorecard is a practical operating diagnostic, not a clinical or financial assessment.
            </p>
          </section>
        </main>
      )}

      {stage === "questions" && (
        <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl flex-col px-5 py-10 sm:px-8 sm:py-16">
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#777267]">
              <span>{categoryDetails[question.category].shortLabel}</span>
              <span>{currentQuestion + 1} / {scorecardQuestions.length}</span>
            </div>
            <ProgressDots current={currentQuestion} />
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#e84a2f]">How true is this today?</p>
            <h1 className="text-4xl font-black leading-tight tracking-[-0.045em] sm:text-6xl">
              {question.statement}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#666258]">{question.context}</p>

            <div className="mt-10 grid gap-3 sm:grid-cols-5">
              {answerOptions.map((option) => {
                const selected = answers[question.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseAnswer(option.value)}
                    className={`group min-h-28 rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-[#171712] bg-[#171712] text-white"
                        : "border-[#cbc7bc] bg-[#faf8f1] hover:-translate-y-1 hover:border-[#171712]"
                    }`}
                  >
                    <span className={`text-2xl font-black ${selected ? "text-[#ff7b61]" : "text-[#e84a2f]"}`}>
                      {option.value}
                    </span>
                    <span className="mt-4 block text-xs font-semibold leading-snug">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={goBack}
            className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#666258] hover:text-[#171712]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </main>
      )}

      {stage === "results" && (
        <main>
          <section className="border-b border-[#d9d7d0]">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e84a2f]">Your operating score</p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-[112px] font-black leading-none tracking-[-0.08em] sm:text-[148px]">{results.score}</span>
                  <span className="mb-5 text-2xl font-bold text-[#777267]">/100</span>
                </div>
                <span className="inline-flex rounded-full border border-[#171712] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
                  {results.band.label}
                </span>
              </div>
              <div className="lg:pt-7">
                <h1 className="text-4xl font-black leading-tight tracking-[-0.045em] sm:text-6xl">{results.band.headline}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b52]">{results.band.description}</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <div className="flex items-end justify-between border-b border-[#bdb9ae] pb-4">
                  <h2 className="text-2xl font-black tracking-tight">How the system is carrying the work</h2>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#777267]">0–100</span>
                </div>
                <div className="divide-y divide-[#d9d7d0]">
                  {(Object.entries(results.categoryScores) as [ScorecardCategory, number][]).map(([category, score]) => (
                    <div key={category} className="grid grid-cols-[110px_1fr_42px] items-center gap-4 py-5 sm:grid-cols-[160px_1fr_50px]">
                      <span className="text-sm font-semibold">{categoryDetails[category].shortLabel}</span>
                      <div className="h-2 overflow-hidden rounded-full bg-[#dedbd2]">
                        <div className="h-full rounded-full bg-[#171712]" style={{ width: `${score}%` }} />
                      </div>
                      <span className="text-right text-sm font-black">{score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-[28px] bg-[#171712] p-7 text-white sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff7b61]">Primary constraint</p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em]">{constraint.label}</h2>
                <p className="mt-4 leading-relaxed text-[#c7c4ba]">{constraint.description}</p>
              </aside>
            </div>

            <div className="mt-16 border-t border-[#bdb9ae] pt-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e84a2f]">Your next seven days</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">Three moves to reduce the constraint</h2>
              <div className="mt-8 grid gap-px overflow-hidden border border-[#d9d7d0] bg-[#d9d7d0] md:grid-cols-3">
                {constraint.actions.map((action, index) => (
                  <div key={action} className="bg-[#f4f1e8] p-7">
                    <span className="text-4xl font-black text-[#e84a2f]">0{index + 1}</span>
                    <p className="mt-8 text-lg font-semibold leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 grid overflow-hidden rounded-[32px] border border-[#171712] bg-[#faf8f1] lg:grid-cols-[1fr_0.9fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e84a2f]">Keep building</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">Get the weekly Master the System letter.</h2>
                <p className="mt-5 max-w-xl leading-relaxed text-[#666258]">
                  You already have your score and action plan. Join for one useful operating idea each week—short enough to read, specific enough to use.
                </p>
              </div>

              <div className="bg-[#e9e5da] p-7 sm:p-10 lg:p-12">
                {submitState === "sent" ? (
                  <div className="flex h-full min-h-72 flex-col justify-center">
                    <CheckCircle2 className="h-10 w-10 text-[#e84a2f]" />
                    <h3 className="mt-5 text-2xl font-black">You’re on the list.</h3>
                    <p className="mt-3 leading-relaxed text-[#666258]">
                      Check {email} to confirm your subscription. Your first issue arrives with the next weekly send.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitResults} className="space-y-4">
                    <div>
                      <label htmlFor="scorecard-name" className="mb-2 block text-xs font-bold uppercase tracking-[0.15em]">First name</label>
                      <input
                        id="scorecard-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        autoComplete="given-name"
                        className="w-full rounded-xl border border-[#bdb9ae] bg-[#faf8f1] px-4 py-3.5 outline-none focus:border-[#171712]"
                        placeholder="Edison"
                      />
                    </div>
                    <div>
                      <label htmlFor="scorecard-email" className="mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Email</label>
                      <input
                        id="scorecard-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-[#bdb9ae] bg-[#faf8f1] px-4 py-3.5 outline-none focus:border-[#171712]"
                        placeholder="you@company.com"
                      />
                    </div>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#c9c5ba] bg-[#f4f1e8] p-4">
                      <input
                        type="checkbox"
                        checked={newsletterConsent}
                        onChange={(event) => setNewsletterConsent(event.target.checked)}
                        required
                        className="mt-1 h-4 w-4 accent-[#e84a2f]"
                      />
                      <span className="text-sm leading-relaxed text-[#4f4c44]">
                        Send me <strong>Master the System</strong>, one useful operating idea every week. Unsubscribe anytime.
                      </span>
                    </label>
                    {submitError && <p className="text-sm font-semibold text-red-700">{submitError}</p>}
                    <button
                      type="submit"
                      disabled={submitState === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171712] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#e84a2f] disabled:opacity-60"
                    >
                      {submitState === "sending" ? "Joining…" : "Join Master the System"}
                      {submitState !== "sending" && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-[#d9d7d0] pt-8 sm:flex-row sm:items-center">
              <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm font-semibold text-[#666258] hover:text-[#171712]">
                <RotateCcw className="h-4 w-4" />
                Retake the scorecard
              </button>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-[#171712] underline decoration-[#e84a2f] decoration-2 underline-offset-4">
                Bring me the constraint
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </main>
      )}

    </div>
  );
}
