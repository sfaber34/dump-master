import Phaser from 'phaser';
import { CONFIG } from './config.js';
import { GameScene } from './scenes/GameScene.js';
import { EndScene } from './scenes/EndScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width: CONFIG.game.width,
  height: CONFIG.game.height,
  backgroundColor: CONFIG.game.backgroundColor,
  pixelArt: CONFIG.game.pixelArt,
  parent: CONFIG.game.parentElementId,
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [GameScene, EndScene],
});
