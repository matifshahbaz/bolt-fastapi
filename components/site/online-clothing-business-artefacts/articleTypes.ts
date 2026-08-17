export type ArticleMeta = {
  title: string;
  subtitle: string;
  author: string;
  brand: string;
  published: string;
};

export type RichTextPart = {
  text: string;
  url?: string;
};

export type ReferenceLink = {
  title: string;
  url: string;
  description?: string;
};

export type ProfitRow = {
  label: string;
  amount: number;
  kind: "income" | "cost" | "profit";
};

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "richParagraph"; parts: RichTextPart[] }
  | {
      type: "callout";
      label: string;
      text: string;
      tone: "story" | "decision";
      source?: { label: string; url: string };
    }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "links"; items: ReferenceLink[] }
  | { type: "screenshot"; text: string }
  | { type: "profitTable"; rows: ProfitRow[] };

export type VisualKey =
  | "decisionRoadmap"
  | "leanBusinessModel"
  | "supplierScorecard"
  | "salesFunnel"
  | "orderChecklist"
  | "profitBreakdown"
  | "sixMonthJourney"
  | "decisionDiagnostic"
  | "businessSystem";

export type ArticleSubsection = {
  title: string;
  visual?: VisualKey | null;
  blocks: ArticleBlock[];
};

export type ArticleSection = {
  id: string;
  number: number;
  title: string;
  intro: ArticleBlock[];
  subsections: ArticleSubsection[];
};
