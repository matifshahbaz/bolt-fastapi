'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

type CloudflareLessonPlayerProps = {
  hlsUrl: string;
  posterUrl?: string;
  thresholdPercent: number;
  onThresholdReached: (watchedPercent: number) => void;
};

export function CloudflareLessonPlayer({
  hlsUrl,
  posterUrl,
  thresholdPercent,
  onThresholdReached,
}: CloudflareLessonPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reportedRef = useRef(false);
  const onThresholdReachedRef = useRef(onThresholdReached);

  useEffect(() => {
    onThresholdReachedRef.current = onThresholdReached;
  }, [onThresholdReached]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    reportedRef.current = false;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
    } else {
      video.src = hlsUrl;
    }

    const onTimeUpdate = () => {
      if (reportedRef.current || !video.duration || Number.isNaN(video.duration)) {
        return;
      }
      const watchedPercent = (video.currentTime / video.duration) * 100;
      if (watchedPercent >= thresholdPercent) {
        reportedRef.current = true;
        onThresholdReachedRef.current(Math.min(100, watchedPercent));
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      if (hls) {
        hls.destroy();
      }
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [hlsUrl, thresholdPercent]);

  return (
    <div className="overflow-hidden rounded-2xl border bg-black shadow-lg">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          poster={posterUrl}
          controls
          playsInline
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
