export default class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {

        //Todo para desarrollar el menu
        this.load.image("play", "./public/assets/playbtn.png")
        this.load.image("myMenu", "./public/assets/FondoMenu.jpg");
        this.load.image("titulo", "./public/assets/Titulo.png");
        this.load.image("damage", "./public/assets/damage.png");

        //Fondo de la Escena Principal
        this.load.image("sky", "./public/assets/background-1.png");
        this.load.image("cielo", "./public/assets/backcielo.png");
        this.load.image("nubes", "./public/assets/backnube.png");
        this.load.image("backmontana", "./public/assets/backmontaña.png");
        this.load.image("frontmontana", "./public/assets/frontmontaña.png");
        this.load.image("backplatform", "./public/assets/plataformas-1.png");
        this.load.image("platform", "./public/assets/plataformas2-1.png");
        this.load.image("ciudad", "./public/assets/ciudadela-1.png");

        //Para la Condición de Derrota
        this.load.image("cucha", "./public/assets/cucha-1.png");
        this.load.image("gameOver", "./public/assets/gameOver2.jpg");
        this.load.image('GameOverBack', "./public/assets/gameOverBack.png");
        this.load.image('rToRestart', "./public/assets/rToRestart.png");

        //Filtro de la Noche
        this.load.image("noche", "./public/assets/noche-1.png");

        //Cosas del y para el Jugador
        this.load.image('vidas', "./public/assets/vidas-1.png");
        this.load.image('ladrido', "./public/assets/ladrido-1.png")

        //Animaciones Personaje
        this.load.spritesheet("dude", "./public/assets/dogfinal1.png", {
            frameWidth: 64,
            frameHeight: 33,
        });

        //Animaciones Murcielago
        this.load.spritesheet("murcielago", "./public/assets/murcielago-1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        //Animaciones Gato
        this.load.spritesheet("gato", "./public/assets/gato-1.png", {
            frameWidth: 190,
            frameHeight: 190,
        });

        //Obstáculos Monedas y Galleta
        this.load.image("obstacle", "./public/assets/piedra.png");
        this.load.image("moneda", "./public/assets/moneda.png");
        this.load.image("galleta", "./public/assets/consumible-1.png");

        //Todos los audios
        //Sonidos del juego y del Perro
        this.load.audio("sounddogcookies","./sounds/dog-cookieCollect.mp3");
        this.load.audio("sounddogcoins","./sounds/dog-coinCollect.mp3");
        this.load.audio("sounddogrun","./sounds/dog-stepsRun.mp3");
        this.load.audio("sounddogbark","./sounds/dog-bark.mp3");
        this.load.audio("sounddoghurt","./sounds/dog-hurt.mp3");
        this.load.audio("sounddogjump","./sounds/dog-jump.mp3");
        this.load.audio("sounddoglose","./sounds/dog-loseSound.mp3");
        //Sonidos Gato
        this.load.audio("soundcat","./sounds/cat-sound.mp3");
        this.load.audio("soundcatangry","./sounds/cat-angry.mp3");
        //Sonido Murcielago
        this.load.audio("soundbat","./sounds/bat-spawn.mp3");
        //Menu Sounds
        this.load.audio("soundmenuboom","./sounds/menu-boom.mp3");
        this.load.audio("soundmenubirds","./sounds/menu-birds.mp3");

        //Agregando Temas
        this.load.audio("gamemusic","./sounds/music/gameMusicV2.mp3");
        this.load.audio("menumusic","./sounds/music/intro.mp3");

    }

    update() {
        console.log("start-pass")
        this.scene.start("main-menu")
    }
}