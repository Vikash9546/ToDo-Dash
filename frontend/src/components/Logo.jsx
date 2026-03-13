import { useId } from 'react';

export default function Logo({ className = 'w-10 h-10' }) {
  const gridId = useId().replace(/:/g, '-');
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Project M. logo"
    >
      <defs>
        <pattern id={gridId} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        </pattern>
      </defs>
      {/* Bottom-right circle - lighter, translucent purple */}
      <circle cx="52" cy="52" r="26" fill="#A68BEB" fillOpacity="0.85" stroke="#9B7FE8" strokeWidth="1" />
      {/* Bottom-left circle - lighter, translucent purple */}
      <circle cx="28" cy="52" r="26" fill="#A68BEB" fillOpacity="0.85" stroke="#9B7FE8" strokeWidth="1" />
      {/* Top circle - vibrant purple with grid texture */}
      <circle cx="40" cy="32" r="26" fill="#7A4EF5" stroke="#6E44DB" strokeWidth="2" />
      <circle cx="40" cy="32" r="26" fill={`url(#${gridId})`} />
    </svg>
  );
}
