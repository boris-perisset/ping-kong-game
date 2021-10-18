let score1 = 0
let score2 = 0
let puck = []
let gameSet = 1

let state = {
  start: true,
  game: false,
  over: false
}

let button;


  /*
  ===============================================================================
  =====================   S E T U P    ==========================================
  ===============================================================================
  */

function setup() {
  var width = 600;
  var height = 500;

  var canvas =   createCanvas(width, height);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('pong-frame');
  ellipseMode(RADIUS);

  // das Object und Array «Ball» mit seinen Eigenschaften. Ball = Puck und viceversa...

  let Ball =  {
    xPos: width/2,
    yPos: height/2,
    speedX: random(-5,5), //entscheidet sich randommässig für eine Geschwindigkeit und Richtung
    speedY: random(-5,5), //entscheidet sich randommässig für eine Geschwindigkeit und Richtung
    radius: 10
  }
  // erstellt einen Array mit um die currentPosition danach bestimmen zu können.
  puck.push(Ball)
}
  // das Object Paddle 01, damit wir die Paddle Position herausfinden können. Vielleicht...
  let pad =  {
    padHeight: 90,
    paddle02_Y: 0
  }

 

  /*
  ===============================================================================
  =====================     D R A W      ========================================
  ===============================================================================
  */

function draw() {

  textSize(24);
  fill (0, 255, 67);
  textAlign(CENTER, CENTER);
  textFont('Press Start 2P');

  /* =====================     GAME START      ====================================== */
  
  if (state.start == true) {

    text("Start Game", width/2, height/2);
    
    button = createButton('Play Game');
    button.position(width/2, width/2);
    button.mousePressed(startGame);
  
    function startGame() {
      state.game = true;
    }

  }

  /* =====================     GAME OVER      ====================================== */

  if (state.over == true) {
    text("Game Over", width/2, height/2);
    
    let result = "Whatever";

    if (score2 == gameSet) {
      let result = "You Loose";
      } else {
      result = "You Win";
    }

    let looserMessages = [result, "3", "2", "1"];

    for (let message of looserMessages) {
      frameRate (1);
      text(message, width/2, height/2);
      console.log(message)
    }

    score1 = 0;
    score2 = 0;

    state.over = false;
    state.game = false;
    state.start = true;
  
    frameRate(60);
  } 
  

   /* =====================     GAME PLAY      ====================================== */


  if (state.game == true) {
    // game running
    // Background
    background(0);
    fill (0, 255, 67);

    // Texte als Objekte definiert, damit man es evtl später nutzen kann...
    let You = {
      Name: text("You: " + score1, 60,  30)
    }
    
    You.Name;

    let Allan = {
      Name:   text("Allan: " + score2, width-80,  30)
    }
    
    Allan.Name;

    //Paddle 01
    rect(10, mouseY, 10, pad.padHeight);

    // Paddle 02 reagiert auf den Ball
    rect(width-20, pad.paddle02_Y, 10, 90);

    /* =====================     BALL      ====================================== */

    // Ball bounced
    for (let i = 0; i < puck.length; i += 1) {
        
      // Variable mit einzelnem Element aus dem Array Ball
      let currentPos = puck[i];

      //Ball zeichnen (aus dem Array und dem Object Ball sowie der Current Position)
      ellipse(currentPos.xPos, currentPos.yPos, currentPos.radius);
      
      // Ball prallt ab (Bounce)
      if (currentPos.xPos > (width-currentPos.radius) || currentPos.xPos < (0+currentPos.radius)) {
        currentPos.speedX = currentPos.speedX  * -1;
      }

      if (currentPos.yPos > (height-currentPos.radius) || currentPos.yPos < (0+currentPos.radius)) {
        currentPos.speedY = currentPos.speedY * -1;
      }
      // Ball fliegt
      currentPos.xPos += currentPos.speedX;
      currentPos.yPos += currentPos.speedY;



      /* =====================     PADDLES      ====================================== */
      /*
      Paddle 01 Bounce
      Wenn die x Position des Balls kleiner oder = Balkenposition
      und die y Position zwischen Mauszeiger Y und Mauszeiger Y + Paddle-Höhe dann: 
      Bounce Ball zurück und erhöhe die Geschwindigkeit
      */

      if((currentPos.xPos <= 30) && (currentPos.yPos >= mouseY && currentPos.yPos <= (mouseY + pad.padHeight))) {
        currentPos.speedX = currentPos.speedX  * -1;
        //currentPos.speedY += currentPos.speedY + random(-0.01,0.01)
        currentPos.speedX += 0.5;
      }

      // Paddle 02 Bounce
      if((currentPos.xPos >= width-30) && (currentPos.yPos >= pad.paddle02_Y && currentPos.yPos <= (pad.paddle02_Y + pad.padHeight))) {
        currentPos.speedX = currentPos.speedX  * -1;
        //currentPos.speedY += currentPos.speedY + random(-0.01,0.01)
        currentPos.speedX += -0.5;
      }

      /* =====================     SCORE 1UP      ====================================== */

      // Score zählt hoch und runter (Die 10 zählt ist der Radius des Balles, damits funktioniert.)
      // Ball wird in die Mitte zurück gesetzt und zufällig in eine neue Richtung geschickt.
      if (currentPos.xPos <= 10) {
        score2 += 1;
        currentPos.xPos = width/2;
        currentPos.speedX = random(-5,5);
        currentPos.speedY = random(-5,5);

      }

      console.log ("Speed X:", currentPos.speedX);

      if (currentPos.xPos >= width-10) {
        score1 += 1;
        currentPos.xPos = width/2;
        currentPos.speedX = random(-5,5);
        currentPos.speedY = random(-5,5);
      }


      /* =====================     ENEMY      ====================================== */

      // Paddle 02 The ENEMY!!! Allan Alcorn invetor of Pong
      pad.paddle02_Y = currentPos.yPos;

      if (currentPos.xPos > 560) {
        let zufall = random(-3,6)
        pad.paddle02_Y = currentPos.yPos + zufall;
        //console.log ("Paddle 02 yPos", pad.paddle02_Y);
      }


      /* =====================     GAME OVER ?      ====================================== */

      // Game Over > hast du gewonnen oder verloren?
      if (score1 || score2 == gameSet) {
        frameRate(1);
        state.over = true;
      }

    }

  }
  
}