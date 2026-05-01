import { CONFIG } from '../config.js';
import { pickThresholdColor } from '../utils/rect.js';

export class DumpMeter {
  constructor(scene) {
    this.scene = scene;
    this.cfg = CONFIG.meter;
    this.value = 0;

    const { barX, barY, barWidth, barHeight } = this.cfg;

    this.bg = scene.add
      .rectangle(barX, barY, barWidth, barHeight, this.cfg.barBackgroundColor)
      .setOrigin(0, 0)
      .setStrokeStyle(this.cfg.barBorderThickness, this.cfg.barBorderColor)
      .setDepth(100);

    this.fill = scene.add
      .rectangle(barX, barY, 0, barHeight, this.cfg.fillColorLow)
      .setOrigin(0, 0)
      .setDepth(101);

    this.label = scene.add
      .text(barX, barY + this.cfg.labelOffsetY, this.cfg.labelText, {
        fontFamily: 'monospace',
        fontSize: this.cfg.labelFontSize,
        color: this.cfg.labelColor,
      })
      .setDepth(100);
  }

  update(deltaSeconds) {
    this.value = Math.min(this.cfg.max, this.value + this.cfg.fillRatePerSecond * deltaSeconds);
    this.refresh();
  }

  relieve(amount) {
    this.value = Math.max(0, this.value - amount);
    this.refresh();
  }

  refresh() {
    const pct = this.value / this.cfg.max;
    this.fill.width = this.cfg.barWidth * pct;
    this.fill.fillColor = pickThresholdColor(
      this.value,
      this.cfg.midThreshold,
      this.cfg.highThreshold,
      this.cfg.fillColorLow,
      this.cfg.fillColorMid,
      this.cfg.fillColorHigh,
    );
  }

  isFull() {
    return this.value >= this.cfg.max;
  }
}
