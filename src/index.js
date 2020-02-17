import Phaser from "phaser";
import mainGame from "./mainGame.js";
import mainMenu from "./mainMenu.js";

const config = {
  type: Phaser.CANVAS,
  width: window.innerWidth > 1920 ? 1920 : window.innerWidth,
  height: window.innerHeight > 1080 ? 1080 : window.innerHeight,
  pixelArt: true,
  scene: [mainMenu, mainGame],
  physics: {
    default: "arcade",
    arcade: { debug: true }
  }
};

let game = new Phaser.Game(config);
