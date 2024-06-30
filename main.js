import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import MainMenu from "./scenes/Menu.js";
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
      width: 970,
      height: 860,
    },
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 240 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  backgroundColor: '#5c5b5b',
  scene: [Preload, MainMenu, Game, GameOver],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
