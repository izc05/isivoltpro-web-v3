import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroScrollV2() {
  const hero = document.querySelector<HTMLElement>('[data-v2-hero]');
  const stage = document.querySelector<HTMLElement>('[data-v2-stage]');
  if (!hero || !stage) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const left = stage.querySelector('.v2-hero__copy--left');
  const right = stage.querySelector('.v2-hero__copy--right');
  const header = stage.querySelector('.v2-hero__header');
  const canvas = stage.querySelector('.v2-hero__canvas');
  const media = stage.querySelector('.v2-hero__media');

  gsap.matchMedia().add('(min-width: 861px)', () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 1.1 } });
    tl.to(left, { xPercent: -18, opacity: 0.12, ease: 'none' }, 0)
      .to(right, { xPercent: 18, opacity: 0.12, ease: 'none' }, 0)
      .to(header, { y: -18, opacity: 0.42, ease: 'none' }, 0.08)
      .to(media, { scale: 1.12, opacity: 0.28, ease: 'none' }, 0)
      .to(canvas, { scale: 1.28, xPercent: -5, yPercent: 4, ease: 'none' }, 0);
  });
}
