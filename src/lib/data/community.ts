export type Post = {
  id: string;
  author: { name: string; tone: "brand" | "blush" | "mint" | "sky" | "amber"; badge?: string };
  time: string;
  body: string;
  tags: { label: string; tone?: "brand" | "mint" | "blush" | "amber" }[];
  stats: { likes: number; comments: number };
  highlight?: string;
};

export const posts: Post[] = [
  {
    id: "p1",
    author: { name: "Jessica R.", tone: "blush", badge: "Pro" },
    time: "2h ago",
    body: "Week 8 update — down 18 lbs so far and feeling amazing. The food noise is finally quiet. This journey is life-changing!",
    tags: [
      { label: "Retatrutide", tone: "brand" },
      { label: "12 mg / week" },
    ],
    stats: { likes: 128, comments: 24 },
    highlight: "–18 lbs",
  },
  {
    id: "p2",
    author: { name: "Mark T.", tone: "sky" },
    time: "5h ago",
    body: "Just took my 4th shot today. Minimal side effects and energy has been great. Any tips on managing the Friday nausea bump?",
    tags: [{ label: "Semaglutide", tone: "mint" }],
    stats: { likes: 42, comments: 12 },
  },
  {
    id: "p3",
    author: { name: "Amara L.", tone: "mint", badge: "Coach" },
    time: "Yesterday",
    body: "Sharing my week 12 photos and lab panel. A1C dropped from 6.4 → 5.4, LDL down 22 points. Worth every injection.",
    tags: [
      { label: "Tirzepatide", tone: "blush" },
      { label: "Labs" },
    ],
    stats: { likes: 311, comments: 63 },
    highlight: "A1C 6.4 → 5.4",
  },
  {
    id: "p4",
    author: { name: "Chris V.", tone: "amber" },
    time: "Yesterday",
    body: "Protocol planner tip: split your dose across two injections (Mon/Thu) if you're sensitive to the peak day. Game changer for me.",
    tags: [{ label: "Protocols" }, { label: "Tips" }],
    stats: { likes: 87, comments: 18 },
  },
];

export type Group = {
  id: string;
  name: string;
  members: number;
  color: "brand" | "blush" | "mint" | "amber" | "sky";
  description: string;
};

export const groups: Group[] = [
  { id: "g1", name: "Weight Loss Warriors", members: 12412, color: "brand", description: "Support for metabolic peptide protocols." },
  { id: "g2", name: "Recovery & Repair", members: 4328, color: "mint", description: "BPC-157, TB-500 and healing stacks." },
  { id: "g3", name: "Longevity Lab", members: 2610, color: "blush", description: "Epitalon, GHK-Cu and anti-aging research." },
  { id: "g4", name: "Lean Muscle Stack", members: 5820, color: "amber", description: "GH secretagogues and performance peptides." },
];

export type QAItem = {
  id: string;
  question: string;
  answers: number;
  tag: string;
};

export const qaItems: QAItem[] = [
  { id: "q1", question: "Best way to manage week-1 nausea on retatrutide?", answers: 42, tag: "Retatrutide" },
  { id: "q2", question: "Cycling BPC-157 — how long off between cycles?", answers: 17, tag: "BPC-157" },
  { id: "q3", question: "Dose titration for 220+ lbs starting tirzepatide?", answers: 31, tag: "Tirzepatide" },
  { id: "q4", question: "Do I need B12 or electrolytes while on GLP-1s?", answers: 23, tag: "Protocols" },
];

export type Story = {
  id: string;
  title: string;
  author: string;
  progress: string;
  tone: "brand" | "blush" | "mint" | "amber" | "sky";
};

export const stories: Story[] = [
  { id: "s1", title: "The first 90 days", author: "Jessica R.", progress: "–18 lbs", tone: "blush" },
  { id: "s2", title: "My year on tirzepatide", author: "Amara L.", progress: "–54 lbs", tone: "mint" },
  { id: "s3", title: "Peptides for my marathon", author: "Dante B.", progress: "PR by 12 min", tone: "sky" },
  { id: "s4", title: "Labs before & after", author: "Kenji S.", progress: "A1C 6.8→5.3", tone: "brand" },
];
