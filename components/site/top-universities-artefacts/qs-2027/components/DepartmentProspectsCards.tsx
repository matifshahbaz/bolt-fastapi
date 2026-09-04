import {
  departmentCards,
  departmentGroups,
  type DepartmentCard,
} from "../data/articleArtifactsData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./Artifacts.module.css";

type DepartmentProspectsCardsProps = {
  group: keyof typeof departmentGroups;
  componentId: string;
  title: string;
  description: string;
  tone: "navy" | "cobalt" | "violet" | "teal";
};

function getCards(group: keyof typeof departmentGroups): DepartmentCard[] {
  const ids = departmentGroups[group] as readonly string[];
  return ids
    .map((id) => departmentCards.find((card) => card.universityId === id))
    .filter((card): card is DepartmentCard => Boolean(card));
}

export function DepartmentProspectsCards({
  group,
  componentId,
  title,
  description,
  tone,
}: DepartmentProspectsCardsProps) {
  return (
    <ArtifactShell
      eyebrow="نمایاں شعبے اور عملی راستے"
      title={title}
      description={description}
      componentId={componentId}
      tone={tone}
    >
      <div className={styles.departmentGrid}>
        {getCards(group).map((card, cardIndex) => (
          <article className={styles.departmentCard} key={card.universityId}>
            <header className={styles.departmentCardHeader}>
              <span className={styles.departmentNumber} aria-hidden="true">
                {String(cardIndex + 1).padStart(2, "0")}
              </span>
              <div>
                <span className={styles.departmentShort} dir="ltr">{card.shortName}</span>
                <h3>{card.university}</h3>
              </div>
            </header>

            <div className={styles.fieldList}>
              {card.fields.map((field, index) => (
                <section className={styles.fieldBand} key={field.field}>
                  <div className={styles.fieldTitleRow}>
                    <span>{index + 1}</span>
                    <h4>{field.field}</h4>
                  </div>
                  <ul>
                    {field.routes.map((route) => <li key={route}>{route}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className={styles.editorialNote}>
        یہ کارڈز الگ مضمون کی رینکنگ نہیں بناتے؛ ان کا مقصد مضمون میں بیان کردہ ادارہ جاتی قوت اور ممکنہ کیریئر راستوں کو مختصر کرنا ہے۔
      </p>
    </ArtifactShell>
  );
}
