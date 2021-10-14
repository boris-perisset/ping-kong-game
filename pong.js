var score = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Press Start 2P');


}

function draw() {
  // Background
  background(0);
  fill(255);
  
  //Score
  textSize(24);
  text("Score: " + score, 12,  25);


}
