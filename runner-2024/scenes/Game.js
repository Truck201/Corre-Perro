// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
    this.isPaused = false;
    score = 0
  }

  create() {
    //add images
    width = this.scale.width
    height = this.scale.height
    
    //Agregar imágenes de fondo
    cielo = this.add.image(width * 0.5, height * altura, 'cielo')
      .setScrollFactor(speedScrollCielo).setDepth(1);

    this.add.image(width * 0.5, height * altura, 'nubes')
      .setScrollFactor(speedScrollNubes).setDepth(2);

    this.add.image(width * 0.5, height * altura, 'backmontana')
      .setScrollFactor(speedScrollBackMontana).setDepth(3);

    this.add.image(width * 0.5, height * altura, 'frontmontana')
      .setScrollFactor(speedScrollFrontMontana).setDepth(4);
    
      //Hacer un grupo de Objetos, Crear un piso del jugador
    this.pisos = this.physics.add.staticGroup();
    piso = this.pisos.create(width * 0.5, height * 0.8, 'backplatform')
      .setScrollFactor(0).setDepth(0);

    //crear(this, 6, 'nubes', speedScrollNubes)
    //crear(this, 2, 'backmontana', 0.40)
    //crear(this, 4, 'frontmontana', 0.60)
    //crear(this, 2, 'backplatform', 1.4)

    // add player
    this.player = this.physics.add.sprite(270, 260, "dude")
      .setScale(1.48).setSize(20, 32).setOffset(25, -1).setScrollFactor(0).setDepth(6);

    // add physics to player
    //this.player.setBounce(0, 0.2);
    this.player.setCollideWorldBounds(true);

    //Establecer grupos de objetos
    this.obstacles = this.physics.add.group();
    this.monedas = this.physics.add.group();

    // create animations de Aire
    this.anims.create({
      key: "air",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 6
      }),
      frameRate: 6,
    });
    //Animación de Derecha
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1,
    });
    //Animación de daño
    this.anims.create({
      key: "damage",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 8,
        end: 10
      }),
      frameRate: 5,
      repeat: -1,
    });

    //Cuanto se va a mover la cámara
    this.cameras.main.setBounds(0, 0, width * cantScenes, height)

    //Inicio de juego, comienza con la animación de derecha
    this.player.anims.play("right", true);

    //collide with platforms
    this.physics.add.collider(this.player, this.plataforma);
    this.physics.add.collider(this.player, this.pisos);
    this.physics.add.overlap(this.player, this.obstacles, this.damagePlayer, null, this);

    // crear grupo recolectables
    this.recolectables = this.physics.add.group();
    // colision con recolectables
    this.physics.add.overlap(this.player, this.recolectables, this.collectRecolectable, null, this);
    this.physics.add.overlap(this.player, this.monedas, this.collectMoneda, null, this);

    //Agregar los cursores
    this.cursor = this.input.keyboard.createCursorKeys();

    //Agregar la tecla R
    this.input.keyboard.on("keydown-R", this.reiniciarJuego, this)

    //Agregar Enter como Escuchador
    this.input.keyboard.on('keydown-ENTER', () => {
      // Comprobar si el juego está pausado
      if (!this.isPaused) {
        // Si está pausado, reanudar el juego
        this.game.pause();
        this.isPaused = true;
      } else {
        // Si no está pausado, pausar el juego
        this.game.resume();
        this.isPaused = false;
      }
    });

    // crear el texto de puntos, con sus propiedades; Inicializamos en 0
    txtScore = this.add.text(20, 20, "Score: 0", {
      font: "20px Helvetica",
      fill: "#ff0000"
    }).setDepth(6).setScrollFactor(0) //Que no se mueva!!

    //Agregar un temporizador, segundero
    let contador = this.add.text(width * 0.75, 20, "Tiempo: 00:00 ", {
      font: "20px Helvetica",
      fill: "#ff0000"
    }).setDepth(6).setScrollFactor(0)

    // ciclo que genera las cosas
    for (let i = 0; i < generarScene; ++i) {

      this.add.image(cielo.width * 1.5, height * altura, 'cielo')
        .setScrollFactor(speedScrollCielo).setDepth(1);

      this.add.image(cielo.width * 1.5, height * altura, 'nubes')
        .setScrollFactor(speedScrollNubes).setDepth(2);

      this.add.image(cielo.width * 1.5, height * altura, 'backmontana')
        .setScrollFactor(speedScrollBackMontana).setDepth(3);

      this.add.image(cielo.width * 1.5, height * altura, 'frontmontana')
        .setScrollFactor(speedScrollFrontMontana).setDepth(4);

      this.add.image(cielo.width * 0.5, height * 0.89, 'platform')
        .setScrollFactor(4).setDepth(5);

      const obstacle = this.obstacles.create(cielo.width, height - 130, "obstacle");
      obstacle.setScale(2, 2.3).refreshBody().setOffset(1, 1).setSize(25, 18).setDepth(6)
        .setVelocityX(speedFrente)
        .setImmovable(true);
      obstacle.body.allowGravity = false;

      const x = Phaser.Math.Between(cielo.width + 120, cielo.width + 300);
      const y = 275;
      const insertRecolectable = Phaser.Math.FloatBetween(0, 1);
      if (insertRecolectable > 0.5 && insertRecolectable !== 1) {
        recolectable = this.recolectables.create(x, y - 30, "galleta")
        recolectable.setScale(1.3);
        recolectable.setVelocityX(speedFrente).setDepth(6);
        recolectable.body.allowGravity = false;
      }
      if (insertRecolectable <= 0.28 && insertRecolectable >= 0.2) {
        moneda = this.monedas.create(x, y - 30, "moneda").setScale(1.7).setVelocityX(speedFrente).setDepth(6);
        moneda.body.allowGravity = false;
      }
      cielo.width += width
    }

  }

  update() {
    this.parallax()
    this.movimientoPersonaje()
    //this.createScenario()
  }

  parallax() {
    const cam = this.cameras.main
    const speed = 1
    if (this.isPaused === false) {
      cam.scrollX += speed
    }
  }

  //funcion de juntar las galletas
  collectRecolectable(player, recolectable) {
    score += 30;
    txtScore.setText('Score: ' + score);
    recolectable.disableBody(true, true);
    console.log("recolecto")
  }

  //Funcion de juntar las monedas
  collectMoneda(player, moneda) {
    console.log("MONEDA"),
      score += 300;
    txtScore.setText('Score: ' + score);
    moneda.disableBody(true, true);
  }

  //Reiniciar el Juego
  reiniciarJuego() {
    this.scene.restart()
    console.log("Restart")
  }

  //Volver al estado Correr
  correr() {
    this.player.anims.play("right", true)
  }

  //Funcion para el Daño al personaje
  damagePlayer() {
    this.player.anims.play("damage", true);
    this.time.addEvent({
      delay: 900,
      callback: this.correr,
      callbackScope: this,
    })
  }

  //Funcion para el movimiento del Personaje
  movimientoPersonaje() {
    if (this.cursor.down.isDown) {
      this.player.setVelocityY(200);
    }

    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-220);
      this.player.anims.play("air", true);
      this.time.addEvent({
        delay: 1800,
        callback: this.correr,
        callbackScope: this,
      })
    }
  }
}

let height
let width
let start
let texto
let animacion
let txtScore
let recolectable
let score
let moneda
let cielo
let nubes
let atrasMontana
let frenteMontana
let piso
let plataforma
let generarScene = 20
let cantScenes = 3
let altura = 0.28
let speedFrente = -180
let speedScrollCielo = 0.1
let speedScrollNubes = 0.2
let speedScrollBackMontana = 0.4
let speedScrollFrontMontana = 0.5