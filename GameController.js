class GameController {
    constructor(){
        this._startTime = new Date().getTime();
        this.score = 0;
    }

    getScore(){
        return this.score;
    }
    
    startScoring = () => {
        this._startTime = new Date().getTime();
    };

    updateScore = ()=>{
        var currentTime = new Date().getTime();
        var timeDiff = currentTime - this._startTime;
        var secsDiff = timeDiff/1000.0;
        this.score = Math.floor(secsDiff);
    };
}