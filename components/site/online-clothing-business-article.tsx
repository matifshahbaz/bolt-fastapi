import BaseOnlineClothingBusinessArticle from '@/components/site/online-clothing-business-artefacts/OnlineClothingBusinessArticle';

export function OnlineClothingBusinessArticle({
  showReferences = false,
  showScreenshotNotes = false,
  className = '',
}: {
  showReferences?: boolean;
  showScreenshotNotes?: boolean;
  className?: string;
}) {
  return (
    <BaseOnlineClothingBusinessArticle
      showReferences={showReferences}
      showScreenshotNotes={showScreenshotNotes}
      className={`online-clothing-business-article ${className}`.trim()}
    />
  );
}

export default OnlineClothingBusinessArticle;
