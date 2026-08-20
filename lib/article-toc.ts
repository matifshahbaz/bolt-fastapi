import type { ArticleSection } from '@/lib/data';

function getHeadingNumber(label: string) {
  const match = label.match(/^([0-9۰-۹]+(?:[.۔][0-9۰-۹]+)*)/);
  return match?.[1];
}

function stripHeadingNumber(label: string) {
  return label.replace(/^[0-9۰-۹]+(?:[.۔][0-9۰-۹]+)*[.۔]?\s*/, '');
}

export function getArticleHeadings(sections: ArticleSection[]) {
  const headingIdByIndex = new Map<number, string>();
  const items = sections.reduce<{ id: string; label: string; numberLabel?: string }[]>((headings, section, index) => {
    if (section.type !== 'heading') {
      return headings;
    }

    const label = section.text?.trim() ?? '';
    if (!label || /^\s*[0-9۰-۹]+[.۔][0-9۰-۹]+/.test(label)) {
      return headings;
    }

    const id = `section-${headings.length + 1}`;
    const numberLabel = getHeadingNumber(label);
    headingIdByIndex.set(index, id);
    headings.push({ id, label: numberLabel ? stripHeadingNumber(label) : label, numberLabel });
    return headings;
  }, []);

  return { headingIdByIndex, items };
}