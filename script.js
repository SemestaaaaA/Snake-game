const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas size
canvas.width = 400;
canvas.height = 400;

// Game settings
const boxSize = 20;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = 'RIGHT';
let food = spawnFood();
let score = 0;

// Draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// Spawn food at a random location
function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Update the game state
function updateGame() {
    // Move the snake
    const head = { ...snake[0] };

    switch (direction) {
        case 'UP': head.y -= boxSize; break;
        case 'DOWN': head.y += boxSize; break;
        case 'LEFT': head.x -= boxSize; break;
        case 'RIGHT': head.x += boxSize; break;
    }

    // Check for collision with walls
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        endGame();
        return;
    }

    // Check for collision with itself
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop(); // Remove the tail
    }

    snake.unshift(head); // Add the new head
}

// Handle user input
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp': if (direction !== 'DOWN') direction = 'UP'; break;
        case 'ArrowDown': if (direction !== 'UP') direction = 'DOWN'; break;
        case 'ArrowLeft': if (direction !== 'RIGHT') direction = 'LEFT'; break;
        case 'ArrowRight': if (direction !== 'LEFT') direction = 'RIGHT'; break;
    }
});

// End the game
function endGame() {
    alert(`Game Over! Your score: ${score}`);
    snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
    direction = 'RIGHT';
    score = 0;
    food = spawnFood();
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateGame();
}

// Start the game
setInterval(gameLoop, 100);
