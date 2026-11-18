import { useId } from 'react';

// Fine film grain over flat colour. Rendered once; costs nothing per frame.
export default function Grain({ className = '' }) {
  const id = `grain-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg className={`grain ${className}`} aria-hidden="true" focusable="false">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
