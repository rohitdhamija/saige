// player.js
import { BASE_PLAYER_SPEED, CANVAS_WIDTH } from "./constants.js";

export class Player {
  constructor() {
    // Start near the bottom of the canvas
    this.width = 80;
    this.height = 20;
    this.x = CANVAS_WIDTH / 2 - this.width / 2;
    this.y = 600 - 30;      // We'll just hard-code 600 here or import a constant
    this.speed = BASE_PLAYER_SPEED;
    this.dx = 0;            // Velocity in x-direction
  }

  move() {
    this.x += this.dx;
    // Clamp player movement so they can’t go off-canvas
    if (this.x < 0) this.x = 0;
    if (this.x > CANVAS_WIDTH - this.width) {
      this.x = CANVAS_WIDTH - this.width;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  // For adjusting speed as game difficulty increases
  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }
}
