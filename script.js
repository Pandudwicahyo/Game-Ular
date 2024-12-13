const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

const gridSize = 20;
const canvasSize = canvas.width;
let snake, direction, food, score, intervalId;

function initializeGame() {
    snake = [{ x: canvasSize / 2, y: canvasSize / 2}];
    direction = { x: gridSize, y: 0};
    score = 0;
    placeFood();
    scoreElement.textContent = 'Score: 0';
    startButton.disable = true;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(updateGame, 100);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

function updateGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        placeFood();
    } else {
        snake.pop();
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -gridSize };
    if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: gridSize };
    if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -gridSize, y: 0 };
    if (key === 'ArrowRight' && direction.x === 0) direction = { x: gridSize, y: 0 };
});

startButton.addEventListener('click', initializeGame);

function endGame() {
    clearInterval(intervalId);
    startButton.disable = false;
    alert(`Game Over! You Final Score Is: ${score}`);
}