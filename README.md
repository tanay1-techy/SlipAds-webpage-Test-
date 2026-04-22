# SlipAds - 3D Bottle Customizer Website

A high-end, modern "Roll Site" style startup website featuring an interactive 3D water bottle customizer with real-time texture mapping. Built with a fluid, scroll-driven experience to create a professional advertising platform.

## Features
- **Interactive 3D Bottle Model:** Built using Three.js for real-time 3D rendering.
- **Dynamic Texture Mapping:** Upload custom logos or change the label color directly on the 3D model.
- **Scroll-Driven Animations:** Smooth scrolling and scroll-triggered animations powered by Lenis and GSAP (ScrollTrigger).
- **Responsive Design:** A fully responsive, premium UI built with modern CSS and Vite.

## Tech Stack
- **Frontend Framework:** Vite (Vanilla JS)
- **3D Graphics:** Three.js
- **Animations:** GSAP & ScrollTrigger
- **Smooth Scrolling:** Lenis

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tanay1-techy/SlipAds-webpage-Test-.git
   ```

2. Navigate to the project directory:
   ```bash
   cd SlipAds-webpage-Test-
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To build the app for production, run:
```bash
npm run build
```
The optimized files will be generated in the `dist` folder.

## Project Structure

- `index.html`: The main HTML entry point.
- `style.css`: Contains CSS styles and UI theme design.
- `main.js`: Main application entry and UI initialization.
- `src/bottle/`: Contains Three.js 3D rendering logic (BottleScene, BottleModel, LabelTexture).
- `src/animations/`: Contains GSAP scroll-based animations.
- `src/ui/`: Contains UI interaction logic (ControlPanel).
- `src/utils/`: Contains utility modules like smooth scrolling (Lenis).
- `public/`: Static assets such as 3D models and textures.
