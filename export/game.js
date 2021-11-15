const BLACK = "rgb(0,0,0)";
const RED = "rgb(255,0,0)";
const BLUE = "rgb(0,0,255)";
const GREEN = "rgb(0,255,0)";
const WHITE = "rgb(255,255,255)";
let ctx = null;
let img = new Image();


function setupGameState() { 
    MOVE = Module.Move; 
    gameState = Module.createInitialGameState();
    
    timings = new Array(1000);
    
    move = MOVE.STATIONARY;
    
    fps = 0;
    frames = 0;
    totalFrames = 0
    time = Date.now(); 
    window.addEventListener("keydown", function(event) {
        key = Number(event.keyCode);
        if(key === 37) { // left arrow
            gameState.move = MOVE.LEFT;
        }
        if(key === 38) { // up arrow
            gameState.move = MOVE.UP;
        }
        if(key === 39) { // right arrow
            gameState.move = MOVE.RIGHT;
        }
        if(key === 40) { // down arrow
            gameState.move = MOVE.DOWN;
        }
        if(key === 37 && key === 38) { // up left arrow
            gameState.move = MOVE.UP_LEFT;
        }
        if(key === 38 && key === 39) { // up right arrow
            gameState.move = MOVE.UP_RIGHT;
        }
        if(key === 39 && key === 40) { // down left arrow
            gameState.move = MOVE.DOWN_RIGHT;
        }
        if(key === 40 && key === 37) { // down right arrow
            gameState.move = MOVE.DOWN_LEFT;
        }
    });

    window.addEventListener("resize", function(event){
        CanvasSetup();
    })

    window.addEventListener("keyup", function(event) {
        gameState.move = MOVE.STATIONARY;
    });
}

function CanvasSetup(){
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    img.src = '../assets/gridPattern.jpeg';
}
function render(){
    lastTiming = Date.now()
    calculateFps();
    update();
    draw();
    timings[totalFrames%timings.length] = Date.now() - lastTiming 
    this.setTimeout(render, 0);
}

function calculateFps() {
    frames += 1;
    totalFrames += 1;
    if (Date.now() - time > 1000) {
        fps = frames/((Date.now() - time) / 1000)
        frames = 0;
        time = Date.now()
    }
}

function update() {
    gameState = Module.updatePosition(gameState);
}

function draw() {
  drawBlackBackground(ctx);
  drawDottedLine(ctx);
  drawPlayer(ctx);
//   drawBall(ctx);
//   drawScore(ctx);
  drawFps(ctx);
  drawTimings(ctx);
}

function drawScore(ctx){
  ctx.font = "60px Arial";
  ctx.strokeStyle = RED;
  ctx.strokeText(gameState.leftScore, 250, 50);
  ctx.strokeStyle = BLUE;
  ctx.strokeText(gameState.rightScore, 550, 50);
}

function drawBlackBackground(ctx) {
    // ctx.fillStyle = BLACK;
    // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    
    const ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, window.innerWidth, innerHeight);
}

function drawDottedLine(ctx) {
    var point = {
        center: {
            x: window.innerWidth/2, 
            y: window.innerHeight/2
        },
        player: {
            x: gameState.player.xpos + 12,
            y: gameState.player.ypos + 12
        }
    }

    //Connect with player
    ctx.strokeStyle = GREEN;
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(window.innerWidth/2, window.innerHeight/2);
    ctx.lineTo(point.player.x, point.player.y);
    ctx.lineWidth = 1;
    ctx.stroke();
    //reset line
    ctx.setLineDash([]);
    ctx.lineWidth = 1;

    
    ctx.strokeStyle = BLUE;
    ctx.beginPath();
    ctx.arc(point.player.x, point.player.y, 20, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = GREEN;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(point.center.x, point.center.y, Module.distance(point.center, point.player), 0, 2 * Math.PI);
    ctx.stroke();

    // Gizmo
    ctx.strokeStyle = GREEN;
    ctx.beginPath();
    ctx.moveTo(point.player.x, point.player.y - 30);
    ctx.lineTo(point.player.x, point.player.y + 30);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = GREEN;
    ctx.arc(point.player.x, point.player.y - 30, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(point.player.x - 5, point.player.y + 30);
    ctx.lineTo(point.player.x, point.player.y + 40);
    ctx.lineTo(point.player.x + 5, point.player.y + 30);
    ctx.fill();

    ctx.strokeStyle = RED;
    ctx.beginPath();
    ctx.moveTo(point.player.x - 30, point.player.y);
    ctx.lineTo(point.player.x + 30, point.player.y);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = RED;
    ctx.arc(point.player.x - 30, point.player.y, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(point.player.x + 30, point.player.y - 5);
    ctx.lineTo(point.player.x + 40, point.player.y);
    ctx.lineTo(point.player.x + 30, point.player.y + 5);
    ctx.fill();
    
    ctx.fillStyle = RED;
    ctx.font = "12px Verdana";
    ctx.fillText("X: " + point.player.x + "px", point.player.x + 12, point.player.y - 40);

    ctx.fillStyle = GREEN;
    ctx.font = "12px Verdana";
    ctx.fillText("Y: " + point.player.y + "px", point.player.x + 12, point.player.y - 25);

    ctx.fillStyle = GREEN;
    ctx.font = "12px Verdana";
    ctx.fillText("D: " + Module.distance(point.center, point.player) + "px", Module.middlePoint(point.center,point.player).x, Module.middlePoint(point.center,point.player).y);

    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.font = "12px Verdana";
    ctx.fillText("R: " + Module.distance(point.center, point.player) + "px",point.center.x, point.center.y);
    ctx.stroke();
}

function drawPlayer(ctx) {
    ctx.fillStyle = RED;
    ctx.fillRect(gameState.player.xpos, gameState.player.ypos, 25, 25);
}

function drawBall(ctx) {
    ctx.fillStyle = WHITE;
    ctx.fillRect(gameState.ball.xpos, gameState.ball.ypos, 10, 10);
}

function drawFps(ctx) { 
  ctx.font = "13px Verdana";
  ctx.fillStyle = GREEN;
  ctx.fillText(fps.toFixed() + " Frames/Second", 10, 30);
}

function drawTimings(ctx) { 
  ctx.font = "13px Verdana";
  ctx.fillStyle = GREEN;
  timing = timings.reduce( (a,b) => {return a + b}, 0) / timings.length;
  ctx.fillText(timing.toFixed(2) + " ms render", 10, 50);
}
