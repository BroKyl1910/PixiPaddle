let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
let gameController = new GameController();
let timerText;

document.body.appendChild(app.view);

let length = 1000;
let height = 500;
let midScreen = { x: app.screen.width / 2, y: app.screen.height / 2 };
let gameAreaBounds = {
    topLeft: { x: midScreen.x - 0.5 * length, y: midScreen.y - 0.5 * height },
    topRight: { x: midScreen.x + 0.5 * length, y: midScreen.y - 0.5 * height },
    bottomRight: { x: midScreen.x + 0.5 * length, y: midScreen.y + 0.5 * height },
    bottomLeft: { x: midScreen.x - 0.5 * length, y: midScreen.y + 0.5 * height }
};

drawScore();
// drawGameArea();
drawWalls();

gameController.startScoring();
const gameLoop = () => {
    gameController.updateScore();
    timerText.text = gameController.score;
}

// Add a ticker callback to scroll the text up and down
app.ticker.add(gameLoop);

function drawScore() {
    timerText = new PIXI.Text(gameController.score, { fontFamily: "Helvetica, sans-serif", fontSize: "6em", fill: 'white' });
    timerText.position.x = app.screen.width - timerText.width - 100;
    timerText.position.y = 50;
    app.stage.addChild(timerText);
}

function drawGameArea() {
    let gameAreaX = gameAreaBounds.topLeft.x;
    let gameAreaY = gameAreaBounds.topLeft.y;
    let gameAreaWidth = gameAreaBounds.topRight.x - gameAreaBounds.topLeft.x;
    let gameAreaHeight = gameAreaBounds.bottomLeft.y - gameAreaBounds.topLeft.y;
    let gameArea = new PIXI.Graphics();
    gameArea.beginFill(0xffffff44);
    gameArea.alpha = 0.3;
    gameArea.drawRect(gameAreaX, gameAreaY, gameAreaWidth, gameAreaHeight);
    gameArea.endFill();
    app.stage.addChild(gameArea);
}

function drawWalls() {
    let thickness = 20;
    let wallGraphicsData = [
        // Top wall, overhangs on the right by the thickness
        {
            x: gameAreaBounds.topLeft.x,
            y: gameAreaBounds.topLeft.y - thickness,
            width: gameAreaBounds.topRight.x - gameAreaBounds.topLeft.x + thickness,
            height: thickness,
        },
        // Right wall, no overhang
        {
            x: gameAreaBounds.topRight.x,
            y: gameAreaBounds.topRight.y,
            width: thickness,
            height: gameAreaBounds.bottomRight.y - gameAreaBounds.topRight.y,
        },
        // Bottom wall, overhangs on the right by the thickness
        {
            x: gameAreaBounds.bottomLeft.x,
            y: gameAreaBounds.bottomRight.y,
            width: gameAreaBounds.bottomRight.x - gameAreaBounds.bottomLeft.x + thickness,
            height: thickness,
        },
    ];

    wallGraphicsData.forEach(wall => {
        let wallGraphics = new PIXI.Graphics();
        wallGraphics.beginFill(0xffffff);
        wallGraphics.alpha = 0.6;
        wallGraphics.drawRect(wall.x, wall.y, wall.width, wall.height);
        wallGraphics.endFill();
        app.stage.addChild(wallGraphics);
    });
}
