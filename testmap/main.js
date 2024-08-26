const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    // โหลด tileset image และ Tiled map (JSON)
    this.load.image('tiles', 'map1.png');
    this.load.tilemapTiledJSON('map', 'maptree.json');
}

function create() {
    const map = this.make.tilemap({ key: 'map' });
    
    // Match the tileset name used in Tiled with the one you loaded
    const tileset = map.addTilesetImage('tileset_name_in_tiled', 'tiles');
    
    // Create the layers specified in Tiled
    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const obstaclesLayer = map.createLayer('Obstacles', tileset, 0, 0);

    // Optional: Set collision on layers
    obstaclesLayer.setCollisionByProperty({ collides: true });
    
    // Optional: Add physics, player, or other game logic here
}

