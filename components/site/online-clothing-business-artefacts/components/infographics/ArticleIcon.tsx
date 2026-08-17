export type ArticleIconName =
  | "idea"
  | "model"
  | "supplier"
  | "market"
  | "order"
  | "struggle"
  | "system"
  | "mobile"
  | "message"
  | "check"
  | "package"
  | "truck"
  | "money"
  | "return"
  | "clock"
  | "calculator"
  | "chart"
  | "decision"
  | "fabric"
  | "security";

type Props = {
  name: ArticleIconName;
  className?: string;
};

export default function ArticleIcon({ name, className }: Props) {
  const shared = {
    className,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "idea":
      return <svg {...shared}><path d="M21 39c-6-4-10-11-9-18C13 9 22 3 32 3s19 7 20 18c1 7-3 14-9 18-3 2-4 5-4 8H25c0-3-1-6-4-8Z" fill="currentColor" opacity=".18"/><path d="M21 39c-6-4-10-11-9-18C13 9 22 3 32 3s19 7 20 18c1 7-3 14-9 18-3 2-4 5-4 8H25c0-3-1-6-4-8ZM25 54h14M28 61h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M26 25l5 5 9-12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "model":
      return <svg {...shared}><rect x="8" y="8" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="3"/><rect x="39" y="8" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="3"/><rect x="23" y="39" width="18" height="17" rx="4" stroke="currentColor" strokeWidth="3"/><path d="M25 17h14M17 25v7h15v7M47 25v7H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>;
    case "supplier":
      return <svg {...shared}><path d="M7 56V28l15-8v10l15-9v9l20-10v36H7Z" fill="currentColor" opacity=".2"/><path d="M7 56V28l15-8v10l15-9v9l20-10v36H7Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="M15 12h8v12M43 12h8v12M16 44h7M29 44h7M43 44h7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>;
    case "market":
      return <svg {...shared}><path d="M9 26h46l-5-15H14L9 26Z" fill="currentColor" opacity=".18"/><path d="M9 26h46l-5-15H14L9 26ZM13 26v30h38V26M24 56V38h16v18" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="M9 26c0 5 8 7 12 1 4 6 11 6 15 0 4 6 12 5 15-1" stroke="currentColor" strokeWidth="3"/></svg>;
    case "order":
      return <svg {...shared}><rect x="12" y="8" width="40" height="48" rx="7" fill="currentColor" opacity=".16"/><rect x="12" y="8" width="40" height="48" rx="7" stroke="currentColor" strokeWidth="3"/><path d="m21 30 7 7 15-17M22 46h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "struggle":
      return <svg {...shared}><path d="M8 49 21 36l9 7 16-25 10 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 56h50M46 18h10v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><circle cx="21" cy="36" r="4" fill="currentColor"/><circle cx="30" cy="43" r="4" fill="currentColor"/></svg>;
    case "system":
      return <svg {...shared}><circle cx="32" cy="32" r="10" fill="currentColor" opacity=".2"/><path d="m25 7 2 7a21 21 0 0 0-7 4l-7-2-6 11 6 5v8l-6 5 6 11 7-2a21 21 0 0 0 7 4l2 7h12l2-7a21 21 0 0 0 7-4l7 2 6-11-6-5v-8l6-5-6-11-7 2a21 21 0 0 0-7-4l-2-7H25Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="3"/></svg>;
    case "mobile":
      return <svg {...shared}><rect x="16" y="4" width="32" height="56" rx="8" fill="currentColor" opacity=".14"/><rect x="16" y="4" width="32" height="56" rx="8" stroke="currentColor" strokeWidth="3"/><path d="M26 11h12M28 52h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>;
    case "message":
      return <svg {...shared}><path d="M8 12h48v34H28L16 56V46H8V12Z" fill="currentColor" opacity=".16"/><path d="M8 12h48v34H28L16 56V46H8V12Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="M18 25h28M18 34h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>;
    case "check":
      return <svg {...shared}><circle cx="32" cy="32" r="26" fill="currentColor" opacity=".15"/><circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="3"/><path d="m18 33 9 9 20-22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "package":
      return <svg {...shared}><path d="m8 20 24-12 24 12v31L32 60 8 51V20Z" fill="currentColor" opacity=".18"/><path d="m8 20 24-12 24 12v31L32 60 8 51V20Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="m8 20 24 11 24-11M32 31v29M22 13l24 12v11" stroke="currentColor" strokeWidth="3"/></svg>;
    case "truck":
      return <svg {...shared}><path d="M6 17h33v30H6zM39 27h11l8 10v10H39z" fill="currentColor" opacity=".18"/><path d="M6 17h33v30H6zM39 27h11l8 10v10H39z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><circle cx="18" cy="49" r="6" fill="currentColor"/><circle cx="50" cy="49" r="6" fill="currentColor"/><path d="M45 32v7h10" stroke="currentColor" strokeWidth="3"/></svg>;
    case "money":
      return <svg {...shared}><ellipse cx="24" cy="43" rx="16" ry="7" fill="currentColor" opacity=".22"/><path d="M8 28v15c0 4 7 7 16 7s16-3 16-7V28" stroke="currentColor" strokeWidth="3"/><ellipse cx="24" cy="28" rx="16" ry="7" stroke="currentColor" strokeWidth="3"/><path d="M46 13v30M40 19h10c5 0 5 8 0 8H40M42 35h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>;
    case "return":
      return <svg {...shared}><path d="M18 18h27c8 0 13 6 13 14s-5 14-13 14H18" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/><path d="m24 9-9 9 9 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><rect x="25" y="28" width="19" height="19" rx="3" fill="currentColor" opacity=".2"/></svg>;
    case "clock":
      return <svg {...shared}><circle cx="32" cy="34" r="24" fill="currentColor" opacity=".16"/><circle cx="32" cy="34" r="24" stroke="currentColor" strokeWidth="3"/><path d="M32 21v15l10 7M25 6h14" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
    case "calculator":
      return <svg {...shared}><rect x="14" y="5" width="36" height="54" rx="7" fill="currentColor" opacity=".16"/><rect x="14" y="5" width="36" height="54" rx="7" stroke="currentColor" strokeWidth="3"/><rect x="20" y="12" width="24" height="11" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M22 31h3M31 31h3M40 31h3M22 40h3M31 40h3M40 40h3M22 49h3M31 49h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
    case "chart":
      return <svg {...shared}><path d="M9 54V10M9 54h46" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M17 44V33M28 44V22M39 44V28M50 44V13" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>;
    case "decision":
      return <svg {...shared}><path d="M32 58V20M32 28 14 12M32 28l18-16" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><path d="m14 12 1 11M14 12l11 1M50 12l-1 11M50 12l-11 1" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
    case "fabric":
      return <svg {...shared}><path d="M12 17c6-7 14-8 20-3l19 17c5 4 3 11-3 13L21 54c-7 2-13-4-10-11l8-17" fill="currentColor" opacity=".18"/><path d="M12 17c6-7 14-8 20-3l19 17c5 4 3 11-3 13L21 54c-7 2-13-4-10-11l8-17" stroke="currentColor" strokeWidth="3"/><path d="M20 20l27 23M16 30l20 17M29 13l22 20" stroke="currentColor" strokeWidth="2" opacity=".7"/></svg>;
    case "security":
      return <svg {...shared}><path d="M32 5 53 13v17c0 14-8 24-21 30C19 54 11 44 11 30V13L32 5Z" fill="currentColor" opacity=".16"/><path d="M32 5 53 13v17c0 14-8 24-21 30C19 54 11 44 11 30V13L32 5Z" stroke="currentColor" strokeWidth="3"/><path d="m21 31 7 7 15-17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
}
