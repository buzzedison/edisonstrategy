export type ScorecardCategory =
  | "decisions"
  | "ownership"
  | "systems"
  | "focus"
  | "capacity";

export type ScorecardQuestion = {
  id: string;
  category: ScorecardCategory;
  statement: string;
  context: string;
};

export const categoryDetails: Record<
  ScorecardCategory,
  { label: string; shortLabel: string; description: string; actions: string[] }
> = {
  decisions: {
    label: "Decision flow",
    shortLabel: "Decisions",
    description: "Important decisions can move without waiting for you to enter the room.",
    actions: [
      "Write down the five decisions that most often return to you.",
      "Give each decision a clear owner, boundary, and escalation trigger.",
      "Review decision quality weekly instead of approving every decision in advance.",
    ],
  },
  ownership: {
    label: "Team ownership",
    shortLabel: "Ownership",
    description: "People own outcomes, not just tasks or instructions.",
    actions: [
      "Replace task lists with one measurable outcome for each role.",
      "Ask owners to propose the next move before bringing you a problem.",
      "Create a weekly ownership review: outcome, obstacle, next commitment.",
    ],
  },
  systems: {
    label: "Operating systems",
    shortLabel: "Systems",
    description: "The business runs on visible, repeatable ways of working.",
    actions: [
      "Document the one recurring process that creates the most rework.",
      "Choose a single source of truth for priorities, owners, and deadlines.",
      "Turn repeated explanations into a checklist, template, or standard.",
    ],
  },
  focus: {
    label: "Strategic focus",
    shortLabel: "Focus",
    description: "The team knows what matters now—and what is deliberately waiting.",
    actions: [
      "Name one company constraint and one 90-day outcome.",
      "Pause work that does not directly support that outcome.",
      "Use a weekly stop-doing decision to protect the strategy.",
    ],
  },
  capacity: {
    label: "Founder capacity",
    shortLabel: "Capacity",
    description: "Your attention is spent on leverage, not constant rescue work.",
    actions: [
      "Audit your calendar and mark work only you can do.",
      "Delegate one recurring rescue pattern with a clear success standard.",
      "Protect two blocks each week for thinking, relationships, and future bets.",
    ],
  },
};

export const scorecardQuestions: ScorecardQuestion[] = [
  {
    id: "decisions-1",
    category: "decisions",
    statement: "Important decisions move forward without my approval.",
    context: "Think about pricing, customer issues, hiring, delivery, and spending.",
  },
  {
    id: "ownership-1",
    category: "ownership",
    statement: "My team brings me recommendations, not just problems.",
    context: "They investigate, weigh trade-offs, and propose a next move.",
  },
  {
    id: "systems-1",
    category: "systems",
    statement: "Recurring work follows a clear and repeatable process.",
    context: "Good work does not depend on someone remembering how it was done last time.",
  },
  {
    id: "focus-1",
    category: "focus",
    statement: "Everyone can name the company’s single most important 90-day outcome.",
    context: "Priorities are understood consistently across the team.",
  },
  {
    id: "capacity-1",
    category: "capacity",
    statement: "Most of my week is spent on work that only I can do.",
    context: "Your calendar reflects your highest-leverage contribution as founder.",
  },
  {
    id: "decisions-2",
    category: "decisions",
    statement: "My team knows which decisions they own and when to escalate.",
    context: "Decision rights are clearer than job titles alone.",
  },
  {
    id: "ownership-2",
    category: "ownership",
    statement: "Projects keep moving when I am unavailable for several days.",
    context: "Momentum survives your absence without hidden rescue work.",
  },
  {
    id: "systems-2",
    category: "systems",
    statement: "I can see priorities, owners, and progress in one place.",
    context: "You do not need several meetings to reconstruct what is happening.",
  },
  {
    id: "focus-2",
    category: "focus",
    statement: "We regularly stop good ideas that distract from the main constraint.",
    context: "The strategy makes trade-offs visible rather than adding more work.",
  },
  {
    id: "capacity-2",
    category: "capacity",
    statement: "Urgent team requests rarely take over my planned day.",
    context: "Exceptions exist, but firefighting is not the operating model.",
  },
];

export const answerOptions = [
  { value: 1, label: "Rarely true" },
  { value: 2, label: "Occasionally" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Usually true" },
  { value: 5, label: "Consistently true" },
];

export function getScoreBand(score: number) {
  if (score < 40) {
    return {
      label: "Founder-trapped",
      headline: "The business is borrowing too much of its stability from you.",
      description:
        "Your involvement is holding important work together, but it is also limiting how far the company can move. The next stage is not more effort. It is transferring decisions, ownership, and repeatable work out of your head.",
    };
  }

  if (score < 60) {
    return {
      label: "Founder-dependent",
      headline: "The company can move, but too many roads still lead back to you.",
      description:
        "Parts of the business operate independently, while critical decisions and exceptions still collect on your desk. Removing one structural constraint now will create more capacity than trying to improve everything at once.",
    };
  }

  if (score < 80) {
    return {
      label: "Scaling with friction",
      headline: "You have working systems. The gaps now matter more than the averages.",
      description:
        "The company is no longer completely founder-led, but one or two weak operating areas are creating drag. Tightening the lowest-scoring area should improve speed without adding another layer of meetings.",
    };
  }

  return {
    label: "Built to carry momentum",
    headline: "The company can think and move without waiting for you.",
    description:
      "You have strong operating foundations. Your next challenge is to preserve clarity as complexity grows—especially by developing leaders, protecting focus, and reviewing systems before they become constraints.",
  };
}


