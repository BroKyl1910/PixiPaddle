class Paddle {
    constructor(playerMovementBounds, renderer) {
        this.width = 15;
        this.height = 70;
        this.pos = {
            x: 0,
            y: 0
        };
        this.playerMovementBounds = playerMovementBounds;
        this.sprite = this._createSprite(renderer);
    }

    _createSprite(renderer){
        let paddleGraphics = new PIXI.Graphics();
        paddleGraphics.beginFill(0xffffff);
        paddleGraphics.drawRect(0, 0, this.width, this.height);
        paddleGraphics.endFill();

        var texture = renderer.generateTexture(paddleGraphics);
        return new PIXI.Sprite(texture);
    }

    update(mousePos) {
        // Centre paddle on mouse cursor
        this.pos.x = mousePos.x - 0.5 * this.width;
        this.pos.y = mousePos.y - 0.5 * this.height;

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