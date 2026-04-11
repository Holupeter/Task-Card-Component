# Task Card component

A clean, modern, and highly accessible Todo Item Card built with **Vanilla HTML5, CSS3, and JavaScript**. This project focuses on semantic structure, automated testability, and a human-centric design aesthetic.

## 🚀 Live Demo
[Insert Your Vercel/Netlify URL Here]

## 🛠️ Technical Implementation

### 1. Testability & Precision
- **Exact Data-TestIDs:** Implemented all required `data-testid` attributes (e.g., `test-todo-card`, `test-todo-complete-toggle`) to ensure 100% compatibility with automated grading scripts.
- **Dynamic Logic:** The due date and countdown timer are calculated dynamically using JavaScript to ensure the "Time Remaining" logic is always relevant and accurate upon page load.
- **Pluralization Logic:** Includes custom logic to handle singular/plural time units (e.g., "1 day" vs "2 days") for a polished UI.

### 2. Semantic HTML & Accessibility (A11y)
- **Structure:** Built using semantic tags including `<article>`, `<time>`, `<ul>`, and `<button>`.
- **Screen Reader Support:** Includes `aria-label` for icon-only buttons and `aria-live="polite"` for the dynamic countdown timer to ensure updates are announced to assistive technologies.
- **Keyboard Navigation:** Fully navigable via `Tab` key with clear visual focus states for all interactive elements.

### 3. Responsive "Human" Design
- **Aesthetic:** A "Soft-Minimalist" approach using a neutral color palette, subtle shadows, and a modular scale.
- **Responsiveness:** Fluid layout that scales gracefully from **320px to 1200px**, ensuring no horizontal overflow or layout shifts on mobile, tablet, or desktop devices.
- **Zero-Dependency:** No external libraries or frameworks (like Font Awesome or Bootstrap) were used—only native Web APIs and Unicode symbols for maximum performance.

## 📂 Project Structure
```text
├── index.html   # Semantic structure and ARIA labels
├── style.css    # Responsive layouts and custom styling
├── script.js    # Logic for countdown, toggle, and pluralization
└── README.md    # Project documentation