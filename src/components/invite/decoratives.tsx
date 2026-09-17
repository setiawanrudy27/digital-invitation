"use client";

export const themeColors = {
  primary: "#8B3A42",
  secondary: "#C97A7E",
  bg: "#F5F0E8",
  green: "#7A8B6F",
  gold: "#C9A84C",
  surface: "#FAF6EF",
  text: "#3C2A2A",
  muted: "#8C7575",
  cream: "#FDF8F0",
  blush: "#E8C4C8",
  sage: "#A3B39A",
  ivory: "#F2ECE4",
  charcoal: "#2C1E1E",
};

export function GoldOrchid({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M50 50 C45 30 35 20 30 30 C25 40 35 55 50 50Z" fill="currentColor" opacity="0.15" />
      <path d="M50 50 C55 30 65 20 70 30 C75 40 65 55 50 50Z" fill="currentColor" opacity="0.15" />
      <path d="M50 50 C35 55 20 65 30 70 C40 75 55 65 50 50Z" fill="currentColor" opacity="0.15" />
      <path d="M50 50 C65 55 80 65 70 70 C60 75 45 65 50 50Z" fill="currentColor" opacity="0.15" />
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.2" />
      <path d="M50 50 L50 20 M50 50 L50 80 M50 50 L20 50 M50 50 L80 50" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    </svg>
  );
}

export function BotanicalLeaf({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 60" fill="none" className={className} aria-hidden="true">
      <path d="M20 2 C8 12 2 28 20 58 C38 28 32 12 20 2Z" fill="currentColor" opacity="0.12" />
      <path d="M20 2 C10 18 10 38 20 58" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <path d="M20 15 C14 22 12 32 20 45" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
      <path d="M20 15 C26 22 28 32 20 45" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
    </svg>
  );
}

const leafPositions = [
  { left: "5%", top: "15%", size: 28, delay: 0 },
  { left: "92%", top: "10%", size: 22, delay: 0.5 },
  { left: "8%", top: "80%", size: 24, delay: 1 },
  { left: "88%", top: "85%", size: 20, delay: 1.5 },
  { left: "50%", top: "5%", size: 18, delay: 0.8 },
  { left: "3%", top: "50%", size: 16, delay: 2 },
  { left: "95%", top: "55%", size: 16, delay: 2.5 },
];

export function FloatingLeaves({ count = 7, color }: { count?: number; color?: string }) {
  const c = color || themeColors.green;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {leafPositions.slice(0, count).map((leaf, i) => (
        <div
          key={i}
          className="absolute leaf-float"
          style={{
            left: leaf.left,
            top: leaf.top,
            color: c,
            opacity: 0.08,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${10 + i}s`,
          }}
        >
          <BotanicalLeaf size={leaf.size} />
        </div>
      ))}
    </div>
  );
}
