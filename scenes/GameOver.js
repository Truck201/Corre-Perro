export default class GameOver extends Phaser.Scene {
    constructor() {
        super("game-over");
    }

    create() {
        let width = this.scale.width //Definir la mitad del Ancho
        let height = this.scale.height //Definir la mitad del Alto

        this.add.sprite(width / 2, height / 2, "GameOverBack").setScale(1);
        this.add.sprite(width / 2, height / 2 - 35, "gameOver").setScale(0.14);
        const miImagen = this.add.sprite(width / 2, height / 2 + 70, "rToRestart").setScale(0.3);

        //Agregar la "R" para Reiniciar e empezar Nuevamente
        this.input.keyboard.on("keydown-R", this.irEscenaPrincipal, this);

    }

    update() {
        
    }

    irEscenaPrincipal() {
        this.scene.start("main") //Ir a escena Main
    }

}



