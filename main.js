import './style.css';
import { initSmoothScroll } from './src/utils/smoothScroll.js';
import { initScrollAnimations, initHeroAnimation } from './src/animations/scrollAnimations.js';
import { BottleScene } from './src/bottle/BottleScene.js';
import { createBottleModel } from './src/bottle/BottleModel.js';
import { LabelTexture } from './src/bottle/LabelTexture.js';
import { ControlPanel } from './src/ui/ControlPanel.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Smooth Scrolling
  const lenis = initSmoothScroll();

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Initialize GSAP Animations
  initScrollAnimations();
  initHeroAnimation();

  // 3. Setup 3D Customizer
  const canvas = document.getElementById('bottleCanvas');
  const bottleScene = new BottleScene(canvas);

  // 4. Create Dynamic Label Texture
  const labelTextureObj = new LabelTexture(1024, 512);

  // 5. Create Bottle Model with the texture
  const bottleGroup = createBottleModel(labelTextureObj.getTexture());
  bottleScene.addBottle(bottleGroup);

  // 6. Initialize UI Control Panel
  new ControlPanel(labelTextureObj);

  // Optional: Set up mini hero bottle
  setupHeroBottle(labelTextureObj);

  // Handle Form Submission Mockup
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btnText = document.querySelector('#submitOrder .btn-text');
      const loader = document.querySelector('#submitOrder .btn-loader');
      
      btnText.style.display = 'none';
      loader.style.display = 'inline-block';
      
      // Simulate API call
      setTimeout(() => {
        loader.style.display = 'none';
        btnText.style.display = 'inline-block';
        btnText.textContent = 'Request Sent!';
        document.getElementById('submitOrder').style.backgroundColor = 'var(--success)';
        orderForm.reset();
      }, 1500);
    });
  }
});

// Mini hero bottle
function setupHeroBottle(masterTextureObj) {
  const container = document.getElementById('heroBottleContainer');
  if (!container) return;

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  // Create a separate, smaller texture specifically for the hero
  const heroTextureObj = new LabelTexture(1024, 512);
  // Default look for hero
  heroTextureObj.update({
    brandName: 'SlipAds',
    brandColor: '#12121f'
  });

  const scene = new BottleScene(canvas);
  // Position camera slightly differently for hero
  scene.camera.position.set(0, 0, 7);
  
  const bottleGroup = createBottleModel(heroTextureObj.getTexture());
  scene.addBottle(bottleGroup);
  
  // Ensure it auto rotates
  scene.controls.autoRotateSpeed = 2.0;

  // We don't link the control panel to this hero bottle, it's just a demo visual
}
