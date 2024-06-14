import Game from "./scenes/Game.js";
import Preload from "./scenes/Preload.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 626,
  height: 400,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 650,
      height: 400,
    },
    max: {
      width: 920,
      height: 830,
    },
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 240 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  backgroundColor: '#5c5b5b',
  scene: [Preload, Game],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);