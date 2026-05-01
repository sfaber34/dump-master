export function addLabel(scene, x, y, text, fontSize, color) {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'monospace',
      fontSize,
      color,
    })
    .setOrigin(0.5);
}

export function pickThresholdColor(value, midThreshold, highThreshold, lowColor, midColor, highColor) {
  if (value >= highThreshold) return highColor;
  if (value >= midThreshold) return midColor;
  return lowColor;
}
