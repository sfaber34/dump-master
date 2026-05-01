import Phaser from 'phaser';
import { CONFIG } from '../config.js';
import { bindKey } from '../utils/input.js';

export class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  init(data) {
    this.won = !!(data && data.won);
  }

  create() {
    const { width, height } = CONFIG.game;
    const cfg = CONFIG.end;

    this.add
      .rectangle(width / 2, height / 2, width, height, cfg.overlayColor, cfg.overlayAlpha)
      .setOrigin(0.5);

    const titleText = this.won ? cfg.winText : cfg.loseText;
    const titleColor = this.won ? cfg.winColor : cfg.loseColor;

    this.add
      .text(width / 2, height / 2, titleText, {
        fontFamily: 'monospace',
        fontSize: cfg.titleFontSize,
        color: titleColor,
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + cfg.promptOffsetY, cfg.promptText, {
        fontFamily: 'monospace',
        fontSize: cfg.promptFontSize,
        color: cfg.promptColor,
      })
      .setOrigin(0.5);

    bindKey(this, CONFIG.input.restart).on('down', () => {
      this.scene.start('GameScene');
    });
  }
}
