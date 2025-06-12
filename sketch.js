let plants = [];
let numPlants = 6;
let harvested = false;
let messageTimer = 0;

function setup() {
  createCanvas(600, 400);
  resetGame();
}

function draw() {
  background(120, 200, 100); 

  for (let plant of plants) {
    plant.grow();
    plant.show();
  }

  if (harvested) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Parabéns, você colheu os brocolis!", width / 2, height / 2);
    if (millis() - messageTimer > 3000) {
      resetGame();
    }
  }
}

function mousePressed() {
  if (harvested) return;

  let allHarvested = true;
  for (let plant of plants) {
    if (!plant.harvested && plant.clicked(mouseX, mouseY)) {
      plant.harvest();
    }
    if (!plant.harvested) {
      allHarvested = false;
    }
  }

  if (allHarvested) {
    harvested = true;
    messageTimer = millis();
  }
}

function resetGame() {
  plants = [];
  for (let i = 0; i < numPlants; i++) {
    let x = 80 + i * 80;
    plants.push(new Plant(x, height - 50));
  }
  harvested = false;
}

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.maxSize = 40;
    this.growthRate = random(0.1, 0.3);
    this.harvested = false;
  }

  grow() {
    if (!this.harvested && this.size < this.maxSize) {
      this.size += this.growthRate;
    }
  }

  show() {
    if (this.harvested) return;

    fill(34, 139, 34);
    ellipse(this.x, this.y - this.size / 2, this.size, this.size);
    fill(139, 69, 19);
    rect(this.x - 5, this.y, 10, 20);
  }

  clicked(mx, my) {
    let d = dist(mx, my, this.x, this.y - this.size / 2);
    return d < this.size / 2;
  }

  harvest() {
    this.harvested = true;
  }
}

