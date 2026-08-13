export function initHeroMediaV2() {
  const media = document.querySelector<HTMLVideoElement>('[data-v2-backdrop]');
  if (!media) return;

  const chooseFrame = () => {
    const target = Number.isFinite(media.duration) ? Math.min(3.2, Math.max(0.1, media.duration * 0.3)) : 2.5;
    try { media.currentTime = target; } catch { /* first decoded frame remains as fallback */ }
    media.pause();
  };

  if (media.readyState >= 1) chooseFrame();
  else media.addEventListener('loadedmetadata', chooseFrame, { once: true });
  media.addEventListener('seeked', () => media.classList.add('is-frame-ready'), { once: true });
}
