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
  const canvas = stage.querySelector('.v2-hero__canvas');
  const media = stage.querySelector('.v2-hero__media');
  const nodes = stage.querySelectorAll('.v2-node');

  gsap.matchMedia().add('(min-width: 1041px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.15,
      },
    });

    tl.to(left, { xPercent: -7, opacity: 0.72, ease: 'none' }, 0)
      .to(right, { xPercent: 7, opacity: 0.72, ease: 'none' }, 0)
      .to(media, { scale: 1.065, opacity: 0.42, ease: 'none' }, 0)
      .to(canvas, { scale: 1.13, yPercent: 2, ease: 'none' }, 0)
      .to(nodes, { opacity: 0.46, yPercent: -8, ease: 'none', stagger: 0.02 }, 0.05);
  });
}
