import type { ArticleSection } from '@/lib/data';

export function getArticleHeadings(sections: ArticleSection[]) {
  const headingIdByIndex = new Map<number, string>();
  const items = sections.reduce<{ id: string; label: string }[]>((headings, section, index) => {
    if (section.type !== 'heading') {
      return headings;
    }

    const label = section.text?.trim() ?? '';
    if (!label || /^\s*[0-9۰-۹]+[.۔][0-9۰-۹]+/.test(label)) {
      return headings;
    }

    const id = `section-${headings.length + 1}`;
    headingIdByIndex.set(index, id);
    headings.push({ id, label });
    return headings;
  }, []);

  return { headingIdByIndex, items };
}