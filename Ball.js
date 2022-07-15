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
        this.sprite = this.#createSprite(renderer);
    }

    #createSprite(renderer) {
        let ballGraphics = new PIXI.Graphics();
        ballGraphics.beginFill(0xffffff);
        ballGraphics.drawCircle(0, 0, this.radius);
        ballGraphics.endFill();

        var texture = renderer.generateTexture(ballGraphics);
        return new PIXI.Sprite(texture);
    }

    update(paddleBounds) {
        this.pos.x += this.dir.x * this.speed;
        this.pos.y += this.dir.y * this.speed;

        this.sprite.position.x = this.pos.x;
        this.sprite.position.y = this.pos.y;

        this.#checkWallCollisions();
        this.#checkPaddleCollisions(paddleBounds);

    }

    #checkWallCollisions() {
        if (this.pos.y <= this.gameAreaBounds.topLeft.y) {
            this.dir.y = 1;
            this.speed += this.speedIncrement;
        }
        else if (this.pos.y >= this.gameAreaBounds.bottomRight.y - this.radius * 2) {
            this.dir.y = -1;
            this.speed += this.speedIncrement;
        }

        if (this.pos.x <= this.gameAreaBounds.topLeft.x) {
            console.log("GAME OVER");
        }
        else if (this.pos.x >= this.gameAreaBounds.bottomRight.x - this.radius * 2) {
            this.dir.x = -1;
            this.speed += this.speedIncrement;
        }
    }

    #checkPaddleCollisions(paddleBounds) {
        if (this.#ballCollidingWithPaddle(paddleBounds)) {
            this.dir.x = 1;
            this.speed += this.speedIncrement;
        }
    }

    #ballCollidingWithPaddle(paddleBounds) {
        if (this.pos.x + this.radius * 2 >= paddleBounds.topLeft.x
            && this.pos.x <= paddleBounds.topRight.x // x positions are colliding
            && this.pos.y >= paddleBounds.topLeft.y
            && this.pos.y + this.radius * 2 <= paddleBounds.bottomLeft.y) // y positions are colliding
            return true

        return false;
    }
}