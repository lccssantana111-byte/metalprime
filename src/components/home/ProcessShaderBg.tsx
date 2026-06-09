'use client'

import LineWaves from '@/components/ui/line-waves'

export default function ProcessShaderBg() {
  return (
    <LineWaves
      speed={0.18}
      innerLineCount={28}
      outerLineCount={34}
      warpIntensity={0.85}
      rotation={-35}
      edgeFadeWidth={0.0}
      colorCycleSpeed={0.6}
      brightness={0.7}
      color1="#f97316"
      color2="#fb923c"
      color3="#c2410c"
      enableMouseInteraction={false}
    />
  )
}
