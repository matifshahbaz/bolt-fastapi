import type { ReactNode } from "react";
import styles from "./UniversityArtefacts.module.css";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  componentId: string;
  children: ReactNode;
};

export function ArtifactShell({ eyebrow, title, description, componentId, children }: Props) {
  return (
    <section className={styles.shell} dir="rtl" aria-labelledby={`${componentId}-title`}>
      <div className={styles.colorRail} aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <header className={styles.shellHeader}>
        <div className={styles.brandLine}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <span className={styles.brand} dir="ltr">shama.pk</span>
        </div>
        <h2 id={`${componentId}-title`}>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.shellBody}>{children}</div>
    </section>
  );
}
