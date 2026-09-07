import { execFileSync } from 'node:child_process';

const cache = new Map<string, string | undefined>();

/**
 * Returns the ISO 8601 committer date of the last commit that touched `relativeFilePath`,
 * read directly from git history — a genuine last-modified signal rather than a fabricated
 * build-time timestamp. Returns undefined (never throws) if git isn't available or the file
 * has no history yet (e.g. a shallow clone, or a deploy artifact without a .git directory),
 * so callers can omit the field entirely rather than show a misleading date.
 */
export function getGitLastModified(relativeFilePath: string): string | undefined {
  if (cache.has(relativeFilePath)) {
    return cache.get(relativeFilePath);
  }

  let result: string | undefined;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', relativeFilePath], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    result = out.length > 0 ? out : undefined;
  } catch {
    result = undefined;
  }

  cache.set(relativeFilePath, result);
  return result;
}

/** Latest (lexicographically max, which is chronologically max for ISO 8601 strings) of the given dates, or undefined if none are known. */
export function latestOf(dates: Array<string | undefined>): string | undefined {
  const known = dates.filter((date): date is string => Boolean(date));
  if (known.length === 0) {
    return undefined;
  }
  return known.reduce((latest, current) => (current > latest ? current : latest));
}
