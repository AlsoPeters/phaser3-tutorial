import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');

    map.createLayer('ground', tileset);
    const wallsLayer = map.createLayer('wall', tileset);

    wallsLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });

    const player = this.add.sprite(
      128,
      128,
      'player',
      'adventurer-idle-00.png'
    );

    this.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNames('player', {
        start: 0,
        end: 5,
        prefix: 'adventurer-idle-0',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 7,
    });

    this.anims.create({
      key: 'player-run',
      frames: this.anims.generateFrameNames('player', {
        start: 0,
        end: 5,
        prefix: 'adventurer-run-0',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 10,
    });

    player.anims.play('player-idle');
  }
}
