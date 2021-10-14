var score = 0
let puck = []




function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);

  let Ball =  {
    xStart: windowWidth/2,
    yStart: windowHeight/2,
    veloX: random(-1,1),
    veloY: random(-1,1),
    radius: 10
  }
  
  puck.push(Ball)

}


function draw() {
  // Background
  background(0);
  fill(255);
  
  //Score
  textSize(24);
  fill (0, 255, 67);

  textFont('Press Start 2P');
  text("Score: " + score, 12,  25);
 
  // Ball oder Puck bounced
  for (let i = 0; i < puck.length; i += 1) {
    
  // Variable mit einzelnem Element aus dem Array 
  let currentPos = puck[i];

  //Ball zeichnen
  ellipse(currentPos.xStart, currentPos.yStart, currentPos.radius);
  
  // Ball prallt ab (Bounce)
  if (currentPos.xStart > (windowWidth-currentPos.radius) || currentPos.xStart < (0+currentPos.radius)) {
    currentPos.veloX = currentPos.veloX  * -1;
  }

  if (currentPos.yStart > (windowHeight-currentPos.radius) || currentPos.yStart < (0+currentPos.radius)) {
    currentPos.veloY = currentPos.veloY * -1;
  }

  // Ball fliegt (langsam)
  currentPos.xStart += currentPos.veloX;
  currentPos.yStart += currentPos.veloY;

}
}