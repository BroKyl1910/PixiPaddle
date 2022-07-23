class Paddle {
    constructor(playerMovementBounds, renderer) {
        this.width = 15;
        this.height = 70;
        this.speed = 3;
        this.pos = {
            x: 0,
            y: 0
        };
        this.playerMovementBounds = playerMovementBounds;
        this.sprite = this.#createSprite(renderer);
    }

    #createSprite(renderer) {
        let paddleGraphics = new PIXI.Graphics();
        paddleGraphics.beginFill(0xffffff);
        paddleGraphics.drawRect(0, 0, this.width, this.height);
        paddleGraphics.endFill();

        var texture = renderer.generateTexture(paddleGraphics);
        return new PIXI.Sprite(texture);
    }

    getCollisionBounds() {
        return {
            topLeft: { x: this.pos.x, y: this.pos.y },
            topRight: { x: this.pos.x + this.width, y: this.pos.y },
            bottomRight: { x: this.pos.x + this.width, y: this.pos.y + this.height },
            bottomLeft: { x: this.pos.x, y: this.pos.y + this.height },
        }
    }

    update(mousePos) {
        // Centre paddle on mouse cursor
        let targetPos = {
            x: mousePos.x - 0.5 * this.width,
            y: mousePos.y - 0.5 * this.height
        }

        // let xDiff = (targetPos.x - this.pos.x) * 0.75;
        // let yDiff = (targetPos.y - this.pos.y) * 0.75;

        // //calculate the distance this would move ...
        // let distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
        // if(distance > 5){
        //     xDiff *= 5/distance;
        //     yDiff *= 5/distance;
        //   }

        // this.pos.x += xDiff;
        // this.pos.y += yDiff;

        this.pos.x = targetPos.x;
        this.pos.y = targetPos.y;

        // Y Bounds
        // Top bound
        if (this.pos.y <= this.playerMovementBounds.topLeft.y) {
            this.pos.y = this.playerMovementBounds.topLeft.y;
        }
        // Bottom bound
        else if (this.pos.y >= this.playerMovementBounds.bottomLeft.y - this.height) {
            this.pos.y = this.playerMovementBounds.bottomLeft.y - this.height
        }

        // X Bounds
        // Left bound
        if (this.pos.x <= this.playerMovementBounds.topLeft.x) {
            this.pos.x = this.playerMovementBounds.topLeft.x;
        }
        // Right bound
        else if (this.pos.x >= this.playerMovementBounds.topRight.x - this.width) {
            this.pos.x = this.playerMovementBounds.topRight.x - this.width
        }

        this.sprite.position.x = this.pos.x;
        this.sprite.position.y = this.pos.y;
    }
}