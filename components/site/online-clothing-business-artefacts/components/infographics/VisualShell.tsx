"use client";

import type { ReactNode } from "react";
import styles from "./Infographics.module.css";

type Props = {
  title: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function VisualShell({ title, kicker, children, className = "", ariaLabel }: Props) {
  return (
    <figure className={`${styles.visual} ${className}`} dir="rtl" aria-label={ariaLabel ?? title}>
      <figcaption className={styles.visualHeading}>
        {kicker && <span>{kicker}</span>}
        <strong>{title}</strong>
      </figcaption>
      {children}
      <div className={styles.visualBrand}>shama.pk</div>
    </figure>
  );
}

