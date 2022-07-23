class GameScene {
  constructor(layoutConstraints) {
    this.sceneContainer = new PIXI.Container()
    this.sceneContainer.height = layoutConstraints.height
    this.sceneContainer.width = layoutConstraints.width
    this.gameController = new GameController()
    this.timerText = new PIXI.Text()
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
    this.playerMovementBounds = {
      topLeft: this.gameAreaBounds.topLeft,
      topRight: {
        x:
          this.gameAreaBounds.topLeft.x +
          (this.gameAreaBounds.topRight.x - this.gameAreaBounds.topLeft.x) / 4,
        y: this.gameAreaBounds.topRight.y,
      },
      bottomRight: {
        x:
          this.gameAreaBounds.topLeft.x +
          (this.gameAreaBounds.topRight.x - this.gameAreaBounds.topLeft.x) / 4,
        y: this.gameAreaBounds.bottomRight.y,
      },
      bottomLeft: this.gameAreaBounds.bottomLeft,
    }
    this.interactionManager = new PIXI.InteractionManager(app.renderer)
    this.ball = new Ball(this.gameAreaBounds, app.renderer)
    this.paddle = new Paddle(this.playerMovementBounds, app.renderer)

    this.gameController.startScoring()

    this.drawScore()
    this.drawWalls()
    this.drawBall()
    this.drawPaddle()
  }

  update = () => {
    this.gameController.updateScore()
    this.paddle.update(this.interactionManager.mouse.global)
    this.ball.update(this.paddle.getCollisionBounds())
    this.timerText.text = this.gameController.score
  }

  drawScore() {
    this.timerText = new PIXI.Text(this.gameController.score, {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: '6em',
      fill: 'white',
    })
    this.timerText.position.x = window.innerWidth - this.timerText.width - 100
    this.timerText.position.y = 50
    this.sceneContainer.addChild(this.timerText)
  }

  drawGameArea() {
    let gameAreaX = this.gameAreaBounds.topLeft.x
    let gameAreaY = this.gameAreaBounds.topLeft.y
    let gameAreaWidth =
      this.gameAreaBounds.topRight.x - this.gameAreaBounds.topLeft.x
    let gameAreaHeight =
      this.gameAreaBounds.bottomLeft.y - this.gameAreaBounds.topLeft.y
    let gameArea = new PIXI.Graphics()
    gameArea.beginFill(0xffffff44)
    gameArea.alpha = 0.3
    gameArea.drawRect(gameAreaX, gameAreaY, gameAreaWidth, gameAreaHeight)
    gameArea.endFill()
    this.sceneContainer.addChild(gameArea)
  }

  drawWalls() {
    let thickness = 20
    let wallGraphicsData = [
      // Top wall, overhangs on the right by the thickness
      {
        x: this.gameAreaBounds.topLeft.x,
        y: this.gameAreaBounds.topLeft.y - thickness,
        width:
          this.gameAreaBounds.topRight.x -
          this.gameAreaBounds.topLeft.x +
          thickness,
        height: thickness,
      },
      // Right wall, no overhang
      {
        x: this.gameAreaBounds.topRight.x,
        y: this.gameAreaBounds.topRight.y,
        width: thickness,
        height:
          this.gameAreaBounds.bottomRight.y - this.gameAreaBounds.topRight.y,
      },
      // Bottom wall, overhangs on the right by the thickness
      {
        x: this.gameAreaBounds.bottomLeft.x,
        y: this.gameAreaBounds.bottomRight.y,
        width:
          this.gameAreaBounds.bottomRight.x -
          this.gameAreaBounds.bottomLeft.x +
          thickness,
        height: thickness,
      },
    ]

    wallGraphicsData.forEach((wall) => {
      let wallGraphics = new PIXI.Graphics()
      wallGraphics.beginFill(0xffffff)
      wallGraphics.alpha = 0.6
      wallGraphics.drawRect(wall.x, wall.y, wall.width, wall.height)
      wallGraphics.endFill()
      this.sceneContainer.addChild(wallGraphics)
    })

    this.drawPlayerLimitLine(thickness)
  }

  drawPlayerLimitLine(thickness) {
    let numDottedSegments = 8
    let dottedMargin = 10
    let dottedWidth = thickness / 3.0
    let gameAreaHeight =
      this.gameAreaBounds.bottomRight.y - this.gameAreaBounds.topRight.y
    let numMargins = numDottedSegments - 1
    let totalMarginHeight = numMargins * dottedMargin
    let dottedHeight = (gameAreaHeight - totalMarginHeight) / numDottedSegments
    //let dottedHeight = 55;
    let x = this.playerMovementBounds.topRight.x
    let y = this.playerMovementBounds.topRight.y
    for (let i = 0; i < numDottedSegments; i++) {
      let dottedGraphics = new PIXI.Graphics()
      dottedGraphics.beginFill(0xffffff)
      dottedGraphics.alpha = 0.1
      dottedGraphics.drawRect(x, y, dottedWidth, dottedHeight)
      dottedGraphics.endFill()
      this.sceneContainer.addChild(dottedGraphics)
      y += dottedHeight + dottedMargin
    }
  }

  drawBall() {
    let ballSprite = this.ball.sprite
    this.sceneContainer.addChild(ballSprite)
  }

  drawPaddle() {
    let paddle = this.paddle.sprite
    this.sceneContainer.addChild(paddle)
  }

  getSceneContainer() {
    return this.sceneContainer
  }
}
