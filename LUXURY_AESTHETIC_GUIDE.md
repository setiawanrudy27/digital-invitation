# 💍 Luxury Wedding Invitation - Aesthetic Implementation Guide

## Overview

This document details the comprehensive implementation of a luxury, animated wedding invitation website with premium botanical vintage aesthetics. The design combines elegant styling, sophisticated animations, and cinematic transitions to create an unforgettable digital wedding experience.

---

## 🎨 Design Philosophy

### Core Aesthetics
- **Premium**: Luxurious spacing, high-quality typography, refined shadows
- **Romantic**: Soft color palette, gentle animations, emotional transitions
- **Classy**: Minimalist design, elegant ornaments, sophisticated layouts
- **Cinematic**: Smooth scrolling, parallax effects, fade-in reveals
- **Soft Luxury**: Non-aggressive colors, breathable whitespace, natural movements

### Inspiration
Elegant botanical vintage invitations with tropical floral decorations, maintaining a sense of timeless sophistication while incorporating modern digital animation capabilities.

---

## 🎭 Visual Design System

### Color Palette

#### Primary Colors
```
Burgundy (Primary):     #b02525 - Main accent color
Dark Burgundy:          #792323 - Primary text, headings
Rich Burgundy:          #922323 - Secondary text
Bright Burgundy:        #d32f2f - Hover states, highlights

Cream (Background):     #fefcf4 - Main background
Light Cream:            #fdf8f3 - Secondary background
Pale Cream:             #fce5eb - Gradient background
```

#### Why These Colors?
- **Burgundy**: Conveys romance, luxury, and sophistication
- **Cream**: Provides elegance, warmth, and luxurious texture
- Combination creates **soft luxury** aesthetic without being too bold

### Typography

#### Font Families
```typescript
// Great Vibes - Script/Decorative
font-family: 'Great Vibes', cursive
Usage: "The Wedding Of", decorative titles, script elements

// Cormorant Garamond - Display/Serif
font-family: 'Cormorant Garamond', serif
Usage: Couple names, section headings, elegant headers

// Montserrat - Sans-serif Body
font-family: 'Montserrat', sans-serif
Usage: Body text, descriptions, UI elements
```

#### Typography Hierarchy
```
Display: Cormorant Garamond 48-96px (couple names, main titles)
Heading: Cormorant Garamond 24-48px (section titles)
Script: Great Vibes 20-32px (decorative text)
Body: Montserrat 14-16px (descriptions)
Label: Montserrat 10-12px (metadata)
```

### Spacing & Layout
```
Container Max Width: 1280px (lg breakpoint)
Padding Base: 24px (6 units)
Gap Between Sections: 80-112px (20-28 units)
Component Gap: 24px (6 units)
Line Height: 1.6-1.8 (relaxed reading)
```

---

## ✨ Animation System

### 1. Smooth Scroll (Lenis)
**Purpose**: Create cinematic smooth scrolling experience
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 1,
});
```
**Effect**: Butter-smooth, natural scrolling throughout the entire page

### 2. Floating Flowers Animation
**Purpose**: Adds life and movement to static sections
**Characteristics**:
- Gentle vertical movement (±20px)
- Subtle rotation (±5°)
- Opacity fade (0.3-0.6)
- Duration: 6-9 seconds per cycle
- Infinite loop with easing

**Implementation**:
```typescript
animate={{ 
  y: [0, -20, 0], 
  rotate: [0, 5, -5, 0],
  opacity: [0.3, 0.6, 0.3]
}}
transition={{
  duration: 6 + i * 0.5,
  repeat: Infinity,
  ease: "easeInOut",
}}
```

### 3. Sparkle Particle Effects
**Purpose**: Add magical, celebratory atmosphere
**Characteristics**:
- Random positioning across section
- Scale in/out animation
- Opacity fade
- Staggered delays for natural effect
- Duration: 3 seconds per cycle

### 4. Text Reveal Animation
**Purpose**: Elegant entrance for text content
**Characteristics**:
- Fade-in with up translation (24px)
- Duration: 0.8 seconds
- Staggered children (0.2s delay between elements)
- Easing: `[0.25, 0.46, 0.45, 0.94]`

### 5. Parallax Leaves
**Purpose**: Subtle depth and movement
**Characteristics**:
- Gentle vertical sway
- Slow rotation
- Different timings per element
- Continuous loop

### 6. Background Zoom Effect
**Purpose**: Creates depth sensation
**Characteristics**:
- Slow scale transformation (1 → 1.1 → 1)
- Duration: 20 seconds
- Linear easing for constant motion

### 7. Fade-In on Scroll
**Purpose**: Progressive content reveal
**Characteristics**:
- Triggered when element enters viewport
- Only animates once (`once: true`)
- Margin offset for smooth trigger
- Duration: 0.6-0.8 seconds

---

## 🏗️ Component Architecture

### Cover Section
**Purpose**: First impression, invitation opening
**Key Features**:
- Floral animated frame with multiple rings
- "The Wedding Of" in script typography
- Large elegant couple names
- Animated date display
- Guest name card with glassmorphism
- Open invitation button with gradient
- Floating flowers and ornamental elements

**Animation Sequence**:
1. Floating flowers fade in and move
2. Decorative rings appear with scale
3. Text reveals with stagger
4. Guest card appears with glass effect
5. Button ready for interaction

### Opening Section
**Purpose**: Set romantic tone, show date context
**Key Features**:
- Full couple name display
- Wedding date prominent
- Background zoom effect
- Sparkle particles throughout
- Smooth reveal animations

### Couple Section
**Purpose**: Introduce bride and groom
**Key Features**:
- Glassmorphism cards for each person
- Circular photo frames with shadows
- Elegant text layouts
- Floating leaves animations
- Parent information display
- Social media links

### Event Section
**Purpose**: Provide wedding event details
**Key Features**:
- Countdown timer with animated values
- Event cards with location/time
- Google Calendar integration button
- Smooth color transitions
- Responsive grid layout

### Gallery Section
**Purpose**: Share wedding photos/videos
**Key Features**:
- Responsive grid layout
- Lightbox modal for full images
- YouTube video embedding
- Hover effects with overlay gradients
- Smooth transitions

### Quote Section
**Purpose**: Add romantic sentiment
**Key Features**:
- Large decorative quote marks
- Centered elegant text
- Source attribution
- Sparkle particle background
- Peaceful atmosphere

### RSVP Section
**Purpose**: Guest confirmation and wishes
**Key Features**:
- Form with name input
- Attendance toggle buttons
- Guest count input (conditional)
- Message textarea
- Success message display
- Floating flowers decoration
- Display of previous RSVPs

### Gift Section
**Purpose**: Provide gift/transfer information
**Key Features**:
- Bank account display with copy button
- QRIS code option
- Modal popup for details
- Floating gift emoji decoration
- Elegant card layout

### Thank You Section
**Purpose**: Closing gratitude
**Key Features**:
- Full-screen background support
- Elegant gratitude message
- Couple name display
- Cream gradient background (if no photo)
- Decorative lines
- Cinematic feel

---

## 🎬 Animation Timings Reference

### Standard Durations
- **Quick**: 0.3s (transitions, hovers)
- **Normal**: 0.6-0.8s (element reveal)
- **Slow**: 1.2-1.5s (entrance animations)
- **Very Slow**: 3-10s (background effects, floating elements)

### Easing Functions
```typescript
// Smooth, organic easing
easing: [0.25, 0.46, 0.45, 0.94]

// Lenis smooth scroll
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

// Standard easing
"easeInOut" // Framer Motion preset
"easeOut"   // Framer Motion preset
```

### Stagger Effect
```typescript
transition: {
  staggerChildren: 0.15,    // 0.15s between each child
  delayChildren: 0.2,       // 0.2s before first child
}
```

---

## 💎 Visual Effects

### Glassmorphism
```css
/* Base Glass Effect */
background: rgba(254, 252, 244, 0.95);
backdrop-filter: blur(18px);
-webkit-backdrop-filter: blur(18px);
border: 1px solid rgba(176, 37, 37, 0.15);
box-shadow: 0 10px 36px -10px rgba(176, 37, 37, 0.25);
```

**Usage**: Cards, overlays, containers

### Soft Shadows
```css
/* Subtle Shadow */
box-shadow: 0 2px 16px -6px rgba(0, 0, 0, 0.12);

/* Medium Shadow */
box-shadow: 0 4px 20px rgba(176, 37, 37, 0.15);

/* Large Shadow */
box-shadow: 0 8px 32px -10px rgba(176, 37, 37, 0.25);
```

### Gradient Lines
```typescript
background: "linear-gradient(90deg, transparent, #b02525, transparent)"
// Used for: decorative dividers, accent lines
```

### Vignette Effect
```typescript
// Optional background pattern
background-image: radial-gradient(circle at 20% 80%, rgba(176, 37, 37, 0.03) 0%, transparent 50%);
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Approach
- Base styles for mobile
- Enhanced styles for larger screens
- Touch-friendly interaction areas (min 44px)
- Optimized typography sizes
- Reduced animation complexity on mobile

### Example Responsive Typography
```typescript
// Mobile: smaller
className="text-3xl md:text-4xl lg:text-5xl"

// Translates to:
// Mobile: 30px
// md+: 36px
// lg+: 48px
```

---

## 🛠️ Implementation Guide

### Adding New Sections

1. **Create Component**
```typescript
"use client";

import { motion } from "framer-motion";

export default function NewSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Floating decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {/* animations here */}
      </div>

      {/* Content */}
    </section>
  );
}
```

2. **Apply Color Scheme**
```typescript
// Use burgundy colors
style={{ color: "#792323" }}           // Dark burgundy (headings)
style={{ color: "#b02525" }}           // Primary burgundy
style={{ color: "#922323" }}           // Secondary burgundy
style={{ color: "#fefcf4" }}           // Cream background
```

3. **Add Animations**
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Custom Animations

**Floating Elements**:
```typescript
animate={{ 
  y: [0, -30, 0],
  rotate: [0, 5, -5, 0]
}}
transition={{
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut",
  delay: 0.5,
}}
```

**Sparkles**:
```typescript
animate={{
  opacity: [0, 0.8, 0],
  scale: [0, 1, 0],
}}
transition={{
  duration: 3,
  repeat: Infinity,
  delay: Math.random() * 3,
}}
```

---

## 🎯 Key Files Modified

### Core Files
- `src/app/globals.css` - Theme colors and typography
- `src/app/invite/[slug]/invitation-client.tsx` - Lenis integration
- `src/components/invite/cover-section.tsx` - Luxury cover design

### Component Files Updated
- `opening-section.tsx` - Romantic opening
- `couple-section.tsx` - Couple introduction
- `event-section.tsx` - Event details
- `gallery-section.tsx` - Photo gallery
- `quote-section.tsx` - Quote display
- `rsvp-section.tsx` - RSVP form
- `gift-section.tsx` - Gift options
- `thank-you-section.tsx` - Closing section

---

## 🚀 Performance Considerations

### Optimization
1. **Lazy Loading**: Components load on scroll
2. **Viewport Triggers**: Animations start when visible
3. **Reduced Motion**: Consider system preferences
4. **Image Optimization**: Use Next.js Image component
5. **Animation Simplification**: Reduced on mobile

### Best Practices
- Use `will-change` sparingly
- Avoid complex keyframes for mobile
- Preload fonts for LCP
- Optimize video embeds (YouTube)
- Test on real devices

---

## 🎨 Customization Options

### Changing Colors
Update `src/app/globals.css`:
```css
--color-burgundy-500: #new-color;
```

### Adjusting Animation Speed
Modify `transition.duration` values:
```typescript
// Slower
transition={{ duration: 1.2 }}

// Faster
transition={{ duration: 0.4 }}
```

### Changing Fonts
Update imports in `globals.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=NewFont:wght@400;700");
```

---

## 📊 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (test backdrop-filter)
- Mobile browsers: Full support with responsive optimization

---

## 💾 Future Enhancements

1. **Dark Mode**: Dark luxury theme
2. **3D Effects**: Three.js integration for depth
3. **Audio**: Background music with player
4. **Advanced Analytics**: Track guest interactions
5. **Guest Customization**: Personalized messages
6. **Print Support**: PDF generation

---

## 📝 Notes

- All animations are GPU-accelerated using `transform` and `opacity`
- Scroll smoothing uses Lenis for browser consistency
- Glassmorphism may require backdrop-filter support (all modern browsers)
- Burgundy color scheme chosen for emotional warmth and sophistication
- Cream background provides elegant contrast without harshness

---

## 🎓 Learning Resources

- Framer Motion: https://www.framer.com/motion/
- GSAP: https://greensock.com/gsap/
- Lenis: https://lenis.studiofreight.com/
- Tailwind CSS: https://tailwindcss.com/
- CSS Backdrop Filter: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter

---

**Created**: May 2026
**Version**: 1.0 - Luxury Aesthetic Implementation
**Last Updated**: May 13, 2026
