// obstacle.js
import { CANVAS_WIDTH, CANVAS_HEIGHT, BASE_OBSTACLE_SPEED } from "./constants.js";

export class Obstacle {
  constructor(difficultyFactor) {
    // Adjust the obstacle’s size/speed based on difficulty factor
    this.width = 50 + difficultyFactor * 5;
    this.height = 20 + difficultyFactor * 3;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = 0;
    this.speed = BASE_OBSTACLE_SPEED + difficultyFactor * 0.8;
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Check if obstacle is off-screen
  isOffScreen() {
    return this.y > CANVAS_HEIGHT;
  }

  // Collision detection helper
  collidesWith(player) {
    return (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    );
  }
}
