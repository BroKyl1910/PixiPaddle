let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
})

let gameController = new GameController()
document.body.appendChild(app.view)

const setScene = (scene) => {
  let sceneContainer
  for (var i = app.stage.children.length - 1; i >= 0; i--) {	app.stage.removeChild(app.stage.children[i]);};
  // app.ticker.stop();
  switch (scene) {
    case 'gameOverScene':
      let gameOverScene = new GameOverScene(
        {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        gameController,
        setScene,
      )
      app.ticker.stop()
      sceneContainer = gameOverScene.getSceneContainer()
      break

    default:
      let gameScene = new GameScene(
        {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        gameController,
        setScene,
      )
      app.ticker.add(gameScene.update)
      sceneContainer = gameScene.getSceneContainer()
      break
  }
  app.stage.addChild(sceneContainer)
}

setScene('gameScene')
