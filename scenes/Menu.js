export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("main-menu");
    }
    create() {
        let width = this.scale.width //Definir la mitad del Ancho
        let height = this.scale.height //Definir la mitad del Alto
        let miImagen //Definir una Variable en la escena

        //Agregar Sondios
        this.boomSample = this.sound.add('soundmenuboom')
        this.birdsSoundSample = this.sound.add('soundmenubirds')
        this.menuMusic = this.sound.add('menumusic')

        //Iniciar tema
        this.menuMusic.play();

        //Background
        this.add.sprite(width / 2, 107, "myMenu").setScale(0.6);
        this.birdsSoundSample.play();
        //Button
        miImagen = this.add.image(width / 2, height / 2, 'play').setScale(0.15);
        miImagen.setInteractive();
        //Title
        this.add.sprite(width / 2, height / 4 + 10, "titulo").setScale(0.6);
        //Button Animations Hover, Down, Out
        miImagen.on('pointerover', () => {
            // Cambia el tamaño de la imagen al pasar el mouse
            miImagen.setScale(0.2);
            console.log("on")
        });
        miImagen.on('pointerout', () => {
            // Cambia el tamaño de la imagen al pasar el mouse
            miImagen.setScale(0.15);
            console.log("off")
        });
        miImagen.on('pointerdown', () => {
            miImagen.setScale(0.15); // Vuelve al tamaño original
            console.log("active")
            this.boomSample.play();
            this.add.image(width / 2, height / 2, 'damage').setScale(0.37); //Explosión
            this.time.addEvent({
                delay: 1000, // demora 1 segundo en iniciar
                loop: true,
                callback: () => {
                    this.irEscenaPrincipal(); //Llama la escena Main
                },
            })
        });
    }
    irEscenaPrincipal() {
        this.menuMusic.stop();
        this.birdsSoundSample.stop();
        this.scene.start("main") //Ir a escena Main
    }

}