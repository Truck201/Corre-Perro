// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
    this.isPaused = false;
    score = 0
    tiempo.segundos = "00"
    tiempo.minutos = "00"
    this.restarVidas = 1
    this.CantidadVidas = 3
  }

  create() {
    //add images
    width = this.scale.width
    height = this.scale.height

    this.GameMusic = this.sound.add("gamemusic");
    this.GameMusic.play();

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.cadaSegundo();
      },
    })

    this.time.addEvent({
      delay: 53100,
      loop: true,
      callback: () => {
        this.musicaInstrumental();
      },
    })

    this.time.addEvent({
      delay: 1500,
      loop: true,

      callback: () => {
        this.agregarObstaculos();
      },
      callbackScope: this,
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
      .setScale(1.48).setSize(20, 32).setOffset(25, -1).setData('vida', this.CantidadVidas)

    // add physics to player
    this.player.setCollideWorldBounds(true).setDepth(8);

    //add ladrar to group
    this.aLadrar = this.physics.add.staticGroup();

    //Establecer grupos de objetos
    this.obstaculos = this.physics.add.group();
    this.monedas = this.physics.add.group();
    this.murcielagos = this.physics.add.group();
    this.gatos = this.physics.add.group();

    // Agregar Vidas

    const vidasStepX = 30
    let posicionVidas = width / 2.3
    for (let i = 0; i < this.CantidadVidas; i++) {
      arrayVidas.push(this.add.sprite(posicionVidas, 33, 'vidas').setDepth(9))
      posicionVidas += vidasStepX
    }


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

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("gato", {
        start: 0,
        end: 2,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.physics.add.overlap(this.player, this.gatos, this.dañoAlJugador, null, this);
    this.physics.add.overlap(this.player, this.murcielagos, this.dañoAlJugador, null, this);

    //Cuanto se va a mover la cámara
    this.cameras.main.setBounds(0, 0, width * cantScenes, height)

    //Inicio de juego, comienza con la animación de derecha
    this.player.anims.play("right", true);

    //collide with platforms
    this.physics.add.collider(this.player, this.pisos);
    this.physics.add.overlap(this.player, this.obstaculos, this.dañoAlJugador, null, this);

    // crear grupo recolectables
    this.recolectables = this.physics.add.group();
    // colision con recolectables
    this.physics.add.overlap(this.player, this.recolectables, this.collectRecolectable, null, this);
    this.physics.add.overlap(this.player, this.monedas, this.collectMoneda, null, this);

    //Agregar los cursores
    this.cursor = this.input.keyboard.createCursorKeys();

    //Agregar la tecla R
    this.input.keyboard.on("keydown-R", this.reiniciarJuego, this);
    this.input.keyboard.on("keydown-X", this.ladrarPerro, this)

    //Agregar Enter como Escuchador
    this.input.keyboard.on('keydown-ENTER', () => {
      // Comprobar si el juego está pausado
      if (!this.isPaused) {
        // Si está pausado, reanudar el juego
        this.game.pause();
        this.GameMusic.pause();
        this.dogRunSample.pause();
        this.isPaused = true;
      } else {
        // Si no está pausado, pausar el juego
        this.game.resume();
        this.GameMusic.resume();
        this.dogRunSample.resume();
        this.isPaused = false;
      }
    });

    // crear el texto de puntos, con sus propiedades; Inicializamos en 0
    txtScore = this.add.text(20, 20, "Score: 0", {
      font: "20px Helvetica",
      fill: "#ff0000"
    }).setDepth(10);

    txtContoles = this.add.text(width/12, 350, "'X' to bark", {
      font: "12px Helvetica",
      fill: "#ffffff"
    }).setDepth(10);

    txtContoles2 = this.add.text(width - width/5 , 350, "'ENTER' to pause", {
      font: "12px Helvetica",
      fill: "#ffffff"
    }).setDepth(10);

    //Agregar un temporizador, segundero
    contador = this.add.text(width * 0.75, 20, "Tiempo: 00:" + tiempo.segundos, {
      font: "20px Helvetica",
      fill: "#ff0000"
    }).setDepth(10);

    newWidth = this.cielo.width

    //Incorporar Sonidos del Perro
    this.dogRunSample = this.sound.add('sounddogrun')
    this.dogHurtSample = this.sound.add('sounddoghurt')
    this.dogCollectCookieSample = this.sound.add('sounddogcookies')
    this.dogCollectCoinSample = this.sound.add('sounddogcoins')
    this.dogJumpSample = this.sound.add('sounddogjump')
    this.dogBarkSample = this.sound.add('sounddogbark')

    //Incorporar Sondios del Gato
    this.catAppearsSample = this.sound.add('soundcat')
    this.catAngrySample = this.sound.add('soundcatangry')

    //Sonidos del Murcielago
    this.batSoundSample = this.sound.add('soundbat')

    //Sonido lose game
    this.dogLoseGameSample = this.sound.add('sounddoglose')
  }

  update() {
    this.movimientoPersonaje();
    this.moverParallax();
    this.ciclosNocheDia();
  }

  moverParallax() {
    this.parallaxLayers.forEach((layer) => {
      layer.sprite.tilePositionX += layer.speed;
    });
  }
  //funcion de juntar las galletas
  collectRecolectable(player, recolectable) {
    this.dogCollectCookieSample.play();
    score += 30;
    txtScore.setText('Score: ' + score);
    recolectable.disableBody(true, true);
    //console.log("recolecto")
  }
  //Funcion de juntar las monedas
  collectMoneda(player, moneda) {
    this.dogCollectCoinSample.play();
    console.log("MONEDA"),
      score += 300;
    txtScore.setText('Score: ' + score);
    moneda.disableBody(true, true);
  }
  //Reiniciar el Juego
  reiniciarJuego() {
    this.scene.restart()
    this.GameMusic.pause();
    console.log("Restart")
  }

  ladrarPerro() {
    if (this.player.body.touching.down) {
      this.dogBarkSample.play();
      let gatoMasCercano = this.encontrarGatoMasCercano();
      if (gatoMasCercano) {
        gatoMasCercano.destroy();
        this.catAngrySample.play();
      }
      let ladro = this.aLadrar.create(340, 255, 'ladrido').setDepth(8)
      this.time.addEvent({
        delay: 200,
        callback: this.chauLadrido,
        callbackScope: this,
      })
    }
  }

  encontrarGatoMasCercano() {
    let distanciaMinima = 350; //Number.MAX_VALUE;
    let gatoMasCercano = null;
    this.gatos.getChildren().forEach((gato) => {
      const distancia = Phaser.Math.Distance.Between(this.player.x, this.player.y, gato.x, gato.y);
      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        gatoMasCercano = gato;
      }
    });
    return gatoMasCercano;
  }

  chauLadrido() {
    this.aLadrar.setAlpha(0)
  }

  //Volver al estado Correr
  correr() {
    this.player.anims.play("right", true)
  }

  //Funcion para el Daño al personaje
  dañoAlJugador(player, obstaculo) {
    this.player.anims.play("damage", true);
    this.time.addEvent({
      delay: 900,
      callback: this.correr,
      callbackScope: this,
    })

    if (this.CantidadVidas > 0) {
      this.CantidadVidas--;
      const vidasSprite = arrayVidas.pop();
      vidasSprite.destroy();
    }
    if (this.CantidadVidas == 0) {
      console.log("no Vidas")
      this.derrotado()
    }
    this.dogHurtSample.play();
    obstaculo.destroy();
  }

  //Funcion para el movimiento del Personaje
  movimientoPersonaje() {
    if (!this.player.body.touching.down) {
      this.dogRunSample.play();
    }
    if (this.cursor.down.isDown) {
      this.player.setVelocityY(200);
    }
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.dogJumpSample.play();
      this.player.setVelocityY(-220);
      this.player.anims.play("air", true);
      this.time.addEvent({
        delay: 1800,
        callback: this.correr,
        callbackScope: this,
      })
    }
  }

  ciclosNocheDia() {
    if (tiempo.minutos == ciclos) {
      esDeDia = !esDeDia
      ciclos++
    }
    if (esDeDia) {
      this.noche.setAlpha(0)
      //console.log("dia")
    }
    if (!esDeDia) {
      this.noche.setAlpha(0.45)
      //console.log("noche")
    }
  }

  derrotado() {
    this.dogLoseGameSample.play();
    this.dogRunSample.stop();
    this.GameMusic.stop();
    this.scene.start("game-over", ); //Ir a la escena de Derrota
  }

  musicaInstrumental() {
    this.GameMusic.play();
  }

  agregarObstaculos() {
    if (this.derrotado) {
      let num1 = Phaser.Math.FloatBetween(0, 1);
      const InsertGatos = Phaser.Math.FloatBetween(0, 1);
      const y = 275;
      const x = newWidth;

      // Afuera de los if, Obstáculo aparece 50/50
      if (num1 > 0.6) {
        const obstaculo = this.obstaculos.create(x, y, "obstacle");
        obstaculo.setScale(2, 2.3).refreshBody().setOffset(1, 1).setSize(25, 18)
          .setVelocityX(speedFrente - 10)
          .setImmovable(true)
          .setDepth(8);
        obstaculo.body.allowGravity = false;
      }

      //Afuera del if de dia o de noche
      const insertRecolectable = Phaser.Math.FloatBetween(0, 1);
      if (insertRecolectable > 0.5 && insertRecolectable !== 1) {
        recolectable = this.recolectables.create(x, y - 80, "galleta")
          .setDepth(8)
          .setScale(1.24)
          .setVelocityX(speedFrente - 10)
          .setSize(30, 30);
        recolectable.body.allowGravity = false;
      }
      if (insertRecolectable <= 0.28 && insertRecolectable >= 0.23) {
        moneda = this.monedas.create(x, y - 80, "moneda")
          .setDepth(8)
          .setScale(1.7)
          .setVelocityX(speedFrente - 10)
        moneda.body.allowGravity = false;
      }

      // If de dia, agregar Gatos
      if (esDeDia) {
        if (InsertGatos >= 0.4 && InsertGatos <= 0.5) {
          let distanciaGatos = x + Phaser.Math.Between(60, 80);
          let gato = this.gatos.create(distanciaGatos, y - 15, "gato")
            .setScale(0.3)
            .setDepth(8)
            .setVelocityX(speedFrente - 10)
            .setImmovable(true)
          gato.body.allowGravity = false;
          gato.play("idle", true);
          this.catAppearsSample.play();
        }
      }
      // If de noche, agregar Murcielagos
      if (!esDeDia) {
        const insertMurcielagos = Phaser.Math.FloatBetween(0, 1);
        if (insertMurcielagos >= 0.5 && insertMurcielagos <= 0.9) {
          let distanciaMurcielagos = x + Phaser.Math.Between(20, 40);
          let murcielago = this.murcielagos.create(distanciaMurcielagos, y - 120, "murcielago")
            .setScale(1.6)
            .setDepth(8)
            .setVelocityX(speedFrente - 70)
            .setImmovable(true)
          murcielago.body.allowGravity = false;
          murcielago.play("volador", true);
          this.batSoundSample.play();
        }
      }
    }
  }
  cadaSegundo() {
    if (this.isPaused === false) {
      contador.setText('Tiempo: ' + tiempo.minutos + ':' + tiempo.segundos)
    }
    actualizarContador()
  }
}

let arrayVidas = []
let height
let width
let newWidth
let txtScore
let txtContoles
let txtContoles2
let recolectable
let score
let moneda
let cielo
let piso
let generarScene = 40
let cantScenes = 3
let altura = 0.28
let speedFrente = -180
let contador
let murcielago
let duracionDia = 59
let esDeDia = true
let ciclos = 1

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