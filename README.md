Dr. Aishath Ali Naaz – Professional Portfolio

The official professional portfolio website for **Dr. Aishath Ali Naaz**, the first Clinical Psychologist of the Republic of Maldives. This website showcases her 25+ years of clinical practice, extensive research, global conference presentations, and massive community impact across the Maldivian archipelago.

Live

 Architecture & Tech Stack

This project is built using a **Vanilla HTML/CSS/JS** architecture. It is designed to be highly performant, lightweight, and easy to maintain without requiring a complex build step (like Webpack or Node.js).

* **HTML5:** Semantic structure with component-based injection.
* **CSS3:** Native CSS Grid/Flexbox, CSS Variables (`:root`) for global theming, and native CSS Scroll Snapping for mobile touch interfaces.
* **Vanilla JavaScript (ES6):**
  * `Fetch API` for dynamically injecting the `<nav>` and `<footer>` components across all pages.
  * `IntersectionObserver` for highly performant scroll-triggered fade-in animations.
  * Adaptive gallery rendering and scrolling logic.

Project Structure

```text
├── components/
│   ├── nav.html           # Reusable global navigation menu
│   └── footer.html        # Reusable global footer
├── css/
│   ├── global.css         # Base styles, variables, unified headers (.page-header)
│   ├── index.css          # Page-specific styling
│   └── ... 
├── js/
│   ├── global.js          # Component loader, mobile menu toggle, fade animations
│   └── gallery.js         # Configuration and rendering logic for the photo gallery
├── gallery_photos/        # Optimized WebP/JPG assets for the gallery
├── index.html             # Homepage
├── about.html             # Biography and background
├── services.html          # Clinical and forensic services
├── research.html          # Publications and reports
├── conferences.html       # Global presentations and leadership
├── community.html         # Community impact timeline and statistics
├── contact.html           # Contact information and availability
└── gallery.html           # Dynamic masonry/row photo gallery
