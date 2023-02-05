import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', 'tiles/dungeon_tiles.png');
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json');

    this.load.atlas('player', 'character/player.png', 'character/player.json');
    this.load.atlas('rogue', 'rogue/rogue.png', 'rogue/rogue.json');
    this.load.atlas('warrior', 'warrior/warrior.png', 'warrior/warrior.json');
    this.load.atlas('ghost-boy', 'ghost/ghost-boy.png', 'ghost/ghost-boy.json');
  }

  create() {
    this.scene.start('game');
  }
}
