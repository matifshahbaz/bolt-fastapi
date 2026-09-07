/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // A few course-lesson articles embed Pexels cover photos directly
    // (see lib/articles/module2-lecture2-notes.ts, module2-lecture3-notes.ts,
    // module3-lecture3-notes.ts) — allowlisted so next/image can optimize them too.
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }],
  },
};

module.exports = nextConfig;
