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

        this.load.image("backplatform", "../public/assets/plataformas-1.png");
        this.load.image("platform", "../public/assets/plataformas2-1.png");
        //this.load.spritesheet("dude", "../public/assets/perro1.png", {
        //frameWidth: 64,
        //frameHeight: 64,
        //});
        this.load.spritesheet("dude", "../public/assets/dogfinal1.png", {
            frameWidth: 64,
            frameHeight: 33,
        });

        this.load.spritesheet("dudeleft", "../public/assets/dogfinal1left.png", {
            frameWidth: 64,
            frameHeight: 33,
        });

        //this.load.image("obstacle", "../public/assets/obstaculo-1-1.png")
        this.load.image("obstacle", "../public/assets/piedra.png");
        this.load.image("moneda", "../public/assets/moneda.png");
        this.load.image("arbol1", "../public/assets/arboles-1-3.png");
        this.load.image("arbol2", "../public/assets/arboles-1-4.png");
        this.load.image("silla1", "../public/assets/sillas-1-1.png");
        this.load.image("silla2", "../public/assets/sillas-1-2.png");

        this.load.image("galleta", "../public/assets/consumible-1.png");
    }



    update() {
        console.log("start-pass")
        this.scene.start("main")
    }
}