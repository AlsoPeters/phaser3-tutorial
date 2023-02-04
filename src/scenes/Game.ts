import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Physics.Arcade.Sprite;

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

    this.player = this.physics.add.sprite(
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

    this.player.anims.play('player-idle');

    this.physics.add.collider(this.player, wallsLayer);
    this.player.body.setSize((this.player.width = 32));
  }

  update(time: number, delta: number): void {
    if (!this.cursors || !this.player) {
      return;
    }

    const speed = 100;

    if (this.cursors.left?.isDown) {
      this.player.anims.play('player-run', true);
      this.player.setVelocity(-speed, 0);
      this.player.scaleX = -1;
      this.player.body.offset.x = 36;
    } else if (this.cursors.right?.isDown) {
      this.player.anims.play('player-run', true);
      this.player.setVelocity(speed, 0);
      this.player.scaleX = 1;
      this.player.body.offset.x = 0;
    } else if (this.cursors.up?.isDown) {
      this.player.anims.play('player-run', true);
      this.player.setVelocity(0, -speed);
    } else if (this.cursors.down?.isDown) {
      this.player.anims.play('player-run', true);
      this.player.setVelocity(0, speed);
    } else {
      const parts = this.player.anims.currentAnim.key.split('-');
      parts[1] = 'idle';

      this.player.play(parts.join('-'));
      this.player.setVelocity(0, 0);
      this.cameras.main.startFollow(this.player, true);
    }
  }
}

// vid: 30:00
