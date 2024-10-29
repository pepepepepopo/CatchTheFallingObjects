// Game settings
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let basket = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 30,
    width: 60,
    height: 20,
    speed: 5
};

let object = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    speed: 3
};

let score = 0;

// Event listener for basket movement
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' && basket.x > 0) {
        basket.x -= basket.speed;
    } else if (e.key === 'ArrowRight' && basket.x < canvas.width - basket.width) {
        basket.x += basket.speed;
    }
});

// Function to draw basket
function drawBasket() {
    ctx.fillStyle = 'green';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

// Function to draw falling object
function drawObject() {
    ctx.fillStyle = 'red';
    ctx.fillRect(object.x, object.y, object.width, object.height);
}

// Function to update the game state
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBasket();
    drawObject();

    // Move the object down
    object.y += object.speed;

    // Check if object is caught by the basket
    if (object.y + object.height >= basket.y && 
        object.x + object.width > basket.x && 
        object.x < basket.x + basket.width) {
        score++;
        resetObject();
    }

    // Check if the object hits the bottom
    if (object.y > canvas.height) {
        resetObject();
    }

    // Display score
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);

    requestAnimationFrame(update);
}

// Function to reset the falling object
function resetObject() {
    object.x = Math.random() * (canvas.width - object.width);
    object.y = 0;
}

// Start the game loop
update();