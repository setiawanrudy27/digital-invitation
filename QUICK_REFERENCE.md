# 🎀 Luxury Wedding Invitation - Quick Reference

## Color Codes

### Burgundy Palette
```
Primary:        #b02525
Dark:           #792323
Secondary:      #922323
Bright:         #d32f2f
Very Light:     #f7e6e3
Light:          #fde3e3
```

### Cream Palette
```
Main:           #fefcf4
Light:          #fdf8f3
Pale:           #fce5eb
Very Light:     #fff9f2
```

## Typography Classes

```typescript
// Headings (Cormorant Garamond)
className="font-display text-5xl" // Couple names
className="font-display text-3xl" // Section headers
className="font-display text-xl"  // Sub-headers

// Script (Great Vibes)
className="font-script text-2xl"  // Decorative

// Body (Montserrat)
className="font-sans text-base"   // Regular text
className="font-sans text-sm"     // Small text
```

## Common Color Applications

```typescript
// Burgundy Text
style={{ color: "#792323" }}  // Headings
style={{ color: "#b02525" }}  // Accents

// Cream/Light
style={{ color: "#fefcf4" }}  // Light backgrounds
style={{ color: "#fdf8f3" }}  // Secondary backgrounds

// Gradients
background: "linear-gradient(135deg, #b02525, #922323)"
background: "linear-gradient(90deg, transparent, #b02525, transparent)"
```

## Animation Templates

### Text Reveal
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
>
  Content
</motion.div>
```

### Floating Element
```typescript
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  Content
</motion.div>
```

### Stagger Container
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

<motion.div variants={containerVariants}>
  {items.map((item) => (
    <motion.div key={item.id} variants={childVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Sparkles Effect
```typescript
Array.from({ length: 15 }).map((_, i) => (
  <motion.div
    key={i}
    animate={{
      opacity: [0, 0.6, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
))
```

## Glass Effect Classes

```typescript
// Standard Glass
className="glass"

// Applied via style
style={{
  background: "rgba(254, 252, 244, 0.95)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(176, 37, 37, 0.15)",
  boxShadow: "0 10px 36px -10px rgba(176, 37, 37, 0.25)"
}}
```

## Shadow Variations

```typescript
// Subtle
boxShadow: "0 2px 16px -6px rgba(0, 0, 0, 0.12)"

// Medium
boxShadow: "0 4px 20px rgba(176, 37, 37, 0.15)"

// Large
boxShadow: "0 8px 32px -10px rgba(176, 37, 37, 0.25)"

// Glow
boxShadow: "0 0 30px -8px rgba(176, 37, 37, 0.25)"
```

## Common Spacing

```typescript
// Section padding
className="py-20 md:py-28 px-4"

// Component gap
className="gap-4 md:gap-6"

// Margin utilities
className="mt-6"  // margin-top
className="mb-8"  // margin-bottom
```

## Responsive Typography

```typescript
// Scales from mobile to desktop
className="text-3xl md:text-4xl lg:text-5xl"

// Scales from mobile to tablet
className="text-base md:text-lg"

// Mobile only
className="md:hidden"
```

## Button Styles

### Primary Button
```typescript
<button
  className="rounded-2xl px-6 py-3.5 font-medium transition-all"
  style={{
    background: "linear-gradient(135deg, #b02525, #922323)",
    color: "#fefcf4"
  }}
>
  Button Text
</button>
```

### Secondary Button
```typescript
<button
  className="rounded-2xl border px-4 py-2 text-sm font-medium"
  style={{
    borderColor: "rgba(176, 37, 37, 0.25)",
    color: "#792323",
    backgroundColor: "rgba(253, 248, 243, 0.8)"
  }}
>
  Button Text
</button>
```

## Form Elements

### Input Styling
```typescript
<input
  className="rounded-2xl border px-4 py-3 text-sm outline-none"
  style={{
    backgroundColor: "rgba(253, 248, 243, 0.8)",
    borderColor: "rgba(176, 37, 37, 0.25)",
    color: "#792323"
  }}
  onFocus={(e) => {
    e.target.style.borderColor = "#b02525";
    e.target.style.boxShadow = "0 0 0 3px rgba(176, 37, 37, 0.12)";
  }}
/>
```

## Viewport Trigger Settings

```typescript
// Standard reveal when visible
viewport={{ once: true, margin: "-60px" }}

// With amount specification
viewport={{ once: true, amount: 0.3 }}

// Aggressive trigger
viewport={{ once: true, margin: "-100px" }}
```

## Framer Motion Easings

```typescript
// Pre-built easing
ease: "easeOut"
ease: "easeInOut"
ease: "linear"

// Custom easing (smooth)
ease: [0.25, 0.46, 0.45, 0.94]

// Custom easing (bouncy)
ease: "backOut"
```

## Decorative Elements

### Horizontal Line
```typescript
<div 
  className="h-px w-20 mx-auto"
  style={{ background: "linear-gradient(90deg, transparent, #b02525, transparent)" }}
/>
```

### Decorative Dots
```typescript
<div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#b02525" }} />
```

### Floral Symbol
```typescript
<span className="text-6xl" style={{ color: "#b02525" }}>❀</span>
```

## Useful Utilities

```typescript
// Pointer events
className="pointer-events-none"  // Disable clicks
className="pointer-events-auto"  // Enable clicks

// Overflow handling
className="overflow-hidden"   // Hide overflow
className="overflow-y-auto"   // Allow vertical scroll

// Positioning
className="absolute inset-0" // Full cover
className="relative"         // Relative positioning

// Centering
className="flex items-center justify-center"
```

## Mobile Optimization

```typescript
// Hide on mobile
className="hidden md:block"

// Show only mobile
className="block md:hidden"

// Responsive text
className="text-sm md:text-base lg:text-lg"

// Touch-friendly sizing
className="h-12 w-12"  // 48x48px minimum
```

## Performance Tips

1. **Use `will-change` sparingly** - Only on frequently animated elements
2. **Optimize images** - Use Next.js Image component
3. **Lazy load videos** - Load on demand
4. **Reduce animations on mobile** - Respect `prefers-reduced-motion`
5. **Batch animations** - Group similar transitions

## Common Patterns

### Section Header
```typescript
<motion.div className="text-center mb-12">
  <span style={{ color: "#b02525" }}>SECTION LABEL</span>
  <h2 className="font-display text-4xl mt-3" style={{ color: "#792323" }}>
    Section Title
  </h2>
  <div className="h-px w-20 mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #b02525, transparent)" }} />
</motion.div>
```

### Card Component
```typescript
<motion.div
  className="glass rounded-2xl p-6 md:p-8"
  style={{ borderColor: "rgba(176, 37, 37, 0.2)" }}
>
  {/* Card content */}
</motion.div>
```

### Floating Decoration
```typescript
{Array.from({ length: 8 }).map((_, i) => (
  <motion.div
    key={i}
    animate={{ y: [0, -30, 0] }}
    transition={{ duration: 8 + i, repeat: Infinity }}
    style={{ left: `${i * 12}%`, top: `${i * 10}%` }}
  >
    <span>❀</span>
  </motion.div>
))}
```

## Testing Checklist

- [ ] Colors display correctly on all devices
- [ ] Animations run smoothly (60fps)
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Touch interactions work on mobile
- [ ] Text is readable (sufficient contrast)
- [ ] Performance: Lighthouse score > 80
- [ ] No console errors
- [ ] Cross-browser compatibility tested

---

**Quick Ref Version**: 1.0
**Last Updated**: May 13, 2026
