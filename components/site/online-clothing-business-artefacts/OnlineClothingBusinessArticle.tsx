"use client";

import { articleMeta, articleReferences, articleSections } from "./articleContent";
import type { ArticleBlock, ProfitRow } from "./articleTypes";
import styles from "./OnlineClothingBusinessArticle.module.css";
import OnlineClothingHero from "./components/OnlineClothingHero";
import ArticleVisual from "./components/infographics/ArticleVisual";

export type OnlineClothingBusinessArticleProps = {
  showReferences?: boolean;
  showScreenshotNotes?: boolean;
  className?: string;
};

function formatAmount(amount: number) {
  const sign = amount < 0 ? "– " : "";
  return `${sign}Rs. ${Math.abs(amount).toLocaleString("en-PK")}`;
}

function ProfitTable({ rows }: { rows: ProfitRow[] }) {
  return (
    <div className={styles.tableWrap} role="region" aria-label="فرضی آرڈر کے منافع کا حساب" tabIndex={0}>
      <table className={styles.profitTable}>
        <thead><tr><th>تفصیل</th><th>رقم</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr className={row.kind === "profit" ? styles.profitResult : undefined} key={row.label}>
              <td>{row.label}</td>
              <td dir="ltr">{formatAmount(row.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block, showScreenshotNotes }: { block: ArticleBlock; showScreenshotNotes: boolean }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "richParagraph":
      return (
        <p>
          {block.parts.map((part, index) => part.url
            ? <a href={part.url} target="_blank" rel="noopener noreferrer" key={`${part.url}-${index}`}>{part.text}</a>
            : <span key={`${part.text}-${index}`}>{part.text}</span>)}
        </p>
      );
    case "callout":
      return (
        <aside className={`${styles.callout} ${block.tone === "decision" ? styles.decisionCallout : styles.storyCallout}`}>
          <strong>{block.label}</strong>
          <span>{block.text}</span>
          {block.source && <a href={block.source.url} target="_blank" rel="noopener noreferrer">{block.source.label}</a>}
        </aside>
      );
    case "bullets":
      return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "numbered":
      return <ol>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>;
    case "links":
      return (
        <div className={styles.resourceLinks}>
          {block.items.map((item) => (
            <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.url}>
              <strong>{item.title}</strong><span>{item.description}</span>
            </a>
          ))}
        </div>
      );
    case "screenshot":
      return showScreenshotNotes ? <aside className={styles.screenshotNote}><strong>اسکرین شاٹ:</strong><span>{block.text}</span></aside> : null;
    case "profitTable":
      return <ProfitTable rows={block.rows} />;
  }
}

export default function OnlineClothingBusinessArticle({
  showReferences = true,
  showScreenshotNotes = false,
  className = "",
}: OnlineClothingBusinessArticleProps) {
  return (
    <main className={`${styles.page} ${className}`} dir="rtl" lang="ur">
      <div className={styles.heroWrap}><OnlineClothingHero /></div>

      <article className={styles.article}>
        <div className={styles.metaLine}>
          <span>تحریر: {articleMeta.author}</span>
          <span>{articleMeta.published}</span>
          <span>{articleMeta.brand}</span>
        </div>

        <nav className={`${styles.toc} online-clothing-business-embedded-toc`} aria-label="مضمون کے مرکزی حصے">
          <strong>اس سفر کے 6 بڑے موڑ</strong>
          <ol>
            {articleSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
          </ol>
        </nav>

        {articleSections.map((section) => (
          <section className={styles.section} id={section.id} key={section.id}>
            <header className={styles.sectionHeading}>
              <span>{String(section.number).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
            </header>

            <div className={styles.sectionIntro}>
              {section.intro.map((block, index) => <Block block={block} showScreenshotNotes={showScreenshotNotes} key={`${block.type}-${index}`} />)}
            </div>

            {section.subsections.map((subsection) => {
              const visualAfter = Math.min(1, subsection.blocks.length - 1);
              return (
                <section className={styles.subsection} key={subsection.title}>
                  <h3>{subsection.title}</h3>
                  {subsection.blocks.map((block, index) => (
                    <div className={styles.blockGroup} key={`${subsection.title}-${block.type}-${index}`}>
                      <Block block={block} showScreenshotNotes={showScreenshotNotes} />
                      {subsection.visual && index === visualAfter && <ArticleVisual visual={subsection.visual} />}
                    </div>
                  ))}
                </section>
              );
            })}
          </section>
        ))}

        {showReferences && (
          <section className={styles.references} aria-labelledby="article-references">
            <h2 id="article-references">حوالہ جاتی لنکس اور حقیقی سیلر تجربات</h2>
            <div className={styles.referenceGrid}>
              {articleReferences.map((reference) => (
                <a href={reference.url} target="_blank" rel="noopener noreferrer" key={reference.url}>
                  <strong>{reference.title}</strong>
                  {reference.description && <span>{reference.description}</span>}
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
