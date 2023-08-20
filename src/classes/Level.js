import K from "../kaboom";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import { testLevel, level4 } from "../levels/layouts";
import { Boss, Enemy, HomingEnemy } from "./Enemy";
import { Player } from "./Player";

// Sprite imports Level 1
import mario from "../../assets/images/sprites/mario/sm-mario-one.png";
import princess from "../../assets/images/sprites/mario/sm-princess.png";
import cloud from "../../assets/images/sprites/mario/sm-cloud.png";
import pipe from "../../assets/images/sprites/mario/sm-pipe.png";
import castle from "../../assets/images/sprites/mario/sm-castle.png";
import hill from "../../assets/images/sprites/mario/sm-hill.png";

// Sprite imports Level 4
import iceplanet from "../../assets/images/sprites/space-invaders/iceplanet.png"
import shattered_planet from "../../assets/images/sprites/space-invaders/shattered_planet.png"
import redplanet from "../../assets/images/sprites/space-invaders/redplanet.png"
import sphereplanet from "../../assets/images/sprites/space-invaders/sphereplanet.png"


export class Level1 {
  constructor() {
    this.bossActive = false;
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("mario", mario, { sliceX: 1, sliceY: 2 });
    K.loadSprite("princess", princess, { sliceX: 1, sliceY: 2 });
    K.loadSprite("cloud", cloud);
    K.loadSprite("pipe", pipe, { sliceX: 1, sliceY: 2 });
    K.loadSprite("castle", castle, { sliceX: 4, sliceY: 4 });
    K.loadSprite("hill", hill, { sliceX: 4, sliceY: 2 });

    K.addLevel(testLevel, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        // Ground tile
        "=": () => [
          K.sprite("tiles", { frame: 2 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        // Aerial block
        "+": () => [
          K.sprite("tiles", { frame: 3 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],

        "*": () => {
          this.player = new Player("dino", 0, 150, 1);
          this.startLevel(this.player);
          return [this.player];
        },

        // Small bush
        a: () => [K.sprite("tiles", { frame: 48 }), "tiles"],
        b: () => [K.sprite("tiles", { frame: 49 }), "tiles"],
        c: () => [K.sprite("tiles", { frame: 50 }), "tiles"],

        // Clouds - to add the whole cloud you need to put out ^^ in the layout
        "^": () => [K.sprite("cloud"), "cloud"],

        // Super Mario
        // "^": () => [K.sprite("cloud"), "cloud"],
        "<": () => [
          K.sprite("mario", { frame: 0 }), // top half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "mario",
        ],
        ">": () => [
          K.sprite("mario", { frame: 1 }), // bottom half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "mario",
        ],

        // Princess
        // "^": () => [K.sprite("cloud"), "cloud"],
        ":": () => [
          K.sprite("princess", { frame: 0 }), // top half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "princess",
        ],
        "|": () => [
          K.sprite("princess", { frame: 1 }), // bottom half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "princess",
        ],

        // Pipe
        x: () => [
          K.sprite("pipe", { frame: 0 }), // top half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],
        y: () => [
          K.sprite("pipe", { frame: 1 }), // bottom half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],

        // Castle
        A: () => [K.sprite("castle", { frame: 0 })], // Top-left corner
        B: () => [K.sprite("castle", { frame: 1 })], // Top-second from left
        C: () => [K.sprite("castle", { frame: 2 })], // Top-third from left
        D: () => [K.sprite("castle", { frame: 3 })], // Top-right corner

        E: () => [K.sprite("castle", { frame: 4 })], // Second row - left
        F: () => [K.sprite("castle", { frame: 5 })], // Second row - second from left
        G: () => [K.sprite("castle", { frame: 6 })], // Second row - third from left
        H: () => [K.sprite("castle", { frame: 7 })], // Second row - right

        I: () => [K.sprite("castle", { frame: 8 })], // Third row - left
        J: () => [K.sprite("castle", { frame: 9 })], // Third row - second from left
        K: () => [K.sprite("castle", { frame: 10 })], // Third row - third from left
        L: () => [K.sprite("castle", { frame: 11 })], // Third row - right

        M: () => [K.sprite("castle", { frame: 12 })], // Bottom row - left
        N: () => [K.sprite("castle", { frame: 13 })], // Bottom row - second from left
        O: () => [K.sprite("castle", { frame: 14 })], // Bottom row - third from left
        P: () => [K.sprite("castle", { frame: 15 })], // Bottom row - right

        // Hill
        Q: () => [K.sprite("hill", { frame: 0 })], // Top-left corner
        R: () => [K.sprite("hill", { frame: 1 })], // Top-second from left
        S: () => [K.sprite("hill", { frame: 2 })], // Top-third from left
        T: () => [K.sprite("hill", { frame: 3 })], // Top-right corner

        U: () => [K.sprite("hill", { frame: 4 })], // Bottom row - left
        V: () => [K.sprite("hill", { frame: 5 })], // Bottom row - second from left
        W: () => [K.sprite("hill", { frame: 6 })], // Bottom row - third from left
        X: () => [K.sprite("hill", { frame: 7 })], // Bottom row - right
      },
    });
    this.level = K.add([logPlayerPosition(this, this.player)]);
  }

  startLevel() {
    this.enemyLoop = K.loop(2, () => new Enemy(this.player));
    this.homingEnemyLoop = K.loop(4, () => new HomingEnemy(this.player));
  }

  activateBoss() {
    this.bossActive = true;
    if (this.enemyLoop) {
      this.enemyLoop.cancel();
    }

    const boss = new Boss(this.player, this.homingEnemyLoop);
  }
}

export class Level4 {
  constructor() {
    this.bossActive = false;
    K.loadSprite("iceplanet", iceplanet);
    K.loadSprite("redplanet", redplanet);
    K.loadSprite("shattered_planet", shattered_planet, { sliceX: 2, sliceY: 2 });
    K.loadSprite("sphereplanet", sphereplanet, { sliceX: 2, sliceY: 2 });

    K.addLevel(level4, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        // Iceplanet
        "+": () => [
          K.sprite("iceplanet"),
          K.area(),
          K.body({ isStatic: true }),
          "iceplanet",
        ],

        "*": () => {
        this.player = new Player("dino", 0, 150, 1);
        this.startLevel(this.player);
        return [this.player];
        },

        // Red planet
        "<": () => [
          K.sprite("redplanet"),
          K.area(),
          K.body({ isStatic: true }),
          "redplanet",
        ],

        //  Shattered_planet
        a: () => [K.sprite("shattered_planet", { frame: 0 }), "shattered_planet"],
        b: () => [K.sprite("shattered_planet", { frame: 1 }), "shattered_planet"],

        c: () => [K.sprite("shattered_planet", { frame: 2 }), "shattered_planet"],
        d: () => [K.sprite("shattered_planet", { frame: 3 }), "shattered_planet"],

        // sphereplanet
        e: () => [K.sprite("sphereplanet", { frame: 0 }), "sphereplanet"],
        f: () => [K.sprite("sphereplanet", { frame: 1 }), "sphereplanet"],

        g: () => [K.sprite("sphereplanet", { frame: 2 }), "sphereplanet"],
        h: () => [K.sprite("sphereplanet", { frame: 3 }), "sphereplanet"],
      },
    });
    this.level = K.add([logPlayerPosition(this, this.player)]);
  }

  startLevel() {
    this.enemyLoop = K.loop(2, () => new Enemy(this.player));
    this.homingEnemyLoop = K.loop(4, () => new HomingEnemy(this.player));
  }

  activateBoss() {
    this.bossActive = true;
    if (this.enemyLoop) {
      this.enemyLoop.cancel();
    }

    const boss = new Boss(this.player, this.homingEnemyLoop);
  }
}

function logPlayerPosition(level, player) {
  return {
    add() {},
    update() {
      console.log(player.sprite.pos.x);
      if (player.sprite.pos.x > 1100 && !level.bossActive) {
        level.activateBoss();
      }
    },
  };
}
