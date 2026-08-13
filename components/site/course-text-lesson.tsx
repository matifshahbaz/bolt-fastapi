'use client';

import Image from 'next/image';
import { CheckCircle2, FlaskConical, Lightbulb } from 'lucide-react';
import type { CourseLesson, ArticleSection } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArticleToc } from '@/components/site/article-toc';
import { getArticleHeadings } from '@/lib/article-toc';
import {
  AlternativeFields,
  BenefitsChallenges,
  CompetitionInfographic,
  FinancialROI,
  FourStagesTimeline,
} from '@/components/medical';
import {
  BusinessImpactBlue,
  EngineeringFieldsBlue,
  HeroBannerBlue,
  RoadmapCareerBlue,
  RoadmapSkillsBlue,
  SalaryGrowthBlue,
} from '@/components/engineering';
import {
  CareerTabs,
  Hero,
  IkigaiDiagram,
  PersonalityFooter,
  PersonalitySection,
  SwotGrid,
  Tameed,
  Timeline,
} from '@/components/career-personality';
import {
  GeminiConfusion,
  GeminiDetailed,
  GeminiPressure,
} from '@/components/career-decisions';
import {
  FakeJobsOverseas,
  FakeSuccessHeroes,
  FinalMessage,
  FraudWarningSigns,
  FreelancingReality,
  GamblingTradingTrap,
  LectureTitleHero,
  NetworkMarketingTrap,
  OnlineEarningDreams,
  SafetyTips,
} from '@/components/lecture-2-scams';
import {
  ComputerScienceCareerInfographic,
  ComputerScienceITBanner,
} from '@/components/computer-science';
import {
  BusinessMyths,
  LearningPath,
  LowCapitalStart,
  PracticalStartSteps,
  RealisticBalance,
  SmallRisk,
  TrustCompass,
} from '@/components/entrepreneurship';
import {
  BusinessCaseHeroBanner,
  BusinessCaseVsPlan,
  CommonMistakes,
  CustomerMarketEdge,
  FinancialSnapshot,
  NineStepsTimeline,
  OnePageTemplate,
  RisksMitigation,
  ThirtyDayPlan,
  UniversalExample,
} from '@/components/business-case';
import {
  FraudAlert,
  FundingSourcesComparison,
  PitchingChecklist,
  TheFundingLadder,
} from '@/components/startup-finance';
import {
  AdviceCost,
  ScopeDecision,
  ShamaArticleHeroBanner,
} from '@/components/career-after-matric';
import {
  SalesClosing,
  SalesFastGrowth,
  SalesHero,
  SalesOpenDoor,
  SalesShameReasons,
} from '@/components/sales-function';
import CvVisualQuote from '@/components/cv-mistakes/CvVisualQuote';
import LizRyanQuote from '@/components/cv-mistakes/LizRyanQuote';
import Mistake5Infographic from '@/components/cv-mistakes/Mistake5Infographic';

type CourseTextLessonProps = {
  lesson: CourseLesson;
  completed: boolean;
  isLoading: boolean;
  onMarkComplete: () => void;
};

const lessonComponents = {
  CompetitionInfographic,
  FourStagesTimeline,
  BenefitsChallenges,
  FinancialROI,
  AlternativeFields,
  HeroBannerBlue,
  EngineeringFieldsBlue,
  SalaryGrowthBlue,
  RoadmapCareerBlue,
  RoadmapSkillsBlue,
  BusinessImpactBlue,
  Hero,
  Tameed,
  CareerTabs,
  PersonalitySection,
  IkigaiDiagram,
  SwotGrid,
  timeline: Timeline,
  Footer: PersonalityFooter,
  GeminiConfusion,
  GeminiPressure,
  GeminiDetailed,
  LectureTitleHero,
  OnlineEarningDreams,
  FraudWarningSigns,
  FakeJobsOverseas,
  NetworkMarketingTrap,
  GamblingTradingTrap,
  FakeSuccessHeroes,
  FreelancingReality,
  SafetyTips,
  FinalMessage,
  ComputerScienceITBanner,
  ComputerScienceCareerInfographic,
  BusinessMyths,
  LearningPath,
  LowCapitalStart,
  PracticalStartSteps,
  RealisticBalance,
  SmallRisk,
  TrustCompass,
  BusinessCaseHeroBanner,
  BusinessCaseVsPlan,
  NineStepsTimeline,
  CustomerMarketEdge,
  FinancialSnapshot,
  RisksMitigation,
  ThirtyDayPlan,
  CommonMistakes,
  OnePageTemplate,
  UniversalExample,
  TheFundingLadder,
  FraudAlert,
  FundingSourcesComparison,
  PitchingChecklist,
  ShamaArticleHeroBanner,
  ScopeDecision,
  AdviceCost,
  SalesHero,
  SalesShameReasons,
  SalesOpenDoor,
  SalesFastGrowth,
  SalesClosing,
  CvVisualQuote,
  LizRyanQuote,
  Mistake5Infographic,
};

export function CourseTextLesson({ lesson, completed, isLoading, onMarkComplete }: CourseTextLessonProps) {
  const article = lesson.article;

  if (!article) {
    return null;
  }

  const { headingIdByIndex, items: headingItems } = getArticleHeadings(article.content);

  return (
    <div className="bg-slate-100 py-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white px-5 py-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.55)] sm:px-8 lg:px-12">
        <ArticleToc
          items={headingItems}
          className="hidden lg:fixed lg:bottom-8 lg:left-6 lg:z-40 lg:block lg:w-[286px]"
        />
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">متن سبق</span>
          <span>{lesson.duration}</span>
          <span>{completed ? 'مکمل' : 'ان پڑھا'}</span>
        </div>

        <h3 className="mb-4 text-3xl font-nastaliq leading-[1.6] text-[#2F5496] md:text-4xl">
          {lesson.title}
        </h3>
        <p className="mb-8 text-lg leading-relaxed text-black">{article.excerpt}</p>

        <div className="mb-8 lg:hidden">
          <ArticleToc items={headingItems} />
        </div>

        {article.coverImage ? (
          <div className="mb-8 overflow-hidden rounded-3xl border bg-card shadow-lg">
            <div className="relative aspect-video">
              <Image src={article.coverImage} alt={lesson.title} fill className="object-cover" />
            </div>
          </div>
        ) : null}

        <LessonArticleBody sections={article.content} headingIdByIndex={headingIdByIndex} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            یہ مواد صرف enrolled students کے لیے ہے اور بعد میں اصل article میں replace کیا جا سکتا ہے۔
          </p>
          <Button onClick={onMarkComplete} disabled={isLoading || completed}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {completed ? 'سبق مکمل ہو چکا ہے' : 'سبق مکمل کریں'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function LessonArticleBody({
  sections,
  headingIdByIndex,
}: {
  sections: ArticleSection[];
  headingIdByIndex: Map<number, string>;
}) {
  return (
    <div className="space-y-10">
      {sections.map((section, index) => {
        if (section.type === 'heading') {
          const headingId = headingIdByIndex.get(index);
          return (
            <h4
              key={index}
              id={headingId}
              className={`mt-10 scroll-mt-28 text-2xl font-nastaliq leading-[1.7] md:text-3xl ${headingId ? 'text-[#2F5496]' : 'text-black'}`}
            >
              {section.text}
            </h4>
          );
        }
        if (section.type === 'paragraph') {
          return (
            <p key={index} className="text-right text-2xl leading-[2.15] text-black">
              {section.text}
            </p>
          );
        }
        if (section.type === 'quote') {
          return (
            <blockquote key={index} className="border-r-4 border-primary pr-8 py-6 my-8 bg-primary/5 rounded-l-2xl shadow-sm">
              <p className="text-2xl text-black font-nastaliq leading-[2]">{section.text}</p>
            </blockquote>
          );
        }
        if (section.type === 'callout') {
          const tone = section.tone ?? 'highlight';
          const Icon = tone === 'research' ? FlaskConical : Lightbulb;
          const toneClasses = tone === 'research'
            ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900'
            : tone === 'tip'
              ? 'border-orange-200 bg-orange-50/80 text-orange-900'
              : 'border-primary/20 bg-primary/5 text-foreground';
          return (
            <div key={index} className={`rounded-3xl border px-8 py-7 shadow-sm ${toneClasses}`}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
                  <Icon className="h-6 w-6" />
                </div>
                {section.title ? (
                  <h5 className="text-2xl font-nastaliq leading-relaxed text-black">{section.title}</h5>
                ) : null}
              </div>
              {section.text ? <p className="text-2xl leading-[2.05] text-black">{section.text}</p> : null}
            </div>
          );
        }
        if (section.type === 'checklist') {
          return (
            <div key={index} className="rounded-3xl border border-primary/15 bg-white p-8 shadow-sm">
              {section.title ? (
                <h5 className="mb-5 text-3xl font-nastaliq leading-relaxed text-black">{section.title}</h5>
              ) : null}
              <div className="space-y-4">
                {(section.items ?? []).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-4 rounded-2xl bg-secondary/40 px-5 py-4">
                    <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-primary" />
                    <p className="text-2xl leading-[1.95] text-black">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        if (section.type === 'table') {
          return (
            <div key={index} className="my-10 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="min-w-[640px] w-full border-collapse bg-white text-right">
                {section.headers?.length ? (
                  <thead className="bg-[#2F5496] text-white">
                    <tr>
                      {section.headers.map((header, headerIndex) => (
                        <th key={headerIndex} className="border-b border-white/20 px-5 py-4 text-xl font-nastaliq leading-relaxed">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {(section.rows ?? []).map((row, rowIndex) => (
                    <tr key={rowIndex} className="even:bg-slate-50">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border-b border-slate-200 px-5 py-4 text-xl leading-[1.8] text-black">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (section.type === 'image') {
          return (
            <div key={index} className="my-10 overflow-hidden rounded-3xl border bg-card shadow-lg">
              <div className="bg-slate-50">
                <img src={section.src ?? ''} alt={section.alt ?? ''} className="h-auto w-full" loading="lazy" />
              </div>
              {section.alt ? (
                <div className="border-t bg-white px-6 py-4">
                  <p className="text-xl leading-relaxed text-black/85">{section.alt}</p>
                </div>
              ) : null}
            </div>
          );
        }
        if (section.type === 'component' && section.componentKey) {
          const Component = lessonComponents[section.componentKey];
          if (!Component) {
            return null;
          }
          return (
            <div key={index} className="my-10 flex justify-center">
              <Component />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
