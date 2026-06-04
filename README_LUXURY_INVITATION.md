# 💍 Luxury Wedding Invitation Website

## Overview

A premium, animated wedding invitation website featuring elegant botanical vintage aesthetics. This fully-featured digital wedding platform combines sophisticated design, cinematic animations, and luxurious styling to create an unforgettable guest experience.

---

## 🎨 Design Features

### Visual Aesthetic
- **Premium & Romantic**: Burgundy + cream color palette
- **Classy & Elegant**: Serif typography with script accents
- **Cinematic**: Smooth scrolling with parallax effects
- **Soft Luxury**: Gentle animations and generous spacing
- **Fully Responsive**: Mobile-first design for all devices

### Color Scheme
```
Primary:     Burgundy #b02525
Dark:        Dark Burgundy #792323
Secondary:   Burgundy #922323
Background:  Cream #fefcf4
Light BG:    Light Cream #fdf8f3
```

### Typography
```
Display:     Cormorant Garamond (elegant serif)
Script:      Great Vibes (romantic cursive)
Body:        Montserrat (modern sans-serif)
```

---

## ✨ Key Features

### Animated Sections
1. **Cover Section** - Floral frame, couple names, guest card
2. **Opening Section** - Romantic introduction with sparkles
3. **Couple Section** - Photo cards with glassmorphism effect
4. **Event Section** - Countdown timer + event details
5. **Gallery Section** - Photo grid with lightbox
6. **Quote Section** - Romantic quotes with particles
7. **RSVP Section** - Interactive form + guest list
8. **Gift Section** - Payment options modal
9. **Thank You Section** - Elegant closing

### Animation Capabilities
- 🌸 Floating flowers with gentle movement
- ✨ Sparkle particle effects
- 📜 Text reveal animations
- 🔄 Background zoom effects
- 🎬 Smooth scroll transitions
- 🎭 Fade-in on scroll
- 💫 Interactive button states

### Interactive Features
- RSVP form with attendance confirmation
- Guest gift/payment options
- Photo gallery with full-screen viewer
- Social media integration
- Background music player
- Scroll progress indicator

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css              # Theme colors & typography
│   ├── layout.tsx               # Root layout
│   └── invite/
│       └── [slug]/
│           ├── page.tsx         # Server component
│           └── invitation-client.tsx  # Client component (Lenis)
│
└── components/
    └── invite/
        ├── cover-section.tsx         # Luxury cover
        ├── opening-section.tsx       # Introduction
        ├── couple-section.tsx        # Couple cards
        ├── event-section.tsx         # Event + countdown
        ├── gallery-section.tsx       # Photo gallery
        ├── quote-section.tsx         # Romantic quote
        ├── rsvp-section.tsx          # RSVP form
        ├── gift-section.tsx          # Gift options
        ├── thank-you-section.tsx     # Closing
        ├── loading-screen.tsx        # Loading animation
        ├── music-player.tsx          # Audio player
        └── ... (other components)
```

---

## 🎬 Animation System

### Smooth Scroll
```typescript
// Integrated Lenis for butter-smooth scrolling
new Lenis({
  duration: 1.2,
  smooth: true,
})
```

### Common Animations
```typescript
// Text reveal with stagger
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, staggerChildren: 0.15 }}
>
  Content
</motion.div>

// Floating element
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 6, repeat: Infinity }}
>
  Content
</motion.div>
```

---

## 🎨 Customization

### Change Colors
Edit `src/app/globals.css`:
```css
--color-burgundy-500: #your-color;
--color-cream-50: #your-background;
```

### Modify Animations
Adjust duration in component files:
```typescript
transition={{ duration: 0.8 }} // Increase for slower
```

### Update Typography
Replace font imports in `globals.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=YourFont:wght@400;700");
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first approach
- Touch-friendly interactions
- Optimized animations
- Responsive typography

---

## 📊 Tech Stack

```json
{
  "nextjs": "16.2.4",
  "react": "19.2.4",
  "tailwindcss": "4",
  "framer-motion": "12.38.0",
  "gsap": "3.15.0",
  "lenis": "1.0.0",
  "typescript": "5.x"
}
```

---

## 📚 Documentation

Comprehensive guides included:

1. **LUXURY_AESTHETIC_GUIDE.md**
   - Complete design system
   - Animation specifications
   - Component architecture

2. **QUICK_REFERENCE.md**
   - Color codes & usage
   - Animation patterns
   - Component templates

3. **IMPLEMENTATION_SUMMARY.md**
   - Project overview
   - Delivery checklist
   - Future enhancements

4. **VISUAL_REFERENCE.md**
   - Color palette guide
   - Typography examples
   - Accessibility notes

---

## ✅ Features Checklist

### Design
- ✅ Premium color scheme
- ✅ Elegant typography
- ✅ Sophisticated shadows
- ✅ Responsive layout
- ✅ Glassmorphism effects

### Animations
- ✅ Smooth scroll
- ✅ Floating elements
- ✅ Text reveals
- ✅ Particle effects
- ✅ Interactive transitions

### Functionality
- ✅ RSVP form
- ✅ Gift options
- ✅ Photo gallery
- ✅ Music player
- ✅ Countdown timer

### Performance
- ✅ GPU acceleration
- ✅ Optimized images
- ✅ Efficient rendering
- ✅ Lazy loading
- ✅ Mobile optimized

---

## 🌐 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Latest version |
| Firefox | ✅ Full | Latest version |
| Safari  | ✅ Full | Test backdrop-filter |
| Edge    | ✅ Full | Chromium-based |
| Mobile  | ✅ Full | Optimized |

---

## 🔧 Environment Setup

### Required Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Optional Configuration
```env
ANALYTICS_ID=optional
CUSTOM_DOMAIN=optional
```

---

## 📈 Performance Metrics

### Target Metrics
- Lighthouse: > 80
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### Optimization Tips
1. Enable image optimization
2. Minify CSS/JS
3. Configure CDN
4. Set cache headers
5. Monitor Core Web Vitals

---

## 🐛 Troubleshooting

### Animations Not Smooth
- Check GPU acceleration enabled
- Verify frame rate (60fps)
- Test on actual device

### Colors Not Displaying
- Clear browser cache
- Check hex color values
- Verify CSS is loaded

### Mobile Issues
- Test responsive breakpoints
- Check touch targets
- Verify animations simplified

---

## 🚀 Deployment

### Recommended Platforms
- Vercel (optimal for Next.js)
- Netlify
- AWS Amplify
- Heroku

### Pre-Deployment Checklist
- [ ] All animations tested
- [ ] Colors verified on devices
- [ ] Forms validated
- [ ] Images optimized
- [ ] SEO tags set
- [ ] Analytics configured
- [ ] Performance audited

---

## 📞 Support & Maintenance

### Common Tasks

**Update Content**
1. Modify component text
2. Replace images
3. Update dates/times
4. Change colors

**Fix Issues**
1. Check browser console
2. Test on different devices
3. Clear cache
4. Review documentation

**Optimize Performance**
1. Reduce animation count
2. Optimize images
3. Minify CSS
4. Enable caching

---

## 📜 License

This project is created for wedding purposes. Feel free to customize and deploy.

---

## 🎁 Project Highlights

### Why This Design?
- **Premium aesthetic** that reflects wedding elegance
- **Romantic colors** that evoke emotion and warmth
- **Cinematic animations** that engage and delight
- **Responsive design** for all guests
- **Complete functionality** for all needs

### What Makes It Special?
- Luxury burgundy + cream palette
- Sophisticated typography system
- Smooth scroll experience
- Floating animations
- Interactive RSVP system
- Beautiful photo gallery
- Modern tech stack

---

## 🎯 Next Steps

1. **Customize Content** - Update text, dates, photos
2. **Configure Payment** - Set up QRIS, bank details
3. **Test Thoroughly** - Try on all devices
4. **Deploy** - Choose hosting platform
5. **Share** - Send invitation link to guests
6. **Monitor** - Track RSVP responses
7. **Celebrate** - Enjoy your beautiful wedding!

---

## 📞 Questions?

Refer to the comprehensive documentation files:
- Technical details → LUXURY_AESTHETIC_GUIDE.md
- Quick solutions → QUICK_REFERENCE.md
- Project overview → IMPLEMENTATION_SUMMARY.md
- Design reference → VISUAL_REFERENCE.md

---

## 🎉 Thank You

For using this luxury wedding invitation platform. May your celebration be as beautiful as this design!

---

**Version**: 1.0
**Last Updated**: May 13, 2026
**Status**: ✅ Production Ready
**Ready to Deploy**: Yes
