import type { University } from "../data/universities";
import styles from "./UniversityStrengthDashboard.module.css";

type UniversitySelectorProps = {
  universities: University[];
  activeRank: number;
  onSelect: (rank: number) => void;
};

export default function UniversitySelector({ universities, activeRank, onSelect }: UniversitySelectorProps) {
  return (
    <nav className={styles.universitySelector} aria-label="یونیورسٹی منتخب کریں">
      {universities.map((university) => {
        const selected = university.rank === activeRank;
        return (
          <button
            type="button"
            key={university.rank}
            className={styles.universityButton}
            data-selected={selected}
            aria-pressed={selected}
            onClick={() => onSelect(university.rank)}
          >
            <span className={styles.selectorRank}>#{String(university.rank).padStart(2, "0")}</span>
            <span>{university.shortName}</span>
          </button>
        );
      })}
    </nav>
  );
}
