---
name: framer-motion
description: Comprehensive guidelines and best practices for creating smooth, performant, and luxury animations using Framer Motion (and modern motion concepts) in web applications.
---

# Framer Motion & Modern Web Animation Guide

This skill provides patterns, principles, and code examples for crafting fluid, high-end, 60fps animations that elevate user experience without feeling distracting or heavy.

## 1. Core Principles of Boutique & Luxury Motion
- **Subtlety over spectacle**: Micro-animations should feel organic, tactile, and effortless.
- **Spring Physics**: Use dampening and stiffness instead of linear easings for natural organic responsiveness.
- **Transform & Opacity Only**: Ensure all transitions run on the GPU (composite layer) to prevent layout thrashing and maintain 60 FPS.
- **Reduced Motion Support**: Always respect `prefers-reduced-motion: reduce`.

## 2. Common Motion Patterns

### Fade-In & Staggered Reveal
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120
    }
  }
};
```

### Subtle Parallax & Scroll Triggers
```jsx
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start end", "end start"]
});

const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
```

### Hover & Tap Micro-Interactions
```jsx
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="btn-primary"
>
  Book Session
</motion.button>
```

### AnimatePresence & Modal Transitions
```jsx
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className="modal-backdrop"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="modal-card"
      >
        {/* Content */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

## 3. Vanilla JS / CSS Motion Equivalents
When building ultra-fast zero-bundle vanilla applications:
- Use `IntersectionObserver` with `threshold` and `rootMargin` for viewport reveals.
- Use CSS Custom Properties (`--scroll-offset`) with `requestAnimationFrame` for high-performance parallax.
- Use CSS transitions with custom cubic-bezier: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth apple/editorial feel.
