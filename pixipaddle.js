let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
let gameController = new GameController();

document.body.appendChild(app.view);

let gameScene = new GameScene({ width: window.innerWidth, height: window.innerHeight });
app.ticker.add(gameScene.update);
app.stage.addChild(gameScene.getSceneContainer());