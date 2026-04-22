export type Peptide = {
  slug: string;
  name: string;
  category: "Metabolic" | "Recovery" | "Cognitive" | "Longevity" | "Muscle" | "Healing";
  tagline: string;
  description: string;
  targets: string[];
  benefits: string[];
  sideEffects: string[];
  commonDose: string;
  halfLife: string;
  studyCount: number;
  tier: "Free" | "Pro" | "Expert";
  color: "brand" | "blush" | "mint" | "amber" | "sky";
  mechanism: {
    title: string;
    description: string;
    icon: "brain" | "target" | "flame" | "shield";
  }[];
  research: {
    title: string;
    publisher: string;
    year: number;
    summary: string;
  }[];
};

export const peptides: Peptide[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    category: "Metabolic",
    tagline: "Triple-agonist peptide targeting GLP-1, GIP, and Glucagon receptors",
    description:
      "Retatrutide is a novel peptide shown to support significant weight loss, improve metabolic health, and enhance glycemic control by activating three key receptors.",
    targets: ["GLP-1", "GIP", "Glucagon"],
    benefits: [
      "Significant weight loss",
      "Improved blood sugar control",
      "Better metabolic health",
      "Reduced appetite & cravings",
    ],
    sideEffects: ["Nausea (early weeks)", "Mild GI upset", "Fatigue"],
    commonDose: "2 – 12 mg / week",
    halfLife: "~6 days",
    studyCount: 38,
    tier: "Pro",
    color: "brand",
    mechanism: [
      {
        title: "GLP-1 Receptor Activation",
        description: "Enhances satiety, slows gastric emptying, and improves blood sugar.",
        icon: "brain",
      },
      {
        title: "GIP Receptor Activation",
        description: "Supports insulin secretion and nutrient utilization.",
        icon: "target",
      },
      {
        title: "Glucagon Receptor Activation",
        description: "Increases energy expenditure and fat metabolism.",
        icon: "flame",
      },
    ],
    research: [
      {
        title: "Triple Hormone Receptor Agonist Retatrutide for Obesity",
        publisher: "NEJM",
        year: 2023,
        summary:
          "Phase 2 trial demonstrated mean weight reduction of 24.2% at 48 weeks on the highest dose.",
      },
      {
        title: "Effects on Glycemic Control in Type 2 Diabetes",
        publisher: "The Lancet",
        year: 2023,
        summary:
          "Significant HbA1c reductions vs. placebo, comparable to best-in-class GLP-1 therapies.",
      },
    ],
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    category: "Metabolic",
    tagline: "GLP-1 receptor agonist, the gold standard for appetite & glucose control",
    description:
      "Semaglutide is a widely studied GLP-1 agonist used for weight management and type 2 diabetes, with strong cardiovascular outcomes data.",
    targets: ["GLP-1"],
    benefits: [
      "Strong appetite suppression",
      "Improved glycemic control",
      "Cardiovascular risk reduction",
      "Sustained weight loss",
    ],
    sideEffects: ["Nausea", "Constipation", "Injection site reactions"],
    commonDose: "0.25 – 2.4 mg / week",
    halfLife: "~7 days",
    studyCount: 214,
    tier: "Free",
    color: "mint",
    mechanism: [
      {
        title: "GLP-1 Receptor Activation",
        description: "Slows gastric emptying and reduces appetite signals from the brain.",
        icon: "brain",
      },
      {
        title: "Insulin Response",
        description: "Enhances glucose-dependent insulin release.",
        icon: "target",
      },
      {
        title: "Cardiometabolic Support",
        description: "Associated with reduced major adverse cardiac events.",
        icon: "shield",
      },
    ],
    research: [
      {
        title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        publisher: "NEJM",
        year: 2021,
        summary:
          "Participants on semaglutide 2.4mg lost 14.9% of body weight vs 2.4% placebo over 68 weeks.",
      },
    ],
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    category: "Metabolic",
    tagline: "Dual GLP-1/GIP agonist with strong weight-loss outcomes",
    description:
      "Tirzepatide activates both GLP-1 and GIP receptors, driving meaningful improvements in weight, A1C, and cardiometabolic markers.",
    targets: ["GLP-1", "GIP"],
    benefits: ["High weight loss", "Glycemic control", "Weight loss maintenance", "Improved lipids"],
    sideEffects: ["Nausea", "Diarrhea", "Decreased appetite"],
    commonDose: "2.5 – 15 mg / week",
    halfLife: "~5 days",
    studyCount: 142,
    tier: "Free",
    color: "blush",
    mechanism: [
      {
        title: "GLP-1 Activation",
        description: "Reduces hunger and stabilizes glucose.",
        icon: "brain",
      },
      {
        title: "GIP Activation",
        description: "Complements GLP-1 with insulin sensitivity effects.",
        icon: "target",
      },
    ],
    research: [
      {
        title: "Tirzepatide Once Weekly for Chronic Weight Management",
        publisher: "NEJM",
        year: 2022,
        summary: "Up to 22.5% mean weight reduction on the 15mg dose at 72 weeks.",
      },
    ],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    category: "Healing",
    tagline: "Body Protection Compound supporting soft-tissue recovery",
    description:
      "BPC-157 is a synthetic peptide derived from gastric juice, studied for its effects on tendon, ligament, and gut lining recovery.",
    targets: ["VEGF", "eNOS"],
    benefits: ["Faster soft-tissue recovery", "Joint comfort", "Gut lining support"],
    sideEffects: ["Limited human data — use cautiously"],
    commonDose: "250 – 500 mcg / day",
    halfLife: "Short (sub-cutaneous)",
    studyCount: 46,
    tier: "Pro",
    color: "amber",
    mechanism: [
      {
        title: "Angiogenesis Support",
        description: "Upregulates VEGF for new blood vessel formation.",
        icon: "target",
      },
      {
        title: "Tendon & Ligament Repair",
        description: "Accelerates fibroblast migration in animal models.",
        icon: "shield",
      },
    ],
    research: [
      {
        title: "BPC-157 on Tendon-to-Bone Healing",
        publisher: "J. Orthopaedic Research",
        year: 2019,
        summary: "Improved tensile strength of healing tendons in rodent models.",
      },
    ],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    category: "Recovery",
    tagline: "Thymosin Beta-4 fragment for recovery and flexibility",
    description:
      "TB-500 is a synthetic version of Thymosin Beta-4 studied for recovery, inflammation modulation, and cellular migration.",
    targets: ["Actin"],
    benefits: ["Accelerated recovery", "Reduced inflammation", "Improved mobility"],
    sideEffects: ["Fatigue", "Flu-like symptoms (rare)"],
    commonDose: "2 – 5 mg / week",
    halfLife: "~2-3 days",
    studyCount: 28,
    tier: "Pro",
    color: "sky",
    mechanism: [
      {
        title: "Actin Regulation",
        description: "Supports cell migration and wound healing.",
        icon: "target",
      },
    ],
    research: [
      {
        title: "Thymosin β4 in Tissue Repair",
        publisher: "Ann NY Acad Sci",
        year: 2012,
        summary: "Evidence of wound-healing, angiogenic, and anti-inflammatory effects.",
      },
    ],
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    category: "Muscle",
    tagline: "Growth-hormone-releasing hormone analog",
    description:
      "CJC-1295 is a GHRH analog paired commonly with Ipamorelin to support pulsatile growth hormone release.",
    targets: ["GHRH"],
    benefits: ["Improved body composition", "Better sleep", "Recovery"],
    sideEffects: ["Water retention", "Injection-site redness"],
    commonDose: "100 – 300 mcg / day",
    halfLife: "~7 days (DAC)",
    studyCount: 52,
    tier: "Expert",
    color: "brand",
    mechanism: [
      {
        title: "GHRH Receptor Activation",
        description: "Stimulates natural GH pulses from the pituitary.",
        icon: "brain",
      },
    ],
    research: [
      {
        title: "Pharmacokinetics of CJC-1295",
        publisher: "J Clin Endocrinol Metab",
        year: 2006,
        summary: "Extended-action analog showed sustained GH/IGF-1 elevation.",
      },
    ],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    category: "Muscle",
    tagline: "Selective ghrelin agonist for clean GH pulses",
    description:
      "Ipamorelin is a selective growth hormone secretagogue without significant cortisol or prolactin elevation.",
    targets: ["GHS-R"],
    benefits: ["Lean muscle support", "Recovery", "Sleep quality"],
    sideEffects: ["Transient flushing", "Hunger"],
    commonDose: "100 – 300 mcg / day",
    halfLife: "~2 hours",
    studyCount: 34,
    tier: "Expert",
    color: "mint",
    mechanism: [
      {
        title: "Ghrelin Receptor Agonism",
        description: "Triggers pulsatile GH release without cortisol spikes.",
        icon: "brain",
      },
    ],
    research: [
      {
        title: "Ipamorelin, the First Selective Growth Hormone Secretagogue",
        publisher: "Eur J Endocrinol",
        year: 1998,
        summary: "Demonstrated GH-specific release with clean safety profile.",
      },
    ],
  },
  {
    slug: "epitalon",
    name: "Epitalon",
    category: "Longevity",
    tagline: "Tetrapeptide studied for telomere and circadian support",
    description:
      "Epitalon is a synthetic tetrapeptide studied in Russian and Eastern European literature for telomerase activation and sleep quality.",
    targets: ["Telomerase"],
    benefits: ["Sleep quality", "Circadian rhythm", "Longevity markers"],
    sideEffects: ["Rare drowsiness"],
    commonDose: "5 – 10 mg cycles",
    halfLife: "Short",
    studyCount: 19,
    tier: "Pro",
    color: "blush",
    mechanism: [
      {
        title: "Telomerase Activation",
        description: "Reported to upregulate telomerase in cellular models.",
        icon: "shield",
      },
    ],
    research: [
      {
        title: "Telomerase Activation by Epitalon",
        publisher: "Bull Exp Biol Med",
        year: 2003,
        summary: "Cellular telomere length maintenance reported in somatic cells.",
      },
    ],
  },
];

export function getPeptide(slug: string) {
  return peptides.find((p) => p.slug === slug);
}

export const categories: { label: string; value: Peptide["category"] }[] = [
  { label: "Metabolic", value: "Metabolic" },
  { label: "Recovery", value: "Recovery" },
  { label: "Muscle", value: "Muscle" },
  { label: "Healing", value: "Healing" },
  { label: "Longevity", value: "Longevity" },
  { label: "Cognitive", value: "Cognitive" },
];
