# 🎨 Luxury Wedding Invitation - Visual Reference Guide

## Color Palette Visual Reference

### Burgundy Color System

```
BURGUNDY #b02525
███████████████████████████████
- Primary accent color
- CTA buttons, hover states
- Important highlights
- RGB: 176, 37, 37

DARK BURGUNDY #792323
███████████████████████████████
- Main headings
- Primary text (high contrast)
- Dark accents
- RGB: 121, 35, 35

SECONDARY BURGUNDY #922323
███████████████████████████████
- Secondary text
- Supporting headings
- Decorative elements
- RGB: 146, 35, 35

BRIGHT BURGUNDY #d32f2f
███████████████████████████████
- Very bold accents
- Interactive elements
- High emphasis text
- RGB: 211, 47, 47
```

### Cream Color System

```
CREAM #fefcf4
███████████████████████████████
- Main background
- Card backgrounds
- Light overlays
- RGB: 254, 252, 244

LIGHT CREAM #fdf8f3
███████████████████████████████
- Secondary background
- Section alternation
- Subtle differences
- RGB: 253, 248, 243

PALE CREAM #fce5eb
███████████████████████████████
- Gradient backgrounds
- Subtle background variations
- Very light accents
- RGB: 252, 229, 235
```

---

## Typography Visual Reference

### Great Vibes (Script Font)
```
The Wedding Of
```
- Used for: Decorative titles, romantic headings
- Weight: Regular (400)
- Size: 24px - 32px
- Emotion: Elegant, romantic, personal

### Cormorant Garamond (Serif Font)
```
Sarah & Michael
```
- Used for: Main headings, couple names, section titles
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Sizes: 24px - 96px
- Emotion: Sophisticated, elegant, premium

### Montserrat (Sans-serif Font)
```
Regular text and body content looks clean and modern
```
- Used for: Body text, descriptions, labels, UI elements
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Sizes: 10px - 18px
- Emotion: Modern, clean, readable

---

## Spacing System

### Section Spacing
```
Section (py):
- Mobile:  py-20   (80px)
- Tablet:  py-24   (96px)
- Desktop: py-28   (112px)

Container Padding:
- Mobile:  px-4    (16px)
- Tablet:  px-6    (24px)
- Desktop: px-8    (32px)
```

### Component Spacing
```
Card Padding:
- Small:   p-4     (16px)
- Medium:  p-6     (24px)
- Large:   p-8     (32px)

Gap Between Items:
- Compact: gap-3   (12px)
- Regular: gap-4   (16px)
- Loose:   gap-6   (24px)
```

---

## Shadow System

### Subtle Shadow (Cards)
```
box-shadow: 0 2px 16px -6px rgba(0, 0, 0, 0.12);
- Use for: Light cards, gentle emphasis
- Elevation: Minimal
```

### Medium Shadow (Interactive)
```
box-shadow: 0 4px 20px rgba(176, 37, 37, 0.15);
- Use for: Hover states, focused elements
- Elevation: Moderate
```

### Large Shadow (Prominent)
```
box-shadow: 0 8px 32px -10px rgba(176, 37, 37, 0.25);
- Use for: Modals, important cards
- Elevation: High
```

### Glow Effect (Special)
```
box-shadow: 0 0 30px -8px rgba(176, 37, 37, 0.25);
- Use for: Decorative, sparkle effects
- Elevation: Atmospheric
```

---

## Border Radius System

```
Small:      rounded-xl      (8px)
Medium:     rounded-2xl     (16px)
Large:      rounded-3xl     (24px)
Full:       rounded-full    (9999px)

Button standard:    rounded-2xl  (16px)
Card standard:      rounded-3xl  (24px)
Badge standard:     rounded-full (9999px)
```

---

## Gradient Library

### Button Gradient (Primary)
```
linear-gradient(135deg, #b02525 0%, #922323 100%)
Visual: Burgundy to darker burgundy
Direction: Top-left to bottom-right
```

### Decorative Line Gradient
```
linear-gradient(90deg, transparent, #b02525, transparent)
Visual: Burgundy in center, fades to transparent
Direction: Left to right
```

### Background Gradient (Thank You)
```
linear-gradient(135deg, #fefcf4 0%, #fdf8f3 50%, #fce5eb 100%)
Visual: Cream variations
Direction: Top-left to bottom-right
```

### Overlay Gradient (Dark)
```
linear-gradient(180deg, rgba(253, 248, 243, 0) 0%, rgba(253, 248, 243, 0.4) 100%)
Visual: Transparent cream to translucent cream
Direction: Top to bottom
```

---

## Glass Effect

### CSS Properties
```css
background: rgba(254, 252, 244, 0.95);
backdrop-filter: blur(18px);
-webkit-backdrop-filter: blur(18px);
border: 1px solid rgba(176, 37, 37, 0.15);
box-shadow: 0 10px 36px -10px rgba(176, 37, 37, 0.25);
```

### Visual Appearance
- Frosted glass effect
- Slight transparency
- Subtle background showing through
- Border hints at surface
- Soft shadow for depth

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Full support

---

## Animation Timing Reference

### Speed Classifications
```
Quick:       0.3s   - Micro interactions, hovers
Normal:      0.6s   - Element reveals, standard
Slow:        1.2s   - Entrance animations, transitions
Very Slow:   3-10s  - Background effects, floating
```

### Easing Reference
```
Ease Out:           Starts fast, ends slow
Ease In Out:        Starts slow, middle fast, ends slow
Custom Smooth:      [0.25, 0.46, 0.45, 0.94]
Lenis Easing:       (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
```

---

## Component Examples

### Section Header Structure
```
┌─────────────────────────────┐
│   [Label] "SECTION LABEL"   │ ← Burgundy, small caps
│                             │
│  Section Title Text         │ ← Large heading, dark burgundy
│                             │
│  ────────█████────────      │ ← Decorative line
│                             │
│  Optional subtitle or       │ ← Secondary text, supporting
│  descriptive paragraph      │
└─────────────────────────────┘
```

### Card Component Structure
```
┌──────────────────────────┐
│  ╔═════════════════════╗ │
│  ║  Glassmorphic Card  ║ │ ← Glass effect background
│  ║                     ║ │
│  ║  Content goes here  ║ │ ← Burgundy text
│  ║                     ║ │
│  ╚═════════════════════╝ │
└──────────────────────────┘
```

### Button States

```
DEFAULT STATE:
┌─────────────────────┐
│   BUTTON TEXT       │ ← Burgundy gradient
└─────────────────────┘

HOVER STATE:
┌─────────────────────┐
│   BUTTON TEXT       │ ← Darker gradient, shadow
└─────────────────────┘
  (box-shadow lifted)

ACTIVE STATE:
┌─────────────────────┐
│   BUTTON TEXT       │ ← Same as default
└─────────────────────┘
  (scale: 0.97)
```

---

## Responsive Breakpoints Visual

```
Mobile (< 640px)
├─ Single column
├─ Larger text
├─ Stacked components
└─ Reduced animations

Tablet (640px - 1024px)
├─ Two columns
├─ Medium text
├─ Adaptive layout
└─ Full animations

Desktop (> 1024px)
├─ Three+ columns
├─ Optimized text
├─ Full layouts
└─ Enhanced animations
```

---

## Interactive Element States

### Form Input
```
DEFAULT:
┌─────────────────────┐
│ Input text here     │ ← Cream bg, burgundy border
└─────────────────────┘

FOCUS:
┌─────────────────────┐
│ Input text here     │ ← Burgundy border, glow
└─────────────────────┘
  (shadow added)

FILLED:
┌─────────────────────┐
│ User input text     │ ← Burgundy text color
└─────────────────────┘
```

### Toggle Button
```
INACTIVE:
┌─────────────────────┐
│   Choice A          │ ← Cream bg, burgundy text
└─────────────────────┘
┌─────────────────────┐
│   Choice B          │ ← Cream bg, burgundy text
└─────────────────────┘

ACTIVE (Choice A):
┌─────────────────────┐
│   Choice A          │ ← Burgundy gradient, white text
└─────────────────────┘
┌─────────────────────┐
│   Choice B          │ ← Cream bg, burgundy text
└─────────────────────┘
```

---

## Animation Pattern Visualization

### Text Reveal (Stagger)
```
Frame 1:  █________  (first child starts)
Frame 2:  ██_______  (second child starts)
Frame 3:  ███______  (third child starts)
...
Final:    ████████  (all revealed)
```

### Floating Element
```
Position:
    │ y: -10px
    │
────┼──── y: 0px (start)
    │
    │ y: 10px
```

### Sparkle Effect
```
Timeline:
opacity: 0  →  0.6  →  0  (fade in, fade out)
scale:   0  →  1   →  0  (grow, shrink)
```

---

## Decorative Elements

### Floral Symbol
```
❀ (Unicode: U+2740)
Color: Burgundy
Size: 20px - 60px depending on context
Opacity: 10% - 30% for background
         50% - 100% for prominent
```

### Divider Line
```
Simple:     ────────
Gradient:   ───█████───
Complex:    ╌─ ╌─ ╌─
```

### Decorative Dot
```
Small:      • (4px - 8px)
Medium:     ● (12px - 16px)
Large:      ● (20px - 24px)
```

---

## Accessibility Considerations

### Color Contrast
```
Text on Cream:
- Dark Burgundy #792323 on Cream #fefcf4
- Contrast Ratio: ~7:1 ✅ (AAA compliant)

- Burgundy #b02525 on White
- Contrast Ratio: ~5:1 ✅ (AA compliant)
```

### Touch Targets
```
Minimum size: 44px × 44px
Button:       48px × 48px
Link:         40px × 40px
Input:        44px height
```

### Font Sizing
```
Mobile:  14px - 18px body
Tablet:  15px - 19px body
Desktop: 16px - 20px body
```

---

## Performance Hints

### GPU-Accelerated Properties
```
✅ transform (translate, scale, rotate)
✅ opacity
✅ filter
❌ width, height (causes reflow)
❌ top, left (causes reflow)
```

### Recommended for Animation
```
• Position changes: use transform: translateX()
• Visibility: use opacity
• Size changes: use transform: scale()
• Effects: use filter or effects
```

---

## Printing/Export Guidelines

### Print Colors
- Convert RGB values for CMYK if needed
- Test print output
- Verify burgundy prints correctly
- Ensure sufficient contrast

### Export Formats
- PDF: Best for sharing
- PNG: Social media
- JPG: Web display
- SVG: Logos and graphics

---

## Mobile-Specific Considerations

### Touch Interactions
- Larger tap targets (min 44px)
- Reduced hover effects
- Simplified animations
- Clear visual feedback

### Performance
- Fewer particles/decorations
- Simplified animations
- Optimized images
- Efficient rendering

---

## Seasonal/Occasion Variations

### Spring Wedding
- Palette: Current (cream + burgundy)
- Florals: Cherry blossoms, peonies
- Mood: Fresh, romantic

### Summer Wedding
- Palette: Current with gold accents optional
- Florals: Sunflowers, tropical
- Mood: Bright, joyful

### Fall Wedding
- Palette: Current (burgundy is perfect)
- Florals: Dried flowers, leaves
- Mood: Warm, intimate

### Winter Wedding
- Palette: Add silver/white accents
- Florals: Evergreen, holly, berries
- Mood: Elegant, sophisticated

---

## Final Visual Checklist

✅ Burgundy and cream colors consistent throughout
✅ Typography hierarchy clear and readable
✅ Spacing balanced and generous
✅ Shadows subtle but present
✅ Gradients smooth and cohesive
✅ Animations smooth and purposeful
✅ Interactive elements responsive
✅ Mobile layout optimized
✅ Color contrast accessible
✅ Overall aesthetic: Premium, romantic, elegant

---

**Visual Reference Version**: 1.0
**Last Updated**: May 13, 2026
**Color Version**: Burgundy & Cream Luxury Aesthetic
