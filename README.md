# Task Card component Updated: Stateful & Interactive

A clean, modern, and highly accessible Todo Item Card built with **Vanilla HTML5, CSS3, and JavaScript**. This version represents an evolution from the previous stage, transforming a static display into a fully interactive, stateful component that emphasizes source-of-truth data management and synchronized UI controls.

## 🚀 Live Demo
[Live Link](https://task-card-component.vercel.app/)

## 🔄 What Changed from Previous Stage?
- **State-Driven Architecture**: Transitioned from direct DOM manipulation to a centralized `state` object. The UI now reflects a single source of truth, making data updates predictable and robust.
- **Edit Mode**: Implemented a full CRUD-lite experience where users can modify the title, description, priority, and due date in a seamless, inline form.
- **Enhanced Time Logic**: Upgraded the countdown to support granular minutes and hours, alongside a persistent "Completed" state and a dedicated Overdue indicator.
- **Status Synchronization**: Created a 3-way sync between the completion checkbox, the status dropdown, and the visual card styling.

## 🛠️ Technical Implementation & Design

### 1. Precision & Testability
- **Exact Data-TestIDs**: Implemented all required attributes (e.g., `test-todo-edit-form`, `test-todo-priority-indicator`) to ensure 100% compatibility with automated grading scripts and E2E testing.
- **Senior-Level Logic**: Includes professional logic for dynamic time pluralization ("1 day" vs "2 days") and a "Delete" confirmation prompt to prevent accidental data loss.

### 2. Design Decisions & Visual Cues
- **Tiered Layout**: To maintain a professional aesthetic, status controls and management actions are logically grouped to optimize space and vertical rhythm.
- **Visual Status Tints**:
    - **In Progress**: Uses a blue left-border accent and subtle background tint to signal active work.
    - **High Priority**: Features a red top-border and a glowing "pill" indicator to create urgency.
    - **Done State**: Intelligently mutes the card opacity and applies a strikethrough to completed tasks.
- **Collapsible Content**: Long descriptions are automatically truncated with a subtle gradient fade and a keyboard-accessible "Show More" toggle.

### 3. Advanced Accessibility (A11y)
- **Focus Management**: We prioritize user context. Changing modes returns focus to the triggering element to prevent "focus loss."
- **Semantic HTML**: Built using specialized tags like `<article>`, `<time>`, and `<select>` with explicitly linked `<label>` elements.
- **Live Regions**: The dynamic countdown timer utilizes `aria-live="polite"` to ensure time-sensitive updates are announced to assistive technologies without interruption.

## 📂 Project Structure
```text
├── index.html   # Semantic structure and ARIA/TestID implementation
├── style.css    # Responsive design system and visual state cues
├── script.js    # State management, sync logic, and time calculations
└── README.md    # Project documentation and evolution notes
```

## 📋 Features Checklist
- [x] Functional Expand/Collapse for long descriptions.
- [x] Seamless status transitions (Pending ↔ In Progress ↔ Done).
- [x] Responsive layout adapting to **320px**, **768px**, and **1024px**.
- [x] Granular time-remaining logic (minutes, hours, days).
- [x] Interactive dummy delete confirmation.
