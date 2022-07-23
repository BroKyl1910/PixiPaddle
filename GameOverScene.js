class GameOverScene {
  constructor(layoutConstraints, gameController, setScene) {
    this.sceneContainer = new PIXI.Container()
    this.sceneContainer.height = layoutConstraints.height
    this.sceneContainer.width = layoutConstraints.width
    this.gameController = gameController
    this.setScene = setScene
    this.gameAreaLength = 0.52 * layoutConstraints.width
    this.gameAreaHeight = 0.5 * this.gameAreaLength
    this.midScreen = { x: app.screen.width / 2, y: app.screen.height / 2 }
    this.gameAreaBounds = {
      topLeft: {
        x: this.midScreen.x - 0.5 * this.gameAreaLength,
        y: this.midScreen.y - 0.5 * this.gameAreaHeight,
      },
      topRight: {
        x: this.midScreen.x + 0.5 * this.gameAreaLength,
        y: this.midScreen.y - 0.5 * this.gameAreaHeight,
      },
      bottomRight: {
        x: this.midScreen.x + 0.5 * this.gameAreaLength,
        y: this.midScreen.y + 0.5 * this.gameAreaHeight,
      },
      bottomLeft: {
        x: this.midScreen.x - 0.5 * this.gameAreaLength,
        y: this.midScreen.y + 0.5 * this.gameAreaHeight,
      },
    }

    this.drawGameOverMessage()
  }

  update = () => {}

  drawGameOverMessage() {
    let gameOverHeading = new PIXI.Text('Game Over', {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: '6em',
      fill: 'white',
    })
    gameOverHeading.anchor.x = 0.5
    gameOverHeading.anchor.y = 0.5
    gameOverHeading.position.x = this.midScreen.x
    gameOverHeading.position.y = this.midScreen.y - 300

    let scoreText = new PIXI.Text(this.gameController.score, {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: '20em',
      fill: 'white',
    })
    scoreText.anchor.x = 0.5
    scoreText.anchor.y = 0.5
    scoreText.position.x = this.midScreen.x
    scoreText.position.y = this.midScreen.y

    this.sceneContainer.addChild(gameOverHeading)
    this.sceneContainer.addChild(scoreText)
  }

  getSceneContainer() {
    return this.sceneContainer
  }
}
