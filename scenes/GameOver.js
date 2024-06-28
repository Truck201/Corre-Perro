export default class GameOver extends Phaser.Scene {
    constructor() {
        super("game-over");
    }

    create() {
        let width = this.scale.width //Definir la mitad del Ancho
        let height = this.scale.height //Definir la mitad del Alto

        this.add.sprite(width / 2, height / 2, "GameOverBack").setScale(1);
        this.add.sprite(width / 2, height / 2 - 35, "gameOver").setScale(0.14);
        this.add.sprite(width / 2, height / 2 + 70, "rToRestart").setScale(0.3);
        this.add.sprite(width / 2 + 220, height / 2 , "cucha").setScale(2);

        //Agregar la "R" para Reiniciar e empezar Nuevamente
        this.input.keyboard.on("keydown-R", this.irEscenaPrincipal, this);
    }

    irEscenaPrincipal() {
        this.scene.start("main") //Ir a escena Main
    }
}



