export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        //load images
        this.load.image("sky", "../public/assets/background-1.png");

        this.load.image("cielo", "../public/assets/backcielo.png");
        this.load.image("nubes", "../public/assets/backnube.png");
        this.load.image("backmontana", "../public/assets/backmontaña.png");
        this.load.image("frontmontana", "../public/assets/frontmontaña.png");
        this.load.image("ciudad", "../public/assets/ciudadela-2.png")

        this.load.image("backplatform", "../public/assets/plataformas-1.png");
        this.load.image("platform", "../public/assets/plataformas2-1.png");
        
        this.load.spritesheet("dude", "../public/assets/dogfinal1.png", {
            frameWidth: 64,
            frameHeight: 33,
        });

        this.load.spritesheet("murcielago", "../public/assets/murcielago-1.png", {
            frameWidth: 32,
            frameHeight: 32,
        })

        //this.load.image("obstacle", "../public/assets/obstaculo-1-1.png")
        this.load.image("obstacle", "../public/assets/piedra.png");
        this.load.image("moneda", "../public/assets/moneda.png");
        this.load.image("galleta", "../public/assets/consumible-1.png");
        this.load.image("noche", "../public/assets/noche-1.png")
    }



    update() {
        console.log("start-pass")
        this.scene.start("main")
    }
}