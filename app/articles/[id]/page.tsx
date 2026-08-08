import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, User, Calendar, ArrowLeft, CheckCircle2, FlaskConical, Lightbulb, BellOff, Target, BarChart3, CircleHelp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/site/article-card';
import { ArticleToc } from '@/components/site/article-toc';
import { AuthenticatedContent } from '@/components/site/authenticated-content';
import { getArticleHeadings } from '@/lib/article-toc';
import HeroBanner from '@/components/medical/herobanner';
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
import { getArticleById, getArticles } from '@/lib/content-api';

const siteUrl = 'https://shama.pk';
const protectedArticleIds = new Set(['m3-l2-notes']);

const urduMonths: Record<string, string> = {
  جنوری: '01',
  فروری: '02',
  مارچ: '03',
  اپریل: '04',
  مئی: '05',
  جون: '06',
  جولائی: '07',
  اگست: '08',
  ستمبر: '09',
  اکتوبر: '10',
  نومبر: '11',
  دسمبر: '12',
};

function getAbsoluteUrl(url: string) {
  return url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
}

function getIsoPublishedDate(date: string) {
  const match = date.trim().match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);
  if (!match) {
    return undefined;
  }

  const [, day, monthName, year] = match;
  const month = urduMonths[monthName];
  return month ? `${year}-${month}-${day.padStart(2, '0')}T00:00:00+05:00` : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const article = await getArticleById(params.id);

  if (!article) {
    return {
      title: 'مضمون نہیں ملا',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteUrl}/articles/${article.id}`;
  const imageUrl = getAbsoluteUrl(article.coverImage);
  const publishedTime = getIsoPublishedDate(article.publishedAt);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'ur_PK',
      url: canonicalUrl,
      siteName: 'شمع.pk',
      title: article.title,
      description: article.excerpt,
      publishedTime,
      authors: [article.author],
      section: article.category,
      images: [{ url: imageUrl, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  };
}

const articleComponents = {
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
};

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [article, allArticles] = await Promise.all([
    getArticleById(params.id),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const related = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const canonicalUrl = `${siteUrl}/articles/${article.id}`;
  const publishedDate = getIsoPublishedDate(article.publishedAt);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [getAbsoluteUrl(article.coverImage)],
    ...(publishedDate ? { datePublished: publishedDate } : {}),
    author: {
      '@type': article.author === 'شمع.pk' ? 'Organization' : 'Person',
      name: article.author,
      url: article.author === 'شمع.pk' ? siteUrl : `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'شمع.pk',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: article.category,
    inLanguage: 'ur-PK',
  };

  const { headingIdByIndex, items: headingItems } = getArticleHeadings(article.content);

  const content = (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/articles">
            <Button variant="ghost" className="mb-6 text-lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              واپس مضامین پر
            </Button>
          </Link>
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            {article.category}
          </Badge>
          <h1 className="mb-6 text-3xl font-nastaliq leading-[1.6] text-black md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-base text-black/80">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {article.id !== 'career-decision-after-matric' && (
        <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-4">
        {article.id === 'm2-l2-notes' ? (
          <HeroBanner />
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-slate-50 shadow-lg">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-auto w-full"
              loading="eager"
            />
          </div>
        )}
        </section>
      )}

      {/* Article Body */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white px-5 py-10 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.55)] sm:px-9 lg:px-12">
            <ArticleToc
              items={headingItems}
              className="hidden lg:fixed lg:bottom-8 lg:left-6 lg:z-40 lg:block lg:w-[286px]"
            />
            <div>
              <article className="space-y-10">
            {article.content.map((section, idx) => {
              if (section.type === 'heading') {
                const headingId = headingIdByIndex.get(idx);
                return (
                  <h2
                    key={idx}
                    id={headingId}
                    className={`mt-12 mb-5 scroll-mt-28 text-3xl font-nastaliq leading-[1.7] md:text-4xl ${headingId ? 'text-[#2F5496]' : 'text-black'}`}
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === 'paragraph') {
                return (
                  <p
                    key={idx}
                    className="text-right text-2xl leading-[2.15] text-black"
                  >
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="border-r-4 border-primary pr-8 py-6 my-10 bg-primary/5 rounded-l-2xl shadow-sm"
                  >
                    <p className="text-2xl text-primary font-nastaliq leading-[2]">
                      {section.text}
                    </p>
                  </blockquote>
                );
              }
              if (section.type === 'callout') {
                const tone = section.tone ?? 'highlight';
                const Icon = tone === 'research' ? FlaskConical : Lightbulb;
                if (section.title?.includes('Card 01')) {
                  return (
                    <div key={idx} className="overflow-hidden rounded-[20px] border border-[#2E7D4A]/20 bg-[#0A1F33] shadow-[0_8px_40px_rgba(10,31,51,0.12)]">
                      <div className="px-5 md:px-10 pt-7 pb-6 text-right">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-4 py-1 font-sans text-[11px] tracking-[0.2em] text-[#2E7D4A]">
                          CARD 01 / DARK NAVY
                        </div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#4CAF7A]/30 bg-[#E8F5E9] px-4 py-1 text-[#2E7D4A] shadow-[0_8px_18px_rgba(76,175,122,0.15)]">
                          <span className="h-2 w-2 rounded-full bg-[#4CAF7A]" />
                          <span className="font-sans text-[11px] font-semibold tracking-[0.18em]">شمع.pk</span>
                        </div>
                        {section.title ? (
                          <h3 className="jameel text-[28px] leading-[1.45] text-white md:text-[38px]">
                            {section.title.replace('Card 01 — ', '')}
                          </h3>
                        ) : null}
                        {section.text ? (
                          <p className="mt-3 jameel text-[20px] leading-[2.05] text-[#F3FFF8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] md:text-[22px]">
                            {section.text}
                          </p>
                        ) : null}
                      </div>
                      <div className="px-5 md:px-10 pb-6">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4CAF7A]/50 to-transparent" />
                        <div className="mt-4 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#4CAF7A]" />
                          <span className="h-2 w-2 rounded-full bg-[#4CAF7A]/60" />
                          <span className="h-2 w-2 rounded-full bg-[#4CAF7A]/30" />
                          <span className="mr-auto inline-flex items-center rounded-full bg-[#E8F5E9] px-3 py-1 font-sans text-[10px] font-semibold tracking-[0.18em] text-[#2E7D4A]">شمع.pk</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (section.title?.includes('Card 02')) {
                  return (
                    <div key={idx} className="overflow-hidden rounded-[20px] border-[1.5px] border-[#2E7D4A]/20 bg-white shadow-[0_8px_40px_rgba(10,31,51,0.06)]">
                      <div className="flex items-center justify-between gap-3 flex-wrap px-5 md:px-10 pt-7 pb-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A1F33] text-white">
                            <Target className="h-5 w-5" />
                          </div>
                          {section.title ? (
                            <h3 className="jameel text-[26px] leading-none text-[#0A1F33] md:text-[36px]">
                              {section.title.replace('Card 02 — ', '')}
                            </h3>
                          ) : null}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#2E7D4A]/20 bg-[#E8F5E9] px-4 py-1 font-sans text-[11px] tracking-[0.2em] text-[#2E7D4A]">
                          CARD 02 / DUAL PATH
                        </div>
                      </div>
                      {section.text ? (
                        <div className="px-5 md:px-10 pb-4 text-right">
                          <p className="jameel text-[20px] leading-[2] text-[#0A1F33] md:text-[22px]">
                            {section.text}
                          </p>
                        </div>
                      ) : null}
                      <div className="px-5 md:px-10 pb-6">
                        <div className="rounded-[14px] border border-[#F0E3AA] bg-[#FFFEF7] px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF3B0] text-[#8A6D00]">
                              <BarChart3 className="h-4 w-4" />
                            </div>
                            <p className="jameel text-[19px] leading-[1.95] text-[#0A1F33] md:text-[21px]">
                              {section.subtitle ?? 'اہم سوال: یہ رسائی نوجوان کو علم و روزگار کی طرف لے جا رہی ہے یا وقت گزاری کی طرف؟'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-2 flex-wrap">
                          <span className="inline-flex items-center rounded-full bg-[#0A1F33] px-3 py-1 font-sans text-[10px] tracking-[0.18em] text-white">شمع.pk</span>
                          <span className="font-sans text-[10px] text-[#0A1F33]/20">ذرائع: PTA, DataReportal 2025</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                const toneClasses = tone === 'research'
                  ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900'
                  : tone === 'tip'
                    ? 'border-orange-200 bg-orange-50/80 text-orange-900'
                    : 'border-primary/20 bg-primary/5 text-foreground';
                return (
                  <div key={idx} className={`rounded-3xl border px-8 py-7 shadow-sm ${toneClasses}`}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
                        <Icon className="h-6 w-6" />
                      </div>
                      {section.title ? (
                        <h3 className="text-2xl font-nastaliq leading-relaxed text-black">{section.title}</h3>
                      ) : null}
                    </div>
                    {section.text ? <p className="text-2xl leading-[2.05] text-black">{section.text}</p> : null}
                  </div>
                );
              }
              if (section.type === 'checklist') {
                return (
                  <div key={idx} className="overflow-hidden rounded-[20px] border border-[#0A1F33]/10 bg-[#FFFEF7] shadow-[0_8px_40px_rgba(10,31,51,0.05)]">
                    <div className="border-b border-[#0A1F33]/5 bg-white px-5 py-6 md:px-10 md:py-8">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-4 py-1 font-sans text-[11px] tracking-[0.2em] text-[#2E7D4A]">
                        CHECKLIST
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#0A1F33] text-white">
                          <CircleHelp className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1 text-right">
                          {section.title ? (
                            <h3 className="jameel text-[26px] font-bold leading-[1.35] text-[#0A1F33] md:text-[36px]">
                              {section.title}
                            </h3>
                          ) : null}
                          {section.text ? (
                            <p className="mt-2 jameel text-[18px] leading-[1.95] text-[#5C6B7A] md:text-[20px]">
                              {section.text}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0 px-4 py-5 md:px-8 md:py-6">
                      {(section.items ?? []).map((item, itemIdx) => {
                        const icons = [Clock, BellOff, Target, BarChart3, CircleHelp];
                        const StepIcon = icons[itemIdx % icons.length];
                        const backgrounds = ['#FFFEF7', '#F6FBF7'];
                        const borderColors = ['rgba(240,224,173,0.95)', 'rgba(197,231,211,0.95)'];
                        return (
                          <div
                            key={itemIdx}
                            className="relative mb-4 overflow-hidden rounded-[14px] px-4 py-4 md:px-5 md:py-5"
                            style={{ backgroundColor: backgrounds[itemIdx % backgrounds.length], border: `1px solid ${borderColors[itemIdx % borderColors.length]}` }}
                          >
                            <div className="flex items-start gap-3 md:gap-4">
                              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0A1F33]/10 bg-white text-[#2E7D4A]">
                                <StepIcon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1 text-right">
                                <p className="jameel text-[19px] leading-[2.05] text-[#0A1F33] md:text-[22px]">
                                  {item}
                                </p>
                              </div>
                              <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-[#2E7D4A] font-sans text-[18px] font-bold text-white shadow-[0_10px_22px_rgba(46,125,74,0.25)]">
                                {itemIdx + 1}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="px-4 md:px-10 py-5 bg-[#FFFEF7] border-t border-[#2E7D4A]/10 flex items-start md:items-center gap-3 flex-wrap">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2E7D4A] text-white">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="jameel flex-1 min-w-0 rounded-[12px] border border-[#2E7D4A]/10 bg-[#E8F5E9] px-4 py-2 text-[17px] leading-[1.85] text-[#0A1F33] md:text-[19px]">
                        {section.footer ?? 'فرق نیت، وقت کی حد اور مقصد کے واضح ہونے سے پیدا ہوتا ہے۔'}
                      </p>
                      <span className="mr-auto hidden rounded-full bg-[#0A1F33] px-3 py-1 font-sans text-[10px] tracking-[0.18em] text-white md:block">شمع.pk</span>
                    </div>
                  </div>
                );
              }
              if (section.type === 'image') {
                return (
                  <div
                    key={idx}
                    className="my-10 overflow-hidden rounded-3xl border bg-card shadow-lg"
                  >
                    <div className="bg-slate-50">
                      <img
                        src={section.src ?? ''}
                        alt={section.alt ?? ''}
                        className="h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                    {section.alt ? (
                      <div className="border-t bg-white px-6 py-4">
                        <p className="text-xl leading-relaxed text-black/85">{section.alt}</p>
                      </div>
                    ) : null}
                  </div>
                );
              }
              if (section.type === 'table') {
                return (
                  <div key={idx} className="my-10 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
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
              if (section.type === 'component' && section.componentKey) {
                const Component = articleComponents[section.componentKey];

                if (!Component) {
                  return null;
                }

                return (
                  <div key={idx} className="my-10 flex justify-center">
                    <Component />
                  </div>
                );
              }
              return null;
              })}
          </article>

              {/* Author box */}
              <div className="mt-16 rounded-3xl border bg-secondary/30 p-8 flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl text-black">{article.author}</p>
                  <p className="text-xl text-black/70">
                    بانی شمع.pk
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-primary/15 bg-primary/5 p-6 text-center sm:p-8">
                <h2 className="text-2xl font-nastaliq leading-relaxed text-foreground sm:text-3xl">
                  اپنے کیریئر کے اگلے قدم کے لیے تیار ہیں؟
                </h2>
                <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                  نوجوانوں کے لیے مکمل کیریئر رہنمائی کورس اردو میں دیکھیں۔
                </p>
                <Button asChild size="lg" className="mt-6 text-lg">
                  <Link href="/course">
                    کورس دیکھیں
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 lg:hidden">
                <ArticleToc items={headingItems} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-nastaliq text-foreground mb-8">
              متعلقہ مضامین
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );

  if (protectedArticleIds.has(article.id)) {
    return <AuthenticatedContent>{content}</AuthenticatedContent>;
  }

  return content;
}
