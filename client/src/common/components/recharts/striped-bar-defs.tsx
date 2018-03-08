import * as React from 'react';

export interface StripedBarDefsProps {
}

export function StripedBarDefs(props: StripedBarDefsProps) {
  return (
    <defs>
      <pattern
        id="pattern-stripe"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="2" height="4" transform="translate(0,0)" fill="white" />
      </pattern>
      <mask id="mask-stripe">
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-stripe)" />
      </mask>
    </defs>
  );
}
