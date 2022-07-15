class Ball {
    constructor(gameAreaBounds, renderer) {
        this.speed = 3;
        this.speedIncrement = 0.1;
        this.radius = 12;
        this.pos = {
            x: Math.random() * (gameAreaBounds.topRight.x - gameAreaBounds.topLeft.x) + gameAreaBounds.topLeft.x,
            y: Math.random() * (gameAreaBounds.bottomRight.y - gameAreaBounds.topRight.y) + gameAreaBounds.topRight.y
        };
        this.dir = {
            x: 1,
            y: 1
        };
        this.gameAreaBounds = gameAreaBounds;
        this.sprite = this._createSprite(renderer);
    }

    _createSprite(renderer){
        let ballGraphics = new PIXI.Graphics();
        ballGraphics.beginFill(0xffffff);
        ballGraphics.drawCircle(0, 0, this.radius);
        ballGraphics.endFill();

        var texture = renderer.generateTexture(ballGraphics);
        return new PIXI.Sprite(texture);
    }

    update() {
        this.pos.x += this.dir.x * this.speed;
        this.pos.y += this.dir.y * this.speed;

        this.sprite.position.x = this.pos.x;
        this.sprite.position.y = this.pos.y;

        if (this.pos.y <= this.gameAreaBounds.topLeft.y) {
            this.dir.y = 1;
            this.speed += this.speedIncrement;
        }
        else if (this.pos.y >= this.gameAreaBounds.bottomRight.y - this.radius*2) {
            this.dir.y = -1;
            this.speed += this.speedIncrement;
        }

        if (this.pos.x <= this.gameAreaBounds.topLeft.x) {
            this.dir.x = 1;
            this.speed += this.speedIncrement;
        }
        else if (this.pos.x >= this.gameAreaBounds.bottomRight.x - this.radius*2) {
            this.dir.x = -1;
            this.speed += this.speedIncrement;
        }

    }
}