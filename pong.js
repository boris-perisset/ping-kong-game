var score = 0
let puck = []




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

  // das Object Paddle 01, damit wir die Paddle Position herausfinden können.
  let pad =  {
    padHeight: 90,
    paddlePosY: [] //Dies sollte die untere yPos Ecke des Paddles tracken...
  }

function draw() {

  // Background
  background(0);
  fill (0, 255, 67);

  //Score
  textSize(24);

  textFont('Press Start 2P');
  text("Your Score: " + score, 12,  25);
 
  //Paddle 01
  rect(10, mouseY, 10, pad.padHeight);

  // Paddle 02 (macht noch das gleiche wie Paddle 01)
  rect(width-20, mouseY, 10, 90);




  // Ball oder Puck bounced
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
  // Ball fliegt (langsam)
  currentPos.xPos += currentPos.speedX;
  currentPos.yPos += currentPos.speedY;


  
  // Score zählt hoch und runter (Die 10 zählt ist der Radius des Balles, damits funktioniert.)
  // Ball wird in die Mitte zurück gesetzt und zufällig in eine neue Richtung geschickt.
  if (currentPos.xPos <= 10) {
    score += -1;
    currentPos.speedX = random(-5,5);
    currentPos.speedY = random(-5,5);
    currentPos.xPos = width/2;


  }

  if (currentPos.xPos >= width-10) {
    score += 1;
    currentPos.speedX = random(-5,5);
    currentPos.speedY = random(-5,5);
    currentPos.xPos = width/2;



  }


}


}