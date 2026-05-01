import { CONFIG } from '../config.js';

export class Office {
  constructor(scene) {
    this.scene = scene;
    const { width, height } = CONFIG.game;

    scene.add.tileSprite(0, 0, width, height, 'carpet').setOrigin(0, 0).setDepth(0);

    scene.add.tileSprite(0, 0, width, 16, 'wall_trim').setOrigin(0, 0).setDepth(1);
    scene.add.tileSprite(0, height - 16, width, 16, 'wall_trim').setOrigin(0, 0).setDepth(1);
    scene.add.tileSprite(0, 0, 16, height, 'wall_trim').setOrigin(0, 0).setDepth(1);
    scene.add.tileSprite(width - 16, 0, 16, height, 'wall_trim').setOrigin(0, 0).setDepth(1);

    this.placeWorkstation(scene, 320, 90, 'down');
    this.placeWorkstation(scene, 640, 90, 'down');
    this.placeWorkstation(scene, 320, 550, 'up');
    this.placeWorkstation(scene, 640, 550, 'up');

    scene.add.image(width / 2, 80, 'water_cooler').setDepth(2);
    scene.add.image(width / 2, height - 80, 'printer').setDepth(2);

    scene.add.image(50, 320, 'plant').setDepth(2);
    scene.add.image(width - 50, 320, 'plant').setDepth(2);
    scene.add.image(220, 320, 'plant').setDepth(2);
    scene.add.image(width - 220, 320, 'plant').setDepth(2);

    scene.add.image(width / 2, 320, 'cubicle_h').setDepth(1);
    scene.add.image(width / 2 - 60, 240, 'cubicle_v').setScale(1, 0.5).setDepth(1);
    scene.add.image(width / 2 + 60, 240, 'cubicle_v').setScale(1, 0.5).setDepth(1);
    scene.add.image(width / 2 - 60, 400, 'cubicle_v').setScale(1, 0.5).setDepth(1);
    scene.add.image(width / 2 + 60, 400, 'cubicle_v').setScale(1, 0.5).setDepth(1);
  }

  placeWorkstation(scene, x, y, facing) {
    const deskY = facing === 'down' ? y : y;
    const monitorOffset = facing === 'down' ? -10 : 10;
    const chairOffset = facing === 'down' ? 28 : -28;

    scene.add.image(x, deskY, 'desk').setDepth(1);
    scene.add.image(x - 18, deskY + monitorOffset, 'monitor').setDepth(2);
    scene.add.image(x + 18, deskY + monitorOffset, 'monitor').setDepth(2);
    scene.add.image(x, deskY + chairOffset, 'chair').setDepth(2);
  }
}
