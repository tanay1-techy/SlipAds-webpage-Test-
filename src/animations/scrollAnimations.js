import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Hero Parallax & Fade
  gsap.to('.hero-content', {
    yPercent: 30,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Section Headers Reveal
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
      }
    });
  });

  // How It Works Cards Stagger
  gsap.fromTo('.step-card', 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.how-it-works',
        start: 'top 80%',
      }
    }
  );

  // Pricing Cards
  gsap.fromTo('.pricing-card', 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 80%',
      }
    }
  );

  // Bulk Order Intro
  gsap.fromTo('.order-info .info-card', 
    { x: -30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.bulk-order',
        start: 'top 80%',
      }
    }
  );

  // Bulk Order Form
  gsap.fromTo('.order-form', 
    { x: 30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.bulk-order',
        start: 'top 80%',
      }
    }
  );

  // Navbar background change on scroll
  ScrollTrigger.create({
    start: 'top -50',
    onUpdate: self => {
      const navbar = document.getElementById('navbar');
      if (self.direction === 1) {
        navbar.classList.add('scrolled');
      } else if (self.progress === 0) {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Scroll Progress Bar
  gsap.to('#scrollProgress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

export function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('#heroBadge', { y: -20, opacity: 0, duration: 0.6, delay: 0.2 })
    .from('.title-line', { y: 40, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=0.4')
    .from('#heroSubtitle', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('#heroActions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
    .from('.stat-divider', { height: 0, opacity: 0, duration: 0.6 }, '-=0.6')
    .from('#heroVisual', { scale: 0.9, opacity: 0, duration: 1 }, '-=0.8')
    .from('#scrollIndicator', { opacity: 0, duration: 1 }, '-=0.4');
}
