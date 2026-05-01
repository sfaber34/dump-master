import { CONFIG } from '../config.js';

export class Bathroom {
  constructor(scene, x, y) {
    this.scene = scene;
    this.cooldownRemaining = 0;

    this.sprite = scene.physics.add.staticImage(x, y, 'bathroom_open');
    this.sprite.setDepth(2);
  }

  isAvailable() {
    return this.cooldownRemaining <= 0;
  }

  use() {
    this.cooldownRemaining = CONFIG.bathroom.cooldownSeconds;
    this.sprite.setTexture('bathroom_busy');
  }

  update(deltaSeconds) {
    if (this.cooldownRemaining <= 0) return;
    this.cooldownRemaining -= deltaSeconds;
    if (this.cooldownRemaining <= 0) {
      this.cooldownRemaining = 0;
      this.sprite.setTexture('bathroom_open');
    }
  }
}
