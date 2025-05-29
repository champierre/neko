let gameState = 'playing'; // 'playing', 'gameOver'
let score = 0;
let cat, mouse;

function setup() {
  createCanvas(800, 600);
  cat = new Cat(100, 100);
  mouse = new Mouse();
}

function draw() {
  background(0);
  
  if (gameState === 'playing') {
    cat.update();
    mouse.update();
    
    if (cat.collidesWith(mouse)) {
      gameState = 'gameOver';
    }
    
    score += 0.1;
    
    cat.display();
    mouse.display();
    displayScore();
    
  } else if (gameState === 'gameOver') {
    displayGameOver();
  }
}

class Cat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 60;
    this.speedX = 3;
    this.speedY = 2;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x <= this.size/2 || this.x >= width - this.size/2) {
      this.speedX *= -1;
    }
    if (this.y <= this.size/2 || this.y >= height - this.size/2) {
      this.speedY *= -1;
    }
    
    this.x = constrain(this.x, this.size/2, width - this.size/2);
    this.y = constrain(this.y, this.size/2, height - this.size/2);
  }
  
  display() {
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.size);
    fill(0);
    ellipse(this.x - 15, this.y - 10, 8); // left eye
    ellipse(this.x + 15, this.y - 10, 8); // right eye
    triangle(this.x, this.y, this.x - 8, this.y - 20, this.x + 8, this.y - 20); // ears
  }
  
  collidesWith(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    return distance < (this.size/2 + other.size/2);
  }
}

class Mouse {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.size = 40;
  }
  
  update() {
    this.x = mouseX;
    this.y = mouseY;
  }
  
  display() {
    fill(150, 150, 150);
    ellipse(this.x, this.y, this.size);
    fill(0);
    ellipse(this.x - 8, this.y - 5, 4); // left eye
    ellipse(this.x + 8, this.y - 5, 4); // right eye
    ellipse(this.x - 12, this.y - 15, 12);
    ellipse(this.x + 12, this.y - 15, 12);
  }
}

function displayScore() {
  fill(255);
  textSize(24);
  text('Score: ' + Math.floor(score), 20, 40);
}

function displayGameOver() {
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(48);
  text('GAME OVER', width/2, height/2 - 50);
  textSize(24);
  text('Final Score: ' + Math.floor(score), width/2, height/2);
  text('Press R to restart', width/2, height/2 + 50);
  textAlign(LEFT, BASELINE);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    if (gameState === 'gameOver') {
      gameState = 'playing';
      score = 0;
      cat = new Cat(100, 100);
      mouse = new Mouse();
    }
  }
}
