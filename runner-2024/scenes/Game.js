// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
    this.isPaused = false;
    score = 0
    tiempo.segundos = "00"
  }

  create() {
    //add images
    width = this.scale.width
    height = this.scale.height

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.cadaSegundo();
      },
    })

    //Agregar imágenes de fondo
    this.cielo = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      this.game.config.width,
      this.game.config.height,
      "cielo"
    );

    this.nubes = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      this.game.config.width,
      this.game.config.height,
      "nubes"
    );


    this.backmontana = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      this.game.config.width,
      this.game.config.height,
      "backmontana"
    );


    this.frontmontana = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      this.game.config.width,
      this.game.config.height,
      "frontmontana"
    ).setDepth(4);

    this.ciudad = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height,
      this.game.config.width,
      this.game.config.height + 20,
      "ciudad"
    ).setDepth(5);

    this.piso = this.add.tileSprite(
      this.game.config.width / 2,
      this.game.config.height,
      this.game.config.width,
      this.game.config.height - 130,
      "platform"
    ).setDepth(6);

    this.noche = this.add.tileSprite(
        this.game.config.width / 2,
        this.game.config.height / 2,
        this.game.config.width,
        this.game.config.height,
        "noche"
      ).setDepth(10)
      .setAlpha(0);


    this.parallaxLayers = [{
        speed: 0.1,
        sprite: this.cielo,
      },
      {
        speed: 0.2,
        sprite: this.nubes,
      },
      {
        speed: 0.25,
        sprite: this.backmontana,
      },
      {
        speed: 0.4,
        sprite: this.frontmontana,
      },
      {
        speed: 0.6,
        sprite: this.ciudad,
      },
      {
        speed: 3.16,
        sprite: this.piso,
      },
      {
        speed: 0,
        sprite: this.noche,
      }
    ];

    //Hacer un grupo de Objetos, Crear un piso del jugador
    this.pisos = this.physics.add.staticGroup();
    piso = this.pisos.create(width * 0.5, height * 0.8, 'backplatform').setDepth(0)

    // add player
    this.player = this.physics.add.sprite(270, 260, "dude")
      .setScale(1.48).setSize(20, 32).setOffset(25, -1)

    // add physics to player
    this.player.setCollideWorldBounds(true).setDepth(8);

    //Establecer grupos de objetos
    this.obstaculos = this.physics.add.group();
    this.monedas = this.physics.add.group();

    // create animations Personaje
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
    this.physics.add.collider(this.player, this.pisos);
    this.physics.add.overlap(this.player, this.obstaculos, this.damagePlayer, null, this);

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
    }).setDepth(10);

    //Agregar un temporizador, segundero
    contador = this.add.text(width * 0.75, 20, "Tiempo: 00:" + tiempo.segundos, {
      font: "20px Helvetica",
      fill: "#ff0000"
    }).setDepth(10);

    newWidth = this.cielo.width

    
    // ciclo que genera las cosas
    for (let i = 0; i < generarScene; i++) {
      const x = Phaser.Math.FloatBetween(newWidth, newWidth + 100);
      const y = 275;

      const obstaculo = this.obstaculos.create(Phaser.Math.FloatBetween(x - 100, x + 100), y, "obstacle");
      obstaculo.setScale(2, 2.3).refreshBody().setOffset(1, 1).setSize(25, 18)
        .setVelocityX(speedFrente)
        .setImmovable(true)
        .setDepth(8);
      obstaculo.body.allowGravity = false;

      const insertRecolectable = Phaser.Math.FloatBetween(0, 1);
      if (insertRecolectable > 0.5 && insertRecolectable !== 1) {
        recolectable = this.recolectables.create(x, y - 30, "galleta")
          .setDepth(8)
          .setScale(1.3)
          .setVelocityX(speedFrente);
        recolectable.body.allowGravity = false;
      }
      if (insertRecolectable <= 0.28 && insertRecolectable >= 0.2) {
        moneda = this.monedas.create(x, y - 30, "moneda")
          .setDepth(8)
          .setScale(1.7)
          .setVelocityX(speedFrente)
        moneda.body.allowGravity = false;
      }
      newWidth += width
    }

  }
  

  update() {
    this.movimientoPersonaje()
    this.moverParallax()
  }

  moverParallax() {
    this.parallaxLayers.forEach((layer) => {
      layer.sprite.tilePositionX += layer.speed;
    });
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

  cadaSegundo() {
    if (this.isPaused === false) {
      contador.setText('Tiempo: ' + tiempo.minutos + ':' + tiempo.segundos)
    }
    actualizarContador()
  }

  agregarMurcielgo() {
    //add murcielagos
    this.murcielagos = this.physics.add.sprite(width - 10, 160, "murcielago")
      .setScale(1.6)
      .setDepth(8)
      .setVelocityX(speedFrente)
      .setImmovable(true);
    this.murcielagos.body.allowGravity = false;

    // Create animations Murciélagos
    this.anims.create({
      key: "volador",
      frames: this.anims.generateFrameNumbers("murcielago", {
        start: 0,
        end: 17,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.murcielagos.play("volador", true);

    this.physics.add.overlap(this.player, this.murcielagos, this.damagePlayer, null, this);
  }
}

let height
let width
let newWidth
let txtScore
let recolectable
let score
let moneda
let cielo
let piso
let generarScene = 50
let cantScenes = 3
let altura = 0.28
let speedFrente = -190
let contador
let murcielagos

var tiempo = {
  minutos: '00',
  segundos: '00'
}

function actualizarContador() {
  tiempo.segundos++;
  tiempo.segundos = (tiempo.segundos >= 10) ? tiempo.segundos : '0' + tiempo.segundos;
  if (tiempo.segundos >= 60) {
    tiempo.segundos = '00',
      tiempo.minutos++;
    tiempo.minutos = (tiempo.minutos >= 10) ? tiempo.minutos : '0' + tiempo.minutos;
  }
}