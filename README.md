# 🍾 SlipAds - 3D Bottle Customizer Experience

> A high-end, modern "Roll Site" style startup website featuring an interactive 3D water bottle customizer with real-time texture mapping. Built with a fluid, scroll-driven experience to create a professional advertising platform.

---

## ✨ Key Features

- 🧊 **Interactive 3D Bottle Model:** Built using **Three.js** for real-time, high-performance 3D rendering right in your browser.
- 🎨 **Dynamic Texture Mapping:** Upload custom logos or instantly change the label color directly on the 3D model with real-time feedback.
- 🚀 **Scroll-Driven Animations:** Silky smooth scrolling and scroll-triggered animations powered by **Lenis** and **GSAP (ScrollTrigger)** for a premium feel.
- 📱 **Fully Responsive Design:** A meticulously crafted, premium UI built with modern CSS and **Vite**, ensuring it looks perfect on any device.
- 🎛️ **Intuitive Control Panel:** An easy-to-use interface for customizing the bottle's appearance on the fly.

---

## 🛠️ Tech Stack

This project leverages cutting-edge web technologies to deliver a seamless 3D experience:

- **Frontend Build Tool:** [Vite](https://vitejs.dev/) (Vanilla JS)
- **3D Graphics Library:** [Three.js](https://threejs.org/)
- **Animation Engine:** [GSAP](https://gsap.com/) & ScrollTrigger
- **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)
- **Styling:** Custom CSS with Modern Variables

---

## 📂 Project Architecture

The codebase is organized modularly for scalability and maintainability:

```text
SlipAds/
├── public/                 # Static assets (favicons, fonts, raw 3D models)
├── src/                    # Main source code
│   ├── animations/         # GSAP scroll-based animation controllers
│   ├── bottle/             # Three.js 3D rendering logic (BottleScene, BottleModel, LabelTexture)
│   ├── ui/                 # UI interaction logic (ControlPanel, color pickers, uploaders)
│   ├── utils/              # Utility modules (Lenis smooth scrolling setup)
│   ├── assets/             # Internal assets (images, svgs)
│   ├── style.css           # Global CSS variables and utility classes
│   └── main.ts             # Main TypeScript configuration
├── index.html              # The core HTML entry point
├── main.js                 # Application entry and UI initialization
├── style.css               # Main stylesheet with layout and design tokens
└── package.json            # Dependencies and scripts
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended) installed on your machine.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanay1-techy/SlipAds-webpage-Test-.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd SlipAds-webpage-Test-
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   > The server will typically start at `http://localhost:5173`. Open this URL in your browser to view the app.

---

## 🏗️ Building for Production

To build the app for production (optimized and minified), run:

```bash
npm run build
```

The optimized files will be generated in the `dist` folder. You can preview the production build locally by running:

```bash
npm run preview
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/tanay1-techy/SlipAds-webpage-Test-/issues).

---

<p align="center">
  Built with ❤️ using Vite & Three.js
</p>
