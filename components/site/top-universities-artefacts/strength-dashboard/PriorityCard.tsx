import type { Priority } from "../data/universities";
import styles from "./UniversityStrengthDashboard.module.css";

type PriorityCardProps = {
  priority: Priority;
  featured?: boolean;
};

export default function PriorityCard({ priority, featured = false }: PriorityCardProps) {
  return (
    <section
      className={`${styles.priorityCard} ${featured ? styles.featuredPriority : ""}`}
      data-level={priority.level}
      aria-label={`${priority.label}: ${priority.title}`}
    >
      <div className={styles.priorityTopline}>
        <span className={styles.priorityNumber}>{priority.level}</span>
        <span className={styles.priorityLabel}>{priority.label}</span>
      </div>
      <h3>{priority.title}</h3>
      <p>{priority.detail}</p>
    </section>
  );
}
