import type { ReactNode } from "react";
import styles from "./Artifacts.module.css";

type ArtifactShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  componentId: string;
  children: ReactNode;
  tone?: "navy" | "cobalt" | "violet" | "teal" | "vivid";
};

export function ArtifactShell({
  eyebrow,
  title,
  description,
  componentId,
  children,
  tone = "navy",
}: ArtifactShellProps) {
  return (
    <section
      className={`${styles.artifact} ${styles[`tone_${tone}`]}`}
      dir="rtl"
      aria-labelledby={`${componentId}-title`}
      data-component-id={componentId}
    >
      <header className={styles.artifactHeader}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id={`${componentId}-title`}>{title}</h2>
          <p>{description}</p>
        </div>
        <a className={styles.brand} href="https://shama.pk" dir="ltr">
          shama.pk
        </a>
      </header>
      <div className={styles.artifactBody}>{children}</div>
    </section>
  );
}
