// main.js
import { CANVAS_WIDTH, CANVAS_HEIGHT, OBSTACLE_SPAWN_INTERVAL, LEVEL_UP_THRESHOLD } from "./constants.js";
import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { backgrounds, getBackgroundForLevel } from "./backgrounds.js";

// Select DOM elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");
const moveSound = document.getElementById("moveSound");
const scoreSound = document.getElementById("scoreSound");
const gameOverSound = document.getElementById("gameOverSound");

// Set up canvas size
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Game variables
let player, obstacles, score, level, difficultyFactor, gameRunning;

// Initialize the game (or restart)
function initGame() {
  player = new Player();
  obstacles = [];
  score = 0;
  level = 1;
  difficultyFactor = 1.0;
  gameRunning = true;

  // Hide the restart button
  restartButton.style.display = "none";

  // Begin the animation loop
  updateGame();
}

// Increase difficulty as score grows
function updateDifficulty() {
  difficultyFactor = 1 + score / 50;
  player.setSpeed(5 + difficultyFactor * 0.3);
  
  // Update the background based on level
  document.body.style.background = getBackgroundForLevel(level);
}

// Spawn an obstacle at intervals
function spawnObstacle() {
  if (!gameRunning) return;
  obstacles.push(new Obstacle(difficultyFactor));
}

// Main game loop
function updateGame() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Move the player
  player.move();
  player.draw(ctx);

  // Update and draw obstacles
  obstacles.forEach((obstacle, index) => {
    obstacle.update();
    obstacle.draw(ctx);

    // Check collision
    if (obstacle.collidesWith(player)) {
      // Game over
      gameOverSound.play();
      gameRunning = false;
      restartButton.style.display = "block";
      alert(`Game Over! Score: ${score} | Level: ${level}`);
    }

    // If off-screen, remove and increment score
    if (obstacle.isOffScreen()) {
      obstacles.splice(index, 1);
      score++;
      scoreSound.play();

      // Every 10 points, level up
      if (score % LEVEL_UP_THRESHOLD === 0) {
        level++;
        updateDifficulty();
      }
    }
  });

  // Draw score/level
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Level: ${level}`, CANVAS_WIDTH - 80, 20);

  requestAnimationFrame(updateGame);
}

// Keyboard input
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    moveSound.currentTime = 0;
    moveSound.play();
  }
  if (event.key === "ArrowLeft") {
    player.dx = -player.speed;
  } else if (event.key === "ArrowRight") {
    player.dx = player.speed;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    player.dx = 0;
  }
});

// Restart button event
restartButton.addEventListener("click", initGame);

// Spawn obstacles on a set interval
setInterval(spawnObstacle, OBSTACLE_SPAWN_INTERVAL);

// Initialize game on page load
initGame();
