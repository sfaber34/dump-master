import Phaser from 'phaser';

export function bindMovementKeys(scene, keyConfig) {
  return scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes[keyConfig.up],
    down: Phaser.Input.Keyboard.KeyCodes[keyConfig.down],
    left: Phaser.Input.Keyboard.KeyCodes[keyConfig.left],
    right: Phaser.Input.Keyboard.KeyCodes[keyConfig.right],
  });
}

export function bindKey(scene, keyName) {
  return scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[keyName]);
}
