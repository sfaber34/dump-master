import Phaser from 'phaser';
import { CONFIG } from '../config.js';
import { Player } from '../entities/Player.js';
import { Bathroom } from '../entities/Bathroom.js';
import { Office } from '../entities/Office.js';
import { DumpMeter } from '../systems/DumpMeter.js';
import { bindMovementKeys } from '../utils/input.js';
import { loadAllTextures } from '../art/textures.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    loadAllTextures(this);
  }

  create() {
    this.physics.world.setBounds(0, 0, CONFIG.game.width, CONFIG.game.height);

    this.office = new Office(this);
    this.bathrooms = CONFIG.bathroom.positions.map((p) => new Bathroom(this, p.x, p.y));
    this.player = new Player(this);
    this.meter = new DumpMeter(this);

    this.timeRemaining = CONFIG.game.winTimeSeconds;
    this.timerLabel = this.add
      .text(CONFIG.hud.timerX, CONFIG.hud.timerY, '', {
        fontFamily: 'monospace',
        fontSize: CONFIG.hud.timerFontSize,
        color: CONFIG.hud.timerColor,
      })
      .setOrigin(1, 0)
      .setDepth(100);

    this.keys = bindMovementKeys(this, CONFIG.input);

    this.bathrooms.forEach((b) => {
      this.physics.add.overlap(this.player.sprite, b.sprite, () => this.tryUseBathroom(b));
    });
  }

  tryUseBathroom(bathroom) {
    if (!bathroom.isAvailable()) return;
    bathroom.use();
    this.meter.relieve(CONFIG.bathroom.relieveAmount);
  }

  update(_time, delta) {
    const ds = delta / 1000;

    this.player.update(this.keys);
    this.meter.update(ds);
    this.bathrooms.forEach((b) => b.update(ds));

    this.timeRemaining = Math.max(0, this.timeRemaining - ds);
    this.timerLabel.setText(`${CONFIG.hud.timerLabel}: ${Math.ceil(this.timeRemaining)}`);

    if (this.meter.isFull()) {
      this.scene.start('EndScene', { won: false });
    } else if (this.timeRemaining <= 0) {
      this.scene.start('EndScene', { won: true });
    }
  }
}
