import { feeAdmissionRecords, rankingResearchDate } from "../data/articleArtifactsData";
import { ArtifactShell } from "./ArtifactShell";
import styles from "./Artifacts.module.css";

function RankStack({ pakistanRank, worldRank }: { pakistanRank: string; worldRank: string }) {
  return (
    <div className={styles.rankStack}>
      <div className={styles.rankStackRow}>
        <span>پاکستان</span>
        <strong>{pakistanRank}</strong>
      </div>
      <div className={`${styles.rankStackRow} ${styles.rankStackWorld}`}>
        <span>عالمی</span>
        <strong dir="ltr">{worldRank}</strong>
      </div>
    </div>
  );
}

function FeeCard({ record }: { record: (typeof feeAdmissionRecords)[number] }) {
  return (
    <details className={styles.feeCard}>
      <summary>
        <span className={styles.mobileRankChip}>پاکستان {record.pakistanRank}</span>
        <span className={styles.feeIdentity}>
          <strong>{record.university}</strong>
          <small dir="ltr">{record.shortName} · QS {record.worldRank}</small>
        </span>
        <span className={styles.mobileFee}>
          <strong>{record.tuition}</strong>
          <small>{record.feePeriod}</small>
        </span>
      </summary>
      <div className={styles.feeCardBody}>
        <p><b>پروگرام:</b> {record.programme}</p>
        <p><b>اہم نوٹ:</b> {record.note}</p>
      </div>
    </details>
  );
}

export function FeesAdmissionsComparison() {
  return (
    <ArtifactShell
      eyebrow="فیس کو ایک عدد نہیں، ایک ساخت سمجھیں"
      title="ٹیوشن فیس اور پروگرام — قابلِ فہم موازنہ"
      description="ڈیسک ٹاپ پر چار واضح کالم؛ موبائل پر کھلنے والے کارڈز۔ ذاتی مالی اعانت کا کالم اور غیر ضروری حیثیت کے بیجز شامل نہیں کیے گئے۔"
      componentId="FeesAdmissionsComparison"
      tone="vivid"
    >
      <aside className={styles.feeReadingNote}>
        <strong>پڑھنے کا اصول</strong>
        <span>ٹیوشن، پہلی ادائیگی اور مکمل چار سالہ خرچ ایک چیز نہیں۔ ہر رقم کے ساتھ پروگرام، کیمپس، سیشن اور فیس کا دورانیہ ضرور دیکھیں۔</span>
      </aside>

      <div className={styles.feeTableWrap}>
        <table className={styles.feeTable}>
          <caption className={styles.srOnly}>پاکستان کی نمایاں یونیورسٹیوں کی ٹیوشن فیس کا موازنہ</caption>
          <thead>
            <tr>
              <th scope="col">درجہ بندی <small>پاکستان / عالمی</small></th>
              <th scope="col">یونیورسٹی <small>نام / پروگرام</small></th>
              <th scope="col">ٹیوشن فیس <small>رقم / دورانیہ</small></th>
              <th scope="col">اہم نوٹ <small>اضافی اخراجات</small></th>
            </tr>
          </thead>
          <tbody>
            {feeAdmissionRecords.map((record) => (
              <tr key={record.id}>
                <td>
                  <RankStack pakistanRank={record.pakistanRank} worldRank={record.worldRank} />
                </td>
                <td>
                  <h3>{record.university} <small dir="ltr">({record.shortName})</small></h3>
                  <p>{record.programme}</p>
                </td>
                <td>
                  <strong className={styles.tableFee}>{record.tuition}</strong>
                  <span className={styles.feePeriod}>{record.feePeriod}</span>
                </td>
                <td>
                  <p>{record.note}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.feeCards}>
        {feeAdmissionRecords.map((record) => <FeeCard record={record} key={record.id} />)}
      </div>

      <footer className={styles.dataFooter}>
        <span>اعداد کی تحقیق: {rankingResearchDate}</span>
        <span>حتمی ادائیگی کے لیے موجودہ آفر لیٹر یا پورٹل سے بنایا گیا چالان دیکھیں۔</span>
      </footer>
    </ArtifactShell>
  );
}
