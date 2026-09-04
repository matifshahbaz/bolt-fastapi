import { universityRanks } from "../data/articleArtifactsData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./Artifacts.module.css";

export function PakistanQsRankingGrid2027() {
  const podium = universityRanks.slice(0, 3);
  const rest = universityRanks.slice(3);
  const podiumOrder = [podium[1], podium[0], podium[2]];

  return (
    <ArtifactShell
      eyebrow="QS World University Rankings 2027"
      title="پاکستان کی ٹاپ 10 یونیورسٹیاں — ایک نظر میں"
      description="پاکستانی پوزیشن، عالمی رینک اور ادارے کا نام ایک ہی نظر میں۔ دسویں پوزیشن مشترکہ ہے، اس لیے 11 ادارے دکھائے گئے ہیں۔"
      componentId="PakistanQsRankingGrid2027"
      tone="vivid"
    >
      <div className={styles.podiumRow}>
        {podiumOrder.map((item) => (
          <div key={item.id} className={`${styles.podiumCard} ${styles[`place_${item.pakistanRank}`]}`}>
            <span className={styles.podiumBadge} aria-label={`پاکستانی پوزیشن ${item.pakistanRank}`}>{item.pakistanRank}</span>
            <span className={styles.podiumShort} dir="ltr">{item.shortName}</span>
            <h3>{item.nameUrdu}</h3>
            <small>{item.city}</small>
            <div className={styles.podiumWorld}>
              <span>عالمی رینک</span>
              <strong dir="ltr">{item.worldRank}</strong>
            </div>
          </div>
        ))}
      </div>

      <ol className={styles.rankGrid} aria-label="پاکستانی یونیورسٹیوں کی QS 2027 ترتیب، چوتھی سے گیارہویں پوزیشن تک">
        {rest.map((item, index) => (
          <li
            key={item.id}
            className={`${styles.rankCard} ${styles[`accent_${item.accent}`]}`}
          >
            <div className={styles.rankNumber} aria-label={`پاکستانی پوزیشن ${item.pakistanRank}`}>
              <span>پاکستان میں</span>
              <strong>{item.pakistanRank}</strong>
            </div>
            <div className={styles.rankIdentity}>
              <span className={styles.rankShort} dir="ltr">{item.shortName}</span>
              <h3>{item.nameUrdu}</h3>
              <small>{item.city}</small>
            </div>
            <div className={styles.worldRankBox}>
              <span>عالمی رینک</span>
              <strong dir="ltr">{item.worldRank}</strong>
            </div>
            <span className={styles.cardIndex} aria-hidden="true">{String(index + 4).padStart(2, "0")}</span>
          </li>
        ))}
      </ol>
      <footer className={styles.dataFooter}>
        <span>ماخذ: QS World University Rankings 2027</span>
        <span>تحقیق: 24 اگست 2026</span>
      </footer>
    </ArtifactShell>
  );
}
