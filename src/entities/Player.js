import { CONFIG } from '../config.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
    const { startX, startY } = CONFIG.player;

    this.sprite = scene.physics.add.image(startX, startY, 'player_front');
    this.sprite.setDepth(10);
    this.sprite.body.setCollideWorldBounds(true);

    this.facing = 'front';
  }

  update(keys) {
    const { speed } = CONFIG.player;
    let vx = 0;
    let vy = 0;
    if (keys.left.isDown) vx -= 1;
    if (keys.right.isDown) vx += 1;
    if (keys.up.isDown) vy -= 1;
    if (keys.down.isDown) vy += 1;

    if (vx !== 0 && vy !== 0) {
      const inv = 1 / Math.SQRT2;
      vx *= inv;
      vy *= inv;
    }

    this.sprite.body.setVelocity(vx * speed, vy * speed);

    if (Math.abs(vx) > Math.abs(vy)) {
      this.facing = vx > 0 ? 'side_right' : 'side_left';
    } else if (vy < 0) {
      this.facing = 'back';
    } else if (vy > 0) {
      this.facing = 'front';
    }

    if (this.facing === 'side_left' || this.facing === 'side_right') {
      this.sprite.setTexture('player_side');
      this.sprite.setFlipX(this.facing === 'side_left');
    } else if (this.facing === 'back') {
      this.sprite.setTexture('player_back');
      this.sprite.setFlipX(false);
    } else {
      this.sprite.setTexture('player_front');
      this.sprite.setFlipX(false);
    }
  }
}
